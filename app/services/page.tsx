import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { SITE_CONFIG, getWhatsAppUrl } from "@/data/siteConfig";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  Plane,
  Ship,
  Train,
  Truck,
  Box,
  Clock,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Scale,
  Compass,
  Layers,
  MessageCircle,
  Award,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Comprehensive International Freight Forwarding Services | JCD Forwarder",
  description:
    "Explore JCD Forwarder's six core international logistics services: Air Freight, Sea Freight (FCL/LCL), Rail Express, DDP Door-to-Door, Trucking Freight, and Express Courier. Reliable China export logistics with verified NVOCC license.",
  openGraph: {
    title: "Global Logistics & Freight Services from China | JCD Forwarder",
    description:
      "Direct Air charters, Ocean containers, China-Europe Rail, all-inclusive DDP, and cross-border trucking. 24/7 bilingual dispatch.",
  },
};

export default function ServicesIndexPage() {
  const services = [
    {
      id: "air-freight",
      title: "Air Freight",
      subtitle: "Direct Flights & Pure Battery Channels",
      description: "Fast and reliable air cargo transportation for time-sensitive commercial shipments from Shenzhen, Guangzhou, and Hong Kong to global destinations.",
      transit: "3 - 7 Business Days",
      bestFor: "High-value electronics, seasonal consumer products, automotive components, and UN38.3 pure batteries.",
      href: "/services/air-freight",
      icon: Plane,
      badge: "Fastest Transit",
      color: "blue",
    },
    {
      id: "sea-freight",
      title: "Sea Freight (FCL & LCL)",
      subtitle: "Full Container Load & Consolidation",
      description: "Cost-efficient ocean freight solutions for commercial cargo and bulk commodities. Weekly departures from all major Chinese sea ports with guaranteed vessel space.",
      transit: "18 - 35 Days",
      bestFor: "Bulk goods, heavy machinery, furniture, retail inventory, and cost-sensitive volume shipments.",
      href: "/services/sea-freight",
      icon: Ship,
      badge: "Most Economical",
      color: "indigo",
    },
    {
      id: "rail-freight",
      title: "Rail Freight",
      subtitle: "China-Europe Rail Express Network",
      description: "Reliable, environmentally conscious rail transport connecting major Chinese rail terminals to Central Asia and Europe via northern and southern corridors.",
      transit: "14 - 22 Days",
      bestFor: "Industrial equipment, chemicals, electronics, and automotive parts requiring faster transit than sea at lower cost than air.",
      href: "/services/rail-freight",
      icon: Train,
      badge: "Eco-Friendly Balance",
      color: "amber",
    },
    {
      id: "ddp-shipping",
      title: "DDP Shipping",
      subtitle: "All-Inclusive Door-to-Door Delivery",
      description: "Complete end-to-end shipping with export customs clearance, international transport, import customs brokerage, duty/tax payment, and final delivery.",
      transit: "Mode Dependent",
      bestFor: "Amazon FBA sellers, direct e-commerce imports, and commercial buyers seeking predictable landed costs without customs hassle.",
      href: "/services/ddp-shipping",
      icon: Box,
      badge: "100% Hassle-Free",
      color: "emerald",
    },
    {
      id: "trucking-freight",
      title: "Trucking Freight",
      subtitle: "Inland Cartage & Cross-Border Linehaul",
      description: "Flexible nationwide factory pickups, customs-bonded container drayage, and trans-continental TIR road freight connecting China directly to Europe and Southeast Asia.",
      transit: "1 - 16 Days",
      bestFor: "Factory collections, port drayage, urgent cross-border linehaul, and remote factory consolidation.",
      href: "/services/trucking-freight",
      icon: Truck,
      badge: "Maximum Flexibility",
      color: "slate",
    },
    {
      id: "express-courier",
      title: "Express Courier Service",
      subtitle: "Urgent Samples & Small Consignments",
      description: "Time-critical delivery powered by contracted Tier-1 carrier networks (DHL, FedEx, UPS). Fast sample inspection, prototype logistics, and signed delivery.",
      transit: "2 - 4 Business Days",
      bestFor: "Pre-production samples, urgent spare parts, critical commercial contracts, and small high-value packages.",
      href: "/services/express-courier",
      icon: Clock,
      badge: "Doorstep Priority",
      color: "purple",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* Hero Header */}
      <section className="relative bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white pt-16 pb-20 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-semibold">
              <ShieldCheck className="h-3.5 w-3.5 text-blue-400" />
              <span>Ministry of Transport Licensed NVOCC: GD20240307220907</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              End-to-End International Freight Forwarding Services
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Tailored multimodal logistics linking Chinese manufacturing hubs to global commercial supply chains. Select an authorized freight service below to inspect operational protocols, routes, and transit timelines.
            </p>
          </div>
        </div>
      </section>

      {/* 6 Services Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((srv) => {
              const Icon = srv.icon;
              return (
                <div
                  key={srv.id}
                  className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm hover:shadow-xl hover:border-blue-500/40 transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="h-12 w-12 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Icon className="h-6 w-6" />
                      </div>
                      <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                        {srv.badge}
                      </span>
                    </div>

                    <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
                      {srv.title}
                    </h2>
                    <div className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-3">
                      {srv.subtitle}
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                      {srv.description}
                    </p>

                    <div className="space-y-2 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
                      <div className="flex justify-between">
                        <span className="font-semibold text-slate-700 dark:text-slate-300">Transit Standard:</span>
                        <span className="font-bold text-slate-900 dark:text-white">{srv.transit}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-slate-700 dark:text-slate-300">Target Cargo: </span>
                        <span>{srv.bestFor}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <Link
                      href={srv.href}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:gap-2.5 transition-all"
                    >
                      <span>Explore Service Details</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trust & Guarantee Banner */}
      <section className="py-12 bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">Reliable &amp; Secure</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Your cargo is protected every step of the way with verified NVOCC compliance and full-value transit insurance options.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">On-Time Delivery</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Punctual delivery backed by guaranteed block space agreements (BSA) with premier airlines and maritime shipping alliances.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-xl bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                <MessageCircle className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">24/7 Expert Support</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Direct WhatsApp access to senior freight forwarders in Shenzhen with real-time operational status updates.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-slate-950 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold">Need Help Selecting the Right Shipping Mode?</h2>
          <p className="text-sm text-slate-400 max-w-xl mx-auto">
            Our logistics specialists analyze your shipment weight, volume, supplier location, and timeline constraints to recommend the most cost-effective freight solution.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <a
              href={getWhatsAppUrl("Hello JCD Logistics Desk, I need advice on choosing the right freight mode.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg transition-all"
            >
              <MessageCircle className="h-4 w-4" />
              <span>Chat with a Forwarding Specialist</span>
            </a>
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm border border-slate-700 transition-all"
            >
              <span>Explore Logistics Calculators</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
