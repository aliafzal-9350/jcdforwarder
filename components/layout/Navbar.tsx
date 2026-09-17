"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SITE_CONFIG, getWhatsAppUrl } from "@/data/siteConfig";
import { ORIGIN_HUBS } from "@/data/origins";
import { TARGET_ROUTES } from "@/data/routes";
import { useQuoteModal } from "@/components/quote/QuoteModalContext";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { BrandLogo } from "@/components/layout/BrandLogo";
import { cn } from "@/lib/utils";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import {
  ShieldCheck,
  Phone,
  Mail,
  Star,
  MessageCircle,
  Menu,
  ChevronDown,
  Plane,
  Ship,
  Train,
  Truck,
  Box,
  Clock,
  Calculator,
  Compass,
  MapPin,
  Award,
  ArrowRight,
  ChevronRight,
  Globe,
  Headphones,
  Search,
  FileText,
  ClipboardList,
  Anchor,
  Ruler,
  Scale,
} from "lucide-react";

// Closes a hover-driven dropdown when focus truly leaves its container (trigger + panel),
// so Tab-ing through the panel's links doesn't prematurely close the menu.
function handleMenuBlur(
  e: React.FocusEvent<HTMLDivElement>,
  setOpen: (v: boolean) => void
) {
  if (!e.currentTarget.contains(e.relatedTarget as Node)) {
    setOpen(false);
  }
}

function handleMenuKeyDown(
  e: React.KeyboardEvent<HTMLDivElement>,
  setOpen: (v: boolean) => void
) {
  if (e.key === "Escape") {
    setOpen(false);
    e.currentTarget.querySelector<HTMLButtonElement>("button")?.focus();
  }
}

function navLinkClass(active: boolean, transparentTop: boolean) {
  if (transparentTop) {
    return active
      ? "text-white bg-white/15"
      : "text-white/85 hover:text-white hover:bg-white/10";
  }
  return active
    ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30"
    : "text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800/60";
}

