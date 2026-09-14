'use client';

import React, { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { CONTAINER_SPECS } from '@/data/containers';
import { getWhatsAppUrl } from '@/data/siteConfig';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  AlertTriangle,
  MessageCircle,
  RotateCcw,
  ChevronRight,
  Copy,
  Check,
  Package,
  HelpCircle,
} from 'lucide-react';

// Dynamic import with ssr: false to prevent Three.js hydration mismatch
const ContainerVisualizer3D = dynamic(
  () => import('@/components/tools/ContainerVisualizer3D'),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-80 sm:h-[420px] rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center text-slate-400 text-xs">
        <div className="flex flex-col items-center gap-2">
          <div className="w-6 h-6 border-2 border-sky-400 border-t-transparent rounded-full animate-spin" />
          <span>Loading 3D Container Preview...</span>
        </div>
      </div>
    ),
  }
);

export default function ContainerLoadingCalculatorPage() {
  const [selectedContainerId, setSelectedContainerId] = useState<'20gp' | '40gp' | '40hq' | '45hq'>('40hq');
  const [unitSystem, setUnitSystem] = useState<'metric' | 'imperial'>('metric');
  const [copiedPlan, setCopiedPlan] = useState(false);

  // Input States
  const [length, setLength] = useState<number>(50); // cm or inches
  const [width, setWidth] = useState<number>(40);
  const [height, setHeight] = useState<number>(30);
  const [weightPerCarton, setWeightPerCarton] = useState<number>(12); // kg or lbs
  const [quantity, setQuantity] = useState<number>(500);

  const container = useMemo(() => {
    return CONTAINER_SPECS.find((c) => c.id === selectedContainerId) || CONTAINER_SPECS[2];
  }, [selectedContainerId]);

  // Calculations
  const calculations = useMemo(() => {
    // Convert dimensions to meters
    const lengthM = unitSystem === 'metric' ? length / 100 : (length * 0.0254);
    const widthM = unitSystem === 'metric' ? width / 100 : (width * 0.0254);
    const heightM = unitSystem === 'metric' ? height / 100 : (height * 0.0254);

    // Single carton volume
    const cartonCbm = lengthM * widthM * heightM;
    const totalCbm = cartonCbm * (quantity || 0);

    // Weight in kg
    const weightKgPerCarton = unitSystem === 'metric' ? weightPerCarton : weightPerCarton * 0.453592;
    const totalWeightKg = weightKgPerCarton * (quantity || 0);
    const totalWeightTons = totalWeightKg / 1000;

    // Fill Rates
    const volumeUtilization = (totalCbm / container.usableVolumeMaxCbm) * 100;
    const weightUtilization = (totalWeightKg / container.maxPayloadKg) * 100;
    const remainingCbm = Math.max(0, container.usableVolumeMaxCbm - totalCbm);

    // Theoretical maximum cartons if 100% packed
    const maxTheoreticalCartons = cartonCbm > 0 ? Math.floor(container.usableVolumeMaxCbm / cartonCbm) : 0;

    // Warnings
    const isVolumeExceeded = totalCbm > container.usableVolumeMaxCbm;
    const isWeightExceeded = totalWeightKg > container.maxPayloadKg;

    return {
      cartonCbm,
      totalCbm,
      totalWeightKg,
      totalWeightTons,
      volumeUtilization,
      weightUtilization,
      remainingCbm,
      maxTheoreticalCartons,
      isVolumeExceeded,
      isWeightExceeded,
    };
  }, [length, width, height, weightPerCarton, quantity, container, unitSystem]);

  const applyPreset = (l: number, w: number, h: number, wt: number, qty: number) => {
    setUnitSystem('metric');
    setLength(l);
    setWidth(w);
    setHeight(h);
    setWeightPerCarton(wt);
    setQuantity(qty);
  };

  const handleFillToMax = () => {
    if (calculations.maxTheoreticalCartons > 0) {
      setQuantity(calculations.maxTheoreticalCartons);
    }
  };

  const handleCopyPlan = () => {
    const text = `Container Loading Plan:
- Container: ${container.code} (${container.usableVolumeDisplay})
- Carton Size: ${length}x${width}x${height} ${unitSystem === 'metric' ? 'cm' : 'in'}
- Weight per Box: ${weightPerCarton} ${unitSystem === 'metric' ? 'kg' : 'lbs'}
- Quantity: ${quantity} boxes
- Total Volume: ${calculations.totalCbm.toFixed(2)} CBM (${calculations.volumeUtilization.toFixed(1)}% full)
- Total Weight: ${calculations.totalWeightTons.toFixed(2)} Tons`;
    navigator.clipboard.writeText(text);
    setCopiedPlan(true);
    setTimeout(() => setCopiedPlan(false), 2000);
  };

  // WhatsApp formatted quote message
  const whatsappQuoteMsg = useMemo(() => {
    return `Hello David! I configured my shipment using the JCD Container Loading Calculator:
- Target Container: ${container.code} (${container.usableVolumeDisplay})
- Carton Size: ${length} x ${width} x ${height} ${unitSystem === 'metric' ? 'cm' : 'in'}
- Weight per Box: ${weightPerCarton} ${unitSystem === 'metric' ? 'kg' : 'lbs'}
- Quantity: ${quantity} cartons
- Calculated Volume: ${calculations.totalCbm.toFixed(2)} CBM (${calculations.volumeUtilization.toFixed(1)}% fill)
- Total Weight: ${calculations.totalWeightTons.toFixed(2)} Tons
Please send me an all-in DDP freight quote from China.`;
  }, [container, length, width, height, weightPerCarton, quantity, calculations, unitSystem]);

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
              3D Container Loading Calculator
            </span>
          </nav>
        </div>
      </div>

      {/* Header Banner */}
      <div className="bg-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <Badge className="bg-blue-600 text-white font-semibold">Interactive 3D Visualizer</Badge>
            <Badge variant="outline" className="border-slate-700 text-slate-300">
              20ft Standard • 40ft Standard • 40ft High Cube • 45ft Extra Long
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Container Loading Calculator &amp; 3D Space Planner
          </h1>
          <p className="text-slate-300 text-sm sm:text-base mt-2 max-w-3xl leading-relaxed">
            See exactly how your boxes fit inside an ocean shipping container. Calculate total volume (CBM), maximum box capacity, weight limits, and prevent costly empty container space.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: Inputs & Container Selection */}
          <div className="lg:col-span-5 space-y-6">
            {/* Container Selector */}
            <Card className="border-slate-200 dark:border-slate-800 shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-bold flex items-center justify-between">
                  <span>1. Choose Container Size</span>
                  <Badge variant="secondary" className="font-mono text-xs">
                    {container.usableVolumeDisplay}
                  </Badge>
                </CardTitle>
                <CardDescription className="text-xs">
                  Select the shipping container size for your sea cargo
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-2.5">
                  {CONTAINER_SPECS.map((spec) => {
                    const isSelected = spec.id === selectedContainerId;
                    const friendlyName =
                      spec.id === '20gp'
                        ? '20-Foot Standard (20GP)'
                        : spec.id === '40gp'
                        ? '40-Foot Standard (40GP)'
                        : spec.id === '40hq'
                        ? '40-Foot High Cube (40HQ)'
                        : '45-Foot Extra Long (45HQ)';

                    return (
                      <button
                        key={spec.id}
                        type="button"
                        onClick={() => setSelectedContainerId(spec.id)}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          isSelected
                            ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/40 ring-2 ring-blue-600/20'
                            : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 bg-white dark:bg-slate-900'
                        }`}
                      >
                        <div className="font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-200">
                          {friendlyName}
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5">
                          {spec.category}
                        </div>
                        <div className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 mt-1">
                          {spec.usableVolumeDisplay}
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-400 space-y-1">
                  <div>
                    <strong>Exterior Dimensions:</strong> {container.externalDimensions.lengthM}m x {container.externalDimensions.widthM}m x {container.externalDimensions.heightM}m ({container.externalDimensions.lengthFt} x {container.externalDimensions.widthFt} x {container.externalDimensions.heightFt})
                  </div>
                  <div>
                    <strong>Max Cargo Weight:</strong> {container.maxPayloadKg.toLocaleString()} kg ({container.maxPayloadTons} Tons)
                  </div>
                  <div>
                    <strong>Recommended Cargo:</strong> {container.bestSuitedFor}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Carton Dimensions & Count */}
            <Card className="border-slate-200 dark:border-slate-800 shadow-sm">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-bold">2. Carton &amp; Box Details</CardTitle>
                  {/* Unit Toggle */}
                  <div className="inline-flex rounded-lg border border-slate-200 dark:border-slate-800 p-0.5 bg-slate-100 dark:bg-slate-800 text-xs">
                    <button
                      type="button"
                      onClick={() => setUnitSystem('metric')}
                      className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                        unitSystem === 'metric'
                          ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs'
                          : 'text-slate-500'
                      }`}
                    >
                      cm / kg
                    </button>
                    <button
                      type="button"
                      onClick={() => setUnitSystem('imperial')}
                      className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                        unitSystem === 'imperial'
                          ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs'
                          : 'text-slate-500'
                      }`}
                    >
                      in / lbs
                    </button>
                  </div>
                </div>
                <CardDescription className="text-xs">
                  Enter box dimensions, weight per box, and how many cartons you have
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Quick Presets */}
                <div>
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                    Quick Sample Presets:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    <button
                      type="button"
                      onClick={() => applyPreset(50, 40, 30, 12, 500)}
                      className="text-[11px] font-medium px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 hover:border-blue-500 hover:text-blue-600 transition-colors"
                    >
                      Amazon Box (50×40×30 cm)
                    </button>
                    <button
                      type="button"
                      onClick={() => applyPreset(30, 20, 15, 3, 1200)}
                      className="text-[11px] font-medium px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 hover:border-blue-500 hover:text-blue-600 transition-colors"
                    >
                      Small Electronics (30×20×15 cm)
                    </button>
                    <button
                      type="button"
                      onClick={() => applyPreset(60, 40, 40, 20, 350)}
                      className="text-[11px] font-medium px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 hover:border-blue-500 hover:text-blue-600 transition-colors"
                    >
                      Master Carton (60×40×40 cm)
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                      Length ({unitSystem === 'metric' ? 'cm' : 'in'})
                    </label>
                    <Input
                      type="number"
                      min={1}
                      value={length}
                      onChange={(e) => setLength(parseFloat(e.target.value) || 0)}
                      className="text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                      Width ({unitSystem === 'metric' ? 'cm' : 'in'})
                    </label>
                    <Input
                      type="number"
                      min={1}
                      value={width}
                      onChange={(e) => setWidth(parseFloat(e.target.value) || 0)}
                      className="text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                      Height ({unitSystem === 'metric' ? 'cm' : 'in'})
                    </label>
                    <Input
                      type="number"
                      min={1}
                      value={height}
                      onChange={(e) => setHeight(parseFloat(e.target.value) || 0)}
                      className="text-xs font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                      Weight per Box ({unitSystem === 'metric' ? 'kg' : 'lbs'})
                    </label>
                    <Input
                      type="number"
                      min={0.1}
                      step={0.5}
                      value={weightPerCarton}
                      onChange={(e) => setWeightPerCarton(parseFloat(e.target.value) || 0)}
                      className="text-xs font-mono"
                    />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        Carton Quantity
                      </label>
                      {calculations.maxTheoreticalCartons > 0 && (
                        <button
                          type="button"
                          onClick={handleFillToMax}
                          className="text-[11px] text-blue-600 dark:text-blue-400 font-semibold hover:underline"
                        >
                          Fill to Max ({calculations.maxTheoreticalCartons})
                        </button>
                      )}
                    </div>
                    <Input
                      type="number"
                      min={1}
                      value={quantity}
                      onChange={(e) => setQuantity(parseInt(e.target.value, 10) || 0)}
                      className="text-xs font-mono"
                    />
                  </div>
                </div>

                {/* Carton Alert / Guidance */}
                {unitSystem === 'metric' && length > 63.5 && (
                  <div className="flex items-start gap-2 p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 text-amber-800 dark:text-amber-300 text-[11px]">
                    <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                    <span>Amazon FBA Notice: Single carton side exceeds 63.5 cm limit. Amazon requires boxes under 63.5 cm unless containing one oversized item.</span>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* RIGHT: 3D Visualizer & Results Panel */}
          <div className="lg:col-span-7 space-y-6">
            {/* 3D Visualizer Canvas */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="font-semibold text-slate-700 dark:text-slate-300">
                  Interactive 3D Container Preview
                </span>
                <span>Drag to Rotate • Scroll to Zoom</span>
              </div>
              <ContainerVisualizer3D
                containerId={selectedContainerId}
                utilizationPercent={calculations.volumeUtilization}
                totalCbm={calculations.totalCbm}
                totalWeightKg={calculations.totalWeightKg}
                cartonCount={quantity}
              />
            </div>

            {/* Calculated Results Summary Card */}
            <Card className="border-slate-200 dark:border-slate-800 shadow-md">
              <CardHeader className="pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-bold">Container Space Summary</CardTitle>
                  <Badge
                    className={
                      calculations.isVolumeExceeded || calculations.isWeightExceeded
                        ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                        : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                    }
                  >
                    {calculations.isVolumeExceeded || calculations.isWeightExceeded
                      ? 'Exceeds Container Limits'
                      : 'Fits in Container'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-4 space-y-5">
                {/* Metric Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="bg-slate-50 dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                    <div className="text-slate-500 font-medium">Total Volume</div>
                    <div className="text-base font-extrabold text-blue-600 dark:text-blue-400 mt-0.5">
                      {calculations.totalCbm.toFixed(2)} CBM
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">
                      Max: {container.usableVolumeMaxCbm} CBM
                    </div>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                    <div className="text-slate-500 font-medium">Space Filled</div>
                    <div
                      className={`text-base font-extrabold mt-0.5 ${
                        calculations.isVolumeExceeded ? 'text-rose-600' : 'text-emerald-600 dark:text-emerald-400'
                      }`}
                    >
                      {calculations.volumeUtilization.toFixed(1)}%
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">
                      {calculations.remainingCbm.toFixed(1)} CBM remaining
                    </div>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                    <div className="text-slate-500 font-medium">Max Boxes That Fit</div>
                    <div className="text-base font-extrabold text-slate-800 dark:text-slate-200 mt-0.5">
                      ~{calculations.maxTheoreticalCartons} Boxes
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">
                      Current: {quantity} boxes
                    </div>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                    <div className="text-slate-500 font-medium">Total Cargo Weight</div>
                    <div
                      className={`text-base font-extrabold mt-0.5 ${
                        calculations.isWeightExceeded ? 'text-rose-600' : 'text-slate-800 dark:text-slate-200'
                      }`}
                    >
                      {calculations.totalWeightTons.toFixed(2)} Tons
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">
                      Max: {container.maxPayloadTons} Tons
                    </div>
                  </div>
                </div>

                {/* Progress Visualizer Bars */}
                <div className="space-y-3 pt-2">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="font-semibold text-slate-700 dark:text-slate-300">
                        Container Volume Used: {calculations.totalCbm.toFixed(1)} / {container.usableVolumeMaxCbm} CBM
                      </span>
                      <span className="font-mono text-slate-500">
                        {calculations.volumeUtilization.toFixed(1)}%
                      </span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${
                          calculations.isVolumeExceeded
                            ? 'bg-rose-500'
                            : calculations.volumeUtilization > 85
                            ? 'bg-emerald-500'
                            : 'bg-blue-600'
                        }`}
                        style={{ width: `${Math.min(100, calculations.volumeUtilization)}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="font-semibold text-slate-700 dark:text-slate-300">
                        Weight Capacity Used: {calculations.totalWeightTons.toFixed(1)} / {container.maxPayloadTons} Tons
                      </span>
                      <span className="font-mono text-slate-500">
                        {calculations.weightUtilization.toFixed(1)}%
                      </span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${
                          calculations.isWeightExceeded ? 'bg-rose-500' : 'bg-amber-500'
                        }`}
                        style={{ width: `${Math.min(100, calculations.weightUtilization)}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Overload Alert Warnings */}
                {calculations.isVolumeExceeded && (
                  <div className="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 rounded-xl text-rose-800 dark:text-rose-300 text-xs flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                    <div>
                      <strong>Volume Capacity Exceeded:</strong> Your cargo ({calculations.totalCbm.toFixed(1)} CBM) exceeds the {container.code} maximum space ({container.usableVolumeMaxCbm} CBM). Consider upgrading to a {selectedContainerId === '20gp' ? '40-Foot or 40HQ container' : '45HQ container'}.
                    </div>
                  </div>
                )}

                {calculations.isWeightExceeded && (
                  <div className="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 rounded-xl text-rose-800 dark:text-rose-300 text-xs flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                    <div>
                      <strong>Weight Limit Exceeded:</strong> Total weight ({calculations.totalWeightTons.toFixed(2)} Tons) exceeds the maritime safety limit ({container.maxPayloadTons} Tons). Overweight containers risk port fines or refusal.
                    </div>
                  </div>
                )}

                {/* Call to Action Bar & Copy Plan */}
                <div className="pt-3 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={handleCopyPlan}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-semibold transition-colors"
                  >
                    {copiedPlan ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                        <span className="text-emerald-600 dark:text-emerald-400">Loading Plan Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-slate-500" />
                        <span>Copy Plan for Supplier</span>
                      </>
                    )}
                  </button>

                  <a
                    href={getWhatsAppUrl(whatsappQuoteMsg)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs px-5 py-3 shadow-md shadow-emerald-900/20 transition-all hover:scale-[1.02]"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Book Container with David on WhatsApp
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}

