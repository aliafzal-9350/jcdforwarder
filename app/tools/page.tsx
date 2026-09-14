import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  JsonLd,
  createBreadcrumbSchema,
  createSoftwareApplicationSchema,
} from '@/components/seo/JsonLd';
import { SITE_CONFIG, getWhatsAppUrl } from '@/data/siteConfig';
import {
  Box,
  Scale,
  Search,
  FileText,
  ClipboardList,
  Compass,
  Plane,
  Anchor,
  ArrowRight,
  ChevronRight,
  MessageCircle,
  Calculator,
  ShieldCheck,
  Ruler,
  Clock,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Interactive Logistics Calculators & Freight Web Tools | JCD Forwarder',
  description:
    'Complete suite of 10 fully functional international logistics tools: 3D Container Loading Simulator, Volumetric Weight Calculator, Express Courier Tracking, Flight Route Calculator, Unit Converter, China HS Code Finder, Proforma Invoice Generator, Packing List Exporter, Seaports Directory, and Incoterms 2020 Decision Engine.',
  keywords: [
    'shipping calculators',
    '3d container packing calculator',
    'volumetric weight calculator',
    'courier tracking',
    'flight transit time calculator',
    'china hs code finder',
    'proforma invoice generator',
    'packing list generator',
    'seaports un locode',
    'incoterms 2020 comparison',
  ],
  alternates: {
    canonical: 'https://jcdforwarder.com/tools',
  },
  openGraph: {
    title: 'Interactive Logistics Calculators & Freight Web Tools | JCD Forwarder',
    description:
      'Ten fully functional international logistics calculators, generators, and tracking tools for global importers and freight professionals.',
    url: 'https://jcdforwarder.com/tools',
    siteName: 'JCD Forwarder',
    type: 'website',
  },
};

const LOGISTICS_TOOLS = [
  {
    id: 'volumetric-calculator',
    title: 'Volumetric Weight Calculator',
    badge: 'Billing Weight Guide',
    badgeColor: 'bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300',
    icon: Scale,
    iconColor: 'text-sky-600 dark:text-sky-400',
    description:
      'Compare Actual Weight vs. Space-Based Volumetric Weight for Air Freight, Express Courier, and Ocean LCL. Avoid surprise shipping charges.',
    features: ['Multi-carton dimension breakdown', 'Instant chargeable weight determination', '1-Click summary copy for suppliers'],
    href: '/tools/volumetric-calculator',
  },
  {
    id: 'tracking',
    title: 'Cargo & Express Tracking',
    badge: 'Real-Time Tracking',
    badgeColor: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300',
    icon: Search,
    iconColor: 'text-emerald-600 dark:text-emerald-400',
    description:
      'Track international express courier packages (UPS, FedEx, DHL) and JCD air waybills from China warehouse departure to final destination delivery.',
    features: ['Auto-carrier recognition (UPS, FedEx, DHL)', 'Step-by-step milestone timeline', '1-Click official carrier portal link'],
    href: '/tools/tracking',
  },
  {
    id: 'container-loading-calculator',
    title: '3D Container Loading Planner',
    badge: 'Interactive 3D Planner',
    badgeColor: 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300',
    icon: Box,
    iconColor: 'text-blue-600 dark:text-blue-400',
    description:
      'Interactive 3D container packing simulator for 20ft, 40ft, 40HQ, and 45HQ containers. Computes exact carton capacity, volume fill percentage, and weight limits.',
    features: ['Interactive 3D container visualization', 'Popular carton presets (Amazon FBA, etc.)', 'Max carton estimation & plan copy'],
    href: '/tools/container-loading-calculator',
  },
  {
    id: 'flight-route-calculator',
    title: 'Flight Route & Transit Calculator',
    badge: 'Air Cargo Schedules',
    badgeColor: 'bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300',
    icon: Plane,
    iconColor: 'text-sky-600 dark:text-sky-400',
    description:
      'Calculate direct flight routes, air distances, airborne flight hours, and door-to-door Air DDP transit schedules from China to worldwide international airports.',
    features: ['Flight distance in km & nautical miles', 'Actual airplane cruising time', 'Stage-by-stage door-to-door transit schedule'],
    href: '/tools/flight-route-calculator',
  },
  {
    id: 'shipping-unit-converter',
    title: 'Shipping Unit Converter',
    badge: 'Instant Conversion',
    badgeColor: 'bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300',
    icon: Ruler,
    iconColor: 'text-teal-600 dark:text-teal-400',
    description:
      'Instantly convert international shipping units: kg and lbs for weight; cm, meters, inches, and feet for dimensions; and CBM and CFT for volume.',
    features: ['Instant dual-direction recalculation', 'Carton box dimensions to CBM calculator', 'Popular carton presets & 1-click copy'],
    href: '/tools/shipping-unit-converter',
  },
  {
    id: 'china-hs-code',
    title: 'China HS Code & Tariff Finder',
    badge: 'Customs & Tariffs',
    badgeColor: 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300',
    icon: ShieldCheck,
    iconColor: 'text-purple-600 dark:text-purple-400',
    description:
      'Look up official China export HS codes, customs duty rates, export VAT rebate percentages, and export supervision rules for popular imported products.',
    features: ['Search by product name or 6-10 digit code', 'Export VAT tax rebate information', 'Plain English guide for new importers'],
    href: '/tools/china-hs-code',
  },
  {
    id: 'proforma-invoice-generator',
    title: 'Proforma Invoice (PI) Generator',
    badge: 'Trade Documentation',
    badgeColor: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300',
    icon: FileText,
    iconColor: 'text-amber-600 dark:text-amber-400',
    description:
      'Create clean commercial Proforma Invoices with automated subtotal calculation, freight apportionment, Incoterms, and printable A4 PDF export.',
    features: ['Multi-currency support (USD, EUR, GBP, CNY)', 'Incoterm & Chinese loading port helpers', 'Downloadable / printable PDF document'],
    href: '/tools/proforma-invoice-generator',
  },
  {
    id: 'packing-list-generator',
    title: 'Packing List (PL) Generator',
    badge: 'Customs Manifests',
    badgeColor: 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300',
    icon: ClipboardList,
    iconColor: 'text-rose-600 dark:text-rose-400',
    description:
      'Generate export packing lists with automatic carton sequencing, gross vs. net weight tallying, and total CBM volumetric calculation for customs manifests.',
    features: ['Auto-sequence carton numbers', 'Dual unit totals (kg/lbs and CBM/CFT)', 'Printable A4 PDF cargo manifest'],
    href: '/tools/packing-list-generator',
  },
  {
    id: 'seaports',
    title: 'World Seaports Directory',
    badge: 'UN/LOCODE Maritime',
    badgeColor: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-950 dark:text-cyan-300',
    icon: Anchor,
    iconColor: 'text-cyan-600 dark:text-cyan-400',
    description:
      'Search 9,000+ global container terminals, verified UN/LOCODE identifiers, live local times, pier drafts, and crane facilities for ocean freight.',
    features: ['9,000+ global port records & UN/LOCODEs', 'Commercial importer readiness snapshot', 'Interactive 3D globe & vector map'],
    href: '/tools/seaports',
  },
  {
    id: 'incoterms',
    title: 'Incoterms 2020 Decision Guide',
    badge: 'Buyer Decision Guide',
    badgeColor: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300',
    icon: Compass,
    iconColor: 'text-emerald-600 dark:text-emerald-400',
    description:
      'Interactive buyer decision matrix covering all 11 Incoterms 2020 (DDP, FOB, EXW, CIF, DAP, etc.) with side-by-side cost and risk comparisons.',
    features: ['Which Incoterm Should You Choose finder', 'Color-coded Seller vs Buyer responsibility', 'Side-by-side comparison text copy'],
    href: '/tools/incoterms',
  },
];

