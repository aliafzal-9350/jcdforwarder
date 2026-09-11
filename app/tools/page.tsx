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
  FileCheck,
  Search,
  FileText,
  ClipboardList,
  Compass,
  Plane,
  Anchor,
  ArrowRight,
  Sparkles,
  ChevronRight,
  MessageCircle,
  Calculator,
  ShieldCheck,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Interactive Logistics Calculators & Web Tools | JCD Forwarder',
  description:
    'Free professional shipping calculators for Amazon sellers and global importers: 3D Container Loading Simulator, Volumetric Weight Calculator, and Incoterms 2020 Decision Wizard.',
  keywords: [
    'shipping calculators',
    '3d container packing calculator',
    'volumetric weight calculator',
    'cbm calculator',
    'incoterms 2020 selector',
    'air freight chargeable weight',
    'jcd forwarder tools',
  ],
  alternates: {
    canonical: 'https://jcdforwarder.com/tools',
  },
  openGraph: {
    title: 'Interactive Logistics Calculators & Web Tools | JCD Forwarder',
    description:
      'Free professional shipping calculators for Amazon sellers and global importers: 3D Container Loading Simulator, Volumetric Weight Calculator, and Incoterms 2020 Decision Wizard.',
    url: 'https://jcdforwarder.com/tools',
    siteName: 'JCD Forwarder',
    type: 'website',
  },
};

