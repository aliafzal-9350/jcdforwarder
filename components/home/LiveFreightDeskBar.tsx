"use client";

import Link from "next/link";
import { Plane, Ship, Train, Truck, ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function LiveFreightDeskBar() {
  const { t } = useLanguage();

  const deskItems = [
    {
      href: "/services/air-freight",
      icon: Plane,
      name: t("ticker.airFreight"),
      tag: t("ticker.airTag"),
    },
    {
      href: "/services/sea-freight",
      icon: Ship,
      name: t("ticker.oceanFreight"),
      tag: t("ticker.oceanTag"),
    },
    {
      href: "/services/rail-freight",
      icon: Train,
      name: t("ticker.railExpress"),
      tag: t("ticker.railTag"),
    },
    {
      href: "/services/amazon-fba-logistics",
      icon: Truck,
      name: t("ticker.fbaFirstLeg"),
      tag: t("ticker.fbaTag"),
    },
  ];

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm px-5 py-4 sm:px-6">
      <div className="flex flex-col lg:flex-row lg:items-center gap-5 lg:gap-6">
        <div className="flex items-center gap-2.5 shrink-0">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
          </span>
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-white">
              {t("ticker.liveDesk")}
            </div>
            <div className="text-[11px] text-slate-400">{t("ticker.trackingUpdates")}</div>
          </div>
        </div>

        <div className="hidden lg:block h-10 w-px bg-white/10" />

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 flex-1">
          {deskItems.map((item) => (
            <Link key={item.href} href={item.href} className="flex items-center gap-2.5 group">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/5 text-brand-cyan group-hover:bg-white/10 transition-colors">
                <item.icon className="h-4 w-4" />
              </span>
              <span>
                <span className="block text-xs font-bold text-white group-hover:text-brand-cyan transition-colors">
                  {item.name}
                </span>
                <span className="block text-[11px] text-slate-400">{item.tag}</span>
              </span>
            </Link>
          ))}
        </div>

        <div className="hidden lg:block h-10 w-px bg-white/10" />

        <Link
          href="/tools/tracking"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-cyan hover:text-white transition-colors shrink-0"
        >
          <span>{t("ticker.trackShipment")}</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}
