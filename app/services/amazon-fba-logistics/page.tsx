"use client";

import React from "react";
import Link from "next/link";
import { SITE_CONFIG, getWhatsAppUrl } from "@/data/siteConfig";
import { useQuoteModal } from "@/components/quote/QuoteModalContext";
import {
  Box,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ArrowRight,
  MessageCircle,
  FileText,
  Calculator,
  Layers,
  Scale,
  Building2,
  PackageCheck,
} from "lucide-react";

export default function AmazonFbaLogisticsPage() {
  const { openQuoteModal } = useQuoteModal();

  const palletStandards = [
    {
      region: "United States (US FBA)",
      dimensions: "48\" × 40\" (1,219 × 1,016 mm)",
      standard: "GMA Grade B or Higher (4-Way Entry)",
      maxHeight: "72 inches (1,828 mm) incl. pallet",
      maxWeight: "1,500 lbs (680 kg)",
      stretchWrap: "Clear stretch film with 50% overlap; 4 corner protection boards",
      requirements: [
        "Broken or missing boards strictly rejected",
        "Cartons must not overhang pallet edges by > 1 inch",
        "FBA box labels facing outwards on all 4 pallet sides",
      ],
    },
    {
      region: "United Kingdom (UK FBA)",
      dimensions: "1,200 × 1,000 mm",
      standard: "4-Way Perimeter Base Wood Pallet (ISPM 15)",
      maxHeight: "1,800 mm (1.8m) incl. pallet",
      maxWeight: "1,000 kg (2,204 lbs)",
      stretchWrap: "Fully stretch wrapped including base pallet blocks",
      requirements: [
        "Pallets must be heat-treated stamped (ISPM 15)",
        "Euro pallets (1200x800) not accepted in standard UK fulfillment centers",
        "Individual carton weight strictly ≤ 23 kg",
      ],
    },
    {
      region: "European Union (EU FBA)",
      dimensions: "1,200 × 800 mm",
      standard: "Official EPAL / EUR 1 Certified Pallets",
      maxHeight: "1,800 mm (1.8m) incl. pallet",
      maxWeight: "500 kg (1,102 lbs)",
      stretchWrap: "Clear transparent wrap; black or opaque wrap rejected",
      requirements: [
        "Official EPAL oval brand stamp required on corner blocks",
        "Heat-treated ISPM 15 phytosanitary compliant",
        "Carton overhang strictly prohibited (0 mm tolerance)",
      ],
    },
  ];

  const prepServices = [
    {
      title: "FNSKU & Barcode Labeling",
      desc: "Precision thermal barcode application over original UPC/EAN or polybags, verified with 2D laser barcode scanners.",
    },
    {
      title: "Carton Re-Boxing & 5-Ply Reinforcement",
      desc: "Replacement of dented factory boxes with heavy-duty double-wall 5-ply corrugated export cartons.",
    },
    {
      title: "Suffocation Warning & Polybagging",
      desc: "Amazon-compliant transparent polybagging with printed multi-language suffocation warnings for apparel and plush toys.",
    },
    {
      title: "Drop Testing & AQL Inspection",
      desc: "ISTA 1A single-carton drop testing and ISO 2859-1 Level II AQL pre-shipment sampling in our Shenzhen warehouse.",
    },
  ];

  return (
    <div className="bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen">
      {/* 1. HERO */}
      <section className="relative overflow-hidden bg-slate-950 text-white py-20 lg:py-28 border-b border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-950/40 via-slate-950 to-slate-950 -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 text-xs font-semibold text-emerald-300">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
              <span>NVOCC Licensed GD20240307220907 • Amazon CARP / ISA Certified Carrier</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1]">
              Amazon FBA First-Leg <br />
              <span className="text-emerald-400">
                Logistics &amp; Prep Solutions
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              End-to-end first-leg freight from Chinese factories directly into Amazon fulfillment centers across the US, UK, Europe, Canada, and Japan. Guaranteed CARP EDI appointment slots, zero dock rejection guarantee, and Shenzhen warehouse FBA prep.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => openQuoteModal({ serviceType: "air-ddp" })}
                className="flex items-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-600/30 transition-all hover:scale-[1.02]"
              >
                <Calculator className="h-4 w-4" />
                <span>Get Instant FBA Quote</span>
              </button>

              <a
                href={getWhatsAppUrl("Hello JCD Forwarder, I need Amazon FBA first leg shipping and FNSKU prep.")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 px-6 py-3.5 text-sm font-bold text-slate-200 transition-all"
              >
                <MessageCircle className="h-4 w-4 text-emerald-400" />
                <span>WhatsApp FBA Specialist</span>
              </a>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-800/80 max-w-lg">
              <div>
                <div className="text-2xl font-black text-white">0% Rejection</div>
                <div className="text-xs text-slate-400">Guaranteed Dock Acceptance</div>
              </div>
              <div>
                <div className="text-2xl font-black text-emerald-400">CARP &amp; ISA</div>
                <div className="text-xs text-slate-400">Direct EDI Appointment Booking</div>
              </div>
              <div>
                <div className="text-2xl font-black text-blue-400">7-Day Free</div>
                <div className="text-xs text-slate-400">Shenzhen Consolidation Staging</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CARTON WEIGHT & LABELING RULES */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-3 mb-12">
          <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
            Amazon Inbound Compliance
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Carton Weight Rules &amp; Mandatory Warning Labels
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Strictly enforced standards across Amazon fulfillment centers worldwide to prevent dock refusal and inbound fee penalties.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-3 shadow-sm">
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-600">
              Standard Maximum Weight
            </div>
            <div className="text-2xl font-black text-slate-900 dark:text-white">
              ≤ 50 lbs (22.7 kg)
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Standard Amazon US/CA carton weight ceiling. In the UK and European Union, individual box weight must strictly not exceed <strong>23 kg</strong>.
            </p>
            <div className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 p-2 rounded">
              Standard operator single-person handling
            </div>
          </div>

          <div className="rounded-2xl border border-amber-300 dark:border-amber-900/60 bg-white dark:bg-slate-900 p-6 space-y-3 shadow-sm">
            <div className="text-xs font-bold uppercase tracking-wider text-amber-600">
              Team Lift Required
            </div>
            <div className="text-2xl font-black text-slate-900 dark:text-white">
              50 – 100 lbs (23 – 45 kg)
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Any carton containing a single oversized item within this range must have high-visibility <strong>&quot;Team Lift&quot;</strong> stickers affixed on top and all four sides.
            </p>
            <div className="text-[11px] font-semibold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 p-2 rounded">
              Multi-person lift requirement label mandatory
            </div>
          </div>

          <div className="rounded-2xl border border-red-300 dark:border-red-900/60 bg-white dark:bg-slate-900 p-6 space-y-3 shadow-sm">
            <div className="text-xs font-bold uppercase tracking-wider text-red-600">
              Mechanical Lift Required
            </div>
            <div className="text-2xl font-black text-slate-900 dark:text-white">
              &gt; 100 lbs (&gt; 45 kg)
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Cartons containing single heavy products above 100 lbs require conspicuous <strong>&quot;Mechanical Lift&quot;</strong> warning labels on all sides to authorize forklift handling.
            </p>
            <div className="text-[11px] font-semibold text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-950/40 p-2 rounded">
              Mechanized forklift handling protocol
            </div>
          </div>
        </div>
      </section>

      {/* 3. REGIONAL PALLET SPECIFICATIONS MATRIX */}
      <section className="py-16 bg-slate-50 dark:bg-slate-900/60 border-t border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-3 mb-12">
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
              Palletization Blueprint
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Regional Pallet Standards (US GMA vs. UK vs. EU EPAL)
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              JCD Forwarder builds and stretch-wraps pallets strictly conforming to destination regional Amazon inbound dock rules.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {palletStandards.map((pallet) => (
              <div
                key={pallet.region}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-4 shadow-sm"
              >
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                  <h3 className="text-base font-black text-slate-900 dark:text-white">
                    {pallet.region}
                  </h3>
                  <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                    {pallet.dimensions.split(" ")[0]}
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-slate-500 font-semibold block">Pallet Standard:</span>
                    <strong className="text-slate-900 dark:text-white">{pallet.standard}</strong>
                  </div>

                  <div>
                    <span className="text-slate-500 font-semibold block">Max Pallet Height:</span>
                    <strong className="text-slate-900 dark:text-white">{pallet.maxHeight}</strong>
                  </div>

                  <div>
                    <span className="text-slate-500 font-semibold block">Max Pallet Weight:</span>
                    <strong className="text-slate-900 dark:text-white">{pallet.maxWeight}</strong>
                  </div>

                  <div>
                    <span className="text-slate-500 font-semibold block">Wrapping Specification:</span>
                    <span className="text-slate-700 dark:text-slate-300">{pallet.stretchWrap}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2 text-xs">
                  <span className="font-bold text-slate-900 dark:text-white block">
                    Dock Inbound Rules:
                  </span>
                  {pallet.requirements.map((req, idx) => (
                    <div key={idx} className="flex items-start gap-1.5 text-slate-600 dark:text-slate-400">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{req}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. VALUE-ADDED FBA PREP IN SHENZHEN */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-3 mb-10">
          <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
            Warehouse Capabilities
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Shenzhen Warehouse FBA Prep &amp; Inspection
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Fix packaging flaws at the Chinese origin before cargo departs, eliminating costly Amazon chargebacks and disposal fees.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {prepServices.map((prep) => (
            <div
              key={prep.title}
              className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs space-y-2"
            >
              <div className="h-10 w-10 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center mb-3">
                <PackageCheck className="h-5 w-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                {prep.title}
              </h4>
              <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                {prep.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. CALL TO ACTION */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-black">
            Ship Direct to Amazon FBA with Zero Dock Hassle
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
            Book CARP appointments, pallet prep, and all-inclusive landed DDP rates into ONT8, GYR3, LBA4, DTM2, and all major fulfillment centers.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => openQuoteModal({ serviceType: "air-ddp" })}
              className="flex items-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 px-6 py-3.5 text-sm font-bold shadow-md transition-all hover:scale-105"
            >
              <Calculator className="h-4 w-4" />
              <span>Launch Quote Wizard</span>
            </button>
            <a
              href={getWhatsAppUrl("Hello JCD Forwarder, I need Amazon FBA shipping to fulfillment centers.")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white px-6 py-3.5 text-sm font-bold transition-all"
            >
              <MessageCircle className="h-4 w-4" />
              <span>WhatsApp FBA Desk</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
