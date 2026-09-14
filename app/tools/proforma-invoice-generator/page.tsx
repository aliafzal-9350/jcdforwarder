"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import {
  FileText,
  Printer,
  Plus,
  Trash2,
  Copy,
  Check,
  RotateCcw,
  Info,
  HelpCircle,
  Upload,
  Download,
  Eye,
  ArrowRight,
  ZoomIn,
  ZoomOut,
  Save,
  CheckCircle2,
  Building2,
  User,
  Calendar,
  DollarSign,
  CreditCard,
  Truck,
  Anchor,
  ShieldCheck,
  Layers,
  Star,
  Receipt,
  BadgePercent
} from "lucide-react";

// --- TEMPLATE DEFINITIONS ---
export type InvoiceTemplateCategory = "classic" | "corporate" | "detailed";
export type InvoiceTemplateId =
  | "formal-grid"
  | "brand-ribbon"
  | "executive-minimal"
  | "ocean-blue"
  | "forest-trade"
  | "tech-slate";

interface InvoiceTemplateDef {
  id: InvoiceTemplateId;
  name: string;
  category: InvoiceTemplateCategory;
  categoryLabel: string;
  recommended?: boolean;
  description: string;
  idealFor: string;
  primaryColor: string;
  badgeBg: string;
}

const INVOICE_TEMPLATES: InvoiceTemplateDef[] = [
  {
    id: "formal-grid",
    name: "Formal Grid",
    category: "corporate",
    categoryLabel: "Modern Corporate",
    recommended: true,
    description: "A structured bordered layout with distinct company details, clear product grid, and commercial terms.",
    idealFor: "Best for ocean shipments, B2B wholesale, and bank financing.",
    primaryColor: "#0C244C",
    badgeBg: "bg-blue-50 text-blue-700 border-blue-200"
  },
  {
    id: "brand-ribbon",
    name: "Brand Ribbon",
    category: "corporate",
    categoryLabel: "Modern Corporate",
    description: "A stylish layout with a colored header ribbon, prominent company logo, and balanced invoice totals.",
    idealFor: "Ideal for branded manufacturers and consumer goods exporters.",
    primaryColor: "#881337",
    badgeBg: "bg-rose-50 text-rose-700 border-rose-200"
  },
  {
    id: "executive-minimal",
    name: "Executive Minimal",
    category: "classic",
    categoryLabel: "Classic Trade",
    description: "A high-contrast clean document with elegant typography and focused line item breakdown.",
    idealFor: "Great for air express, high-value electronics, and tech exports.",
    primaryColor: "#1E293B",
    badgeBg: "bg-slate-50 text-slate-700 border-slate-200"
  },
  {
    id: "ocean-blue",
    name: "Ocean Blue Corporate",
    category: "corporate",
    categoryLabel: "Modern Corporate",
    description: "Deep navy branding with clear bank wire instructions and foreign exchange fields.",
    idealFor: "International freight forwarders and bulk trading companies.",
    primaryColor: "#0284C7",
    badgeBg: "bg-sky-50 text-sky-700 border-sky-200"
  },
  {
    id: "forest-trade",
    name: "Forest Trade",
    category: "detailed",
    categoryLabel: "Detailed Export",
    description: "Industrial emerald layout with customs tariff HS numbers and packing remarks.",
    idealFor: "Heavy machinery, agriculture, and industrial commodities.",
    primaryColor: "#065F46",
    badgeBg: "bg-emerald-50 text-emerald-700 border-emerald-200"
  },
  {
    id: "tech-slate",
    name: "Tech Slate",
    category: "detailed",
    categoryLabel: "Detailed Export",
    description: "Dark slate modern layout with SKU/UPC codes and milestone payment terms.",
    idealFor: "Contract electronics manufacturing and hardware suppliers.",
    primaryColor: "#334155",
    badgeBg: "bg-slate-50 text-slate-700 border-slate-200"
  }
];

interface InvoiceLineItem {
  id: string;
  name: string;
  sku: string;
  hsCode: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  countryOfOrigin: string;
}

const INITIAL_ITEMS: InvoiceLineItem[] = [
  {
    id: "1",
    name: "",
    sku: "",
    hsCode: "",
    quantity: 0,
    unit: "pcs",
    unitPrice: 0,
    countryOfOrigin: ""
  }
];

