'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { SITE_CONFIG, getWhatsAppUrl } from '@/data/siteConfig';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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
  ShieldCheck,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight,
  MessageCircle,
  ChevronRight,
  AlertTriangle,
  FileCheck,
  Building2,
  Ship,
  Sparkles,
} from 'lucide-react';

interface IncotermDetail {
  code: 'EXW' | 'FOB' | 'CIF' | 'DDU' | 'DDP';
  name: string;
  fullName: string;
  sellerResponsibility: string;
  buyerResponsibility: string;
  riskTransferPoint: string;
  bestSuitedFor: string;
  eCommerceSuitability: 'Not Recommended' | 'Moderate Risk' | 'High Friction' | 'Recommended' | 'Gold Standard';
  color: string;
}

const INCOTERMS_DATA: IncotermDetail[] = [
  {
    code: 'EXW',
    name: 'Ex Works',
    fullName: 'Ex Works (named place of delivery)',
    sellerResponsibility: 'Only makes goods available at the Chinese factory floor or warehouse.',
    buyerResponsibility: 'Bears 100% of transport costs, export customs, sea/air freight, import clearance, duties, and door delivery.',
    riskTransferPoint: 'At seller factory premises before loading onto truck.',
    bestSuitedFor: 'Large multinational corporations with permanent in-country China freight procurement offices.',
    eCommerceSuitability: 'Not Recommended',
    color: '#ef4444',
  },
  {
    code: 'FOB',
    name: 'Free on Board',
    fullName: 'Free on Board (named port of shipment, e.g. Shenzhen/Ningbo)',
    sellerResponsibility: 'Inland trucking to Chinese port and formal export customs clearance onto vessel.',
    buyerResponsibility: 'Ocean/Air international freight, marine insurance, destination customs, tariffs, and inland drayage.',
    riskTransferPoint: 'Once goods are physically loaded on board the vessel at the Chinese origin port.',
    bestSuitedFor: 'Traditional B2B importers with direct ocean carrier service contracts and local customs broker.',
    eCommerceSuitability: 'Moderate Risk',
    color: '#f59e0b',
  },
  {
    code: 'CIF',
    name: 'Cost, Insurance and Freight',
    fullName: 'Cost, Insurance & Freight (named destination port)',
    sellerResponsibility: 'Inland trucking, Chinese export clearance, international freight, and basic marine insurance.',
    buyerResponsibility: 'Destination port terminal handling charges (THC), import customs clearance, tariffs, and inland transport.',
    riskTransferPoint: 'Loaded on board at origin port (seller pays freight to destination port, but risk transfers at origin).',
    bestSuitedFor: 'Bulk commodity traders shipping port-to-port who handle their own destination terminal drayage.',
    eCommerceSuitability: 'High Friction',
    color: '#eab308',
  },
  {
    code: 'DDU',
    name: 'Delivered Duty Unpaid (DAP)',
    fullName: 'Delivered At Place (Duty Unpaid)',
    sellerResponsibility: 'Complete international transport up to buyer destination address, excluding customs duty and import tax.',
    buyerResponsibility: 'Destination customs clearance declaration, import duties, and VAT payment upon arrival.',
    riskTransferPoint: 'When goods are placed at disposal of buyer on arriving means of transport, ready for unloading.',
    bestSuitedFor: 'Overseas buyers with existing VAT registration and automated customs deferment accounts.',
    eCommerceSuitability: 'Moderate Risk',
    color: '#0284c7',
  },
  {
    code: 'DDP',
    name: 'Delivered Duty Paid',
    fullName: 'Delivered Duty Paid (named destination address / Amazon FC)',
    sellerResponsibility: '100% End-to-End: Chinese factory pickup, export customs, freight, destination customs clearance, all duties, taxes, and door delivery.',
    buyerResponsibility: 'None. Receive shipment at door or Amazon fulfillment center dock with zero paperwork or tariff friction.',
    riskTransferPoint: 'Upon physical delivery and signed delivery note (BOL/POD) at destination door.',
    bestSuitedFor: 'Amazon FBA sellers, e-commerce brands, and businesses wanting fixed, guaranteed landed costs.',
    eCommerceSuitability: 'Gold Standard',
    color: '#10b981',
  },
];

