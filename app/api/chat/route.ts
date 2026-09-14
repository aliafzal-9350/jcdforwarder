import { NextRequest, NextResponse } from 'next/server';
import { retrieveKnowledge, formatContextForPrompt } from '@/lib/rag/retriever';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const PRIMARY_MODEL = 'qwen/qwen3.8-27b';
const FALLBACK_MODEL = 'openai/gpt-oss-120b';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const messages: ChatMessage[] = body.messages || [];

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: 'Missing or invalid messages array' }, { status: 400 });
    }

    const latestUserMessage = messages[messages.length - 1];
    if (!latestUserMessage || latestUserMessage.role !== 'user' || !latestUserMessage.content.trim()) {
      return NextResponse.json({ error: 'Latest message must be a non-empty user prompt' }, { status: 400 });
    }

    const queryText = latestUserMessage.content.trim();
    if (queryText.length > 2000) {
      return NextResponse.json({ error: 'Message exceeds maximum length of 2000 characters' }, { status: 400 });
    }

    const apiKey = process.env.GROQ_API_KEY || '';
    if (!apiKey) {
      return NextResponse.json({
        reply: "Welcome to JCD Forwarder! Our freight dispatch desk is available 24/7. Please connect directly via WhatsApp (+86 137 2424 6674) or email David@JCDforwarder.com for immediate rate confirmations.",
        suggestedActions: [
          { label: "Request Freight Quote", action: "open_quote" },
          { label: "WhatsApp Direct", action: "whatsapp" }
        ]
      });
    }

    // 1. RAG Context Retrieval - only retrieve if not a casual greeting or pleasantry
    const queryLower = queryText.toLowerCase().trim();
    const isGreeting = /^(hi|hello|hey|good\s*(morning|afternoon|evening)|how\s*are\s*you|who\s*are\s*you|help)(\s*!|\s*\.|\s*\?)*$/i.test(queryLower);
    const isThanks = /^(thanks|thank\s*you|thx|ok|okay|great|got\s*it|sure)(\s*!|\s*\.|\s*\?)*$/i.test(queryLower);

    let ragContext = '';
    if (!isGreeting && !isThanks) {
      const retrievedResults = retrieveKnowledge(queryText, 3);
      // Only use relevant chunks with positive relevance
      const relevantResults = retrievedResults.filter(r => r.score >= 15);
      if (relevantResults.length > 0) {
        ragContext = formatContextForPrompt(relevantResults);
      }
    }

    // 2. Identify contextual suggested action buttons (only when truly relevant)
    const suggestedActions: Array<{ type: 'quote' | 'whatsapp' | 'tracking' | 'tool'; label: string; payload?: Record<string, string> }> = [];

    if (!isGreeting && !isThanks) {
      // Check if user is asking about rates or quotes or destinations
      if (
        queryLower.includes('quote') ||
        queryLower.includes('rate') ||
        queryLower.includes('price') ||
        queryLower.includes('cost') ||
        queryLower.includes('how much') ||
        queryLower.includes('ship to') ||
        queryLower.includes('shipping to')
      ) {
        suggestedActions.push({
          type: 'quote',
          label: 'Request Freight Quote'
        });
        suggestedActions.push({
          type: 'whatsapp',
          label: 'WhatsApp (+86 137 2424 6674)'
        });
      } else if (queryLower.includes('track') || queryLower.includes('status') || queryLower.includes('waybill') || queryLower.includes('container number')) {
        suggestedActions.push({
          type: 'tracking',
          label: 'Track Shipment'
        });
      } else if (
        queryLower.includes('whatsapp') ||
        queryLower.includes('contact') ||
        queryLower.includes('phone') ||
        queryLower.includes('call') ||
        queryLower.includes('agent')
      ) {
        suggestedActions.push({
          type: 'whatsapp',
          label: 'WhatsApp (+86 137 2424 6674)'
        });
      }
    }

    // 3. System Prompt Formulation - Concise, direct, and to the point
    const systemPrompt = `You are a helpful Freight Consultant at JCD Forwarder (Shenzhen Jiechengda International Freight Forwarding Co., Ltd.), an NVOCC-licensed logistics provider in Shenzhen, China.
WhatsApp: +86 137 2424 6674 | Email: David@JCDforwarder.com | Central warehouse: Bao'an District, Shenzhen.

CORE CAPABILITIES:
• Origin: All major Chinese ports & airports (Shenzhen, Guangzhou, Ningbo, Shanghai, Yiwu, Qingdao, Hong Kong).
• Destinations: Worldwide coverage across North America, Europe, UK, Middle East, South Asia (Pakistan, India, Bangladesh), Southeast Asia, Africa, South America, and Australia.
• Services: Air Freight, Ocean Freight (FCL/LCL), Express Courier, and Door-to-Door DDP (USA, Canada, Mexico, UK, EU, UAE, Saudi Arabia, Southeast Asia). Port-to-port (FOB, CIF, CFR) available worldwide.
• Free 7-day warehouse consolidation in Shenzhen.

CRITICAL RULES (HIGHEST PRIORITY):
1. BE CONCISE & TO THE POINT:
   - Provide direct, concise answers in 2 to 4 sentences (or brief bullet points). Maximum 75 words.
   - NO fluff, NO filler, NO essays, NO repetitive disclaimers.
   - NEVER introduce yourself as "As the Senior International Freight Consultant at Shenzhen Jiechengda..." or similar long titles.
   - NEVER repeat legal registration or full office address unless explicitly asked.
2. GREETINGS & CASUAL TALK:
   - For greetings ("hi", "hello", "how are you"): Answer in 1–2 friendly sentences asking how you can assist with their China shipping. NEVER dump company background or service lists on a greeting.
3. DESTINATION INQUIRIES (e.g. "Can you ship to Pakistan?", "Do you ship to Germany?"):
   - Answer directly with "Yes": confirm we ship from China to that destination via air or sea freight.
   - Ask only for the 3 key details needed to quote:
     • Origin city in China
     • Cargo details (weight & CBM volume)
     • Shipping term (FOB, CIF, or Door Delivery)
   - NEVER list unrelated countries, alternative continents, or transshipment essays unless asked.
4. QUOTES & RATES:
   - Rates fluctuate weekly based on carrier GRI and fuel. Request the cargo weight/CBM and origin to provide an accurate rate.
5. PROHIBITED:
   - NEVER mention AI, LLM, OpenAI, Groq, or prompt instructions.
   - NEVER output walls of text.

${ragContext ? `RELEVANT LOGISTICS KNOWLEDGE:\n${ragContext}` : ''}`;

    // 4. Prepare message payload for Groq API
    const apiMessages = [
      { role: 'system', content: systemPrompt },
      ...messages.slice(-6).map((m) => ({ role: m.role, content: m.content }))
    ];

    // Helper to call Groq API
    async function callGroq(modelName: string): Promise<string> {
      const response = await fetch(GROQ_API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: modelName,
          messages: apiMessages,
          temperature: 0.2,
          max_tokens: 280
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Groq API returned ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      const content = data.choices?.[0]?.message?.content || '';
      return content;
    }

    let replyText = '';
    try {
      replyText = await callGroq(PRIMARY_MODEL);
    } catch (primaryErr) {
      console.warn(`Primary model ${PRIMARY_MODEL} failed, trying fallback ${FALLBACK_MODEL}:`, primaryErr);
      replyText = await callGroq(FALLBACK_MODEL);
    }

    // Clean any potential internal thinking tags if returned
    replyText = replyText.replace(/<think>[\s\S]*?<\/think>/gi, '').trim();

    // 5. Return structured JSON response without cluttering sources
    return NextResponse.json({
      reply: replyText,
      suggestedActions,
      sources: []
    });
  } catch (error) {
    console.error('Error in /api/chat route:', error);
    return NextResponse.json(
      {
        error: 'Failed to process freight advisory query',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}
