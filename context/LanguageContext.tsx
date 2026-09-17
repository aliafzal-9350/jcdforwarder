"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { en } from "@/data/translations/en";
import { zh } from "@/data/translations/zh";

export type Locale = "en" | "zh";

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, fallback?: string) => string;
}

const dictionaries = {
  en,
  zh,
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = "jcd_locale";
const COOKIE_NAME = "NEXT_LOCALE";

/**
 * Traverse an object using dot notation path (e.g. 'hero.titlePart1')
 */
function getNestedValue(obj: Record<string, unknown>, path: string): unknown {
  const parts = path.split(".");
  let current: unknown = obj;
  for (const part of parts) {
    if (current && typeof current === "object" && part in (current as Record<string, unknown>)) {
      current = (current as Record<string, unknown>)[part];
    } else {
      return undefined;
    }
  }
  return current;
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Always initialize with 'en' to guarantee safe SSR and avoid hydration mismatch
  const [locale, setLocaleState] = useState<Locale>("en");
  const [mounted, setMounted] = useState(false);

  // Sync with localStorage/cookies on mount
  useEffect(() => {
    setMounted(true);
    try {
      const savedLocale = localStorage.getItem(STORAGE_KEY) as Locale | null;
      if (savedLocale === "en" || savedLocale === "zh") {
        setLocaleState(savedLocale);
        document.documentElement.lang = savedLocale;
        return;
      }

      // Check cookie fallback
      const match = document.cookie.match(new RegExp(`(^| )${COOKIE_NAME}=([^;]+)`));
      if (match && (match[2] === "en" || match[2] === "zh")) {
        setLocaleState(match[2] as Locale);
        document.documentElement.lang = match[2];
        return;
      }

      // Check browser navigator language
      if (typeof navigator !== "undefined" && navigator.language) {
        const lang = navigator.language.toLowerCase();
        if (lang.startsWith("zh")) {
          setLocaleState("zh");
          document.documentElement.lang = "zh";
        }
      }
    } catch {
      // Storage access blocked or unavailable
    }
  }, []);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    try {
      localStorage.setItem(STORAGE_KEY, newLocale);
      document.cookie = `${COOKIE_NAME}=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
      if (typeof document !== "undefined") {
        document.documentElement.lang = newLocale;
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  const t = useCallback(
    (key: string, fallback?: string): string => {
      // Active dictionary lookup
      const activeDict = dictionaries[locale] as unknown as Record<string, unknown>;
      const value = getNestedValue(activeDict, key);
      if (typeof value === "string") {
        return value;
      }

      // Fallback to English dictionary
      if (locale !== "en") {
        const enDict = dictionaries.en as unknown as Record<string, unknown>;
        const enVal = getNestedValue(enDict, key);
        if (typeof enVal === "string") {
          return enVal;
        }
      }

      // Return explicit fallback or key name
      return fallback ?? key;
    },
    [locale]
  );

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
