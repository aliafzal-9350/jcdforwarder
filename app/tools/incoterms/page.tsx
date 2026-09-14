"use client";

import React, { useState } from "react";
import Link from "next/link";
import { getWhatsAppUrl } from "@/data/siteConfig";
import {
  Compass,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  MessageCircle,
  Copy,
  Check,
  Info,
  Layers,
  Shield,
  Truck,
  Ship,
} from "lucide-react";

interface Incoterm {
  code: string;
  name: string;
  category: "Any Transport Mode" | "Sea & Inland Waterway Only";
  sellerPackaging: boolean;
  sellerOriginTrucking: boolean;
  exportCustoms: "Seller" | "Buyer";
  internationalFreight: "Seller" | "Buyer";
  cargoInsurance: "Seller" | "Buyer" | "Negotiable";
  importCustomsClearance: "Seller" | "Buyer";
  importDutiesTaxes: "Seller" | "Buyer";
  finalDestinationDelivery: "Seller" | "Buyer";
  riskTransfer: string;
  costResponsibility: string;
  summary: string;
  recommendedFor: string;
}

const ALL_11_INCOTERMS: Incoterm[] = [
  {
    code: "EXW",
    name: "Ex Works",
    category: "Any Transport Mode",
    sellerPackaging: true,
    sellerOriginTrucking: false,
    exportCustoms: "Buyer",
    internationalFreight: "Buyer",
    cargoInsurance: "Buyer",
    importCustomsClearance: "Buyer",
    importDutiesTaxes: "Buyer",
    finalDestinationDelivery: "Buyer",
    riskTransfer: "Seller's factory/warehouse floor before cargo is loaded onto truck.",
    costResponsibility: "Buyer bears 100% of transport, export filing, ocean/air freight, and import taxes.",
    summary: "Minimum obligation for Chinese supplier. The buyer assumes all operational risk and logistical costs.",
    recommendedFor: "Multinational corporations with licensed procurement offices physically present in China.",
  },
  {
    code: "FCA",
    name: "Free Carrier",
    category: "Any Transport Mode",
    sellerPackaging: true,
    sellerOriginTrucking: true,
    exportCustoms: "Seller",
    internationalFreight: "Buyer",
    cargoInsurance: "Buyer",
    importCustomsClearance: "Buyer",
    importDutiesTaxes: "Buyer",
    finalDestinationDelivery: "Buyer",
    riskTransfer: "When goods are handed over to the carrier nominated by the buyer at the named place.",
    costResponsibility: "Seller covers export customs and local cartage. Buyer covers international freight & destination costs.",
    summary: "Highly recommended alternative to FOB for air freight, containerized cargo, and rail express.",
    recommendedFor: "Air cargo and containerized shipments where handover occurs at an inland CFS depot or airport.",
  },
  {
    code: "CPT",
    name: "Carriage Paid To",
    category: "Any Transport Mode",
    sellerPackaging: true,
    sellerOriginTrucking: true,
    exportCustoms: "Seller",
    internationalFreight: "Seller",
    cargoInsurance: "Buyer",
    importCustomsClearance: "Buyer",
    importDutiesTaxes: "Buyer",
    finalDestinationDelivery: "Buyer",
    riskTransfer: "Transfers to buyer when goods are delivered to the first international carrier.",
    costResponsibility: "Seller pays freight to destination port/airport. Buyer assumes risk during transit and pays import taxes.",
    summary: "Seller contracts and pays for transportation to the named destination gateway, but does not insure cargo.",
    recommendedFor: "Multimodal transit and air freight where the buyer maintains a global corporate marine insurance policy.",
  },
  {
    code: "CIP",
    name: "Carriage and Insurance Paid To",
    category: "Any Transport Mode",
    sellerPackaging: true,
    sellerOriginTrucking: true,
    exportCustoms: "Seller",
    internationalFreight: "Seller",
    cargoInsurance: "Seller",
    importCustomsClearance: "Buyer",
    importDutiesTaxes: "Buyer",
    finalDestinationDelivery: "Buyer",
    riskTransfer: "When goods are delivered to the first carrier. (Seller must purchase Institute Cargo Clauses (A) all-risk insurance).",
    costResponsibility: "Seller pays main carriage and comprehensive insurance. Buyer pays destination handling and import duties.",
    summary: "Identical to CPT, but seller is obligated under Incoterms 2020 to provide maximum all-risk insurance coverage.",
    recommendedFor: "High-value electronics and industrial machinery transported via air cargo or intermodal rail.",
  },
  {
    code: "DAP",
    name: "Delivered at Place",
    category: "Any Transport Mode",
    sellerPackaging: true,
    sellerOriginTrucking: true,
    exportCustoms: "Seller",
    internationalFreight: "Seller",
    cargoInsurance: "Seller",
    importCustomsClearance: "Buyer",
    importDutiesTaxes: "Buyer",
    finalDestinationDelivery: "Seller",
    riskTransfer: "When goods are placed at the disposal of the buyer ready for unloading at the named destination address.",
    costResponsibility: "Seller pays all shipping to buyer door except destination import customs clearance, VAT, and tariffs.",
    summary: "Door delivery without customs clearance. Formerly known as DDU (Delivered Duty Unpaid).",
    recommendedFor: "Buyers who possess their own import customs bond/broker but want seller to handle all freight cartage.",
  },
  {
    code: "DPU",
    name: "Delivered at Place Unloaded",
    category: "Any Transport Mode",
    sellerPackaging: true,
    sellerOriginTrucking: true,
    exportCustoms: "Seller",
    internationalFreight: "Seller",
    cargoInsurance: "Seller",
    importCustomsClearance: "Buyer",
    importDutiesTaxes: "Buyer",
    finalDestinationDelivery: "Seller",
    riskTransfer: "Once goods are physically unloaded from the arriving vehicle at the destination terminal/warehouse.",
    costResponsibility: "Seller pays all transport, insurance, and destination unloading charges. Buyer pays import duties.",
    summary: "The only Incoterm where the seller is legally responsible for unloading the cargo at the destination.",
    recommendedFor: "Heavy machinery, turnkey factory equipment, and project cargo requiring crane discharge.",
  },
  {
    code: "DDP",
    name: "Delivered Duty Paid",
    category: "Any Transport Mode",
    sellerPackaging: true,
    sellerOriginTrucking: true,
    exportCustoms: "Seller",
    internationalFreight: "Seller",
    cargoInsurance: "Seller",
    importCustomsClearance: "Seller",
    importDutiesTaxes: "Seller",
    finalDestinationDelivery: "Seller",
    riskTransfer: "When goods are delivered to the buyer's specified address with all import duties, taxes, and clearance completed.",
    costResponsibility: "Seller / JCD Forwarder pays 100% of transport, export, ocean/air freight, import tariffs, VAT, and final delivery.",
    summary: "Maximum responsibility for seller; zero friction for buyer. Complete landed-cost predictability.",
    recommendedFor: "Amazon FBA sellers, e-commerce brands, and commercial importers who do not want to manage customs.",
  },
  {
    code: "FAS",
    name: "Free Alongside Ship",
    category: "Sea & Inland Waterway Only",
    sellerPackaging: true,
    sellerOriginTrucking: true,
    exportCustoms: "Seller",
    internationalFreight: "Buyer",
    cargoInsurance: "Buyer",
    importCustomsClearance: "Buyer",
    importDutiesTaxes: "Buyer",
    finalDestinationDelivery: "Buyer",
    riskTransfer: "When goods are placed alongside the vessel (e.g., on a quay or barge) at the named port of shipment.",
    costResponsibility: "Seller covers cartage to the quay. Buyer pays vessel loading crane fees, ocean freight, and import taxes.",
    summary: "Traditional maritime term strictly for non-containerized bulk cargo placed alongside the ship.",
    recommendedFor: "Dry bulk commodities (grain, minerals, coal) and heavy breakbulk steel cargo.",
  },
  {
    code: "FOB",
    name: "Free on Board",
    category: "Sea & Inland Waterway Only",
    sellerPackaging: true,
    sellerOriginTrucking: true,
    exportCustoms: "Seller",
    internationalFreight: "Buyer",
    cargoInsurance: "Buyer",
    importCustomsClearance: "Buyer",
    importDutiesTaxes: "Buyer",
    finalDestinationDelivery: "Buyer",
    riskTransfer: "When goods pass over the vessel's rail and are securely stowed on board the ship at origin port.",
    costResponsibility: "Seller pays China inland transport, port terminal handling charges (THC), and Chinese export declaration.",
    summary: "The classic international maritime trade term for commercial ocean freight.",
    recommendedFor: "Conventional ocean freight where the buyer contracts their own freight forwarder (e.g. JCD Forwarder).",
  },
  {
    code: "CFR",
    name: "Cost and Freight",
    category: "Sea & Inland Waterway Only",
    sellerPackaging: true,
    sellerOriginTrucking: true,
    exportCustoms: "Seller",
    internationalFreight: "Seller",
    cargoInsurance: "Buyer",
    importCustomsClearance: "Buyer",
    importDutiesTaxes: "Buyer",
    finalDestinationDelivery: "Buyer",
    riskTransfer: "Transfers on board the vessel at origin port, even though seller pays freight to destination port.",
    costResponsibility: "Seller pays ocean freight to destination port. Buyer pays marine insurance and destination terminal fees.",
    summary: "Seller pays freight to destination maritime port, but risk transfers to buyer once loaded in China.",
    recommendedFor: "Non-containerized bulk cargo where the buyer has an existing fleet-wide marine insurance policy.",
  },
  {
    code: "CIF",
    name: "Cost, Insurance and Freight",
    category: "Sea & Inland Waterway Only",
    sellerPackaging: true,
    sellerOriginTrucking: true,
    exportCustoms: "Seller",
    internationalFreight: "Seller",
    cargoInsurance: "Seller",
    importCustomsClearance: "Buyer",
    importDutiesTaxes: "Buyer",
    finalDestinationDelivery: "Buyer",
    riskTransfer: "On board the vessel at origin port. (Seller must obtain minimum Institute Cargo Clauses (C) insurance).",
    costResponsibility: "Seller pays ocean freight and marine insurance to destination port. Buyer pays destination port fees and tariffs.",
    summary: "One of the most widely used maritime terms; seller delivers to destination port and provides basic marine insurance.",
    recommendedFor: "Traditional ocean cargo where the buyer wants shipping and basic insurance arranged by the seller.",
  },
];

