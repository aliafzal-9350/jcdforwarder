"use client";

import React, { useState, useRef, useEffect } from "react";
import { Globe, ChevronDown, Check } from "lucide-react";
import { useLanguage, type Locale } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

interface LanguageSwitcherProps {
  className?: string;
  align?: "left" | "right";
  transparentTop?: boolean;
}

export function LanguageSwitcher({
  className,
  align = "right",
  transparentTop = true,
}: LanguageSwitcherProps) {
  const { locale, setLocale } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Close on Escape key press
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
        containerRef.current?.querySelector<HTMLButtonElement>("button")?.focus();
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const selectLocale = (lang: Locale) => {
    setLocale(lang);
    setIsOpen(false);
  };

  const currentLabel = locale === "zh" ? "中文" : "EN";

  return (
    <div ref={containerRef} className={cn("relative inline-block text-left", className)}>
      {/* Trigger Button - blends seamlessly with navbar theme */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label={`Current language: ${currentLabel}. Select language.`}
        className={cn(
          "inline-flex items-center gap-1 sm:gap-1.5 px-2 py-1.5 sm:px-2.5 sm:py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 cursor-pointer select-none whitespace-nowrap shrink-0",
          transparentTop
            ? "border border-white/15 bg-white/5 hover:bg-white/10 text-white/90 hover:text-white"
            : "border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white",
          isOpen &&
            (transparentTop
              ? "bg-white/15 border-white/30 text-white"
              : "bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white")
        )}
      >
        <Globe className="w-3.5 h-3.5 opacity-80 shrink-0" aria-hidden="true" />
        <span className="tracking-wide uppercase font-bold whitespace-nowrap">{currentLabel}</span>
        <ChevronDown
          className={cn(
            "w-3 h-3 opacity-60 transition-transform duration-200 shrink-0",
            isOpen && "rotate-180 opacity-100"
          )}
          aria-hidden="true"
        />
      </button>

      {/* Floating Popover Dropdown */}
      {isOpen && (
        <div
          role="menu"
          aria-orientation="vertical"
          className={cn(
            "absolute mt-1.5 z-50 min-w-[130px]",
            align === "right" ? "right-0" : "left-0",
            "bg-slate-900/95 dark:bg-[#0F1E36]/95 backdrop-blur-xl border border-white/10 shadow-2xl rounded-xl p-1.5",
            "animate-in fade-in slide-in-from-top-1 duration-150"
          )}
        >
          {/* English Option */}
          <button
            type="button"
            role="menuitem"
            onClick={() => selectLocale("en")}
            className={cn(
              "w-full flex items-center justify-between px-2.5 py-2 text-xs font-medium rounded-lg transition-colors text-left cursor-pointer",
              locale === "en"
                ? "text-orange-400 font-bold bg-orange-500/10"
                : "text-slate-300 hover:text-white hover:bg-white/5"
            )}
          >
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono font-bold">EN</span>
              <span>English</span>
            </div>
            {locale === "en" && <Check className="w-3.5 h-3.5 text-orange-400 shrink-0" />}
          </button>

          {/* Chinese Option */}
          <button
            type="button"
            role="menuitem"
            onClick={() => selectLocale("zh")}
            className={cn(
              "w-full flex items-center justify-between px-2.5 py-2 text-xs font-medium rounded-lg transition-colors text-left cursor-pointer",
              locale === "zh"
                ? "text-orange-400 font-bold bg-orange-500/10"
                : "text-slate-300 hover:text-white hover:bg-white/5"
            )}
          >
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold">中文</span>
              <span>简体中文</span>
            </div>
            {locale === "zh" && <Check className="w-3.5 h-3.5 text-orange-400 shrink-0" />}
          </button>
        </div>
      )}
    </div>
  );
}
