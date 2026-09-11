"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export interface QuoteModalInitialData {
  originId?: string;
  destinationSlug?: string;
  serviceType?: string;
  weightKg?: number;
  volumeCbm?: number;
}

interface QuoteModalContextType {
  isOpen: boolean;
  initialData: QuoteModalInitialData;
  openQuoteModal: (data?: QuoteModalInitialData) => void;
  closeQuoteModal: () => void;
}

const QuoteModalContext = createContext<QuoteModalContextType | undefined>(
  undefined
);

export function QuoteModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [initialData, setInitialData] = useState<QuoteModalInitialData>({});

  const openQuoteModal = (data?: QuoteModalInitialData) => {
    if (data) {
      setInitialData(data);
    } else {
      setInitialData({});
    }
    setIsOpen(true);
  };

  const closeQuoteModal = () => {
    setIsOpen(false);
  };

  return (
    <QuoteModalContext.Provider
      value={{
        isOpen,
        initialData,
        openQuoteModal,
        closeQuoteModal,
      }}
    >
      {children}
    </QuoteModalContext.Provider>
  );
}

export function useQuoteModal() {
  const context = useContext(QuoteModalContext);
  if (!context) {
    throw new Error("useQuoteModal must be used within a QuoteModalProvider");
  }
  return context;
}
