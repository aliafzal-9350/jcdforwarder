import type { Metadata } from "next";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { SITE_CONFIG, getWhatsAppUrl } from "@/data/siteConfig";
import { ORIGIN_HUBS } from "@/data/origins";
import { TARGET_ROUTES } from "@/data/routes";
import { FAQS } from "@/data/faqs";
import { buildMetadata } from "@/lib/seo";
import { Hero } from "@/components/home/Hero";
import { SopSwitcher } from "@/components/home/SopSwitcher";
import { FaqAccordion } from "@/components/home/FaqAccordion";
import { QuoteTriggerButton } from "@/components/home/QuoteTriggerButton";
import {
  ShieldCheck,
  Star,
  Plane,
  Ship,
  Train,
  Truck,
  Box,
  Layers,
  Calculator,
  ArrowRight,
  MessageCircle,
  Clock,
  Building2,
  MapPin,
  Phone,
  Mail,
  Search,
  FileText,
} from "lucide-react";

export const metadata: Metadata = buildMetadata({
  title: `${SITE_CONFIG.shortName} | China DDP Freight Forwarding & Global Logistics`,
  description: SITE_CONFIG.description,
  path: "/",
});

const featuredRoutes = TARGET_ROUTES.slice(0, 8);
const featuredFaqs = FAQS.filter((f) => f.featured).slice(0, 6);

