"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  MessageCircle,
  X,
  Send,
  RotateCcw,
  Headphones,
  ShieldCheck,
  ExternalLink,
  Phone,
  Mail,
  ArrowRight,
  Calculator,
  Box,
  Truck,
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { useQuoteModal } from "@/components/quote/QuoteModalContext";
import { SITE_CONFIG, getWhatsAppUrl } from "@/data/siteConfig";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  suggestedActions?: Array<{
    type: "quote" | "whatsapp" | "tracking" | "tool";
    label: string;
    payload?: Record<string, string>;
  }>;
  sources?: Array<{
    title: string;
    category: string;
  }>;
}

const STARTER_PROMPTS = [
  "What is DDP shipping and who pays the duties?",
  "Air vs Sea freight transit time from Shenzhen",
  "Container loading specs: 20GP vs 40HQ",
  "How to calculate volumetric weight?",
  "Can you ship pure lithium batteries from China?"
];

// Lightweight, resilient markdown formatter
function FormattedMessage({ text }: { text: string }) {
  // Split by lines to render headers, bullet points, and paragraphs
  const lines = text.split("\n");
  const elements: React.ReactNode[] = [];

  let inList = false;
  let listItems: React.ReactNode[] = [];

  const flushList = (keyPrefix: string) => {
    if (inList && listItems.length > 0) {
      elements.push(
        <ul key={`${keyPrefix}-ul`} className="list-disc pl-5 my-2 space-y-1 text-xs sm:text-sm">
          {listItems}
        </ul>
      );
      listItems = [];
      inList = false;
    }
  };

  lines.forEach((line, idx) => {
    const trimmed = line.trim();

    // Check header
    if (trimmed.startsWith("### ")) {
      flushList(`line-${idx}`);
      elements.push(
        <h4 key={`h4-${idx}`} className="font-bold text-sm text-blue-900 dark:text-blue-300 mt-3 mb-1">
          {formatInline(trimmed.replace("### ", ""))}
        </h4>
      );
      return;
    }
    if (trimmed.startsWith("## ")) {
      flushList(`line-${idx}`);
      elements.push(
        <h3 key={`h3-${idx}`} className="font-bold text-base text-slate-900 dark:text-white mt-3 mb-1">
          {formatInline(trimmed.replace("## ", ""))}
        </h3>
      );
      return;
    }

    // Check bullet point
    if (trimmed.startsWith("* ") || trimmed.startsWith("- ") || trimmed.startsWith("• ")) {
      inList = true;
      const content = trimmed.replace(/^(\*|-|•)\s+/, "");
      listItems.push(
        <li key={`li-${idx}`} className="text-xs sm:text-sm leading-relaxed">
          {formatInline(content)}
        </li>
      );
      return;
    }

    // Check numbered list
    const numMatch = trimmed.match(/^(\d+)\.\s+(.*)/);
    if (numMatch) {
      flushList(`line-${idx}`);
      elements.push(
        <div key={`num-${idx}`} className="flex items-start gap-2 my-1 text-xs sm:text-sm">
          <span className="font-bold text-blue-600 dark:text-blue-400 min-w-[18px]">{numMatch[1]}.</span>
          <span className="leading-relaxed">{formatInline(numMatch[2])}</span>
        </div>
      );
      return;
    }

    // Regular line / empty line
    if (!trimmed) {
      flushList(`line-${idx}`);
      elements.push(<div key={`empty-${idx}`} className="h-2" />);
      return;
    }

    flushList(`line-${idx}`);
    elements.push(
      <p key={`p-${idx}`} className="text-xs sm:text-sm leading-relaxed my-1">
        {formatInline(trimmed)}
      </p>
    );
  });

  flushList("end");

  return <div className="space-y-0.5">{elements}</div>;
}

