import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ORIGIN_HUBS,
  getOriginBySlug,
  getAllOriginSlugs,
  type OriginHub,
} from '@/data/origins';
import {
  JsonLd,
  createLocalBusinessSchema,
  createBreadcrumbSchema,
} from '@/components/seo/JsonLd';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  MapPin,
  Building2,
  Anchor,
  Plane,
  Train,
  Truck,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Warehouse,
  ArrowRight,
  MessageCircle,
  Mail,
  ChevronRight,
  Award,
} from 'lucide-react';

interface OriginPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllOriginSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: OriginPageProps): Promise<Metadata> {
  const { slug } = await params;
  const origin = getOriginBySlug(slug);

  if (!origin) {
    return {
      title: 'Origin Hub Not Found | JCD Forwarder',
      description: 'The requested Chinese origin logistics hub could not be located.',
    };
  }

  const title = `Shipping from ${origin.name} (${origin.chineseName}) | Warehouse Pickup & Consolidation`;
  const description = `Direct export logistics and factory pickup in ${origin.name}, China. ${origin.role}. Local warehouse consolidation, deepwater ocean berths, and express air freight.`;

  return {
    title,
    description,
    keywords: [
      `shipping from ${origin.name.toLowerCase()}`,
      `freight forwarder ${origin.name.toLowerCase()}`,
      `warehouse pickup ${origin.name.toLowerCase()}`,
      `${origin.name.toLowerCase()} port container shipping`,
      `consolidation in ${origin.name.toLowerCase()}`,
      `jcd forwarder ${origin.name.toLowerCase()}`,
    ],
    alternates: {
      canonical: `https://jcdforwarder.com/origins/${origin.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://jcdforwarder.com/origins/${origin.slug}`,
      siteName: 'JCD Forwarder',
      locale: 'en_US',
      type: 'website',
      images: [
        {
          url: 'https://jcdforwarder.com/images/og-origin-hub.jpg',
          width: 1200,
          height: 630,
          alt: `JCD Forwarder Logistics Base in ${origin.name}`,
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

export default async function OriginPage({ params }: OriginPageProps) {
  const { slug } = await params;
  const origin = getOriginBySlug(slug);

  if (!origin) {
    notFound();
  }

  const localBusinessSchema = createLocalBusinessSchema(origin);
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: 'Home', url: 'https://jcdforwarder.com' },
    { name: 'Origins', url: 'https://jcdforwarder.com/origins' },
    { name: `${origin.name} Hub`, url: `https://jcdforwarder.com/origins/${origin.slug}` },
  ]);

  const whatsappMessage = encodeURIComponent(
    `Hello David! I need factory pickup and freight booking from ${origin.name} (${origin.chineseName}). Cargo details:`
  );
  const emailSubject = encodeURIComponent(`Factory Pickup & Freight Inquiry: ${origin.name} Hub`);

  return (
    <>
      <JsonLd schema={localBusinessSchema} />
      <JsonLd schema={breadcrumbSchema} />

      <main className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
        {/* Breadcrumb Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 text-xs text-slate-500">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 flex-wrap">
            <Link href="/" className="hover:text-blue-600 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <Link href="/origins" className="hover:text-blue-600 transition-colors">
              Chinese Origin Hubs
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-medium text-slate-800 dark:text-slate-200">
              {origin.name} ({origin.chineseName})
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
                    <MapPin className="w-3.5 h-3.5 mr-1 text-sky-400" />
                    {origin.province} Province
                  </Badge>
                  {origin.isHeadquarters ? (
                    <Badge className="bg-emerald-500 text-slate-950 font-bold px-3 py-1">
                      <Award className="w-3.5 h-3.5 mr-1" />
                      Global Corporate Headquarters & Flagship Facility
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-emerald-950/60 text-emerald-300 border-emerald-700/50 px-3 py-1">
                      <Building2 className="w-3.5 h-3.5 mr-1 text-emerald-400" />
                      Regional Sourcing & Consolidation Base
                    </Badge>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white flex items-baseline gap-4">
                    <span>{origin.name}</span>
                    <span className="text-3xl sm:text-4xl text-sky-400 font-serif font-normal">
                      {origin.chineseName}
                    </span>
                    <span className="text-sm sm:text-base text-slate-400 font-mono font-normal">
                      [{origin.pinyin}]
                    </span>
                  </div>
                  <h1 className="text-xl sm:text-2xl font-medium text-slate-300">
                    {origin.role}
                  </h1>
                </div>

                <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
                  {origin.overview}
                </p>

                {/* Facility Address for Headquarters */}
                {origin.facilityAddress && (
                  <div className="bg-slate-800/90 rounded-xl p-4 border border-slate-700/80 text-xs text-slate-300 flex items-start gap-3">
                    <Building2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-white">Physical Warehouse Address:</div>
                      <div className="mt-0.5 text-slate-300">{origin.facilityAddress}</div>
                      <div className="mt-1 text-[11px] text-emerald-400 font-medium">
                        {origin.warehouseAreaSqM}+ m² Dedicated Quality Inspection, Devanning & Palletizing Facility
                      </div>
                    </div>
                  </div>
                )}

                {/* Action CTAs */}
                <div className="flex flex-wrap gap-4 pt-2">
                  <a
                    href={`https://wa.me/8613724246674?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-6 py-3.5 shadow-lg shadow-emerald-900/30 transition-all hover:scale-[1.02]"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Book Factory Pickup via WhatsApp
                  </a>
                  <a
                    href={`mailto:David@JCDforwarder.com?subject=${emailSubject}`}
                    className="inline-flex items-center gap-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold px-6 py-3.5 border border-slate-600 transition-colors"
                  >
                    <Mail className="w-5 h-5 text-slate-300" />
                    Direct Operations Inquiry
                  </a>
                </div>
              </div>

              {/* Pickup SLA Card */}
              <div className="lg:col-span-4 bg-slate-800/90 rounded-2xl p-6 border border-slate-700/80 shadow-2xl backdrop-blur-sm space-y-5">
                <div className="flex items-center justify-between border-b border-slate-700 pb-3">
                  <div className="text-sm font-semibold text-slate-200">Local Drayage SLA</div>
                  <Badge className="bg-sky-500/20 text-sky-300 border-sky-500/40">
                    Active Dispatch
                  </Badge>
                </div>

                <div className="space-y-4 text-xs">
                  <div className="flex items-start gap-3">
                    <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-white">Average Pickup Response:</span>
                      <div className="text-slate-300 mt-0.5">
                        Within {origin.pickup.averageDispatchHours} hours of supplier booking
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Truck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-white">Pickup Service Radius:</span>
                      <div className="text-slate-300 mt-0.5">{origin.pickup.radiusKm} km radius from hub</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Warehouse className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-white">Warehouse Free Storage:</span>
                      <div className="text-slate-300 mt-0.5">
                        7 Days Complimentary Storage for LCL Consolidation
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-white">Pre-Shipment Quality Control:</span>
                      <div className="text-slate-300 text-[11px] mt-0.5">
                        100% Carton Count, Barcode Scanning & AQL Sampling
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-700 text-[11px] text-slate-400 text-center">
                  24/7 Hotline: +86 137 2424 6674
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 1: PICKUP & CONSOLIDATION CAPABILITIES */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="mb-10">
            <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 mb-2">
              Factory Logistics Network
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Local Warehouse Pickup & Consolidation in {origin.name}
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm mt-1 max-w-2xl">
              Dedicated truck fleets, fast supplier communication, and professional multi-vendor cargo consolidation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Covered Districts */}
            <Card className="border-slate-200 dark:border-slate-800">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-bold flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  Covered Industrial Districts
                </CardTitle>
                <CardDescription className="text-xs">
                  Direct trucking coverage within {origin.pickup.radiusKm} km
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
                  {origin.pickup.coveredDistrictsAndCities.map((district, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{district}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Fleet Types */}
            <Card className="border-slate-200 dark:border-slate-800">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-bold flex items-center gap-2">
                  <Truck className="w-4 h-4 text-sky-600" />
                  Available Trucking Fleet
                </CardTitle>
                <CardDescription className="text-xs">
                  Equipped for urban pickup and container drayage
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
                  {origin.pickup.fleetTypes.map((fleet, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                      <span>{fleet}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Warehouse Services */}
            <Card className="border-slate-200 dark:border-slate-800">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-bold flex items-center gap-2">
                  <Warehouse className="w-4 h-4 text-emerald-600" />
                  Value-Added Warehouse Services
                </CardTitle>
                <CardDescription className="text-xs">
                  Performed prior to international dispatch
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
                  {origin.pickup.consolidationServices.map((svc, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{svc}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* SECTION 2: PORT & AIRPORT GATEWAYS */}
        <section className="bg-slate-100/70 dark:bg-slate-900/50 py-16 border-y border-slate-200 dark:border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div>
              <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300 mb-2">
                Logistics Infrastructure
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Seaports, Air Cargo Ramps & Rail Corridors in {origin.name}
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1 max-w-2xl">
                Direct berthing ocean terminals, international air freighter links, and trans-Eurasian railway express departures.
              </p>
            </div>

            {/* Seaports Detail */}
            {origin.seaports.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Anchor className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-bold">Deepwater Ocean Container Terminals</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {origin.seaports.map((port, idx) => (
                    <Card key={idx} className="border-slate-200 dark:border-slate-800">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-base font-bold">{port.name}</CardTitle>
                          <Badge variant="outline" className="font-mono text-xs">
                            {port.code}
                          </Badge>
                        </div>
                        <CardDescription className="text-xs">
                          Terminal Classification: {port.type} {port.berthDepthM && `• ${port.berthDepthM}m Berth Depth`}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                          {port.features.map((feat, fIdx) => (
                            <li key={fIdx} className="flex items-start gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Airports Detail */}
            {origin.airports.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Plane className="w-5 h-5 text-sky-600" />
                  <h3 className="text-lg font-bold">International Air Freight Gateways</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {origin.airports.map((airport, idx) => (
                    <Card key={idx} className="border-slate-200 dark:border-slate-800">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-base font-bold">{airport.name}</CardTitle>
                          <div className="flex items-center gap-2">
                            {airport.batteryCargoApproved && (
                              <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 text-[10px]">
                                Battery / DG Approved
                              </Badge>
                            )}
                            <Badge variant="outline" className="font-mono text-xs">
                              {airport.code}
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                          {airport.features.map((feat, fIdx) => (
                            <li key={fIdx} className="flex items-start gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-sky-500 shrink-0 mt-0.5" />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Rail Connections Detail */}
            {origin.railConnections.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Train className="w-5 h-5 text-amber-600" />
                  <h3 className="text-lg font-bold">China-Europe Railway Express Connections</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {origin.railConnections.map((rail, idx) => (
                    <Card key={idx} className="border-slate-200 dark:border-slate-800">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-base font-bold">{rail.name}</CardTitle>
                          <Badge variant="outline" className="text-xs text-amber-600">
                            {rail.transitDaysToEurope}
                          </Badge>
                        </div>
                        <CardDescription className="text-xs font-medium text-amber-700 dark:text-amber-400">
                          Corridor: {rail.corridor}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="text-xs text-slate-600 dark:text-slate-400">
                        <div className="font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          Primary European Destination Terminals:
                        </div>
                        <div>{rail.destinations.join(' • ')}</div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* SECTION 3: MANUFACTURING SPECIALTIES & TOP TRADE LANES */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Manufacturing Specialties */}
            <div className="lg:col-span-6 space-y-4">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-bold">Local Manufacturing Specializations</h3>
              </div>
              <p className="text-xs text-slate-500">
                Major product categories sourced directly from factory clusters surrounding {origin.name}:
              </p>

              <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
                <ul className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300">
                  {origin.manufacturingIndustries.map((ind, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                      <span className="font-medium">{ind}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2">
                <div className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Operational Advantages in {origin.name}:
                </div>
                <div className="space-y-1.5">
                  {origin.operationalAdvantages.map((adv, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{adv}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Best Trade Lanes */}
            <div className="lg:col-span-6 space-y-4">
              <div className="flex items-center gap-2">
                <ArrowRight className="w-5 h-5 text-emerald-600" />
                <h3 className="text-lg font-bold">Popular Export Trade Lanes</h3>
              </div>
              <p className="text-xs text-slate-500">
                High-volume multimodal shipping corridors departing from {origin.name}:
              </p>

              <div className="space-y-3">
                {origin.bestTradeLanes.map((lane, idx) => (
                  <div
                    key={idx}
                    className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <div className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                        {lane}
                      </div>
                    </div>
                    <Link
                      href="/routes"
                      className="text-xs font-medium text-blue-600 hover:text-blue-500 inline-flex items-center gap-1 shrink-0"
                    >
                      View Route
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: CONVERSION CTA STRIP */}
        <section className="bg-slate-900 border-t border-slate-800 text-white py-14 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto text-center space-y-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Ready to Ship Inventory from {origin.name}?
            </h2>
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
              Contact our {origin.name} operations dispatch team for immediate factory collection, warehouse receiving,
              and direct export customs filing.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-2">
              <a
                href={`https://wa.me/8613724246674?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-6 py-3.5 shadow-lg shadow-emerald-950/40 transition-transform hover:scale-105"
              >
                <MessageCircle className="w-5 h-5" />
                Contact {origin.name} Dispatch (+86 137 2424 6674)
              </a>
              <a
                href={`mailto:David@JCDforwarder.com?subject=${emailSubject}`}
                className="inline-flex items-center gap-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium px-6 py-3.5 border border-slate-700 transition-colors"
              >
                <Mail className="w-4 h-4 text-slate-300" />
                Email David@JCDforwarder.com
              </a>
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
