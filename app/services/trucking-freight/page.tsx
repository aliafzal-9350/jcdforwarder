import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { SITE_CONFIG, getWhatsAppUrl } from "@/data/siteConfig";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  Truck,
  ShieldCheck,
  Zap,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  MessageCircle,
  FileText,
  Building2,
  Scale,
  MapPin,
  Compass,
  Layers,
  PhoneCall,
  Boxes,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Cross-Border & Domestic Trucking Freight | China Inland & International Linehaul",
  description:
    "Authoritative trucking freight solutions by JCD Forwarder: China nationwide factory pickups, bonded customs cartage, cross-border China-Europe linehaul (TIR), China-ASEAN road transport, and destination drayage.",
  openGraph: {
    title: "International & Inland Trucking Freight | JCD Forwarder NVOCC",
    description:
      "GPS-monitored fleet, bonded truck transit, China-Europe TIR road freight, and first-mile/last-mile container drayage. Verified NVOCC License GD20240307220907.",
  },
};

export default function TruckingFreightPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Trucking Freight, Cross-Border Road Transport, TIR Linehaul, Container Drayage",
    name: "Trucking Freight & Linehaul Logistics",
    description:
      "Comprehensive trucking services including first-mile factory collection across China, bonded customs shuttle transfer, cross-border TIR trucking to Central Asia and Europe, and final-mile port drayage.",
    provider: {
      "@type": "FreightForwarder",
      name: SITE_CONFIG.credentials.legalNameEn,
      url: SITE_CONFIG.url,
      telephone: SITE_CONFIG.contact.phone,
    },
  };

  const truckingModes = [
    {
      title: "FTL (Full Truckload) Linehaul",
      description: "Dedicated 9.6m, 13m, and 17.5m dry vans and refrigerated box trucks for large-volume industrial cargo without intermediate transfers.",
      idealFor: "High-value electronics, factory direct runs, machinery, bulk palletized consignments.",
      leadTime: "Direct dispatch within 2-4 hours of order confirmation across Guangdong, Zhejiang, and Jiangsu.",
    },
    {
      title: "LTL (Less than Truckload) Consolidation",
      description: "Cost-optimized scheduled trucking consolidating multiple supplier consignments into our centralized hubs in Shenzhen, Yiwu, or Ningbo.",
      idealFor: "Multi-supplier orders, sample runs, cartons under 10 CBM requiring consolidation.",
      leadTime: "Daily hub departures with barcode-scanned sorting and cross-docking.",
    },
    {
      title: "Cross-Border TIR Road Transport (China-Europe / Central Asia)",
      description: "Fast surface freight alternative to air and sea via the Alashankou / Khorgos border crossings, operating under TIR carnet conventions.",
      idealFor: "Time-critical industrial components, lithium batteries prohibited on certain aircraft, and trade fair shipments.",
      leadTime: "12-16 calendar days from Shenzhen/Urumqi to Poland, Germany, or Kazakhstan.",
    },
    {
      title: "Port & Rail Terminal Container Drayage",
      description: "Heavy-duty tractor units certified for 20GP, 40GP, and 40HQ container haulage between manufacturing plants and major maritime terminals.",
      idealFor: "FCL sea freight export loading, bonded CFS drayage, and empty container repositioning.",
      leadTime: "Pre-booked gate-in appointment execution with zero demurrage demurrage guarantees.",
    },
  ];

  const truckingCorridors = [
    {
      name: "Pearl River Delta Factory Express",
      route: "Dongguan / Huizhou / Foshan / Zhongshan → Shenzhen & Guangzhou CFS",
      transit: "Same-Day / Next-Morning (4 - 12 hours)",
      vehicles: "5t, 8t, 10t box vans & hydraulic tail-lift trucks",
      features: "Bonded customs supervision codes, electronic seals, door pickup at factory loading bay.",
    },
    {
      name: "Yangtze River Delta Linehaul",
      route: "Suzhou / Kunshan / Hangzhou / Wuxi → Shanghai (PVG/Yangshan) & Ningbo Port",
      transit: "12 - 24 hours",
      vehicles: "9.6m & 13.5m wing-open trucks, standard container chassis",
      features: "Direct terminal pre-gate authorization, integrated weighbridge reporting.",
    },
    {
      name: "China-Europe International TIR Highway",
      route: "Shenzhen / Xi'an / Urumqi → Khorgos (Border) → Kazakhstan → Russia / Belarus → Poland / Germany",
      transit: "14 - 18 calendar days door-to-door",
      vehicles: "Dual-driver air-suspension thermo-regulated GPS mega-trailers",
      features: "Customs transit seals, non-stop border transit without cargo transshipment, ADR dangerous goods certified.",
    },
    {
      name: "China-ASEAN Cross-Border Corridor",
      route: "Shenzhen / Nanning → Pingxiang (Friendship Pass) → Hanoi / Bangkok",
      transit: "3 - 5 days door-to-door",
      vehicles: "Cross-border licensed refrigerated and dry container trucks",
      features: "Bilingual border dispatchers, customs clearance at border economic zones.",
    },
  ];

  const operatingSOP = [
    {
      step: "01",
      title: "Supplier Verification & Dispatch",
      description: "Our logistics desk confirms carton count, gross weight, pallet dimensions, and factory loading dock availability. The closest regional fleet unit is dispatched with customized equipment (tail-lift or side-curtain).",
    },
    {
      step: "02",
      title: "On-Site Tally & Condition Reporting",
      description: "Drivers inspect carton integrity, apply security seals, photograph outer packaging, and countersign the factory delivery receipt (送货单) before vehicle departure.",
    },
    {
      step: "03",
      title: "GPS-Tracked Transit & Bonded Customs",
      description: "Real-time telematics monitor vehicle speed, internal temperature (for cold-chain units), and route adherence. For bonded cargo, electronic customs locks ensure tamper-proof transit.",
    },
    {
      step: "04",
      title: "Hub Consolidation or Port Gate-In",
      description: "Cargo is received at JCD's consolidation warehouse for secondary palletizing or delivered directly to the designated maritime container freight station (CFS) or rail terminal.",
    },
  ];

  const requiredDocuments = [
    { name: "Factory Delivery Note (送货单)", description: "Itemized count of cartons, gross weight, and factory contact sign-off." },
    { name: "Commercial Invoice & Packing List", description: "Mandatory for customs-bonded transfers and cross-border TIR linehaul." },
    { name: "Customs Declaration (报关单)", description: "Required when moving export cargo under formal customs supervision." },
    { name: "Dangerous Goods Certification (if applicable)", description: "MSDS and UN38.3 test summaries for lithium batteries or chemical road transport." },
  ];

  const faqs = [
    {
      question: "What is the difference between FTL and LTL trucking?",
      answer: "FTL (Full Truckload) dedicates an entire vehicle exclusively to your cargo, offering point-to-point non-stop transport with maximum security and no intermediate handling. LTL (Less than Truckload) shares vehicle space among multiple shippers, significantly reducing costs for shipments between 1 and 10 CBM.",
    },
    {
      question: "How does the China-Europe TIR road freight compare to rail and air?",
      answer: "TIR trucking from China to Europe takes approximately 14 to 18 days door-to-door. It is roughly twice as fast as rail freight and up to 60% less expensive than air cargo. It is especially suited for high-value electronics and pure batteries that face restrictive air carrier quotas.",
    },
    {
      question: "Can JCD Forwarder handle factory pickups from remote inland provinces?",
      answer: "Yes. In addition to core manufacturing provinces like Guangdong, Zhejiang, and Jiangsu, our integrated partner network covers Sichuan, Hubei, Henan, Shandong, and Hebei with guaranteed 24-to-48 hour pickup dispatch.",
    },
    {
      question: "Are your trucks equipped with hydraulic tail-lifts for factories without loading docks?",
      answer: "Yes. When booking your pickup, simply inform our dispatch desk that the pickup facility lacks a raised loading dock. We will deploy a hydraulic tail-lift vehicle equipped with pallet jacks.",
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
            <span className="text-slate-300">Trucking Freight</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-semibold">
                <Truck className="h-3.5 w-3.5 text-blue-400" />
                <span>Nationwide China Cartage &amp; International TIR Linehaul</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Flexible Inland Cartage &amp; Cross-Border Trucking Freight
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                Bridge factory floors to international departure gates. JCD Forwarder operates reliable factory pickup fleets, customs-bonded container drayage, and trans-continental TIR road freight connecting China directly to Europe, Central Asia, and Southeast Asia.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <a
                  href={getWhatsAppUrl("Hello JCD Trucking Desk, I need a quotation for inland factory collection and cartage.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-900/30 transition-all"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Request Trucking Quote</span>
                </a>

                <Link
                  href="/tools/volumetric-calculator"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm border border-slate-700 transition-all"
                >
                  <Scale className="h-4 w-4 text-blue-400" />
                  <span>Calculate CBM &amp; Weight</span>
                </Link>
              </div>

              {/* Verified Trust Stats */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-800/80">
                <div>
                  <div className="text-2xl font-black text-white">2 - 4 Hrs</div>
                  <div className="text-xs text-slate-400">PRD Dispatch Response</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-blue-400">100% GPS</div>
                  <div className="text-xs text-slate-400">Real-Time Telematics</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-emerald-400">TIR Carnet</div>
                  <div className="text-xs text-slate-400">Bonded Transit Certified</div>
                </div>
              </div>
            </div>

            {/* Quick Dispatch Card */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl bg-slate-800/80 border border-slate-700 p-6 sm:p-8 backdrop-blur shadow-2xl">
                <div className="flex items-center justify-between pb-4 border-b border-slate-700 mb-6">
                  <div>
                    <h3 className="text-base font-bold text-white">Trucking Dispatch Desk</h3>
                    <p className="text-xs text-slate-400">Instant factory collection inquiry</p>
                  </div>
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-blue-500/20 text-blue-300">
                    Active Fleet
                  </span>
                </div>

                <div className="space-y-4 text-xs">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                    <span className="text-slate-400">Fleet Coverage:</span>
                    <span className="font-semibold text-slate-200">Guangdong, Zhejiang, Jiangsu, Fujian, Inland</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                    <span className="text-slate-400">Vehicle Types:</span>
                    <span className="font-semibold text-slate-200">2t, 5t, 8t, 10t, 9.6m, 13m, 17.5m, Chassis</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                    <span className="text-slate-400">Customs Clearance:</span>
                    <span className="font-semibold text-emerald-400">Bonded Cartage &amp; Electronic Seal</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                    <span className="text-slate-400">Security Guarantee:</span>
                    <span className="font-semibold text-slate-200">Comprehensive Cargo Transit Insurance</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-700">
                  <a
                    href={`tel:${SITE_CONFIG.contact.phone}`}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-colors"
                  >
                    <PhoneCall className="h-3.5 w-3.5" />
                    <span>Call Hotline: {SITE_CONFIG.contact.phoneDisplay}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CORE TRUCKING MODES */}
      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <h2 className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2">
              Comprehensive Ground Solutions
            </h2>
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Tailored Road Freight Across Every Phase of the Supply Chain
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
              From localized single-pallet pickups to international cross-border convoys, our dispatch network matches vehicle configuration to your specific cargo dimensions and urgency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {truckingModes.map((mode, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 hover:border-blue-500/50 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      {mode.title}
                    </h3>
                    <span className="h-8 w-8 rounded-lg bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs font-bold">
                      0{idx + 1}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
                    {mode.description}
                  </p>
                </div>

                <div className="space-y-2 pt-4 border-t border-slate-200/80 dark:border-slate-700 text-xs">
                  <div>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">Ideal For: </span>
                    <span className="text-slate-600 dark:text-slate-400">{mode.idealFor}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">Dispatch Standard: </span>
                    <span className="text-blue-600 dark:text-blue-400 font-medium">{mode.leadTime}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. KEY TRUCKING CORRIDORS */}
      <section className="py-16 bg-slate-50 dark:bg-slate-950 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <h2 className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2">
              Strategic Transport Corridors
            </h2>
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Connecting Industrial Clusters to Gateways &amp; World Markets
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {truckingCorridors.map((corridor, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm"
              >
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="h-4 w-4 text-red-500" />
                  <h3 className="font-bold text-base text-slate-900 dark:text-white">
                    {corridor.name}
                  </h3>
                </div>
                <div className="text-xs font-mono text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 p-2 rounded-lg mb-4">
                  {corridor.route}
                </div>

                <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                  <div className="flex justify-between">
                    <span className="font-semibold">Transit Time:</span>
                    <span className="font-bold text-slate-900 dark:text-white">{corridor.transit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Vehicles:</span>
                    <span>{corridor.vehicles}</span>
                  </div>
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-slate-500 dark:text-slate-400">
                    {corridor.features}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. STEP-BY-STEP OPERATING SOP */}
      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2">
              Operational Rigor
            </h2>
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              The 4-Stage JCD Road Transport Protocol
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

      {/* 5. DOCUMENTATION & COMPLIANCE */}
      <section className="py-16 bg-slate-50 dark:bg-slate-950 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Regulatory Compliance
              </h2>
              <p className="text-2xl font-extrabold text-slate-900 dark:text-white">
                Trucking Documentation &amp; Customs Gate Requirements
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Smooth highway transit and rapid bonded gate clearance depend on accurate documentation. Our logistics team handles compliance verification prior to driver dispatch.
              </p>
              <div className="pt-2">
                <Link
                  href="/tools/proforma-invoice-generator"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
                >
                  <FileText className="h-3.5 w-3.5" />
                  <span>Generate Shipping Documents with JCD Tools &rarr;</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {requiredDocuments.map((doc, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-2 mb-1.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                    <h3 className="font-bold text-xs text-slate-900 dark:text-white">{doc.name}</h3>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 pl-6">{doc.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. FAQ SECTION */}
      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2">
              Common Inquiries
            </h2>
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Trucking &amp; Road Freight FAQs
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60"
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

      {/* 7. FINAL CTA */}
      <section className="py-16 bg-slate-900 border-t border-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold">
            Ready to Schedule Your Factory Pickup or Linehaul?
          </h2>
          <p className="text-sm text-blue-200 max-w-2xl mx-auto">
            Contact our 24/7 road logistics dispatch desk. Provide your factory location and cargo dimensions for immediate rate confirmation and equipment reservation.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <a
              href={getWhatsAppUrl("Hello JCD Dispatch, I want to book trucking services for my cargo.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-sm shadow-lg transition-all"
            >
              <MessageCircle className="h-4 w-4" />
              <span>Message WhatsApp Dispatch</span>
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 transition-all"
            >
              <span>Contact Operations Desk</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
