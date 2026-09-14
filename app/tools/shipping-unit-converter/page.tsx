"use client";

import React, { useState } from "react";
import Link from "next/link";
import { getWhatsAppUrl } from "@/data/siteConfig";
import {
  Scale,
  Ruler,
  Box,
  Copy,
  Check,
  RotateCcw,
  Calculator,
  MessageCircle,
  HelpCircle,
  Package,
} from "lucide-react";

export default function ShippingUnitConverterPage() {
  const [activeTab, setActiveTab] = useState<"weight" | "length" | "volume" | "carton">("weight");
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Weight State (Base = kg)
  const [baseKg, setBaseKg] = useState<number>(100);

  // Length State (Base = cm)
  const [baseCm, setBaseCm] = useState<number>(100);

  // Volume State (Base = CBM / m³)
  const [baseCbm, setBaseCbm] = useState<number>(1);

  // Carton Dimensions
  const [cartonLength, setCartonLength] = useState<number>(50);
  const [cartonWidth, setCartonWidth] = useState<number>(40);
  const [cartonHeight, setCartonHeight] = useState<number>(30);
  const [cartonQty, setCartonQty] = useState<number>(50);
  const [cartonUnit, setCartonUnit] = useState<"cm" | "inch">("cm");

  const handleCopy = (text: string, fieldId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldId);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const applyCartonPreset = (l: number, w: number, h: number, unit: "cm" | "inch") => {
    setCartonUnit(unit);
    setCartonLength(l);
    setCartonWidth(w);
    setCartonHeight(h);
  };

  const resetAll = () => {
    setBaseKg(100);
    setBaseCm(100);
    setBaseCbm(1);
    setCartonLength(50);
    setCartonWidth(40);
    setCartonHeight(30);
    setCartonQty(50);
    setCartonUnit("cm");
  };

  // Weight Calculations
  const weightValues = {
    kg: baseKg,
    g: baseKg * 1000,
    lb: baseKg * 2.20462262,
    oz: baseKg * 35.2739619,
    ton: baseKg / 1000,
  };

  // Length Calculations
  const lengthValues = {
    cm: baseCm,
    mm: baseCm * 10,
    m: baseCm / 100,
    inch: baseCm / 2.54,
    ft: baseCm / 30.48,
  };

  // Volume Calculations
  const volumeValues = {
    cbm: baseCbm,
    cuft: baseCbm * 35.3146667,
    liters: baseCbm * 1000,
    gallons: baseCbm * 264.172052,
  };

  // Carton Total Calculation
  const cartonResults = React.useMemo(() => {
    let singleCbm = 0;
    if (cartonUnit === "cm") {
      singleCbm = (cartonLength * cartonWidth * cartonHeight) / 1000000;
    } else {
      const lCm = cartonLength * 2.54;
      const wCm = cartonWidth * 2.54;
      const hCm = cartonHeight * 2.54;
      singleCbm = (lCm * wCm * hCm) / 1000000;
    }
    const totalCbm = singleCbm * cartonQty;
    const totalCuFt = totalCbm * 35.3146667;
    return { singleCbm, totalCbm, totalCuFt };
  }, [cartonLength, cartonWidth, cartonHeight, cartonQty, cartonUnit]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* Header */}
      <section className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white pt-16 pb-16 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-400 mb-4">
            <Link href="/" className="hover:underline">Home</Link>
            <span>/</span>
            <Link href="/tools" className="hover:underline">Tools</Link>
            <span>/</span>
            <span className="text-slate-300">Unit Converter</span>
          </div>

          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-semibold">
              <Scale className="h-3.5 w-3.5 text-blue-400" />
              <span>International Shipping Standards</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
              Shipping &amp; Freight Unit Converter
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Instantly convert weight, length, volume, and box sizes between metric (kg, cm, CBM) and imperial (lbs, inches, cu ft) units used in international trade.
            </p>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tab Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTab("weight")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === "weight"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                  : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Scale className="h-4 w-4" />
              <span>Weight (kg, lbs, tons, oz)</span>
            </button>

            <button
              onClick={() => setActiveTab("length")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === "length"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                  : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Ruler className="h-4 w-4" />
              <span>Length (cm, inches, meters, feet)</span>
            </button>

            <button
              onClick={() => setActiveTab("volume")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === "volume"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                  : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Box className="h-4 w-4" />
              <span>Volume (CBM, cu ft, liters)</span>
            </button>

            <button
              onClick={() => setActiveTab("carton")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === "carton"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                  : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Calculator className="h-4 w-4" />
              <span>Carton &amp; Box Volume (CBM)</span>
            </button>
          </div>

          <button
            onClick={resetAll}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset Values</span>
          </button>
        </div>

        {/* Tab 1: Weight Converter */}
        {activeTab === "weight" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <h2 className="text-base font-bold text-slate-900 dark:text-white">
                    Weight Converter
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">Type in any box to automatically update the others</p>
                </div>
                <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2.5 py-1 rounded-full">
                  Live Recalculation
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Kilograms */}
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
                  <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    <span>Kilograms (kg)</span>
                    <button
                      onClick={() => handleCopy(weightValues.kg.toFixed(2), "kg")}
                      className="text-blue-500 hover:text-blue-600 flex items-center gap-1 text-xs"
                      title="Copy value"
                    >
                      {copiedField === "kg" ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                    </button>
                  </div>
                  <input
                    type="number"
                    value={weightValues.kg || ""}
                    onChange={(e) => setBaseKg(parseFloat(e.target.value) || 0)}
                    className="w-full h-11 px-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 font-mono font-bold text-base focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5">Used for air freight and ocean shipping invoices</div>
                </div>

                {/* Pounds */}
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
                  <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    <span>Pounds (lbs)</span>
                    <button
                      onClick={() => handleCopy(weightValues.lb.toFixed(2), "lb")}
                      className="text-blue-500 hover:text-blue-600 flex items-center gap-1 text-xs"
                      title="Copy value"
                    >
                      {copiedField === "lb" ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                    </button>
                  </div>
                  <input
                    type="number"
                    value={Number(weightValues.lb.toFixed(3)) || ""}
                    onChange={(e) => setBaseKg((parseFloat(e.target.value) || 0) / 2.20462262)}
                    className="w-full h-11 px-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 font-mono font-bold text-base focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5">Commonly used in the US, Canada, and UK domestic freight</div>
                </div>

                {/* Metric Tons */}
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
                  <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    <span>Metric Tons (MT / 1,000 kg)</span>
                    <button
                      onClick={() => handleCopy(weightValues.ton.toFixed(4), "ton")}
                      className="text-blue-500 hover:text-blue-600 flex items-center gap-1 text-xs"
                      title="Copy value"
                    >
                      {copiedField === "ton" ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                    </button>
                  </div>
                  <input
                    type="number"
                    value={Number(weightValues.ton.toFixed(4)) || ""}
                    onChange={(e) => setBaseKg((parseFloat(e.target.value) || 0) * 1000)}
                    className="w-full h-11 px-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 font-mono font-bold text-base focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5">Used for full container loads (FCL) and heavy bulk cargo</div>
                </div>

                {/* Ounces */}
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
                  <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    <span>Ounces (oz)</span>
                    <button
                      onClick={() => handleCopy(weightValues.oz.toFixed(2), "oz")}
                      className="text-blue-500 hover:text-blue-600 flex items-center gap-1 text-xs"
                      title="Copy value"
                    >
                      {copiedField === "oz" ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                    </button>
                  </div>
                  <input
                    type="number"
                    value={Number(weightValues.oz.toFixed(2)) || ""}
                    onChange={(e) => setBaseKg((parseFloat(e.target.value) || 0) / 35.2739619)}
                    className="w-full h-11 px-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 font-mono font-bold text-base focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5">Used for postal packets and lightweight e-commerce items</div>
                </div>
              </div>
            </div>

            {/* Cheatsheet Column */}
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs space-y-3">
                <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                  <HelpCircle className="h-4 w-4 text-blue-500" />
                  <span>Simple Weight Reference</span>
                </h3>
                <div className="space-y-2 text-slate-600 dark:text-slate-400">
                  <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                    <span>1 Kilogram (kg)</span>
                    <span className="font-mono font-bold text-slate-900 dark:text-white">2.205 lbs</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                    <span>1 Pound (lb)</span>
                    <span className="font-mono font-bold text-slate-900 dark:text-white">0.454 kg</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                    <span>1 Metric Ton</span>
                    <span className="font-mono font-bold text-slate-900 dark:text-white">1,000 kg / 2,205 lbs</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span>Sea Freight Standard</span>
                    <span className="font-mono font-bold text-blue-600 dark:text-blue-400">1 CBM = up to 1,000 kg</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Length Converter */}
        {activeTab === "length" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <h2 className="text-base font-bold text-slate-900 dark:text-white">
                    Dimensions &amp; Length Converter
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">Type in any box to convert between metric and imperial dimensions</p>
                </div>
                <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2.5 py-1 rounded-full">
                  Live Recalculation
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Centimeters */}
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
                  <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    <span>Centimeters (cm)</span>
                    <button
                      onClick={() => handleCopy(lengthValues.cm.toFixed(2), "cm")}
                      className="text-blue-500 hover:text-blue-600 flex items-center gap-1 text-xs"
                      title="Copy value"
                    >
                      {copiedField === "cm" ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                    </button>
                  </div>
                  <input
                    type="number"
                    value={lengthValues.cm || ""}
                    onChange={(e) => setBaseCm(parseFloat(e.target.value) || 0)}
                    className="w-full h-11 px-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 font-mono font-bold text-base focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5">Standard box measurement used by Asian factories</div>
                </div>

                {/* Inches */}
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
                  <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    <span>Inches (in)</span>
                    <button
                      onClick={() => handleCopy(lengthValues.inch.toFixed(2), "inch")}
                      className="text-blue-500 hover:text-blue-600 flex items-center gap-1 text-xs"
                      title="Copy value"
                    >
                      {copiedField === "inch" ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                    </button>
                  </div>
                  <input
                    type="number"
                    value={Number(lengthValues.inch.toFixed(3)) || ""}
                    onChange={(e) => setBaseCm((parseFloat(e.target.value) || 0) * 2.54)}
                    className="w-full h-11 px-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 font-mono font-bold text-base focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5">Amazon US FBA carton measurement standard</div>
                </div>

                {/* Meters */}
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
                  <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    <span>Meters (m)</span>
                    <button
                      onClick={() => handleCopy(lengthValues.m.toFixed(3), "m")}
                      className="text-blue-500 hover:text-blue-600 flex items-center gap-1 text-xs"
                      title="Copy value"
                    >
                      {copiedField === "m" ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                    </button>
                  </div>
                  <input
                    type="number"
                    value={Number(lengthValues.m.toFixed(4)) || ""}
                    onChange={(e) => setBaseCm((parseFloat(e.target.value) || 0) * 100)}
                    className="w-full h-11 px-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 font-mono font-bold text-base focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5">Used for pallet footprint and container dimensions</div>
                </div>

                {/* Feet */}
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
                  <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    <span>Feet (ft)</span>
                    <button
                      onClick={() => handleCopy(lengthValues.ft.toFixed(2), "ft")}
                      className="text-blue-500 hover:text-blue-600 flex items-center gap-1 text-xs"
                      title="Copy value"
                    >
                      {copiedField === "ft" ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                    </button>
                  </div>
                  <input
                    type="number"
                    value={Number(lengthValues.ft.toFixed(3)) || ""}
                    onChange={(e) => setBaseCm((parseFloat(e.target.value) || 0) * 30.48)}
                    className="w-full h-11 px-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 font-mono font-bold text-base focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5">Shipping containers (20ft, 40ft) and US trucks</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 space-y-4">
              <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs space-y-3">
                <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                  <HelpCircle className="h-4 w-4 text-blue-500" />
                  <span>Simple Dimension Reference</span>
                </h3>
                <div className="space-y-2 text-slate-600 dark:text-slate-400">
                  <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                    <span>1 Inch</span>
                    <span className="font-mono font-bold text-slate-900 dark:text-white">2.54 cm</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                    <span>1 Foot</span>
                    <span className="font-mono font-bold text-slate-900 dark:text-white">30.48 cm / 12 inches</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                    <span>1 Meter</span>
                    <span className="font-mono font-bold text-slate-900 dark:text-white">39.37 inches / 3.28 ft</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span>Amazon FBA Max Box Side</span>
                    <span className="font-mono font-bold text-amber-600 dark:text-amber-400">25 inches (63.5 cm)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Volume Converter */}
        {activeTab === "volume" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <h2 className="text-base font-bold text-slate-900 dark:text-white">
                    CBM &amp; Volume Converter
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">Convert between Cubic Meters (CBM) and Cubic Feet (CFT)</p>
                </div>
                <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2.5 py-1 rounded-full">
                  Live Recalculation
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* CBM */}
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
                  <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    <span>Cubic Meters (CBM / m³)</span>
                    <button
                      onClick={() => handleCopy(volumeValues.cbm.toFixed(3), "cbm")}
                      className="text-blue-500 hover:text-blue-600 flex items-center gap-1 text-xs"
                      title="Copy value"
                    >
                      {copiedField === "cbm" ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                    </button>
                  </div>
                  <input
                    type="number"
                    value={volumeValues.cbm || ""}
                    onChange={(e) => setBaseCbm(parseFloat(e.target.value) || 0)}
                    className="w-full h-11 px-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 font-mono font-bold text-base focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5">The primary unit for sea freight (LCL/FCL) worldwide</div>
                </div>

                {/* Cubic Feet */}
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
                  <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    <span>Cubic Feet (cu ft / CFT)</span>
                    <button
                      onClick={() => handleCopy(volumeValues.cuft.toFixed(2), "cuft")}
                      className="text-blue-500 hover:text-blue-600 flex items-center gap-1 text-xs"
                      title="Copy value"
                    >
                      {copiedField === "cuft" ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                    </button>
                  </div>
                  <input
                    type="number"
                    value={Number(volumeValues.cuft.toFixed(2)) || ""}
                    onChange={(e) => setBaseCbm((parseFloat(e.target.value) || 0) / 35.3146667)}
                    className="w-full h-11 px-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 font-mono font-bold text-base focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5">Commonly used by US warehouses and local truckers</div>
                </div>

                {/* Liters */}
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
                  <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    <span>Liters (L)</span>
                    <button
                      onClick={() => handleCopy(volumeValues.liters.toFixed(1), "liters")}
                      className="text-blue-500 hover:text-blue-600 flex items-center gap-1 text-xs"
                      title="Copy value"
                    >
                      {copiedField === "liters" ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                    </button>
                  </div>
                  <input
                    type="number"
                    value={Number(volumeValues.liters.toFixed(1)) || ""}
                    onChange={(e) => setBaseCbm((parseFloat(e.target.value) || 0) / 1000)}
                    className="w-full h-11 px-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 font-mono font-bold text-base focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5">Used for liquids, drums, and tank containers</div>
                </div>

                {/* US Gallons */}
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
                  <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    <span>US Liquid Gallons (gal)</span>
                    <button
                      onClick={() => handleCopy(volumeValues.gallons.toFixed(2), "gal")}
                      className="text-blue-500 hover:text-blue-600 flex items-center gap-1 text-xs"
                      title="Copy value"
                    >
                      {copiedField === "gal" ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                    </button>
                  </div>
                  <input
                    type="number"
                    value={Number(volumeValues.gallons.toFixed(2)) || ""}
                    onChange={(e) => setBaseCbm((parseFloat(e.target.value) || 0) / 264.172052)}
                    className="w-full h-11 px-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 font-mono font-bold text-base focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5">US measurement for liquid shipments and oils</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 space-y-4">
              <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs space-y-3">
                <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                  <Box className="h-4 w-4 text-blue-500" />
                  <span>Container Capacity Guidelines</span>
                </h3>
                <div className="space-y-2 text-slate-600 dark:text-slate-400">
                  <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                    <span>20-Foot Container (20GP)</span>
                    <span className="font-mono font-bold text-slate-900 dark:text-white">~28–30 CBM</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                    <span>40-Foot Standard (40GP)</span>
                    <span className="font-mono font-bold text-slate-900 dark:text-white">~56–58 CBM</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                    <span>40-Foot High Cube (40HQ)</span>
                    <span className="font-mono font-bold text-slate-900 dark:text-white">~68–70 CBM</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span>1 CBM</span>
                    <span className="font-mono font-bold text-blue-600 dark:text-blue-400">35.315 Cubic Feet</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Carton Dimension Engine */}
        {activeTab === "carton" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex flex-wrap items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 gap-4">
                <div>
                  <h2 className="text-base font-bold text-slate-900 dark:text-white">
                    Carton &amp; Box Volume Calculator
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">Enter your box size and quantity to get total shipment volume (CBM)</p>
                </div>

                {/* Unit Switcher */}
                <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <button
                    onClick={() => setCartonUnit("cm")}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                      cartonUnit === "cm" ? "bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm" : "text-slate-500"
                    }`}
                  >
                    Centimeters (cm)
                  </button>
                  <button
                    onClick={() => setCartonUnit("inch")}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                      cartonUnit === "inch" ? "bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm" : "text-slate-500"
                    }`}
                  >
                    Inches (in)
                  </button>
                </div>
              </div>

              {/* Quick Box Size Presets */}
              <div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
                  Popular Box Sizes (Click to apply):
                </span>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => applyCartonPreset(30, 20, 15, "cm")}
                    className="text-xs font-medium px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 hover:border-blue-500 hover:text-blue-600 transition-colors"
                  >
                    Small Carton (30×20×15 cm)
                  </button>
                  <button
                    type="button"
                    onClick={() => applyCartonPreset(50, 40, 30, "cm")}
                    className="text-xs font-medium px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 hover:border-blue-500 hover:text-blue-600 transition-colors"
                  >
                    Standard Amazon FBA Box (50×40×30 cm)
                  </button>
                  <button
                    type="button"
                    onClick={() => applyCartonPreset(60, 40, 40, "cm")}
                    className="text-xs font-medium px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 hover:border-blue-500 hover:text-blue-600 transition-colors"
                  >
                    Master Carton (60×40×40 cm)
                  </button>
                  <button
                    type="button"
                    onClick={() => applyCartonPreset(20, 16, 12, "inch")}
                    className="text-xs font-medium px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 hover:border-blue-500 hover:text-blue-600 transition-colors"
                  >
                    US 20×16×12 in
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">
                    Length ({cartonUnit})
                  </label>
                  <input
                    type="number"
                    value={cartonLength}
                    onChange={(e) => setCartonLength(parseFloat(e.target.value) || 0)}
                    className="w-full h-11 px-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 font-mono font-bold text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">
                    Width ({cartonUnit})
                  </label>
                  <input
                    type="number"
                    value={cartonWidth}
                    onChange={(e) => setCartonWidth(parseFloat(e.target.value) || 0)}
                    className="w-full h-11 px-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 font-mono font-bold text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">
                    Height ({cartonUnit})
                  </label>
                  <input
                    type="number"
                    value={cartonHeight}
                    onChange={(e) => setCartonHeight(parseFloat(e.target.value) || 0)}
                    className="w-full h-11 px-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 font-mono font-bold text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">
                    Quantity (Boxes)
                  </label>
                  <input
                    type="number"
                    value={cartonQty}
                    onChange={(e) => setCartonQty(parseInt(e.target.value) || 0)}
                    className="w-full h-11 px-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 font-mono font-bold text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              {/* Calculated Outputs */}
              <div className="pt-6 border-t border-slate-100 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/50">
                  <span className="text-xs text-blue-700 dark:text-blue-300 font-medium">Single Box Volume:</span>
                  <div className="text-xl font-black text-blue-900 dark:text-blue-200 mt-1 font-mono">
                    {cartonResults.singleCbm.toFixed(4)} CBM
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50">
                  <span className="text-xs text-emerald-700 dark:text-emerald-300 font-medium">Total Shipment Volume:</span>
                  <div className="text-2xl font-black text-emerald-900 dark:text-emerald-200 mt-1 font-mono">
                    {cartonResults.totalCbm.toFixed(3)} CBM
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-900/50">
                  <span className="text-xs text-purple-700 dark:text-purple-300 font-medium">Total Cubic Feet:</span>
                  <div className="text-xl font-black text-purple-900 dark:text-purple-200 mt-1 font-mono">
                    {cartonResults.totalCuFt.toFixed(1)} CFT
                  </div>
                </div>
              </div>

              {/* Copy Summary Button */}
              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => {
                    const text = `Shipment Volume Summary: ${cartonQty} boxes (${cartonLength}x${cartonWidth}x${cartonHeight} ${cartonUnit}) = ${cartonResults.totalCbm.toFixed(3)} CBM (${cartonResults.totalCuFt.toFixed(1)} Cu.Ft)`;
                    handleCopy(text, "summary");
                  }}
                  className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  {copiedField === "summary" ? (
                    <>
                      <Check className="h-4 w-4 text-emerald-500" />
                      <span className="text-emerald-600 dark:text-emerald-400">Summary Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 text-slate-500" />
                      <span>Copy Volume Summary</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="lg:col-span-4 space-y-4">
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl text-white shadow-xl space-y-4">
                <div className="flex items-center gap-2 text-blue-300 text-xs font-bold uppercase tracking-wider">
                  <Package className="h-4 w-4" />
                  <span>Instant Freight Quote</span>
                </div>
                <h3 className="font-bold text-base">Ready for a Shipping Rate?</h3>
                <p className="text-xs text-blue-200 leading-relaxed">
                  Your shipment measures <span className="font-bold text-white">{cartonResults.totalCbm.toFixed(2)} CBM</span> across <span className="font-bold text-white">{cartonQty} boxes</span>. Send this directly to JCD logistics dispatch for sea LCL, air freight, or door-to-door pricing.
                </p>

                <a
                  href={getWhatsAppUrl(`Hello JCD Forwarder, I calculated my shipment volume: ${cartonQty} cartons = ${cartonResults.totalCbm.toFixed(2)} CBM (${cartonLength}x${cartonWidth}x${cartonHeight} ${cartonUnit}). Please provide a freight quotation.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-xs shadow-md transition-colors"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Send CBM to WhatsApp for Quote</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

