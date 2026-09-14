/**
 * JCD Forwarder RAG Retriever
 * Fast, intelligent lexical and semantic keyword scoring for logistics context retrieval.
 */

import { ALL_KNOWLEDGE_CHUNKS, KnowledgeChunk } from './knowledgeBase';

const STOPWORDS = new Set([
  'a', 'an', 'the', 'in', 'on', 'at', 'to', 'for', 'of', 'and', 'or', 'is', 'are',
  'was', 'were', 'it', 'with', 'from', 'as', 'by', 'this', 'that', 'i', 'you', 'we',
  'can', 'do', 'does', 'how', 'what', 'which', 'who', 'where', 'when', 'why', 'please',
  'tell', 'me', 'about', 'need', 'want', 'help'
]);

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, ' ')
    .split(/\s+/)
    .filter((word) => word.length > 1 && !STOPWORDS.has(word));
}

export interface RetrievalResult {
  chunk: KnowledgeChunk;
  score: number;
}

export function retrieveKnowledge(query: string, topK = 4): RetrievalResult[] {
  const queryTokens = tokenize(query);
  const normalizedQuery = query.toLowerCase();

  if (queryTokens.length === 0) {
    const fallback = ALL_KNOWLEDGE_CHUNKS.find((c) => c.id === 'company-overview');
    return fallback ? [{ chunk: fallback, score: 10 }] : [];
  }

  const scored: RetrievalResult[] = ALL_KNOWLEDGE_CHUNKS.map((chunk) => {
    let score = 0;
    const titleLower = chunk.title.toLowerCase();
    const contentLower = chunk.content.toLowerCase();

    // 1. Direct query substring match in title or keywords
    if (titleLower.includes(normalizedQuery)) {
      score += 30;
    }

    // 2. Keyword exact matches
    for (const kw of chunk.keywords) {
      if (normalizedQuery.includes(kw)) {
        score += 20;
      }
    }

    // 3. Token-based matching
    for (const token of queryTokens) {
      if (titleLower.includes(token)) {
        score += 8;
      }
      for (const kw of chunk.keywords) {
        if (kw.includes(token)) {
          score += 5;
        }
      }
      if (contentLower.includes(token)) {
        score += 1.5;
      }
    }

    // 4. Country route specific boosting
    if (chunk.category === 'country') {
      const countryCode = chunk.id.replace('country-', '');
      // Check if country name or code is mentioned
      for (const kw of chunk.keywords) {
        if (kw.length > 2 && normalizedQuery.includes(kw)) {
          score += 40;
        }
      }
      // Check exact 2-letter country code match with word boundary
      const codeRegex = new RegExp(`\\b${countryCode}\\b`, 'i');
      if (codeRegex.test(normalizedQuery)) {
        score += 35;
      }
    }

    // 5. Origin hub specific boosting
    if (chunk.category === 'origin') {
      const originName = chunk.id.replace('origin-', '');
      if (normalizedQuery.includes(originName)) {
        score += 35;
      }
    }

    return { chunk, score };
  });

  // Filter chunks with positive relevance and sort descending
  const relevant = scored
    .filter((res) => res.score > 3)
    .sort((a, b) => b.score - a.score);

  // If top matches are found, return topK
  if (relevant.length > 0) {
    return relevant.slice(0, topK);
  }

  // Fallback to company overview + DDP shipping chunks
  const defaultIds = ['company-overview', 'service-ddp-shipping'];
  const defaults = ALL_KNOWLEDGE_CHUNKS.filter((c) => defaultIds.includes(c.id)).map((chunk) => ({
    chunk,
    score: 5
  }));

  return defaults;
}

export function formatContextForPrompt(results: RetrievalResult[]): string {
  if (!results || results.length === 0) return '';

  return results
    .map((r, idx) => {
      return `--- KNOWLEDGE SOURCE [${idx + 1}]: ${r.chunk.title} (${r.chunk.category.toUpperCase()}) ---\n${r.chunk.content}`;
    })
    .join('\n\n');
}