export default function ToolsDirectoryPage() {
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: 'Home', url: 'https://jcdforwarder.com' },
    { name: 'Logistics Tools', url: 'https://jcdforwarder.com/tools' },
  ]);

  const softwareSchema = createSoftwareApplicationSchema(
    LOGISTICS_TOOLS.map((tool) => ({
      name: tool.title,
      description: tool.description,
      url: `https://jcdforwarder.com${tool.href}`,
    }))
  );

  return (
    <>
      <JsonLd schema={breadcrumbSchema} />
      <JsonLd schema={softwareSchema} />

      <main className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 pb-20">
        {/* Top Breadcrumb */}
        <div className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 text-xs text-slate-500">
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5">
              <Link href="/" className="hover:text-blue-600 transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="font-medium text-slate-800 dark:text-slate-200">
                Logistics Web Utilities
              </span>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <section className="bg-slate-900 text-white py-14 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <Badge className="bg-blue-600 text-white font-semibold">10 Working Logistics Tools</Badge>
              <Badge variant="outline" className="border-slate-700 text-slate-300">
                Calculators • Telematics • PDF Generators • Customs Lookups
              </Badge>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Enterprise Freight Forwarding &amp; Logistics Tools
            </h1>
            <p className="text-slate-300 text-sm sm:text-base mt-2 max-w-3xl leading-relaxed">
              Every tool is engineered with real mathematical formulas, live datasets, and compliant trade documents. Compute container loading in 3D, verify chargeable weights, track shipments, and export commercial customs documentation.
            </p>
          </div>
        </section>

        {/* 10 Tools Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {LOGISTICS_TOOLS.map((tool) => {
              const Icon = tool.icon;
              return (
                <Card
                  key={tool.id}
                  className="rounded-2xl border-slate-200 dark:border-slate-800 hover:border-blue-500/50 hover:shadow-xl transition-all flex flex-col justify-between group"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 group-hover:scale-105 transition-transform">
                        <Icon className={`w-5 h-5 ${tool.iconColor}`} />
                      </div>
                      <Badge className={`text-[11px] font-medium ${tool.badgeColor}`}>
                        {tool.badge}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg font-bold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {tool.title}
                    </CardTitle>
                    <CardDescription className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                      {tool.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <ul className="space-y-1.5 mb-6 text-xs text-slate-500 dark:text-slate-400">
                      {tool.features.map((feat, idx) => (
                        <li key={idx} className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>

                    <Link
                      href={tool.href}
                      className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-bold text-xs hover:bg-blue-600 dark:hover:bg-blue-500 hover:text-white dark:hover:text-white transition-all"
                    >
                      <span>Launch Tool</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Dispatch Help Banner */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <div className="rounded-2xl bg-slate-900 border border-slate-800 p-8 text-white flex flex-wrap items-center justify-between gap-6 shadow-xl">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2 text-xs font-semibold text-blue-300">
                <ShieldCheck className="h-4 w-4" />
                <span>NVOCC Licensed Freight Forwarder Desk</span>
              </div>
              <h2 className="text-2xl font-bold">Need Custom Logistics Engineering or Cargo Consolidation?</h2>
              <p className="text-xs sm:text-sm text-blue-200 leading-relaxed">
                Our operations team in Shenzhen coordinates factory pickups, warehouse tally inspections, palletizing, and customs pre-clearance for cargo across China.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href={getWhatsAppUrl("Hello JCD Forwarder, I am using your logistics tools and need a direct rate quote.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-xs shadow-md transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Chat with Operations Desk</span>
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