const STAGE_RESPONSIBILITY_MATRIX = [
  { stage: 'Factory Loading & Inland Drayage in China', exw: false, fob: true, cif: true, ddu: true, ddp: true },
  { stage: 'Chinese Export Customs Declaration', exw: false, fob: true, cif: true, ddu: true, ddp: true },
  { stage: 'Origin Terminal Handling Charges (THC / ORC)', exw: false, fob: true, cif: true, ddu: true, ddp: true },
  { stage: 'International Ocean / Air / Rail Freight', exw: false, fob: false, cif: true, ddu: true, ddp: true },
  { stage: 'Marine Transit Cargo Insurance', exw: false, fob: false, cif: true, ddu: false, ddp: true },
  { stage: 'Destination Port Terminal Handling Charges', exw: false, fob: false, cif: false, ddu: true, ddp: true },
  { stage: 'Destination Customs Clearance Declaration', exw: false, fob: false, cif: false, ddu: false, ddp: true },
  { stage: 'Payment of Import Customs Duties & Tariffs', exw: false, fob: false, cif: false, ddu: false, ddp: true },
  { stage: 'Payment of Import VAT / GST / Sales Tax', exw: false, fob: false, cif: false, ddu: false, ddp: true },
  { stage: 'Final Mile Delivery to Door / Amazon FBA Dock', exw: false, fob: false, cif: false, ddu: true, ddp: true },
];

