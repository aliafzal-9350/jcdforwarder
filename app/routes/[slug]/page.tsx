import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  TARGET_ROUTES,
  getRouteBySlug,
  getAllRouteSlugs,
  type CountryRoute,
} from '@/data/routes';
import { FAQS, type FAQItem } from '@/data/faqs';
import {
  JsonLd,
  createLogisticsServiceSchema,
  createFaqPageSchema,
  createBreadcrumbSchema,
} from '@/components/seo/JsonLd';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Plane,
  Ship,
  Train,
  Zap,
  ShieldCheck,
  Clock,
  Award,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  MessageCircle,
  Mail,
  MapPin,
  Anchor,
  Box,
  Scale,
  FileText,
  Building2,
  ChevronRight,
} from 'lucide-react';

interface RoutePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllRouteSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: RoutePageProps): Promise<Metadata> {
  const { slug } = await params;
  const route = getRouteBySlug(slug);

  if (!route) {
    return {
      title: 'Route Not Found | JCD Forwarder',
      description: 'The requested international freight trade lane could not be located.',
    };
  }

  const title = `Shipping from China to ${route.name} | DDP Freight Rates & Transit Times`;
  const description = `Direct DDP freight forwarding from China to ${route.name}. Air DDP (8-12d), Sea DDP (25-35d), Rail DDP & Express. NVOCC licensed (GD20240307220907). Customs clearance & Amazon FBA delivery included.`;

