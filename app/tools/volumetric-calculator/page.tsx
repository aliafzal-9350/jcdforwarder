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
  HelpCircle,
  AlertCircle,
  ChevronRight,
  Info,
  CheckCircle2,
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

  const removeItem = (id: string) => {
    if (items.length <= 1) return;
    setItems(items.filter((item) => item.id !== id));
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

    return {
      totalCartons,
      totalGrossWeightKg,
      totalVolumeCbm,
      totalAirVolumetricKg,
      totalExpressVolumetricKg,
      airChargeableKg,
      expressChargeableKg,
      isAirVolumetric,
      isExpressVolumetric,
    };
  }, [items, unitSystem]);

  // Pre-filled WhatsApp message
  const whatsappQuoteMsg = useMemo(() => {
    return `Hello David! I calculated my cargo dimensions with the JCD Volumetric Calculator:
- Total Cartons: ${summary.totalCartons} boxes
- Actual Gross Weight: ${summary.totalGrossWeightKg.toFixed(1)} kg
- Total Volume: ${summary.totalVolumeCbm.toFixed(2)} CBM
- Air Chargeable Weight: ${summary.airChargeableKg.toFixed(1)} kg (${summary.isAirVolumetric ? 'Volumetric Billed' : 'Actual Weight Billed'})
- Express Chargeable Weight: ${summary.expressChargeableKg.toFixed(1)} kg
Please provide an all-inclusive DDP rate to my destination.`;
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
            <Badge className="bg-sky-600 text-white font-semibold">IATA Standard Ratios</Badge>
            <Badge variant="outline" className="border-slate-700 text-slate-300">
              Air (6000) • Express (5000) • Ocean (CBM)
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Volumetric Weight & Chargeable Freight Calculator
          </h1>
          <p className="text-slate-300 text-sm sm:text-base mt-2 max-w-3xl leading-relaxed">
            Determine whether international carriers will bill your shipment based on actual dead weight or volumetric space.
            Calculate Air Freight, Courier Express, and Ocean LCL volume side-by-side with multi-carton breakdown.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: Multi-line Carton Inputs */}
          <div className="lg:col-span-8 space-y-6">
            <Card className="border-slate-200 dark:border-slate-800 shadow-sm">
              <CardHeader className="pb-3">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <CardTitle className="text-base font-bold">Carton Line Items</CardTitle>
                    <CardDescription className="text-xs">
                      Enter dimensions and weights for each package size in your shipment
                    </CardDescription>
                  </div>

                  {/* Metric / Imperial toggle */}
                  <div className="inline-flex rounded-lg border border-slate-200 dark:border-slate-800 p-0.5 bg-slate-100 dark:bg-slate-800 text-xs">
                    <button
                      type="button"
                      onClick={() => setUnitSystem('metric')}
                      className={`px-3 py-1 rounded-md font-medium transition-colors ${
                        unitSystem === 'metric'
                          ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs'
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
                          ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs'
                          : 'text-slate-500'
                      }`}
                    >
                      Imperial (in / lbs)
                    </button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="text-xs">
                        <TableHead className="w-[180px]">Package Description</TableHead>
                        <TableHead className="w-[80px]">Quantity</TableHead>
                        <TableHead className="w-[80px]">L ({unitSystem === 'metric' ? 'cm' : 'in'})</TableHead>
                        <TableHead className="w-[80px]">W ({unitSystem === 'metric' ? 'cm' : 'in'})</TableHead>
                        <TableHead className="w-[80px]">H ({unitSystem === 'metric' ? 'cm' : 'in'})</TableHead>
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
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addItem}
                    className="text-xs flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Add Package Size
                  </Button>

                  <div className="text-xs text-slate-500 font-medium">
                    Total Packages: <span className="font-bold text-slate-800 dark:text-slate-200">{summary.totalCartons} Cartons</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Explanatory Formula Guide */}
            <Card className="border-slate-200 dark:border-slate-800">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-bold flex items-center gap-2">
                  <Info className="w-4 h-4 text-blue-600" />
                  Volumetric Billing Standards Explained
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                <div>
                  <strong>Air Freight Divisor (6,000):</strong> Standard IATA air cargo ratio where 1 CBM is equivalent to 166.67 kg. Chargeable weight = (L x W x H in cm) / 6,000.
                </div>
                <div>
                  <strong>Express Courier Divisor (5,000):</strong> DHL, FedEx, and UPS international courier services utilize a 1:200 ratio (1 CBM = 200 kg). Chargeable weight = (L x W x H in cm) / 5,000.
                </div>
                <div>
                  <strong>Ocean LCL Volume (CBM):</strong> Ocean freight bills on volume. 1 CBM = 1,000,000 cubic centimeters. In standard ocean freight, 1 CBM is credited up to 1,000 kg before density surcharges apply.
                </div>
              </CardContent>
            </Card>
          </div>

          {/* RIGHT: Multimodal Comparison Results Card */}
          <div className="lg:col-span-4 space-y-6">
            <Card className="border-slate-200 dark:border-slate-800 shadow-md">
              <CardHeader className="pb-3 border-b border-slate-100 dark:border-slate-800">
                <CardTitle className="text-base font-bold">Chargeable Weight Results</CardTitle>
                <CardDescription className="text-xs">
                  Side-by-side mode billing comparison
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4 space-y-6">
                {/* Total Gross Weight & Volume */}
                <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
                  <div>
                    <span className="text-slate-500 font-medium">Actual Gross Weight:</span>
                    <div className="text-base font-extrabold text-slate-800 dark:text-slate-200 mt-0.5">
                      {summary.totalGrossWeightKg.toFixed(1)} kg
                    </div>
                  </div>
                  <div>
                    <span className="text-slate-500 font-medium">Total Volume:</span>
                    <div className="text-base font-extrabold text-blue-600 dark:text-blue-400 mt-0.5">
                      {summary.totalVolumeCbm.toFixed(2)} CBM
                    </div>
                  </div>
                </div>

                {/* 1. AIR FREIGHT RESULT */}
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 font-bold text-xs">
                      <Plane className="w-4 h-4 text-sky-600" />
                      Air Freight (Divisor 6000)
                    </div>
                    <Badge
                      className={
                        summary.isAirVolumetric
                          ? 'bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300 text-[10px]'
                          : 'bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-300 text-[10px]'
                      }
                    >
                      {summary.isAirVolumetric ? 'Volumetric Billed' : 'Actual Weight Billed'}
                    </Badge>
                  </div>
                  <div className="text-xl font-extrabold text-slate-900 dark:text-white">
                    {summary.airChargeableKg.toFixed(1)} kg{' '}
                    <span className="text-xs font-normal text-slate-500">Chargeable Weight</span>
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Volumetric Weight: {summary.totalAirVolumetricKg.toFixed(1)} kg vs Gross: {summary.totalGrossWeightKg.toFixed(1)} kg
                  </div>
                </div>

                {/* 2. EXPRESS COURIER RESULT */}
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 font-bold text-xs">
                      <Zap className="w-4 h-4 text-amber-600" />
                      Express Courier (Divisor 5000)
                    </div>
                    <Badge
                      className={
                        summary.isExpressVolumetric
                          ? 'bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300 text-[10px]'
                          : 'bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-300 text-[10px]'
                      }
                    >
                      {summary.isExpressVolumetric ? 'Volumetric Billed' : 'Actual Weight Billed'}
                    </Badge>
                  </div>
                  <div className="text-xl font-extrabold text-slate-900 dark:text-white">
                    {summary.expressChargeableKg.toFixed(1)} kg{' '}
                    <span className="text-xs font-normal text-slate-500">Chargeable Weight</span>
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Volumetric Weight: {summary.totalExpressVolumetricKg.toFixed(1)} kg vs Gross: {summary.totalGrossWeightKg.toFixed(1)} kg
                  </div>
                </div>

                {/* 3. OCEAN LCL RESULT */}
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 font-bold text-xs">
                      <Ship className="w-4 h-4 text-blue-600" />
                      Ocean LCL Consolidation
                    </div>
                    <Badge className="bg-blue-100 text-blue-900 dark:bg-blue-950 dark:text-blue-300 text-[10px]">
                      Volume Billed
                    </Badge>
                  </div>
                  <div className="text-xl font-extrabold text-blue-600 dark:text-blue-400">
                    {summary.totalVolumeCbm.toFixed(2)} CBM{' '}
                    <span className="text-xs font-normal text-slate-500">Chargeable Volume</span>
                  </div>
                  <div className="text-[11px] text-slate-500">
                    West Coast Ratio: 1 CBM : 1,000 kg • East Coast: 1 CBM : 500 kg
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
                    Get Instant Quote for this Volume
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
