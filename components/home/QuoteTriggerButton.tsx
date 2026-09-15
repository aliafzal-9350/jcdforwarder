"use client";

import { ReactNode } from "react";
import { useQuoteModal } from "@/components/quote/QuoteModalContext";

interface QuoteTriggerButtonProps {
  className?: string;
  destinationSlug?: string;
  children: ReactNode;
}

export function QuoteTriggerButton({ className, destinationSlug, children }: QuoteTriggerButtonProps) {
  const { openQuoteModal } = useQuoteModal();

  return (
    <button
      type="button"
      onClick={() => openQuoteModal(destinationSlug ? { destinationSlug } : undefined)}
      className={className}
    >
      {children}
    </button>
  );
}
