"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SITE_CONFIG, getWhatsAppUrl } from "@/data/siteConfig";
import { ORIGIN_HUBS } from "@/data/origins";
import { TARGET_ROUTES } from "@/data/routes";
import { FAQS } from "@/data/faqs";
import { useQuoteModal } from "@/components/quote/QuoteModalContext";
import {
  ShieldCheck,
  Award,
  Star,
  Plane,
  Ship,
  Train,
  Truck,
  Box,
  Layers,
  Calculator,
  Compass,
  ArrowRight,
  MessageCircle,
  Clock,
  CheckCircle2,
  ChevronDown,
  Building2,
  MapPin,
  Phone,
  Mail,
  Zap,
  Globe,
  Quote,
  Check,
  Search,
  Ruler,
  Anchor,
  FileText,
  ClipboardList,
} from "lucide-react";

export default function HomePage() {
  const { openQuoteModal } = useQuoteModal();
  const [activeSop, setActiveSop] = useState<"fcl" | "lcl" | "air" | "fba">("fcl");
  const [openFaqId, setOpenFaqId] = useState<string | null>(FAQS[0]?.id || null);

  const featuredRoutes = TARGET_ROUTES.slice(0, 8);
  const featuredFaqs = FAQS.filter((f) => f.featured).slice(0, 6);

  // Alibaba Verified Reviews
  const verifiedReviews = [
    {
      author: "Marcus Vance",
      company: "Apex Peak Goods LLC",
      country: "United States",
      rating: 5,
      date: "August 2026",
      text: "JCD Forwarder handles all our 40HQ container shipments from Ningbo and Shenzhen directly into Amazon ONT8 and GYR3. Zero dock rejections in 2 years, flawless DDP customs clearance, and David is always available on WhatsApp within 10 minutes.",
      route: "China to US (Matson Sea DDP)",
    },
    {
      author: "Elena Rostova",
      company: "Nordic Retail Group",
      country: "Germany",
      rating: 5,
      date: "July 2026",
      text: "We rely on JCD for our lithium battery consumer electronics via their Hong Kong air freight line. All UN38.3 test summaries and MSDS clearances were checked thoroughly before departure. Landed at Frankfurt with zero customs hold-up.",
      route: "Shenzhen to Germany (Air DDP)",
    },
    {
      author: "Julian Thorne",
      company: "Thorne & Cross Ltd",
      country: "United Kingdom",
      rating: 5,
      date: "August 2026",
      text: "Their Shenzhen warehouse consolidated goods from 6 different Yiwu and Guangdong factories into one clean 40HQ container. Saved us over £3,800 in fragmented LCL fees. Exceptional logistics engineering and transparent invoices.",
      route: "Yiwu/Shenzhen to UK (Sea FCL)",
    },
    {
      author: "Tariq Al-Mansoor",
      company: "Gulf Direct Distribution",
      country: "United Arab Emirates",
      rating: 5,
      date: "June 2026",
      text: "Fastest air cargo turnaround from Guangzhou Baiyun to Dubai DWC. Reliable pre-clearance, accurate duty calculation, and prompt POD hand-off. Highly recommend JCD Forwarder for high-value merchandise.",
      route: "Guangzhou to UAE (Air Cargo)",
    },
  ];

  const sopData = {
    fcl: {
      title: "12-Step Full Container Load (FCL) Standard Operating Procedure",
      subtitle: "Dedicated 20GP, 40GP & 40HQ container drayage directly from Chinese factories.",
      steps: [
        { num: "01", name: "Carrier Space Booking", desc: "Contracted tier-1 carrier space locked 7 days prior to vessel departure." },
        { num: "02", name: "S/O & Equipment Release", desc: "EIR equipment release generated for empty container pick-up from terminal." },
        { num: "03", name: "Factory Drayage Haulage", desc: "Clean, inspected container dispatched to supplier manufacturing facility." },
        { num: "04", name: "Stuffing & Cargo Lashing", desc: "Cargo loaded under strict weight balance with heavy-duty dunnage air bags." },
        { num: "05", name: "ISO 17712 Bolt Sealing", desc: "Tamper-evident high-security bolt seal locked and recorded on manifest." },
        { num: "06", name: "Port Gate-in & SOLAS VGM", desc: "Verified Gross Mass submitted electronically via terminal weighbridge." },
        { num: "07", name: "China Customs Clearance", desc: "Single-window export declaration filed under JCD licensed broker code." },
        { num: "08", name: "Gantry Vessel Loading", desc: "Container stacked aboard scheduled liner (COSCO, Evergreen, Matson)." },
        { num: "09", name: "Master B/L & Satellite AIS", desc: "MBL issued with 24/7 real-time satellite GPS vessel tracking enabled." },
        { num: "10", name: "Pre-Arrival Customs (ISF)", desc: "Destination import clearance submitted 5 days before vessel docking." },
        { num: "11", name: "Port Discharge & Drayage", desc: "Priority terminal gate-out directly onto tri-axle chassis without demurrage." },
        { num: "12", name: "Final Dock Delivery & POD", desc: "Live-unload or drop-and-pick at buyer warehouse with signed POD." },
      ],
    },
    fba: {
      title: "Amazon FBA First-Leg Compliance & Delivery SOP",
      subtitle: "CARP EDI booking, ISA scheduling, and regional GMA / EPAL palletization.",
      steps: [
        { num: "01", name: "FNSKU & Carton Verification", desc: "Carton weight checked against ≤ 22.7 kg limit; FNSKU barcodes scanned." },
        { num: "02", name: "Shenzhen Warehouse Staging", desc: "Free 7-day consolidation and repacking in 500 m² Xinhe facility." },
        { num: "03", name: "Export Customs & Booking", desc: "Electronic export declaration and airline/vessel space confirmation." },
        { num: "04", name: "Linehaul Freight Transit", desc: "Priority express air flight or Matson ocean vessel to destination." },
        { num: "05", name: "Customs DDP Clearance", desc: "Duty and import tax settled under JCD bonded customs broker account." },
        { num: "06", name: "Deconsolidation & EPAL Prep", desc: "Pallets built to exact US GMA (48x40\") or EU EPAL (1200x800mm) specs." },
        { num: "07", name: "CARP / ISA Appointment", desc: "Delivery time-slot confirmed directly via Amazon Carrier Portal EDI." },
        { num: "08", name: "Fulfillment Center Delivery", desc: "Direct truckload delivery to ONT8, GYR3, LBA4, DTM2 with zero rejection." },
      ],
    },
    air: {
      title: "Air DDP Wheel-to-Wheel Express Flight Lifecycle",
      subtitle: "5–7 business days landed transit via Shenzhen (SZX) and Guangzhou (CAN).",
      steps: [
        { num: "01", name: "Flight Space Allocation", desc: "Fixed block-space agreement (BSA) locks upper-deck freighter pallets." },
        { num: "02", name: "Warehouse Inbound & X-Ray", desc: "Civil aviation security scan, 1:6000 volumetric verification & labeling." },
        { num: "03", name: "Export Customs Release", desc: "Single-window customs filing with immediate electronic export release." },
        { num: "04", name: "Direct Scheduled Flight", desc: "Direct freighter flight to Liege (LGG), London (LHR), or Los Angeles (LAX)." },
        { num: "05", name: "Apron Breakdown (< 6H)", desc: "Priority cargo breakdown on airport apron within 6 hours of touchdown." },
        { num: "06", name: "Fiscal Customs Clearance", desc: "Bonded customs clearance and automated import VAT/duty payment." },
        { num: "07", name: "Last-Mile Courier Handover", desc: "Direct injection into UPS, FedEx, or bonded linehaul delivery fleet." },
      ],
    },
    lcl: {
      title: "15-Step LCL Multi-Vendor Consolidation SOP",
      subtitle: "Consolidate small shipments from multiple Chinese factories into one cost-effective box.",
      steps: [
        { num: "01", name: "Warehouse Inbound Entry", desc: "Goods received at Shenzhen Xinhe warehouse with unique QR barcode tags." },
        { num: "02", name: "Laser Volumetric Scan", desc: "Precise dimensions and weight logged to verify manufacturer packing list." },
        { num: "03", name: "Consolidation Plan (CLP)", desc: "Cartons organized by destination port and customs clearance category." },
        { num: "04", name: "Container Stuffing", desc: "Heavy cartons at bottom, cargo nets and strapping to prevent sea-shift." },
        { num: "05", name: "Unified Export Customs", desc: "Consolidated customs filing under unified export manifest." },
        { num: "06", name: "Destination De-stuffing", desc: "Container opened at bonded CFS warehouse; items sorted per House B/L." },
        { num: "07", name: "Door Delivery Handover", desc: "Individual shipments dispatched to commercial addresses or Amazon FBA." },
      ],
    },
  };

  return (
    <div className="bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-slate-950 text-white pt-16 pb-24 lg:pt-24 lg:pb-32 border-b border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/40 via-slate-950 to-slate-950 -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Headline & Trust Proof */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap items-center gap-2">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 px-3 py-1 text-xs font-semibold text-blue-300">
                  <ShieldCheck className="h-3.5 w-3.5 text-blue-400" />
                  <span>Verified NVOCC License: GD20240307220907</span>
                </div>

                <a
                  href={SITE_CONFIG.socials.alibabaTrustPass}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 px-3 py-1 text-xs font-semibold text-amber-300"
                >
                  <Award className="h-3.5 w-3.5 text-amber-400" />
                  <span>Alibaba 4.7/5 (48 Verified Reviews)</span>
                </a>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] text-white">
                China DDP Freight <br />
                <span className="text-sky-400">
                  Forwarding &amp; Global Logistics
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                The authoritative Chinese freight forwarder delivering end-to-end Air DDP, Ocean FCL/LCL, China-Europe Rail Express, and Amazon FBA first-leg freight from 7 Chinese sourcing hubs to 44 global destinations.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => openQuoteModal()}
                  className="flex items-center gap-2 rounded-xl bg-orange-600 hover:bg-orange-700 px-6 py-4 text-sm font-bold text-white shadow-xl shadow-orange-600/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Calculator className="h-4 w-4" />
                  <span>Launch Instant Quote Wizard</span>
                </button>

                <a
                  href={getWhatsAppUrl("Hello JCD Forwarder, I need an immediate DDP freight quote from China.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 px-6 py-4 text-sm font-bold text-white shadow-xl shadow-emerald-600/30 transition-all hover:scale-[1.02]"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>WhatsApp 24/7 Dispatch</span>
                </a>
              </div>

              {/* Trust Metric Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-800/80">
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-white">300,000+</div>
                  <div className="text-xs text-slate-400 mt-0.5">Completed Shipments</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-blue-400">100,000+</div>
                  <div className="text-xs text-slate-400 mt-0.5">Importers Served</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-amber-400">4.7 / 5.0</div>
                  <div className="text-xs text-slate-400 mt-0.5">Alibaba Rating</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-emerald-400">≤ 2 Hours</div>
                  <div className="text-xs text-slate-400 mt-0.5">SLA Response Time</div>
                </div>
              </div>
            </div>

            {/* Right Interactive Quick Quote / Hub Teaser */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 sm:p-8 shadow-xl space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-xs font-bold text-white uppercase tracking-wider">
                      Live Freight Dispatch Desk
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-blue-400 font-semibold">
                    Shenzhen HQ (GMT+8)
                  </span>
                </div>

                <div className="space-y-4 text-xs">
                  <div className="rounded-xl bg-slate-950 p-4 border border-slate-800 space-y-2">
                    <div className="text-slate-400 font-semibold">
                      Guaranteed Operational Standards:
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-slate-200">
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                        <span>Fixed Airline BSAs</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                        <span>Matson CLX Express</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                        <span>Pure Battery UN38.3</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                        <span>Amazon CARP / ISA</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-blue-950/40 border border-blue-900/60 text-blue-200 leading-relaxed">
                    <strong>Free 7-Day Consolidation:</strong> Ship goods from multiple factories in Yiwu, Ningbo, Guangzhou, and Shenzhen into our Bao&apos;an Xinhe facility for unified carton inspection, labeling, and palletizing.
                  </div>

                  <button
                    onClick={() => openQuoteModal()}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white py-3.5 text-sm font-bold shadow-md shadow-blue-600/20 transition-all"
                  >
                    <span>Request Custom Landed DDP Rate</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CORE FREIGHT SERVICES OVERVIEW */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
            Comprehensive Multimodal Logistics
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            End-to-End Freight Architecture from China
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Backed by direct tier-1 carrier contracts, NVOCC licensing, and in-house customs brokerage.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Service 1: Air Freight */}
          <Link
            href="/services/air-freight"
            className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 flex flex-col justify-between hover:border-blue-500/50 hover:shadow-lg transition-all group"
          >
            <div className="space-y-4">
              <div className="h-12 w-12 rounded-xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Plane className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                  Air Freight &amp; Battery DDP
                </h3>
                <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 block mt-0.5">
                  3–7 Business Days
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Direct flights from CAN, SZX, HKG to LGG, LHR, LAX, FRA. Specialized DG channel for UN38.3 pure batteries and cosmetics.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-blue-600">
              <span>Explore Air Solutions</span>
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Service 2: Sea Freight */}
          <Link
            href="/services/sea-freight"
            className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 flex flex-col justify-between hover:border-cyan-500/50 hover:shadow-lg transition-all group"
          >
            <div className="space-y-4">
              <div className="h-12 w-12 rounded-xl bg-cyan-100 dark:bg-cyan-900/40 text-cyan-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Ship className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 transition-colors">
                  Ocean Freight (FCL &amp; LCL)
                </h3>
                <span className="text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400 block mt-0.5">
                  14–35 Days Transit
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                20GP, 40GP, 40HQ, 45HQ container booking and weekly LCL consolidations via COSCO, Evergreen, Maersk, and Matson CLX.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-cyan-600">
              <span>Explore Sea Solutions</span>
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Service 3: Rail Freight */}
          <Link
            href="/services/rail-freight"
            className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 flex flex-col justify-between hover:border-amber-500/50 hover:shadow-lg transition-all group"
          >
            <div className="space-y-4">
              <div className="h-12 w-12 rounded-xl bg-amber-100 dark:bg-amber-900/40 text-amber-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Train className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-amber-600 transition-colors">
                  China-Europe Railway
                </h3>
                <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400 block mt-0.5">
                  16–22 Days Landbridge
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Direct block trains from Xi&apos;an, Chengdu, and Yiwu (Yixinou) via Alashankou &amp; Brest into Poland, Germany, and the UK.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-amber-600">
              <span>Explore Rail Express</span>
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Service 4: DDP Shipping */}
          <Link
            href="/services/ddp-shipping"
            className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 flex flex-col justify-between hover:border-emerald-500/50 hover:shadow-lg transition-all group"
          >
            <div className="space-y-4">
              <div className="h-12 w-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Box className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors">
                  DDP Door-to-Door Freight
                </h3>
                <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 block mt-0.5">
                  All Duties &amp; Taxes Paid
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                All-inclusive air &amp; ocean door-to-door delivery with export declarations, destination customs clearance, and final delivery included.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-emerald-600">
              <span>Explore DDP Delivery</span>
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Service 5: Trucking Freight */}
          <Link
            href="/services/trucking-freight"
            className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 flex flex-col justify-between hover:border-slate-500/50 hover:shadow-lg transition-all group"
          >
            <div className="space-y-4">
              <div className="h-12 w-12 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Truck className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                  Inland &amp; TIR Trucking
                </h3>
                <span className="text-xs font-mono font-bold text-slate-600 dark:text-slate-400 block mt-0.5">
                  Nationwide &amp; Cross-Border
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Factory pickup cartage across Guangdong and Zhejiang, bonded customs shuttle transfer, and China-Europe TIR linehaul.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-blue-600">
              <span>Explore Road Freight</span>
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Service 6: Express Courier */}
          <Link
            href="/services/express-courier"
            className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 flex flex-col justify-between hover:border-rose-500/50 hover:shadow-lg transition-all group"
          >
            <div className="space-y-4">
              <div className="h-12 w-12 rounded-xl bg-rose-100 dark:bg-rose-900/40 text-rose-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Clock className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-rose-600 transition-colors">
                  Express Courier Service
                </h3>
                <span className="text-xs font-mono font-bold text-rose-600 dark:text-rose-400 block mt-0.5">
                  3–5 Business Days
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Direct accounts with DHL Express, FedEx Priority, and UPS Worldwide for urgent samples, electronics, and time-critical spares.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-rose-600">
              <span>Explore Express Rates</span>
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </section>

      {/* 3. INTERACTIVE SOP PROCESS SWITCHER */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900/50 border-t border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="space-y-2">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                Systematic Execution Architecture
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
                Interactive Logistics SOP Switcher
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Explore our documented handover checkpoints and customs release milestones.
              </p>
            </div>

            {/* Switcher Buttons */}
            <div className="inline-flex flex-wrap rounded-xl border border-slate-300 dark:border-slate-700 p-1 bg-white dark:bg-slate-900">
              {[
                { id: "fcl", label: "12-Step FCL Container" },
                { id: "fba", label: "Amazon FBA First-Leg" },
                { id: "air", label: "Air DDP Flight SOP" },
                { id: "lcl", label: "LCL Consolidation" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveSop(tab.id as any)}
                  className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
                    activeSop === tab.id
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-slate-600 dark:text-slate-300 hover:text-slate-900"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-sm">
            <div className="mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                {sopData[activeSop].title}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                {sopData[activeSop].subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {sopData[activeSop].steps.map((step) => (
                <div
                  key={step.num}
                  className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 text-xs space-y-2 hover:bg-blue-50/40 transition-colors"
                >
                  <div className="text-xl font-mono font-black text-blue-600 dark:text-blue-400">
                    {step.num}
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-white">
                    {step.name}
                  </h4>
                  <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. INTERACTIVE LOGISTICS UTILITY SUITE SHOWCASE */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
            Self-Service Decision Engines
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            Logistics Calculation &amp; Simulation Suite
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Eliminate freight guesswork with our production-grade 3D container simulator, volumetric weight calculators, and Incoterms 2020 decision tree.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Tool 1: 3D Container */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 space-y-4 shadow-sm flex flex-col justify-between hover:border-blue-500/50 transition-all">
            <div className="space-y-3">
              <div className="h-12 w-12 rounded-xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 flex items-center justify-center">
                <Layers className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                3D Container Simulator
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Test carton dimensions in a real-time Three.js 3D container wireframe (20GP, 40GP, 40HQ, 45HQ) to calculate exact volume fill rate and payload weight limits.
              </p>
            </div>
            <Link
              href="/tools/container-loading-calculator"
              className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 hover:underline pt-4 border-t border-slate-100 dark:border-slate-800"
            >
              <span>Launch 3D Simulator</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Tool 2: Volumetric Calculator */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 space-y-4 shadow-sm flex flex-col justify-between hover:border-blue-500/50 transition-all">
            <div className="space-y-3">
              <div className="h-12 w-12 rounded-xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 flex items-center justify-center">
                <Calculator className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Volumetric Weight Calculator
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Multi-line dimensional calculator comparing Air Freight (1:6000 divisor), Courier Express (1:5000), and Ocean LCL (CBM) to calculate exact chargeable weight.
              </p>
            </div>
            <Link
              href="/tools/volumetric-calculator"
              className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 hover:underline pt-4 border-t border-slate-100 dark:border-slate-800"
            >
              <span>Calculate Volumetric Weight</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Tool 3: Cargo & Express Tracking */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 space-y-4 shadow-sm flex flex-col justify-between hover:border-blue-500/50 transition-all">
            <div className="space-y-3">
              <div className="h-12 w-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 flex items-center justify-center">
                <Search className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Cargo &amp; Express Tracking
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Track DHL, FedEx, UPS couriers and JCD NVOCC internal air waybills with real-time telematics from factory pickup to signed delivery.
              </p>
            </div>
            <Link
              href="/tools/tracking"
              className="inline-flex items-center gap-2 text-xs font-bold text-emerald-600 hover:underline pt-4 border-t border-slate-100 dark:border-slate-800"
            >
              <span>Track Active Consignment</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Tool 4: Flight Route Calculator */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 space-y-4 shadow-sm flex flex-col justify-between hover:border-blue-500/50 transition-all">
            <div className="space-y-3">
              <div className="h-12 w-12 rounded-xl bg-sky-100 dark:bg-sky-900/40 text-sky-600 flex items-center justify-center">
                <Plane className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Flight Route &amp; Transit Calculator
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Calculate great-circle flight distances, direct airborne cruising hours, airline BSA allocations, and door-to-door Air DDP transit schedules.
              </p>
            </div>
            <Link
              href="/tools/flight-route-calculator"
              className="inline-flex items-center gap-2 text-xs font-bold text-sky-600 hover:underline pt-4 border-t border-slate-100 dark:border-slate-800"
            >
              <span>Calculate Air Routes</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Tool 5: China HS Code Finder */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 space-y-4 shadow-sm flex flex-col justify-between hover:border-blue-500/50 transition-all">
            <div className="space-y-3">
              <div className="h-12 w-12 rounded-xl bg-teal-100 dark:bg-teal-900/40 text-teal-600 flex items-center justify-center">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                China HS Code &amp; Tariff Finder
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Look up Chinese export customs codes, GACC inspection codes, export VAT rebate percentages, and key destination compliance requirements.
              </p>
            </div>
            <Link
              href="/tools/china-hs-code"
              className="inline-flex items-center gap-2 text-xs font-bold text-teal-600 hover:underline pt-4 border-t border-slate-100 dark:border-slate-800"
            >
              <span>Search Customs Codes</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Tool 6: Proforma Invoice Generator */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 space-y-4 shadow-sm flex flex-col justify-between hover:border-blue-500/50 transition-all">
            <div className="space-y-3">
              <div className="h-12 w-12 rounded-xl bg-amber-100 dark:bg-amber-900/40 text-amber-600 flex items-center justify-center">
                <FileText className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Proforma Invoice Generator
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Generate compliant international proforma invoices with automated subtotal calculation, freight apportionment, Incoterms, and printable A4 PDF export.
              </p>
            </div>
            <Link
              href="/tools/proforma-invoice-generator"
              className="inline-flex items-center gap-2 text-xs font-bold text-amber-600 hover:underline pt-4 border-t border-slate-100 dark:border-slate-800"
            >
              <span>Generate Trade Invoice</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* Explore All Tools Footer CTA */}
        <div className="mt-8 p-6 rounded-2xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              Looking for Unit Converters, Packing List Exporters, or Seaports?
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Explore our full suite of 10 working international freight tools built for importers and supply chain managers.
            </p>
          </div>
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-colors"
          >
            <span>View All 10 Logistics Tools</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </section>

      {/* 5. TOP COUNTRY TRADE ROUTES GRID */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900/50 border-t border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="space-y-2">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                Global Trade Arteries
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
                Popular Destination Country Routes
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                End-to-end landed shipping, customs clearance, and duty prep across 44 global destinations.
              </p>
            </div>

            <Link
              href="/routes/shipping-from-china-to-usa"
              className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 hover:underline"
            >
              <span>Browse All 44 Programmatic Routes</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredRoutes.map((route) => (
              <div
                key={route.code}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-base font-black text-slate-900 dark:text-white">
                      {route.name}
                    </span>
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300">
                      {route.code}
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                    <div className="flex justify-between">
                      <span>De Minimis:</span>
                      <strong className="text-slate-900 dark:text-white">{route.deMinimisThreshold}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Air Express:</span>
                      <strong className="text-slate-900 dark:text-white">5–7 Days</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Sea Freight:</span>
                      <strong className="text-slate-900 dark:text-white">14–28 Days</strong>
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <Link
                    href={`/routes/${route.slug}`}
                    className="text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-blue-600"
                  >
                    View Route
                  </Link>

                  <button
                    onClick={() =>
                      openQuoteModal({
                        destinationSlug: route.slug,
                      })
                    }
                    className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold"
                  >
                    Quote
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. VERIFIED ALIBABA REVIEWS & TRACK RECORD */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1 text-amber-500">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
            ))}
            <span className="ml-2 text-xs font-bold text-slate-700 dark:text-slate-300">
              4.7 / 5.0 (48 Verified Alibaba Buyer Reviews)
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            What Global Importers Say About JCD Forwarder
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Real feedback from verified B2B buyers shipping containers, air charters, and Amazon inventory.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {verifiedReviews.map((rev, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-4 shadow-sm flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs text-slate-400 font-mono">{rev.date}</span>
                </div>

                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed italic">
                  &ldquo;{rev.text}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">
                    {rev.author}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    {rev.company} • {rev.country}
                  </div>
                </div>
                <span className="text-[11px] font-mono font-semibold text-blue-600 dark:text-blue-400">
                  {rev.route}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. 7 CHINESE SOURCING HUBS OVERVIEW */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12 space-y-2">
            <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">
              China Sourcing Clusters
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight">
              7 Strategic Chinese Origin Port &amp; Warehouse Bases
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Local factory pickup radii and rapid export dispatch across the major industrial manufacturing belts.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {ORIGIN_HUBS.map((hub) => (
              <Link
                key={hub.id}
                href={`/origins/${hub.slug}`}
                className="p-5 rounded-xl bg-slate-800/60 border border-slate-700/60 hover:border-blue-500/50 transition-colors space-y-2 block text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-black text-sm text-white">
                    {hub.name}
                  </span>
                  {hub.id === "shenzhen" && (
                    <span className="bg-blue-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                      HQ Facility
                    </span>
                  )}
                </div>
                <div className="text-slate-400 font-mono text-[11px]">
                  {hub.chineseName} • {hub.seaports[0]?.name || "Port"}
                </div>
                <p className="text-slate-400 text-[11px] leading-snug line-clamp-2">
                  {hub.overview}
                </p>
                <div className="pt-2 border-t border-slate-700/60 flex items-center justify-between text-blue-400 font-semibold text-[10px]">
                  <span>SLA: {hub.pickup.averageDispatchHours}h dispatch</span>
                  <ArrowRight className="h-3 w-3" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 8. FAQ ACCORDION */}
      <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 space-y-3">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
            Operational Encyclopedia
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            Frequently Asked Logistics Questions
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Clear answers to common questions about DDP shipping, customs duties, Amazon FBA, and dangerous goods.
          </p>
        </div>

        <div className="space-y-3">
          {featuredFaqs.map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div
                key={faq.id}
                className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                  className="w-full flex items-center justify-between p-4 sm:p-5 text-left text-sm font-bold text-slate-900 dark:text-white"
                >
                  <span className="pr-4">{faq.question}</span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800/60">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 9. ABOUT US & CORPORATE CREDENTIALS */}
      <section id="about" className="py-20 bg-slate-50 dark:bg-slate-900/60 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-xs font-bold">
                Corporate Profile &amp; Governance
              </div>

              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
                Shenzhen Jiechengda International Freight Forwarding Co., Ltd.
              </h2>

              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Established on April 07, 2015, Shenzhen Jiechengda (深圳市捷成达国际货运代理有限公司) has grown into an authoritative Chinese supply chain and freight forwarding enterprise. Holding official NVOCC registration <strong>GD20240307220907</strong>, our team manages end-to-end freight logistics for cross-border e-commerce sellers and global importers.
              </p>

              <div className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300">
                <div className="flex items-start gap-2">
                  <ShieldCheck className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                  <span><strong>NVOCC License Number:</strong> GD20240307220907 (Shenzhen Municipal Transportation Bureau)</span>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                  <span><strong>Shenzhen HQ Warehouse:</strong> Building C (Entire Building), No. 40 Yuesheng 2nd Rd, Xinhe Community, Bao&apos;an District, Shenzhen, China</span>
                </div>
                <div className="flex items-start gap-2">
                  <Building2 className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                  <span><strong>Warehouse Facilities:</strong> 500 m² bonded consolidation space with 7-day free staging, automated barcode sorting, and EPAL pallet wrapping</span>
                </div>
                <div className="flex items-start gap-2">
                  <Clock className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                  <span><strong>24/7 Operations Desk:</strong> Phone/WhatsApp +86 137 2424 6674 • Email: David@JCDforwarder.com</span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 shadow-sm space-y-6">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Direct Contact &amp; Inquiry Channels
              </h3>

              <div className="space-y-4 text-xs">
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 space-y-1">
                  <div className="text-slate-500 font-semibold">Managing Director / Lead Dispatch:</div>
                  <div className="font-bold text-sm text-slate-900 dark:text-white">
                    David (Senior Logistics Director)
                  </div>
                  <div className="text-slate-500">
                    Languages: English, Mandarin, Cantonese
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <a
                    href={`tel:${SITE_CONFIG.contact.phone}`}
                    className="flex items-center gap-2 p-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-blue-500 text-slate-800 dark:text-slate-200 transition-colors"
                  >
                    <Phone className="h-4 w-4 text-blue-600" />
                    <div>
                      <div className="text-[10px] text-slate-500">Direct Telephone</div>
                      <div className="font-bold">{SITE_CONFIG.contact.phoneDisplay}</div>
                    </div>
                  </a>

                  <a
                    href={`mailto:${SITE_CONFIG.contact.email}`}
                    className="flex items-center gap-2 p-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-blue-500 text-slate-800 dark:text-slate-200 transition-colors"
                  >
                    <Mail className="h-4 w-4 text-blue-600" />
                    <div>
                      <div className="text-[10px] text-slate-500">Official RFQ Email</div>
                      <div className="font-bold">{SITE_CONFIG.contact.email}</div>
                    </div>
                  </a>
                </div>

                <button
                  onClick={() => openQuoteModal()}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white py-3.5 text-sm font-bold shadow-md transition-all"
                >
                  <Calculator className="h-4 w-4" />
                  <span>Start Quote Inquiry Wizard</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. FINAL ACTION STRIP */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-black">
            Get Your All-Inclusive Landed DDP Rate Now
          </h2>
          <p className="text-sm sm:text-base text-blue-100 max-w-2xl mx-auto">
            Direct pricing, guaranteed vessel space, and complete customs clearance across 44 countries.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => openQuoteModal()}
              className="flex items-center gap-2 rounded-xl bg-white text-blue-900 hover:bg-blue-50 px-7 py-4 text-sm font-bold shadow-lg transition-all hover:scale-105"
            >
              <Calculator className="h-4 w-4 text-orange-600" />
              <span>Launch Quote Wizard</span>
            </button>
            <a
              href={getWhatsAppUrl("Hello JCD Forwarder, I am requesting a direct freight inquiry.")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl bg-blue-800 hover:bg-blue-900 text-white border border-blue-400 px-7 py-4 text-sm font-bold transition-all"
            >
              <MessageCircle className="h-4 w-4" />
              <span>WhatsApp Live Dispatch</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
