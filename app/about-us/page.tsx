import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { SITE_CONFIG, getWhatsAppUrl } from "@/data/siteConfig";
import { JsonLd, createLocalBusinessSchema } from "@/components/seo/JsonLd";
import {
  ShieldCheck,
  Award,
  Building2,
  Clock,
  CheckCircle2,
  Star,
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  MessageCircle,
  FileCheck,
  Scale,
  Users,
  Warehouse,
  History,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | Shenzhen Jiechengda International Freight Forwarding Co., Ltd.",
  description:
    "Learn about JCD Forwarder (Shenzhen Jiechengda), founded in 2015. Verified NVOCC License GD20240307220907, 500 m² Shenzhen consolidation warehouse, 300,000+ shipments delivered worldwide.",
  openGraph: {
    title: "About JCD Forwarder | Verified China NVOCC & DDP Freight Operator",
    description:
      "10+ years of China freight forwarding excellence, licensed by Guangdong Provincial Department of Transportation (NVOCC GD20240307220907).",
  },
};

export default function AboutUsPage() {
  const localBusinessSchema = createLocalBusinessSchema();

  const milestones = [
    {
      year: "2015",
      title: "Corporate Foundation in Shenzhen",
      desc: "Shenzhen Jiechengda International Freight Forwarding Co., Ltd. officially registered on April 07, 2015 in Bao'an District, Shenzhen.",
    },
    {
      year: "2017",
      title: "Amazon FBA First-Leg Network Launch",
      desc: "Integrated direct CARP EDI booking and regional palletization standards for US, UK, and German Amazon fulfillment centers.",
    },
    {
      year: "2020",
      title: "Pure Battery & DG Aviation Expansion",
      desc: "Established dedicated Dangerous Goods compliance routes via Hong Kong (HKG) and Weihai-Korea ferry for UN38.3 lithium batteries.",
    },
    {
      year: "2022",
      title: "Consolidation Hub Upgrade in Xinhe",
      desc: "Commissioned the 500 m² entire Building C facility in Bao'an Xinhe with automated barcode scanning, drop-testing, and free 7-day consolidation storage.",
    },
    {
      year: "2024",
      title: "Official NVOCC License Certification",
      desc: "Awarded Non-Vessel Operating Common Carrier license GD20240307220907 by the Guangdong Provincial Department of Transportation.",
    },
    {
      year: "Today",
      title: "300,000+ Shipments Across 44 Countries",
      desc: "Serving 100,000+ global importers with guaranteed all-inclusive DDP pricing, zero dock rejections, and 2-hour SLA response times.",
    },
  ];

  return (
    <div className="bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen">
      <JsonLd schema={localBusinessSchema} />

      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-slate-950 text-white py-20 lg:py-28 border-b border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-950/40 via-slate-950 to-slate-950 -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 border border-blue-500/30 px-3 py-1 text-xs font-semibold text-blue-300">
              <ShieldCheck className="h-3.5 w-3.5 text-blue-400" />
              <span>Verified NVOCC License: GD20240307220907 • 10+ Years Established</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1]">
              Authoritative China Freight <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-sky-400">
                Forwarding &amp; Governance
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Shenzhen Jiechengda International Freight Forwarding Co., Ltd. (深圳市捷成达国际货运代理有限公司) delivers reliable, transparent, and legally compliant international freight forwarding from China&apos;s primary industrial clusters to 44 global destinations.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href={getWhatsAppUrl("Hello JCD Forwarder, I am reviewing your company credentials.")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.02]"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Connect with Senior Management</span>
              </a>

              <Link
                href="/contact"
                className="flex items-center gap-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 px-6 py-3.5 text-sm font-bold text-slate-200 transition-all"
              >
                <Phone className="h-4 w-4 text-blue-400" />
                <span>Contact Dispatch Desk</span>
              </Link>
            </div>

            {/* Audited Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-slate-800/80">
              <div>
                <div className="text-3xl font-black text-white">300,000+</div>
                <div className="text-xs text-slate-400 mt-1">Completed Shipments</div>
              </div>
              <div>
                <div className="text-3xl font-black text-blue-400">100,000+</div>
                <div className="text-xs text-slate-400 mt-1">Importers Served</div>
              </div>
              <div>
                <div className="text-3xl font-black text-amber-400">4.7 / 5.0</div>
                <div className="text-xs text-slate-400 mt-1">Alibaba Rating (48 Reviews)</div>
              </div>
              <div>
                <div className="text-3xl font-black text-emerald-400">100.0%</div>
                <div className="text-xs text-slate-400 mt-1">On-Time Dispatch SLA</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. OFFICIAL REGISTRATION & NVOCC CREDENTIALS */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-3 mb-10">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
            Verified Legal Credentials
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Official Licensing &amp; Corporate Registration
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Ground-truth enterprise data filed with the Chinese government and transportation authorities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-3 shadow-sm">
            <div className="flex items-center gap-2 text-blue-600">
              <ShieldCheck className="h-5 w-5" />
              <span className="text-xs font-bold uppercase tracking-wider">NVOCC Licensing</span>
            </div>
            <div className="text-xl font-black font-mono text-slate-900 dark:text-white">
              {SITE_CONFIG.credentials.nvoccLicenseNumber}
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Issued by the {SITE_CONFIG.credentials.licensingBody}. Grants direct Master Bill of Lading (MBL) issuance and legally authorized ocean carriage rights.
            </p>
            <div className="text-[11px] font-mono text-slate-500 pt-2 border-t border-slate-100 dark:border-slate-800">
              Filing Date: {SITE_CONFIG.credentials.nvoccFilingDate}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-3 shadow-sm">
            <div className="flex items-center gap-2 text-indigo-600">
              <Building2 className="h-5 w-5" />
              <span className="text-xs font-bold uppercase tracking-wider">Legal Corporate Entity</span>
            </div>
            <div className="text-base font-bold text-slate-900 dark:text-white">
              {SITE_CONFIG.credentials.legalNameEn}
            </div>
            <div className="text-xs font-medium text-slate-500 font-mono">
              {SITE_CONFIG.credentials.legalNameZh}
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Legal Representative: <strong>{SITE_CONFIG.credentials.legalRepresentative}</strong>. Registered with Shenzhen Municipal Administration for Market Regulation.
            </p>
            <div className="text-[11px] font-mono text-slate-500 pt-2 border-t border-slate-100 dark:border-slate-800">
              Established: {SITE_CONFIG.credentials.establishedDate}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-3 shadow-sm">
            <div className="flex items-center gap-2 text-amber-600">
              <Award className="h-5 w-5" />
              <span className="text-xs font-bold uppercase tracking-wider">Alibaba Gold Supplier</span>
            </div>
            <div className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <span>4.7 / 5.0 Rating</span>
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-amber-400" />
                ))}
              </div>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Verified Gold Supplier on Alibaba Buyer Central with 48 public importer reviews and 100% on-time shipment dispatch record.
            </p>
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
              <a
                href={SITE_CONFIG.socials.alibabaTrustPass}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
              >
                <span>View Official Alibaba Store</span>
                <ArrowRight className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PHYSICAL FACILITY & SHENZHEN CONSOLIDATION HUB */}
      <section className="py-16 bg-slate-50 dark:bg-slate-900/60 border-t border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-xs font-bold">
                Operational Headquarters
              </div>
              <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
                500+ m² Dedicated Shenzhen Consolidation Warehouse
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Located in the Xinhe industrial corridor of Bao&apos;an District, Shenzhen, our facility operates 24/7 receiving supplier cargo from all over Guangdong, Zhejiang, and Jiangsu.
              </p>

              <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4 text-xs space-y-1">
                <div className="font-bold text-slate-900 dark:text-white">HQ Address:</div>
                <div className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  {SITE_CONFIG.facility.hqAddressEn}
                </div>
                <div className="text-slate-400 text-[11px] font-mono mt-1">
                  {SITE_CONFIG.facility.hqAddressZh}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {SITE_CONFIG.facility.warehouseServices.map((srv, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{srv}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Warehouse Visual Blueprint Card */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 shadow-sm space-y-6">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Warehouse className="h-5 w-5 text-blue-600" />
                Facility Specifications &amp; Capabilities
              </h3>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800">
                  <span className="text-slate-500">Total Enclosed Area:</span>
                  <strong className="text-slate-900 dark:text-white">
                    500+ m² (Entire Building C)
                  </strong>
                </div>

                <div className="flex justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800">
                  <span className="text-slate-500">Free Consolidation Storage:</span>
                  <strong className="text-emerald-600 dark:text-emerald-400">
                    7 Days Free Staging
                  </strong>
                </div>

                <div className="flex justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800">
                  <span className="text-slate-500">Proximity to SZX Airport:</span>
                  <strong className="text-slate-900 dark:text-white">
                    12 km (15 Minutes Drive)
                  </strong>
                </div>

                <div className="flex justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800">
                  <span className="text-slate-500">Proximity to Shekou/Yantian:</span>
                  <strong className="text-slate-900 dark:text-white">
                    35 km (Direct Highway Drayage)
                  </strong>
                </div>

                <div className="flex justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800">
                  <span className="text-slate-500">Security &amp; Surveillance:</span>
                  <strong className="text-slate-900 dark:text-white">
                    24/7 High-Definition CCTV &amp; Security Guards
                  </strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CORPORATE HISTORY & CHRONOLOGY */}
      <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 space-y-3">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
            10+ Year Track Record
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            Chronology of JCD Forwarder
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            A decade of continuous investment into air charters, direct ocean liner contracts, and Amazon prep systems.
          </p>
        </div>

        <div className="space-y-6 relative before:absolute before:inset-0 before:left-8 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
          {milestones.map((m, idx) => (
            <div key={idx} className="relative flex items-start gap-6 pl-2">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white font-black text-xs shadow-md z-10">
                {m.year}
              </div>
              <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 flex-1 shadow-sm">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                  {m.title}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {m.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. CALL TO ACTION */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-black">
            Partner with a Legally Verified China Forwarder
          </h2>
          <p className="text-sm sm:text-base text-blue-100 max-w-2xl mx-auto">
            Contact our senior dispatch desk in Shenzhen for custom container contracts, consolidated LCL shipping, and air charters.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="flex items-center gap-2 rounded-xl bg-white text-blue-600 hover:bg-blue-50 px-7 py-4 text-sm font-bold shadow-lg transition-all hover:scale-105"
            >
              <span>Contact Dispatch Office</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={getWhatsAppUrl("Hello JCD Forwarder, I am requesting a direct freight inquiry.")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl bg-blue-800 hover:bg-blue-900 text-white border border-blue-400 px-7 py-4 text-sm font-bold transition-all"
            >
              <MessageCircle className="h-4 w-4" />
              <span>WhatsApp Direct Desk</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
