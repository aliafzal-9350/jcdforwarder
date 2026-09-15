"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface BrandLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  href?: string;
  variant?: "default" | "light" | "dark";
}

const SIZES = {
  sm: { mark: "text-base sm:text-lg", sub: "text-[10px]" },
  md: { mark: "text-xl sm:text-2xl", sub: "text-[11px]" },
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
        <span className="hidden xl:inline-block rounded bg-blue-100 dark:bg-blue-950/70 px-1.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-blue-700 dark:text-blue-300 border border-blue-200/60 dark:border-blue-800/60">
          NVOCC
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
          Shenzhen Jiechengda Int&apos;l Freight Forwarding Co., Ltd.
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
