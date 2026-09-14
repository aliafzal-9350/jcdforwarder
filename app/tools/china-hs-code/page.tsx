"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { getWhatsAppUrl } from "@/data/siteConfig";
import {
  Search,
  ShieldAlert,
  ShieldCheck,
  Copy,
  Check,
  AlertCircle,
  MessageCircle,
  HelpCircle,
  Package,
} from "lucide-react";

interface HSCodeItem {
  hsCode: string;
  nameEn: string;
  nameZh: string;
  category: "Electronics" | "Machinery" | "Textiles" | "Consumer Goods" | "Automotive" | "Medical & Solar";
  exportVatRebate: string;
  customsSupervision: string;
  keyCompliance: string;
}

const HS_CODE_DATABASE: HSCodeItem[] = [
  {
    hsCode: "8507.60.00",
    nameEn: "Lithium-ion accumulators (including pure batteries & power banks)",
    nameZh: "锂离子蓄电池 (含纯锂电池、移动电源)",
    category: "Electronics",
    exportVatRebate: "13%",
    customsSupervision: "Dangerous Goods Tally / Class 9 UN3480",
    keyCompliance: "Mandatory UN38.3 test summary, 1.2m drop test report, MSDS, and battery carrier declaration.",
  },
  {
    hsCode: "8518.30.00",
    nameEn: "Headphones and earphones, wireless Bluetooth earbuds & headsets",
    nameZh: "无线蓝牙耳机及耳麦",
    category: "Electronics",
    exportVatRebate: "13%",
    customsSupervision: "Standard Electronics Export",
    keyCompliance: "FCC ID / Part 15 (USA), CE RED Directive / RoHS (Europe), Battery UN38.3 report.",
  },
  {
    hsCode: "8517.62.00",
    nameEn: "Smart watches, fitness activity trackers & wireless transmitters",
    nameZh: "智能手表、运动手环及无线通讯接收设备",
    category: "Electronics",
    exportVatRebate: "13%",
    customsSupervision: "Wireless Electronics Supervision",
    keyCompliance: "FCC ID (USA), CE Mark & RED (Europe), lithium cell transport certification.",
  },
  {
    hsCode: "3926.90.97",
    nameEn: "Protective cases for smartphones and tablets (Plastic, TPU, Silicone)",
    nameZh: "塑料及硅胶制智能手机保护套、平板保护壳",
    category: "Consumer Goods",
    exportVatRebate: "13%",
    customsSupervision: "Standard Export Declaration",
    keyCompliance: "General Certificate of Conformity (GCC), REACH (EU), RoHS non-toxic material declaration.",
  },
  {
    hsCode: "4202.92.00",
    nameEn: "Backpacks, travel bags, laptop backpacks with outer surface of textile",
    nameZh: "纺织材料面双肩背包、电脑包、旅行包",
    category: "Consumer Goods",
    exportVatRebate: "13%",
    customsSupervision: "Standard Export Declaration",
    keyCompliance: "US CPSC lead and phthalates testing, Prop 65 (California), EU REACH compliance.",
  },
  {
    hsCode: "6404.11.00",
    nameEn: "Sports footwear, tennis shoes, basketball sneakers with rubber or plastic soles",
    nameZh: "运动鞋、球鞋 (橡胶或塑料底，织物面)",
    category: "Consumer Goods",
    exportVatRebate: "13%",
    customsSupervision: "Footwear Origin Inspection",
    keyCompliance: "Footwear country of origin marking, CPSIA lead limits for children sizes, anti-slip certifications.",
  },
  {
    hsCode: "9506.91.00",
    nameEn: "Gymnastics, exercise & fitness equipment (Yoga mats, resistance bands, dumbbells)",
    nameZh: "健身及瑜伽用品 (瑜伽垫、弹力带、哑铃)",
    category: "Consumer Goods",
    exportVatRebate: "13%",
    customsSupervision: "Standard Export Declaration",
    keyCompliance: "TPE/PVC chemical safety, REACH SVHC screening, US California Prop 65 warnings.",
  },
  {
    hsCode: "8541.43.00",
    nameEn: "Photovoltaic cells assembled in modules or panels (Solar Panels)",
    nameZh: "已装配在组件中或组装成块的太阳能电池",
    category: "Medical & Solar",
    exportVatRebate: "13%",
    customsSupervision: "Standard Export Declaration",
    keyCompliance: "Anti-dumping duty checks for US/EU imports; IEC 61215/61730 certification recommended.",
  },
  {
    hsCode: "8504.40.14",
    nameEn: "Static converters / Switch-mode power supply units (AC/DC phone & laptop chargers)",
    nameZh: "稳压电源及开关电源 (充电器、电源适配器)",
    category: "Electronics",
    exportVatRebate: "13%",
    customsSupervision: "Standard Export Supervision",
    keyCompliance: "CE/EMC for European destination imports, FCC Part 15 / UL for USA.",
  },
  {
    hsCode: "8477.10.10",
    nameEn: "Injection-molding machines for working rubber or plastics",
    nameZh: "塑料或橡胶注塑机",
    category: "Machinery",
    exportVatRebate: "13%",
    customsSupervision: "Heavy Machinery Export Inspection",
    keyCompliance: "Fumigated wood packaging ISPM-15, lifting point diagram, customs valuation declaration.",
  },
  {
    hsCode: "8456.11.00",
    nameEn: "Machine tools operated by laser (Fiber laser metal cutting machines)",
    nameZh: "激光切割机",
    category: "Machinery",
    exportVatRebate: "13%",
    customsSupervision: "Dual-Use Technology Verification",
    keyCompliance: "Laser radiation safety classification (FDA Accession Number for US imports).",
  },
  {
    hsCode: "9405.42.10",
    nameEn: "LED lamps and lighting fittings for commercial or domestic illumination",
    nameZh: "LED灯具及照明装置",
    category: "Electronics",
    exportVatRebate: "13%",
    customsSupervision: "Standard Export Declaration",
    keyCompliance: "EU ERP energy efficiency directive, RoHS hazardous substance test reports.",
  },
  {
    hsCode: "8708.70.10",
    nameEn: "Road wheels and parts and accessories thereof (Aluminum alloy auto wheels)",
    nameZh: "铝合金汽车车轮及轮毂配件",
    category: "Automotive",
    exportVatRebate: "13%",
    customsSupervision: "Automotive Component Supervision",
    keyCompliance: "DOT marking for USA, E-Mark (ECE R124) for European Union.",
  },
  {
    hsCode: "8708.30.10",
    nameEn: "Brakes and servo-brakes and parts thereof (Automotive brake pads)",
    nameZh: "制动器及零件 (汽车刹车片)",
    category: "Automotive",
    exportVatRebate: "13%",
    customsSupervision: "Standard Export Declaration",
    keyCompliance: "ECE R90 compliance required for European replacement brake parts.",
  },
  {
    hsCode: "3924.10.00",
    nameEn: "Tableware and kitchenware, of plastics (Food storage containers, utensils)",
    nameZh: "塑料制餐具及厨房用具",
    category: "Consumer Goods",
    exportVatRebate: "13%",
    customsSupervision: "Food Contact Grade Declaration",
    keyCompliance: "US FDA 21 CFR food contact testing, EU Regulation 1935/2004 compliance declaration.",
  },
  {
    hsCode: "7323.93.00",
    nameEn: "Table, kitchen or other household articles of stainless steel (Cookware, pots)",
    nameZh: "不锈钢制餐具及厨房用品",
    category: "Consumer Goods",
    exportVatRebate: "13%",
    customsSupervision: "Standard Export Declaration",
    keyCompliance: "Heavy metal leaching tests (LFGB / FDA), grade 304/316 composition report.",
  },
  {
    hsCode: "9617.00.10",
    nameEn: "Vacuum flasks and stainless steel thermal insulated drinkware (Travel mugs, water bottles)",
    nameZh: "保温瓶及其他真空保温容器",
    category: "Consumer Goods",
    exportVatRebate: "13%",
    customsSupervision: "Standard Export Declaration",
    keyCompliance: "BPA-free certificate, FDA food contact safe lid silicone seal test.",
  },
  {
    hsCode: "6109.10.00",
    nameEn: "T-shirts, singlets and other vests, knitted or crocheted, of cotton",
    nameZh: "棉制针织或钩编T恤衫、汗衫",
    category: "Textiles",
    exportVatRebate: "13%",
    customsSupervision: "Textile Origin & Fiber Content",
    keyCompliance: "Care labeling regulations, fiber composition analysis, OEKO-TEX Standard 100.",
  },
  {
    hsCode: "6201.40.10",
    nameEn: "Men's or boys' overcoats, car coats, anoraks of man-made fibers (Winter jackets)",
    nameZh: "化纤制男式大衣、防风衣、夹克衫",
    category: "Textiles",
    exportVatRebate: "13%",
    customsSupervision: "Standard Textile Export",
    keyCompliance: "Flammability standard 16 CFR Part 1610 (USA), REACH chemical testing (EU).",
  },
  {
    hsCode: "9503.00.21",
    nameEn: "Dolls representing only human beings (and accessories thereof)",
    nameZh: "仅代表人类的玩偶及配件",
    category: "Consumer Goods",
    exportVatRebate: "13%",
    customsSupervision: "Toy Safety Quality Inspection",
    keyCompliance: "ASTM F963 / CPSIA certificate for USA, EN71 safety standard & CE mark for EU.",
  },
  {
    hsCode: "9504.50.00",
    nameEn: "Video game consoles and machines (Handheld gaming devices & controllers)",
    nameZh: "视频游戏控制器及游戏机",
    category: "Electronics",
    exportVatRebate: "13%",
    customsSupervision: "Standard Electronics Export",
    keyCompliance: "Bluetooth / Wi-Fi RED directive compliance (EU), FCC ID certification (USA).",
  },
  {
    hsCode: "9018.90.99",
    nameEn: "Instruments and appliances used in medical or veterinary sciences",
    nameZh: "医疗、兽医用其他仪器及器具",
    category: "Medical & Solar",
    exportVatRebate: "13%",
    customsSupervision: "Medical Device Export Record (药监局备案)",
    keyCompliance: "FDA 510(k) or Device Listing (USA), MDR CE compliance certification (EU).",
  },
];

