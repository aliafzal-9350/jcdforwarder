"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { TARGET_ROUTES, type CountryRoute } from "@/data/routes";
import { SITE_CONFIG, getWhatsAppUrl } from "@/data/siteConfig";
import { useQuoteModal } from "@/components/quote/QuoteModalContext";
import {
  Globe,
  Search,
  ShieldCheck,
  Plane,
  Ship,
  Train,
  Zap,
  ArrowRight,
  Sparkles,
  MessageCircle,
  Filter,
  CheckCircle2,
} from "lucide-react";

export default function RoutesIndexPage() {
  const { openQuoteModal } = useQuoteModal();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState<string>("All");

  const regions = [
    "All",
    "North America",
    "Europe",
    "Middle East",
    "Asia Pacific",
    "South Asia",
    "Latin America & Caribbean",
  ];

  const filteredRoutes = useMemo(() => {
    return TARGET_ROUTES.filter((route) => {
      const matchesSearch =
        route.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        route.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        route.region.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesRegion =
        selectedRegion === "All" || route.region === selectedRegion;

      return matchesSearch && matchesRegion;
    });
  }, [searchQuery, selectedRegion]);

  return (
    <div className="bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen">
      {/* 1. HERO */}
      <section className="relative overflow-hidden bg-slate-950 text-white py-16 lg:py-24 border-b border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-950/40 via-slate-950 to-slate-950 -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 border border-blue-500/30 px-3 py-1 text-xs font-semibold text-blue-300">
              <ShieldCheck className="h-3.5 w-3.5 text-blue-400" />
              <span>NVOCC License: GD20240307220907 • 44 Global Trade Lanes</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight">
              Global Shipping Routes <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-sky-400">
                Direct DDP Delivery from China
              </span>
            </h1>

            <p className="text-base text-slate-300 leading-relaxed">
              Comprehensive country-by-country logistics specifications, customs de minimis thresholds, duty formulas, and Amazon FBA pallet standards across 44 global destinations.
            </p>
          </div>
        </div>
      </section>

      {/* 2. SEARCH & FILTER BAR */}
      <section className="py-8 bg-slate-50 dark:bg-slate-900/60 border-b border-slate-200 dark:border-slate-800 sticky top-20 z-30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            {/* Search Input */}
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search destination by country name, ISO code (e.g. US, DE, GB)..."
                className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20 shadow-sm"
              />
            </div>

            {/* Total Results Count */}
            <div className="text-xs font-mono font-semibold text-slate-500 shrink-0">
              Showing <strong className="text-blue-600 dark:text-blue-400">{filteredRoutes.length}</strong> of {TARGET_ROUTES.length} Routes
            </div>
          </div>

          {/* Region Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs scrollbar-none">
            {regions.map((reg) => (
              <button
                key={reg}
                onClick={() => setSelectedRegion(reg)}
                className={`px-3.5 py-1.5 rounded-lg font-bold shrink-0 transition-all ${
                  selectedRegion === reg
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 border border-slate-200 dark:border-slate-700"
                }`}
              >
                {reg}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. ROUTES CARDS GRID */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredRoutes.length === 0 ? (
          <div className="text-center py-20 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 p-8">
            <Globe className="h-12 w-12 text-slate-400 mx-auto mb-3 opacity-60" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              No matching shipping routes found
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Try adjusting your search keyword or selecting a different geographical region.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedRegion("All");
              }}
              className="mt-4 px-4 py-2 rounded-lg bg-blue-600 text-white text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredRoutes.map((route) => (
              <div
                key={route.code}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 flex flex-col justify-between shadow-sm hover:shadow-md hover:border-blue-500/50 transition-all group"
              >
                <div className="space-y-3">
                  {/* Country Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{route.flag}</span>
                      <div>
                        <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                          {route.name}
                        </h3>
                        <span className="text-[10px] font-mono text-slate-400">
                          {route.region}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-black px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                      {route.code}
                    </span>
                  </div>

                  {/* Key Metrics */}
                  <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex justify-between">
                      <span className="text-slate-500">De Minimis:</span>
                      <strong className="text-slate-900 dark:text-white truncate max-w-[140px]">
                        {route.deMinimisThreshold.split("(")[0]}
                      </strong>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-slate-500">Air Express:</span>
                      <strong className="text-slate-900 dark:text-white">
                        5–7 Days
                      </strong>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-slate-500">Sea Freight:</span>
                      <strong className="text-slate-900 dark:text-white">
                        14–28 Days
                      </strong>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-slate-500">Pallet Standard:</span>
                      <span className="text-slate-700 dark:text-slate-300 font-medium truncate max-w-[140px]">
                        {route.palletSpecs.palletType.split("(")[0]}
                      </span>
                    </div>
                  </div>

                  {/* Available Modes Icons */}
                  <div className="flex items-center gap-2 pt-2 text-slate-400 text-xs">
                    <span className="text-[10px] text-slate-500 font-semibold">Modes:</span>
                    <div className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400">
                      <span title="Air DDP Available"><Plane className="h-3.5 w-3.5" /></span>
                      <span title="Ocean FCL/LCL Available"><Ship className="h-3.5 w-3.5" /></span>
                      {route.region === "Europe" && (
                        <span title="CR Express Rail Available"><Train className="h-3.5 w-3.5 text-amber-500" /></span>
                      )}
                      <span title="Express Courier Available"><Zap className="h-3.5 w-3.5 text-indigo-500" /></span>
                    </div>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <Link
                    href={`/routes/${route.slug}`}
                    className="text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-blue-600 flex items-center gap-1"
                  >
                    <span>Full Guide</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>

                  <button
                    onClick={() =>
                      openQuoteModal({
                        destinationSlug: route.slug,
                      })
                    }
                    className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm transition-colors"
                  >
                    Quote
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 4. CALL TO ACTION STRIP */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl font-black">
            Need Shipping to a Destination Not Listed?
          </h2>
          <p className="text-sm text-slate-400 max-w-xl mx-auto">
            Our global NVOCC carrier network handles custom chartered routes and transshipments to over 120 countries worldwide.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => openQuoteModal()}
              className="flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 px-6 py-3.5 text-sm font-bold shadow-md transition-all hover:scale-105"
            >
              <Sparkles className="h-4 w-4" />
              <span>Launch Quote Wizard</span>
            </button>
            <a
              href={getWhatsAppUrl("Hello JCD Forwarder, I have an inquiry for a custom country route.")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white px-6 py-3.5 text-sm font-bold transition-all"
            >
              <MessageCircle className="h-4 w-4" />
              <span>WhatsApp Inquiries</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