export default function ProformaInvoiceGeneratorPage() {
  // Navigation & View State (Starts on template-picker for clean client experience)
  const [currentStep, setCurrentStep] = useState<"template-picker" | "editor">("template-picker");
  const [selectedTemplate, setSelectedTemplate] = useState<InvoiceTemplateId>("formal-grid");
  const [templateFilter, setTemplateFilter] = useState<InvoiceTemplateCategory | "all">("corporate");
  const [invoiceType, setInvoiceType] = useState<"proforma" | "commercial">("proforma");
  const [activeFormTab, setActiveFormTab] = useState<number>(1);
  const [zoomLevel, setZoomLevel] = useState<number>(85);
  const [copiedSummary, setCopiedSummary] = useState(false);
  const [saveToast, setSaveToast] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  // Seller State (Clean empty state for client business data)
  const [sellerName, setSellerName] = useState("");
  const [sellerCountry, setSellerCountry] = useState("");
  const [sellerAddress, setSellerAddress] = useState("");
  const [sellerTaxId, setSellerTaxId] = useState("");
  const [sellerContact, setSellerContact] = useState("");
  const [sellerEmail, setSellerEmail] = useState("");
  const [sellerPhone, setSellerPhone] = useState("");
  const [sellerWebsite, setSellerWebsite] = useState("");

  // Buyer State
  const [buyerName, setBuyerName] = useState("");
  const [buyerCountry, setBuyerCountry] = useState("");
  const [buyerAddress, setBuyerAddress] = useState("");
  const [buyerTaxId, setBuyerTaxId] = useState("");
  const [buyerContact, setBuyerContact] = useState("");
  const [buyerEmail, setBuyerEmail] = useState("");
  const [buyerPhone, setBuyerPhone] = useState("");

  // Invoice Meta
  const [invoiceNo, setInvoiceNo] = useState("");
  const [invoiceDate, setInvoiceDate] = useState("");
  const [validityDate, setValidityDate] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [currencySymbol, setCurrencySymbol] = useState("$");
  const [paymentTerms, setPaymentTerms] = useState("");
  const [poNumber, setPoNumber] = useState("");

  // Shipping & Delivery
  const [incoterm, setIncoterm] = useState("");
  const [portOfLoading, setPortOfLoading] = useState("");
  const [portOfDischarge, setPortOfDischarge] = useState("");
  const [shippingMethod, setShippingMethod] = useState("");
  const [estimatedLeadTime, setEstimatedLeadTime] = useState("");

  // Line Items
  const [items, setItems] = useState<InvoiceLineItem[]>(INITIAL_ITEMS);

  // Adjustments & Surcharges
  const [shippingFee, setShippingFee] = useState<number>(0);
  const [insuranceFee, setInsuranceFee] = useState<number>(0);
  const [taxesDuties, setTaxesDuties] = useState<number>(0);
  const [discountAmount, setDiscountAmount] = useState<number>(0);

  // Banking & Payment Details
  const [beneficiaryName, setBeneficiaryName] = useState("");
  const [bankName, setBankName] = useState("");
  const [bankAddress, setBankAddress] = useState("");
  const [swiftCode, setSwiftCode] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [authorizedSigner, setAuthorizedSigner] = useState("");

  // Math Calculations
  const subtotal = useMemo(() => {
    return items.reduce((sum, item) => sum + (Number(item.quantity) || 0) * (Number(item.unitPrice) || 0), 0);
  }, [items]);

  const totalQuantity = useMemo(() => {
    return items.reduce((sum, item) => sum + (Number(item.quantity) || 0), 0);
  }, [items]);

  const grandTotal = useMemo(() => {
    const total = subtotal + Number(shippingFee || 0) + Number(insuranceFee || 0) + Number(taxesDuties || 0) - Number(discountAmount || 0);
    return Math.max(0, total);
  }, [subtotal, shippingFee, insuranceFee, taxesDuties, discountAmount]);

  // Currency switcher
  const handleCurrencyChange = (curr: string) => {
    setCurrency(curr);
    switch (curr) {
      case "USD":
        setCurrencySymbol("$");
        break;
      case "EUR":
        setCurrencySymbol("€");
        break;
      case "GBP":
        setCurrencySymbol("£");
        break;
      case "CNY":
        setCurrencySymbol("¥");
        break;
      default:
        setCurrencySymbol("$");
    }
  };

  // Logo upload
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

  // Add Item
  const handleAddItem = () => {
    const newItem: InvoiceLineItem = {
      id: Date.now().toString(),
      name: "",
      sku: "",
      hsCode: "",
      quantity: 0,
      unit: "pcs",
      unitPrice: 0,
      countryOfOrigin: ""
    };
    setItems([...items, newItem]);
  };

  // Remove Item
  const handleRemoveItem = (id: string) => {
    if (items.length <= 1) return;
    setItems(items.filter((it) => it.id !== id));
  };

  // Update Item
  const handleUpdateItem = (id: string, field: keyof InvoiceLineItem, val: any) => {
    setItems(
      items.map((it) => {
        if (it.id !== id) return it;
        return { ...it, [field]: val };
      })
    );
  };

  // Save draft
  const handleSaveDraft = () => {
    try {
      const draft = {
        selectedTemplate,
        invoiceType,
        sellerName,
        sellerCountry,
        sellerAddress,
        sellerTaxId,
        buyerName,
        buyerCountry,
        buyerAddress,
        invoiceNo,
        invoiceDate,
        currency,
        incoterm,
        items,
        shippingFee,
        insuranceFee,
        logoPreview
      };
      localStorage.setItem("jcd_invoice_draft", JSON.stringify(draft));
      setSaveToast(true);
      setTimeout(() => setSaveToast(false), 2500);
    } catch (e) {
      console.warn("Save draft error", e);
    }
  };

  // Reset form
  const handleReset = () => {
    if (confirm("Reset all fields to an empty invoice?")) {
      setSellerName("");
      setSellerCountry("");
      setSellerAddress("");
      setSellerTaxId("");
      setSellerContact("");
      setSellerEmail("");
      setSellerPhone("");
      setSellerWebsite("");
      setBuyerName("");
      setBuyerCountry("");
      setBuyerAddress("");
      setBuyerTaxId("");
      setBuyerContact("");
      setBuyerEmail("");
      setBuyerPhone("");
      setInvoiceNo("");
      setInvoiceDate("");
      setValidityDate("");
      setPaymentTerms("");
      setPoNumber("");
      setIncoterm("");
      setPortOfLoading("");
      setPortOfDischarge("");
      setShippingMethod("");
      setEstimatedLeadTime("");
      setShippingFee(0);
      setInsuranceFee(0);
      setTaxesDuties(0);
      setDiscountAmount(0);
      setBeneficiaryName("");
      setBankName("");
      setBankAddress("");
      setSwiftCode("");
      setAccountNumber("");
      setAdditionalNotes("");
      setAuthorizedSigner("");
      setLogoPreview(null);
      setItems([
        {
          id: "1",
          name: "",
          sku: "",
          hsCode: "",
          quantity: 0,
          unit: "pcs",
          unitPrice: 0,
          countryOfOrigin: ""
        }
      ]);
      localStorage.removeItem("jcd_invoice_draft");
    }
  };

  // Copy Summary
  const handleCopySummary = () => {
    const text = `${invoiceType.toUpperCase()} INVOICE SUMMARY (${invoiceNo})
Seller: ${sellerName}
Buyer: ${buyerName}
Routing: ${portOfLoading} → ${portOfDischarge}
Trade Term: ${incoterm}
Total Items: ${totalQuantity.toLocaleString()} units (${items.length} line items)
Subtotal: ${currencySymbol}${subtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}
Shipping & Insurance: ${currencySymbol}${(shippingFee + insuranceFee).toLocaleString(undefined, { minimumFractionDigits: 2 })}
Grand Total: ${currencySymbol}${grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })} ${currency}
Prepared via JCD Forwarder (https://jcdforwarder.com/tools/proforma-invoice-generator)`;

    navigator.clipboard.writeText(text);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2500);
  };

  // Print Handler
  const handlePrint = () => {
    window.print();
  };

  // Active template
  const currentTpl = useMemo(() => {
    return INVOICE_TEMPLATES.find((t) => t.id === selectedTemplate) || INVOICE_TEMPLATES[0];
  }, [selectedTemplate]);

  // Filtered templates
  const filteredTemplates = useMemo(() => {
    if (templateFilter === "all") return INVOICE_TEMPLATES;
    return INVOICE_TEMPLATES.filter((t) => t.category === templateFilter);
  }, [templateFilter]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* 1. HERO HEADER (Matching DDPChain screenshot 3) */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#081B38] via-[#0C244C] to-[#081B38] text-white pt-10 pb-12 print:hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold uppercase tracking-wider backdrop-blur-md">
            <Receipt className="w-3.5 h-3.5 text-orange-400" />
            <span>Export Documents · Smarter Workflows</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            Free Proforma & Commercial Invoice Generator
          </h1>

          <p className="text-sm sm:text-base text-blue-200/90 max-w-2xl mx-auto leading-relaxed">
            Build polished, trade-ready proforma and commercial invoices with professional templates, custom company details, automated currency math, and instant PDF download.
          </p>

          <div className="flex items-center justify-center gap-3 pt-2 text-xs text-slate-300">
            <span className="flex items-center gap-1 text-rose-400">❤️ Rate our tools!</span>
            <div className="flex items-center text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
              ))}
            </div>
            <span className="font-bold text-white">5/5</span>
            <span>(verified trader rating)</span>
          </div>
        </div>
      </section>

      {/* 2. MAIN TOOL CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 -mt-6">
        {/* --- STAGE 1: TEMPLATE PICKER VIEW --- */}
        {currentStep === "template-picker" && (
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-200/80 dark:border-slate-800 space-y-8 animate-in fade-in duration-300">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">
                    1
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                    Choose an Invoice Template
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  Select a template tailored to your commercial style. Your entered information stays saved when you change templates.
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

            {/* Category Tabs */}
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
                onClick={() => setTemplateFilter("classic")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  templateFilter === "classic"
                    ? "bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                }`}
              >
                Classic <span className="text-[10px] opacity-70 font-normal ml-1">Standard Trade Data</span>
              </button>
              <button
                onClick={() => setTemplateFilter("corporate")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  templateFilter === "corporate"
                    ? "bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                }`}
              >
                Modern Corporate <span className="text-[10px] opacity-70 font-normal ml-1">Branded Clean Style</span>
              </button>
              <button
                onClick={() => setTemplateFilter("detailed")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  templateFilter === "detailed"
                    ? "bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                }`}
              >
                Detailed Export <span className="text-[10px] opacity-70 font-normal ml-1">Export Contract Style</span>
              </button>
            </div>

            {/* Template Cards Grid (Matching DDPChain screenshot 3) */}
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
                    {tpl.recommended && (
                      <div className="absolute -top-3 right-4 bg-blue-600 text-white px-2.5 py-0.5 rounded-full text-[10px] font-extrabold tracking-wider uppercase shadow-xs">
                        Recommended
                      </div>
                    )}

                    <div className="space-y-4">
                      {/* Wireframe Preview */}
                      <div className="w-full h-44 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/60 p-3.5 flex flex-col justify-between overflow-hidden shadow-inner">
                        <div
                          className="w-full h-8 rounded-lg flex items-center justify-between px-3 text-white font-black text-[10px] tracking-wider"
                          style={{ backgroundColor: tpl.primaryColor }}
                        >
                          <span>PROFORMA INVOICE</span>
                          <span className="opacity-60 text-[8px]">INV-2026</span>
                        </div>

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

                        <div className="flex justify-between items-center pt-1 border-t border-slate-200 dark:border-slate-700 text-[8px] text-slate-400">
                          <span>TOTAL: $18,485.00</span>
                          <span>TERMS: DDP / TT</span>
                        </div>
                      </div>

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

        {/* --- STAGE 2: SPLIT-SCREEN EDITOR & LIVE INVOICE PREVIEW --- */}
        {currentStep === "editor" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Top Toolbar */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 shadow-sm border border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 print:hidden">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      TEMPLATE
                    </div>
                    <div className="text-sm font-black text-slate-800 dark:text-white flex items-center gap-2">
                      <span>{currentTpl.categoryLabel} - {currentTpl.name}</span>
                    </div>
                  </div>
                </div>

                {/* Mode Selector Toggle: Proforma vs Commercial */}
                <div className="hidden md:flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-bold">
                  <button
                    onClick={() => setInvoiceType("proforma")}
                    className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                      invoiceType === "proforma"
                        ? "bg-white dark:bg-slate-900 text-blue-600 shadow-xs"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    Proforma Invoice (PI)
                  </button>
                  <button
                    onClick={() => setInvoiceType("commercial")}
                    className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                      invoiceType === "commercial"
                        ? "bg-white dark:bg-slate-900 text-blue-600 shadow-xs"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    Commercial Invoice (CI)
                  </button>
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
                {/* Header & Tabs */}
                <div className="space-y-3 border-b border-slate-100 dark:border-slate-800 pb-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
                      Edit {invoiceType === "proforma" ? "Proforma" : "Commercial"} Invoice
                    </h2>
                    <span className="text-[10px] font-bold text-blue-600 bg-blue-50 dark:bg-blue-950/40 px-2 py-0.5 rounded-full border border-blue-200 dark:border-blue-800">
                      Trade-ready fields
                    </span>
                  </div>

                  {/* 7 Tab Pills */}
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-1.5 text-xs font-bold">
                    {[
                      { id: 1, label: "Seller" },
                      { id: 2, label: "Buyer" },
                      { id: 3, label: "Invoice Meta" },
                      { id: 4, label: "Shipping" },
                      { id: 5, label: "Line Items" },
                      { id: 6, label: "Totals" },
                      { id: 7, label: "Payment & Bank" }
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

                {/* TAB 1: SELLER INFORMATION */}
                {activeFormTab === 1 && (
                  <div className="space-y-4 animate-in fade-in duration-200">
                    <div>
                      <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                        Seller / Supplier Details
                      </h3>
                      <p className="text-xs text-slate-500">
                        Company issuing the invoice and receiving payment.
                      </p>
                    </div>

                    {/* Logo Upload Box */}
                    <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl p-4 text-center space-y-2 bg-slate-50/50 dark:bg-slate-800/30">
                      <div className="text-xs font-bold text-slate-500">Company Logo</div>
                      {logoPreview ? (
                        <div className="flex flex-col items-center gap-2">
                          <img
                            src={logoPreview}
                            alt="Logo preview"
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
                          <div className="text-xs text-slate-400">No logo uploaded</div>
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
                          value={sellerName}
                          onChange={(e) => setSellerName(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold outline-none"
                          placeholder="Seller company legal name"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400">
                          Country
                        </label>
                        <input
                          type="text"
                          value={sellerCountry}
                          onChange={(e) => setSellerCountry(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold outline-none"
                          placeholder="e.g. China"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400">
                        Company Registered Address
                      </label>
                      <textarea
                        rows={2}
                        value={sellerAddress}
                        onChange={(e) => setSellerAddress(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold outline-none"
                        placeholder="Street, city, province, postal code, country"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400">
                          Tax ID / Business Reg No.
                        </label>
                        <input
                          type="text"
                          value={sellerTaxId}
                          onChange={(e) => setSellerTaxId(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold outline-none"
                          placeholder="e.g. USCI: 91440300... or VAT ID"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400">
                          Contact Person
                        </label>
                        <input
                          type="text"
                          value={sellerContact}
                          onChange={(e) => setSellerContact(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold outline-none"
                          placeholder="e.g. Sales Department / Director"
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
                          value={sellerEmail}
                          onChange={(e) => setSellerEmail(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold outline-none"
                          placeholder="e.g. sales@company.com"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400">
                          Phone
                        </label>
                        <input
                          type="text"
                          value={sellerPhone}
                          onChange={(e) => setSellerPhone(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold outline-none"
                          placeholder="e.g. +86 138... or +1 555..."
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 2: BUYER / CONSIGNEE */}
                {activeFormTab === 2 && (
                  <div className="space-y-4 animate-in fade-in duration-200">
                    <div>
                      <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                        Buyer / Consignee Details
                      </h3>
                      <p className="text-xs text-slate-500">
                        Party billed and recipient of the commercial consignment.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400">
                          Buyer Company Name <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={buyerName}
                          onChange={(e) => setBuyerName(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold outline-none"
                          placeholder="Buyer legal company name"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400">
                          Buyer Country
                        </label>
                        <input
                          type="text"
                          value={buyerCountry}
                          onChange={(e) => setBuyerCountry(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold outline-none"
                          placeholder="e.g. United States"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400">
                        Billing & Delivery Address
                      </label>
                      <textarea
                        rows={2}
                        value={buyerAddress}
                        onChange={(e) => setBuyerAddress(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold outline-none"
                        placeholder="Destination street, city, state/province, ZIP"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400">
                          Buyer Contact Person
                        </label>
                        <input
                          type="text"
                          value={buyerContact}
                          onChange={(e) => setBuyerContact(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold outline-none"
                          placeholder="e.g. Operations Procurement Team"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400">
                          Tax ID / VAT / EIN
                        </label>
                        <input
                          type="text"
                          value={buyerTaxId}
                          onChange={(e) => setBuyerTaxId(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold outline-none"
                          placeholder="e.g. EIN / VAT: US-36-8924102"
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
                          value={buyerEmail}
                          onChange={(e) => setBuyerEmail(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold outline-none"
                          placeholder="e.g. import@buyer.com"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400">
                          Phone Number
                        </label>
                        <input
                          type="text"
                          value={buyerPhone}
                          onChange={(e) => setBuyerPhone(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold outline-none"
                          placeholder="e.g. +1 (312) 555-0198"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 3: INVOICE DETAILS */}
                {activeFormTab === 3 && (
                  <div className="space-y-4 animate-in fade-in duration-200">
                    <div>
                      <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                        Invoice Numbers & Currency
                      </h3>
                      <p className="text-xs text-slate-500">
                        Formal reference numbers, dates, and trade currency.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400">
                          Invoice Number <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={invoiceNo}
                          onChange={(e) => setInvoiceNo(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold outline-none"
                          placeholder="e.g. PI-2026-001"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400">
                          Currency
                        </label>
                        <select
                          value={currency}
                          onChange={(e) => handleCurrencyChange(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold outline-none cursor-pointer"
                        >
                          <option value="USD">USD ($) — United States Dollar</option>
                          <option value="EUR">EUR (€) — Euro</option>
                          <option value="GBP">GBP (£) — British Pound</option>
                          <option value="CNY">CNY (¥) — Chinese Yuan / RMB</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="space-y-1">
                        <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400">
                          Invoice Date
                        </label>
                        <input
                          type="date"
                          value={invoiceDate}
                          onChange={(e) => setInvoiceDate(e.target.value)}
                          className="w-full px-3 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400">
                          Valid Until
                        </label>
                        <input
                          type="date"
                          value={validityDate}
                          onChange={(e) => setValidityDate(e.target.value)}
                          className="w-full px-3 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400">
                          Buyer PO No.
                        </label>
                        <input
                          type="text"
                          value={poNumber}
                          onChange={(e) => setPoNumber(e.target.value)}
                          className="w-full px-3 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold outline-none"
                          placeholder="e.g. PO-883921"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400">
                        Payment Terms
                      </label>
                      <input
                        type="text"
                        value={paymentTerms}
                        onChange={(e) => setPaymentTerms(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold outline-none"
                        placeholder="e.g. 30% Deposit with PO, 70% Balance before Dispatch"
                      />
                    </div>
                  </div>
                )}

                {/* TAB 4: SHIPPING & DELIVERY */}
                {activeFormTab === 4 && (
                  <div className="space-y-4 animate-in fade-in duration-200">
                    <div>
                      <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                        Shipping & International Logistics
                      </h3>
                      <p className="text-xs text-slate-500">
                        Trade terms, ports of origin and arrival.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400">
                          Trade Term (Incoterm)
                        </label>
                        <select
                          value={incoterm}
                          onChange={(e) => setIncoterm(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold outline-none"
                        >
                          <option value="">Select Incoterm...</option>
                          <option value="DDP (Delivered Duty Paid)">DDP (Delivered Duty Paid)</option>
                          <option value="FOB (Free On Board)">FOB (Free On Board)</option>
                          <option value="CIF (Cost, Insurance & Freight)">CIF (Cost, Insurance & Freight)</option>
                          <option value="EXW (Ex Works)">EXW (Ex Works)</option>
                          <option value="DAP (Delivered at Place)">DAP (Delivered at Place)</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400">
                          Shipping Method
                        </label>
                        <input
                          type="text"
                          value={shippingMethod}
                          onChange={(e) => setShippingMethod(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold outline-none"
                          placeholder="e.g. Air Cargo Priority Freight or Ocean FCL"
                        />
                      </div>
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
                          className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold outline-none"
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
                          className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold outline-none"
                          placeholder="e.g. Los Angeles / Long Beach, USA"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400">
                        Production & Shipping Lead Time
                      </label>
                      <input
                        type="text"
                        value={estimatedLeadTime}
                        onChange={(e) => setEstimatedLeadTime(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold outline-none"
                        placeholder="e.g. 15-20 days production + 5-8 days air transit"
                      />
                    </div>
                  </div>
                )}

                {/* TAB 5: PRODUCT ITEMS */}
                {activeFormTab === 5 && (
                  <div className="space-y-4 animate-in fade-in duration-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                          Product Line Items
                        </h3>
                        <p className="text-xs text-slate-500">
                          Commercial descriptions, HS codes, quantities, and unit pricing.
                        </p>
                      </div>

                      <button
                        onClick={handleAddItem}
                        className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1 cursor-pointer transition-colors shadow-xs"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Item</span>
                      </button>
                    </div>

                    <div className="space-y-3">
                      {items.map((item, idx) => (
                        <div
                          key={item.id}
                          className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850 space-y-3"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-black text-slate-700 dark:text-slate-300">
                              Item #{idx + 1}
                            </span>
                            {items.length > 1 && (
                              <button
                                onClick={() => handleRemoveItem(item.id)}
                                className="text-slate-400 hover:text-rose-500 p-1 cursor-pointer transition-colors"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>

                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-500">
                              Product Description
                            </label>
                            <input
                              type="text"
                              value={item.name}
                              onChange={(e) => handleUpdateItem(item.id, "name", e.target.value)}
                              className="w-full px-2.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-semibold outline-none"
                              placeholder="Product commercial description and model"
                            />
                          </div>

                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                            <div className="space-y-0.5">
                              <label className="text-[10px] font-bold text-slate-500">
                                SKU / Item #
                              </label>
                              <input
                                type="text"
                                value={item.sku}
                                onChange={(e) => handleUpdateItem(item.id, "sku", e.target.value)}
                                className="w-full px-2 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-semibold outline-none"
                                placeholder="SKU-001"
                              />
                            </div>

                            <div className="space-y-0.5">
                              <label className="text-[10px] font-bold text-slate-500">
                                HS Code
                              </label>
                              <input
                                type="text"
                                value={item.hsCode}
                                onChange={(e) => handleUpdateItem(item.id, "hsCode", e.target.value)}
                                className="w-full px-2 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-semibold outline-none"
                                placeholder="e.g. 8517.62.00"
                              />
                            </div>

                            <div className="space-y-0.5">
                              <label className="text-[10px] font-bold text-slate-500">
                                Quantity
                              </label>
                              <input
                                type="number"
                                value={item.quantity}
                                onChange={(e) => handleUpdateItem(item.id, "quantity", Number(e.target.value))}
                                className="w-full px-2 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-semibold outline-none"
                              />
                            </div>

                            <div className="space-y-0.5">
                              <label className="text-[10px] font-bold text-slate-500">
                                Unit Price ({currencySymbol})
                              </label>
                              <input
                                type="number"
                                step="0.01"
                                value={item.unitPrice}
                                onChange={(e) => handleUpdateItem(item.id, "unitPrice", Number(e.target.value))}
                                className="w-full px-2 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-semibold outline-none"
                              />
                            </div>
                          </div>

                          <div className="flex justify-between items-center pt-1 text-[11px] border-t border-slate-200/60 dark:border-slate-700/60 text-slate-500">
                            <span>Line Total:</span>
                            <span className="font-black text-slate-900 dark:text-white">
                              {currencySymbol}{((item.quantity || 0) * (item.unitPrice || 0)).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* TAB 6: CHARGES & TOTALS */}
                {activeFormTab === 6 && (
                  <div className="space-y-4 animate-in fade-in duration-200">
                    <div>
                      <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                        Freight, Insurance & Surcharges
                      </h3>
                      <p className="text-xs text-slate-500">
                        Adjust logistics charges to reflect final DDP, CIF, or FOB terms.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400">
                          International Freight Fee ({currencySymbol})
                        </label>
                        <input
                          type="number"
                          value={shippingFee}
                          onChange={(e) => setShippingFee(Number(e.target.value))}
                          className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400">
                          Marine Cargo Insurance ({currencySymbol})
                        </label>
                        <input
                          type="number"
                          value={insuranceFee}
                          onChange={(e) => setInsuranceFee(Number(e.target.value))}
                          className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400">
                          Customs Duties & Taxes ({currencySymbol})
                        </label>
                        <input
                          type="number"
                          value={taxesDuties}
                          onChange={(e) => setTaxesDuties(Number(e.target.value))}
                          className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400">
                          Commercial Discount ({currencySymbol})
                        </label>
                        <input
                          type="number"
                          value={discountAmount}
                          onChange={(e) => setDiscountAmount(Number(e.target.value))}
                          className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold outline-none"
                        />
                      </div>
                    </div>

                    {/* Calculated Summary Card */}
                    <div className="p-4 bg-slate-50 dark:bg-slate-800/70 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2 text-xs">
                      <div className="flex justify-between text-slate-500">
                        <span>Items Subtotal:</span>
                        <span className="font-bold text-slate-800 dark:text-slate-200">
                          {currencySymbol}{subtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                      <div className="flex justify-between text-slate-500">
                        <span>Freight & Insurance:</span>
                        <span className="font-bold text-slate-800 dark:text-slate-200">
                          +{currencySymbol}{(shippingFee + insuranceFee).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                      {discountAmount > 0 && (
                        <div className="flex justify-between text-emerald-600">
                          <span>Discount Applied:</span>
                          <span className="font-bold">
                            -{currencySymbol}{discountAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                          </span>
                        </div>
                      )}
                      <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex justify-between items-center text-sm font-black text-slate-900 dark:text-white">
                        <span>Grand Total ({currency}):</span>
                        <span className="text-xl text-blue-600 dark:text-blue-400">
                          {currencySymbol}{grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 7: PAYMENT & BANK DETAILS */}
                {activeFormTab === 7 && (
                  <div className="space-y-4 animate-in fade-in duration-200">
                    <div>
                      <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                        Bank Wire Transfer Instructions
                      </h3>
                      <p className="text-xs text-slate-500">
                        International SWIFT payment details for wire remittance.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400">
                          Beneficiary Account Name
                        </label>
                        <input
                          type="text"
                          value={beneficiaryName}
                          onChange={(e) => setBeneficiaryName(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold outline-none"
                          placeholder="Beneficiary legal entity name"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400">
                          Bank Name
                        </label>
                        <input
                          type="text"
                          value={bankName}
                          onChange={(e) => setBankName(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold outline-none"
                          placeholder="Bank name and branch"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400">
                          SWIFT / BIC Code
                        </label>
                        <input
                          type="text"
                          value={swiftCode}
                          onChange={(e) => setSwiftCode(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold outline-none"
                          placeholder="e.g. ICBKCNBJSHZ"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400">
                          Account / IBAN Number
                        </label>
                        <input
                          type="text"
                          value={accountNumber}
                          onChange={(e) => setAccountNumber(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold outline-none"
                          placeholder="Account or IBAN number"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400">
                        Commercial Terms & Notes
                      </label>
                      <textarea
                        rows={3}
                        value={additionalNotes}
                        onChange={(e) => setAdditionalNotes(e.target.value)}
                        className="w-full px-3.5 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold outline-none"
                        placeholder="e.g. 1. All bank fees outside of seller country to be borne by Buyer.&#10;2. Goods inspected according to international quality standards."
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400">
                        Authorized Signer & Title
                      </label>
                      <input
                        type="text"
                        value={authorizedSigner}
                        onChange={(e) => setAuthorizedSigner(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold outline-none"
                        placeholder="Signatory name and title"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* RIGHT COLUMN: REAL-TIME A4 INVOICE CANVAS PREVIEW (7/12 cols) */}
              <div className="lg:col-span-7 space-y-4">
                {/* Canvas Control Bar */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl px-5 py-3 shadow-xs border border-slate-200/80 dark:border-slate-800 flex items-center justify-between print:hidden">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                    <Info className="w-3.5 h-3.5 text-blue-500" />
                    <span>Live Interactive Document Preview</span>
                  </div>

                  <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                    <button
                      onClick={() => setZoomLevel(Math.max(60, zoomLevel - 10))}
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-600 hover:bg-white dark:hover:bg-slate-700 text-xs font-bold transition-all cursor-pointer"
                    >
                      <ZoomOut className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-[11px] font-extrabold px-2 text-slate-700 dark:text-slate-300">
                      {zoomLevel}%
                    </span>
                    <button
                      onClick={() => setZoomLevel(Math.min(120, zoomLevel + 10))}
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-600 hover:bg-white dark:hover:bg-slate-700 text-xs font-bold transition-all cursor-pointer"
                    >
                      <ZoomIn className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* THE PHYSICAL A4 INVOICE SHEET */}
                <div className="overflow-x-auto pb-4 flex justify-center">
                  <div
                    style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: "top center" }}
                    className="transition-transform duration-150"
                  >
                    <div
                      id="printable-invoice"
                      className="w-[794px] min-h-[1123px] bg-white text-slate-900 shadow-2xl rounded-sm p-10 border border-slate-200 font-sans text-xs flex flex-col justify-between"
                    >
                      <div className="space-y-6">
                        {/* 1. Header Banner based on selected template */}
                        {selectedTemplate === "formal-grid" && (
                          <div className="bg-[#0C244C] text-white p-5 rounded-xl flex items-center justify-between">
                            <div>
                              <h1 className="text-2xl font-black tracking-wider uppercase">
                                {invoiceType === "proforma" ? "PROFORMA INVOICE" : "COMMERCIAL INVOICE"}
                              </h1>
                              <p className="text-[11px] text-blue-200 font-semibold">
                                INTERNATIONAL TRADE SPECIFICATION & BILLING
                              </p>
                            </div>
                            {logoPreview ? (
                              <img src={logoPreview} alt="Logo" className="max-h-12 max-w-[140px] object-contain rounded bg-white p-1" />
                            ) : (
                              <div className="text-right">
                                <div className="font-extrabold text-sm">{sellerName || <span className="text-blue-200/60 italic font-normal">[Seller Company Name]</span>}</div>
                                <div className="text-[10px] text-blue-200">{sellerCountry || <span className="text-blue-200/60 italic">[Origin Country]</span>}</div>
                              </div>
                            )}
                          </div>
                        )}

                        {selectedTemplate === "brand-ribbon" && (
                          <div className="border-b-4 border-[#881337] pb-4 flex items-center justify-between">
                            <div>
                              <span className="text-[#881337] font-black text-[10px] uppercase tracking-widest">
                                OFFICIAL TRADE BILLING
                              </span>
                              <h1 className="text-2xl font-black text-slate-900 uppercase">
                                {invoiceType === "proforma" ? "Proforma Invoice" : "Commercial Invoice"}
                              </h1>
                            </div>
                            {logoPreview ? (
                              <img src={logoPreview} alt="Logo" className="max-h-12 object-contain" />
                            ) : (
                              <div className="text-right font-black text-slate-800 text-sm">{sellerName || <span className="text-slate-300 italic font-normal">[Seller Company Name]</span>}</div>
                            )}
                          </div>
                        )}

                        {selectedTemplate === "executive-minimal" && (
                          <div className="pb-4 border-b-2 border-slate-900 flex justify-between items-end">
                            <div>
                              <h1 className="text-2xl font-black text-slate-900 uppercase">
                                {invoiceType === "proforma" ? "PROFORMA INVOICE" : "COMMERCIAL INVOICE"}
                              </h1>
                              <p className="text-[10px] text-slate-500 font-bold uppercase">Commercial Bill of Sale</p>
                            </div>
                            <div className="text-right text-[11px] text-slate-500">
                              No: <span className="font-black text-slate-900">{invoiceNo || <span className="text-slate-300 italic font-normal">[INV-0000]</span>}</span>
                            </div>
                          </div>
                        )}

                        {selectedTemplate === "ocean-blue" && (
                          <div className="bg-[#0284C7] text-white p-5 rounded-xl flex items-center justify-between">
                            <div>
                              <h1 className="text-2xl font-black tracking-wider uppercase">
                                {invoiceType === "proforma" ? "PROFORMA INVOICE" : "COMMERCIAL INVOICE"}
                              </h1>
                              <p className="text-[11px] text-sky-100">GLOBAL FREIGHT & COMMERCIAL SETTLEMENT</p>
                            </div>
                            <div className="text-right text-xs font-bold text-sky-100">INV: {invoiceNo || <span className="text-sky-200/60 italic font-normal">[INV-0000]</span>}</div>
                          </div>
                        )}

                        {selectedTemplate === "forest-trade" && (
                          <div className="bg-[#065F46] text-white p-5 rounded-xl flex items-center justify-between">
                            <div>
                              <h1 className="text-2xl font-black tracking-wider uppercase">
                                {invoiceType === "proforma" ? "PROFORMA INVOICE" : "COMMERCIAL INVOICE"}
                              </h1>
                              <p className="text-[11px] text-emerald-100">PROJECT CARGO & INDUSTRIAL COMMODITIES</p>
                            </div>
                            <div className="text-right text-xs font-bold text-emerald-100">INV: {invoiceNo || <span className="text-emerald-200/60 italic font-normal">[INV-0000]</span>}</div>
                          </div>
                        )}

                        {selectedTemplate === "tech-slate" && (
                          <div className="bg-[#334155] text-white p-5 rounded-xl flex items-center justify-between">
                            <div>
                              <h1 className="text-2xl font-black tracking-wider uppercase">
                                {invoiceType === "proforma" ? "PROFORMA INVOICE" : "COMMERCIAL INVOICE"}
                              </h1>
                              <p className="text-[11px] text-slate-200">HIGH-TECH & ELECTRONICS BILL OF SALE</p>
                            </div>
                            <div className="text-right text-xs font-bold text-slate-200">INV: {invoiceNo || <span className="text-slate-300 italic font-normal">[INV-0000]</span>}</div>
                          </div>
                        )}

                        {/* 2. Seller & Buyer Grid */}
                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                            <div className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                              SELLER / BENEFICIARY
                            </div>
                            <div className="font-extrabold text-slate-900 text-xs">
                              {sellerName || <span className="text-slate-300 italic font-normal">[Seller Company Name]</span>}
                            </div>
                            <div className="text-[11px] text-slate-600 leading-relaxed whitespace-pre-line">
                              {sellerAddress || <span className="text-slate-300 italic font-normal">[Seller Address, City, Country]</span>}
                            </div>
                            <div className="text-[10px] text-slate-500 pt-1">
                              {sellerTaxId ? `Tax ID: ${sellerTaxId}` : <span className="text-slate-300 italic">[Tax ID]</span>} | Contact: {sellerContact || <span className="text-slate-300 italic">[Contact Name]</span>}
                            </div>
                            <div className="text-[10px] text-slate-500">
                              Email: {sellerEmail || <span className="text-slate-300 italic">[Email]</span>} | Tel: {sellerPhone || <span className="text-slate-300 italic">[Phone]</span>}
                            </div>
                          </div>

                          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                            <div className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                              BUYER / APPLICANT
                            </div>
                            <div className="font-extrabold text-slate-900 text-xs">
                              {buyerName || <span className="text-slate-300 italic font-normal">[Buyer / Consignee Company Name]</span>}
                            </div>
                            <div className="text-[11px] text-slate-600 leading-relaxed whitespace-pre-line">
                              {buyerAddress || <span className="text-slate-300 italic font-normal">[Buyer Destination Address, City, Country]</span>}
                            </div>
                            <div className="text-[10px] text-slate-500 pt-1">
                              {buyerTaxId ? `Tax ID: ${buyerTaxId}` : <span className="text-slate-300 italic">[Tax ID]</span>} | Attn: {buyerContact || <span className="text-slate-300 italic">[Contact Name]</span>}
                            </div>
                            <div className="text-[10px] text-slate-500">
                              Email: {buyerEmail || <span className="text-slate-300 italic">[Email]</span>}
                            </div>
                          </div>
                        </div>

                        {/* 3. Invoice Reference Meta Grid */}
                        <div className="grid grid-cols-4 gap-2 border border-slate-200 rounded-xl p-3 bg-white text-[10px]">
                          <div>
                            <span className="text-slate-400 block font-bold">INVOICE NO:</span>
                            <span className="font-extrabold text-slate-900 text-xs">
                              {invoiceNo || <span className="text-slate-300 italic font-normal">--</span>}
                            </span>
                          </div>
                          <div>
                            <span className="text-slate-400 block font-bold">DATE:</span>
                            <span className="font-extrabold text-slate-900 text-xs">
                              {invoiceDate || <span className="text-slate-300 italic font-normal">--</span>}
                            </span>
                          </div>
                          <div>
                            <span className="text-slate-400 block font-bold">VALID UNTIL:</span>
                            <span className="font-extrabold text-slate-900 text-xs">
                              {validityDate || <span className="text-slate-300 italic font-normal">--</span>}
                            </span>
                          </div>
                          <div>
                            <span className="text-slate-400 block font-bold">TRADE TERM:</span>
                            <span className="font-extrabold text-blue-700 text-xs">
                              {incoterm || <span className="text-slate-300 italic font-normal">FOB</span>}
                            </span>
                          </div>
                          <div className="pt-2 border-t border-slate-100">
                            <span className="text-slate-400 block font-bold">PORT OF LOADING:</span>
                            <span className="font-bold text-slate-800">
                              {portOfLoading || <span className="text-slate-300 italic font-normal">--</span>}
                            </span>
                          </div>
                          <div className="pt-2 border-t border-slate-100">
                            <span className="text-slate-400 block font-bold">PORT OF DISCHARGE:</span>
                            <span className="font-bold text-slate-800">
                              {portOfDischarge || <span className="text-slate-300 italic font-normal">--</span>}
                            </span>
                          </div>
                          <div className="pt-2 border-t border-slate-100">
                            <span className="text-slate-400 block font-bold">PAYMENT TERMS:</span>
                            <span className="font-bold text-slate-800 truncate block">
                              {paymentTerms || <span className="text-slate-300 italic font-normal">--</span>}
                            </span>
                          </div>
                          <div className="pt-2 border-t border-slate-100">
                            <span className="text-slate-400 block font-bold">BUYER PO NO:</span>
                            <span className="font-bold text-slate-800">
                              {poNumber || <span className="text-slate-300 italic font-normal">--</span>}
                            </span>
                          </div>
                        </div>

                        {/* 4. Products Table */}
                        <div className="border border-slate-200 rounded-xl overflow-hidden">
                          <table className="w-full text-left border-collapse text-[10px]">
                            <thead>
                              <tr className="bg-[#0C244C] text-white font-bold text-[9px] uppercase tracking-wider">
                                <th className="p-2 border-r border-blue-900 w-8 text-center">#</th>
                                <th className="p-2 border-r border-blue-900">Description of Goods</th>
                                <th className="p-2 border-r border-blue-900 text-center">SKU / Model</th>
                                <th className="p-2 border-r border-blue-900 text-center">HS Code</th>
                                <th className="p-2 border-r border-blue-900 text-center">Qty</th>
                                <th className="p-2 border-r border-blue-900 text-right">Unit Price ({currencySymbol})</th>
                                <th className="p-2 text-right">Amount ({currencySymbol})</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200">
                              {items.map((item, index) => {
                                const amount = (item.quantity || 0) * (item.unitPrice || 0);
                                return (
                                  <tr key={item.id} className={index % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                                    <td className="p-2 border-r border-slate-200 text-center text-slate-400 font-bold">
                                      {index + 1}
                                    </td>
                                    <td className="p-2 border-r border-slate-200 font-extrabold text-slate-800">
                                      {item.name || <span className="text-slate-300 italic font-normal">[Enter product description]</span>}
                                    </td>
                                    <td className="p-2 border-r border-slate-200 text-center font-mono text-slate-500">
                                      {item.sku || <span className="text-slate-300 italic font-normal">--</span>}
                                    </td>
                                    <td className="p-2 border-r border-slate-200 text-center font-mono text-slate-600">
                                      {item.hsCode || <span className="text-slate-300 italic font-normal">--</span>}
                                    </td>
                                    <td className="p-2 border-r border-slate-200 text-center font-bold text-slate-900">
                                      {(item.quantity || 0).toLocaleString()} {item.unit || "pcs"}
                                    </td>
                                    <td className="p-2 border-r border-slate-200 text-right font-medium">
                                      {(item.unitPrice || 0).toFixed(2)}
                                    </td>
                                    <td className="p-2 text-right font-bold text-blue-700">
                                      {amount.toFixed(2)}
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                            <tfoot>
                              <tr className="bg-slate-50 font-bold border-t border-slate-200 text-slate-700">
                                <td colSpan={4} className="p-2 text-right uppercase text-[9px]">
                                  Items Subtotal:
                                </td>
                                <td className="p-2 text-center text-slate-900 font-bold">
                                  {totalQuantity.toLocaleString()} pcs
                                </td>
                                <td className="p-2 text-right text-slate-400">-</td>
                                <td className="p-2 text-right font-extrabold text-slate-900">
                                  {currencySymbol}{subtotal.toFixed(2)}
                                </td>
                              </tr>
                            </tfoot>
                          </table>
                        </div>

                        {/* 5. Surcharges & Grand Total Calculation Box */}
                        <div className="grid grid-cols-2 gap-4">
                          {/* Left: Bank Wire Transfer Instructions */}
                          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[10px] space-y-1">
                            <div className="font-extrabold text-slate-800 uppercase text-[9px]">
                              BANK WIRE REMITTANCE INSTRUCTIONS:
                            </div>
                            <div className="grid grid-cols-3 gap-1 pt-1">
                              <span className="text-slate-400 font-bold">BENEFICIARY:</span>
                              <span className="col-span-2 font-bold text-slate-800">
                                {beneficiaryName || <span className="text-slate-300 italic font-normal">[Beneficiary Account Name]</span>}
                              </span>

                              <span className="text-slate-400 font-bold">BANK NAME:</span>
                              <span className="col-span-2 text-slate-700">
                                {bankName || <span className="text-slate-300 italic font-normal">[Bank Name]</span>}
                              </span>

                              <span className="text-slate-400 font-bold">SWIFT / BIC:</span>
                              <span className="col-span-2 font-mono font-bold text-blue-700">
                                {swiftCode || <span className="text-slate-300 italic font-normal">[SWIFT CODE]</span>}
                              </span>

                              <span className="text-slate-400 font-bold">ACCOUNT / IBAN:</span>
                              <span className="col-span-2 font-mono font-bold text-slate-900">
                                {accountNumber || <span className="text-slate-300 italic font-normal">[IBAN / Account Number]</span>}
                              </span>
                            </div>
                          </div>

                          {/* Right: Final Financial Breakdown */}
                          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] space-y-1">
                            <div className="flex justify-between text-slate-600">
                              <span>Subtotal of Goods:</span>
                              <span className="font-bold">{currencySymbol}{subtotal.toFixed(2)}</span>
                            </div>
                            {shippingFee > 0 && (
                              <div className="flex justify-between text-slate-600">
                                <span>International Freight ({incoterm}):</span>
                                <span className="font-bold">+{currencySymbol}{shippingFee.toFixed(2)}</span>
                              </div>
                            )}
                            {insuranceFee > 0 && (
                              <div className="flex justify-between text-slate-600">
                                <span>Cargo All-Risk Insurance:</span>
                                <span className="font-bold">+{currencySymbol}{insuranceFee.toFixed(2)}</span>
                              </div>
                            )}
                            {taxesDuties > 0 && (
                              <div className="flex justify-between text-slate-600">
                                <span>Customs Clearance / Duty:</span>
                                <span className="font-bold">+{currencySymbol}{taxesDuties.toFixed(2)}</span>
                              </div>
                            )}
                            {discountAmount > 0 && (
                              <div className="flex justify-between text-emerald-600 font-bold">
                                <span>Commercial Discount:</span>
                                <span>-{currencySymbol}{discountAmount.toFixed(2)}</span>
                              </div>
                            )}

                            <div className="pt-2 border-t-2 border-slate-300 flex justify-between items-center text-sm font-black text-slate-900">
                              <span>TOTAL DUE ({currency}):</span>
                              <span className="text-lg text-blue-700">
                                {currencySymbol}{grandTotal.toFixed(2)} {currency}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* 6. Commercial Terms & Authorized Signature */}
                        <div className="grid grid-cols-2 gap-4 pt-2">
                          <div className="text-[10px] text-slate-500 space-y-1 p-3 bg-slate-50/70 rounded-xl border border-slate-100">
                            <div className="font-bold text-slate-800 uppercase text-[9px]">SPECIAL TERMS:</div>
                            <p className="leading-relaxed text-[9px] whitespace-pre-line">
                              {additionalNotes || <span className="text-slate-300 italic font-normal">1. Goods remain property of seller until payment is received in full.&#10;2. Claims regarding quantity or quality must be submitted within 14 business days.</span>}
                            </p>
                          </div>

                          <div className="border border-slate-200 rounded-xl p-3 flex flex-col justify-between text-right">
                            <div className="text-[9px] font-bold text-slate-400 uppercase">
                              AUTHORIZED SIGNATURE & COMPANY STAMP:
                            </div>
                            <div className="font-black text-xs text-slate-800">
                              {sellerName || <span className="text-slate-300 italic font-normal">[Seller Company]</span>}
                            </div>
                            <div className="pt-6 border-b border-slate-300 w-3/4 ml-auto" />
                            <div className="text-[10px] font-extrabold text-slate-800 pt-1">
                              {authorizedSigner || <span className="text-slate-300 italic font-normal">[Authorized Signatory Name & Title]</span>}
                            </div>
                            <div className="text-[9px] text-slate-400">Date: {invoiceDate || "--"}</div>
                          </div>
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="pt-6 border-t border-slate-200 flex items-center justify-between text-[9px] text-slate-400">
                        <span>Official Trade Billing Document — Generated via JCD Forwarder</span>
                        <span>Page 1 of 1</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Action Bar */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 shadow-sm border border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 print:hidden">
                  <div className="text-xs text-slate-400 text-center sm:text-left">
                    Your trade data stays local to your browser session. Never shared or stored externally.
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

        {/* 3. SEO & EDUCATIONAL SECTION (Matching DDPChain screenshot 4) */}
        <section className="mt-16 space-y-12 print:hidden">
          {/* What You Can Create Grid */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-10 shadow-sm border border-slate-200/80 dark:border-slate-800 space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                What You Can Create
              </h2>
              <p className="text-sm text-slate-500 max-w-xl mx-auto">
                Generate compliant proforma and commercial invoices recognized by customs brokers, freight agents, and international banks worldwide.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 space-y-2">
                <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 flex items-center justify-center">
                  <Building2 className="w-4 h-4" />
                </div>
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                  Seller & Buyer Details
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Add full legal entities, corporate tax IDs/VAT numbers, addresses, and upload custom high-resolution branding logos.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 space-y-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 flex items-center justify-center">
                  <Receipt className="w-4 h-4" />
                </div>
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                  Product & Tariff Table
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Include SKUs, international HS tariff codes, units, and unit pricing with real-time automated subtotal calculations.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 space-y-2">
                <div className="w-8 h-8 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-600 flex items-center justify-center">
                  <DollarSign className="w-4 h-4" />
                </div>
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                  Multi-Currency & Terms
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Toggle seamlessly between USD ($), EUR (€), GBP (£), and CNY (¥) with Incoterms (DDP, FOB, CIF, EXW, DAP) selection.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 space-y-2">
                <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 flex items-center justify-center">
                  <CreditCard className="w-4 h-4" />
                </div>
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                  Bank Wire Instructions
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Ensure accurate wire transfers with dedicated fields for beneficiary name, bank address, SWIFT / BIC, and IBAN numbers.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 space-y-2">
                <div className="w-8 h-8 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                  Authorized Certification
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Dedicated signature and company stamp line to validate your quotation for letters of credit (L/C) and customs entry.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 space-y-2">
                <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 flex items-center justify-center">
                  <Download className="w-4 h-4" />
                </div>
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                  PDF & Print Ready
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Export vector-sharp A4 format documents formatted cleanly without website chrome, sidebars, or headers.
                </p>
              </div>
            </div>
          </div>

          {/* How the Generator Works (4 Steps) */}
          <div className="bg-[#081B38] text-white rounded-3xl p-8 sm:p-10 shadow-xl space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-black text-white">
                How the Invoice Generator Works
              </h2>
              <p className="text-xs sm:text-sm text-blue-200">
                Four simple steps to create professional commercial documents.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-3">
                <div className="w-8 h-8 rounded-xl bg-orange-500 text-white font-black text-sm flex items-center justify-center">
                  1
                </div>
                <h3 className="font-extrabold text-sm text-white">Select a Template</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Pick from 6 corporate and export designs tailored for modern international B2B trade.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-3">
                <div className="w-8 h-8 rounded-xl bg-blue-500 text-white font-black text-sm flex items-center justify-center">
                  2
                </div>
                <h3 className="font-extrabold text-sm text-white">Fill Details & Terms</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Input seller and buyer details, routing ports, payment terms, and upload your company logo.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-500 text-white font-black text-sm flex items-center justify-center">
                  3
                </div>
                <h3 className="font-extrabold text-sm text-white">Add Products & Freight</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  List items with HS codes, quantities, and prices. The calculator automates totals and freight.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-3">
                <div className="w-8 h-8 rounded-xl bg-purple-500 text-white font-black text-sm flex items-center justify-center">
                  4
                </div>
                <h3 className="font-extrabold text-sm text-white">Preview & Download PDF</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Inspect the live A4 paper canvas and download a clean, print-ready PDF for your client.
                </p>
              </div>
            </div>
          </div>

          {/* Educational Comparison FAQ */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-10 shadow-sm border border-slate-200/80 dark:border-slate-800 space-y-6">
            <h2 className="text-xl font-black text-slate-900 dark:text-white">
              Understanding Proforma vs. Commercial Invoices
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              <div className="space-y-2 p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-100 dark:border-slate-800">
                <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                  What is a Proforma Invoice (PI)?
                </h3>
                <p>
                  A Proforma Invoice is a preliminary bill of sale sent to the buyer before goods are manufactured or dispatched. It serves as a binding commercial quotation, allowing buyers to arrange purchase orders, open bank Letters of Credit (L/C), and obtain import licenses.
                </p>
              </div>

              <div className="space-y-2 p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-100 dark:border-slate-800">
                <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                  When does a Commercial Invoice replace the Proforma Invoice?
                </h3>
                <p>
                  The Commercial Invoice is issued once the goods are produced, packed, and ready to ship. It is the final legal bill used by customs authorities (e.g. US CBP, EU ICS2, UK HMRC) to assess import duties and taxes based on the finalized quantities and shipping costs.
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
          #printable-invoice {
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