export default function ChinaHsCodeFinderPage() {
  const [query, setQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const categories = ["All", "Electronics", "Consumer Goods", "Textiles", "Machinery", "Automotive", "Medical & Solar"];

  const filteredItems = useMemo(() => {
    const q = query.trim().toLowerCase();
    return HS_CODE_DATABASE.filter((item) => {
      const matchCategory = selectedCategory === "All" || item.category === selectedCategory;
      const matchQuery =
        !q ||
        item.hsCode.toLowerCase().includes(q) ||
        item.nameEn.toLowerCase().includes(q) ||
        item.nameZh.toLowerCase().includes(q) ||
        item.keyCompliance.toLowerCase().includes(q);
      return matchCategory && matchQuery;
    });
  }, [query, selectedCategory]);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

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
            <span className="text-slate-300">China HS Code Finder</span>
          </div>

          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-semibold">
              <ShieldCheck className="h-3.5 w-3.5 text-blue-400" />
              <span>Chinese Customs &amp; Tariff Classification</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
              China Export HS Code &amp; Duty Classification Finder
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Find the right Harmonized System (HS) code for your goods shipped from China, check export VAT rebate rates, and understand import compliance rules.
            </p>
          </div>

          {/* Search Box */}
          <div className="mt-8 max-w-3xl bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white">
            <div className="relative">
              <Search className="absolute left-4 top-3.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search product (e.g. earbuds, phone case, backpack, battery, solar)..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full h-12 pl-11 pr-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                    selectedCategory === cat
                      ? "bg-blue-600 text-white shadow-sm"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Results Grid */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Beginner Guide Banner */}
        <div className="mb-8 p-5 rounded-2xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 flex items-start gap-3.5 text-xs text-blue-900 dark:text-blue-200">
          <HelpCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold text-sm">What is an HS Code?</span>
            <p className="leading-relaxed text-blue-800 dark:text-blue-300">
              An HS Code (Harmonized System Code) is a universal 6-to-10 digit number used by customs worldwide to identify products, calculate import duty and tax, and verify safety regulations. The first 6 digits are uniform across all countries, while the trailing digits are set by national customs.
            </p>
          </div>
        </div>

        {/* Official Customs Disclaimer Callout */}
        <div className="mb-8 p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 flex items-start gap-3 text-xs text-amber-800 dark:text-amber-300">
          <ShieldAlert className="h-5 w-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold">Customs Classification Notice:</span>
            <p className="leading-relaxed text-amber-700 dark:text-amber-400">
              Exact HS code classification depends on raw material composition and functional design. JCD Forwarder helps review your product specs and commercial invoice to ensure smooth customs declaration without delays or penalties.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500 pb-2">
            <span>Displaying {filteredItems.length} matching product classifications</span>
            <span>VAT rebate values verified with Chinese customs guidelines</span>
          </div>

          {filteredItems.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500/50 transition-all shadow-sm space-y-4"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-lg font-black text-blue-600 dark:text-blue-400">
                      {item.hsCode}
                    </span>
                    <button
                      onClick={() => handleCopy(item.hsCode)}
                      className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600"
                      title="Copy HS Code"
                    >
                      {copiedCode === item.hsCode ? (
                        <Check className="h-3.5 w-3.5 text-emerald-500" />
                      ) : (
                        <Copy className="h-3.5 w-3.5" />
                      )}
                    </button>
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      {item.category}
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-slate-900 dark:text-white">
                    {item.nameEn}
                  </h3>
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    Chinese Customs Name: {item.nameZh}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <div className="px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs">
                    <span className="text-emerald-700 dark:text-emerald-300 font-semibold">China VAT Rebate: </span>
                    <span className="font-bold text-emerald-900 dark:text-emerald-200">{item.exportVatRebate}</span>
                  </div>
                  <a
                    href={getWhatsAppUrl(`Hello JCD Customs Broker, I need customs clearance confirmation for HS Code ${item.hsCode} (${item.nameEn}).`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-colors"
                  >
                    <MessageCircle className="h-3.5 w-3.5" />
                    <span>Confirm with Broker</span>
                  </a>
                </div>
              </div>

              {/* Details and Compliance Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs">
                <div>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">China Export Rules:</span>
                  <p className="text-slate-600 dark:text-slate-400 mt-0.5">
                    {item.customsSupervision}
                  </p>
                </div>
                <div>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">Import Testing &amp; Certifications Required:</span>
                  <p className="text-slate-600 dark:text-slate-400 mt-0.5">
                    {item.keyCompliance}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {filteredItems.length === 0 && (
            <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8">
              <AlertCircle className="h-10 w-10 text-amber-500 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                No Exact Matches for &quot;{query}&quot;
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-md mx-auto">
                Customs tariffs include thousands of specific product sub-categories. Send our licensed customs brokerage team in Shenzhen a photo or supplier spec sheet to get the exact classification.
              </p>
              <div className="mt-4">
                <a
                  href={getWhatsAppUrl(`Hello JCD Customs Desk, I need help finding the right HS code for: ${query}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-colors"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Ask Customs Broker on WhatsApp</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

