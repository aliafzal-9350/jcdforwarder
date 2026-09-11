"use client";

import React from "react";
import Link from "next/link";
import { ORIGIN_HUBS, type OriginHub } from "@/data/origins";
import { SITE_CONFIG, getWhatsAppUrl } from "@/data/siteConfig";
import { useQuoteModal } from "@/components/quote/QuoteModalContext";
import {
  Building2,
  ShieldCheck,
  Anchor,
  Plane,
  Clock,
  MapPin,
  ArrowRight,
  Sparkles,
  MessageCircle,
  CheckCircle2,
  Warehouse,
  Boxes,
} from "lucide-react";

export default function OriginsIndexPage() {
  const { openQuoteModal } = useQuoteModal();

  return (
    <div className="bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen">
      {/* 1. HERO */}
      <section className="relative overflow-hidden bg-slate-950 text-white py-16 lg:py-24 border-b border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-950/40 via-slate-950 to-slate-950 -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 border border-blue-500/30 px-3 py-1 text-xs font-semibold text-blue-300">
              <ShieldCheck className="h-3.5 w-3.5 text-blue-400" />
              <span>NVOCC License: GD20240307220907 • 7 Chinese Origin Ports</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight">
              Chinese Origin Hubs &amp; <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-sky-400">
                Port Consolidation Bases
              </span>
            </h1>

            <p className="text-base text-slate-300 leading-relaxed">
              JCD Forwarder maintains dedicated dispatch teams, bonded warehouses, and local pickup drayage fleets across all 7 major Chinese manufacturing and export port clusters.
            </p>
          </div>
        </div>
      </section>

      {/* 2. ORIGIN HUBS DIRECTORY GRID */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-3 mb-12">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
            Manufacturing &amp; Export Infrastructure
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            7 Strategic Port Gateways Across China
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Select your supplier&apos;s manufacturing region to review berth depths, airport schedules, and local factory pickup radii.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {ORIGIN_HUBS.map((hub) => (
            <div
              key={hub.id}
              className={`rounded-2xl border bg-white dark:bg-slate-900 p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition-all ${
                hub.isHeadquarters
                  ? "border-blue-500 ring-2 ring-blue-500/20"
                  : "border-slate-200 dark:border-slate-800"
              }`}
            >
              <div className="space-y-5">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                        {hub.name}
                      </h3>
                      <span className="text-sm font-medium text-slate-500 font-mono">
                        {hub.chineseName}
                      </span>
                    </div>
                    <span className="text-xs text-blue-600 dark:text-blue-400 font-semibold mt-0.5 block">
                      {hub.role} • {hub.province} Province
                    </span>
                  </div>

                  {hub.isHeadquarters ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-blue-600 px-3 py-1 text-xs font-bold text-white shadow-sm">
                      <Warehouse className="h-3 w-3" /> HQ Facility
                    </span>
                  ) : (
                    <span className="text-xs font-mono font-bold text-slate-500 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded">
                      Branch Hub
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {hub.overview}
                </p>

                {/* Port and Airport Matrix */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-white mb-1">
                      <Anchor className="h-4 w-4 text-blue-600" />
                      Ocean Container Ports
                    </div>
                    <div className="space-y-1 text-slate-600 dark:text-slate-400 text-[11px]">
                      {hub.seaports.map((port) => (
                        <div key={port.code} className="flex justify-between">
                          <span>{port.name}:</span>
                          <strong className="font-mono text-slate-900 dark:text-white">
                            {port.code}
                          </strong>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-white mb-1">
                      <Plane className="h-4 w-4 text-indigo-600" />
                      Air Cargo Gateways
                    </div>
                    <div className="space-y-1 text-slate-600 dark:text-slate-400 text-[11px]">
                      {hub.airports.map((ap) => (
                        <div key={ap.code} className="flex justify-between">
                          <span>{ap.name.split(" ")[0]}:</span>
                          <strong className="font-mono text-slate-900 dark:text-white">
                            {ap.code}
                          </strong>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Pickup & Industries */}
                <div className="space-y-2 text-xs pt-2 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                    <span>Factory Pickup Radius:</span>
                    <strong className="text-slate-900 dark:text-white">
                      Within {hub.pickup.radiusKm} km ({hub.pickup.averageDispatchHours}h average dispatch)
                    </strong>
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    <span className="text-[11px] text-slate-500 font-semibold mr-1">
                      Core Industries:
                    </span>
                    {hub.manufacturingIndustries.slice(0, 4).map((ind, idx) => (
                      <span
                        key={idx}
                        className="rounded bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-[10px] font-medium text-slate-700 dark:text-slate-300"
                      >
                        {ind}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <Link
                  href={`/origins/${hub.slug}`}
                  className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
                >
                  <span>Detailed Hub Overview</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>

                <button
                  onClick={() =>
                    openQuoteModal({
                      originId: hub.id,
                    })
                  }
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm transition-colors"
                >
                  Quote from {hub.name}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. CALL TO ACTION */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-black">
            Have Suppliers in Multiple Chinese Cities?
          </h2>
          <p className="text-sm sm:text-base text-blue-100 max-w-2xl mx-auto">
            Our Shenzhen Xinhe facility provides free 7-day consolidation warehousing to merge supplier shipments into a single cost-effective container.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => openQuoteModal({ originId: "shenzhen" })}
              className="flex items-center gap-2 rounded-xl bg-white text-blue-600 hover:bg-blue-50 px-7 py-4 text-sm font-bold shadow-lg transition-all hover:scale-105"
            >
              <Sparkles className="h-4 w-4" />
              <span>Consolidate Your Cargo</span>
            </button>
            <a
              href={getWhatsAppUrl("Hello JCD Forwarder, I need consolidation across multiple Chinese factories.")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl bg-blue-800 hover:bg-blue-900 text-white border border-blue-400 px-7 py-4 text-sm font-bold transition-all"
            >
              <MessageCircle className="h-4 w-4" />
              <span>WhatsApp Consolidation Desk</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
