'use client';

import React, { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { CONTAINER_SPECS, type ContainerSpec } from '@/data/containers';
import { SITE_CONFIG, getWhatsAppUrl } from '@/data/siteConfig';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Box,
  Scale,
  Percent,
  AlertTriangle,
  CheckCircle2,
  MessageCircle,
  RotateCcw,
  Sparkles,
  ArrowRight,
  ChevronRight,
  Info,
  Layers,
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
          <span>Initializing 3D Container Simulation...</span>
        </div>
      </div>
    ),
  }
);

export default function ContainerLoadingCalculatorPage() {
  const [selectedContainerId, setSelectedContainerId] = useState<'20gp' | '40gp' | '40hq' | '45hq'>('40hq');
  const [unitSystem, setUnitSystem] = useState<'metric' | 'imperial'>('metric');

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

  // WhatsApp formatted quote message
  const whatsappQuoteMsg = useMemo(() => {
    return `Hello David! I configured my shipment using the JCD 3D Container Loading Calculator:
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
            <Badge className="bg-blue-600 text-white font-semibold">Interactive 3D Engine</Badge>
            <Badge variant="outline" className="border-slate-700 text-slate-300">
              20GP • 40GP • 40HQ • 45HQ
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            3D Container Loading Calculator & Space Planner
          </h1>
          <p className="text-slate-300 text-sm sm:text-base mt-2 max-w-3xl leading-relaxed">
            Simulate ocean container packing in real-time 3D. Accurately compute usable volume (CBM), carton quantities,
            payload thresholds, and space utilization to avoid costly container dead space.
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
                  <span>1. Select Container Model</span>
                  <Badge variant="secondary" className="font-mono text-xs">
                    {container.usableVolumeDisplay}
                  </Badge>
                </CardTitle>
                <CardDescription className="text-xs">
                  Choose from standard ocean dry and high-cube specifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-2.5">
                  {CONTAINER_SPECS.map((spec) => {
                    const isSelected = spec.id === selectedContainerId;
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
                        <div className="font-bold text-sm text-slate-800 dark:text-slate-200">
                          {spec.code}
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
                    <strong>Dimensions (Ext):</strong> {container.externalDimensions.lengthM}m x {container.externalDimensions.widthM}m x {container.externalDimensions.heightM}m ({container.externalDimensions.lengthFt} x {container.externalDimensions.widthFt} x {container.externalDimensions.heightFt})
                  </div>
                  <div>
                    <strong>Max Payload:</strong> {container.maxPayloadKg.toLocaleString()} kg ({container.maxPayloadTons} Tons)
                  </div>
                  <div>
                    <strong>Best for:</strong> {container.bestSuitedFor}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Carton Dimensions & Count */}
            <Card className="border-slate-200 dark:border-slate-800 shadow-sm">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-bold">2. Carton Specifications</CardTitle>
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
                  Enter exterior carton measurements and total box quantity
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
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
                      Gross Weight / Box ({unitSystem === 'metric' ? 'kg' : 'lbs'})
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
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                      Carton Quantity (Boxes)
                    </label>
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
                    <span>Amazon FBA Rule: Single carton side exceeds 63.5 cm limit. Permitted only if containing a single oversized unit.</span>
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
                  Interactive 3D Container Model
                </span>
                <span>Orbit • Rotate • Zoom</span>
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
                  <CardTitle className="text-base font-bold">Packing Feasibility Summary</CardTitle>
                  <Badge
                    className={
                      calculations.isVolumeExceeded || calculations.isWeightExceeded
                        ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                        : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                    }
                  >
                    {calculations.isVolumeExceeded || calculations.isWeightExceeded
                      ? 'Exceeds Limits'
                      : 'Fits in Container'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-4 space-y-5">
                {/* Metric Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="bg-slate-50 dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                    <div className="text-slate-500 font-medium">Cargo Volume</div>
                    <div className="text-base font-extrabold text-blue-600 dark:text-blue-400 mt-0.5">
                      {calculations.totalCbm.toFixed(2)} CBM
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">
                      Max: {container.usableVolumeMaxCbm} CBM
                    </div>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                    <div className="text-slate-500 font-medium">Volume Fill Rate</div>
                    <div
                      className={`text-base font-extrabold mt-0.5 ${
                        calculations.isVolumeExceeded ? 'text-rose-600' : 'text-emerald-600 dark:text-emerald-400'
                      }`}
                    >
                      {calculations.volumeUtilization.toFixed(1)}%
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">
                      Space: {calculations.remainingCbm.toFixed(1)} CBM left
                    </div>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                    <div className="text-slate-500 font-medium">Total Gross Weight</div>
                    <div className="text-base font-extrabold text-slate-800 dark:text-slate-200 mt-0.5">
                      {calculations.totalWeightTons.toFixed(2)} Tons
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">
                      {calculations.totalWeightKg.toLocaleString()} kg
                    </div>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                    <div className="text-slate-500 font-medium">Weight Fill Rate</div>
                    <div
                      className={`text-base font-extrabold mt-0.5 ${
                        calculations.isWeightExceeded ? 'text-rose-600' : 'text-slate-800 dark:text-slate-200'
                      }`}
                    >
                      {calculations.weightUtilization.toFixed(1)}%
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
                        CBM Utilization: {calculations.totalCbm.toFixed(1)} / {container.usableVolumeMaxCbm} CBM
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
                        Weight Capacity: {calculations.totalWeightTons.toFixed(1)} / {container.maxPayloadTons} Tons
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
                      <strong>Volume Capacity Exceeded:</strong> Total cargo ({calculations.totalCbm.toFixed(1)} CBM) exceeds the {container.code} maximum usable space ({container.usableVolumeMaxCbm} CBM). Consider upgrading to a {selectedContainerId === '20gp' ? '40GP or 40HQ' : '45HQ container'}.
                    </div>
                  </div>
                )}

                {calculations.isWeightExceeded && (
                  <div className="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 rounded-xl text-rose-800 dark:text-rose-300 text-xs flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                    <div>
                      <strong>Payload Weight Exceeded:</strong> Total gross weight ({calculations.totalWeightTons.toFixed(2)} Tons) exceeds the maritime safety limit ({container.maxPayloadTons} Tons). High risk of terminal refusal or road overweight fines.
                    </div>
                  </div>
                )}

                {/* Call to Action Bar */}
                <div className="pt-3 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 dark:border-slate-800">
                  <div className="text-xs text-slate-500">
                    Ready to book this container with JCD?
                  </div>
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
