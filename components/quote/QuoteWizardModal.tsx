"use client";

import React, { useState, useEffect } from "react";
import { ORIGIN_HUBS } from "@/data/origins";
import { TARGET_ROUTES } from "@/data/routes";
import { SITE_CONFIG, getWhatsAppUrl, getMailtoUrl } from "@/data/siteConfig";
import { useQuoteModal } from "./QuoteModalContext";
import {
  X,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Plane,
  Ship,
  Train,
  Zap,
  Box,
  Scale,
  ShieldCheck,
  MessageCircle,
  Mail,
  Building2,
  Calendar,
  User,
  Phone,
  HelpCircle,
  AlertCircle,
  Sparkles,
} from "lucide-react";

export function QuoteWizardModal() {
  const { isOpen, closeQuoteModal, initialData } = useQuoteModal();

  // Multi-step state (1: Route, 2: Cargo & Service, 3: Contact & Dispatch)
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Form states
  const [originId, setOriginId] = useState<string>("shenzhen");
  const [destinationCode, setDestinationCode] = useState<string>("US");
  const [destinationType, setDestinationType] = useState<
    "amazon-fba" | "commercial" | "residential"
  >("amazon-fba");
  const [fbaCode, setFbaCode] = useState<string>("ONT8");
  const [postalCode, setPostalCode] = useState<string>("");

  const [serviceType, setServiceType] = useState<string>("air-ddp");
  const [cargoType, setCargoType] = useState<
    "general" | "battery" | "magnetic-liquid" | "oversized"
  >("general");
  const [grossWeightKg, setGrossWeightKg] = useState<number>(150);
  const [volumeCbm, setVolumeCbm] = useState<number>(1.2);
  const [cartonCount, setCartonCount] = useState<number>(10);
  const [incoterm, setIncoterm] = useState<"EXW" | "FOB">("EXW");

  const [contactName, setContactName] = useState<string>("");
  const [companyName, setCompanyName] = useState<string>("");
  const [contactWhatsapp, setContactWhatsapp] = useState<string>("");
  const [contactEmail, setContactEmail] = useState<string>("");
  const [targetShipDate, setTargetShipDate] = useState<string>("");
  const [notes, setNotes] = useState<string>("");

  // Sync initialData when modal opens
  useEffect(() => {
    if (isOpen) {
      if (initialData.originId) setOriginId(initialData.originId);
      if (initialData.destinationSlug) {
        const foundRoute = TARGET_ROUTES.find(
          (r) => r.slug === initialData.destinationSlug
        );
        if (foundRoute) setDestinationCode(foundRoute.code);
      }
      if (initialData.serviceType) setServiceType(initialData.serviceType);
      if (initialData.weightKg) setGrossWeightKg(initialData.weightKg);
      if (initialData.volumeCbm) setVolumeCbm(initialData.volumeCbm);
      setStep(1);
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const selectedOrigin =
    ORIGIN_HUBS.find((h) => h.id === originId) || ORIGIN_HUBS[0];
  const selectedRoute =
    TARGET_ROUTES.find((r) => r.code === destinationCode) ||
    TARGET_ROUTES[0];

  // Calculate estimated air volumetric weight (CBM * 167 kg)
  const airVolumetricWeight = Math.round(volumeCbm * 167);
  const courierVolumetricWeight = Math.round(volumeCbm * 200);
  const chargeableWeightAir = Math.max(grossWeightKg, airVolumetricWeight);

  const formatWhatsAppPayload = () => {
    const cargoTypeLabel =
      cargoType === "battery"
        ? "Battery Cargo (UN38.3/MSDS Certified)"
        : cargoType === "magnetic-liquid"
        ? "Sensitive Cargo (Magnetic/Liquid/Cream)"
        : cargoType === "oversized"
        ? "Oversized / Palletized Cargo"
        : "General Consumer Cargo";

    const destinationAddress =
      destinationType === "amazon-fba"
        ? `Amazon FBA Warehouse [${fbaCode || "Designated FBA ID"}]`
        : `Door Delivery (Zip/Postal: ${postalCode || "Standard Port/City"})`;

    const originPortName = selectedOrigin.seaports[0]?.name || selectedOrigin.name;

    const payload = `🇨🇳 JCD FORWARDER | DIRECT FREIGHT INQUIRY
========================================
[OFFICIAL NVOCC LICENSE: GD20240307220907]
[24/7 SHENZHEN DISPATCH: +86 137 2424 6674]

📍 Origin Chinese Hub: ${selectedOrigin.name} (${originPortName})
🎯 Destination Country: ${selectedRoute.name} (${selectedRoute.code})
🏢 Delivery Location: ${destinationAddress}
🚚 Requested Mode: ${serviceType.toUpperCase()}
📋 Origin Terms: ${incoterm} (${
      incoterm === "EXW" ? "Factory Pickup Required" : "Supplier Delivers to Port/Warehouse"
    })

📦 CARGO SPECIFICATIONS:
• Gross Weight: ${grossWeightKg} KG
• Volume: ${volumeCbm} CBM
• Estimated Air Chg Wt: ${chargeableWeightAir} KG
• Carton Count: ${cartonCount} Boxes
• Cargo Category: ${cargoTypeLabel}

👤 SHIPPER CONTACT:
• Contact Person: ${contactName || "Global Importer"}
• Company: ${companyName || "Commercial Shipper"}
• WhatsApp / Phone: ${contactWhatsapp || "Provided via Chat"}
• Email: ${contactEmail || "Provided via Chat"}
• Target Ship Date: ${targetShipDate || "Immediate / Within 7 Days"}
${notes ? `• Special Requirements: ${notes}` : ""}

Please dispatch the current all-in door-to-door DDP rate, flight/vessel schedule, and customs requirements.`;

    return payload;
  };

  const handleWhatsAppDispatch = () => {
    const message = formatWhatsAppPayload();
    const url = getWhatsAppUrl(message);
    window.open(url, "_blank");
    closeQuoteModal();
  };

  const handleEmailDispatch = () => {
    const subject = `[Quote Inquiry] China to ${selectedRoute.name} (${serviceType.toUpperCase()}) - ${companyName || contactName || "Importer"}`;
    const body = formatWhatsAppPayload();
    const url = getMailtoUrl(subject, body);
    window.open(url, "_blank");
    closeQuoteModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl max-h-[92vh] flex flex-col rounded-2xl bg-white dark:bg-slate-900 shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with NVOCC Trust Bar */}
        <div className="relative bg-slate-900 text-white px-6 py-5 border-b border-slate-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold tracking-tight text-white">
                    Instant Freight Quote Funnel
                  </h2>
                  <span className="inline-flex items-center gap-1 rounded-full bg-blue-500/20 px-2.5 py-0.5 text-xs font-semibold text-blue-300 border border-blue-400/30">
                    <ShieldCheck className="h-3 w-3" /> NVOCC GD20240307220907
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  End-to-End DDP Rate Dispatch • Fast Turnaround • Direct Carrier Contracts
                </p>
              </div>
            </div>

            <button
              onClick={closeQuoteModal}
              className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
              aria-label="Close quote modal"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Step Progress Indicators */}
          <div className="mt-4 grid grid-cols-3 gap-2">
            <div
              className={`flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
                step === 1
                  ? "bg-blue-600 text-white shadow-sm"
                  : step > 1
                  ? "bg-emerald-600/20 text-emerald-400 border border-emerald-500/30"
                  : "bg-slate-800/60 text-slate-400"
              }`}
            >
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-black/20 text-[10px]">
                {step > 1 ? "✓" : "1"}
              </span>
              <span className="truncate">Route & Hubs</span>
            </div>

            <div
              className={`flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
                step === 2
                  ? "bg-blue-600 text-white shadow-sm"
                  : step > 2
                  ? "bg-emerald-600/20 text-emerald-400 border border-emerald-500/30"
                  : "bg-slate-800/60 text-slate-400"
              }`}
            >
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-black/20 text-[10px]">
                {step > 2 ? "✓" : "2"}
              </span>
              <span className="truncate">Cargo & Service</span>
            </div>

            <div
              className={`flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
                step === 3
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-slate-800/60 text-slate-400"
              }`}
            >
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-black/20 text-[10px]">
                3
              </span>
              <span className="truncate">Contact & Dispatch</span>
            </div>
          </div>
        </div>

        {/* Modal Body with Scrollable Area */}
        <div className="p-6 overflow-y-auto flex-1 text-slate-800 dark:text-slate-200">
          {/* STEP 1: ROUTE & ORIGIN */}
          {step === 1 && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div>
                <h3 className="text-base font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-blue-600" />
                  Select Chinese Origin Hub
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Choose your nearest supplier manufacturing cluster or consolidation hub.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-3">
                  {ORIGIN_HUBS.map((hub) => (
                    <button
                      key={hub.id}
                      type="button"
                      onClick={() => setOriginId(hub.id)}
                      className={`flex flex-col text-left p-3 rounded-xl border text-xs transition-all ${
                        originId === hub.id
                          ? "border-blue-600 bg-blue-50 dark:bg-blue-950/40 text-blue-900 dark:text-blue-200 ring-2 ring-blue-500/20 font-semibold"
                          : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900"
                      }`}
                    >
                      <span className="font-bold text-sm text-slate-900 dark:text-white">
                        {hub.name}
                      </span>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                        {hub.chineseName}
                      </span>
                      <span className="mt-2 text-[10px] text-blue-600 dark:text-blue-400 uppercase tracking-wider font-mono">
                        {hub.seaports[0]?.name || "Port Hub"}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <hr className="border-slate-100 dark:border-slate-800" />

              <div>
                <h3 className="text-base font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                  <ArrowRight className="h-4 w-4 text-blue-600" />
                  Select Global Destination Country
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Direct customs clearance & bonded door delivery across 44 countries.
                </p>
                <div className="mt-3">
                  <select
                    value={destinationCode}
                    onChange={(e) => setDestinationCode(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3.5 py-2.5 text-sm font-medium text-slate-900 dark:text-white shadow-sm focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  >
                    {TARGET_ROUTES.map((route) => (
                      <option key={route.code} value={route.code}>
                        {route.name} ({route.code}) — De Minimis: {route.deMinimisThreshold}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Destination Type & Receiving Facility:
                </h4>
                <div className="grid grid-cols-3 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setDestinationType("amazon-fba")}
                    className={`p-3 rounded-xl border text-left text-xs transition-all ${
                      destinationType === "amazon-fba"
                        ? "border-blue-600 bg-blue-50 dark:bg-blue-950/40 text-blue-900 dark:text-blue-200 ring-2 ring-blue-500/20 font-semibold"
                        : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
                    }`}
                  >
                    <div className="font-bold">Amazon FBA</div>
                    <div className="text-[11px] text-slate-500">CARP/ISA Appointment</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDestinationType("commercial")}
                    className={`p-3 rounded-xl border text-left text-xs transition-all ${
                      destinationType === "commercial"
                        ? "border-blue-600 bg-blue-50 dark:bg-blue-950/40 text-blue-900 dark:text-blue-200 ring-2 ring-blue-500/20 font-semibold"
                        : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
                    }`}
                  >
                    <div className="font-bold">Commercial Door</div>
                    <div className="text-[11px] text-slate-500">Loading dock / business</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDestinationType("residential")}
                    className={`p-3 rounded-xl border text-left text-xs transition-all ${
                      destinationType === "residential"
                        ? "border-blue-600 bg-blue-50 dark:bg-blue-950/40 text-blue-900 dark:text-blue-200 ring-2 ring-blue-500/20 font-semibold"
                        : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
                    }`}
                  >
                    <div className="font-bold">Residential Door</div>
                    <div className="text-[11px] text-slate-500">Liftgate / private home</div>
                  </button>
                </div>

                {destinationType === "amazon-fba" && (
                  <div className="mt-3">
                    <label className="text-xs text-slate-600 dark:text-slate-400 block mb-1">
                      Target Amazon Fulfillment Center Code (e.g. ONT8, GYR3, LBA4, DTM2):
                    </label>
                    <input
                      type="text"
                      value={fbaCode}
                      onChange={(e) => setFbaCode(e.target.value.toUpperCase())}
                      placeholder="e.g. ONT8"
                      className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm uppercase font-mono text-slate-900 dark:text-white focus:border-blue-600 focus:outline-none"
                    />
                  </div>
                )}

                {destinationType !== "amazon-fba" && (
                  <div className="mt-3">
                    <label className="text-xs text-slate-600 dark:text-slate-400 block mb-1">
                      Destination City & Postal / ZIP Code:
                    </label>
                    <input
                      type="text"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      placeholder="e.g. Los Angeles, CA 90001 or Frankfurt 60311"
                      className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-900 dark:text-white focus:border-blue-600 focus:outline-none"
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP 2: CARGO SPECS & SERVICE */}
          {step === 2 && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div>
                <h3 className="text-base font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                  <Zap className="h-4 w-4 text-blue-600" />
                  Select Shipping Mode
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mt-3">
                  <button
                    type="button"
                    onClick={() => setServiceType("air-ddp")}
                    className={`flex flex-col p-3 rounded-xl border text-left text-xs transition-all ${
                      serviceType === "air-ddp"
                        ? "border-blue-600 bg-blue-50 dark:bg-blue-950/40 text-blue-900 dark:text-blue-200 ring-2 ring-blue-500/20 font-semibold"
                        : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
                    }`}
                  >
                    <div className="flex items-center gap-1.5 font-bold text-sm text-slate-900 dark:text-white">
                      <Plane className="h-4 w-4 text-blue-600" /> Air DDP Express
                    </div>
                    <span className="text-slate-500 mt-1">5–7 Business Days</span>
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 mt-2">
                      Wheel-to-wheel priority customs
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setServiceType("sea-ddp-fast")}
                    className={`flex flex-col p-3 rounded-xl border text-left text-xs transition-all ${
                      serviceType === "sea-ddp-fast"
                        ? "border-blue-600 bg-blue-50 dark:bg-blue-950/40 text-blue-900 dark:text-blue-200 ring-2 ring-blue-500/20 font-semibold"
                        : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
                    }`}
                  >
                    <div className="flex items-center gap-1.5 font-bold text-sm text-slate-900 dark:text-white">
                      <Ship className="h-4 w-4 text-indigo-600" /> Matson / Fast Ocean
                    </div>
                    <span className="text-slate-500 mt-1">12–16 Days</span>
                    <span className="text-[10px] text-indigo-600 dark:text-indigo-400 mt-2">
                      Priority Pier C / CCX Berth
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setServiceType("sea-ddp-std")}
                    className={`flex flex-col p-3 rounded-xl border text-left text-xs transition-all ${
                      serviceType === "sea-ddp-std"
                        ? "border-blue-600 bg-blue-50 dark:bg-blue-950/40 text-blue-900 dark:text-blue-200 ring-2 ring-blue-500/20 font-semibold"
                        : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
                    }`}
                  >
                    <div className="flex items-center gap-1.5 font-bold text-sm text-slate-900 dark:text-white">
                      <Ship className="h-4 w-4 text-cyan-600" /> Ocean LCL / FCL
                    </div>
                    <span className="text-slate-500 mt-1">20–30 Days</span>
                    <span className="text-[10px] text-cyan-600 dark:text-cyan-400 mt-2">
                      Maximum cost optimization
                    </span>
                  </button>
                </div>
              </div>

              <hr className="border-slate-100 dark:border-slate-800" />

              {/* Cargo Nature */}
              <div>
                <h3 className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Cargo Nature & Compliance Category:
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: "general", label: "General Goods", sub: "Standard retail/apparel" },
                    { id: "battery", label: "Battery / Electronics", sub: "UN38.3 / MSDS channel" },
                    { id: "magnetic-liquid", label: "Sensitive Goods", sub: "Magnetic, liquid, cream" },
                    { id: "oversized", label: "Oversized / Heavy", sub: "Palletized > 100kg" },
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setCargoType(cat.id as any)}
                      className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                        cargoType === cat.id
                          ? "border-blue-600 bg-blue-50 dark:bg-blue-950/40 text-blue-900 dark:text-blue-200 font-semibold"
                          : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
                      }`}
                    >
                      <div className="font-bold">{cat.label}</div>
                      <div className="text-[10px] text-slate-500">{cat.sub}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Numbers */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Gross Weight (KG)
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={grossWeightKg}
                    onChange={(e) => setGrossWeightKg(Number(e.target.value) || 0)}
                    className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-900 dark:text-white focus:border-blue-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Total Volume (CBM)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min={0.1}
                    value={volumeCbm}
                    onChange={(e) => setVolumeCbm(Number(e.target.value) || 0)}
                    className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-900 dark:text-white focus:border-blue-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Carton Count (Boxes)
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={cartonCount}
                    onChange={(e) => setCartonCount(Number(e.target.value) || 1)}
                    className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-900 dark:text-white focus:border-blue-600 focus:outline-none"
                  />
                </div>
              </div>

              {/* Incoterm & Calculation Preview */}
              <div className="rounded-xl bg-slate-50 dark:bg-slate-800/60 p-3.5 border border-slate-200 dark:border-slate-700/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    Trade Incoterms at Origin:
                  </span>
                  <div className="inline-flex rounded-lg border border-slate-300 dark:border-slate-700 p-0.5 bg-white dark:bg-slate-900">
                    <button
                      type="button"
                      onClick={() => setIncoterm("EXW")}
                      className={`px-2.5 py-1 rounded text-xs font-semibold ${
                        incoterm === "EXW"
                          ? "bg-blue-600 text-white"
                          : "text-slate-600 dark:text-slate-400"
                      }`}
                    >
                      EXW (Pickup)
                    </button>
                    <button
                      type="button"
                      onClick={() => setIncoterm("FOB")}
                      className={`px-2.5 py-1 rounded text-xs font-semibold ${
                        incoterm === "FOB"
                          ? "bg-blue-600 text-white"
                          : "text-slate-600 dark:text-slate-400"
                      }`}
                    >
                      FOB (Port)
                    </button>
                  </div>
                </div>

                <div className="text-slate-600 dark:text-slate-400 text-right">
                  Air Volumetric:{" "}
                  <strong className="text-slate-900 dark:text-white">
                    {airVolumetricWeight} KG
                  </strong>{" "}
                  | Est. Chargeable:{" "}
                  <strong className="text-blue-600 dark:text-blue-400">
                    {chargeableWeightAir} KG
                  </strong>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: CONTACT & DISPATCH */}
          {step === 3 && (
            <div className="space-y-5 animate-in fade-in duration-150">
              {/* Summary recap */}
              <div className="rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-blue-900 dark:text-blue-200 uppercase tracking-wider">
                    Shipment Summary
                  </span>
                  <span className="text-xs font-mono font-bold text-blue-700 dark:text-blue-300">
                    {selectedOrigin.name} ➔ {selectedRoute.name}
                  </span>
                </div>
                <div className="mt-2 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-slate-700 dark:text-slate-300">
                  <div>
                    <span className="text-slate-500 block text-[10px]">Service</span>
                    <strong>{serviceType.toUpperCase()}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">Weight / Volume</span>
                    <strong>
                      {grossWeightKg} KG / {volumeCbm} CBM
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">Destination</span>
                    <strong>
                      {destinationType === "amazon-fba" ? `FBA ${fbaCode}` : "Door Delivery"}
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">Origin Incoterm</span>
                    <strong>{incoterm}</strong>
                  </div>
                </div>
              </div>

              {/* Contact fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Your Name / Contact Person *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      required
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="e.g. David Zhang"
                      className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 pl-9 pr-3 py-2 text-sm text-slate-900 dark:text-white focus:border-blue-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Company / Brand Name
                  </label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="e.g. Apex Global Trading LLC"
                      className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 pl-9 pr-3 py-2 text-sm text-slate-900 dark:text-white focus:border-blue-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    WhatsApp Number (Fastest Response) *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      required
                      value={contactWhatsapp}
                      onChange={(e) => setContactWhatsapp(e.target.value)}
                      placeholder="e.g. +1 555 123 4567"
                      className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 pl-9 pr-3 py-2 text-sm text-slate-900 dark:text-white focus:border-blue-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <input
                      type="email"
                      required
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="e.g. importer@company.com"
                      className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 pl-9 pr-3 py-2 text-sm text-slate-900 dark:text-white focus:border-blue-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Target Ready-to-Ship Date / Special Notes
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      value={targetShipDate}
                      onChange={(e) => setTargetShipDate(e.target.value)}
                      placeholder="e.g. Ready around Sept 20th, needs FNSKU relabeling"
                      className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 pl-9 pr-3 py-2 text-sm text-slate-900 dark:text-white focus:border-blue-600 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Direct dispatch options */}
              <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-4 bg-slate-50/60 dark:bg-slate-900/60">
                <div className="text-xs font-semibold text-slate-900 dark:text-white mb-2">
                  Select Dispatch Channel for Immediate Quote:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={handleWhatsAppDispatch}
                    className="flex items-center justify-center gap-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 px-4 py-3 text-sm font-bold text-white shadow-md shadow-emerald-600/20 transition-all hover:scale-[1.01]"
                  >
                    <MessageCircle className="h-5 w-5" />
                    <span>Dispatch via WhatsApp (Fastest)</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleEmailDispatch}
                    className="flex items-center justify-center gap-2.5 rounded-xl bg-slate-800 hover:bg-slate-900 text-white px-4 py-3 text-sm font-bold border border-slate-700 transition-all hover:scale-[1.01]"
                  >
                    <Mail className="h-5 w-5 text-blue-400" />
                    <span>Send Official Email RFQ</span>
                  </button>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 text-center mt-2.5">
                  Directly connects to JCD Forwarder Senior Dispatch Desk (+86 137 2424 6674). Average response ≤ 2 hours.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation Buttons */}
        <div className="bg-slate-50 dark:bg-slate-900/90 px-6 py-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div>
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep((s) => (s - 1) as any)}
                className="flex items-center gap-1.5 rounded-lg border border-slate-300 dark:border-slate-700 px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <ArrowLeft className="h-3.5 w-3.5" /> Back
              </button>
            ) : (
              <span className="text-xs text-slate-400">Step 1 of 3</span>
            )}
          </div>

          <div>
            {step < 3 ? (
              <button
                type="button"
                onClick={() => setStep((s) => (s + 1) as any)}
                className="flex items-center gap-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 px-5 py-2 text-xs font-bold text-white shadow-sm transition-all"
              >
                Next Step <ArrowRight className="h-3.5 w-3.5" />
              </button>
            ) : (
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="h-4 w-4" /> Ready for Instant Dispatch
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