export function Navbar() {
  const pathname = usePathname();
  const { openQuoteModal } = useQuoteModal();
  const { t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Desktop Mega Menu States
  const [servicesOpen, setServicesOpen] = useState(false);
  const [activeServiceTab, setActiveServiceTab] = useState<"main" | "country" | "city">("main");
  const [toolsOpen, setToolsOpen] = useState(false);
  const [routesOpen, setRoutesOpen] = useState(false);
  const [originsOpen, setOriginsOpen] = useState(false);

  // Mobile accordion state
  const [mobileSection, setMobileSection] = useState<string | null>(null);

  // Close menus on route navigation. Adjusted during render (React's documented pattern for
  // "reset state when a prop changes") rather than in an effect, to avoid an extra render pass.
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setMobileMenuOpen(false);
    setServicesOpen(false);
    setToolsOpen(false);
    setRoutesOpen(false);
    setOriginsOpen(false);
  }

  const scrollTicking = useRef(false);
  useEffect(() => {
    const handleScroll = () => {
      if (scrollTicking.current) return;
      scrollTicking.current = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 20);
        scrollTicking.current = false;
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const topTierRoutes = TARGET_ROUTES.slice(0, 12);
  // The homepage hero is dark, so the header can start transparent/blended and become solid on scroll.
  // Every other page has a light background immediately below the header, so it stays solid always.
  const transparentTop = pathname === "/" && !scrolled;

  return (
    <header className="w-full z-40 sticky top-0 transition-all">
      {/* 1. TOP ANNOUNCEMENT & TRUST BAR */}
      <div className="bg-slate-950 text-slate-300 text-xs py-2 px-4 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-y-1.5">
          {/* Left: NVOCC & Alibaba Trust */}
          <div className="flex items-center flex-wrap gap-x-4 gap-y-1">
            <div className="flex items-center gap-1.5 text-slate-200">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <ShieldCheck className="h-3.5 w-3.5 text-blue-400" />
              <span className="font-semibold text-white">{t("header.nvoccLabel")}</span>
              <span className="font-mono text-blue-300 font-bold tracking-wide">
                {SITE_CONFIG.credentials.nvoccLicenseNumber}
              </span>
            </div>

            <span className="hidden sm:inline text-slate-700">|</span>

            <a
              href={SITE_CONFIG.socials.alibabaTrustPass}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-amber-300 hover:text-amber-200 font-medium transition-colors"
            >
              <Award className="h-3.5 w-3.5 text-amber-400" />
              <span>{t("header.alibabaSupplier")}</span>
              <span className="inline-flex items-center gap-0.5 bg-amber-400/10 px-1.5 py-0.2 rounded text-[11px] text-amber-300 font-bold">
                <Star className="h-2.5 w-2.5 fill-amber-400 text-amber-400" />
                4.7/5.0
              </span>
            </a>
          </div>

          {/* Right: 24/7 Hotline, Email, WhatsApp */}
          <div className="flex items-center gap-x-4">
            <a
              href={`tel:${SITE_CONFIG.contact.phone}`}
              className="hidden md:inline-flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Phone className="h-3 w-3 text-blue-400" />
              <span>{SITE_CONFIG.contact.phoneDisplay}</span>
            </a>

            <span className="hidden md:inline text-slate-700">|</span>

            <a
              href={`mailto:${SITE_CONFIG.contact.email}`}
              className="hidden lg:inline-flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Mail className="h-3 w-3 text-blue-400" />
              <span>{SITE_CONFIG.contact.email}</span>
            </a>

            <span className="hidden lg:inline text-slate-700">|</span>

            <a
              href={getWhatsAppUrl("Hello JCD Forwarder, I am requesting a direct freight quote.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-semibold transition-colors"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              <span>{t("header.whatsappDispatch")}</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. MAIN NAVIGATION BAR */}
      <nav
        className={cn(
          "w-full transition-all duration-200",
          scrolled
            ? "bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-md border-b border-slate-200/80 dark:border-slate-800"
            : transparentTop
            ? "bg-slate-950/90 backdrop-blur-md border-b border-white/5"
            : "bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <BrandLogo href="/" size="md" variant={transparentTop ? "light" : "default"} />

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-1 xl:gap-2">
              {/* Home */}
              <Link
                href="/"
                className={cn(
                  "px-3 py-2 rounded-lg text-sm font-semibold transition-colors",
                  navLinkClass(pathname === "/", transparentTop)
                )}
              >
                {t("nav.home")}
              </Link>

              {/* TABBED SERVICES MEGA MENU (Services, Country & City Architecture) */}
              <div
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
                onBlur={(e) => handleMenuBlur(e, setServicesOpen)}
                onKeyDown={(e) => handleMenuKeyDown(e, setServicesOpen)}
              >
                <button
                  aria-haspopup="true"
                  aria-expanded={servicesOpen}
                  onFocus={() => setServicesOpen(true)}
                  className={cn(
                    "flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-semibold transition-colors",
                    navLinkClass(pathname.startsWith("/services"), transparentTop)
                  )}
                >
                  <span>{t("nav.services")}</span>
                  <ChevronDown className="h-4 w-4 opacity-70" />
                </button>

                {servicesOpen && (
                  <div className="absolute top-full left-0 sm:-left-8 lg:-left-12 w-[760px] max-w-[90vw] pt-2 animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                    <div className="rounded-2xl bg-white dark:bg-slate-900 shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden max-h-[calc(100vh-110px)] overflow-y-auto">
                      <div className="grid grid-cols-12">
                        {/* Left Tabbed Sidebar */}
                        <div className="col-span-4 bg-slate-50/90 dark:bg-slate-950/70 p-3 border-r border-slate-200 dark:border-slate-800 flex flex-col justify-between gap-3">
                          <div className="space-y-1">
                            {/* Tab 1: Main Service */}
                            <button
                              onMouseEnter={() => setActiveServiceTab("main")}
                              onClick={() => setActiveServiceTab("main")}
                              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left ${
                                activeServiceTab === "main"
                                  ? "bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm border border-blue-500/30"
                                  : "text-slate-700 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-slate-900/40"
                              }`}
                            >
                              <Box className="h-4 w-4 shrink-0 text-blue-600 dark:text-blue-400" />
                              <span>Main Service</span>
                            </button>

                            {/* Tab 2: Country Guide */}
                            <button
                              onMouseEnter={() => setActiveServiceTab("country")}
                              onClick={() => setActiveServiceTab("country")}
                              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left ${
                                activeServiceTab === "country"
                                  ? "bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm border border-blue-500/30"
                                  : "text-slate-700 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-slate-900/40"
                              }`}
                            >
                              <Globe className="h-4 w-4 shrink-0 text-indigo-600 dark:text-indigo-400" />
                              <span>Country Guide</span>
                            </button>

                            {/* Tab 3: City Guide */}
                            <button
                              onMouseEnter={() => setActiveServiceTab("city")}
                              onClick={() => setActiveServiceTab("city")}
                              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left ${
                                activeServiceTab === "city"
                                  ? "bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm border border-blue-500/30"
                                  : "text-slate-700 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-slate-900/40"
                              }`}
                            >
                              <MapPin className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                              <span>City Guide</span>
                            </button>
                          </div>

                          {/* Left Bottom Expert Card */}
                          <div className="pt-2 border-t border-slate-200/80 dark:border-slate-800">
                            <div className="p-2.5 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/40 space-y-1">
                              <div className="flex items-center gap-1.5 text-blue-700 dark:text-blue-300 font-bold text-xs">
                                <Headphones className="h-3.5 w-3.5 text-blue-600" />
                                <span>Freight Advisory Desk</span>
                              </div>
                              <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">
                                Direct advice on DDP shipping, HS customs &amp; routing.
                              </p>
                              <button
                                onClick={() => openQuoteModal()}
                                className="inline-flex items-center gap-1 text-[10px] font-bold text-blue-600 dark:text-blue-400 hover:underline pt-0.5"
                              >
                                <span>Contact our experts &rarr;</span>
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Right Content Panel */}
                        <div className="col-span-8 p-3.5 sm:p-4 flex flex-col justify-between gap-3">
                          {/* PANEL A: MAIN 6 SERVICES */}
                          {activeServiceTab === "main" && (
                            <div className="space-y-3 animate-in fade-in duration-150">
                              {/* 6 Core Services in 2 Columns */}
                              <div className="grid grid-cols-2 gap-2">
                                {/* Service 1: Air Freight */}
                                <Link
                                  href="/services/air-freight"
                                  className="flex items-start justify-between p-2.5 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-blue-200 dark:hover:border-blue-900/60 hover:bg-blue-50/30 dark:hover:bg-blue-950/20 transition-all group"
                                >
                                  <div className="flex items-start gap-2.5 min-w-0">
                                    <div className="p-1.5 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 group-hover:scale-105 transition-transform shrink-0">
                                      <Plane className="h-4 w-4" />
                                    </div>
                                    <div className="min-w-0">
                                      <h4 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                                        Air freight
                                      </h4>
                                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-tight line-clamp-2">
                                        Fast and reliable air cargo shipping worldwide.
                                      </p>
                                    </div>
                                  </div>
                                  <ChevronRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all mt-0.5 shrink-0" />
                                </Link>

                                {/* Service 2: Rail Freight */}
                                <Link
                                  href="/services/rail-freight"
                                  className="flex items-start justify-between p-2.5 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-blue-200 dark:hover:border-blue-900/60 hover:bg-blue-50/30 dark:hover:bg-blue-950/20 transition-all group"
                                >
                                  <div className="flex items-start gap-2.5 min-w-0">
                                    <div className="p-1.5 rounded-lg bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 group-hover:scale-105 transition-transform shrink-0">
                                      <Train className="h-4 w-4" />
                                    </div>
                                    <div className="min-w-0">
                                      <h4 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                                        Rail freight
                                      </h4>
                                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-tight line-clamp-2">
                                        China-Europe railway express routes.
                                      </p>
                                    </div>
                                  </div>
                                  <ChevronRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all mt-0.5 shrink-0" />
                                </Link>

                                {/* Service 3: Sea Freight */}
                                <Link
                                  href="/services/sea-freight"
                                  className="flex items-start justify-between p-2.5 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-blue-200 dark:hover:border-blue-900/60 hover:bg-blue-50/30 dark:hover:bg-blue-950/20 transition-all group"
                                >
                                  <div className="flex items-start gap-2.5 min-w-0">
                                    <div className="p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 group-hover:scale-105 transition-transform shrink-0">
                                      <Ship className="h-4 w-4" />
                                    </div>
                                    <div className="min-w-0">
                                      <h4 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                                        Sea freight
                                      </h4>
                                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-tight line-clamp-2">
                                        Cost-effective FCL and LCL ocean shipping.
                                      </p>
                                    </div>
                                  </div>
                                  <ChevronRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all mt-0.5 shrink-0" />
                                </Link>

                                {/* Service 4: Trucking Freight */}
                                <Link
                                  href="/services/trucking-freight"
                                  className="flex items-start justify-between p-2.5 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-blue-200 dark:hover:border-blue-900/60 hover:bg-blue-50/30 dark:hover:bg-blue-950/20 transition-all group"
                                >
                                  <div className="flex items-start gap-2.5 min-w-0">
                                    <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 group-hover:scale-105 transition-transform shrink-0">
                                      <Truck className="h-4 w-4" />
                                    </div>
                                    <div className="min-w-0">
                                      <h4 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                                        Trucking freight
                                      </h4>
                                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-tight line-clamp-2">
                                        Cross-border inland haulage and cartage.
                                      </p>
                                    </div>
                                  </div>
                                  <ChevronRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all mt-0.5 shrink-0" />
                                </Link>

                                {/* Service 5: DDP Freight */}
                                <Link
                                  href="/services/ddp-shipping"
                                  className="flex items-start justify-between p-2.5 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-blue-200 dark:hover:border-blue-900/60 hover:bg-blue-50/30 dark:hover:bg-blue-950/20 transition-all group"
                                >
                                  <div className="flex items-start gap-2.5 min-w-0">
                                    <div className="p-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 group-hover:scale-105 transition-transform shrink-0">
                                      <Box className="h-4 w-4" />
                                    </div>
                                    <div className="min-w-0">
                                      <h4 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                                        DDP freight
                                      </h4>
                                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-tight line-clamp-2">
                                        Door-to-door with all duties &amp; tax paid.
                                      </p>
                                    </div>
                                  </div>
                                  <ChevronRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all mt-0.5 shrink-0" />
                                </Link>

                                {/* Service 6: Express Courier */}
                                <Link
                                  href="/services/express-courier"
                                  className="flex items-start justify-between p-2.5 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-blue-200 dark:hover:border-blue-900/60 hover:bg-blue-50/30 dark:hover:bg-blue-950/20 transition-all group"
                                >
                                  <div className="flex items-start gap-2.5 min-w-0">
                                    <div className="p-1.5 rounded-lg bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 group-hover:scale-105 transition-transform shrink-0">
                                      <Clock className="h-4 w-4" />
                                    </div>
                                    <div className="min-w-0">
                                      <h4 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                                        Express Courier
                                      </h4>
                                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-tight line-clamp-2">
                                        DHL, FedEx, UPS priority global dispatch.
                                      </p>
                                    </div>
                                  </div>
                                  <ChevronRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all mt-0.5 shrink-0" />
                                </Link>
                              </div>

                              {/* Bottom Trust Feature Bar */}
                              <div className="pt-2.5 border-t border-slate-100 dark:border-slate-800 grid grid-cols-3 gap-2">
                                <div className="flex items-center gap-2">
                                  <ShieldCheck className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0" />
                                  <div className="min-w-0">
                                    <h5 className="text-[11px] font-bold text-slate-900 dark:text-white truncate">Reliable &amp; Secure</h5>
                                    <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-none truncate">
                                      100% insured cargo.
                                    </p>
                                  </div>
                                </div>

                                <div className="flex items-center gap-2">
                                  <Clock className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0" />
                                  <div className="min-w-0">
                                    <h5 className="text-[11px] font-bold text-slate-900 dark:text-white truncate">On-time Delivery</h5>
                                    <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-none truncate">
                                      Punctual milestone updates.
                                    </p>
                                  </div>
                                </div>

                                <div className="flex items-center gap-2">
                                  <Headphones className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0" />
                                  <div className="min-w-0">
                                    <h5 className="text-[11px] font-bold text-slate-900 dark:text-white truncate">24/7 Support</h5>
                                    <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-none truncate">
                                      Direct WeChat &amp; WhatsApp.
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* PANEL B: COUNTRY GUIDE */}
                          {activeServiceTab === "country" && (
                            <div className="space-y-3 animate-in fade-in duration-150">
                              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                                <div>
                                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                                    Global Destinations &amp; DDP Trade Lanes
                                  </h4>
                                  <p className="text-[11px] text-slate-500">
                                    Customs clearance &amp; port routing for 44+ destination countries.
                                  </p>
                                </div>
                                <Link
                                  href="/routes"
                                  className="text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                                >
                                  <span>View All 44+</span>
                                  <ArrowRight className="h-3 w-3" />
                                </Link>
                              </div>

                              <div className="grid grid-cols-3 gap-2">
                                {topTierRoutes.map((route) => (
                                  <Link
                                    key={route.code}
                                    href={`/routes/${route.slug}`}
                                    className="p-2 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-blue-200 dark:hover:border-blue-900/60 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors flex items-center justify-between group"
                                  >
                                    <div className="flex items-center gap-1.5 min-w-0">
                                      <span className="text-base shrink-0">{route.flag}</span>
                                      <div className="truncate">
                                        <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 truncate">
                                          {route.name}
                                        </div>
                                        <div className="text-[10px] text-slate-400 truncate">
                                          {route.region}
                                        </div>
                                      </div>
                                    </div>
                                    <span className="font-mono text-[10px] text-slate-400 font-semibold shrink-0 ml-1">
                                      {route.code}
                                    </span>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* PANEL C: CITY GUIDE */}
                          {activeServiceTab === "city" && (
                            <div className="space-y-4 animate-in fade-in duration-150">
                              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                                <div>
                                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                                    China Origin Manufacturing Hubs &amp; Consolidation
                                  </h4>
                                  <p className="text-xs text-slate-500">
                                    Local factory pickup fleets, bonded CFS warehouses, and port gate-in terminals.
                                  </p>
                                </div>
                                <Link
                                  href="/origins"
                                  className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                                >
                                  <span>View All 7 Hubs</span>
                                  <ArrowRight className="h-3 w-3" />
                                </Link>
                              </div>

                              <div className="grid grid-cols-2 gap-3">
                                {ORIGIN_HUBS.map((hub) => (
                                  <Link
                                    key={hub.id}
                                    href={`/origins/${hub.slug}`}
                                    className="p-3 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-blue-200 dark:hover:border-blue-900/60 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors flex items-center justify-between group"
                                  >
                                    <div>
                                      <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                                        <span>{hub.name}</span>
                                        {hub.id === "shenzhen" && (
                                          <span className="bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-[10px] px-1.5 py-0.2 rounded font-bold">
                                            HQ Center
                                          </span>
                                        )}
                                      </div>
                                      <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                                        {hub.chineseName} • {hub.province} Province
                                      </div>
                                    </div>
                                    <span className="text-[10px] font-mono text-blue-600 dark:text-blue-400 font-bold">
                                      {hub.pickup.averageDispatchHours}h dispatch
                                    </span>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* TOOLS MEGA MENU (All 10 Working Tools) */}
              <div
                className="relative"
                onMouseEnter={() => setToolsOpen(true)}
                onMouseLeave={() => setToolsOpen(false)}
                onBlur={(e) => handleMenuBlur(e, setToolsOpen)}
                onKeyDown={(e) => handleMenuKeyDown(e, setToolsOpen)}
              >
                <button
                  aria-haspopup="true"
                  aria-expanded={toolsOpen}
                  onFocus={() => setToolsOpen(true)}
                  className={cn(
                    "flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-semibold transition-colors",
                    navLinkClass(pathname.startsWith("/tools"), transparentTop)
                  )}
                >
                  <span>{t("nav.tools")}</span>
                  <ChevronDown className="h-4 w-4 opacity-70" />
                </button>

                {toolsOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-[760px] pt-2 animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                    <div className="rounded-2xl bg-white dark:bg-slate-900 shadow-2xl border border-slate-200 dark:border-slate-800 p-5">
                      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-3">
                        <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                          <Calculator className="h-4 w-4 text-blue-600" />
                          Logistics Calculators &amp; Web Utilities (10 Working Tools)
                        </span>
                        <Link
                          href="/tools"
                          className="text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          Explore All Tools &rarr;
                        </Link>
                      </div>

                      <div className="grid grid-cols-2 gap-2.5">
                        {/* Tool 1 */}
                        <Link
                          href="/tools/volumetric-calculator"
                          className="flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors group"
                        >
                          <div className="p-2 rounded-lg bg-sky-50 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 shrink-0">
                            <Scale className="h-4 w-4" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-blue-600">
                              Volumetric Weight Calculator
                            </div>
                            <div className="text-[11px] text-slate-500">
                              Air 6000 vs Express 5000 &amp; CBM
                            </div>
                          </div>
                        </Link>

                        {/* Tool 2 */}
                        <Link
                          href="/tools/tracking"
                          className="flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors group"
                        >
                          <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 shrink-0">
                            <Search className="h-4 w-4" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-blue-600">
                              Cargo &amp; Express Tracking
                            </div>
                            <div className="text-[11px] text-slate-500">
                              DHL, FedEx, UPS &amp; JCD NVOCC Waybills
                            </div>
                          </div>
                        </Link>

                        {/* Tool 3 */}
                        <Link
                          href="/tools/container-loading-calculator"
                          className="flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors group"
                        >
                          <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 shrink-0">
                            <Box className="h-4 w-4" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-blue-600">
                              3D Container Loading Planner
                            </div>
                            <div className="text-[11px] text-slate-500">
                              Interactive 3D 20GP/40HQ simulation
                            </div>
                          </div>
                        </Link>

                        {/* Tool 4 */}
                        <Link
                          href="/tools/flight-route-calculator"
                          className="flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors group"
                        >
                          <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 shrink-0">
                            <Plane className="h-4 w-4" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-blue-600">
                              Flight Route &amp; Transit Calc
                            </div>
                            <div className="text-[11px] text-slate-500">
                              Air distances &amp; flight schedules
                            </div>
                          </div>
                        </Link>

                        {/* Tool 5 */}
                        <Link
                          href="/tools/shipping-unit-converter"
                          className="flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors group"
                        >
                          <div className="p-2 rounded-lg bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 shrink-0">
                            <Ruler className="h-4 w-4" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-blue-600">
                              Shipping Unit Converter
                            </div>
                            <div className="text-[11px] text-slate-500">
                              kg, lbs, CBM, cu ft, cm &amp; inches
                            </div>
                          </div>
                        </Link>

                        {/* Tool 6 */}
                        <Link
                          href="/tools/china-hs-code"
                          className="flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors group"
                        >
                          <div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 shrink-0">
                            <ShieldCheck className="h-4 w-4" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-blue-600">
                              China HS Code &amp; Tariff Finder
                            </div>
                            <div className="text-[11px] text-slate-500">
                              Customs codes &amp; export VAT rebates
                            </div>
                          </div>
                        </Link>

                        {/* Tool 7 */}
                        <Link
                          href="/tools/proforma-invoice-generator"
                          className="flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors group"
                        >
                          <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 shrink-0">
                            <FileText className="h-4 w-4" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-blue-600">
                              Proforma Invoice Generator
                            </div>
                            <div className="text-[11px] text-slate-500">
                              Commercial trade invoice &amp; PDF export
                            </div>
                          </div>
                        </Link>

                        {/* Tool 8 */}
                        <Link
                          href="/tools/packing-list-generator"
                          className="flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors group"
                        >
                          <div className="p-2 rounded-lg bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 shrink-0">
                            <ClipboardList className="h-4 w-4" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-blue-600">
                              Packing List Generator
                            </div>
                            <div className="text-[11px] text-slate-500">
                              Carton tally, weights &amp; PDF manifest
                            </div>
                          </div>
                        </Link>

                        {/* Tool 9 */}
                        <Link
                          href="/tools/seaports"
                          className="flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors group"
                        >
                          <div className="p-2 rounded-lg bg-cyan-50 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400 shrink-0">
                            <Anchor className="h-4 w-4" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-blue-600">
                              World Seaports Directory
                            </div>
                            <div className="text-[11px] text-slate-500">
                              UN/LOCODE registry &amp; sailing transits
                            </div>
                          </div>
                        </Link>

                        {/* Tool 10 */}
                        <Link
                          href="/tools/incoterms"
                          className="flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors group"
                        >
                          <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 shrink-0">
                            <Compass className="h-4 w-4" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-blue-600">
                              Incoterms 2020 Matrix
                            </div>
                            <div className="text-[11px] text-slate-500">
                              All 11 terms comparison &amp; risks
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Country Routes */}
              <div
                className="relative"
                onMouseEnter={() => setRoutesOpen(true)}
                onMouseLeave={() => setRoutesOpen(false)}
                onBlur={(e) => handleMenuBlur(e, setRoutesOpen)}
                onKeyDown={(e) => handleMenuKeyDown(e, setRoutesOpen)}
              >
                <button
                  aria-haspopup="true"
                  aria-expanded={routesOpen}
                  onFocus={() => setRoutesOpen(true)}
                  className={cn(
                    "flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-semibold transition-colors",
                    navLinkClass(pathname.startsWith("/routes"), transparentTop)
                  )}
                >
                  <span>{t("nav.routes")}</span>
                  <ChevronDown className="h-4 w-4 opacity-70" />
                </button>

                {routesOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-[520px] pt-2 animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                    <div className="rounded-2xl bg-white dark:bg-slate-900 shadow-xl border border-slate-200 dark:border-slate-800 p-4">
                      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-3">
                        <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                          <Globe className="h-4 w-4 text-blue-600" />
                          44 Global Trade Lanes (China Sourcing)
                        </span>
                        <span className="text-[11px] text-blue-600 dark:text-blue-400 font-semibold">
                          DDP Pre-Cleared
                        </span>
                      </div>

                      <div className="grid grid-cols-3 gap-2">
                        {topTierRoutes.map((route) => (
                          <Link
                            key={route.code}
                            href={`/routes/${route.slug}`}
                            className="flex items-center justify-between gap-1.5 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors text-xs group"
                          >
                            <span className="flex items-center gap-1.5 truncate">
                              <span className="text-base shrink-0">{route.flag}</span>
                              <span className="font-bold text-slate-900 dark:text-white group-hover:text-blue-600 truncate">
                                {route.name}
                              </span>
                            </span>
                            <span className="font-mono text-[10px] text-slate-400 shrink-0">
                              {route.code}
                            </span>
                          </Link>
                        ))}
                      </div>

                      <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                        <span className="text-xs text-slate-500">
                          Covering North America, Europe, Asia-Pacific &amp; Middle East
                        </span>
                        <Link
                          href="/routes"
                          className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                        >
                          <span>Explore All 44 Routes</span>
                          <ArrowRight className="h-3 w-3" />
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Origin Hubs */}
              <div
                className="relative"
                onMouseEnter={() => setOriginsOpen(true)}
                onMouseLeave={() => setOriginsOpen(false)}
                onBlur={(e) => handleMenuBlur(e, setOriginsOpen)}
                onKeyDown={(e) => handleMenuKeyDown(e, setOriginsOpen)}
              >
                <button
                  aria-haspopup="true"
                  aria-expanded={originsOpen}
                  onFocus={() => setOriginsOpen(true)}
                  className={cn(
                    "flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-semibold transition-colors",
                    navLinkClass(pathname.startsWith("/origins"), transparentTop)
                  )}
                >
                  <span>{t("nav.origins")}</span>
                  <ChevronDown className="h-4 w-4 opacity-70" />
                </button>

                {originsOpen && (
                  <div className="absolute top-full left-0 w-80 pt-2 animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                    <div className="rounded-2xl bg-white dark:bg-slate-900 shadow-xl border border-slate-200 dark:border-slate-800 p-2 space-y-1">
                      {ORIGIN_HUBS.map((hub) => (
                        <Link
                          key={hub.id}
                          href={`/origins/${hub.slug}`}
                          className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
                        >
                          <div>
                            <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                              <span>{hub.name}</span>
                              {hub.id === "shenzhen" && (
                                <span className="bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-[10px] px-1.5 py-0.2 rounded font-bold">
                                  HQ
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] text-slate-500 dark:text-slate-400">
                              {hub.chineseName} • {hub.seaports[0]?.name || "Port"}
                            </div>
                          </div>
                          <span className="text-[10px] font-mono text-blue-600 dark:text-blue-400 font-semibold">
                            {hub.pickup.averageDispatchHours}h dispatch
                          </span>
                        </Link>
                      ))}

                      <div className="border-t border-slate-100 dark:border-slate-800 pt-2 px-2">
                        <Link
                          href="/origins"
                          className="flex items-center justify-between text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline py-1"
                        >
                          <span>Explore All 7 Origin Hubs</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* About Us */}
              <Link
                href="/about-us"
                className={cn(
                  "px-3 py-2 rounded-lg text-sm font-semibold transition-colors",
                  navLinkClass(pathname === "/about-us", transparentTop)
                )}
              >
                {t("nav.aboutUs")}
              </Link>

              {/* Contact */}
              <Link
                href="/contact"
                className={cn(
                  "px-3 py-2 rounded-lg text-sm font-semibold transition-colors",
                  navLinkClass(pathname === "/contact", transparentTop)
                )}
              >
                {t("nav.contact")}
              </Link>
            </div>

            {/* Right Action: Language Switcher & Get Instant Quote Button */}
            <div className="hidden lg:flex items-center gap-3">
              <LanguageSwitcher transparentTop={transparentTop} />
              <button
                onClick={() => openQuoteModal()}
                className="flex items-center gap-2 rounded-xl bg-orange-600 hover:bg-orange-700 px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-orange-600/20 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <Calculator className="h-4 w-4" />
                <span>{t("nav.instantQuote")}</span>
              </button>
            </div>

            {/* Mobile Hamburger Toggle & Language Switcher */}
            <div className="flex lg:hidden items-center gap-2">
              <LanguageSwitcher transparentTop={transparentTop} />
              <button
                onClick={() => openQuoteModal()}
                className="rounded-lg bg-orange-600 px-3 py-1.5 text-xs font-bold text-white shadow-sm cursor-pointer"
              >
                {t("nav.quote")}
              </button>
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger
                  aria-label="Toggle navigation menu"
                  aria-expanded={mobileMenuOpen}
                  className={cn(
                    "rounded-lg p-2 transition-colors",
                    transparentTop
                      ? "text-white hover:bg-white/10"
                      : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                  )}
                >
                  <Menu className="h-6 w-6" />
                </SheetTrigger>

                {/* 3. MOBILE RESPONSIVE MENU DRAWER */}
                <SheetContent side="right" className="w-full sm:max-w-sm p-0 flex flex-col gap-0">
                  <div className="border-b border-slate-100 dark:border-slate-800 p-4">
                    <BrandLogo href="/" size="sm" showText={false} />
                  </div>
                  <div className="flex-1 overflow-y-auto px-4 pt-4 pb-6 space-y-4">
            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openQuoteModal();
                }}
                className="flex items-center justify-center gap-1.5 rounded-xl bg-orange-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm cursor-pointer"
              >
                <Calculator className="h-4 w-4" />
                <span>{t("nav.getQuote")}</span>
              </button>

              <a
                href={getWhatsAppUrl("Hello JCD Forwarder, I need immediate shipping assistance.")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm"
              >
                <MessageCircle className="h-4 w-4" />
                <span>{t("hero.whatsappDispatch")}</span>
              </a>
            </div>

            {/* Services Accordion (All 6 Services) */}
            <div className="border-t border-slate-100 dark:border-slate-800 pt-3">
              <button
                onClick={() =>
                  setMobileSection(mobileSection === "services" ? null : "services")
                }
                className="flex w-full items-center justify-between text-sm font-bold text-slate-900 dark:text-white py-1"
              >
                <span>Core Freight Services (6 Modes)</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    mobileSection === "services" ? "rotate-180" : ""
                  }`}
                />
              </button>

              {mobileSection === "services" && (
                <div className="mt-2 pl-2 space-y-2 text-xs border-l-2 border-blue-500">
                  <Link href="/services/air-freight" className="block py-1 text-slate-600 dark:text-slate-300 font-medium">
                    ✈️ Air Freight (Direct Flights &amp; Battery DDP)
                  </Link>
                  <Link href="/services/sea-freight" className="block py-1 text-slate-600 dark:text-slate-300 font-medium">
                    🚢 Sea Freight (20GP / 40HQ FCL &amp; LCL)
                  </Link>
                  <Link href="/services/rail-freight" className="block py-1 text-slate-600 dark:text-slate-300 font-medium">
                    🚆 Rail Freight (China-Europe Railway Express)
                  </Link>
                  <Link href="/services/ddp-shipping" className="block py-1 text-slate-600 dark:text-slate-300 font-medium">
                    📦 DDP Shipping (Door-to-Door All Duties Paid)
                  </Link>
                  <Link href="/services/trucking-freight" className="block py-1 text-slate-600 dark:text-slate-300 font-medium">
                    🚛 Trucking Freight (Inland Cartage &amp; TIR Linehaul)
                  </Link>
                  <Link href="/services/express-courier" className="block py-1 text-slate-600 dark:text-slate-300 font-medium">
                    ⏱️ Express Courier (DHL / FedEx / UPS Priority)
                  </Link>
                </div>
              )}
            </div>

            {/* Tools Accordion (All 10 Tools) */}
            <div className="border-t border-slate-100 dark:border-slate-800 pt-3">
              <button
                onClick={() =>
                  setMobileSection(mobileSection === "tools" ? null : "tools")
                }
                className="flex w-full items-center justify-between text-sm font-bold text-slate-900 dark:text-white py-1"
              >
                <span>Interactive Logistics Tools (10 Tools)</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    mobileSection === "tools" ? "rotate-180" : ""
                  }`}
                />
              </button>

              {mobileSection === "tools" && (
                <div className="mt-2 pl-2 space-y-2 text-xs border-l-2 border-blue-500">
                  <Link href="/tools/volumetric-calculator" className="block py-1 text-slate-600 dark:text-slate-300 font-medium">
                    ⚖️ Volumetric Weight Calculator
                  </Link>
                  <Link href="/tools/tracking" className="block py-1 text-slate-600 dark:text-slate-300 font-medium">
                    🔍 Cargo &amp; Express Tracking
                  </Link>
                  <Link href="/tools/container-loading-calculator" className="block py-1 text-slate-600 dark:text-slate-300 font-medium">
                    📦 3D Container Loading Simulator
                  </Link>
                  <Link href="/tools/flight-route-calculator" className="block py-1 text-slate-600 dark:text-slate-300 font-medium">
                    ✈️ Flight Transit &amp; Route Calculator
                  </Link>
                  <Link href="/tools/shipping-unit-converter" className="block py-1 text-slate-600 dark:text-slate-300 font-medium">
                    📏 Shipping Unit Converter
                  </Link>
                  <Link href="/tools/china-hs-code" className="block py-1 text-slate-600 dark:text-slate-300 font-medium">
                    🛡️ China HS Code &amp; Tariff Finder
                  </Link>
                  <Link href="/tools/proforma-invoice-generator" className="block py-1 text-slate-600 dark:text-slate-300 font-medium">
                    📄 Proforma Invoice Generator (PDF)
                  </Link>
                  <Link href="/tools/packing-list-generator" className="block py-1 text-slate-600 dark:text-slate-300 font-medium">
                    📋 Packing List Generator (PDF)
                  </Link>
                  <Link href="/tools/seaports" className="block py-1 text-slate-600 dark:text-slate-300 font-medium">
                    ⚓ World Seaports Directory
                  </Link>
                  <Link href="/tools/incoterms" className="block py-1 text-slate-600 dark:text-slate-300 font-medium">
                    🧭 Incoterms 2020 Matrix
                  </Link>
                </div>
              )}
            </div>

            {/* Country Routes Accordion */}
            <div className="border-t border-slate-100 dark:border-slate-800 pt-3">
              <button
                onClick={() =>
                  setMobileSection(mobileSection === "routes" ? null : "routes")
                }
                className="flex w-full items-center justify-between text-sm font-bold text-slate-900 dark:text-white py-1"
              >
                <span>Country Shipping Routes (44 Lanes)</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    mobileSection === "routes" ? "rotate-180" : ""
                  }`}
                />
              </button>

              {mobileSection === "routes" && (
                <div className="mt-2 pl-2 space-y-1 text-xs border-l-2 border-blue-500">
                  <div className="grid grid-cols-2 gap-1 py-1">
                    {topTierRoutes.map((r) => (
                      <Link
                        key={r.code}
                        href={`/routes/${r.slug}`}
                        className="py-1 text-slate-600 dark:text-slate-300 font-medium hover:text-blue-600 flex items-center gap-1.5"
                      >
                        <span className="text-sm shrink-0">{r.flag}</span>
                        <span className="truncate">{r.name} ({r.code})</span>
                      </Link>
                    ))}
                  </div>
                  <Link href="/routes" className="block py-1.5 text-blue-600 font-bold hover:underline">
                    View All 44 Country Routes &rarr;
                  </Link>
                </div>
              )}
            </div>

            {/* General Links */}
            <div className="border-t border-slate-100 dark:border-slate-800 pt-3 space-y-2 text-sm font-semibold">
              <Link href="/origins" className="block py-1 text-slate-700 dark:text-slate-200">
                {t("nav.origins")}
              </Link>
              <Link href="/about-us" className="block py-1 text-slate-700 dark:text-slate-200">
                {t("nav.aboutUs")}
              </Link>
              <Link href="/contact" className="block py-1 text-slate-700 dark:text-slate-200">
                {t("nav.contact")}
              </Link>
            </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