const BUYER_SCENARIOS = [
  {
    title: "Amazon FBA or E-Commerce Door Delivery",
    code: "DDP",
    desc: "You want zero customs headaches. The supplier or JCD Forwarder handles pickup in China, export customs, ocean/air shipping, import duties/taxes, and drops off right at your door or Amazon warehouse.",
    tag: "Most Popular for E-Commerce",
  },
  {
    title: "You Have Your Own Freight Forwarder (e.g. JCD)",
    code: "FOB",
    desc: "Your Chinese supplier pays local trucking to the port and handles China export declaration. You control the international shipping rates and carrier schedule via your forwarder.",
    tag: "Best for Ocean Freight",
  },
  {
    title: "Door Delivery but You Have Your Own Customs Broker",
    code: "DAP",
    desc: "Supplier arranges all shipping directly to your commercial warehouse door, but you pay import duties and clear customs using your company's own import bond.",
    tag: "Common for Established Importers",
  },
  {
    title: "Buying From Factory Without Export License",
    code: "EXW",
    desc: "Supplier only quotes ex-factory price. You must arrange trucking in China, customs export clearance, and all freight. JCD Forwarder can act as your China pickup agent.",
    tag: "Advanced Importers Only",
  },
];

export default function IncotermsComparisonPage() {
  const [selectedCode, setSelectedCode] = useState<string>("DDP");
  const [compareCode1, setCompareCode1] = useState<string>("FOB");
  const [compareCode2, setCompareCode2] = useState<string>("DDP");
  const [copiedComparison, setCopiedComparison] = useState(false);

  const currentTerm = ALL_11_INCOTERMS.find((t) => t.code === selectedCode) || ALL_11_INCOTERMS[6];
  const term1 = ALL_11_INCOTERMS.find((t) => t.code === compareCode1) || ALL_11_INCOTERMS[8];
  const term2 = ALL_11_INCOTERMS.find((t) => t.code === compareCode2) || ALL_11_INCOTERMS[6];

  const handleCopyComparison = () => {
    const text = `INCOTERMS COMPARISON: ${term1.code} vs ${term2.code}
Generated via JCD Forwarder Logistics Decision Matrix

--- [Option A: ${term1.code} - ${term1.name}] ---
• Category: ${term1.category}
• Export Customs: ${term1.exportCustoms}
• Main Carriage Freight: ${term1.internationalFreight}
• Cargo Insurance: ${term1.cargoInsurance}
• Import Clearance & Duties: ${term1.importDutiesTaxes}
• Destination Delivery: ${term1.finalDestinationDelivery}
• Risk Transfers: ${term1.riskTransfer}
• Cost Summary: ${term1.costResponsibility}

--- [Option B: ${term2.code} - ${term2.name}] ---
• Category: ${term2.category}
• Export Customs: ${term2.exportCustoms}
• Main Carriage Freight: ${term2.internationalFreight}
• Cargo Insurance: ${term2.cargoInsurance}
• Import Clearance & Duties: ${term2.importDutiesTaxes}
• Destination Delivery: ${term2.finalDestinationDelivery}
• Risk Transfers: ${term2.riskTransfer}
• Cost Summary: ${term2.costResponsibility}

Need help deciding or booking your China shipment? WhatsApp JCD Forwarder: https://wa.me/8613428994520`;

    navigator.clipboard.writeText(text);
    setCopiedComparison(true);
    setTimeout(() => setCopiedComparison(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* Header */}
      <section className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white pt-16 pb-16 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-400 mb-4">
            <Link href="/" className="hover:underline">Home</Link>
            <span>/</span>
            <Link href="/tools" className="hover:underline">Tools</Link>
            <span>/</span>
            <span className="text-slate-300">Incoterms Guide</span>
          </div>

          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-semibold">
              <Compass className="h-3.5 w-3.5 text-blue-400" />
              <span>International Trade Rules Made Simple</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
              Incoterms 2020 Decision &amp; Comparison Guide
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Never get surprised by hidden freight bills or customs fees. See exactly who pays for shipping, who handles customs, and where damage risk transfers between you and your Chinese supplier.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Scenario Recommendation Finder */}
      <section className="py-8 bg-blue-900/10 border-b border-blue-200/40 dark:border-blue-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-4">
            <HelpCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Which Incoterm Fits Your Shipment? (Click to Inspect)
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {BUYER_SCENARIOS.map((item) => {
              const isSelected = selectedCode === item.code;
              return (
                <button
                  key={item.title}
                  onClick={() => setSelectedCode(item.code)}
                  className={`text-left p-4 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20"
                      : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700 text-slate-900 dark:text-white"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                      isSelected ? "bg-white/20 text-white" : "bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300"
                    }`}>
                      {item.tag}
                    </span>
                    <span className="font-mono font-black text-sm">{item.code}</span>
                  </div>
                  <div className="font-bold text-xs mb-1.5">{item.title}</div>
                  <p className={`text-[11px] leading-relaxed line-clamp-3 ${
                    isSelected ? "text-blue-100" : "text-slate-500 dark:text-slate-400"
                  }`}>
                    {item.desc}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Selector Ribbon */}
      <section className="py-4 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-16 z-20 backdrop-blur-md bg-white/90 dark:bg-slate-900/90 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-xs font-bold text-slate-500 shrink-0 mr-2">All 11 Rules:</span>
            {ALL_11_INCOTERMS.map((t) => (
              <button
                key={t.code}
                onClick={() => setSelectedCode(t.code)}
                className={`px-3.5 py-1.5 rounded-xl font-mono text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  selectedCode === t.code
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/20 scale-105"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {t.code}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Selected Term Detail Card */}
      <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-wrap items-start justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
            <div>
              <div className="flex items-center gap-3">
                <span className="text-3xl sm:text-4xl font-black text-blue-600 dark:text-blue-400 font-mono">
                  {currentTerm.code}
                </span>
                <span className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                  — {currentTerm.name}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-2 mt-2">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                  {currentTerm.category}
                </span>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300">
                  Best For: {currentTerm.recommendedFor}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={getWhatsAppUrl(`Hello JCD Forwarder, I am negotiating ${currentTerm.code} terms with my Chinese supplier. Can you advise on freight and customs?`)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Ask David About {currentTerm.code}</span>
              </a>
            </div>
          </div>

          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
            {currentTerm.summary}
          </p>

          {/* Responsibility Checklist Matrix */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs pt-2">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
              <span className="text-slate-500 block mb-1 font-semibold">China Export Customs:</span>
              <div className="flex items-center gap-1.5 mt-1">
                {currentTerm.exportCustoms === "Seller" ? (
                  <span className="inline-flex items-center gap-1 font-bold text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="h-3.5 w-3.5" /> Supplier Handles
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 font-bold text-amber-600 dark:text-amber-400">
                    <AlertCircle className="h-3.5 w-3.5" /> Buyer Arranges
                  </span>
                )}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
              <span className="text-slate-500 block mb-1 font-semibold">International Freight:</span>
              <div className="flex items-center gap-1.5 mt-1">
                {currentTerm.internationalFreight === "Seller" ? (
                  <span className="inline-flex items-center gap-1 font-bold text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="h-3.5 w-3.5" /> Supplier Pays
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 font-bold text-amber-600 dark:text-amber-400">
                    <AlertCircle className="h-3.5 w-3.5" /> Buyer Pays (You)
                  </span>
                )}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
              <span className="text-slate-500 block mb-1 font-semibold">Cargo Transit Insurance:</span>
              <div className="flex items-center gap-1.5 mt-1">
                {currentTerm.cargoInsurance === "Seller" ? (
                  <span className="inline-flex items-center gap-1 font-bold text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="h-3.5 w-3.5" /> Seller Covers
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 font-bold text-slate-700 dark:text-slate-300">
                    <Shield className="h-3.5 w-3.5 text-blue-500" /> {currentTerm.cargoInsurance}
                  </span>
                )}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
              <span className="text-slate-500 block mb-1 font-semibold">Destination Import Duties &amp; Taxes:</span>
              <div className="flex items-center gap-1.5 mt-1">
                {currentTerm.importDutiesTaxes === "Seller" ? (
                  <span className="inline-flex items-center gap-1 font-bold text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="h-3.5 w-3.5" /> Paid by Seller/DDP
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 font-bold text-amber-600 dark:text-amber-400">
                    <AlertCircle className="h-3.5 w-3.5" /> Paid by Importer
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 text-xs">
            <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/40">
              <span className="font-bold text-blue-900 dark:text-blue-300 block mb-1">
                Where Cargo Damage Risk Shifts:
              </span>
              <p className="text-blue-800 dark:text-blue-200 leading-relaxed">
                {currentTerm.riskTransfer}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <span className="font-bold text-slate-900 dark:text-white block mb-1">
                Cost Responsibility Breakdown:
              </span>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                {currentTerm.costResponsibility}
              </p>
            </div>
          </div>
        </div>

        {/* SIDE-BY-SIDE COMPARISON TOOL */}
        <div className="mt-12">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Side-by-Side Incoterms Comparison
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Compare any two commercial terms to verify exact contractual liability shifts
              </p>
            </div>

            <button
              onClick={handleCopyComparison}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-blue-600 hover:text-white text-slate-800 dark:text-slate-200 text-xs font-bold transition-all cursor-pointer"
            >
              {copiedComparison ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
              <span>{copiedComparison ? "Comparison Copied!" : "Copy Comparison Text"}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Box */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <span className="text-xs font-bold text-slate-500">Term Option A</span>
                <select
                  value={compareCode1}
                  onChange={(e) => setCompareCode1(e.target.value)}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 font-mono font-bold text-xs"
                >
                  {ALL_11_INCOTERMS.map((t) => (
                    <option key={t.code} value={t.code}>
                      {t.code} — {t.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-slate-500">Export Customs:</span>
                  <span className="font-bold">{term1.exportCustoms} Responsibility</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-slate-500">Main Carriage Freight:</span>
                  <span className="font-bold">{term1.internationalFreight} Pays</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-slate-500">Cargo Insurance:</span>
                  <span className="font-bold">{term1.cargoInsurance}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-slate-500">Destination Duties/Taxes:</span>
                  <span className="font-bold">{term1.importDutiesTaxes} Pays</span>
                </div>
                <div className="pt-2 text-slate-600 dark:text-slate-400">
                  <span className="font-bold text-slate-900 dark:text-white block mb-0.5">Where Risk Shifts:</span>
                  {term1.riskTransfer}
                </div>
              </div>
            </div>

            {/* Right Box */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <span className="text-xs font-bold text-slate-500">Term Option B</span>
                <select
                  value={compareCode2}
                  onChange={(e) => setCompareCode2(e.target.value)}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 font-mono font-bold text-xs"
                >
                  {ALL_11_INCOTERMS.map((t) => (
                    <option key={t.code} value={t.code}>
                      {t.code} — {t.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-slate-500">Export Customs:</span>
                  <span className="font-bold">{term2.exportCustoms} Responsibility</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-slate-500">Main Carriage Freight:</span>
                  <span className="font-bold">{term2.internationalFreight} Pays</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-slate-500">Cargo Insurance:</span>
                  <span className="font-bold">{term2.cargoInsurance}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-slate-500">Destination Duties/Taxes:</span>
                  <span className="font-bold">{term2.importDutiesTaxes} Pays</span>
                </div>
                <div className="pt-2 text-slate-600 dark:text-slate-400">
                  <span className="font-bold text-slate-900 dark:text-white block mb-0.5">Where Risk Shifts:</span>
                  {term2.riskTransfer}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
