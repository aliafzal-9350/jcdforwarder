import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { SITE_CONFIG, getWhatsAppUrl } from "@/data/siteConfig";
import { JsonLd, createLogisticsServiceSchema } from "@/components/seo/JsonLd";
import {
  Plane,
  ShieldCheck,
  Zap,
  BatteryCharging,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  MessageCircle,
  FileText,
  Building2,
  Scale,
  Sparkles,
  Award,
} from "lucide-react";

export const metadata: Metadata = {
  title: "China Air Freight & Air DDP Logistics | Direct Flights & Pure Battery Channels",
  description:
    "Authoritative China air freight and Air DDP services from Shenzhen (SZX), Guangzhou (CAN), and Hong Kong (HKG) to Europe, USA, and global destinations. UN38.3 pure battery lines, 5-7 day express transit, and wheel-to-wheel customs clearance.",
  openGraph: {
    title: "China Air Freight & Air DDP Shipping | JCD Forwarder NVOCC",
    description:
      "Direct air charters, daily freighter space, and hazardous battery channels from China to 44 global destinations. NVOCC License GD20240307220907.",
  },
};

export default function AirFreightPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Air Freight, Air DDP, Charter Flight & Battery Logistics",
    name: "Air Freight & Air DDP Logistics from China",
    description:
      "Commercial air freight, scheduled freighter charters, and all-inclusive Air DDP delivery from Chinese airport gateways (SZX, CAN, HKG, PVG) with UN38.3 lithium battery compliance.",
    provider: {
      "@type": "FreightForwarder",
      name: SITE_CONFIG.credentials.legalNameEn,
      url: SITE_CONFIG.url,
      telephone: SITE_CONFIG.contact.phone,
    },
  };

  const airportGateways = [
    {
      code: "SZX",
      city: "Shenzhen Bao'an International",
      type: "Origin Hub",
      role: "Cross-border e-commerce direct freighter hub & battery cargo staging.",
      freighters: "SF Airlines, China Southern, UPS",
    },
    {
      code: "CAN",
      city: "Guangzhou Baiyun International",
      type: "Origin Hub",
      role: "Premier South China widebody gateway with daily departures to EU & US.",
      freighters: "FedEx Asia Hub, China Southern Cargo, Qatar Cargo",
    },
    {
      code: "HKG",
      city: "Hong Kong International",
      type: "Origin Hub",
      role: "Global DG compliance center for UN3480 pure lithium batteries & magnetic cargo.",
      freighters: "Cathay Cargo, Polar Air, Silk Way West",
    },
    {
      code: "PVG",
      city: "Shanghai Pudong International",
      type: "Origin Hub",
      role: "East China heavy cargo & high-tech electronics consolidation gateway.",
      freighters: "Air China Cargo, Lufthansa Cargo, Cargolux",
    },
    {
      code: "LGG",
      city: "Liege Airport (Belgium)",
      type: "European Gateway",
      role: "Primary European e-commerce hub with 24/7 wheel-to-wheel green customs channel.",
      freighters: "Air China, Ethiopian Cargo, ASL Airlines",
    },
    {
      code: "LAX",
      city: "Los Angeles International",
      type: "US West Gateway",
      role: "Trans-Pacific main port for US West FBA distribution and express CFS drayage.",
      freighters: "Atlas Air, Western Global, Kalitta Air",
    },
    {
      code: "LHR",
      city: "London Heathrow Airport",
      type: "UK Gateway",
      role: "Rapid UK customs clearance and bonded parcel injection into Royal Mail / DPD.",
      freighters: "British Airways World Cargo, Virgin Atlantic Cargo",
    },
    {
      code: "FRA",
      city: "Frankfurt Airport (Germany)",
      type: "Central Europe Gateway",
      role: "Continental European multimodal hub with direct autobahn feeder to 12 EU states.",
      freighters: "Lufthansa Cargo, Qatar Airways Cargo",
    },
  ];

  const airSopSteps = [
    {
      step: "01",
      title: "Booking & ULD Space Allocation",
      desc: "Fixed block-space agreements (BSA) lock flight pallets and upper-deck positions 48 hours prior to flight departure.",
      badge: "T-48H",
    },
    {
      step: "02",
      title: "Shenzhen Warehouse Staging & X-Ray",
      desc: "Carton weigh-in, dimensional verification, secondary packaging check, and CAAC civil aviation security screening.",
      badge: "T-24H",
    },
    {
      step: "03",
      title: "Export Customs & Air Waybill Issuance",
      desc: "Single-window export declaration filing, EDI manifest transmission, and Master Air Waybill (MAWB) generation.",
      badge: "T-12H",
    },
    {
      step: "04",
      title: "Tarmac Pallet Build-up & Loading",
      desc: "Certified aircraft pallet contour netting and PMC/PAG ULD stuffing under strict weight and balance protocols.",
      badge: "T-4H",
    },
    {
      step: "05",
      title: "Direct Flight & Pre-Arrival Manifest",
      desc: "Real-time satellite GPS tracking with destination pre-arrival EDI customs clearance while the aircraft is airborne.",
      badge: "12-16H In Flight",
    },
    {
      step: "06",
      title: "Destination Wheel-to-Wheel Ramp Breakdown",
      desc: "Priority apron breakdown at LGG/LAX/LHR bonded terminals within 4 to 6 hours of aircraft touchdown.",
      badge: "Touchdown +4H",
    },
    {
      step: "07",
      title: "Fiscal Customs Clearance & Tax Payment",
      desc: "Customs declaration release under JCD bonded broker code with automated duty/VAT settlement.",
      badge: "Touchdown +8H",
    },
    {
      step: "08",
      title: "Last-Mile Hub Handover & Amazon Delivery",
      desc: "Inbound dispatch to Amazon FBA fulfillment centers or commercial doors via UPS, FedEx, DPD, or bonded trucks.",
      badge: "Final Delivery",
    },
  ];

  return (
    <div className="bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen">
      <JsonLd schema={serviceSchema} />

      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-slate-950 text-white py-20 lg:py-28 border-b border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/30 via-slate-950 to-slate-950 -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 border border-blue-500/30 px-3 py-1 text-xs font-semibold text-blue-300">
              <ShieldCheck className="h-3.5 w-3.5 text-blue-400" />
              <span>NVOCC Licensed GD20240307220907 • Direct Airline Allocations</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1]">
              China Air Freight &amp; <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-sky-400">
                Air DDP Door-to-Door
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Expedited air freight logistics connecting South &amp; East China manufacturing centers directly to 44 global destinations. Daily scheduled widebody freighters, dedicated UN38.3 pure battery lines, and 5–7 business day landed DDP delivery.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href={getWhatsAppUrl("Hello JCD Forwarder, I am looking for an Air DDP quote for urgent air shipment from China.")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.02]"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Instant Air Quote via WhatsApp</span>
              </a>

              <Link
                href="/tools/volumetric-calculator"
                className="flex items-center gap-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 px-6 py-3.5 text-sm font-bold text-slate-200 transition-all"
              >
                <Scale className="h-4 w-4 text-blue-400" />
                <span>Calculate Chargeable Weight</span>
              </Link>
            </div>

            {/* Live Metrics */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-800/80 max-w-lg">
              <div>
                <div className="text-2xl font-black text-white">5–7 Days</div>
                <div className="text-xs text-slate-400">Direct Express Transit</div>
              </div>
              <div>
                <div className="text-2xl font-black text-blue-400">1:6000</div>
                <div className="text-xs text-slate-400">Air Volumetric Divisor</div>
              </div>
              <div>
                <div className="text-2xl font-black text-emerald-400">100%</div>
                <div className="text-xs text-slate-400">UN38.3 DG Compliant</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THREE AIR FREIGHT PRODUCT CHANNELS */}
      <section className="py-16 lg:py-24 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
              Multimodal Air Solutions
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Engineered for Speed, Reliability, and Hazardous Compliance
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Select the optimal tier based on your inventory lead time, cargo chemistry, and landed cost budget.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Tier 1: Express Air DDP */}
            <div className="rounded-2xl bg-white dark:bg-slate-900 p-8 shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-bl-xl">
                Fastest
              </div>
              <div className="space-y-4">
                <div className="h-12 w-12 rounded-xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 flex items-center justify-center">
                  <Zap className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    Air DDP Priority Express
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 font-mono">
                    Direct flights via SZX &amp; CAN
                  </p>
                </div>
                <div className="text-2xl font-black text-slate-900 dark:text-white">
                  5–7 Business Days
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Scheduled widebody freighter slots on China Southern, FedEx, and UPS. Priority apron handling, pre-arrival customs submission, and immediate wheel-to-wheel breakdown upon landing.
                </p>
                <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                    <span>Fixed block-space agreements (BSA)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                    <span>Duty and import VAT included (DDP)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                    <span>Ideal for urgent stock-outs &amp; launches</span>
                  </li>
                </ul>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800">
                <a
                  href={getWhatsAppUrl("Hello JCD, I need priority 5-7 day Air DDP quote.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full rounded-xl bg-blue-600 hover:bg-blue-700 text-white py-2.5 text-xs font-bold transition-colors"
                >
                  <span>Book Priority Air</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

            {/* Tier 2: Economy Air DDP */}
            <div className="rounded-2xl bg-white dark:bg-slate-900 p-8 shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="h-12 w-12 rounded-xl bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 flex items-center justify-center">
                  <Plane className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    Air DDP Standard Economy
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 font-mono">
                    Transit routing via KHN / CGO
                  </p>
                </div>
                <div className="text-2xl font-black text-slate-900 dark:text-white">
                  8–12 Business Days
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Optimized for volume cargo and lower landed freight cost. Leverages inland regional airports (Zhengzhou CGO, Nanchang KHN) utilizing passenger bellyhold space and chartered secondary freighters.
                </p>
                <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                    <span>15% to 25% lower freight rates</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                    <span>All customs formalities handled</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                    <span>Best for recurring restock orders</span>
                  </li>
                </ul>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800">
                <a
                  href={getWhatsAppUrl("Hello JCD, I need economy Air DDP freight quote.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full rounded-xl bg-slate-800 hover:bg-slate-700 text-white py-2.5 text-xs font-bold transition-colors"
                >
                  <span>Book Economy Air</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

            {/* Tier 3: Pure Battery & Hazardous Cargo */}
            <div className="rounded-2xl bg-white dark:bg-slate-900 p-8 shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col justify-between border-amber-300 dark:border-amber-900/60 relative">
              <div className="absolute top-0 right-0 bg-amber-500 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-bl-xl">
                DG Certified
              </div>
              <div className="space-y-4">
                <div className="h-12 w-12 rounded-xl bg-amber-100 dark:bg-amber-900/40 text-amber-600 flex items-center justify-center">
                  <BatteryCharging className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    Pure Battery &amp; Electronics
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 font-mono">
                    Hong Kong (HKG) &amp; Weihai Transit
                  </p>
                </div>
                <div className="text-2xl font-black text-slate-900 dark:text-white">
                  7–10 Business Days
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Specialized Dangerous Goods (DG) compliance channel for UN3480 pure power banks, lithium cells, e-bikes, and cosmetics. Crosses via Hong Kong or Korea ferry bypassing strict mainland aviation bans.
                </p>
                <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                    <span>UN38.3, MSDS &amp; Drop Test verified</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                    <span>Section IB / Section II compliant</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                    <span>Zero offloading risk at airline gates</span>
                  </li>
                </ul>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800">
                <a
                  href={getWhatsAppUrl("Hello JCD, I need UN38.3 battery cargo air freight quote.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full rounded-xl bg-amber-600 hover:bg-amber-700 text-white py-2.5 text-xs font-bold transition-colors"
                >
                  <span>Inquire Battery Channel</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. AIRPORT GATEWAYS MATRIX */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-3 mb-10">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
            Aviation Infrastructure
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Primary Origin &amp; Destination Airport Gateways
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Strategic airport hubs ensuring maximum cargo lift capacity and fast ground clearance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {airportGateways.map((airport) => (
            <div
              key={airport.code}
              className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-500/50 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl font-black font-mono text-blue-600 dark:text-blue-400">
                  {airport.code}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                  {airport.type}
                </span>
              </div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                {airport.city}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                {airport.role}
              </p>
              <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-400 font-medium">
                Carriers: <span className="text-slate-900 dark:text-slate-200">{airport.freighters}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. 8-STEP AIR FREIGHT SOP TIMELINE */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12 space-y-2">
            <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">
              Standard Operating Procedure
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight">
              The JCD 8-Step Air Freight Execution Lifecycle
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Predictable, milestone-driven operations from our Shenzhen consolidation facility to destination wheels-down.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {airSopSteps.map((step) => (
              <div
                key={step.step}
                className="rounded-xl bg-slate-800/60 p-5 border border-slate-700/60 relative flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl font-black font-mono text-blue-400">
                      {step.step}
                    </span>
                    <span className="text-[10px] font-mono font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30 px-2 py-0.5 rounded">
                      {step.badge}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white mb-2">{step.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. VOLUMETRIC WEIGHT & BATTERY COMPLIANCE RULES */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Volumetric Weight Explanation */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-8 bg-white dark:bg-slate-900 space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-900/40 text-blue-600 flex items-center justify-center">
                <Scale className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Air Freight Volumetric Divisor (1:6000)
                </h3>
                <span className="text-xs text-slate-500">IATA Standard Calculation Rule</span>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Air freight charges are based on the higher of <strong>Actual Gross Weight</strong> vs. <strong>Volumetric Weight</strong>. JCD Forwarder applies the standard airline ratio of 1 CBM = 167 KG (Divisor: 6000 cm³/kg), saving you up to 20% compared to international express courier divisors (Divisor: 5000 cm³/kg).
            </p>

            <div className="rounded-xl bg-slate-50 dark:bg-slate-800 p-4 border border-slate-200 dark:border-slate-700 space-y-2 font-mono text-xs text-slate-800 dark:text-slate-200">
              <div>Volumetric Weight (KG) = [Length (cm) × Width (cm) × Height (cm)] / 6000</div>
              <div className="text-blue-600 dark:text-blue-400 font-bold">
                Example: 10 Boxes of 50×40×40 cm = 133.3 KG Volumetric Weight
              </div>
            </div>

            <Link
              href="/tools/volumetric-calculator"
              className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
            >
              <span>Use the Volumetric Weight Calculator</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Dangerous Goods Battery Checklist */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-8 bg-white dark:bg-slate-900 space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-amber-100 dark:bg-amber-900/40 text-amber-600 flex items-center justify-center">
                <BatteryCharging className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Lithium Battery Compliance Protocol
                </h3>
                <span className="text-xs text-slate-500">UN38.3 &amp; IATA Dangerous Goods Regs</span>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Lithium batteries are strictly classified under international aviation law. JCD Forwarder guides your factory through required paperwork for zero-delay export clearance:
            </p>

            <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>UN38.3 Test Summary Report:</strong> Verified thermal, vibration, shock, and external short circuit testing.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>Material Safety Data Sheet (MSDS):</strong> 16-section updated safety report with manufacturer stamp.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>1.2-Meter Drop Test:</strong> Packaging certification for outer cartons preventing contact short-circuits.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>IATA Battery Handling Label:</strong> UN number and 24-hour emergency phone number marked on every carton.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION BAR */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-black">
            Book Your China Air Charter or Air DDP Space
          </h2>
          <p className="text-sm sm:text-base text-blue-100 max-w-2xl mx-auto">
            Get exact landed rates, upcoming flight cut-offs, and customs clearance prep in under 2 hours.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={getWhatsAppUrl("Hello JCD Forwarder, I need to book air freight space from China.")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl bg-white text-blue-600 hover:bg-blue-50 px-6 py-3.5 text-sm font-bold shadow-md transition-all hover:scale-105"
            >
              <MessageCircle className="h-4 w-4" />
              <span>Contact Senior Dispatch Desk</span>
            </a>
            <a
              href={`mailto:${SITE_CONFIG.contact.email}?subject=Air%20Freight%20Booking%20Inquiry`}
              className="flex items-center gap-2 rounded-xl bg-blue-700 hover:bg-blue-800 text-white border border-blue-500 px-6 py-3.5 text-sm font-bold transition-all"
            >
              <FileText className="h-4 w-4" />
              <span>Email Official RFQ</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
