"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import {
  FileSpreadsheet,
  Printer,
  Plus,
  Trash2,
  Copy,
  Check,
  RotateCcw,
  Info,
  HelpCircle,
  Box,
  Hash,
  Upload,
  Download,
  Eye,
  ArrowRight,
  ZoomIn,
  ZoomOut,
  Save,
  CheckCircle2,
  FileText,
  SlidersHorizontal,
  ChevronRight,
  ShieldCheck,
  Building2,
  User,
  Calendar,
  Anchor,
  Truck,
  Layers,
  Star,
  ExternalLink
} from "lucide-react";

// --- TEMPLATE DEFINITIONS ---
export type TemplateCategory = "essential" | "professional" | "detailed";
export type TemplateId =
  | "logistics-blue"
  | "corporate-panel"
  | "classic-boxed"
  | "minimal-clean"
  | "emerald-cargo"
  | "amber-express";

interface TemplateDefinition {
  id: TemplateId;
  name: string;
  category: TemplateCategory;
  categoryLabel: string;
  recommended?: boolean;
  description: string;
  idealFor: string;
  primaryColor: string;
  badgeBg: string;
}

const TEMPLATES: TemplateDefinition[] = [
  {
    id: "logistics-blue",
    name: "Logistics Blue",
    category: "professional",
    categoryLabel: "Shipping Professional",
    recommended: true,
    description: "A shipping-first layout with a bold header, reference matrix, and measurement-focused totals.",
    idealFor: "Freight forwarders, exporters, and regular international shipments.",
    primaryColor: "#0C244C",
    badgeBg: "bg-blue-50 text-blue-700 border-blue-200"
  },
  {
    id: "corporate-panel",
    name: "Corporate Panel",
    category: "professional",
    categoryLabel: "Shipping Professional",
    description: "A refined split-header design with balanced document references and cargo information.",
    idealFor: "Manufacturers, trading companies, and branded exporters.",
    primaryColor: "#1E293B",
    badgeBg: "bg-slate-50 text-slate-700 border-slate-200"
  },
  {
    id: "classic-boxed",
    name: "Classic Boxed",
    category: "professional",
    categoryLabel: "Shipping Professional",
    description: "A familiar bordered packing list with clear company, consignee, cargo, and total blocks.",
    idealFor: "Supplier packing lists, cartons, customs, and general commercial shipments.",
    primaryColor: "#0F172A",
    badgeBg: "bg-slate-50 text-slate-700 border-slate-200"
  },
  {
    id: "minimal-clean",
    name: "Minimal Clean",
    category: "essential",
    categoryLabel: "Essential Packing",
    description: "A streamlined, high-contrast layout focused on package descriptions and clean line totals.",
    idealFor: "Courier express, air shipments, and small business parcel exports.",
    primaryColor: "#2563EB",
    badgeBg: "bg-blue-50 text-blue-700 border-blue-200"
  },
  {
    id: "emerald-cargo",
    name: "Emerald Cargo",
    category: "detailed",
    categoryLabel: "Detailed Cargo",
    description: "Industrial green accent layout with expanded dimensions, container, and seal numbers.",
    idealFor: "Heavy machinery, ocean FCL containers, and project cargo.",
    primaryColor: "#065F46",
    badgeBg: "bg-emerald-50 text-emerald-700 border-emerald-200"
  },
  {
    id: "amber-express",
    name: "Amber Express",
    category: "detailed",
    categoryLabel: "Detailed Cargo",
    description: "High-visibility modern layout tailored for e-commerce, Amazon FBA, and multi-SKU boxes.",
    idealFor: "Amazon FBA prep, consumer electronics, and fast-track air shipments.",
    primaryColor: "#D97706",
    badgeBg: "bg-amber-50 text-amber-700 border-amber-200"
  }
];

interface PackingLine {
  id: string;
  cartonRange: string;
  packagesCount: number;
  description: string;
  qtyPerBox: number;
  netWeightPerBox: number; // kg
  grossWeightPerBox: number; // kg
  lengthCm: number;
  widthCm: number;
  heightCm: number;
}

const CARTON_PRESETS = [
  { name: "Standard Export Box", l: 50, w: 40, h: 35, desc: "Most popular consumer carton" },
  { name: "Amazon FBA Master", l: 50, w: 40, h: 40, desc: "Amazon warehouse standard" },
  { name: "Heavy Parts Carton", l: 60, w: 40, h: 40, desc: "Dense machinery & metal goods" },
  { name: "Compact Electronics", l: 40, w: 30, h: 25, desc: "Small gadgets & accessories" }
];

const INITIAL_LINES: PackingLine[] = [
  {
    id: "1",
    cartonRange: "",
    packagesCount: 0,
    description: "",
    qtyPerBox: 0,
    netWeightPerBox: 0,
    grossWeightPerBox: 0,
    lengthCm: 0,
    widthCm: 0,
    heightCm: 0
  }
];

