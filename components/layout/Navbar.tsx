"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SITE_CONFIG, getWhatsAppUrl } from "@/data/siteConfig";
import { ORIGIN_HUBS } from "@/data/origins";
import { TARGET_ROUTES } from "@/data/routes";
import { useQuoteModal } from "@/components/quote/QuoteModalContext";
import { BrandLogo } from "@/components/layout/BrandLogo";
import {
  ShieldCheck,
  Phone,
  Mail,
  Star,
  MessageCircle,
  Menu,
  X,
  ChevronDown,
  Plane,
  Ship,
  Train,
  Box,
  Calculator,
  Compass,
  Building2,
  MapPin,
  ExternalLink,
  Award,
  Sparkles,
  ArrowRight,
  Globe,
  Layers,
} from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const { openQuoteModal } = useQuoteModal();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Dropdown states for desktop
  const [servicesOpen, setServicesOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [routesOpen, setRoutesOpen] = useState(false);
  const [originsOpen, setOriginsOpen] = useState(false);

  // Mobile accordion state
  const [mobileSection, setMobileSection] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on page transition
  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesOpen(false);
    setToolsOpen(false);
    setRoutesOpen(false);
    setOriginsOpen(false);
  }, [pathname]);

  const topTierRoutes = TARGET_ROUTES.slice(0, 12);

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
              <span className="font-semibold text-white">NVOCC License:</span>
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
              <span>Alibaba Verified Gold Supplier</span>
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
              <span>24/7 WhatsApp Dispatch</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. MAIN NAVIGATION BAR */}
      <nav
        className={`w-full transition-all duration-200 ${
          scrolled
            ? "bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-md border-b border-slate-200/80 dark:border-slate-800"
            : "bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <BrandLogo href="/" size="md" />

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-1 xl:gap-2">
              {/* Services Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <button
                  className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    pathname.startsWith("/services")
                      ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30"
                      : "text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800/60"
                  }`}
                >
                  <span>Services</span>
                  <ChevronDown className="h-4 w-4 opacity-70" />
                </button>

                {servicesOpen && (
                  <div className="absolute top-full left-0 w-80 pt-2 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="rounded-2xl bg-white dark:bg-slate-900 shadow-xl border border-slate-200 dark:border-slate-800 p-2 space-y-1">
                      <Link
                        href="/services/air-freight"
                        className="flex items-start gap-3 p-3 rounded-xl hover:bg-blue-50/70 dark:hover:bg-blue-950/40 transition-colors group"
                      >
                        <div className="h-9 w-9 rounded-lg bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                          <Plane className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-slate-900 dark:text-white">
                            Air Freight &amp; Battery DDP
                          </div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">
                            CAN/SZX express flights &amp; UN38.3 pure battery lines
                          </div>
                        </div>
                      </Link>

                      <Link
                        href="/services/sea-freight-fcl-lcl"
                        className="flex items-start gap-3 p-3 rounded-xl hover:bg-blue-50/70 dark:hover:bg-blue-950/40 transition-colors group"
                      >
                        <div className="h-9 w-9 rounded-lg bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                          <Ship className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-slate-900 dark:text-white">
                            Ocean Freight (FCL &amp; LCL)
                          </div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">
                            20GP/40HQ containers &amp; 15-step consolidation SOP
                          </div>
                        </div>
                      </Link>

                      <Link
                        href="/services/rail-freight"
                        className="flex items-start gap-3 p-3 rounded-xl hover:bg-blue-50/70 dark:hover:bg-blue-950/40 transition-colors group"
                      >
                        <div className="h-9 w-9 rounded-lg bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                          <Train className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-slate-900 dark:text-white">
                            China-Europe Rail Express
                          </div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">
                            West/Central/East corridors &amp; Yixinou rail lines
                          </div>
                        </div>
                      </Link>

                      <Link
                        href="/services/amazon-fba-logistics"
                        className="flex items-start gap-3 p-3 rounded-xl hover:bg-blue-50/70 dark:hover:bg-blue-950/40 transition-colors group"
                      >
                        <div className="h-9 w-9 rounded-lg bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                          <Box className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-slate-900 dark:text-white">
                            Amazon FBA First-Leg
                          </div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">
                            CARP/ISA booking, FNSKU prep &amp; GMA/EPAL pallets
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Tools Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setToolsOpen(true)}
                onMouseLeave={() => setToolsOpen(false)}
              >
                <button
                  className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    pathname.startsWith("/tools")
                      ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30"
                      : "text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800/60"
                  }`}
                >
                  <span>Tools</span>
                  <ChevronDown className="h-4 w-4 opacity-70" />
                </button>

                {toolsOpen && (
                  <div className="absolute top-full left-0 w-80 pt-2 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="rounded-2xl bg-white dark:bg-slate-900 shadow-xl border border-slate-200 dark:border-slate-800 p-2 space-y-1">
                      <Link
                        href="/tools/container-loading-calculator"
                        className="flex items-start gap-3 p-3 rounded-xl hover:bg-blue-50/70 dark:hover:bg-blue-950/40 transition-colors group"
                      >
                        <div className="h-9 w-9 rounded-lg bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                          <Layers className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-slate-900 dark:text-white">
                            3D Container Simulator
                          </div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">
                            Interactive 3D cargo packing &amp; CBM utilization
                          </div>
                        </div>
                      </Link>

                      <Link
                        href="/tools/volumetric-calculator"
                        className="flex items-start gap-3 p-3 rounded-xl hover:bg-blue-50/70 dark:hover:bg-blue-950/40 transition-colors group"
                      >
                        <div className="h-9 w-9 rounded-lg bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                          <Calculator className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-slate-900 dark:text-white">
                            Volumetric Weight Calc
                          </div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">
                            Compare 1:6000 air vs 1:5000 courier &amp; CBM
                          </div>
                        </div>
                      </Link>

                      <Link
                        href="/tools/incoterms-selector"
                        className="flex items-start gap-3 p-3 rounded-xl hover:bg-blue-50/70 dark:hover:bg-blue-950/40 transition-colors group"
                      >
                        <div className="h-9 w-9 rounded-lg bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                          <Compass className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-slate-900 dark:text-white">
                            Incoterms 2020 Engine
                          </div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">
                            EXW, FOB, CIF, DDU vs DDP cost &amp; risk matrix
                          </div>
                        </div>
                      </Link>

                      <div className="border-t border-slate-100 dark:border-slate-800 pt-2 px-2">
                        <Link
                          href="/tools"
                          className="flex items-center justify-between text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline py-1"
                        >
                          <span>Explore All Logistics Tools</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Country Routes Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setRoutesOpen(true)}
                onMouseLeave={() => setRoutesOpen(false)}
              >
                <button
                  className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    pathname.startsWith("/routes")
                      ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30"
                      : "text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800/60"
                  }`}
                >
                  <span>Country Routes</span>
                  <ChevronDown className="h-4 w-4 opacity-70" />
                </button>

                {routesOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-[520px] pt-2 animate-in fade-in slide-in-from-top-2 duration-150">
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
                            className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors text-xs"
                          >
                            <span className="font-bold text-slate-900 dark:text-white">
                              {route.name}
                            </span>
                            <span className="font-mono text-[10px] text-slate-400">
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
                          <span>Explore All 44 Country Routes</span>
                          <ArrowRight className="h-3 w-3" />
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Origin Hubs Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setOriginsOpen(true)}
                onMouseLeave={() => setOriginsOpen(false)}
              >
                <button
                  className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    pathname.startsWith("/origins")
                      ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30"
                      : "text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800/60"
                  }`}
                >
                  <span>Origin Hubs</span>
                  <ChevronDown className="h-4 w-4 opacity-70" />
                </button>

                {originsOpen && (
                  <div className="absolute top-full left-0 w-80 pt-2 animate-in fade-in slide-in-from-top-2 duration-150">
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

              {/* About Us Link */}
              <Link
                href="/about-us"
                className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  pathname === "/about-us"
                    ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30"
                    : "text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800/60"
                }`}
              >
                About Us
              </Link>

              {/* Contact Link */}
              <Link
                href="/contact"
                className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  pathname === "/contact"
                    ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30"
                    : "text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800/60"
                }`}
              >
                Contact
              </Link>
            </div>

            {/* Right Action: Quick "Get Instant Quote" Button */}
            <div className="hidden lg:flex items-center gap-3">
              <button
                onClick={() => openQuoteModal()}
                className="flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-blue-600/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Sparkles className="h-4 w-4" />
                <span>Instant Quote</span>
              </button>
            </div>

            {/* Mobile Hamburger Toggle */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={() => openQuoteModal()}
                className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-bold text-white shadow-sm"
              >
                Quote
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="rounded-lg p-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* 3. MOBILE RESPONSIVE MENU DRAWER */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 pt-2 pb-6 space-y-4 animate-in slide-in-from-top-4 duration-200 max-h-[85vh] overflow-y-auto">
            {/* Quick Actions in Mobile Drawer */}
            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openQuoteModal();
                }}
                className="flex items-center justify-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm"
              >
                <Sparkles className="h-4 w-4" />
                <span>Get Instant Quote</span>
              </button>

              <a
                href={getWhatsAppUrl("Hello JCD Forwarder, I need immediate shipping assistance.")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm"
              >
                <MessageCircle className="h-4 w-4" />
                <span>WhatsApp 24/7</span>
              </a>
            </div>

            {/* Services Accordion */}
            <div className="border-t border-slate-100 dark:border-slate-800 pt-3">
              <button
                onClick={() =>
                  setMobileSection(mobileSection === "services" ? null : "services")
                }
                className="flex w-full items-center justify-between text-sm font-bold text-slate-900 dark:text-white py-1"
              >
                <span>Core Freight Services</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    mobileSection === "services" ? "rotate-180" : ""
                  }`}
                />
              </button>

              {mobileSection === "services" && (
                <div className="mt-2 pl-2 space-y-2 text-xs border-l-2 border-blue-500">
                  <Link
                    href="/services/air-freight"
                    className="block py-1 text-slate-600 dark:text-slate-300 font-medium"
                  >
                    ✈️ Air Freight &amp; Battery DDP (CAN / SZX)
                  </Link>
                  <Link
                    href="/services/sea-freight-fcl-lcl"
                    className="block py-1 text-slate-600 dark:text-slate-300 font-medium"
                  >
                    🚢 Ocean Freight (20GP / 40HQ FCL &amp; LCL)
                  </Link>
                  <Link
                    href="/services/rail-freight"
                    className="block py-1 text-slate-600 dark:text-slate-300 font-medium"
                  >
                    🚆 China-Europe Railway Express (CR Express)
                  </Link>
                  <Link
                    href="/services/amazon-fba-logistics"
                    className="block py-1 text-slate-600 dark:text-slate-300 font-medium"
                  >
                    📦 Amazon FBA First-Leg Logistics &amp; Prep
                  </Link>
                </div>
              )}
            </div>

            {/* Tools Accordion */}
            <div className="border-t border-slate-100 dark:border-slate-800 pt-3">
              <button
                onClick={() =>
                  setMobileSection(mobileSection === "tools" ? null : "tools")
                }
                className="flex w-full items-center justify-between text-sm font-bold text-slate-900 dark:text-white py-1"
              >
                <span>Interactive Logistics Tools</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    mobileSection === "tools" ? "rotate-180" : ""
                  }`}
                />
              </button>

              {mobileSection === "tools" && (
                <div className="mt-2 pl-2 space-y-2 text-xs border-l-2 border-indigo-500">
                  <Link
                    href="/tools/container-loading-calculator"
                    className="block py-1 text-slate-600 dark:text-slate-300 font-medium"
                  >
                    🧊 3D Container Loading Simulator
                  </Link>
                  <Link
                    href="/tools/volumetric-calculator"
                    className="block py-1 text-slate-600 dark:text-slate-300 font-medium"
                  >
                    📐 Volumetric Weight Calculator
                  </Link>
                  <Link
                    href="/tools/incoterms-selector"
                    className="block py-1 text-slate-600 dark:text-slate-300 font-medium"
                  >
                    ⚖️ Incoterms 2020 Decision Engine
                  </Link>
                  <Link
                    href="/tools"
                    className="block py-1 text-blue-600 font-bold"
                  >
                    ➔ View All Calculation Tools
                  </Link>
                </div>
              )}
            </div>

            {/* Origin Hubs */}
            <div className="border-t border-slate-100 dark:border-slate-800 pt-3">
              <button
                onClick={() =>
                  setMobileSection(mobileSection === "origins" ? null : "origins")
                }
                className="flex w-full items-center justify-between text-sm font-bold text-slate-900 dark:text-white py-1"
              >
                <span>7 Chinese Sourcing Hubs</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    mobileSection === "origins" ? "rotate-180" : ""
                  }`}
                />
              </button>

              {mobileSection === "origins" && (
                <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                  {ORIGIN_HUBS.map((hub) => (
                    <Link
                      key={hub.id}
                      href={`/origins/${hub.slug}`}
                      className="p-2 rounded bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-200"
                    >
                      <div className="font-bold">{hub.name}</div>
                      <div className="text-[10px] text-slate-500">{hub.seaports[0]?.name || "Port"}</div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Key Routes Quick Links */}
            <div className="border-t border-slate-100 dark:border-slate-800 pt-3">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
                Popular Destination Routes
              </span>
              <div className="flex flex-wrap gap-1.5">
                {topTierRoutes.slice(0, 8).map((route) => (
                  <Link
                    key={route.code}
                    href={`/routes/${route.slug}`}
                    className="px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 text-xs font-medium text-slate-700 dark:text-slate-200"
                  >
                    {route.code} - {route.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* About & Trust Footer inside drawer */}
            <div className="border-t border-slate-100 dark:border-slate-800 pt-3 text-xs text-slate-500 space-y-1">
              <div>
                NVOCC Registration:{" "}
                <strong className="text-slate-800 dark:text-slate-200 font-mono">
                  {SITE_CONFIG.credentials.nvoccLicenseNumber}
                </strong>
              </div>
              <div>Shenzhen HQ Warehouse: Bao&apos;an Xinhe Community</div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