const LOGISTICS_TOOLS = [
  {
    id: 'container-loading-calculator',
    title: '3D Container Loading Planner',
    badge: 'Interactive 3D Engine',
    badgeColor: 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300',
    icon: Box,
    iconColor: 'text-blue-600 dark:text-blue-400',
    description:
      'Interactive Three.js 3D container packing simulator for 20GP, 40GP, 40HQ, and 45HQ. Computes exact volume fill percentage, payload limits, and dead space.',
    features: ['Real-time 3D orbit visualization', 'Metric (cm/kg) & Imperial (in/lbs)', '1-Click WhatsApp booking trigger'],
    href: '/tools/container-loading-calculator',
    isAvailable: true,
  },
  {
    id: 'volumetric-calculator',
    title: 'Volumetric Weight Calculator',
    badge: 'IATA Standard Ratios',
    badgeColor: 'bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300',
    icon: Scale,
    iconColor: 'text-sky-600 dark:text-sky-400',
    description:
      'Calculate Gross Weight vs. Volumetric Chargeable Weight across Air Freight (6000), Express Courier (5000), and Ocean LCL (CBM) side-by-side.',
    features: ['Multi-carton line item breakdown', 'Instant chargeable weight determination', 'Density surcharge indicators'],
    href: '/tools/volumetric-calculator',
    isAvailable: true,
  },
  {
    id: 'incoterms-selector',
    title: 'Incoterms 2020 Decision Selector',
    badge: 'ICC Compliance Guide',
    badgeColor: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300',
    icon: FileCheck,
    iconColor: 'text-emerald-600 dark:text-emerald-400',
    description:
      'Interactive decision questionnaire comparing EXW, FOB, CIF, DDU, and DDP. Detailed seller vs buyer risk matrices and Amazon FBA recommendations.',
    features: ['3-Step interactive recommendation quiz', 'Complete supply chain responsibility matrix', 'Amazon FBA DDP rationale'],
    href: '/tools/incoterms-selector',
    isAvailable: true,
  },
  {
    id: 'hs-code-finder',
    title: 'China HS Code & Duty Finder',
    badge: 'Customs Tariffs',
    badgeColor: 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300',
    icon: Search,
    iconColor: 'text-purple-600 dark:text-purple-400',
    description:
      'Search China export HS codes, destination import tariffs, Section 301 duties, and European VAT rates for accurate landed cost budgeting.',
    features: ['6-digit & 8-digit HS lookup', 'Destination duty calculations', 'Export rebate rate guidance'],
    href: '/tools#hs-code',
    isAvailable: false,
    comingSoonNote: 'Integrated in Route Pages',
  },
  {
    id: 'proforma-invoice-generator',
    title: 'Proforma Invoice (PI) Generator',
    badge: 'Trade Documentation',
    badgeColor: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300',
    icon: FileText,
    iconColor: 'text-amber-600 dark:text-amber-400',
    description:
      'Client-side form generating standardized, compliant commercial Proforma Invoices with customs valuations, Incoterms, and payment terms in PDF.',
    features: ['Multi-currency support', 'Compliant customs formatting', 'Instant PDF export'],
    href: '/tools#pi-gen',
    isAvailable: false,
    comingSoonNote: 'Client Utility Module',
  },
  {
    id: 'packing-list-generator',
    title: 'Packing List (PL) Generator',
    badge: 'Warehouse Operations',
    badgeColor: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300',
    icon: ClipboardList,
    iconColor: 'text-indigo-600 dark:text-indigo-400',
    description:
      'Automatic carton breakdown and weight distribution sheet exporter for seamless Chinese export customs clearance and overseas warehouse receiving.',
    features: ['Carton number sequencing', 'Gross & net weight aggregation', 'FNSKU labeling manifest'],
    href: '/tools#pl-gen',
    isAvailable: false,
    comingSoonNote: 'Client Utility Module',
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
              <Badge className="bg-blue-600 text-white font-semibold">100% Free Tools</Badge>
              <Badge variant="outline" className="border-slate-700 text-slate-300">
                Grounded in Verified Maritime & Aviation Standards
              </Badge>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
              Interactive Freight Calculators & Logistics Utilities
            </h1>
            <p className="text-slate-300 text-sm sm:text-base mt-3 max-w-3xl leading-relaxed">
              Engineered for Amazon FBA merchants, e-commerce brand owners, and global procurement teams. Simulate container
              stuffing in 3D, calculate chargeable weight across multiple carriers, and determine legal risk under Incoterms 2020.
            </p>
          </div>
        </section>

        {/* Tools Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {LOGISTICS_TOOLS.map((tool) => {
              const ToolIcon = tool.icon;
              return (
                <Card
                  key={tool.id}
                  className="flex flex-col justify-between border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all group"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-11 h-11 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                        <ToolIcon className={`w-6 h-6 ${tool.iconColor}`} />
                      </div>
                      <Badge className={tool.badgeColor}>{tool.badge}</Badge>
                    </div>
                    <CardTitle className="text-lg font-bold group-hover:text-blue-600 transition-colors">
                      {tool.title}
                    </CardTitle>
                    <CardDescription className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mt-1">
                      {tool.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4 pt-1 flex-grow flex flex-col justify-between text-xs">
                    <ul className="space-y-1.5 border-t border-slate-100 dark:border-slate-800 pt-3">
                      {tool.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-1.5 text-slate-600 dark:text-slate-400">
                          <Sparkles className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="pt-3">
                      {tool.isAvailable ? (
                        <Link
                          href={tool.href}
                          className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2.5 transition-colors shadow-sm"
                        >
                          Launch Utility
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      ) : (
                        <div className="w-full py-2.5 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400 text-center font-medium flex items-center justify-center gap-1.5">
                          <span>{tool.comingSoonNote || 'Coming Soon'}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Bottom Support Callout */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <div className="rounded-2xl bg-gradient-to-r from-blue-900 to-indigo-950 text-white p-8 sm:p-10 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center sm:text-left">
              <h2 className="text-xl sm:text-2xl font-bold">
                Need Custom Container Packing Optimization?
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
                Send your commercial packing list directly to our Shenzhen warehouse operations team. We will calculate the
                optimal container load distribution and provide an all-inclusive DDP quote.
              </p>
            </div>
            <a
              href={getWhatsAppUrl('Hello David! I need custom packing optimization and a DDP freight quote for my cargo.')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-6 py-3.5 shadow-lg shadow-emerald-950/30 transition-transform hover:scale-105 shrink-0"
            >
              <MessageCircle className="w-5 h-5" />
              Chat on WhatsApp (+86 137 2424 6674)
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