export default function PackingListGeneratorPage() {
  // Navigation & View State (Start on template-picker for clean client experience)
  const [currentStep, setCurrentStep] = useState<"template-picker" | "editor">("template-picker");
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateId>("logistics-blue");
  const [templateFilter, setTemplateFilter] = useState<TemplateCategory | "all">("professional");
  const [activeFormTab, setActiveFormTab] = useState<number>(1);
  const [zoomLevel, setZoomLevel] = useState<number>(85);
  const [copiedSummary, setCopiedSummary] = useState(false);
  const [saveToast, setSaveToast] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  // Shipper / Exporter (Clean empty state for client data entry)
  const [shipperName, setShipperName] = useState("");
  const [shipperCountry, setShipperCountry] = useState("");
  const [shipperAddress, setShipperAddress] = useState("");
  const [shipperContact, setShipperContact] = useState("");
  const [shipperPhone, setShipperPhone] = useState("");
  const [shipperEmail, setShipperEmail] = useState("");
  const [shipperWebsite, setShipperWebsite] = useState("");

  // Buyer / Consignee
  const [buyerName, setBuyerName] = useState("");
  const [buyerCountry, setBuyerCountry] = useState("");
  const [buyerAddress, setBuyerAddress] = useState("");
  const [buyerContact, setBuyerContact] = useState("");
  const [buyerPhone, setBuyerPhone] = useState("");
  const [buyerEmail, setBuyerEmail] = useState("");
  const [notifyParty, setNotifyParty] = useState("");

  // References
  const [packingListNo, setPackingListNo] = useState("");
  const [invoiceRefNo, setInvoiceRefNo] = useState("");
  const [documentDate, setDocumentDate] = useState("");
  const [poNumber, setPoNumber] = useState("");
  const [lcNumber, setLcNumber] = useState("");

  // Transport Details
  const [portOfLoading, setPortOfLoading] = useState("");
  const [portOfDischarge, setPortOfDischarge] = useState("");
  const [finalDestination, setFinalDestination] = useState("");
  const [vesselVoyage, setVesselVoyage] = useState("");
  const [containerNo, setContainerNo] = useState("");
  const [sealNo, setSealNo] = useState("");
  const [incoterms, setIncoterms] = useState("");

  // Package Lines
  const [lines, setLines] = useState<PackingLine[]>(INITIAL_LINES);

  // Notes & Signatures
  const [declarationText, setDeclarationText] = useState("");
  const [signerName, setSignerName] = useState("");
  const [signerTitle, setSignerTitle] = useState("");
  const [signatureDate, setSignatureDate] = useState("");

  // Calculations
  const totals = useMemo(() => {
    let totalPackages = 0;
    let totalQuantity = 0;
    let totalNetWeight = 0;
    let totalGrossWeight = 0;
    let totalCbm = 0;

    lines.forEach((line) => {
      const pkgs = Number(line.packagesCount) || 0;
      totalPackages += pkgs;
      totalQuantity += pkgs * (Number(line.qtyPerBox) || 0);
      totalNetWeight += pkgs * (Number(line.netWeightPerBox) || 0);
      totalGrossWeight += pkgs * (Number(line.grossWeightPerBox) || 0);

      const singleBoxCbm = (Number(line.lengthCm) * Number(line.widthCm) * Number(line.heightCm)) / 1000000;
      totalCbm += pkgs * singleBoxCbm;
    });

    const totalCft = totalCbm * 35.3147;
    const totalGwLbs = totalGrossWeight * 2.20462;
    const totalNwLbs = totalNetWeight * 2.20462;

    return {
      totalPackages,
      totalQuantity,
      totalNetWeight: Math.round(totalNetWeight * 10) / 10,
      totalGrossWeight: Math.round(totalGrossWeight * 10) / 10,
      totalNetWeightLbs: Math.round(totalNwLbs * 10) / 10,
      totalGrossWeightLbs: Math.round(totalGwLbs * 10) / 10,
      totalCbm: Math.round(totalCbm * 1000) / 1000,
      totalCft: Math.round(totalCft * 10) / 10
    };
  }, [lines]);

  // Load from local storage if present
  useEffect(() => {
    try {
      const saved = localStorage.getItem("jcd_packing_list_draft");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.shipperName) setShipperName(parsed.shipperName);
        if (parsed.buyerName) setBuyerName(parsed.buyerName);
        if (parsed.packingListNo) setPackingListNo(parsed.packingListNo);
        if (parsed.lines && parsed.lines.length > 0) setLines(parsed.lines);
        if (parsed.selectedTemplate) setSelectedTemplate(parsed.selectedTemplate);
        if (parsed.logoPreview) setLogoPreview(parsed.logoPreview);
      }
    } catch (e) {
      console.warn("Could not load local draft", e);
    }
  }, []);

  // Save draft
  const handleSaveDraft = () => {
    try {
      const draft = {
        selectedTemplate,
        shipperName,
        shipperCountry,
        shipperAddress,
        shipperContact,
        shipperPhone,
        shipperEmail,
        buyerName,
        buyerCountry,
        buyerAddress,
        buyerContact,
        packingListNo,
        invoiceRefNo,
        documentDate,
        portOfLoading,
        portOfDischarge,
        incoterms,
        lines,
        logoPreview
      };
      localStorage.setItem("jcd_packing_list_draft", JSON.stringify(draft));
      setSaveToast(true);
      setTimeout(() => setSaveToast(false), 2500);
    } catch (e) {
      console.warn("Save draft error", e);
    }
  };

  // Logo upload handler
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 1024 * 1024) {
      alert("Please upload an image smaller than 1MB");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setLogoPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  // Add line item
  const handleAddLine = () => {
    const newLine: PackingLine = {
      id: Date.now().toString(),
      cartonRange: "",
      packagesCount: 0,
      description: "",
      qtyPerBox: 0,
      netWeightPerBox: 0,
      grossWeightPerBox: 0,
      lengthCm: 0,
      widthCm: 0,
      heightCm: 0
    };
    setLines([...lines, newLine]);
  };

  // Remove line item
  const handleRemoveLine = (id: string) => {
    if (lines.length <= 1) return;
    setLines(lines.filter((l) => l.id !== id));
  };

  // Update line item
  const handleUpdateLine = (id: string, field: keyof PackingLine, val: any) => {
    setLines(
      lines.map((l) => {
        if (l.id !== id) return l;
        return { ...l, [field]: val };
      })
    );
  };

  // Reset form
  const handleReset = () => {
    if (confirm("Reset all fields to an empty packing list?")) {
      setShipperName("");
      setShipperCountry("");
      setShipperAddress("");
      setShipperContact("");
      setShipperPhone("");
      setShipperEmail("");
      setShipperWebsite("");
      setBuyerName("");
      setBuyerCountry("");
      setBuyerAddress("");
      setBuyerContact("");
      setBuyerPhone("");
      setBuyerEmail("");
      setNotifyParty("");
      setPackingListNo("");
      setInvoiceRefNo("");
      setDocumentDate("");
      setPoNumber("");
      setLcNumber("");
      setPortOfLoading("");
      setPortOfDischarge("");
      setFinalDestination("");
      setVesselVoyage("");
      setContainerNo("");
      setSealNo("");
      setIncoterms("");
      setDeclarationText("");
      setSignerName("");
      setSignerTitle("");
      setSignatureDate("");
      setLogoPreview(null);
      setLines([
        {
          id: "1",
          cartonRange: "",
          packagesCount: 0,
          description: "",
          qtyPerBox: 0,
          netWeightPerBox: 0,
          grossWeightPerBox: 0,
          lengthCm: 0,
          widthCm: 0,
          heightCm: 0
        }
      ]);
      localStorage.removeItem("jcd_packing_list_draft");
    }
  };

  // Copy summary
  const handleCopySummary = () => {
    const text = `PACKING LIST SUMMARY (${packingListNo})
Shipper: ${shipperName}
Consignee: ${buyerName}
Routing: ${portOfLoading} → ${portOfDischarge}
Incoterm: ${incoterms}
Total Cartons: ${totals.totalPackages} pkgs
Total Quantity: ${totals.totalQuantity.toLocaleString()} pcs
Total Net Weight: ${totals.totalNetWeight} kg (${totals.totalNetWeightLbs} lbs)
Total Gross Weight: ${totals.totalGrossWeight} kg (${totals.totalGrossWeightLbs} lbs)
Total Volume: ${totals.totalCbm} CBM (${totals.totalCft} CFT)
Prepared via JCD Forwarder (https://jcdforwarder.com/tools/packing-list-generator)`;

    navigator.clipboard.writeText(text);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2500);
  };

  // Native Print Handler
  const handlePrint = () => {
    window.print();
  };

  // Active template metadata
  const currentTpl = useMemo(() => {
    return TEMPLATES.find((t) => t.id === selectedTemplate) || TEMPLATES[0];
  }, [selectedTemplate]);

  // Filtered template cards for picker
  const filteredTemplates = useMemo(() => {
    if (templateFilter === "all") return TEMPLATES;
    return TEMPLATES.filter((t) => t.category === templateFilter);
  }, [templateFilter]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* 1. HERO HEADER SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#081B38] via-[#0C244C] to-[#081B38] text-white pt-10 pb-12 print:hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold uppercase tracking-wider backdrop-blur-md">
            <FileSpreadsheet className="w-3.5 h-3.5 text-orange-400" />
            <span>International Shipping Tool</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            Free Packing List Generator
          </h1>

          <p className="text-sm sm:text-base text-blue-200/90 max-w-2xl mx-auto leading-relaxed">
            Choose a professional packing list template, enter shipment and package details, then preview live and download a ready-to-use PDF for export customs clearance.
          </p>

          <div className="flex items-center justify-center gap-3 pt-2 text-xs text-slate-300">
            <span className="flex items-center gap-1 text-rose-400">❤️ Rate our tools!</span>
            <div className="flex items-center text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
              ))}
            </div>
            <span className="font-bold text-white">5/5</span>
            <span>(verified exporter rating)</span>
          </div>
        </div>
      </section>

      {/* 2. MAIN TOOL WRAPPER */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 -mt-6">
        {/* --- STAGE 1: TEMPLATE PICKER VIEW --- */}
        {currentStep === "template-picker" && (
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-200/80 dark:border-slate-800 space-y-8 animate-in fade-in duration-300">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">
                    1
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                    Choose a Packing List Template
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  Choose one of six designs in three field levels. Your entered information stays available when you change templates.
                </p>
              </div>

              <button
                onClick={() => setCurrentStep("editor")}
                className="px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs flex items-center gap-2 transition-colors cursor-pointer"
              >
                <span>Back to Editor</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2 p-1.5 bg-slate-100 dark:bg-slate-800/80 rounded-2xl w-fit">
              <button
                onClick={() => setTemplateFilter("all")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  templateFilter === "all"
                    ? "bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                }`}
              >
                All Templates (6)
              </button>
              <button
                onClick={() => setTemplateFilter("essential")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  templateFilter === "essential"
                    ? "bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                }`}
              >
                Essential <span className="text-[10px] opacity-70 font-normal ml-1">Essential Fields</span>
              </button>
              <button
                onClick={() => setTemplateFilter("professional")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  templateFilter === "professional"
                    ? "bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                }`}
              >
                Shipping Professional <span className="text-[10px] opacity-70 font-normal ml-1">Freight Forwarding</span>
              </button>
              <button
                onClick={() => setTemplateFilter("detailed")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  templateFilter === "detailed"
                    ? "bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                }`}
              >
                Detailed Cargo <span className="text-[10px] opacity-70 font-normal ml-1">Advanced Cargo Fields</span>
              </button>
            </div>

            {/* Template Cards Grid (Matching DDPChain screenshot 1) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTemplates.map((tpl) => {
                const isSelected = selectedTemplate === tpl.id;
                return (
                  <div
                    key={tpl.id}
                    className={`group relative rounded-2xl border p-5 transition-all flex flex-col justify-between bg-white dark:bg-slate-900 ${
                      isSelected
                        ? "border-blue-600 shadow-lg ring-2 ring-blue-600/20"
                        : "border-slate-200 dark:border-slate-800 hover:border-slate-300 hover:shadow-md"
                    }`}
                  >
                    {/* Top Recommended Tag */}
                    {tpl.recommended && (
                      <div className="absolute -top-3 right-4 bg-blue-600 text-white px-2.5 py-0.5 rounded-full text-[10px] font-extrabold tracking-wider uppercase shadow-xs">
                        Recommended
                      </div>
                    )}

                    <div className="space-y-4">
                      {/* Document Wireframe Preview */}
                      <div className="w-full h-44 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/60 p-3.5 flex flex-col justify-between overflow-hidden shadow-inner">
                        {/* Header bar wireframe */}
                        <div
                          className="w-full h-8 rounded-lg flex items-center justify-between px-3 text-white font-black text-[10px] tracking-wider"
                          style={{ backgroundColor: tpl.primaryColor }}
                        >
                          <span>PACKING LIST</span>
                          <span className="opacity-60 text-[8px]">EXP-2026</span>
                        </div>

                        {/* Middle wireframe fields */}
                        <div className="space-y-1.5 py-2">
                          <div className="grid grid-cols-2 gap-2">
                            <div className="h-6 rounded bg-slate-200/70 dark:bg-slate-700/70" />
                            <div className="h-6 rounded bg-slate-200/70 dark:bg-slate-700/70" />
                          </div>
                          <div className="h-4 rounded bg-slate-200/50 dark:bg-slate-700/50 w-3/4" />
                          <div className="h-10 rounded border border-dashed border-slate-300 dark:border-slate-600 flex flex-col justify-around px-1.5">
                            <div className="h-1.5 bg-slate-200 dark:bg-slate-700 rounded w-full" />
                            <div className="h-1.5 bg-slate-200 dark:bg-slate-700 rounded w-5/6" />
                          </div>
                        </div>

                        {/* Footer wireframe */}
                        <div className="flex justify-between items-center pt-1 border-t border-slate-200 dark:border-slate-700 text-[8px] text-slate-400">
                          <span>TOTAL PACKAGES: 60</span>
                          <span>TOTAL CBM: 5.4</span>
                        </div>
                      </div>

                      {/* Card Content */}
                      <div className="space-y-2">
                        <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold border ${tpl.badgeBg}`}>
                          {tpl.categoryLabel}
                        </span>

                        <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                          {tpl.name}
                        </h3>

                        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2">
                          {tpl.description}
                        </p>

                        <p className="text-[11px] text-slate-400 dark:text-slate-500 italic">
                          {tpl.idealFor}
                        </p>
                      </div>
                    </div>

                    {/* Card Actions */}
                    <div className="pt-5 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-3">
                      <button
                        onClick={() => {
                          setSelectedTemplate(tpl.id);
                          setCurrentStep("editor");
                        }}
                        className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                          isSelected
                            ? "bg-blue-600 text-white shadow-md shadow-blue-500/20 hover:bg-blue-700"
                            : "bg-blue-600 text-white hover:bg-blue-700"
                        }`}
                      >
                        <span>{isSelected ? "Current Template" : "Use Template"}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* --- STAGE 2: SPLIT-SCREEN EDITOR & LIVE DOCUMENT PREVIEW --- */}
        {currentStep === "editor" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Top Toolbar (Matching DDPChain screenshot 2) */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 shadow-sm border border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 print:hidden">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    ACTIVE DESIGN
                  </div>
                  <div className="text-sm font-black text-slate-800 dark:text-white flex items-center gap-2">
                    <span>{currentTpl.categoryLabel} - {currentTpl.name}</span>
                    <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-800">
                      Ready
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center flex-wrap gap-2 w-full sm:w-auto">
                <button
                  onClick={() => setCurrentStep("template-picker")}
                  className="px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold border border-slate-200 dark:border-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Layers className="w-3.5 h-3.5 text-blue-600" />
                  <span>Change Template</span>
                </button>

                <button
                  onClick={handleSaveDraft}
                  className="px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold border border-slate-200 dark:border-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {saveToast ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Save className="w-3.5 h-3.5 text-slate-500" />}
                  <span>{saveToast ? "Draft Saved!" : "Save Draft"}</span>
                </button>

                <button
                  onClick={handleReset}
                  className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-slate-600 dark:text-slate-300 hover:text-rose-600 text-xs font-bold border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
                  title="Reset to sample"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* 2-Column Split Workspace */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* LEFT COLUMN: 7-STEP FORM WIZARD (5/12 cols) */}
              <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-xl border border-slate-200/80 dark:border-slate-800 space-y-6 print:hidden">
                {/* Form Title & Pill Steps */}
                <div className="space-y-3 border-b border-slate-100 dark:border-slate-800 pb-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
                      Edit Packing List
                    </h2>
                    <span className="text-[10px] font-bold text-blue-600 bg-blue-50 dark:bg-blue-950/40 px-2 py-0.5 rounded-full border border-blue-200 dark:border-blue-800">
                      Professional shipping fields
                    </span>
                  </div>

                  {/* 7 Tab Pills (Matching DDPChain screenshot 2) */}
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-1.5 text-xs font-bold">
                    {[
                      { id: 1, label: "Shipper" },
                      { id: 2, label: "Buyer & Consignee" },
                      { id: 3, label: "References" },
                      { id: 4, label: "Transport" },
                      { id: 5, label: "Cargo" },
                      { id: 6, label: "Summary" },
                      { id: 7, label: "Notes & Sign" }
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveFormTab(tab.id)}
                        className={`py-1.5 px-2 rounded-xl text-[11px] font-bold text-center transition-all cursor-pointer flex items-center justify-center gap-1 ${
                          activeFormTab === tab.id
                            ? "bg-blue-600 text-white shadow-xs"
                            : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200"
                        }`}
                      >
                        <span className="opacity-70 text-[9px]">{tab.id}</span>
                        <span className="truncate">{tab.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* TAB 1: SHIPPER / EXPORTER */}
                {activeFormTab === 1 && (
                  <div className="space-y-4 animate-in fade-in duration-200">
                    <div>
                      <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                        Shipper / Exporter
                      </h3>
                      <p className="text-xs text-slate-500">
                        Add the company preparing and shipping the cargo.
                      </p>
                    </div>

                    {/* Company Logo Upload Box (Matching DDPChain screenshot 2) */}
                    <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl p-4 text-center space-y-2 bg-slate-50/50 dark:bg-slate-800/30">
                      <div className="text-xs font-bold text-slate-500">Company Logo</div>
                      {logoPreview ? (
                        <div className="flex flex-col items-center gap-2">
                          <img
                            src={logoPreview}
                            alt="Uploaded company logo"
                            className="max-h-14 object-contain rounded-md border p-1 bg-white"
                          />
                          <button
                            onClick={() => setLogoPreview(null)}
                            className="text-[10px] text-rose-500 font-bold hover:underline"
                          >
                            Remove Logo
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <div className="text-xs text-slate-400">No image uploaded</div>
                          <label className="inline-flex items-center gap-1.5 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 shadow-xs hover:bg-slate-50 cursor-pointer">
                            <Upload className="w-3.5 h-3.5" />
                            <span>Upload Logo</span>
                            <input
                              type="file"
                              accept="image/png,image/jpeg,image/webp"
                              onChange={handleLogoUpload}
                              className="hidden"
                            />
                          </label>
                          <div className="text-[10px] text-slate-400">
                            PNG, JPG or WebP — Maximum 1024 KB
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400">
                          Company Name <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={shipperName}
                          onChange={(e) => setShipperName(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                          placeholder="Shipper company name"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400">
                          Country
                        </label>
                        <input
                          type="text"
                          value={shipperCountry}
                          onChange={(e) => setShipperCountry(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                          placeholder="e.g. China"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400">
                        Company Address
                      </label>
                      <textarea
                        rows={2}
                        value={shipperAddress}
                        onChange={(e) => setShipperAddress(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                        placeholder="Street, city, province, postal code, country"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400">
                          Contact Person
                        </label>
                        <input
                          type="text"
                          value={shipperContact}
                          onChange={(e) => setShipperContact(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                          placeholder="e.g. John Doe / Export Manager"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400">
                          Phone Number
                        </label>
                        <input
                          type="text"
                          value={shipperPhone}
                          onChange={(e) => setShipperPhone(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                          placeholder="e.g. +1 555-0199 or +86 138..."
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400">
                          Email
                        </label>
                        <input
                          type="email"
                          value={shipperEmail}
                          onChange={(e) => setShipperEmail(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                          placeholder="e.g. export@company.com"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400">
                          Website
                        </label>
                        <input
                          type="text"
                          value={shipperWebsite}
                          onChange={(e) => setShipperWebsite(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                          placeholder="e.g. www.company.com"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 2: BUYER & CONSIGNEE */}
                {activeFormTab === 2 && (
                  <div className="space-y-4 animate-in fade-in duration-200">
                    <div>
                      <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                        Buyer & Consignee
                      </h3>
                      <p className="text-xs text-slate-500">
                        Party receiving the goods and handling destination clearance.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400">
                          Consignee / Buyer Name <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={buyerName}
                          onChange={(e) => setBuyerName(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                          placeholder="Buyer legal company name"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400">
                          Country
                        </label>
                        <input
                          type="text"
                          value={buyerCountry}
                          onChange={(e) => setBuyerCountry(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                          placeholder="e.g. United States"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400">
                        Delivery Address
                      </label>
                      <textarea
                        rows={2}
                        value={buyerAddress}
                        onChange={(e) => setBuyerAddress(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                        placeholder="Destination street, city, state/province, ZIP"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400">
                          Contact Person / Dept
                        </label>
                        <input
                          type="text"
                          value={buyerContact}
                          onChange={(e) => setBuyerContact(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                          placeholder="e.g. Purchasing Department"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400">
                          Notify Party
                        </label>
                        <input
                          type="text"
                          value={notifyParty}
                          onChange={(e) => setNotifyParty(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                          placeholder="Same as Consignee or customs broker"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 3: REFERENCES */}
                {activeFormTab === 3 && (
                  <div className="space-y-4 animate-in fade-in duration-200">
                    <div>
                      <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                        Document References
                      </h3>
                      <p className="text-xs text-slate-500">
                        Official tracking numbers and reference codes for shipping matching.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400">
                          Packing List No. <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={packingListNo}
                          onChange={(e) => setPackingListNo(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                          placeholder="e.g. PL-2026-001"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400">
                          Commercial Invoice Ref No.
                        </label>
                        <input
                          type="text"
                          value={invoiceRefNo}
                          onChange={(e) => setInvoiceRefNo(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                          placeholder="e.g. INV-2026-001"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="space-y-1">
                        <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400">
                          Document Date
                        </label>
                        <input
                          type="date"
                          value={documentDate}
                          onChange={(e) => setDocumentDate(e.target.value)}
                          className="w-full px-3 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400">
                          PO Number
                        </label>
                        <input
                          type="text"
                          value={poNumber}
                          onChange={(e) => setPoNumber(e.target.value)}
                          className="w-full px-3 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                          placeholder="e.g. PO-883921"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400">
                          L/C Number
                        </label>
                        <input
                          type="text"
                          value={lcNumber}
                          onChange={(e) => setLcNumber(e.target.value)}
                          className="w-full px-3 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                          placeholder="e.g. LC-12345 or N/A"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 4: TRANSPORT */}
                {activeFormTab === 4 && (
                  <div className="space-y-4 animate-in fade-in duration-200">
                    <div>
                      <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                        Transport & Routing
                      </h3>
                      <p className="text-xs text-slate-500">
                        Incoterms and logistics routing information.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400">
                          Port of Loading (POL)
                        </label>
                        <input
                          type="text"
                          value={portOfLoading}
                          onChange={(e) => setPortOfLoading(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                          placeholder="e.g. Shenzhen (Yantian / Shekou), China"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400">
                          Port of Discharge (POD)
                        </label>
                        <input
                          type="text"
                          value={portOfDischarge}
                          onChange={(e) => setPortOfDischarge(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                          placeholder="e.g. Los Angeles / Long Beach, USA"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400">
                          Vessel / Flight No.
                        </label>
                        <input
                          type="text"
                          value={vesselVoyage}
                          onChange={(e) => setVesselVoyage(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                          placeholder="e.g. COSCO SHIPPING PEONY / 042W"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400">
                          Trade Term (Incoterm)
                        </label>
                        <select
                          value={incoterms}
                          onChange={(e) => setIncoterms(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                        >
                          <option value="">Select Incoterm...</option>
                          <option value="DDP (Delivered Duty Paid)">DDP (Delivered Duty Paid)</option>
                          <option value="FOB (Free On Board)">FOB (Free On Board)</option>
                          <option value="CIF (Cost, Insurance & Freight)">CIF (Cost, Insurance & Freight)</option>
                          <option value="EXW (Ex Works)">EXW (Ex Works)</option>
                          <option value="DAP (Delivered at Place)">DAP (Delivered at Place)</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400">
                          Container No.
                        </label>
                        <input
                          type="text"
                          value={containerNo}
                          onChange={(e) => setContainerNo(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                          placeholder="e.g. CSNU7829410 (40HQ)"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400">
                          Seal Number
                        </label>
                        <input
                          type="text"
                          value={sealNo}
                          onChange={(e) => setSealNo(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                          placeholder="e.g. CN892104"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 5: CARGO & PACKAGE DETAILS */}
                {activeFormTab === 5 && (
                  <div className="space-y-4 animate-in fade-in duration-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                          Cargo & Package Items
                        </h3>
                        <p className="text-xs text-slate-500">
                          Break down box numbers, product counts, weights, and measurements.
                        </p>
                      </div>

                      <button
                        onClick={handleAddLine}
                        className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1 cursor-pointer transition-colors shadow-xs"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Row</span>
                      </button>
                    </div>

                    {/* Carton Dimension Presets */}
                    <div className="p-3 bg-blue-50/60 dark:bg-blue-950/20 rounded-2xl border border-blue-100 dark:border-blue-900/40 space-y-1.5">
                      <div className="text-[10px] font-bold text-blue-700 dark:text-blue-300 uppercase tracking-wider">
                        Quick Carton Presets:
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {CARTON_PRESETS.map((preset) => (
                          <button
                            key={preset.name}
                            onClick={() => {
                              if (lines.length > 0) {
                                handleUpdateLine(lines[lines.length - 1].id, "lengthCm", preset.l);
                                handleUpdateLine(lines[lines.length - 1].id, "widthCm", preset.w);
                                handleUpdateLine(lines[lines.length - 1].id, "heightCm", preset.h);
                              }
                            }}
                            className="px-2.5 py-1 bg-white dark:bg-slate-800 border border-blue-200 dark:border-blue-800 rounded-lg text-[10px] font-bold text-slate-700 dark:text-slate-300 hover:border-blue-400 cursor-pointer shadow-2xs"
                          >
                            {preset.name} ({preset.l}×{preset.w}×{preset.h}cm)
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Dynamic Line Items */}
                    <div className="space-y-3">
                      {lines.map((line, idx) => (
                        <div
                          key={line.id}
                          className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850 space-y-3 relative group"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-black text-slate-700 dark:text-slate-300">
                              Item #{idx + 1}
                            </span>
                            {lines.length > 1 && (
                              <button
                                onClick={() => handleRemoveLine(line.id)}
                                className="text-slate-400 hover:text-rose-500 p-1 cursor-pointer transition-colors"
                                title="Remove row"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                            <div className="space-y-0.5">
                              <label className="text-[10px] font-bold text-slate-500">
                                Carton Range
                              </label>
                              <input
                                type="text"
                                value={line.cartonRange}
                                onChange={(e) => handleUpdateLine(line.id, "cartonRange", e.target.value)}
                                className="w-full px-2.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-semibold outline-none"
                                placeholder="CTN 1 - 25"
                              />
                            </div>

                            <div className="space-y-0.5">
                              <label className="text-[10px] font-bold text-slate-500">
                                Total Packages
                              </label>
                              <input
                                type="number"
                                value={line.packagesCount}
                                onChange={(e) => handleUpdateLine(line.id, "packagesCount", Number(e.target.value))}
                                className="w-full px-2.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-semibold outline-none"
                              />
                            </div>

                            <div className="space-y-0.5">
                              <label className="text-[10px] font-bold text-slate-500">
                                Qty per Box (pcs)
                              </label>
                              <input
                                type="number"
                                value={line.qtyPerBox}
                                onChange={(e) => handleUpdateLine(line.id, "qtyPerBox", Number(e.target.value))}
                                className="w-full px-2.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-semibold outline-none"
                              />
                            </div>
                          </div>

                          <div className="space-y-0.5">
                            <label className="text-[10px] font-bold text-slate-500">
                              Description of Goods
                            </label>
                            <input
                              type="text"
                              value={line.description}
                              onChange={(e) => handleUpdateLine(line.id, "description", e.target.value)}
                              className="w-full px-2.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-semibold outline-none"
                              placeholder="Product description and model"
                            />
                          </div>

                          {/* Weights & Dimensions */}
                          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-1">
                            <div className="space-y-0.5">
                              <label className="text-[9px] font-bold text-slate-400 uppercase">
                                NW/box (kg)
                              </label>
                              <input
                                type="number"
                                step="0.1"
                                value={line.netWeightPerBox}
                                onChange={(e) => handleUpdateLine(line.id, "netWeightPerBox", Number(e.target.value))}
                                className="w-full px-2 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-semibold outline-none"
                              />
                            </div>

                            <div className="space-y-0.5">
                              <label className="text-[9px] font-bold text-slate-400 uppercase">
                                GW/box (kg)
                              </label>
                              <input
                                type="number"
                                step="0.1"
                                value={line.grossWeightPerBox}
                                onChange={(e) => handleUpdateLine(line.id, "grossWeightPerBox", Number(e.target.value))}
                                className="w-full px-2 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-semibold outline-none"
                              />
                            </div>

                            <div className="space-y-0.5">
                              <label className="text-[9px] font-bold text-slate-400 uppercase">
                                L (cm)
                              </label>
                              <input
                                type="number"
                                value={line.lengthCm}
                                onChange={(e) => handleUpdateLine(line.id, "lengthCm", Number(e.target.value))}
                                className="w-full px-2 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-semibold outline-none"
                              />
                            </div>

                            <div className="space-y-0.5">
                              <label className="text-[9px] font-bold text-slate-400 uppercase">
                                W (cm)
                              </label>
                              <input
                                type="number"
                                value={line.widthCm}
                                onChange={(e) => handleUpdateLine(line.id, "widthCm", Number(e.target.value))}
                                className="w-full px-2 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-semibold outline-none"
                              />
                            </div>

                            <div className="space-y-0.5">
                              <label className="text-[9px] font-bold text-slate-400 uppercase">
                                H (cm)
                              </label>
                              <input
                                type="number"
                                value={line.heightCm}
                                onChange={(e) => handleUpdateLine(line.id, "heightCm", Number(e.target.value))}
                                className="w-full px-2 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-semibold outline-none"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* TAB 6: SUMMARY */}
                {activeFormTab === 6 && (
                  <div className="space-y-4 animate-in fade-in duration-200">
                    <div>
                      <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                        Cargo Totals Summary
                      </h3>
                      <p className="text-xs text-slate-500">
                        Calculated weight and volume totals ready for bill of lading matching.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-700">
                        <div className="text-[10px] font-bold text-slate-400 uppercase">
                          TOTAL PACKAGES
                        </div>
                        <div className="text-xl font-black text-slate-900 dark:text-white">
                          {totals.totalPackages} pkgs
                        </div>
                      </div>

                      <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-700">
                        <div className="text-[10px] font-bold text-slate-400 uppercase">
                          TOTAL QUANTITY
                        </div>
                        <div className="text-xl font-black text-slate-900 dark:text-white">
                          {totals.totalQuantity.toLocaleString()} pcs
                        </div>
                      </div>

                      <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-700">
                        <div className="text-[10px] font-bold text-slate-400 uppercase">
                          NET WEIGHT
                        </div>
                        <div className="text-xl font-black text-slate-900 dark:text-white">
                          {totals.totalNetWeight} kg
                        </div>
                        <div className="text-[10px] text-slate-400">
                          {totals.totalNetWeightLbs} lbs
                        </div>
                      </div>

                      <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-700">
                        <div className="text-[10px] font-bold text-slate-400 uppercase">
                          GROSS WEIGHT
                        </div>
                        <div className="text-xl font-black text-slate-900 dark:text-white">
                          {totals.totalGrossWeight} kg
                        </div>
                        <div className="text-[10px] text-slate-400">
                          {totals.totalGrossWeightLbs} lbs
                        </div>
                      </div>

                      <div className="col-span-2 p-3.5 bg-blue-50/60 dark:bg-blue-950/30 rounded-xl border border-blue-100 dark:border-blue-900/40">
                        <div className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase">
                          TOTAL SHIPMENT VOLUME
                        </div>
                        <div className="text-2xl font-black text-blue-950 dark:text-blue-100">
                          {totals.totalCbm} CBM
                        </div>
                        <div className="text-[11px] text-blue-600 dark:text-blue-400">
                          Equivalent to {totals.totalCft} Cubic Feet (CFT)
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={handleCopySummary}
                      className="w-full py-2.5 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      {copiedSummary ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedSummary ? "Summary Copied!" : "Copy Formatted Cargo Summary"}</span>
                    </button>
                  </div>
                )}

                {/* TAB 7: NOTES & SIGN */}
                {activeFormTab === 7 && (
                  <div className="space-y-4 animate-in fade-in duration-200">
                    <div>
                      <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                        Declaration & Authorized Sign
                      </h3>
                      <p className="text-xs text-slate-500">
                        Official certification statement and signatory name.
                      </p>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400">
                        Certification Declaration
                      </label>
                      <textarea
                        rows={3}
                        value={declarationText}
                        onChange={(e) => setDeclarationText(e.target.value)}
                        className="w-full px-3.5 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                        placeholder="We hereby certify that the package counts, measurements, net and gross weights mentioned in this packing list are true and correct, and the goods are packed in accordance with international export standards."
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400">
                          Authorized Signatory Name
                        </label>
                        <input
                          type="text"
                          value={signerName}
                          onChange={(e) => setSignerName(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                          placeholder="e.g. John Smith"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400">
                          Title / Position
                        </label>
                        <input
                          type="text"
                          value={signerTitle}
                          onChange={(e) => setSignerTitle(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                          placeholder="e.g. Authorized Export Director"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400">
                        Date of Signature
                      </label>
                      <input
                        type="date"
                        value={signatureDate}
                        onChange={(e) => setSignatureDate(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* RIGHT COLUMN: REAL-TIME A4 DOCUMENT CANVAS PREVIEW (7/12 cols) */}
              <div className="lg:col-span-7 space-y-4">
                {/* Canvas Control Bar (Matching DDPChain screenshot 2) */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl px-5 py-3 shadow-xs border border-slate-200/80 dark:border-slate-800 flex items-center justify-between print:hidden">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                    <Info className="w-3.5 h-3.5 text-blue-500" />
                    <span>Live Document Canvas (Synchronized in real-time)</span>
                  </div>

                  {/* Zoom controls */}
                  <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                    <button
                      onClick={() => setZoomLevel(Math.max(60, zoomLevel - 10))}
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-600 hover:bg-white dark:hover:bg-slate-700 text-xs font-bold transition-all cursor-pointer"
                      title="Zoom out"
                    >
                      <ZoomOut className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-[11px] font-extrabold px-2 text-slate-700 dark:text-slate-300">
                      {zoomLevel}%
                    </span>
                    <button
                      onClick={() => setZoomLevel(Math.min(120, zoomLevel + 10))}
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-600 hover:bg-white dark:hover:bg-slate-700 text-xs font-bold transition-all cursor-pointer"
                      title="Zoom in"
                    >
                      <ZoomIn className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* THE PHYSICAL A4 PAPER SHEET */}
                <div className="overflow-x-auto pb-4 flex justify-center">
                  <div
                    style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: "top center" }}
                    className="transition-transform duration-150"
                  >
                    <div
                      id="printable-packing-list"
                      className="w-[794px] min-h-[1123px] bg-white text-slate-900 shadow-2xl rounded-sm p-10 border border-slate-200 font-sans text-xs flex flex-col justify-between"
                    >
                      {/* --- DOCUMENT TOP SECTION --- */}
                      <div className="space-y-6">
                        {/* 1. Header Banner based on chosen template */}
                        {selectedTemplate === "logistics-blue" && (
                          <div className="bg-[#0C244C] text-white p-5 rounded-xl flex items-center justify-between">
                            <div className="space-y-1">
                              <h1 className="text-2xl font-black tracking-wider uppercase">
                                PACKING LIST
                              </h1>
                              <p className="text-[11px] text-blue-200 font-semibold">
                                EXPORT SHIPMENT CARGO SPECIFICATION
                              </p>
                            </div>
                            {logoPreview ? (
                              <img src={logoPreview} alt="Logo" className="max-h-12 max-w-[140px] object-contain rounded bg-white p-1" />
                            ) : (
                              <div className="text-right">
                                <div className="font-extrabold text-sm">{shipperName || <span className="text-blue-200 italic font-normal">[Shipper Name]</span>}</div>
                                <div className="text-[10px] text-blue-200">{shipperCountry || "[Country]"}</div>
                              </div>
                            )}
                          </div>
                        )}

                        {selectedTemplate === "corporate-panel" && (
                          <div className="border-b-2 border-slate-900 pb-4 flex items-center justify-between">
                            <div>
                              <h1 className="text-2xl font-black tracking-tight text-slate-900">
                                PACKING LIST
                              </h1>
                              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                                Official Customs & Shipping Specification
                              </p>
                            </div>
                            {logoPreview ? (
                              <img src={logoPreview} alt="Logo" className="max-h-12 object-contain" />
                            ) : (
                              <div className="text-right font-black text-slate-800 text-sm">
                                {shipperName || <span className="text-slate-300 italic font-normal">[Shipper Name]</span>}
                              </div>
                            )}
                          </div>
                        )}

                        {selectedTemplate === "classic-boxed" && (
                          <div className="border-2 border-slate-900 p-4 text-center space-y-1">
                            <h1 className="text-2xl font-black tracking-widest uppercase">
                              PACKING LIST
                            </h1>
                            <div className="text-[11px] font-bold text-slate-700">
                              REF: {packingListNo || "[PL-Number]"} | DATE: {documentDate || "[Date]"}
                            </div>
                          </div>
                        )}

                        {selectedTemplate === "minimal-clean" && (
                          <div className="pb-4 border-b border-slate-200 flex justify-between items-end">
                            <div>
                              <div className="text-blue-600 font-black text-[10px] uppercase tracking-widest">
                                COMMERCIAL CARGO
                              </div>
                              <h1 className="text-2xl font-black text-slate-900">
                                Packing List
                              </h1>
                            </div>
                            <div className="text-right text-[11px] text-slate-500">
                              No: <span className="font-bold text-slate-900">{packingListNo || "[PL-Number]"}</span>
                            </div>
                          </div>
                        )}

                        {selectedTemplate === "emerald-cargo" && (
                          <div className="bg-[#065F46] text-white p-5 rounded-xl flex items-center justify-between">
                            <div>
                              <h1 className="text-2xl font-black tracking-wider uppercase">
                                PACKING LIST
                              </h1>
                              <p className="text-[11px] text-emerald-100">HEAVY & INDUSTRIAL EXPORT CARGO</p>
                            </div>
                            <div className="text-right text-xs font-bold text-emerald-100">
                              PL NO: {packingListNo || "[PL-Number]"}
                            </div>
                          </div>
                        )}

                        {selectedTemplate === "amber-express" && (
                          <div className="bg-[#D97706] text-white p-5 rounded-xl flex items-center justify-between">
                            <div>
                              <h1 className="text-2xl font-black tracking-wider uppercase">
                                PACKING LIST
                              </h1>
                              <p className="text-[11px] text-amber-100">EXPRESS FREIGHT & E-COMMERCE CONSIGNMENT</p>
                            </div>
                            <div className="text-right text-xs font-bold text-amber-100">
                              PL NO: {packingListNo || "[PL-Number]"}
                            </div>
                          </div>
                        )}

                        {/* 2. Shipper & Consignee Split Grid */}
                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                            <div className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                              SHIPPER / EXPORTER
                            </div>
                            <div className="font-extrabold text-slate-900 text-xs">
                              {shipperName || <span className="text-slate-300 italic font-normal">[Shipper Company Name]</span>}
                            </div>
                            <div className="text-[11px] text-slate-600 leading-relaxed whitespace-pre-line">
                              {shipperAddress || <span className="text-slate-300 italic font-normal">[Shipper Street Address, City, Country]</span>}
                            </div>
                            <div className="text-[10px] text-slate-500 pt-1">
                              Contact: {shipperContact || "-"} | Tel: {shipperPhone || "-"}
                            </div>
                            <div className="text-[10px] text-slate-500">
                              Email: {shipperEmail || "-"}
                            </div>
                          </div>

                          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                            <div className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                              CONSIGNEE / BUYER
                            </div>
                            <div className="font-extrabold text-slate-900 text-xs">
                              {buyerName || <span className="text-slate-300 italic font-normal">[Consignee Company Name]</span>}
                            </div>
                            <div className="text-[11px] text-slate-600 leading-relaxed whitespace-pre-line">
                              {buyerAddress || <span className="text-slate-300 italic font-normal">[Delivery address, City, Country]</span>}
                            </div>
                            <div className="text-[10px] text-slate-500 pt-1">
                              Attn: {buyerContact || "-"} | Notify: {notifyParty || "-"}
                            </div>
                          </div>
                        </div>

                        {/* 3. Document References Grid */}
                        <div className="grid grid-cols-4 gap-2 border border-slate-200 rounded-xl p-3 bg-white text-[10px]">
                          <div>
                            <span className="text-slate-400 block font-bold">PL NUMBER:</span>
                            <span className="font-extrabold text-slate-900 text-xs">{packingListNo || <span className="text-slate-300 italic font-normal">[PL Number]</span>}</span>
                          </div>
                          <div>
                            <span className="text-slate-400 block font-bold">DATE:</span>
                            <span className="font-extrabold text-slate-900 text-xs">{documentDate || <span className="text-slate-300 italic font-normal">[Date]</span>}</span>
                          </div>
                          <div>
                            <span className="text-slate-400 block font-bold">INVOICE REF:</span>
                            <span className="font-extrabold text-slate-900 text-xs">{invoiceRefNo || <span className="text-slate-300 italic font-normal">[Invoice Ref]</span>}</span>
                          </div>
                          <div>
                            <span className="text-slate-400 block font-bold">TRADE TERM:</span>
                            <span className="font-extrabold text-blue-700 text-xs">{incoterms || <span className="text-slate-300 italic font-normal">[Trade Term]</span>}</span>
                          </div>
                          <div className="pt-2 border-t border-slate-100">
                            <span className="text-slate-400 block font-bold">PORT OF LOADING:</span>
                            <span className="font-bold text-slate-800">{portOfLoading || <span className="text-slate-300 italic font-normal">[Port of Loading]</span>}</span>
                          </div>
                          <div className="pt-2 border-t border-slate-100">
                            <span className="text-slate-400 block font-bold">PORT OF DISCHARGE:</span>
                            <span className="font-bold text-slate-800">{portOfDischarge || <span className="text-slate-300 italic font-normal">[Port of Discharge]</span>}</span>
                          </div>
                          <div className="pt-2 border-t border-slate-100">
                            <span className="text-slate-400 block font-bold">VESSEL / FLIGHT:</span>
                            <span className="font-bold text-slate-800">{vesselVoyage || <span className="text-slate-300 italic font-normal">[Vessel / Flight]</span>}</span>
                          </div>
                          <div className="pt-2 border-t border-slate-100">
                            <span className="text-slate-400 block font-bold">CONTAINER / SEAL:</span>
                            <span className="font-bold text-slate-800">{containerNo || sealNo ? `${containerNo || ""} ${sealNo ? `/ ${sealNo}` : ""}` : <span className="text-slate-300 italic font-normal">[Container / Seal]</span>}</span>
                          </div>
                        </div>

                        {/* 4. Package & Cargo Items Table */}
                        <div className="border border-slate-200 rounded-xl overflow-hidden">
                          <table className="w-full text-left border-collapse text-[10px]">
                            <thead>
                              <tr className="bg-[#0C244C] text-white font-bold text-[9px] uppercase tracking-wider">
                                <th className="p-2 border-r border-blue-900 w-10 text-center">#</th>
                                <th className="p-2 border-r border-blue-900">Carton Range</th>
                                <th className="p-2 border-r border-blue-900">Description of Goods</th>
                                <th className="p-2 border-r border-blue-900 text-center">Pkgs</th>
                                <th className="p-2 border-r border-blue-900 text-center">Qty/Box</th>
                                <th className="p-2 border-r border-blue-900 text-center">Total Qty</th>
                                <th className="p-2 border-r border-blue-900 text-right">N.W. (kg)</th>
                                <th className="p-2 border-r border-blue-900 text-right">G.W. (kg)</th>
                                <th className="p-2 border-r border-blue-900 text-center">Dimensions (cm)</th>
                                <th className="p-2 text-right">CBM</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200">
                              {lines.map((line, index) => {
                                const lineQty = (line.packagesCount || 0) * (line.qtyPerBox || 0);
                                const lineNw = Math.round((line.packagesCount || 0) * (line.netWeightPerBox || 0) * 10) / 10;
                                const lineGw = Math.round((line.packagesCount || 0) * (line.grossWeightPerBox || 0) * 10) / 10;
                                const lineCbm =
                                  Math.round(
                                    (((line.lengthCm || 0) * (line.widthCm || 0) * (line.heightCm || 0) * (line.packagesCount || 0)) / 1000000) *
                                      1000
                                  ) / 1000;

                                return (
                                  <tr key={line.id} className={index % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                                    <td className="p-2 border-r border-slate-200 text-center text-slate-400 font-bold">
                                      {index + 1}
                                    </td>
                                    <td className="p-2 border-r border-slate-200 font-bold text-slate-800 whitespace-nowrap">
                                      {line.cartonRange || <span className="text-slate-300 italic font-normal">CTN #{index + 1}</span>}
                                    </td>
                                    <td className="p-2 border-r border-slate-200 font-medium text-slate-700">
                                      {line.description || <span className="text-slate-300 italic font-normal">[Cargo description]</span>}
                                    </td>
                                    <td className="p-2 border-r border-slate-200 text-center font-bold">
                                      {line.packagesCount || 0}
                                    </td>
                                    <td className="p-2 border-r border-slate-200 text-center text-slate-600">
                                      {line.qtyPerBox || 0}
                                    </td>
                                    <td className="p-2 border-r border-slate-200 text-center font-bold text-slate-900">
                                      {lineQty.toLocaleString()}
                                    </td>
                                    <td className="p-2 border-r border-slate-200 text-right font-medium">
                                      {lineNw.toFixed(1)}
                                    </td>
                                    <td className="p-2 border-r border-slate-200 text-right font-bold text-slate-900">
                                      {lineGw.toFixed(1)}
                                    </td>
                                    <td className="p-2 border-r border-slate-200 text-center text-slate-500 whitespace-nowrap">
                                      {line.lengthCm || 0}×{line.widthCm || 0}×{line.heightCm || 0}
                                    </td>
                                    <td className="p-2 text-right font-bold text-blue-700">
                                      {lineCbm.toFixed(3)}
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                            <tfoot>
                              <tr className="bg-slate-100 font-black border-t-2 border-slate-300 text-slate-900">
                                <td colSpan={3} className="p-2.5 text-right uppercase tracking-wider">
                                  TOTALS:
                                </td>
                                <td className="p-2.5 text-center text-blue-700 font-black">
                                  {totals.totalPackages} pkgs
                                </td>
                                <td className="p-2.5 text-center text-slate-400">-</td>
                                <td className="p-2.5 text-center text-blue-700 font-black">
                                  {totals.totalQuantity.toLocaleString()} pcs
                                </td>
                                <td className="p-2.5 text-right font-black">
                                  {totals.totalNetWeight.toFixed(1)} kg
                                </td>
                                <td className="p-2.5 text-right text-slate-900 font-black">
                                  {totals.totalGrossWeight.toFixed(1)} kg
                                </td>
                                <td className="p-2.5 text-center text-slate-400">-</td>
                                <td className="p-2.5 text-right text-blue-800 font-black">
                                  {totals.totalCbm.toFixed(3)} CBM
                                </td>
                              </tr>
                            </tfoot>
                          </table>
                        </div>

                        {/* 5. Cargo Totals Metric Grid */}
                        <div className="grid grid-cols-4 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200 text-center">
                          <div>
                            <div className="text-[9px] text-slate-400 font-bold uppercase">TOTAL PACKAGES</div>
                            <div className="text-sm font-black text-slate-800">{totals.totalPackages} Cartons</div>
                          </div>
                          <div>
                            <div className="text-[9px] text-slate-400 font-bold uppercase">TOTAL QUANTITY</div>
                            <div className="text-sm font-black text-slate-800">{totals.totalQuantity.toLocaleString()} Units</div>
                          </div>
                          <div>
                            <div className="text-[9px] text-slate-400 font-bold uppercase">TOTAL GROSS WEIGHT</div>
                            <div className="text-sm font-black text-slate-800">{totals.totalGrossWeight} KG <span className="text-[9px] text-slate-500 font-normal">({totals.totalGrossWeightLbs} lbs)</span></div>
                          </div>
                          <div>
                            <div className="text-[9px] text-slate-400 font-bold uppercase">TOTAL MEASUREMENT</div>
                            <div className="text-sm font-black text-blue-700">{totals.totalCbm} CBM <span className="text-[9px] text-slate-500 font-normal">({totals.totalCft} CFT)</span></div>
                          </div>
                        </div>

                        {/* 6. Declaration & Authorized Signatory Box */}
                        <div className="grid grid-cols-2 gap-4 pt-2">
                          <div className="text-[10px] text-slate-600 space-y-1 p-3 bg-slate-50/70 rounded-xl border border-slate-100">
                            <div className="font-bold text-slate-800 uppercase text-[9px]">DECLARATION:</div>
                            <p className="leading-relaxed text-[9px] italic text-slate-500">
                              {declarationText || "We hereby certify that the package counts, measurements, net and gross weights mentioned in this packing list are true and correct, and the goods are packed in accordance with international export standards."}
                            </p>
                          </div>

                          <div className="border border-slate-200 rounded-xl p-3 flex flex-col justify-between text-right">
                            <div className="text-[9px] font-bold text-slate-400 uppercase">
                              FOR AND ON BEHALF OF:
                            </div>
                            <div className="font-black text-xs text-slate-800">{shipperName || <span className="text-slate-300 italic font-normal">[Shipper Company Name]</span>}</div>
                            <div className="pt-6 border-b border-slate-300 w-3/4 ml-auto" />
                            <div className="text-[10px] font-extrabold text-slate-800 pt-1">
                              {signerName ? `${signerName} ${signerTitle ? `— ${signerTitle}` : ""}` : <span className="text-slate-300 italic font-normal">[Authorized Signatory]</span>}
                            </div>
                            <div className="text-[9px] text-slate-400">Date: {signatureDate || "[Date]"}</div>
                          </div>
                        </div>
                      </div>

                      {/* --- DOCUMENT FOOTER --- */}
                      <div className="pt-6 border-t border-slate-200 flex items-center justify-between text-[9px] text-slate-400">
                        <span>Official Export Shipping Document — Generated via JCD Forwarder</span>
                        <span>Page 1 of 1</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Action Buttons (Matching DDPChain screenshot 2) */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 shadow-sm border border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 print:hidden">
                  <div className="text-xs text-slate-400 text-center sm:text-left">
                    Your information is saved locally on your device. Never shared or stored externally.
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleCopySummary}
                      className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 font-bold text-xs text-slate-700 dark:text-slate-200 cursor-pointer transition-colors"
                    >
                      {copiedSummary ? "Copied!" : "Copy Summary"}
                    </button>

                    <button
                      onClick={handlePrint}
                      className="px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs shadow-md shadow-orange-600/20 flex items-center gap-1.5 cursor-pointer transition-all"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Print Document</span>
                    </button>

                    <button
                      onClick={handlePrint}
                      className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-600/20 flex items-center gap-1.5 cursor-pointer transition-all"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download PDF</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3. SEO & EDUCATIONAL SECTION (Matching DDPChain feature sections) */}
        <section className="mt-16 space-y-12 print:hidden">
          {/* What You Can Create Feature Grid */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-10 shadow-sm border border-slate-200/80 dark:border-slate-800 space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                What You Can Create
              </h2>
              <p className="text-sm text-slate-500 max-w-xl mx-auto">
                Generate professional shipping documents tailored for global freight carriers and international customs authorities.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 space-y-2">
                <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 flex items-center justify-center">
                  <Building2 className="w-4 h-4" />
                </div>
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                  Shipper & Buyer Matrix
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Add full company details, addresses, contacts, and upload your custom branding logo for an official presentation.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 space-y-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 flex items-center justify-center">
                  <Box className="w-4 h-4" />
                </div>
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                  Carton & Package Matrix
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Organize carton ranges, unit quantities, individual and total net weights, gross weights, and cubic meter (CBM) measurements.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 space-y-2">
                <div className="w-8 h-8 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-600 flex items-center justify-center">
                  <Anchor className="w-4 h-4" />
                </div>
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                  Transport & Container Data
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Seamlessly include Port of Loading, Port of Discharge, Incoterms, Vessel/Voyage, and Container/Seal numbers for carrier compliance.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 space-y-2">
                <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                  Customs Compliant Certification
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Includes international WCO legal declaration certification with dedicated authorized signatory line and official date.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 space-y-2">
                <div className="w-8 h-8 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 flex items-center justify-center">
                  <Printer className="w-4 h-4" />
                </div>
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                  Instant Print & PDF Export
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Clean vector rendering guarantees crisp printouts and downloads formatted strictly to global standard A4 dimensions.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 space-y-2">
                <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 flex items-center justify-center">
                  <Layers className="w-4 h-4" />
                </div>
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                  6 Professional Designs
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Switch between Logistics Blue, Corporate Panel, Classic Boxed, Minimal Clean, Emerald, and Amber designs without retyping any data.
                </p>
              </div>
            </div>
          </div>

          {/* How the Generator Works (4 Steps) */}
          <div className="bg-[#081B38] text-white rounded-3xl p-8 sm:p-10 shadow-xl space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-black text-white">
                How the Generator Works
              </h2>
              <p className="text-xs sm:text-sm text-blue-200">
                Four simple steps from blank sheet to customs-ready export document.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-3">
                <div className="w-8 h-8 rounded-xl bg-orange-500 text-white font-black text-sm flex items-center justify-center">
                  1
                </div>
                <h3 className="font-extrabold text-sm text-white">Select a Template</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Pick from 6 purpose-built templates matching your shipment type and commercial preferences.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-3">
                <div className="w-8 h-8 rounded-xl bg-blue-500 text-white font-black text-sm flex items-center justify-center">
                  2
                </div>
                <h3 className="font-extrabold text-sm text-white">Enter Cargo Details</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Fill in companies, carton ranges, pieces per carton, weights, and measurements with presets.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-500 text-white font-black text-sm flex items-center justify-center">
                  3
                </div>
                <h3 className="font-extrabold text-sm text-white">Live Visual Preview</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Inspect the synchronized real-time A4 document canvas to confirm alignment and totals.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-3">
                <div className="w-8 h-8 rounded-xl bg-purple-500 text-white font-black text-sm flex items-center justify-center">
                  4
                </div>
                <h3 className="font-extrabold text-sm text-white">Print or Download PDF</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Download a print-ready vector PDF or send the summary to your freight forwarder in 1 click.
                </p>
              </div>
            </div>
          </div>

          {/* Educational FAQ Section */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-10 shadow-sm border border-slate-200/80 dark:border-slate-800 space-y-6">
            <h2 className="text-xl font-black text-slate-900 dark:text-white">
              Why an Accurate Packing List Matters in International Shipping
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              <div className="space-y-2 p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-100 dark:border-slate-800">
                <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                  What is the difference between a Packing List and a Commercial Invoice?
                </h3>
                <p>
                  A Commercial Invoice is a financial transaction document stating who bought what, item pricing, and payment terms. A Packing List is a physical logistics document specifying exact package dimensions, carton numbers, gross/net weights, and packaging types for warehouse handlers and customs inspectors.
                </p>
              </div>

              <div className="space-y-2 p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-100 dark:border-slate-800">
                <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                  Why do Gross Weight (G.W.) and Net Weight (N.W.) matter?
                </h3>
                <p>
                  Net Weight represents the bare weight of the product itself. Gross Weight includes the product, inner retail box, master carton, protective foam, and pallets. Freight carriers and airlines bill chargeable weight based strictly on Gross Weight or volumetric displacement.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Print Specific Stylesheet to guarantee clean single-sheet PDF output */}
      <style jsx global>{`
        @media print {
          body {
            background: white !important;
            color: black !important;
          }
          nav, header, footer, section, .print\\:hidden {
            display: none !important;
          }
          main {
            padding: 0 !important;
            margin: 0 !important;
          }
          #printable-packing-list {
            box-shadow: none !important;
            border: none !important;
            padding: 0 !important;
            margin: 0 auto !important;
            width: 100% !important;
            min-height: auto !important;
            transform: none !important;
          }
        }
      `}</style>
    </div>
  );
}
