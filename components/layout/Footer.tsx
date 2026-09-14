"use client";

import React from "react";
import Link from "next/link";
import { SITE_CONFIG, getWhatsAppUrl } from "@/data/siteConfig";
import { ORIGIN_HUBS } from "@/data/origins";
import { TARGET_ROUTES } from "@/data/routes";
import { useQuoteModal } from "@/components/quote/QuoteModalContext";
import { BrandLogo } from "@/components/layout/BrandLogo";
import {
  ShieldCheck,
  MapPin,
  Phone,
  Mail,
  Clock,
  Award,
  Star,
  ExternalLink,
  MessageCircle,
  Plane,
  Ship,
  Train,
  Box,
  Layers,
  Calculator,
  Compass,
  Building2,
  FileCheck,
  CheckCircle2,
} from "lucide-react";

export function Footer() {
  const { openQuoteModal } = useQuoteModal();
  const topRoutes = TARGET_ROUTES.slice(0, 10);

  return (
    <footer className="bg-slate-950 text-slate-400 text-sm border-t border-slate-800">
      {/* 1. TOP CTA & DISPATCH STRIP */}
      <div className="bg-slate-900/90 border-b border-slate-800 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
                24/7 Operations Desk • Average Response ≤ 2 Hours
              </span>
            </div>
            <h3 className="text-xl font-extrabold text-white tracking-tight">
              Ready to Ship from China? Get Your All-In DDP Quote
            </h3>
            <p className="text-xs text-slate-400 max-w-2xl">
              Direct carrier contracts, transparent all-inclusive landed costing, FNSKU Amazon prep, and guaranteed customs release.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => openQuoteModal()}
              className="flex items-center gap-2 rounded-xl bg-orange-600 hover:bg-orange-700 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-orange-600/20 transition-all hover:scale-[1.02] cursor-pointer"
            >
              <Calculator className="h-4 w-4" />
              <span>Launch Quote Wizard</span>
            </button>

            <a
              href={getWhatsAppUrl("Hello JCD Forwarder, I am requesting a direct freight inquiry.")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-600/30 transition-all hover:scale-[1.02]"
            >
              <MessageCircle className="h-4 w-4" />
              <span>WhatsApp Dispatch</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. MAIN FOOTER CONTENT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Column 1: Corporate Identity & NVOCC Certification */}
          <div className="lg:col-span-2 space-y-4">
            <BrandLogo href="/" size="md" variant="light" />

            <p className="text-xs leading-relaxed text-slate-400">
              Shenzhen Jiechengda International Freight Forwarding Co., Ltd. (深圳市捷成达国际货运代理有限公司) is a premier Chinese freight forwarding enterprise holding verified NVOCC license <strong className="text-blue-300 font-mono">GD20240307220907</strong>, providing seamless door-to-door DDP logistics, Amazon FBA prep, ocean FCL/LCL consolidation, and air charters.
            </p>

            {/* Trust Badges */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <ShieldCheck className="h-4 w-4 text-blue-400 shrink-0" />
                <span>
                  <strong>NVOCC License:</strong> {SITE_CONFIG.credentials.nvoccLicenseNumber}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <Award className="h-4 w-4 text-amber-400 shrink-0" />
                <span>
                  <strong>Alibaba Verified:</strong> 4.7 / 5.0 Rating (48 Verified Reviews)
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>
                  <strong>Track Record:</strong> 300,000+ Completed Shipments Worldwide
                </span>
              </div>
            </div>

            {/* Official Social Media Channels */}
            <div className="pt-3">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-2.5">
                Official Corporate Channels
              </span>
              <div className="flex flex-wrap gap-2">
                <a
                  href={SITE_CONFIG.socials.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/60 text-emerald-400 hover:bg-emerald-900/60 border border-emerald-800/60 text-xs font-semibold transition-colors"
                >
                  <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
                </a>

                <a
                  href={SITE_CONFIG.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-950/60 text-blue-400 hover:bg-blue-900/60 border border-blue-800/60 text-xs font-semibold transition-colors"
                >
                  <ExternalLink className="h-3.5 w-3.5" /> LinkedIn
                </a>

                <a
                  href={SITE_CONFIG.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-700 text-xs font-semibold transition-colors"
                >
                  <ExternalLink className="h-3.5 w-3.5" /> Facebook
                </a>

                <a
                  href={SITE_CONFIG.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-pink-950/60 text-pink-400 hover:bg-pink-900/60 border border-pink-800/60 text-xs font-semibold transition-colors"
                >
                  <ExternalLink className="h-3.5 w-3.5" /> Instagram
                </a>

                <a
                  href="https://www.tiktok.com/@alibaba.com_buyercentral?spm=a2700.shop_index.0.0.16963ecfX0Jn1W&file=@alibaba.com_buyercentral"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-700 text-xs font-semibold transition-colors"
                >
                  <ExternalLink className="h-3.5 w-3.5" /> TikTok
                </a>

                <a
                  href="https://jiechengda.en.alibaba.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-950/60 text-amber-400 hover:bg-amber-900/60 border border-amber-800/60 text-xs font-semibold transition-colors"
                >
                  <Star className="h-3.5 w-3.5 fill-amber-400" /> Alibaba Store
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Core Freight Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Freight Services
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  href="/services/air-freight"
                  className="hover:text-blue-400 transition-colors flex items-center gap-1.5"
                >
                  <Plane className="h-3.5 w-3.5 text-blue-500" />
                  Air Freight &amp; Battery DDP
                </Link>
              </li>
              <li>
                <Link
                  href="/services/sea-freight-fcl-lcl"
                  className="hover:text-blue-400 transition-colors flex items-center gap-1.5"
                >
                  <Ship className="h-3.5 w-3.5 text-indigo-500" />
                  Ocean Freight (FCL &amp; LCL)
                </Link>
              </li>
              <li>
                <Link
                  href="/services/rail-freight"
                  className="hover:text-blue-400 transition-colors flex items-center gap-1.5"
                >
                  <Train className="h-3.5 w-3.5 text-amber-500" />
                  China-Europe Railway Express
                </Link>
              </li>
              <li>
                <Link
                  href="/services/amazon-fba-logistics"
                  className="hover:text-blue-400 transition-colors flex items-center gap-1.5"
                >
                  <Box className="h-3.5 w-3.5 text-emerald-500" />
                  Amazon FBA First-Leg &amp; Prep
                </Link>
              </li>
              <li className="pt-2 text-slate-500 text-[11px]">
                Dedicated hazardous UN38.3 pure battery lines, oversized pallet trucking, and tax drawback support.
              </li>
            </ul>

            <h4 className="text-xs font-bold uppercase tracking-wider text-white pt-4">
              Calculation Suite
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  href="/tools/container-loading-calculator"
                  className="hover:text-blue-400 transition-colors flex items-center gap-1.5"
                >
                  <Layers className="h-3.5 w-3.5 text-indigo-400" />
                  3D Container Simulator
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/volumetric-calculator"
                  className="hover:text-blue-400 transition-colors flex items-center gap-1.5"
                >
                  <Calculator className="h-3.5 w-3.5 text-blue-400" />
                  Volumetric Weight Calculator
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/incoterms-selector"
                  className="hover:text-blue-400 transition-colors flex items-center gap-1.5"
                >
                  <Compass className="h-3.5 w-3.5 text-emerald-400" />
                  Incoterms 2020 Engine
                </Link>
              </li>
              <li>
                <Link
                  href="/tools"
                  className="hover:text-blue-400 transition-colors text-blue-400 font-semibold"
                >
                  ➔ View All Interactive Tools
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: 7 Origin Hubs */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              7 Chinese Origin Hubs
            </h4>
            <ul className="space-y-2 text-xs">
              {ORIGIN_HUBS.map((hub) => (
                <li key={hub.id}>
                  <Link
                    href={`/origins/${hub.slug}`}
                    className="hover:text-blue-400 transition-colors flex items-center justify-between"
                  >
                    <span>{hub.name}</span>
                    <span className="text-[10px] font-mono text-slate-500">
                      {hub.seaports[0]?.name || "Port"}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="pt-4 border-t border-slate-900">
              <span className="text-xs font-bold text-slate-300 block mb-1">
                Shenzhen Warehouse Base:
              </span>
              <p className="text-[11px] text-slate-400 leading-snug">
                500 m² bonded consolidation center in Bao&apos;an Xinhe with free 7-day storage, FNSKU labeling, and EPAL palletizing.
              </p>
            </div>
          </div>

          {/* Column 4: Key Global Destination Routes & Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Top Country Routes
            </h4>
            <ul className="space-y-1.5 text-xs">
              {topRoutes.map((route) => (
                <li key={route.code}>
                  <Link
                    href={`/routes/${route.slug}`}
                    className="hover:text-blue-400 transition-colors flex items-center justify-between"
                  >
                    <span>{route.name}</span>
                    <span className="text-[10px] font-mono text-slate-500">
                      {route.code}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            <h4 className="text-xs font-bold uppercase tracking-wider text-white pt-4">
              Shenzhen HQ Office
            </h4>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-start gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-blue-400 shrink-0 mt-0.5" />
                <span className="leading-snug">{SITE_CONFIG.facility.hqAddressEn}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Phone className="h-3.5 w-3.5 text-blue-400 shrink-0" />
                <a
                  href={`tel:${SITE_CONFIG.contact.phone}`}
                  className="hover:text-white transition-colors"
                >
                  {SITE_CONFIG.contact.phoneDisplay}
                </a>
              </div>
              <div className="flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5 text-blue-400 shrink-0" />
                <a
                  href={`mailto:${SITE_CONFIG.contact.email}`}
                  className="hover:text-white transition-colors"
                >
                  {SITE_CONFIG.contact.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 3. BOTTOM LEGAL, DISCLOSURES & COPYRIGHT */}
        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="text-center md:text-left space-y-1">
            <p>
              © {new Date().getFullYear()} {SITE_CONFIG.credentials.legalNameEn}. All Rights Reserved.
            </p>
            <p className="text-[11px] text-slate-600">
              NVOCC License Filing: {SITE_CONFIG.credentials.nvoccLicenseNumber} ({SITE_CONFIG.credentials.licensingBody}). Registered in Shenzhen, Guangdong, China.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-400">
            <Link href="/about-us" className="hover:text-white transition-colors">
              About Us
            </Link>
            <span>•</span>
            <Link href="/contact" className="hover:text-white transition-colors">
              Contact Us
            </Link>
            <span>•</span>
            <Link href="/routes" className="hover:text-white transition-colors">
              44 Country Routes
            </Link>
            <span>•</span>
            <Link href="/origins" className="hover:text-white transition-colors">
              7 Origin Hubs
            </Link>
            <span>•</span>
            <Link href="/tools" className="hover:text-white transition-colors">
              Logistics Tools
            </Link>
            <span>•</span>
            <a
              href={`mailto:${SITE_CONFIG.contact.email}?subject=Compliance%20Inquiry`}
              className="hover:text-white transition-colors"
            >
              Customs Compliance
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
