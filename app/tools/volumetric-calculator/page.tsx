'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { SITE_CONFIG, getWhatsAppUrl } from '@/data/siteConfig';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
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
  Zap,
  Ship,
  Plus,
  Trash2,
  Scale,
  Box,
  MessageCircle,
  ChevronRight,
  Info,
  Copy,
  Check,
  RotateCcw,
} from 'lucide-react';

interface CartonLineItem {
  id: string;
  description: string;
  quantity: number;
  length: number; // cm or inches
  width: number;
  height: number;
  grossWeight: number; // kg or lbs per box
}

const INITIAL_ITEMS: CartonLineItem[] = [
  {
    id: '1',
    description: 'Carton Type A (Electronics)',
    quantity: 30,
    length: 50,
    width: 40,
    height: 35,
    grossWeight: 8.5,
  },
  {
    id: '2',
    description: 'Carton Type B (Accessories)',
    quantity: 20,
    length: 60,
    width: 40,
    height: 40,
    grossWeight: 14.0,
  },
];

export default function VolumetricCalculatorPage() {
  const [unitSystem, setUnitSystem] = useState<'metric' | 'imperial'>('metric');
  const [items, setItems] = useState<CartonLineItem[]>(INITIAL_ITEMS);
  const [copiedSummary, setCopiedSummary] = useState(false);

  const addItem = () => {
    const newItem: CartonLineItem = {
      id: Date.now().toString(),
      description: `Carton Type ${String.fromCharCode(65 + items.length)}`,
      quantity: 10,
      length: unitSystem === 'metric' ? 40 : 16,
      width: unitSystem === 'metric' ? 30 : 12,
      height: unitSystem === 'metric' ? 30 : 12,
      grossWeight: unitSystem === 'metric' ? 5 : 11,
    };
    setItems([...items, newItem]);
  };

  const applyPreset = (preset: 'small' | 'medium' | 'large') => {
    let newItem: CartonLineItem;
    if (preset === 'small') {
      newItem = {
        id: Date.now().toString(),
        description: 'Small Box (Sample / E-commerce)',
        quantity: 20,
        length: unitSystem === 'metric' ? 40 : 16,
        width: unitSystem === 'metric' ? 30 : 12,
        height: unitSystem === 'metric' ? 20 : 8,
        grossWeight: unitSystem === 'metric' ? 4 : 9,
      };
    } else if (preset === 'medium') {
      newItem = {
        id: Date.now().toString(),
        description: 'Standard Amazon FBA Carton',
        quantity: 30,
        length: unitSystem === 'metric' ? 50 : 20,
        width: unitSystem === 'metric' ? 40 : 16,
        height: unitSystem === 'metric' ? 35 : 14,
        grossWeight: unitSystem === 'metric' ? 10 : 22,
      };
    } else {
      newItem = {
        id: Date.now().toString(),
        description: 'Large Master Carton',
        quantity: 15,
        length: unitSystem === 'metric' ? 60 : 24,
        width: unitSystem === 'metric' ? 40 : 16,
        height: unitSystem === 'metric' ? 40 : 16,
        grossWeight: unitSystem === 'metric' ? 16 : 35,
      };
    }
    setItems([...items, newItem]);
  };

  const removeItem = (id: string) => {
    if (items.length <= 1) return;
    setItems(items.filter((item) => item.id !== id));
  };

  const resetItems = () => {
    setItems(INITIAL_ITEMS);
  };

  const updateItem = (id: string, field: keyof CartonLineItem, value: string | number) => {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          return { ...item, [field]: value };
        }
        return item;
      })
    );
  };

  // Aggregated Calculations
  const summary = useMemo(() => {
    let totalCartons = 0;
    let totalGrossWeightKg = 0;
    let totalVolumeCbm = 0;
    let totalAirVolumetricKg = 0;
    let totalExpressVolumetricKg = 0;

    items.forEach((item) => {
      const qty = item.quantity || 0;
      totalCartons += qty;

      // Convert measurements to metric (cm & kg)
      const lengthCm = unitSystem === 'metric' ? item.length : item.length * 2.54;
      const widthCm = unitSystem === 'metric' ? item.width : item.width * 2.54;
      const heightCm = unitSystem === 'metric' ? item.height : item.height * 2.54;
      const weightKg = unitSystem === 'metric' ? item.grossWeight : item.grossWeight * 0.453592;

      const lineGrossKg = weightKg * qty;
      totalGrossWeightKg += lineGrossKg;

      const lineCbm = ((lengthCm * widthCm * heightCm) / 1000000) * qty;
      totalVolumeCbm += lineCbm;

      // Air Divisor = 6000
      const lineAirVolKg = ((lengthCm * widthCm * heightCm) / 6000) * qty;
      totalAirVolumetricKg += lineAirVolKg;

      // Express Divisor = 5000
      const lineExpressVolKg = ((lengthCm * widthCm * heightCm) / 5000) * qty;
      totalExpressVolumetricKg += lineExpressVolKg;
    });

    const airChargeableKg = Math.max(totalGrossWeightKg, totalAirVolumetricKg);
    const expressChargeableKg = Math.max(totalGrossWeightKg, totalExpressVolumetricKg);

    const isAirVolumetric = totalAirVolumetricKg > totalGrossWeightKg;
    const isExpressVolumetric = totalExpressVolumetricKg > totalGrossWeightKg;

    // Imperial conversions
    const totalGrossWeightLbs = totalGrossWeightKg * 2.20462;
    const totalVolumeCuFt = totalVolumeCbm * 35.3147;
    const airChargeableLbs = airChargeableKg * 2.20462;
    const expressChargeableLbs = expressChargeableKg * 2.20462;
    const airVolumetricLbs = totalAirVolumetricKg * 2.20462;
    const expressVolumetricLbs = totalExpressVolumetricKg * 2.20462;

    return {
      totalCartons,
      totalGrossWeightKg,
      totalGrossWeightLbs,
      totalVolumeCbm,
      totalVolumeCuFt,
      totalAirVolumetricKg,
      airVolumetricLbs,
      totalExpressVolumetricKg,
      expressVolumetricLbs,
      airChargeableKg,
      airChargeableLbs,
      expressChargeableKg,
      expressChargeableLbs,
      isAirVolumetric,
      isExpressVolumetric,
    };
  }, [items, unitSystem]);

  // Copy calculation text
  const handleCopySummary = () => {
    const summaryText = `JCD Cargo Volumetric Weight Summary:
- Total Packages: ${summary.totalCartons} Cartons
- Actual Gross Weight: ${summary.totalGrossWeightKg.toFixed(1)} kg (${summary.totalGrossWeightLbs.toFixed(1)} lbs)
- Total Volume: ${summary.totalVolumeCbm.toFixed(2)} CBM (${summary.totalVolumeCuFt.toFixed(1)} cu ft)
- Air Freight Chargeable: ${summary.airChargeableKg.toFixed(1)} kg / ${summary.airChargeableLbs.toFixed(1)} lbs (${summary.isAirVolumetric ? 'Volumetric Billed' : 'Actual Weight Billed'})
- Express Courier Chargeable: ${summary.expressChargeableKg.toFixed(1)} kg / ${summary.expressChargeableLbs.toFixed(1)} lbs (${summary.isExpressVolumetric ? 'Volumetric Billed' : 'Actual Weight Billed'})
- Ocean Freight Volume: ${summary.totalVolumeCbm.toFixed(2)} CBM`;

    navigator.clipboard.writeText(summaryText);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2000);
  };

  // Pre-filled WhatsApp message
  const whatsappQuoteMsg = useMemo(() => {
    return `Hello David! I calculated my cargo dimensions with the JCD Volumetric Calculator:
- Total Cartons: ${summary.totalCartons} boxes
- Actual Weight: ${summary.totalGrossWeightKg.toFixed(1)} kg (${summary.totalGrossWeightLbs.toFixed(1)} lbs)
- Volume: ${summary.totalVolumeCbm.toFixed(2)} CBM (${summary.totalVolumeCuFt.toFixed(1)} cu ft)
- Air Chargeable Weight: ${summary.airChargeableKg.toFixed(1)} kg (${summary.isAirVolumetric ? 'Billed by Volume' : 'Billed by Weight'})
- Express Chargeable Weight: ${summary.expressChargeableKg.toFixed(1)} kg
Please provide an all-inclusive freight quote to my destination.`;
  }, [summary]);

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
              Volumetric Weight Calculator
            </span>
          </nav>
        </div>
      </div>

      {/* Header Banner */}
      <div className="bg-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <Badge className="bg-sky-600 text-white font-semibold">Standard Shipping Formulas</Badge>
            <Badge variant="outline" className="border-slate-700 text-slate-300">
              Air Freight • Express Courier • Ocean LCL
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Volumetric Weight &amp; Chargeable Freight Calculator
          </h1>
          <p className="text-slate-300 text-sm sm:text-base mt-2 max-w-3xl leading-relaxed">
            Quickly check whether international carriers will bill your shipment based on actual box weight or the physical space it takes up. Compare Air, Courier, and Ocean volumes side-by-side.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: Multi-line Carton Inputs */}
          <div className="lg:col-span-8 space-y-6">
            {/* Friendly Non-Technical Explainer Card */}
            <div className="p-4 rounded-2xl bg-blue-50/80 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-900/50 text-xs leading-relaxed text-blue-900 dark:text-blue-200 flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-sm font-bold block text-blue-950 dark:text-blue-100 mb-0.5">
                  How Does Freight Billing Work?
                </strong>
                Airlines and express couriers charge based on <strong>Chargeable Weight</strong> — whichever is bigger: the actual scale weight of your boxes, or the physical space they occupy in the airplane. If your items are lightweight but bulky (like pillows or shoe boxes), you are billed for space. If your items are small and heavy (like metal tools), you are billed for actual weight.
              </div>
            </div>

            <Card className="border-slate-200 dark:border-slate-800 shadow-sm">
              <CardHeader className="pb-3">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <CardTitle className="text-base font-bold">Your Package Dimensions</CardTitle>
                    <CardDescription className="text-xs">
                      Enter the dimensions and weights for each package size in your shipment
                    </CardDescription>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Metric / Imperial toggle */}
                    <div className="inline-flex rounded-lg border border-slate-200 dark:border-slate-800 p-0.5 bg-slate-100 dark:bg-slate-800 text-xs">
                      <button
                        type="button"
                        onClick={() => setUnitSystem('metric')}
                        className={`px-3 py-1 rounded-md font-medium transition-colors ${
                          unitSystem === 'metric'
                            ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs font-bold'
                            : 'text-slate-500'
                        }`}
                      >
                        Metric (cm / kg)
                      </button>
                      <button
                        type="button"
                        onClick={() => setUnitSystem('imperial')}
                        className={`px-3 py-1 rounded-md font-medium transition-colors ${
                          unitSystem === 'imperial'
                            ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs font-bold'
                            : 'text-slate-500'
                        }`}
                      >
                        Imperial (in / lbs)
                      </button>
                    </div>

                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={resetItems}
                      className="text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 h-7 px-2"
                      title="Reset to Sample Items"
                    >
                      <RotateCcw className="w-3.5 h-3.5 mr-1" />
                      Reset
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Table of items */}
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="text-xs">
                        <TableHead className="w-[180px]">Package Description</TableHead>
                        <TableHead className="w-[80px]">Quantity</TableHead>
                        <TableHead className="w-[80px]">Length ({unitSystem === 'metric' ? 'cm' : 'in'})</TableHead>
                        <TableHead className="w-[80px]">Width ({unitSystem === 'metric' ? 'cm' : 'in'})</TableHead>
                        <TableHead className="w-[80px]">Height ({unitSystem === 'metric' ? 'cm' : 'in'})</TableHead>
                        <TableHead className="w-[100px]">Weight ({unitSystem === 'metric' ? 'kg' : 'lbs'})</TableHead>
                        <TableHead className="w-[50px]"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {items.map((item) => (
                        <TableRow key={item.id} className="text-xs">
                          <TableCell>
                            <Input
                              type="text"
                              value={item.description}
                              onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                              className="text-xs h-8"
                            />
                          </TableCell>
                          <TableCell>
                            <Input
                              type="number"
                              min={1}
                              value={item.quantity}
                              onChange={(e) => updateItem(item.id, 'quantity', parseInt(e.target.value, 10) || 0)}
                              className="text-xs font-mono h-8"
                            />
                          </TableCell>
                          <TableCell>
                            <Input
                              type="number"
                              min={1}
                              value={item.length}
                              onChange={(e) => updateItem(item.id, 'length', parseFloat(e.target.value) || 0)}
                              className="text-xs font-mono h-8"
                            />
                          </TableCell>
                          <TableCell>
                            <Input
                              type="number"
                              min={1}
                              value={item.width}
                              onChange={(e) => updateItem(item.id, 'width', parseFloat(e.target.value) || 0)}
                              className="text-xs font-mono h-8"
                            />
                          </TableCell>
                          <TableCell>
                            <Input
                              type="number"
                              min={1}
                              value={item.height}
                              onChange={(e) => updateItem(item.id, 'height', parseFloat(e.target.value) || 0)}
                              className="text-xs font-mono h-8"
                            />
                          </TableCell>
                          <TableCell>
                            <Input
                              type="number"
                              min={0.1}
                              step={0.5}
                              value={item.grossWeight}
                              onChange={(e) => updateItem(item.id, 'grossWeight', parseFloat(e.target.value) || 0)}
                              className="text-xs font-mono h-8"
                            />
                          </TableCell>
                          <TableCell>
                            <button
                              type="button"
                              onClick={() => removeItem(item.id)}
                              disabled={items.length <= 1}
                              className="text-slate-400 hover:text-rose-500 disabled:opacity-30 transition-colors p-1"
                              title="Delete Box Row"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Quick Add Presets Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex flex-wrap items-center gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addItem}
                      className="text-xs flex items-center gap-1.5"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Add Custom Box
                    </Button>

                    <span className="text-[11px] text-slate-400 ml-1">Quick Presets:</span>
                    <button
                      type="button"
                      onClick={() => applyPreset('small')}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-slate-700 dark:text-slate-300 text-[11px] font-medium transition-colors"
                    >
                      + Small Box (40x30x20)
                    </button>
                    <button
                      type="button"
                      onClick={() => applyPreset('medium')}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-slate-700 dark:text-slate-300 text-[11px] font-medium transition-colors"
                    >
                      + Amazon FBA (50x40x35)
                    </button>
                    <button
                      type="button"
                      onClick={() => applyPreset('large')}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-slate-700 dark:text-slate-300 text-[11px] font-medium transition-colors"
                    >
                      + Master Carton (60x40x40)
                    </button>
                  </div>

                  <div className="text-xs text-slate-500 font-medium">
                    Total: <span className="font-bold text-slate-900 dark:text-slate-100">{summary.totalCartons} Cartons</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Clear Formula Guide */}
            <Card className="border-slate-200 dark:border-slate-800">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-bold flex items-center gap-2">
                  <Info className="w-4 h-4 text-blue-600" />
                  How Carriers Compute Charges
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                <div>
                  <strong>Air Freight (Formula: L × W × H ÷ 6,000):</strong> Standard airline rule. If 1 cubic meter of space weighs less than 167 kg, it is billed based on volume.
                </div>
                <div>
                  <strong>Express Courier (Formula: L × W × H ÷ 5,000):</strong> DHL, FedEx, and UPS use a stricter ratio (1 CBM = 200 kg). Light parcels are more frequently billed by space.
                </div>
                <div>
                  <strong>Ocean Freight (CBM):</strong> Sea freight is billed strictly on the volume of space (Cubic Meters). 1 CBM allows up to 1,000 kg before any extra weight charges apply.
                </div>
              </CardContent>
            </Card>
          </div>

          {/* RIGHT: Comparison Results Card */}
          <div className="lg:col-span-4 space-y-6">
            <Card className="border-slate-200 dark:border-slate-800 shadow-md">
              <CardHeader className="pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base font-bold">Calculation Results</CardTitle>
                    <CardDescription className="text-xs">
                      Chargeable weight by shipping method
                    </CardDescription>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleCopySummary}
                    className="text-xs flex items-center gap-1 h-8"
                  >
                    {copiedSummary ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedSummary ? 'Copied!' : 'Copy'}</span>
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-4 space-y-5">
                {/* Total Gross Weight & Volume */}
                <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
                  <div>
                    <span className="text-slate-500 font-medium">Actual Scale Weight:</span>
                    <div className="text-base font-extrabold text-slate-900 dark:text-slate-100 mt-0.5">
                      {summary.totalGrossWeightKg.toFixed(1)} kg
                    </div>
                    <div className="text-[10px] text-slate-400">
                      {summary.totalGrossWeightLbs.toFixed(1)} lbs
                    </div>
                  </div>
                  <div>
                    <span className="text-slate-500 font-medium">Total Volume Space:</span>
                    <div className="text-base font-extrabold text-blue-600 dark:text-blue-400 mt-0.5">
                      {summary.totalVolumeCbm.toFixed(2)} CBM
                    </div>
                    <div className="text-[10px] text-slate-400">
                      {summary.totalVolumeCuFt.toFixed(1)} cu ft
                    </div>
                  </div>
                </div>

                {/* 1. AIR FREIGHT RESULT */}
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 font-bold text-xs">
                      <Plane className="w-4 h-4 text-sky-600" />
                      Air Freight
                    </div>
                    <Badge
                      className={
                        summary.isAirVolumetric
                          ? 'bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300 text-[10px]'
                          : 'bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-300 text-[10px]'
                      }
                    >
                      {summary.isAirVolumetric ? 'Billed by Volume' : 'Billed by Weight'}
                    </Badge>
                  </div>
                  <div className="text-xl font-extrabold text-slate-900 dark:text-white">
                    {summary.airChargeableKg.toFixed(1)} kg{' '}
                    <span className="text-xs font-normal text-slate-500">
                      ({summary.airChargeableLbs.toFixed(1)} lbs)
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Volume Weight: {summary.totalAirVolumetricKg.toFixed(1)} kg vs Scale: {summary.totalGrossWeightKg.toFixed(1)} kg
                  </div>
                </div>

                {/* 2. EXPRESS COURIER RESULT */}
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 font-bold text-xs">
                      <Zap className="w-4 h-4 text-amber-600" />
                      Express Courier (DHL/FedEx/UPS)
                    </div>
                    <Badge
                      className={
                        summary.isExpressVolumetric
                          ? 'bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300 text-[10px]'
                          : 'bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-300 text-[10px]'
                      }
                    >
                      {summary.isExpressVolumetric ? 'Billed by Volume' : 'Billed by Weight'}
                    </Badge>
                  </div>
                  <div className="text-xl font-extrabold text-slate-900 dark:text-white">
                    {summary.expressChargeableKg.toFixed(1)} kg{' '}
                    <span className="text-xs font-normal text-slate-500">
                      ({summary.expressChargeableLbs.toFixed(1)} lbs)
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Volume Weight: {summary.totalExpressVolumetricKg.toFixed(1)} kg vs Scale: {summary.totalGrossWeightKg.toFixed(1)} kg
                  </div>
                </div>

                {/* 3. OCEAN LCL RESULT */}
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 font-bold text-xs">
                      <Ship className="w-4 h-4 text-blue-600" />
                      Ocean LCL (Shared Container)
                    </div>
                    <Badge className="bg-blue-100 text-blue-900 dark:bg-blue-950 dark:text-blue-300 text-[10px]">
                      Billed by Space (CBM)
                    </Badge>
                  </div>
                  <div className="text-xl font-extrabold text-blue-600 dark:text-blue-400">
                    {summary.totalVolumeCbm.toFixed(2)} CBM{' '}
                    <span className="text-xs font-normal text-slate-500">
                      ({summary.totalVolumeCuFt.toFixed(1)} cu ft)
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Standard ocean rate applies up to 1,000 kg per CBM.
                  </div>
                </div>

                {/* Action Button */}
                <div className="pt-2">
                  <a
                    href={getWhatsAppUrl(whatsappQuoteMsg)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs py-3.5 shadow-md shadow-emerald-900/20 transition-all hover:scale-[1.02]"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Get Instant Quote for this Shipment
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
