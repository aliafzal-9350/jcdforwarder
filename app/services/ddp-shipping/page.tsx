'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { SITE_CONFIG, getWhatsAppUrl } from '@/data/siteConfig';
import { useQuoteModal } from '@/components/quote/QuoteModalContext';
import {
  PackageCheck,
  ShieldCheck,
  Plane,
  Ship,
  Truck,
  CheckCircle2,
  Clock,
  ArrowRight,
  MessageCircle,
  FileText,
  Building2,
  HelpCircle,
  ChevronDown,
  Zap,
  DollarSign,
  Scale,
  Box,
} from 'lucide-react';

export default function DdpShippingPage() {
  const { openQuoteModal } = useQuoteModal();
  const [activeMode, setActiveMode] = useState<'air' | 'sea'>('air');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const ddpSteps = [
    {
      num: '01',
      title: 'Supplier Collection & Warehouse Consolidation',
      timeline: 'Days 1–2',
      desc: 'Our fleet picks up cartons directly from your factories in Guangdong, Zhejiang, Jiangsu, or Fujian. Consolidated at our Bao’an Xinhe facility for count verification, carton re-boxing, and palletization.',
    },
    {
      num: '02',
      title: 'Export Customs Declaration & Tax Drawback',
      timeline: 'Day 2',
      desc: 'JCD files compliant export declarations through Shenzhen/Guangzhou customs. We issue official export customs slips for factory VAT tax drawback eligibility.',
    },
    {
      num: '03',
      title: 'Direct Linehaul Transit (Air or Ocean)',
      timeline: 'Days 3–25',
      desc: 'Air DDP boards scheduled wide-body freighters (5–8 days total door time). Ocean DDP utilizes direct fast liners (Matson CLX to USWC, COSCO/Evergreen to Europe) with real-time GPS telemetry.',
    },
    {
      num: '04',
      title: 'Wheel-to-Wheel Destination Customs Clearance',
      timeline: 'En Route & Arrival',
      desc: 'Electronic pre-clearance submitted before vessel docking or flight landing. JCD’s licensed customs brokers pay all import duties, tariffs, and VAT under our corporate bond.',
    },
    {
      num: '05',
      title: 'Final Mile Delivery to Door or Amazon FBA',
      timeline: 'Final 24–48h',
      desc: 'Cargo is sorted and injected into local carrier fleets (UPS, FedEx, DPD, DHL) or scheduled with Amazon CARP / Carrier Central for dock appointment delivery with zero receiving friction.',
    },
  ];

  const faqs = [
    {
      q: 'What does DDP (Delivered Duty Paid) shipping include?',
      a: 'JCD DDP shipping is a 100% turnkey service. Our single, fixed rate includes origin supplier pickup, export declaration, air or ocean freight, terminal handling fees (THC), destination customs clearance, import tariffs and taxes, and final delivery to your private commercial address or Amazon FBA warehouse.',
    },
    {
      q: 'Do I need an import license or customs bond to use DDP?',
      a: 'No. Under JCD’s DDP service, our licensed entity acts as the Importer of Record (IOR). You do not need an import license, customs bond, EORI number, or foreign tax registration.',
    },
    {
      q: 'How are customs duties and VAT handled in DDP pricing?',
      a: 'All applicable import duties, customs fees, and destination VAT/GST are calculated and fully absorbed into your agreed all-inclusive quote. You will never receive surprise invoices from customs authorities or overseas port terminals.',
    },
    {
      q: 'Can JCD handle Amazon FBA palletizing and FNSKU labeling?',
      a: 'Yes. At our Shenzhen Bao’an consolidation hub, we inspect carton integrity, apply required FNSKU barcodes and carton shipping labels, palletize on standard GMA / EPAL pallets, and secure with 4-way stretch wrapping to meet strict Amazon inbound requirements.',
    },
    {
      q: 'Can you ship lithium batteries and electronic products under DDP?',
      a: 'Yes. We operate dedicated hazardous battery channels with UN38.3 test summaries, MSDS documentation, and DG dangerous goods sea and air packaging for pure battery cells, power banks, and battery-installed consumer devices.',
    },
    {
      q: 'What is the transit time difference between Air DDP and Sea DDP?',
      a: 'Air DDP typically takes 6–10 business days door-to-door from factory pickup to final delivery. Sea DDP takes 20–35 days depending on destination port and inland linehaul distance.',
    },
    {
      q: 'What documents do I need to provide for a DDP shipment?',
      a: 'You only need to supply two documents: a Commercial Invoice and a Packing List. Our team handles all export licenses, customs declarations, shipping orders, and delivery orders.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-slate-900 text-white pt-20 pb-24 border-b border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(37,99,235,0.25),rgba(255,255,255,0))]" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 uppercase tracking-widest mb-4">
            <span className="flex h-2 w-2 rounded-full bg-blue-400 animate-ping" />
            Turnkey Cross-Border Freight
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 max-w-4xl">
            China DDP Shipping:{' '}
            <span className="text-sky-400">
              Frictionless Door-to-Door Delivery
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mb-8 leading-relaxed">
            All-inclusive freight from Chinese factory floors to your doorstep or Amazon FBA dock.
            We manage origin collection, export compliance, international linehaul, destination customs clearance, and fully prepaid import duties.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => openQuoteModal({ serviceType: 'DDP Air / Ocean All-Inclusive' })}
              className="px-6 py-3.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm shadow-lg shadow-orange-600/25 transition-all flex items-center gap-2 group"
            >
              <span>Get Instant DDP Landed Quote</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <a
              href={getWhatsAppUrl('Hi JCD Forwarder, I need a door-to-door DDP quote for goods shipping from China.')}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-600/30 transition-all flex items-center gap-2"
            >
              <MessageCircle className="h-4 w-4" />
              <span>WhatsApp Rate Desk</span>
            </a>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-8 border-t border-slate-800/80">
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-white">44+</div>
              <div className="text-xs text-slate-400 mt-1">Countries with DDP Clearance</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-blue-400">0%</div>
              <div className="text-xs text-slate-400 mt-1">Import License Required</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-emerald-400">100%</div>
              <div className="text-xs text-slate-400 mt-1">Prepaid Tariffs &amp; VAT</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-amber-400">6–35 Days</div>
              <div className="text-xs text-slate-400 mt-1">Air DDP vs Ocean DDP Speed</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. DDP COMPARISON: AIR DDP VS OCEAN DDP */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Choose Your DDP Transport Conduit
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
            Whether prioritizing turnover velocity or maximum container gross margins, our dual DDP options eliminate port friction.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Card 1: Air DDP */}
          <div className="rounded-2xl border-2 border-blue-500/40 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-md relative">
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
                Speed Priority
              </span>
              <Plane className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              DDP Air Freight Express
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-6">
              Daily scheduled freighter space from Shenzhen (SZX) and Hong Kong (HKG). Ideal for high-margin consumer goods, consumer electronics, and seasonal stock replenishment.
            </p>
            <div className="space-y-3 mb-8 text-xs sm:text-sm">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">Transit Duration:</span>
                <span className="font-bold text-slate-900 dark:text-white">6–10 Days Door-to-Door</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">Weight Scope:</span>
                <span className="font-bold text-slate-900 dark:text-white">21 kg+ to Multi-Ton Batches</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">Volumetric Divisor:</span>
                <span className="font-bold text-slate-900 dark:text-white">IATA 1:6000 / Courier 1:5000</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Final Mile Courier:</span>
                <span className="font-bold text-blue-600">UPS Express / FedEx Priority / DPD</span>
              </div>
            </div>
            <button
              onClick={() => openQuoteModal({ serviceType: 'DDP Air Express' })}
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm transition-colors"
            >
              Request Air DDP Rate
            </button>
          </div>

          {/* Card 2: Sea DDP */}
          <div className="rounded-2xl border-2 border-emerald-500/40 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-md relative">
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                Cost &amp; Margin Optimization
              </span>
              <Ship className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              DDP Ocean Freight (Fast Liner &amp; LCL)
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-6">
              Consolidated 40HQ container runs and dedicated FCL boxes sailing via Matson CLX, COSCO, and Evergreen. Lowest per-kilogram unit cost for commercial inventory.
            </p>
            <div className="space-y-3 mb-8 text-xs sm:text-sm">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">Transit Duration:</span>
                <span className="font-bold text-slate-900 dark:text-white">20–35 Days Door-to-Door</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">Volume Scope:</span>
                <span className="font-bold text-slate-900 dark:text-white">1 CBM to Multiple Full Containers</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">Demurrage Protection:</span>
                <span className="font-bold text-slate-900 dark:text-white">14–21 Days Contracted Free Time</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Final Mile Drayage:</span>
                <span className="font-bold text-emerald-600">Palletized Liftgate Truck / FBA Drayage</span>
              </div>
            </div>
            <button
              onClick={() => openQuoteModal({ serviceType: 'DDP Sea Freight' })}
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm transition-colors"
            >
              Request Ocean DDP Rate
            </button>
          </div>
        </div>
      </section>

      {/* 3. STEP-BY-STEP DDP SOP */}
      <section className="py-16 bg-slate-100 dark:bg-slate-900/50 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              How Our 5-Stage DDP Process Operates
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
              From factory collection in China to tailgate offloading at your warehouse dock.
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-6">
            {ddpSteps.map((step) => (
              <div
                key={step.num}
                className="rounded-xl bg-white dark:bg-slate-900 p-5 border border-slate-200 dark:border-slate-800 flex flex-col justify-between shadow-sm"
              >
                <div>
                  <div className="text-3xl font-extrabold text-blue-600 dark:text-blue-400 mb-2">
                    {step.num}
                  </div>
                  <div className="text-xs font-semibold text-slate-400 mb-1">{step.timeline}</div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2 leading-snug">
                    {step.title}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. WHO IT IS FOR & BENEFITS */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-6">
              Engineered for High-Growth Importers &amp; E-Commerce Brands
            </h2>
            <div className="space-y-4 text-sm text-slate-600 dark:text-slate-300">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 dark:text-white">Amazon FBA &amp; 3PL Sellers:</strong>
                  <span> Full compliance with carton dimensions, FNSKU barcode labeling, pallet height limits, and carrier appointment booking via CARP.</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 dark:text-white">Importers Without Overseas Entities:</strong>
                  <span> No need to incorporate in the US, Europe, or UK. JCD acts as your legal Importer of Record.</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 dark:text-white">Suppliers Across Multiple Chinese Cities:</strong>
                  <span> Ship from 5 different suppliers in Shenzhen, Yiwu, and Ningbo into our central Bao’an warehouse. We consolidate into a single shipment to avoid duplicate customs fees.</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 dark:text-white">Zero Hidden Port Surcharges:</strong>
                  <span> Protect yourself from demurrage, chassis splits, pier pass fees, and broker documentation penalties.</span>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-gradient-to-br from-blue-900 to-slate-900 text-white p-8 border border-blue-800 shadow-xl">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <ShieldCheck className="h-6 w-6 text-blue-400" />
              <span>JCD DDP All-Inclusive Guarantee</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mb-6 leading-relaxed">
              When you accept a JCD DDP quote, the rate you see is the exact landed cost you pay. Our NVOCC license (GD20240307220907) and bonded customs broker contracts back every consignment.
            </p>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                <div className="font-bold text-blue-300">Free Origin Consolidation</div>
                <div className="text-slate-400 mt-0.5">7 days free storage at Bao’an</div>
              </div>
              <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                <div className="font-bold text-emerald-300">Pre-Shipment Photo Audit</div>
                <div className="text-slate-400 mt-0.5">Carton &amp; label proof provided</div>
              </div>
              <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                <div className="font-bold text-amber-300">2-Hour Quote Turnaround</div>
                <div className="text-slate-400 mt-0.5">Guaranteed binding rate response</div>
              </div>
              <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                <div className="font-bold text-sky-300">24/7 Telemetry Sync</div>
                <div className="text-slate-400 mt-0.5">Automated milestone dispatch</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FAQS */}
      <section className="py-16 bg-slate-100 dark:bg-slate-900/40 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-2">
              Frequently Asked Questions on DDP Shipping
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm">
              Clear answers to customs, duties, Amazon FBA, and delivery terms.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between p-4 text-left font-semibold text-xs sm:text-sm text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`h-4 w-4 text-slate-400 transition-transform ${
                      openFaq === idx ? 'rotate-180 text-blue-600' : ''
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-4 pb-4 text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/60 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. BOTTOM CTA */}
      <section className="py-16 bg-slate-900 text-white text-center px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-4xl font-bold mb-4">
            Ready to Streamline Your China Sourcing with DDP?
          </h2>
          <p className="text-slate-400 text-sm mb-8">
            Tell us your pickup city in China and final destination. Receive a transparent, all-inclusive landed quote within 2 hours.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => openQuoteModal({ serviceType: 'DDP General Inquiry' })}
              className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 font-bold text-sm shadow-lg shadow-blue-600/30 transition-all"
            >
              Request DDP Quotation
            </button>
            <Link
              href="/tools/volumetric-weight-calculator"
              className="px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 font-bold text-sm text-slate-200 transition-colors"
            >
              Calculate CBM &amp; Volumetric Weight
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
