import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { SITE_CONFIG, getWhatsAppUrl } from "@/data/siteConfig";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  Clock,
  ShieldCheck,
  Zap,
  CheckCircle2,
  ArrowRight,
  MessageCircle,
  FileText,
  Building2,
  Scale,
  Plane,
  Search,
  Package,
  ExternalLink,
  PhoneCall,
  Globe2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "International Express Courier Service | Fast Global Door-to-Door Delivery",
  description:
    "Tier-1 international express courier services by JCD Forwarder: DHL, FedEx, UPS partner rates, 2-4 day global transit, factory sample handling, prototype logistics, and pure battery express lines.",
  openGraph: {
    title: "Express Courier Services from China | JCD Forwarder NVOCC",
    description:
      "Rapid international express courier from Shenzhen, Guangzhou, and Hong Kong to 220+ countries. Direct OEM factory sample pickup and daily flight departure.",
  },
};

export default function ExpressCourierPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "International Express Courier, Small Parcel Express, Sample Delivery, Urgent Air Courier",
    name: "International Express Courier Service",
    description:
      "High-priority international express shipping from China utilizing official DHL, FedEx, and UPS contracted account rates with dedicated handling for commercial samples, prototypes, and time-critical small consignments.",
    provider: {
      "@type": "FreightForwarder",
      name: SITE_CONFIG.credentials.legalNameEn,
      url: SITE_CONFIG.url,
      telephone: SITE_CONFIG.contact.phone,
    },
  };

  const courierTiers = [
    {
      carrier: "DHL Express",
      tier: "Global Express Worldwide",
      transit: "2 - 4 Business Days",
      bestFor: "European Union, United Kingdom, Middle East, and high-priority European destination deliveries.",
      features: "Unmatched European customs clearance velocity, time-definite 9:00 AM / 12:00 PM delivery options.",
    },
    {
      carrier: "FedEx International",
      tier: "International Priority (IP)",
      transit: "2 - 4 Business Days",
      bestFor: "United States, Canada, Mexico, and Trans-Pacific aerospace / industrial machinery parts.",
      features: "Direct widebody flights from CAN/HKG hubs to Memphis World Hub, automated customs pre-clearance.",
    },
    {
      carrier: "UPS Worldwide",
      tier: "UPS Worldwide Saver",
      transit: "3 - 5 Business Days",
      bestFor: "North American commercial addresses, retail distribution centers, and heavy carton consignments.",
      features: "Seamless integrated tracking, competitive rates for multi-carton boxed shipments exceeding 21 kg.",
    },
    {
      carrier: "Specialized DG Express (HKG Hub)",
      tier: "UN3480 & Magnetic Express",
      transit: "4 - 6 Business Days",
      bestFor: "Pure lithium batteries, power banks, liquids, cosmetics, and sensitive electronic goods.",
      features: "Exclusively routed via Hong Kong International Airport under IATA Dangerous Goods regulations.",
    },
  ];

  const typicalUseCases = [
    {
      title: "Pre-Production Factory Samples",
      description: "Fast evaluation of tooling samples, textile swatches, or injection-molded components before authorizing high-volume container production runs.",
    },
    {
      title: "Urgent Replacement Spare Parts",
      description: "Critical industrial machinery sensors, PCB assemblies, or replacement parts needed immediately to prevent factory downtime.",
    },
    {
      title: "Commercial & Legal Documents",
      description: "Original signed Bills of Lading, Certificates of Origin, apostilled trade contracts, and banking letters of credit.",
    },
    {
      title: "Amazon FBA Test Batches",
      description: "Rapid delivery of 50-200 units to Amazon fulfillment centers to test market velocity and seed customer reviews prior to sea freight arrival.",
    },
  ];

  const operatingSOP = [
    {
      step: "01",
      title: "Factory Collection / Hub Ingestion",
      description: "Cartons are collected same-day from your Chinese factory or delivered directly to our Shenzhen Bao'an international logistics hub.",
    },
    {
      step: "02",
      title: "Laser Dimensioning & Barcoding",
      description: "Each package is scanned for exact physical dimensions and dead weight. High-speed thermal courier labels are applied with unique tracking barcodes.",
    },
    {
      step: "03",
      title: "Export Customs & Airport Linehaul",
      description: "Commercial invoices are submitted electronically to customs. Cargo moves via bonded shuttle to Hong Kong (HKG), Shenzhen (SZX), or Guangzhou (CAN) airside.",
    },
    {
      step: "04",
      title: "Last-Mile Delivery & Signature",
      description: "Global carrier fleets complete door-to-door delivery with live online proof-of-delivery (POD) and recipient signature capture.",
    },
  ];

  const faqs = [
    {
      question: "How is volumetric weight calculated for international express couriers?",
      answer: "International couriers (DHL, FedEx, UPS) standardly calculate volumetric weight using the divisor of 5000: (Length cm × Width cm × Height cm) ÷ 5000 = Volumetric Weight (kg). The chargeable weight is always the greater of actual gross weight or volumetric weight.",
    },
    {
      question: "Why should I book through JCD Forwarder instead of opening a direct carrier account?",
      answer: "As an NVOCC with bulk corporate contract volumes, JCD Forwarder secures discounted enterprise tier rates up to 50-60% below standard public retail tariff rates. Furthermore, our Shenzhen team performs physical inspection, repacking, and customs export filing.",
    },
    {
      question: "Can express couriers handle shipments containing batteries?",
      answer: "Yes. Built-in lithium batteries (UN3481) can ship via standard international express with proper UN38.3 test summaries. For pure lithium batteries (UN3480) or loose power banks, we route via our specialized Hong Kong DG express line.",
    },
    {
      question: "Are customs duties and taxes included in express courier rates?",
      answer: "Standard express courier services operate under DDU/DAP terms, meaning destination customs duties, VAT, and administrative handling fees are paid by the recipient upon arrival. If you require door-to-door delivery with all taxes prepaid, our Air DDP service is recommended.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <JsonLd schema={serviceSchema} />

      {/* 1. HERO SECTION */}
      <section className="relative bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white pt-16 pb-20 overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:20px_20px]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-400 mb-4">
            <Link href="/" className="hover:underline">Home</Link>
            <span>/</span>
            <Link href="/services" className="hover:underline">Services</Link>
            <span>/</span>
            <span className="text-slate-300">Express Courier</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-semibold">
                <Clock className="h-3.5 w-3.5 text-blue-400" />
                <span>Tier-1 Contracted Rates: DHL, FedEx, UPS &amp; Specialized Lines</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Global Express Courier &amp; High-Priority Sample Logistics
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                When hours matter, rely on our prioritized express courier network. JCD Forwarder delivers factory prototypes, urgent replacement parts, and high-value small consignments to 220+ countries with door-to-door tracking and 2-4 business day transit.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <a
                  href={getWhatsAppUrl("Hello JCD Express Desk, I need urgent express courier pricing for a sample package.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-900/30 transition-all"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Get Express Rate Quote</span>
                </a>

                <Link
                  href="/tools/volumetric-calculator"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm border border-slate-700 transition-all"
                >
                  <Scale className="h-4 w-4 text-blue-400" />
                  <span>Courier Volumetric Calc (÷5000)</span>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-800/80">
                <div>
                  <div className="text-2xl font-black text-white">2 - 4 Days</div>
                  <div className="text-xs text-slate-400">Global Priority Transit</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-blue-400">220+</div>
                  <div className="text-xs text-slate-400">Countries &amp; Territories</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-emerald-400">Up to 60%</div>
                  <div className="text-xs text-slate-400">Below Public Tariffs</div>
                </div>
              </div>
            </div>

            {/* Quick Courier Tracking / Lookup Card */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl bg-slate-800/80 border border-slate-700 p-6 sm:p-8 backdrop-blur shadow-2xl">
                <div className="flex items-center justify-between pb-4 border-b border-slate-700 mb-6">
                  <div>
                    <h3 className="text-base font-bold text-white">Express Courier Desk</h3>
                    <p className="text-xs text-slate-400">Daily hub departures from SZX &amp; HKG</p>
                  </div>
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-500/20 text-emerald-300">
                    Same-Day Pickup
                  </span>
                </div>

                <div className="space-y-4 text-xs">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                    <span className="text-slate-400">Partner Carriers:</span>
                    <span className="font-semibold text-slate-200">DHL, FedEx, UPS, SF International</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                    <span className="text-slate-400">Battery Capabilities:</span>
                    <span className="font-semibold text-emerald-400">UN3481 Built-in &amp; UN3480 Pure Battery</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                    <span className="text-slate-400">Pickup Cut-off:</span>
                    <span className="font-semibold text-slate-200">16:00 Daily for Same-Day Flight Export</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                    <span className="text-slate-400">Consolidation Service:</span>
                    <span className="font-semibold text-blue-400">Free Multi-Supplier Sample Repacking</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-700 flex flex-col gap-2">
                  <Link
                    href="/tools/tracking"
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-colors"
                  >
                    <Search className="h-3.5 w-3.5" />
                    <span>Track Active Express Shipment</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. COURIER PARTNER TIERS */}
      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <h2 className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2">
              Multi-Carrier Portfolio
            </h2>
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Contracted Global Express Carriers &amp; Specialty Lines
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
              We dynamically route each consignment through the carrier network offering the fastest transit and cleanest customs clearance track record for your destination country.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {courierTiers.map((tier, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 hover:border-blue-500/50 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                        {tier.carrier}
                      </span>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                        {tier.tier}
                      </h3>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300">
                      {tier.transit}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mb-4">
                    {tier.features}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200/80 dark:border-slate-700 text-xs">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">Optimal Destination: </span>
                  <span className="text-slate-600 dark:text-slate-400">{tier.bestFor}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. TYPICAL USE CASES */}
      <section className="py-16 bg-slate-50 dark:bg-slate-950 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <h2 className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2">
              Business Applications
            </h2>
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              When to Select Express Courier Over Standard Freight
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {typicalUseCases.map((useCase, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="h-10 w-10 rounded-xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4">
                    <Package className="h-5 w-5" />
                  </div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-2">
                    {useCase.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {useCase.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. OPERATING SOP */}
      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2">
              Precision Handling
            </h2>
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              The 4-Step Express Courier Dispatch Workflow
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {operatingSOP.map((sop, idx) => (
              <div key={idx} className="relative p-5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60">
                <div className="text-2xl font-black text-blue-600 dark:text-blue-400 mb-2 font-mono">
                  {sop.step}
                </div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-2">
                  {sop.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {sop.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FAQ SECTION */}
      <section className="py-16 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2">
              Frequently Asked Questions
            </h2>
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Express Courier Shipping FAQs
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
              >
                <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-2">
                  {faq.question}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FINAL CTA */}
      <section className="py-16 bg-slate-900 border-t border-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold">
            Ship Urgent Factory Samples or Parcels Today
          </h2>
          <p className="text-sm text-blue-200 max-w-2xl mx-auto">
            Provide your pickup address in China and international delivery destination. Our express desk will confirm carrier options, discounted rates, and collection timing within 15 minutes.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <a
              href={getWhatsAppUrl("Hello JCD Express, I have a parcel ready for pickup in China.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-sm shadow-lg transition-all"
            >
              <MessageCircle className="h-4 w-4" />
              <span>Message Express Dispatch</span>
            </a>
            <Link
              href="/tools/volumetric-calculator"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 transition-all"
            >
              <span>Calculate Volumetric Weight</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
