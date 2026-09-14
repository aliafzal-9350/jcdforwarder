"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface BrandLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  href?: string;
  variant?: "default" | "light" | "dark";
}

export function BrandLogo({
  className,
  size = "md",
  showText = true,
  href = "/",
  variant = "default",
}: BrandLogoProps) {
  const [imageError, setImageError] = useState(false);

  const dimensions = {
    sm: { width: 32, height: 32, text: "text-base", sub: "text-[10px]" },
    md: { width: 44, height: 44, text: "text-xl", sub: "text-[11px]" },
    lg: { width: 56, height: 56, text: "text-2xl", sub: "text-xs" },
  }[size];

  const logoContent = (
    <div className={cn("flex items-center gap-3 group select-none", className)}>
      {/* Brand Mark Container */}
      <div
        className={cn(
          "relative overflow-hidden rounded-xl shadow-xs transition-transform duration-200 group-hover:scale-105 shrink-0 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-0.5",
          size === "sm" && "h-9 w-9 rounded-lg",
          size === "md" && "h-11 w-11 rounded-xl",
          size === "lg" && "h-14 w-14 rounded-2xl"
        )}
      >
        {!imageError ? (
          <Image
            src="/logo.png"
            alt="JCD Forwarder Logo"
            width={dimensions.width * 2}
            height={dimensions.height * 2}
            className="h-full w-full object-contain rounded-lg"
            priority
            onError={() => setImageError(true)}
          />
        ) : (
          /* Fallback if image fails */
          <div className="h-full w-full bg-[#081A36] flex items-center justify-center text-white font-black text-sm tracking-wider">
            JCD
          </div>
        )}
      </div>

      {/* Brand Typography */}
      {showText && (
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-1.5">
            <span
              className={cn(
                "font-black tracking-tight font-heading leading-tight",
                variant === "light"
                  ? "text-white"
                  : variant === "dark"
                  ? "text-slate-900"
                  : "text-slate-900 dark:text-white",
                dimensions.text
              )}
            >
              JCD FORWARDER
            </span>
            <span className="hidden xl:inline-block rounded bg-blue-100 dark:bg-blue-950/70 px-1.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-blue-700 dark:text-blue-300 border border-blue-200/60 dark:border-blue-800/60">
              NVOCC
            </span>
          </div>
          <span
            className={cn(
              "font-medium tracking-tight truncate max-w-[280px] sm:max-w-none",
              variant === "light"
                ? "text-slate-400"
                : "text-slate-500 dark:text-slate-400",
              dimensions.sub
            )}
          >
            Shenzhen Jiechengda Int&apos;l Freight Forwarding Co., Ltd.
          </span>
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="inline-block" aria-label="JCD Forwarder Homepage">
        {logoContent}
      </Link>
    );
  }

  return logoContent;
}
