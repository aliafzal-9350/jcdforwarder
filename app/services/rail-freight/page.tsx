"use client";

import React from "react";
import Link from "next/link";
import { SITE_CONFIG, getWhatsAppUrl } from "@/data/siteConfig";
import { useQuoteModal } from "@/components/quote/QuoteModalContext";
import {
  Train,
  ShieldCheck,
  Zap,
  MapPin,
  CheckCircle2,
  Clock,
  ArrowRight,
  MessageCircle,
  FileText,
  Sparkles,
  Compass,
  Layers,
  Leaf,
} from "lucide-react";

export default function RailFreightPage() {
  const { openQuoteModal } = useQuoteModal();

  const corridors = [
    {
      name: "West Passage (Western Corridor)",
      borderGate: "Alashankou / Khorgos (Xinjiang)",
      route: "Chongqing / Chengdu / Xi'an ➔ Kazakhstan ➔ Russia ➔ Belarus (Brest) ➔ Poland (Malaszewicze) ➔ Germany (Duisburg/Hamburg)",
      transitDays: "14–18 Days",
      share: "Handles over 65% of total China-Europe rail volume",
      highlights: [
        "Fastest landbridge connection to Central Europe",
        "Primary corridor for electronics, auto parts & machinery",
        "Dual border crossings at Alashankou & Khorgos reduce congestion",
      ],
    },
    {
      name: "Central Corridor (Erenhot Gateway)",
      borderGate: "Erenhot / Zamiin-Uud (Inner Mongolia)",
      route: "North China & Beijing cluster ➔ Mongolia ➔ Trans-Siberian Railway ➔ Belarus ➔ Poland & Central Europe",
      transitDays: "16–20 Days",
      share: "Key conduit for North China & industrial equipment",
      highlights: [
        "Direct connection to Trans-Mongolian trunk line",
        "Bypasses western congestion during peak Q4 surges",
        "Direct block trains into Warsaw and Prague",
      ],
    },
    {
      name: "Eastern Passage (Manzhouli Gateway)",
      borderGate: "Manzhouli / Zabaikalsk (Heilongjiang)",
      route: "Coastal & Northeast China (Yiwu/Suzhou/Shenyang) ➔ Russia ➔ Belarus ➔ European Union",
      transitDays: "18–22 Days",
      share: "Yixinou Express origin link for e-commerce parcels",
      highlights: [
        "Yiwu-to-Madrid Express line (13,052 km, longest in the world)",
        "Deep cold-chain & reefer container support for electronics",
        "Ideal for East China textile, retail, and general consumer goods",
      ],
    },
  ];

  const originNodes = [
    { city: "Xi'an", code: "XIY", trains: "Chang'an Express", role: "Largest consolidated rail hub with automated inland port terminals." },
    { city: "Chengdu", code: "CTU", trains: "Chengdu-Europe", role: "High-tech electronics and IT manufacturing supply chains." },
    { city: "Chongqing", code: "CKG", trains: "Yuxinou Railway", role: "Pioneer of China-Europe freight trains; automotive & laptop hub." },
    { city: "Zhengzhou", code: "CGO", trains: "Zhengou Express", role: "Central China multimodal rail-air nexus with reefer fleet." },
    { city: "Wuhan", code: "WUH", trains: "Hanxinou Express", role: "Optoelectronics, auto components, and medical equipment." },
    { city: "Yiwu", code: "YIW", trains: "Yixinou (Yiwu-Madrid)", role: "Small commodities, Amazon FBA cartons, and retail consumer goods." },
    { city: "Changsha", code: "CSX", trains: "Xiangou Express", role: "Construction machinery, ceramic goods, and heavy industrial cargo." },
    { city: "Suzhou", code: "SZV", trains: "Suzhou-Europe", role: "Precision electronics and South Jiangsu industrial goods." },
  ];

  return (
    <div className="bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen">
      {/* 1. HERO */}
      <section className="relative overflow-hidden bg-slate-950 text-white py-20 lg:py-28 border-b border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-950/40 via-slate-950 to-slate-950 -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 border border-amber-500/30 px-3 py-1 text-xs font-semibold text-amber-300">
              <ShieldCheck className="h-3.5 w-3.5 text-amber-400" />
              <span>NVOCC Licensed GD20240307220907 • CR Express Contracted Operator</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1]">
              China-Europe Railway <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-300 to-yellow-200">
                Express (CR Express)
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              The sustainable Eurasian landbridge connecting 14 Chinese manufacturing origin nodes directly to Poland, Germany, France, and 27 European nations. 50% faster than ocean freight at a fraction of air freight cost.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => openQuoteModal({ serviceType: "rail-ddp" })}
                className="flex items-center gap-2 rounded-xl bg-amber-600 hover:bg-amber-700 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-amber-600/30 transition-all hover:scale-[1.02]"
              >
                <Sparkles className="h-4 w-4" />
                <span>Get Rail Freight Quote</span>
              </button>

              <a
                href={getWhatsAppUrl("Hello JCD Forwarder, I am requesting a China-Europe train schedule and rate.")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 px-6 py-3.5 text-sm font-bold text-slate-200 transition-all"
              >
                <MessageCircle className="h-4 w-4 text-emerald-400" />
                <span>Inquire via WhatsApp</span>
              </a>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-800/80 max-w-lg">
              <div>
                <div className="text-2xl font-black text-white">16–22 Days</div>
                <div className="text-xs text-slate-400">Terminal-to-Door DDP</div>
              </div>
              <div>
                <div className="text-2xl font-black text-amber-400">50% Faster</div>
                <div className="text-xs text-slate-400">Than Ocean Transit</div>
              </div>
              <div>
                <div className="text-2xl font-black text-emerald-400">-80% CO₂</div>
                <div className="text-xs text-slate-400">Lower Emissions vs. Air</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE THREE EURASIAN PASSAGES */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-3 mb-12">
          <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
            Strategic Railway Corridors
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            The 3 Primary China-Europe Rail Passages
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Engineered through high-capacity border gates ensuring zero bottleneck transit into Poland and Germany.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {corridors.map((corridor) => (
            <div
              key={corridor.name}
              className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold font-mono px-2.5 py-1 rounded bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                    {corridor.transitDays}
                  </span>
                  <span className="text-xs font-semibold text-slate-400">CR Express</span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {corridor.name}
                </h3>

                <div className="rounded-lg bg-slate-50 dark:bg-slate-800/70 p-3 border border-slate-100 dark:border-slate-800 text-xs">
                  <span className="font-semibold text-slate-500 block mb-1">Border Gateway:</span>
                  <div className="font-bold text-slate-900 dark:text-white">{corridor.borderGate}</div>
                </div>

                <div className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-mono bg-slate-50/50 dark:bg-slate-900 p-2.5 rounded border border-slate-100 dark:border-slate-800">
                  {corridor.route}
                </div>

                <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                  {corridor.highlights.map((h, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={() => openQuoteModal({ serviceType: "rail-ddp" })}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 text-white py-2.5 text-xs font-bold transition-colors"
                >
                  <span>Book {corridor.name.split(" ")[0]} Route</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. 14 SOURCING ORIGIN NODES */}
      <section className="py-16 bg-slate-50 dark:bg-slate-900/60 border-t border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-2 mb-10">
            <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
              National Dispatch Network
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              14 Key Chinese Sourcing Origin Terminals
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              JCD Forwarder coordinates domestic factory pickup and rail consolidation from every major manufacturing cluster.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {originNodes.map((node) => (
              <div
                key={node.city}
                className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-base font-bold text-slate-900 dark:text-white">
                    {node.city}
                  </span>
                  <span className="text-[10px] font-mono font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded">
                    {node.code}
                  </span>
                </div>
                <div className="font-semibold text-slate-700 dark:text-slate-300">
                  {node.trains}
                </div>
                <p className="text-slate-500 dark:text-slate-400 text-[11px] leading-relaxed">
                  {node.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. TECHNICAL BOGIE GAUGE CHANGEOVER */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 text-xs font-bold">
              Railway Engineering Insight
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
              Bogie Gauge Changeover &amp; Gantry Transshipment
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              China and the European Union operate on standard track gauge (1,435 mm), while Kazakhstan, Russia, and Belarus operate on Russian broad gauge (1,520 mm).
            </p>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              At the Dostyk/Khorgos (entry) and Brest/Malaszewicze (exit) border hubs, specialized gantry crane systems lift entire shipping containers from standard gauge flatcars onto broad gauge flatcars in under 12 hours, ensuring rapid, zero-cargo-disturbance transshipment.
            </p>
          </div>

          <div className="space-y-3 bg-slate-50 dark:bg-slate-800/60 p-6 rounded-xl border border-slate-100 dark:border-slate-800 text-xs">
            <h4 className="font-bold text-slate-900 dark:text-white">
              Key Transshipment Hubs along the Route:
            </h4>
            <div className="space-y-2">
              <div className="p-2.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                <span className="font-bold text-blue-600">Alashankou / Dostyk:</span> China (1435mm) ➔ Kazakhstan (1520mm)
              </div>
              <div className="p-2.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                <span className="font-bold text-amber-600">Brest / Malaszewicze:</span> Belarus (1520mm) ➔ Poland (1435mm)
              </div>
              <div className="p-2.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                <span className="font-bold text-emerald-600">Duisburg &amp; Hamburg Hubs:</span> Final railhead distribution into Western Europe
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CALL TO ACTION */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-black">
            Switch to High-Speed, Sustainable Rail Freight
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
            Get fixed departure schedules, rail container booking, and door-to-door DDP pricing for your EU shipments.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => openQuoteModal({ serviceType: "rail-ddp" })}
              className="flex items-center gap-2 rounded-xl bg-amber-600 hover:bg-amber-700 px-6 py-3.5 text-sm font-bold shadow-md transition-all hover:scale-105"
            >
              <Sparkles className="h-4 w-4" />
              <span>Launch Quote Wizard</span>
            </button>
            <a
              href={getWhatsAppUrl("Hello JCD Forwarder, I want to book China-Europe rail freight.")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white px-6 py-3.5 text-sm font-bold transition-all"
            >
              <MessageCircle className="h-4 w-4" />
              <span>WhatsApp Rail Desk</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
