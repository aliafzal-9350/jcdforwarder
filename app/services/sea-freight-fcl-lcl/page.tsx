"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SITE_CONFIG, getWhatsAppUrl } from "@/data/siteConfig";
import { CONTAINER_SPECS } from "@/data/containers";
import { useQuoteModal } from "@/components/quote/QuoteModalContext";
import {
  Ship,
  ShieldCheck,
  Box,
  Layers,
  CheckCircle2,
  Clock,
  ArrowRight,
  MessageCircle,
  FileText,
  Anchor,
  Calculator,
  Calendar,
  Building2,
  Check,
} from "lucide-react";

export default function SeaFreightPage() {
  const { openQuoteModal } = useQuoteModal();
  const [activeSopTab, setActiveSopTab] = useState<"fcl" | "lcl">("fcl");
  const [selectedContainer, setSelectedContainer] = useState<string>("40HQ");

  const fclSopSteps = [
    {
      step: "01",
      title: "Booking Request & Carrier Space Confirmation",
      timing: "T-7 Days",
      owner: "JCD Dispatch & Carrier Desk",
      desc: "Contracted allocation booking via COSCO, Evergreen, Maersk, or Matson EDI platform.",
    },
    {
      step: "02",
      title: "Shipping Order (S/O) Issuance & Equipment Release",
      timing: "T-5 Days",
      owner: "Ocean Carrier / Yard Depot",
      desc: "Equipment Interchange Receipt (EIR) generated for empty container pick-up from port depot.",
    },
    {
      step: "03",
      title: "Empty Container Haulage & Factory Drayage",
      timing: "T-4 Days",
      owner: "Licensed Drayage Fleet",
      desc: "Dedicated tractor trailer dispatched to factory with clean, dry, odor-free inspected container.",
    },
    {
      step: "04",
      title: "Factory Stuffing & Cargo Securing",
      timing: "T-3 Days",
      owner: "Manufacturer / JCD QC Inspector",
      desc: "Cargo loading under strict weight distribution rules; dunnage bags and lashing straps installed.",
    },
    {
      step: "05",
      title: "High-Security Bolt Seal Affixed & EIR Sign-off",
      timing: "T-3 Days",
      owner: "Truck Driver & Factory Rep",
      desc: "ISO 17712 compliant high-security bolt seal locked. Seal number recorded on container manifest.",
    },
    {
      step: "06",
      title: "Port Gate-in & Terminal Weighbridge (VGM)",
      timing: "T-2 Days",
      owner: "Terminal Gate & JCD Drayage",
      desc: "SOLAS Verified Gross Mass (VGM) certified and submitted via terminal automated weighbridge.",
    },
    {
      step: "07",
      title: "China Customs Export Declaration & Inspection",
      timing: "T-2 Days",
      owner: "JCD Licensed Broker",
      desc: "Single-window electronic export clearance, commodity code verification, and drawback filing.",
    },
    {
      step: "08",
      title: "Vessel Berthing & Gantry Crane Stacking",
      timing: "T-0 (Departure)",
      owner: "Port Terminal Operations",
      desc: "Container loaded aboard ocean vessel according to vessel stowage plan and stability matrix.",
    },
    {
      step: "09",
      title: "Bill of Lading (MBL/HBL) & Ocean Transit Tracking",
      timing: "Day 1 - 25",
      owner: "Carrier & JCD Tracking Desk",
      desc: "Master Bill of Lading (MBL) issued. Real-time AIS satellite vessel monitoring enabled.",
    },
    {
      step: "10",
      title: "Pre-Arrival Customs Clearance & ISF / ENS Filing",
      timing: "ETA - 5 Days",
      owner: "JCD Destination Customs Broker",
      desc: "ISF 10+2 (USA) or EU ICS2 pre-clearance submitted before vessel arrival to ensure release.",
    },
    {
      step: "11",
      title: "Vessel Discharge & Terminal Gate Out",
      timing: "ETA + 1 Day",
      owner: "Destination Port & Drayage",
      desc: "Discharge to terminal wheel yard; peel-pile or priority chassis pickup without demurrage.",
    },
    {
      step: "12",
      title: "Final Consignee / Amazon FBA Dock Unloading",
      timing: "Final Delivery",
      owner: "Destination Carrier Fleet",
      desc: "Full container live-unload or drop-and-pick at buyer warehouse with signed Proof of Delivery (POD).",
    },
  ];

  const lclSopSteps = [
    {
      step: "01",
      title: "LCL Booking & Shipping Instruction",
      desc: "Importer confirms cargo volume (CBM) and manufacturer readiness.",
    },
    {
      step: "02",
      title: "Supplier Cargo Delivery to Shenzhen Warehouse",
      desc: "Domestic express or factory truck delivery to Xinhe consolidation hub.",
    },
    {
      step: "03",
      title: "Warehouse Inbound Scan & Barcode Tagging",
      desc: "Each carton is tagged with a unique tracking UID and barcode label.",
    },
    {
      step: "04",
      title: "Cargo Verification (Actual Weight vs. CBM)",
      desc: "Laser volumetric scanning and high-precision electronic scale calibration.",
    },
    {
      step: "05",
      title: "Pre-Shipment Quality & Packaging Inspection",
      desc: "Visual carton integrity check and pallet drop-testing if required.",
    },
    {
      step: "06",
      title: "FNSKU Labeling & Value-Added Prep",
      desc: "Amazon barcode relabeling, polybagging, and bundling services.",
    },
    {
      step: "07",
      title: "Consolidation Planning & Container Load Plan (CLP)",
      desc: "Multiple vendor shipments grouped by destination port and customs nature.",
    },
    {
      step: "08",
      title: "Container Stuffing at JCD Shenzhen CFS",
      desc: "Heavy cartons at base, fragile cartons on top, with heavy-duty cargo nets.",
    },
    {
      step: "09",
      title: "Container Sealing & Port Drayage",
      desc: "High-security ISO 17712 bolt seal locked; drayage to Yantian / Shekou.",
    },
    {
      step: "10",
      title: "China Customs Unified Consolidation Clearance",
      desc: "Multi-shipper consolidated customs declaration via single export manifest.",
    },
    {
      step: "11",
      title: "Ocean Transit & Satellite Vessel Tracking",
      desc: "Direct express liner voyage with zero mid-route transshipment offloading.",
    },
    {
      step: "12",
      title: "Destination CFS Bonded Warehouse De-Stuffing",
      desc: "Container stripped, cargo sorted and verified against individual House BLs.",
    },
    {
      step: "13",
      title: "Destination Fiscal Customs Clearance & Tax Payment",
      desc: "Single-entry or individual DDP customs clearance and duty settlement.",
    },
    {
      step: "14",
      title: "Palletizing & Sorting by Final Destination",
      desc: "Standard GMA or EPAL pallet wrapping per Amazon fulfillment center rules.",
    },
    {
      step: "15",
      title: "Appointment Booking & Last-Mile Delivery",
      desc: "CARP/ISA scheduled appointment delivery with final POD uploaded.",
    },
  ];

  const currentContainer =
    CONTAINER_SPECS.find((c) => c.code === selectedContainer) ||
    CONTAINER_SPECS[2];

  return (
    <div className="bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen">
      {/* 1. HERO */}
      <section className="relative overflow-hidden bg-slate-950 text-white py-20 lg:py-28 border-b border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/30 via-slate-950 to-slate-950 -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 border border-blue-500/30 px-3 py-1 text-xs font-semibold text-blue-300">
              <ShieldCheck className="h-3.5 w-3.5 text-blue-400" />
              <span>NVOCC Licensed GD20240307220907 • Direct Tier-1 Carrier Contracts</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1]">
              Ocean Freight FCL &amp; <br />
              <span className="text-sky-400">
                LCL Consolidation
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Cost-effective, reliable sea freight logistics connecting Shenzhen, Ningbo, Shanghai, and Qingdao to 44 global countries. Direct contracts with COSCO, Evergreen, Maersk, and Matson Express with guaranteed vessel space.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => openQuoteModal({ serviceType: "sea-ddp-fast" })}
                className="flex items-center gap-2 rounded-xl bg-orange-600 hover:bg-orange-700 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-orange-600/25 transition-all hover:scale-[1.02]"
              >
                <Calculator className="h-4 w-4" />
                <span>Get Sea Freight Quote</span>
              </button>

              <Link
                href="/tools/container-loading-calculator"
                className="flex items-center gap-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 px-6 py-3.5 text-sm font-bold text-slate-200 transition-all"
              >
                <Layers className="h-4 w-4 text-blue-400" />
                <span>3D Container Simulator</span>
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-800/80 max-w-lg">
              <div>
                <div className="text-2xl font-black text-white">11 Days</div>
                <div className="text-xs text-slate-400">Matson CLX Express</div>
              </div>
              <div>
                <div className="text-2xl font-black text-blue-400">7-Day Free</div>
                <div className="text-xs text-slate-400">Shenzhen Consolidation</div>
              </div>
              <div>
                <div className="text-2xl font-black text-emerald-400">100%</div>
                <div className="text-xs text-slate-400">NVOCC MBL Issuance</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CONTAINER SPECIFICATIONS MATRIX */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-3 mb-10">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
            Equipment Standards
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Standard Ocean Shipping Container Specifications
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Compare usable volume, maximum payload weight, and internal dimensions across the four primary ocean container types.
          </p>
        </div>

        {/* Container Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {CONTAINER_SPECS.map((spec) => (
            <button
              key={spec.code}
              onClick={() => setSelectedContainer(spec.code)}
              className={`p-4 rounded-xl border text-left transition-all ${
                selectedContainer === spec.code
                  ? "border-blue-600 bg-blue-50 dark:bg-blue-950/40 text-blue-900 dark:text-blue-200 ring-2 ring-blue-500/20 shadow-sm"
                  : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300"
              }`}
            >
              <div className="font-mono font-black text-lg text-slate-900 dark:text-white">
                {spec.code}
              </div>
              <div className="text-xs text-slate-500 mt-1">{spec.name}</div>
              <div className="text-xs font-bold text-blue-600 dark:text-blue-400 mt-2">
                {spec.usableVolumeDisplay}
              </div>
            </button>
          ))}
        </div>

        {/* Selected Container Detailed Card */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-slate-100 dark:border-slate-800">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-xs font-bold mb-2">
                ISO Standard {currentContainer.category}
              </div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                {currentContainer.name} ({currentContainer.code})
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                {currentContainer.bestSuitedFor}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/tools/container-loading-calculator"
                className="flex items-center gap-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200 px-4 py-2.5 text-xs font-bold transition-colors"
              >
                <Layers className="h-4 w-4" />
                <span>Simulate 3D Load</span>
              </Link>

              <button
                onClick={() =>
                  openQuoteModal({
                    serviceType: "sea-ddp-fast",
                    volumeCbm: currentContainer.usableVolumeMaxCbm,
                  })
                }
                className="flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 text-xs font-bold transition-colors"
              >
                <span>Book This Container</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6 text-xs">
            <div className="space-y-1">
              <span className="text-slate-500 font-semibold block">Internal Dimensions (L×W×H)</span>
              <div className="text-base font-bold font-mono text-slate-900 dark:text-white">
                {currentContainer.internalDimensions.lengthM}m × {currentContainer.internalDimensions.widthM}m × {currentContainer.internalDimensions.heightM}m
              </div>
              <span className="text-[11px] text-slate-400">Standard ISO clearance</span>
            </div>

            <div className="space-y-1">
              <span className="text-slate-500 font-semibold block">Door Opening Clearance</span>
              <div className="text-base font-bold font-mono text-slate-900 dark:text-white">
                {currentContainer.doorOpening.widthM}m (W) × {currentContainer.doorOpening.heightM}m (H)
              </div>
              <span className="text-[11px] text-slate-400">Forklift entry width</span>
            </div>

            <div className="space-y-1">
              <span className="text-slate-500 font-semibold block">Maximum Usable Volume</span>
              <div className="text-base font-bold font-mono text-blue-600 dark:text-blue-400">
                {currentContainer.usableVolumeDisplay}
              </div>
              <span className="text-[11px] text-slate-400">Theoretical: {currentContainer.grossVolumeCbm} CBM</span>
            </div>

            <div className="space-y-1">
              <span className="text-slate-500 font-semibold block">Maximum Cargo Payload</span>
              <div className="text-base font-bold font-mono text-emerald-600 dark:text-emerald-400">
                {currentContainer.maxPayloadKg.toLocaleString()} KG
              </div>
              <span className="text-[11px] text-slate-400">Tare Weight: {currentContainer.tareWeightKg.toLocaleString()} KG</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE SOP PROCESS VISUALIZER (12-STEP FCL vs 15-STEP LCL) */}
      <section className="py-16 bg-slate-50 dark:bg-slate-900/60 border-t border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div className="space-y-2">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                Operational Transparency
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                Standard Operating Procedure (SOP) Visualizer
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                Inspect every milestone, gate-in requirement, and document release checkpoint.
              </p>
            </div>

            {/* Toggle Switcher */}
            <div className="inline-flex rounded-xl border border-slate-300 dark:border-slate-700 p-1 bg-white dark:bg-slate-900 shrink-0">
              <button
                onClick={() => setActiveSopTab("fcl")}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  activeSopTab === "fcl"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-slate-600 dark:text-slate-300 hover:text-slate-900"
                }`}
              >
                12-Step FCL Container SOP
              </button>
              <button
                onClick={() => setActiveSopTab("lcl")}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  activeSopTab === "lcl"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-slate-600 dark:text-slate-300 hover:text-slate-900"
                }`}
              >
                15-Step LCL Consolidation SOP
              </button>
            </div>
          </div>

          {/* FCL SOP VIEW */}
          {activeSopTab === "fcl" && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {fclSopSteps.map((step) => (
                  <div
                    key={step.step}
                    className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:shadow-md transition-shadow relative"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xl font-black font-mono text-blue-600 dark:text-blue-400">
                        STEP {step.step}
                      </span>
                      <span className="text-[10px] font-mono font-bold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 px-2 py-0.5 rounded">
                        {step.timing}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1.5">
                      {step.title}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-3">
                      {step.desc}
                    </p>
                    <div className="text-[10px] font-semibold text-slate-600 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
                      Responsible: <span className="text-slate-900 dark:text-slate-200">{step.owner}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* LCL SOP VIEW */}
          {activeSopTab === "lcl" && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3">
                {lclSopSteps.map((step) => (
                  <div
                    key={step.step}
                    className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-sm font-mono font-bold text-cyan-600 dark:text-cyan-400 block mb-1">
                        Phase {step.step}
                      </span>
                      <div className="font-bold text-slate-900 dark:text-white mb-1">
                        {step.title}
                      </div>
                      <div className="text-slate-500 dark:text-slate-400 text-[11px] leading-snug">
                        {step.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 4. CALL TO ACTION BAR */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-black">
            Lock In Your Ocean Freight Allocation
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
            Book full container load drayage or secure space in our next weekly Shenzhen LCL consolidation box.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => openQuoteModal({ serviceType: "sea-ddp-fast" })}
              className="flex items-center gap-2 rounded-xl bg-orange-600 hover:bg-orange-700 px-6 py-3.5 text-sm font-bold shadow-md transition-all hover:scale-105"
            >
              <Calculator className="h-4 w-4" />
              <span>Launch Quote Wizard</span>
            </button>
            <a
              href={getWhatsAppUrl("Hello JCD Forwarder, I need current ocean FCL/LCL ocean freight rates.")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white px-6 py-3.5 text-sm font-bold transition-all"
            >
              <MessageCircle className="h-4 w-4" />
              <span>WhatsApp Ocean Desk</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