// Inline markdown helper for bold, code, and links
function formatInline(text: string): React.ReactNode {
  // Handle bold (**text**)
  const parts = text.split(/(\*\*.*?\*\*|`.*?`)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-bold text-slate-900 dark:text-white">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code key={i} className="px-1 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 font-mono text-xs">
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
}

export function SupportChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "initial-welcome",
      role: "assistant",
      timestamp: "Just now",
      content:
        "Hello! Welcome to **JCD Forwarder** Freight Desk.\n\nHow can we assist with your China export shipping today?",
      suggestedActions: [
        { type: "quote", label: "Request Freight Quote" },
        { type: "whatsapp", label: "Chat on WhatsApp" }
      ]
    }
  ]);

  const { openQuoteModal } = useQuoteModal();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll on new message
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, isLoading]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
    }
  }, [isOpen]);

  const handleSendMessage = async (customText?: string) => {
    const textToSend = customText || inputMessage;
    if (!textToSend.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!customText) setInputMessage("");
    setIsLoading(true);

    try {
      // Build conversation history for context
      const history = messages
        .filter((m) => m.id !== "initial-welcome")
        .slice(-5)
        .map((m) => ({ role: m.role, content: m.content }));

      history.push({ role: "user", content: userMessage.content });

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history })
      });

      if (!res.ok) {
        throw new Error(`Server returned HTTP ${res.status}`);
      }

      const data = await res.json();

      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: data.reply || "Thank you for your message. How else may I assist with your shipment?",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        suggestedActions: data.suggestedActions,
        sources: data.sources
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error("Chat error:", err);
      const errorMessage: ChatMessage = {
        id: `error-${Date.now()}`,
        role: "assistant",
        content:
          "Our freight dispatch network is temporarily experiencing high inquiry volume. Please contact our 24/7 hotline directly or reach David on WhatsApp for an immediate binding rate.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        suggestedActions: [
          { type: "whatsapp", label: "Chat Directly on WhatsApp (+86 137 2424 6674)" },
          { type: "quote", label: "Open Instant Quote Wizard" }
        ]
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleActionClick = (action: { type: string; label: string; payload?: Record<string, string> }) => {
    if (action.type === "quote") {
      openQuoteModal({
        destinationSlug: action.payload?.destination,
        originId: action.payload?.origin,
        serviceType: action.payload?.mode
      });
      return;
    }

    if (action.type === "whatsapp") {
      const waUrl = getWhatsAppUrl("Hi David, I am chatting with JCD Freight Dispatch and would like to request an official quotation.");
      window.open(waUrl, "_blank", "noopener,noreferrer");
      return;
    }

    if (action.type === "tracking") {
      window.location.href = "/tools/tracking";
      return;
    }

    if (action.type === "tool") {
      window.location.href = "/tools";
      return;
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: "initial-welcome",
        role: "assistant",
        timestamp: "Just now",
        content:
          "Welcome back to **JCD Forwarder** Freight Desk.\n\nHow can we assist with your China shipping today?",
        suggestedActions: [
          { type: "quote", label: "Request Freight Quote" },
          { type: "whatsapp", label: "Chat on WhatsApp" }
        ]
      }
    ]);
  };

  return (
    <>
      {/* 1. FLOATING EXECUTIVE TRIGGER BUTTON */}
      <div className="fixed bottom-5 right-5 z-40 flex items-center">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            aria-label="Open JCD Freight Advisory Chat"
            className="group relative flex items-center gap-3 bg-[#081A36] hover:bg-[#0C244C] text-white pl-3.5 pr-5 py-2.5 rounded-full shadow-2xl border border-blue-500/30 hover:border-blue-400 transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
          >
            {/* Logo brand indicator with online pulse */}
            <div className="relative flex items-center justify-center shrink-0">
              <div className="w-10 h-10 rounded-xl bg-white p-0.5 border border-slate-200 shadow-xs flex items-center justify-center overflow-hidden">
                <Image
                  src="/logo.png"
                  alt="JCD Forwarder Logo"
                  width={36}
                  height={36}
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
              <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border-2 border-[#081A36]"></span>
              </span>
            </div>

            <div className="text-left">
              <div className="text-xs font-bold tracking-wider text-blue-200 uppercase">Freight Advisory Desk</div>
              <div className="text-[11px] text-slate-300 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>Online &bull; 24/7 Dispatch</span>
              </div>
            </div>
          </button>
        )}
      </div>

      {/* 2. CHAT MODAL WINDOW */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="JCD Freight Advisory Chat"
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[95vw] sm:w-[460px] h-[640px] max-h-[88vh] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200"
        >
          {/* HEADER */}
          <div className="bg-[#081A36] text-white px-4 py-3.5 flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="relative shrink-0">
                <div className="w-10 h-10 rounded-xl bg-white p-0.5 border border-slate-200 shadow-xs flex items-center justify-center overflow-hidden">
                  <Image
                    src="/logo.png"
                    alt="JCD Forwarder Logo"
                    width={36}
                    height={36}
                    className="w-full h-full object-contain rounded-lg"
                  />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-[#081A36]"></span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm text-white tracking-wide">JCD Freight Advisory Desk</h3>
                  <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-1.5 py-0.5 rounded border border-emerald-500/30">
                    NVOCC Verified
                  </span>
                </div>
                <p className="text-xs text-blue-200/80">Shenzhen Jiechengda Int'l Freight Forwarding</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleResetChat}
                title="Restart conversation"
                className="p-1.5 text-blue-200 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Close chat"
                className="p-1.5 text-blue-200 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* CREDENTIALS TRUST BANNER */}
          <div className="bg-slate-50 dark:bg-slate-800/80 px-4 py-1.5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-600 dark:text-slate-300">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-blue-600 dark:text-blue-400">License:</span>
              <span>GD20240307220907</span>
            </div>
            <Link
              href={SITE_CONFIG.socials.alibabaTrustPass}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-amber-600 dark:text-amber-400 hover:underline font-medium"
            >
              <span>Alibaba Gold (4.7★)</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>

          {/* MESSAGES LIST */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50 dark:bg-slate-900/50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}
              >
                <div
                  className={`max-w-[88%] rounded-2xl p-3.5 text-sm ${
                    msg.role === "user"
                      ? "bg-blue-600 text-white rounded-br-xs shadow-md shadow-blue-600/10"
                      : "bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700/80 rounded-bl-xs shadow-sm"
                  }`}
                >
                  <FormattedMessage text={msg.content} />

                  {/* Customer Support Action Buttons */}
                  {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                    <div className="mt-3.5 pt-2.5 border-t border-slate-100 dark:border-slate-700/60 flex flex-wrap gap-2">
                      {msg.suggestedActions.map((action, aIdx) => (
                        <button
                          key={aIdx}
                          onClick={() => handleActionClick(action)}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer ${
                            action.type === "quote"
                              ? "bg-orange-500 hover:bg-orange-600 text-white shadow-sm"
                              : action.type === "whatsapp"
                              ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm"
                              : "bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 hover:bg-blue-100"
                          }`}
                        >
                          {action.type === "quote" && <Calculator className="w-3.5 h-3.5" />}
                          {action.type === "whatsapp" && <Phone className="w-3.5 h-3.5" />}
                          {action.type === "tracking" && <Truck className="w-3.5 h-3.5" />}
                          <span>{action.label}</span>
                          <ArrowRight className="w-3 h-3 ml-0.5 opacity-80" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <span className="text-[10px] text-slate-400 mt-1 px-1">{msg.timestamp}</span>
              </div>
            ))}

            {/* Loading / Typing Indicator */}
            {isLoading && (
              <div className="flex items-start gap-2">
                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl rounded-bl-xs px-4 py-3 shadow-sm">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-600 animate-bounce"></span>
                    <span className="w-2 h-2 rounded-full bg-blue-600 animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-2 h-2 rounded-full bg-blue-600 animate-bounce [animation-delay:0.4s]"></span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 ml-2 font-medium">
                      Consulting freight routing database...
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* STARTER PROMPTS PILLS (Displayed if only 1 message) */}
          {messages.length <= 2 && (
            <div className="px-4 py-2 bg-slate-100/70 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-800">
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                Suggested Logistics Inquiries:
              </div>
              <div className="flex flex-wrap gap-1.5">
                {STARTER_PROMPTS.map((prompt, pIdx) => (
                  <button
                    key={pIdx}
                    onClick={() => handleSendMessage(prompt)}
                    className="text-xs bg-white dark:bg-slate-700 hover:bg-blue-50 dark:hover:bg-blue-900/40 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-600 px-2.5 py-1 rounded-full transition-colors text-left cursor-pointer"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* CUSTOMER DIRECT SUPPORT ACTION BAR */}
          <div className="bg-white dark:bg-slate-900 px-4 py-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
            <button
              onClick={() => openQuoteModal()}
              className="flex items-center gap-1 text-orange-600 dark:text-orange-400 font-bold hover:underline cursor-pointer"
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>Instant Quote</span>
            </button>
            <span className="text-slate-300 dark:text-slate-700">|</span>
            <a
              href={getWhatsAppUrl("Hello David, I would like to request an official freight rate.")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold hover:underline"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>WhatsApp +86 137 2424 6674</span>
            </a>
            <span className="text-slate-300 dark:text-slate-700">|</span>
            <Link
              href="/tools/tracking"
              className="flex items-center gap-1 text-blue-600 dark:text-blue-400 font-bold hover:underline"
            >
              <Truck className="w-3.5 h-3.5" />
              <span>Track Waybill</span>
            </Link>
          </div>

          {/* INPUT BAR */}
          <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-end gap-2">
            <div className="flex-1 relative">
              <textarea
                ref={inputRef}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about shipping rates, DDP, container CBM..."
                rows={1}
                maxLength={2000}
                className="w-full resize-none max-h-28 text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/70 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            <button
              onClick={() => handleSendMessage()}
              disabled={!inputMessage.trim() || isLoading}
              aria-label="Send inquiry"
              className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 shadow-md shadow-blue-600/20 flex-shrink-0 cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default SupportChatWidget;