export default function IncotermsSelectorPage() {
  const [selectedTerm, setSelectedTerm] = useState<'EXW' | 'FOB' | 'CIF' | 'DDU' | 'DDP'>('DDP');

  // Interactive Quiz State
  const [cargoDestination, setCargoDestination] = useState<'amazon' | 'private_warehouse' | 'direct_consumer'>('amazon');
  const [customsExperience, setCustomsExperience] = useState<'none' | 'licensed_broker'>('none');
  const [priceControlPreference, setPriceControlPreference] = useState<'all_inclusive' | 'handle_freight'>('all_inclusive');

  // Recommended Incoterm based on quiz
  const recommendedTerm = React.useMemo(() => {
    if (cargoDestination === 'amazon') return 'DDP';
    if (customsExperience === 'none') return 'DDP';
    if (priceControlPreference === 'all_inclusive') return 'DDP';
    if (priceControlPreference === 'handle_freight' && customsExperience === 'licensed_broker') return 'FOB';
    return 'DDP';
  }, [cargoDestination, customsExperience, priceControlPreference]);

  const activeIncoterm = INCOTERMS_DATA.find((t) => t.code === selectedTerm)!;

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 pb-20">
      {/* Top Breadcrumb */}
      <div className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 text-xs text-slate-500">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5">
            <Link href="/" className="hover:text-blue-600 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <Link href="/tools" className="hover:text-blue-600 transition-colors">
              Logistics Tools
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-medium text-slate-800 dark:text-slate-200">
              Incoterms 2020 Decision Selector
            </span>
          </nav>
        </div>
      </div>

      {/* Header Banner */}
      <div className="bg-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <Badge className="bg-emerald-600 text-white font-semibold">ICC Incoterms 2020 Standard</Badge>
            <Badge variant="outline" className="border-slate-700 text-slate-300">
              EXW • FOB • CIF • DDU • DDP
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Incoterms 2020 Decision Selector & Risk Guide
          </h1>
          <p className="text-slate-300 text-sm sm:text-base mt-2 max-w-3xl leading-relaxed">
            Clarify exactly where risk and payment obligations transfer between buyer and seller. Determine why DDP
            (Delivered Duty Paid) is the mandatory standard for Amazon FBA and cross-border e-commerce sellers.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-12">
        {/* SECTION 1: INTERACTIVE QUESTIONNAIRE */}
        <Card className="border-slate-200 dark:border-slate-800 shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-500" />
                Find the Optimal Incoterm for Your Business
              </CardTitle>
              <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                Recommended: {recommendedTerm}
              </Badge>
            </div>
            <CardDescription className="text-xs">
              Answer 3 quick operational questions to evaluate buyer vs. seller commercial risk
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              {/* Question 1 */}
              <div className="space-y-2 p-3.5 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                <label className="font-semibold text-slate-800 dark:text-slate-200 block">
                  1. Where is the final destination?
                </label>
                <div className="space-y-1.5">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="destination"
                      checked={cargoDestination === 'amazon'}
                      onChange={() => setCargoDestination('amazon')}
                      className="text-blue-600"
                    />
                    <span>Amazon FBA Fulfillment Center</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="destination"
                      checked={cargoDestination === 'private_warehouse'}
                      onChange={() => setCargoDestination('private_warehouse')}
                      className="text-blue-600"
                    />
                    <span>Private Commercial Warehouse / 3PL</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="destination"
                      checked={cargoDestination === 'direct_consumer'}
                      onChange={() => setCargoDestination('direct_consumer')}
                      className="text-blue-600"
                    />
                    <span>Direct Retail Customer Door</span>
                  </label>
                </div>
              </div>

              {/* Question 2 */}
              <div className="space-y-2 p-3.5 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                <label className="font-semibold text-slate-800 dark:text-slate-200 block">
                  2. Destination Customs Capability?
                </label>
                <div className="space-y-1.5">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="customs"
                      checked={customsExperience === 'none'}
                      onChange={() => setCustomsExperience('none')}
                      className="text-blue-600"
                    />
                    <span>No local customs broker / Want zero tax hassle</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="customs"
                      checked={customsExperience === 'licensed_broker'}
                      onChange={() => setCustomsExperience('licensed_broker')}
                      className="text-blue-600"
                    />
                    <span>Have licensed customs broker & import bond</span>
                  </label>
                </div>
              </div>

              {/* Question 3 */}
              <div className="space-y-2 p-3.5 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                <label className="font-semibold text-slate-800 dark:text-slate-200 block">
                  3. Landed Cost Predictability?
                </label>
                <div className="space-y-1.5">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="pricing"
                      checked={priceControlPreference === 'all_inclusive'}
                      onChange={() => setPriceControlPreference('all_inclusive')}
                      className="text-blue-600"
                    />
                    <span>100% Fixed all-inclusive invoice (No surprise fees)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="pricing"
                      checked={priceControlPreference === 'handle_freight'}
                      onChange={() => setPriceControlPreference('handle_freight')}
                      className="text-blue-600"
                    />
                    <span>Handle destination terminal & trucking fees directly</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Recommendation Banner */}
            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex flex-wrap items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="text-sm font-bold text-emerald-900 dark:text-emerald-300">
                  Recommended Term: DDP (Delivered Duty Paid)
                </div>
                <div className="text-xs text-emerald-800 dark:text-emerald-400">
                  Because Amazon fulfillment centers refuse to pay customs duties or act as Importer of Record (IOR),
                  DDP ensures your cargo is cleared and delivered directly to Amazon docks with zero refusal risk.
                </div>
              </div>
              <a
                href={getWhatsAppUrl('Hello David! I need a DDP freight quote for my Amazon FBA / e-commerce inventory.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs px-4 py-2.5 transition-colors shrink-0"
              >
                <MessageCircle className="w-4 h-4" />
                Get DDP All-In Rate
              </a>
            </div>
          </CardContent>
        </Card>

        {/* SECTION 2: TERM SELECTOR & DETAILS */}
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            {INCOTERMS_DATA.map((term) => (
              <button
                key={term.code}
                type="button"
                onClick={() => setSelectedTerm(term.code)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedTerm === term.code
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-900/20'
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-slate-300'
                }`}
              >
                {term.code} ({term.name})
              </button>
            ))}
          </div>

          <Card className="border-slate-200 dark:border-slate-800 shadow-sm">
            <CardHeader className="pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <CardTitle className="text-lg font-bold">
                    {activeIncoterm.code} - {activeIncoterm.name}
                  </CardTitle>
                  <CardDescription className="text-xs font-mono">
                    {activeIncoterm.fullName}
                  </CardDescription>
                </div>
                <Badge
                  className={
                    activeIncoterm.code === 'DDP'
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold'
                      : 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300'
                  }
                >
                  Suitability: {activeIncoterm.eCommerceSuitability}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-4 space-y-4 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3.5 bg-blue-50/50 dark:bg-blue-950/30 rounded-xl border border-blue-100 dark:border-blue-900/50">
                  <div className="font-semibold text-blue-900 dark:text-blue-300 mb-1">Seller Responsibilities:</div>
                  <div className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    {activeIncoterm.sellerResponsibility}
                  </div>
                </div>

                <div className="p-3.5 bg-amber-50/50 dark:bg-amber-950/30 rounded-xl border border-amber-100 dark:border-amber-900/50">
                  <div className="font-semibold text-amber-900 dark:text-amber-300 mb-1">Buyer Responsibilities:</div>
                  <div className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    {activeIncoterm.buyerResponsibility}
                  </div>
                </div>
              </div>

              <div className="p-3.5 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                <div>
                  <strong className="text-slate-800 dark:text-slate-200">Risk Transfer Point: </strong>
                  <span className="text-slate-600 dark:text-slate-400">{activeIncoterm.riskTransferPoint}</span>
                </div>
                <div>
                  <strong className="text-slate-800 dark:text-slate-200">Best Suited For: </strong>
                  <span className="text-slate-600 dark:text-slate-400">{activeIncoterm.bestSuitedFor}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* SECTION 3: COMPREHENSIVE COMPARISON MATRIX */}
        <div className="space-y-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
              Incoterms 2020 Responsibility Matrix (Seller vs. Buyer)
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Green indicates the cost and operational risk is covered by the seller/forwarder; red indicates buyer obligation.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
            <Table>
              <TableHeader>
                <TableRow className="text-xs bg-slate-50 dark:bg-slate-950">
                  <TableHead className="w-[320px]">Logistics Supply Chain Stage</TableHead>
                  <TableHead className="text-center">EXW</TableHead>
                  <TableHead className="text-center">FOB</TableHead>
                  <TableHead className="text-center">CIF</TableHead>
                  <TableHead className="text-center">DDU</TableHead>
                  <TableHead className="text-center font-bold text-emerald-600 dark:text-emerald-400">DDP (JCD)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {STAGE_RESPONSIBILITY_MATRIX.map((row, idx) => (
                  <TableRow key={idx} className="text-xs">
                    <TableCell className="font-medium text-slate-800 dark:text-slate-200">
                      {row.stage}
                    </TableCell>
                    <TableCell className="text-center">
                      {row.exw ? <CheckCircle2 className="w-4 h-4 text-emerald-500 inline" /> : <XCircle className="w-4 h-4 text-rose-400 inline" />}
                    </TableCell>
                    <TableCell className="text-center">
                      {row.fob ? <CheckCircle2 className="w-4 h-4 text-emerald-500 inline" /> : <XCircle className="w-4 h-4 text-rose-400 inline" />}
                    </TableCell>
                    <TableCell className="text-center">
                      {row.cif ? <CheckCircle2 className="w-4 h-4 text-emerald-500 inline" /> : <XCircle className="w-4 h-4 text-rose-400 inline" />}
                    </TableCell>
                    <TableCell className="text-center">
                      {row.ddu ? <CheckCircle2 className="w-4 h-4 text-emerald-500 inline" /> : <XCircle className="w-4 h-4 text-rose-400 inline" />}
                    </TableCell>
                    <TableCell className="text-center bg-emerald-50/40 dark:bg-emerald-950/20">
                      {row.ddp ? <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 inline font-bold" /> : <XCircle className="w-4 h-4 text-rose-400 inline" />}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </main>
  );
}