// Tailwind needs literal class strings to detect them at build time, so colors are
// looked up from this static map rather than interpolated (e.g. `bg-${color}-100`).
const SERVICE_COLOR_CLASSES = {
  blue: { icon: "bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400", stat: "text-blue-600 dark:text-blue-400" },
  cyan: { icon: "bg-cyan-100 text-cyan-600 dark:bg-cyan-900/40 dark:text-cyan-400", stat: "text-cyan-600 dark:text-cyan-400" },
  amber: { icon: "bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400", stat: "text-amber-600 dark:text-amber-400" },
  emerald: { icon: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400", stat: "text-emerald-600 dark:text-emerald-400" },
  slate: { icon: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300", stat: "text-slate-600 dark:text-slate-400" },
  rose: { icon: "bg-rose-100 text-rose-600 dark:bg-rose-900/40 dark:text-rose-400", stat: "text-rose-600 dark:text-rose-400" },
} satisfies Record<string, { icon: string; stat: string }>;

interface ServiceOverviewItem {
  href: string;
  icon: LucideIcon;
  color: keyof typeof SERVICE_COLOR_CLASSES;
  name: string;
  stat: string;
  desc: string;
}

const SERVICES_OVERVIEW: ServiceOverviewItem[] = [
  {
    href: "/services/air-freight",
    icon: Plane,
    color: "blue",
    name: "Air Freight & Battery DDP",
    stat: "3–7 Business Days",
    desc: "Direct flights from CAN, SZX, HKG to LGG, LHR, LAX, FRA. Specialized DG channel for UN38.3 pure batteries and cosmetics.",
  },
  {
    href: "/services/sea-freight",
    icon: Ship,
    color: "cyan",
    name: "Ocean Freight (FCL & LCL)",
    stat: "14–35 Days Transit",
    desc: "20GP, 40GP, 40HQ, 45HQ container booking and weekly LCL consolidations via COSCO, Evergreen, Maersk, and Matson CLX.",
  },
  {
    href: "/services/rail-freight",
    icon: Train,
    color: "amber",
    name: "China-Europe Railway",
    stat: "16–22 Days Landbridge",
    desc: "Direct block trains from Xi'an, Chengdu, and Yiwu (Yixinou) via Alashankou & Brest into Poland, Germany, and the UK.",
  },
  {
    href: "/services/ddp-shipping",
    icon: Box,
    color: "emerald",
    name: "DDP Door-to-Door Freight",
    stat: "All Duties & Taxes Paid",
    desc: "All-inclusive air & ocean door-to-door delivery with export declarations, destination customs clearance, and final delivery included.",
  },
  {
    href: "/services/trucking-freight",
    icon: Truck,
    color: "slate",
    name: "Inland & TIR Trucking",
    stat: "Nationwide & Cross-Border",
    desc: "Factory pickup cartage across Guangdong and Zhejiang, bonded customs shuttle transfer, and China-Europe TIR linehaul.",
  },
  {
    href: "/services/express-courier",
    icon: Clock,
    color: "rose",
    name: "Express Courier Service",
    stat: "3–5 Business Days",
    desc: "Direct accounts with DHL Express, FedEx Priority, and UPS Worldwide for urgent samples, electronics, and time-critical spares.",
  },
];

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

export default function HomePage() {
  return (
    <div className="bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen">
      <Hero />

      {/* 2. CORE FREIGHT SERVICES OVERVIEW — editorial split, not another card grid */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-8">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28 space-y-4">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                Comprehensive Multimodal Logistics
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                End-to-End Freight Architecture from China
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Backed by direct tier-1 carrier contracts, NVOCC licensing, and in-house customs brokerage.
              </p>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:underline pt-2"
              >
                <span>View All Services</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-8 border-t border-slate-200 dark:border-slate-800">
            {SERVICES_OVERVIEW.map((service) => (
              <Link
                key={service.href}
                href={service.href}
                className="group flex items-start sm:items-center gap-4 sm:gap-5 py-6 border-b border-slate-200 dark:border-slate-800 hover:bg-slate-50/60 dark:hover:bg-slate-900/40 transition-colors -mx-4 px-4 sm:-mx-6 sm:px-6"
              >
                <div className={`h-11 w-11 shrink-0 rounded-xl flex items-center justify-center ${SERVICE_COLOR_CLASSES[service.color].icon}`}>
                  <service.icon className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-0.5">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                      {service.name}
                    </h3>
                    <span className={`text-xs font-mono font-bold ${SERVICE_COLOR_CLASSES[service.color].stat}`}>
                      {service.stat}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">{service.desc}</p>
                </div>
                <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all shrink-0 mt-1 sm:mt-0" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE SOP PROCESS SWITCHER */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900/50 border-t border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-2 mb-12">
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

          <SopSwitcher />
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

          {/* Rate-sheet style table, not another card grid */}
          <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <table className="w-full min-w-[720px] text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-left text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  <th className="py-4 pl-5 pr-4 font-bold">Destination</th>
                  <th className="py-4 px-4 font-bold">De Minimis</th>
                  <th className="py-4 px-4 font-bold">Air Express</th>
                  <th className="py-4 px-4 font-bold">Sea Freight</th>
                  <th className="py-4 pr-5 pl-4 font-bold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {featuredRoutes.map((route) => (
                  <tr key={route.code} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-4 pl-5 pr-4">
                      <Link
                        href={`/routes/${route.slug}`}
                        className="font-bold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 inline-flex items-center gap-2"
                      >
                        <span className="text-lg shrink-0">{route.flag}</span>
                        <span>{route.name}</span>
                      </Link>
                      <span className="ml-2 text-xs font-mono text-slate-400">{route.code}</span>
                    </td>
                    <td className="py-4 px-4 text-slate-600 dark:text-slate-400">{route.deMinimisThreshold}</td>
                    <td className="py-4 px-4 text-slate-600 dark:text-slate-400">5–7 Days</td>
                    <td className="py-4 px-4 text-slate-600 dark:text-slate-400">14–28 Days</td>
                    <td className="py-4 pr-5 pl-4 text-right">
                      <QuoteTriggerButton
                        destinationSlug={route.slug}
                        className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold"
                      >
                        Quote
                      </QuoteTriggerButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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

        <FaqAccordion faqs={featuredFaqs} />
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

                <QuoteTriggerButton className="w-full flex items-center justify-center gap-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white py-3.5 text-sm font-bold shadow-md transition-all">
                  <Calculator className="h-4 w-4" />
                  <span>Start Quote Inquiry Wizard</span>
                </QuoteTriggerButton>
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
            <QuoteTriggerButton className="flex items-center gap-2 rounded-xl bg-white text-blue-900 hover:bg-blue-50 px-7 py-4 text-sm font-bold shadow-lg transition-all hover:scale-105">
              <Calculator className="h-4 w-4 text-orange-600" />
              <span>Launch Quote Wizard</span>
            </QuoteTriggerButton>
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