  return {
    title,
    description,
    keywords: [
      `shipping from china to ${route.name.toLowerCase()}`,
      `freight forwarder china to ${route.name.toLowerCase()}`,
      `air ddp china to ${route.name.toLowerCase()}`,
      `sea freight china to ${route.name.toLowerCase()}`,
      `amazon fba shipping to ${route.name.toLowerCase()}`,
      `customs duty china to ${route.name.toLowerCase()}`,
      `jcd forwarder`,
    ],
    alternates: {
      canonical: `https://jcdforwarder.com/routes/${route.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://jcdforwarder.com/routes/${route.slug}`,
      siteName: 'JCD Forwarder',
      locale: 'en_US',
      type: 'website',
      images: [
        {
          url: 'https://jcdforwarder.com/images/og-route-overview.jpg',
          width: 1200,
          height: 630,
          alt: `Shipping from China to ${route.name} with JCD Forwarder`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function RoutePage({ params }: RoutePageProps) {
  const { slug } = await params;
  const route = getRouteBySlug(slug);

  if (!route) {
    notFound();
  }

  // Filter contextual FAQs for this destination
  const contextualFaqs: FAQItem[] = FAQS.filter((f) => {
    if (f.categoryId === 'amazon-fba' || f.categoryId === 'incoterms') return true;
    if (f.categoryId === 'customs-compliance') {
      if (f.id === 'customs-us-isf-10-2' && route.code !== 'US') return false;
      return true;
    }
    if (f.id === 'pricing-volumetric-divisors-air-express-ocean') return true;
    if (f.id === 'safety-cargo-damage-claims-process') return true;
    return false;
  }).slice(0, 8);

  const logisticsSchema = createLogisticsServiceSchema(route);
  const faqSchema = createFaqPageSchema(contextualFaqs);
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: 'Home', url: 'https://jcdforwarder.com' },
    { name: 'Routes', url: 'https://jcdforwarder.com/routes' },
    { name: `China to ${route.name}`, url: `https://jcdforwarder.com/routes/${route.slug}` },
  ]);

  const whatsappMessage = encodeURIComponent(
    `Hello David! I need a fast DDP freight quote from China to ${route.name}. Cargo details: [Weight/CBM/Product]:`
  );
  const emailSubject = encodeURIComponent(`Inquiry: DDP Freight from China to ${route.name}`);

  return (
    <>
      <JsonLd schema={logisticsSchema} />
      <JsonLd schema={faqSchema} />
      <JsonLd schema={breadcrumbSchema} />

      <main className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
        {/* Top Trust Notification Bar */}
        <div className="bg-slate-900 border-b border-slate-800 text-slate-300 text-xs py-2 px-4">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>
                Verified NVOCC License: <strong>GD20240307220907</strong> | Guangdong Dept. of Transportation
              </span>
            </div>
            <div className="flex items-center gap-4 text-slate-400">
              <span>Alibaba TrustPass: ★ 4.7 / 5.0 (48+ Reviews)</span>
              <span className="hidden sm:inline">•</span>
              <span className="hidden sm:inline">Dispatch SLA: ≤ 2-Hour Average Response</span>
            </div>
          </div>
        </div>

        {/* Breadcrumb Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 text-xs text-slate-500">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 flex-wrap">
            <Link href="/" className="hover:text-blue-600 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <Link href="/routes" className="hover:text-blue-600 transition-colors">
              Trade Lanes
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-medium text-slate-800 dark:text-slate-200">
              China to {route.name}
            </span>
          </nav>
        </div>

        {/* HERO SECTION */}
        <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 text-white py-16 px-4 sm:px-6 lg:px-8">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]" />
          <div className="relative max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-8 space-y-6">
                <div className="flex flex-wrap items-center gap-2.5">
                  <Badge variant="outline" className="bg-blue-950/60 text-blue-300 border-blue-700/50 px-3 py-1">
                    <span className="text-base mr-1.5">{route.flag}</span>
                    {route.region} Destination Hub
                  </Badge>
                  <Badge variant="outline" className="bg-emerald-950/60 text-emerald-300 border-emerald-700/50 px-3 py-1">
                    <ShieldCheck className="w-3.5 h-3.5 mr-1 text-emerald-400" />
                    100% Tax-Included DDP
                  </Badge>
                  <Badge variant="outline" className="bg-amber-950/60 text-amber-300 border-amber-700/50 px-3 py-1">
                    <Building2 className="w-3.5 h-3.5 mr-1 text-amber-400" />
                    Amazon CARP Certified
                  </Badge>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                  Shipping from China to{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-teal-300">
                    {route.name}
                  </span>
                </h1>

                <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
                  End-to-end Delivered Duty Paid (DDP) multimodal logistics engineered for Amazon FBA sellers,
                  commercial importers, and direct retailers. Fast Air DDP, regular ocean consolidation, express
                  railways, and complete destination customs pre-clearance.
                </p>

                {/* Key Metrics Strip */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                  <div className="bg-slate-800/80 rounded-xl p-3.5 border border-slate-700/60">
                    <div className="text-xs text-slate-400">De Minimis Threshold</div>
                    <div className="text-sm sm:text-base font-bold text-sky-400 mt-1 truncate">
                      {route.deMinimisThreshold.split('(')[0]}
                    </div>
                  </div>
                  <div className="bg-slate-800/80 rounded-xl p-3.5 border border-slate-700/60">
                    <div className="text-xs text-slate-400">Fast Air DDP</div>
                    <div className="text-sm sm:text-base font-bold text-emerald-400 mt-1">
                      {route.modes.find((m) => m.type === 'air')?.transitDays.split('(')[0] || '7–12 Days'}
                    </div>
                  </div>
                  <div className="bg-slate-800/80 rounded-xl p-3.5 border border-slate-700/60">
                    <div className="text-xs text-slate-400">Standard Sea DDP</div>
                    <div className="text-sm sm:text-base font-bold text-blue-400 mt-1">
                      {route.modes.find((m) => m.type === 'sea')?.transitDays.split('(')[0] || '25–40 Days'}
                    </div>
                  </div>
                  <div className="bg-slate-800/80 rounded-xl p-3.5 border border-slate-700/60">
                    <div className="text-xs text-slate-400">Duty / VAT Term</div>
                    <div className="text-sm sm:text-base font-bold text-amber-400 mt-1">
                      100% DDP Covered
                    </div>
                  </div>
                </div>

                {/* Direct Action Buttons */}
                <div className="flex flex-wrap gap-4 pt-4">
                  <a
                    href={`https://wa.me/8613724246674?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-6 py-3.5 shadow-lg shadow-emerald-900/30 transition-all hover:scale-[1.02]"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Instant WhatsApp Quote (+86 137 2424 6674)
                  </a>
                  <a
                    href={`mailto:David@JCDforwarder.com?subject=${emailSubject}`}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold px-6 py-3.5 border border-slate-600 transition-colors"
                  >
                    <Mail className="w-5 h-5 text-slate-300" />
                    Email David@JCDforwarder.com
                  </a>
                </div>
              </div>

              {/* Trust Badge Card */}
              <div className="lg:col-span-4 bg-slate-800/90 rounded-2xl p-6 border border-slate-700/80 shadow-2xl backdrop-blur-sm space-y-5">
                <div className="flex items-center justify-between border-b border-slate-700 pb-4">
                  <div className="text-sm font-semibold text-slate-200">Carrier Verification</div>
                  <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/40">
                    Active & Licensed
                  </Badge>
                </div>
                <div className="space-y-3.5 text-xs text-slate-300">
                  <div className="flex items-start gap-3">
                    <Award className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-white">NVOCC Government License:</span>
                      <div className="text-slate-400 font-mono text-[11px] mt-0.5">GD20240307220907</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Building2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-white">HQ & Inspection Center:</span>
                      <div className="text-slate-400 text-[11px] mt-0.5">
                        Building C, Xinhe Community, Bao&apos;an, Shenzhen (500+ m²)
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-white">Operational SLA:</span>
                      <div className="text-slate-400 text-[11px] mt-0.5">
                        ≤ 2-Hour response time | 100.0% on-time dispatch
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-white">Battery & Hazmat Approved:</span>
                      <div className="text-slate-400 text-[11px] mt-0.5">
                        Direct pure battery gateway via HKG & Weihai (UN38.3/MSDS)
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pt-2 border-t border-slate-700">
                  <div className="text-[11px] text-slate-400 text-center">
                    All-risk Institute Cargo Clauses (A) insurance available
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 1: MULTIMODAL TRANSIT OPTIONS */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="mb-10 text-center sm:text-left">
            <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 mb-2">
              Shipping Modes Comparison
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Transit Modes from China to {route.name}
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm mt-1 max-w-2xl">
              Compare speed, origin departure gateways, and billing weight divisors to select the optimal freight mode for your inventory.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {route.modes.map((mode, idx) => {
              const iconMap = {
                air: Plane,
                sea: Ship,
                rail: Train,
                express: Zap,
              };
              const ModeIcon = iconMap[mode.type] || Plane;

              return (
                <Card key={idx} className="flex flex-col justify-between border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950 flex items-center justify-center text-blue-600 dark:text-blue-400">
                        <ModeIcon className="w-5 h-5" />
                      </div>
                      <Badge variant="secondary" className="font-semibold text-xs">
                        {mode.transitDays}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg font-bold">{mode.name}</CardTitle>
                    {mode.seaOrFlightTime && (
                      <CardDescription className="text-xs text-slate-500">
                        Port-to-Port / Flight Run: {mode.seaOrFlightTime}
                      </CardDescription>
                    )}
                  </CardHeader>

                  <CardContent className="space-y-4 text-xs flex-grow">
                    <div>
                      <div className="font-semibold text-slate-700 dark:text-slate-300 mb-1">Origin Sourcing Hubs:</div>
                      <div className="text-slate-600 dark:text-slate-400">
                        {mode.originHubs.join(', ')}
                      </div>
                    </div>

                    <div>
                      <div className="font-semibold text-slate-700 dark:text-slate-300 mb-1">Destination Gateways:</div>
                      <div className="text-slate-600 dark:text-slate-400">
                        {mode.destinationHubs.join(', ')}
                      </div>
                    </div>

                    <div>
                      <div className="font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Key Service Features:</div>
                      <ul className="space-y-1.5">
                        {mode.features.map((feat, fIdx) => (
                          <li key={fIdx} className="flex items-start gap-1.5 text-slate-600 dark:text-slate-400">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                      <div className="inline-block bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2.5 py-1 rounded text-[11px] font-mono">
                        {mode.chargeableWeightRule}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* SECTION 2: PORT & AIRPORT MATRIX */}
        <section className="bg-slate-100/70 dark:bg-slate-900/50 py-16 border-y border-slate-200 dark:border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              {/* Seaports Table */}
              <div className="lg:col-span-6 space-y-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center">
                    <Anchor className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">Ocean Seaport Terminals</h3>
                    <p className="text-xs text-slate-500">Major verified container sea routes</p>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-xs">China Origin Port</TableHead>
                        <TableHead className="text-xs">{route.name} Port</TableHead>
                        <TableHead className="text-xs text-right">Sea Transit</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {route.portPairs.length > 0 ? (
                        route.portPairs.map((pair, idx) => (
                          <TableRow key={idx} className="text-xs">
                            <TableCell className="font-medium">
                              {pair.originPort}
                              <span className="block text-[10px] text-slate-400 font-mono">{pair.originCode}</span>
                            </TableCell>
                            <TableCell>
                              {pair.destinationPort}
                              <span className="block text-[10px] text-slate-400 font-mono">{pair.destinationCode}</span>
                            </TableCell>
                            <TableCell className="text-right font-semibold text-blue-600 dark:text-blue-400">
                              {pair.transitDays}
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={3} className="text-xs text-center text-slate-500 py-4">
                            Served via major regional container gateway feeder services.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>

              {/* Airports Table */}
              <div className="lg:col-span-6 space-y-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-sky-600 text-white flex items-center justify-center">
                    <Plane className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">International Airport Gateways</h3>
                    <p className="text-xs text-slate-500">Scheduled air freighter flight hours</p>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-xs">Departure Airport</TableHead>
                        <TableHead className="text-xs">Arrival Airport</TableHead>
                        <TableHead className="text-xs text-right">Flight Hours</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {route.airportPairs.length > 0 ? (
                        route.airportPairs.map((pair, idx) => (
                          <TableRow key={idx} className="text-xs">
                            <TableCell className="font-medium">
                              {pair.originAirport}
                              <span className="block text-[10px] text-slate-400 font-mono">[{pair.originIata}]</span>
                            </TableCell>
                            <TableCell>
                              {pair.destinationAirport}
                              <span className="block text-[10px] text-slate-400 font-mono">[{pair.destinationIata}]</span>
                            </TableCell>
                            <TableCell className="text-right font-semibold text-sky-600 dark:text-sky-400">
                              {pair.flightHours}
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={3} className="text-xs text-center text-slate-500 py-4">
                            Direct widebody freighter flights and priority express connections available.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: CUSTOMS COMPLIANCE & TARIFF MATHEMATICS */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="mb-10">
            <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300 mb-2">
              Import Regulatory Guide
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Customs Duties, VAT & Compliance in {route.name}
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm mt-1 max-w-2xl">
              Transparent tax calculation models and verified import documentation requirements enforced by{' '}
              {route.customsAuthority}.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Tariff Breakdown Cards */}
            <div className="lg:col-span-7 space-y-6">
              <Card className="border-slate-200 dark:border-slate-800">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base font-bold flex items-center gap-2">
                      <Scale className="w-4 h-4 text-blue-600" />
                      Duty & VAT Calculation Formula
                    </CardTitle>
                    <Badge variant="outline" className="text-xs font-mono">
                      Currency: {route.currency}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4 text-xs">
                  <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 font-mono text-slate-800 dark:text-slate-200">
                    {route.dutyFormula}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="p-3.5 rounded-lg bg-blue-50/50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50">
                      <div className="text-slate-500 font-medium">De Minimis Exemption:</div>
                      <div className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5">
                        {route.deMinimisThreshold}
                      </div>
                    </div>
                    <div className="p-3.5 rounded-lg bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/50">
                      <div className="text-slate-500 font-medium">Standard VAT / Tax Rate:</div>
                      <div className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5">
                        {route.vatGstRate}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Regulatory Checklist */}
              <Card className="border-slate-200 dark:border-slate-800">
                <CardHeader>
                  <CardTitle className="text-base font-bold flex items-center gap-2">
                    <FileText className="w-4 h-4 text-purple-600" />
                    Mandatory Import Compliance Checklist
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2.5 text-xs">
                    {route.customsRequirements.map((req, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                        <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Amazon FBA Pallet Specifications Card */}
            <div className="lg:col-span-5">
              <Card className="border-slate-200 dark:border-slate-800 h-full">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base font-bold flex items-center gap-2">
                      <Box className="w-4 h-4 text-amber-600" />
                      Amazon FBA Inbound Pallet Specs
                    </CardTitle>
                    <Badge className="bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300 text-[10px]">
                      CARP Compliant
                    </Badge>
                  </div>
                  <CardDescription className="text-xs">
                    Enforced at fulfillment centers across {route.name}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 text-xs">
                  <div className="space-y-2.5">
                    <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                      <span className="text-slate-500">Pallet Dimensions:</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{route.palletSpecs.dimensions}</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                      <span className="text-slate-500">Pallet Type / Grade:</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{route.palletSpecs.palletType}</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                      <span className="text-slate-500">Max Pallet Weight:</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{route.palletSpecs.maxPalletWeightKg} kg</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                      <span className="text-slate-500">Max Double-Stack Height:</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{route.palletSpecs.maxDoubleStackHeightM} meters</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                      <span className="text-slate-500">Standard Box Limit:</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{route.palletSpecs.cartonMaxWeightKg} kg max</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                      <span className="text-slate-500">Team Lift Warning Tier:</span>
                      <span className="font-semibold text-amber-600">{route.palletSpecs.weightTiers.teamLiftRangeKg}</span>
                    </div>
                  </div>

                  {/* Popular FC list */}
                  {route.topAmazonWarehouses.length > 0 && (
                    <div className="pt-2">
                      <div className="font-semibold text-slate-700 dark:text-slate-300 mb-2">
                        Frequent Amazon FC Destinations:
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {route.topAmazonWarehouses.map((wh, idx) => (
                          <span
                            key={idx}
                            className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded text-[11px] font-mono"
                          >
                            {wh}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* SECTION 4: CONTEXTUAL FAQS ACCORDION */}
        <section className="bg-slate-100/70 dark:bg-slate-900/50 py-16 border-t border-slate-200 dark:border-slate-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 mb-2">
                Knowledge Base & FAQs
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Frequently Asked Questions: China to {route.name}
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                Verified logistics advice on customs, DDP terms, battery shipping, and Amazon FBA first-leg delivery.
              </p>
            </div>

            <Accordion className="w-full bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
              {contextualFaqs.map((faq, idx) => (
                <AccordionItem key={idx} value={`faq-${idx}`}>
                  <AccordionTrigger className="text-sm font-semibold hover:no-underline hover:text-blue-600 px-5 py-4">
                    <span className="flex items-center gap-2 text-left">
                      <HelpCircle className="w-4 h-4 text-blue-600 shrink-0" />
                      {faq.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed px-5 pb-5">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* SECTION 5: BOTTOM CONVERSION CTA BANNER */}
        <section className="bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 text-white py-14 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto text-center space-y-6">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
              Ready to Ship from China to {route.name}?
            </h2>
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
              Get an accurate, all-inclusive DDP freight rate within 2 hours. Free 7-day storage at our 500+ m²
              Shenzhen facility, 100% carton inspection, and dedicated cargo tracking.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-2">
              <a
                href={`https://wa.me/8613724246674?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-6 py-3.5 shadow-lg shadow-emerald-950/40 transition-transform hover:scale-105"
              >
                <MessageCircle className="w-5 h-5" />
                Chat with David on WhatsApp (+86 137 2424 6674)
              </a>
              <Link
                href="/tools"
                className="inline-flex items-center gap-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium px-6 py-3.5 border border-slate-700 transition-colors"
              >
                Open 3D Container Calculator
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="text-xs text-slate-400">
              Shenzhen Jiechengda International Freight Forwarding Co., Ltd. • NVOCC License: GD20240307220907
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
