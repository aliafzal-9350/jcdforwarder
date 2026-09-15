"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface Faq {
  id: string;
  question: string;
  answer: string;
}

export function FaqAccordion({ faqs }: { faqs: Faq[] }) {
  const [openFaqId, setOpenFaqId] = useState<string | null>(faqs[0]?.id || null);

  return (
    <div className="space-y-3">
      {faqs.map((faq) => {
        const isOpen = openFaqId === faq.id;
        const panelId = `faq-panel-${faq.id}`;
        return (
          <div
            key={faq.id}
            className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden"
          >
            <button
              type="button"
              onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
              aria-expanded={isOpen}
              aria-controls={panelId}
              className="w-full flex items-center justify-between p-4 sm:p-5 text-left text-sm font-bold text-slate-900 dark:text-white"
            >
              <span className="pr-4">{faq.question}</span>
              <ChevronDown className={`h-4 w-4 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
            </button>
            {isOpen && (
              <div
                id={panelId}
                className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800/60"
              >
                {faq.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
