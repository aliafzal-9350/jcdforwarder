"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

interface BrandLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  href?: string;
  variant?: "default" | "light" | "dark";
}

const SIZES = {
  sm: { mark: "text-base sm:text-lg", sub: "text-[10px]" },
  md: { mark: "text-lg sm:text-xl md:text-2xl", sub: "text-[11px]" },
  lg: { mark: "text-2xl sm:text-3xl", sub: "text-xs" },
} as const;

export function BrandLogo({
  className,
  size = "md",
  showText = true,
  href = "/",
  variant = "default",
}: BrandLogoProps) {
  const s = SIZES[size];
  const { locale } = useLanguage();

  const logoContent = (
    <div className={cn("flex flex-col gap-0.5 select-none", className)}>
      <div className="flex items-baseline gap-2">
        <span className={cn("font-black tracking-tight leading-none text-brand-orange", s.mark)}>
          JCD
        </span>
        <span
          className={cn(
            "font-black tracking-tight leading-none",
            s.mark,
            variant === "light"
              ? "text-white"
              : variant === "dark"
              ? "text-slate-900"
              : "text-brand-navy dark:text-white"
          )}
        >
          FORWARDER
        </span>
      </div>

      {showText && (
        <span
          className={cn(
            "hidden sm:block font-medium tracking-tight truncate max-w-[280px]",
            variant === "light"
              ? "text-slate-400"
              : "text-slate-500 dark:text-slate-400",
            s.sub
          )}
        >
          {locale === "zh"
            ? "深圳市捷成达国际货运代理有限公司"
            : "Shenzhen Jiechengda Int'l Freight Forwarding Co., Ltd."}
        </span>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="inline-block group" aria-label="JCD Forwarder Homepage">
        {logoContent}
      </Link>
    );
  }

  return logoContent;
}
