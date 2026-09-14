"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SITE_CONFIG, getWhatsAppUrl, getMailtoUrl } from "@/data/siteConfig";
import { ORIGIN_HUBS } from "@/data/origins";
import { TARGET_ROUTES } from "@/data/routes";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  MessageCircle,
  Send,
  Building2,
  CheckCircle2,
  ExternalLink,
  ArrowRight,
} from "lucide-react";

export default function ContactPage() {
  const [originId, setOriginId] = useState("shenzhen");
  const [destinationCode, setDestinationCode] = useState("US");
  const [serviceType, setServiceType] = useState("Air DDP Express");
  const [weightKg, setWeightKg] = useState("250");
  const [volumeCbm, setVolumeCbm] = useState("1.8");
  const [shipperName, setShipperName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [message, setMessage] = useState("");

  const formatPayload = () => {
    const origin = ORIGIN_HUBS.find((h) => h.id === originId)?.name || "Shenzhen";
    const dest = TARGET_ROUTES.find((r) => r.code === destinationCode)?.name || "United States";

    return `🇨🇳 JCD FORWARDER | CONTACT INQUIRY
========================================
[NVOCC LICENSE: GD20240307220907]
[24/7 SHENZHEN DISPATCH: +86 137 2424 6674]

📍 Origin Port: ${origin}
🎯 Destination Country: ${dest} (${destinationCode})
🚚 Requested Service: ${serviceType}
⚖️ Cargo: ${weightKg} KG | ${volumeCbm} CBM

👤 Shipper Contact:
• Name: ${shipperName || "Commercial Importer"}
• Company: ${companyName || "Global Shipper"}
• WhatsApp: ${whatsappNumber || "Provided in chat"}
• Email: ${emailAddress || "Provided in chat"}
${message ? `• Notes: ${message}` : ""}

Please confirm current all-inclusive DDP freight rate and vessel/flight cut-off dates.`;
  };

  const handleWhatsAppSend = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = formatPayload();
    const url = getWhatsAppUrl(payload);
    window.open(url, "_blank");
  };

  const handleEmailSend = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `[Freight Inquiry] China to ${destinationCode} (${serviceType}) - ${companyName || shipperName || "Importer"}`;
    const body = formatPayload();
    const url = getMailtoUrl(subject, body);
    window.open(url, "_blank");
  };

  return (
    <div className="bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen">
      {/* 1. HERO */}
      <section className="relative overflow-hidden bg-slate-950 text-white py-16 lg:py-24 border-b border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-950/40 via-slate-950 to-slate-950 -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 border border-blue-500/30 px-3 py-1 text-xs font-semibold text-blue-300">
              <ShieldCheck className="h-3.5 w-3.5 text-blue-400" />
              <span>NVOCC License: GD20240307220907 • 24/7 Operations Desk</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight">
              Contact JCD Forwarder <br />
              <span className="text-sky-400">
                Direct Dispatch &amp; RFQ Desk
              </span>
            </h1>

            <p className="text-base text-slate-300 leading-relaxed">
              Connect directly with our senior freight controllers in Shenzhen for live flight space, container booking, Amazon FBA prep, and instant DDP landed costing. Average response time under 2 hours.
            </p>
          </div>
        </div>
      </section>

      {/* 2. CONTACT CHANNELS & INTERACTIVE RFQ FORM */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Direct Contacts & HQ Location */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                Direct Communication
              </span>
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
                Official Contact Channels
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Available 24 hours a day, 7 days a week for urgent shipments.
              </p>
            </div>

            {/* Quick WhatsApp Action Card */}
            <a
              href={getWhatsAppUrl("Hello JCD Forwarder, I am requesting immediate freight assistance.")}
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-between shadow-lg shadow-emerald-600/25 transition-all hover:scale-[1.02] block"
            >
              <div className="flex items-center gap-3.5">
                <div className="h-12 w-12 rounded-xl bg-white/20 flex items-center justify-center">
                  <MessageCircle className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-emerald-100">
                    Fastest Response Channel
                  </div>
                  <div className="text-base font-bold">24/7 WhatsApp Hotline</div>
                  <div className="text-xs text-emerald-200 font-mono">
                    +86 137 2424 6674
                  </div>
                </div>
              </div>
              <ArrowRight className="h-5 w-5 opacity-80" />
            </a>

            {/* Contact Details List */}
            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-start gap-3">
                <Phone className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <div className="text-slate-500 font-semibold">Direct Telephone / WeChat:</div>
                  <a
                    href={`tel:${SITE_CONFIG.contact.phone}`}
                    className="font-bold text-sm text-slate-900 dark:text-white hover:text-blue-600"
                  >
                    {SITE_CONFIG.contact.phoneDisplay}
                  </a>
                  <div className="text-slate-400 mt-0.5">English, Mandarin, Cantonese spoken</div>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-start gap-3">
                <Mail className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <div className="text-slate-500 font-semibold">Official Inquiry Email:</div>
                  <a
                    href={`mailto:${SITE_CONFIG.contact.email}`}
                    className="font-bold text-sm text-slate-900 dark:text-white hover:text-blue-600"
                  >
                    {SITE_CONFIG.contact.email}
                  </a>
                  <div className="text-slate-400 mt-0.5">Send commercial invoices &amp; packing lists</div>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-start gap-3">
                <MapPin className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <div className="text-slate-500 font-semibold">Shenzhen HQ &amp; Warehouse Facility:</div>
                  <div className="font-bold text-slate-900 dark:text-white mt-0.5 leading-snug">
                    {SITE_CONFIG.facility.hqAddressEn}
                  </div>
                  <div className="text-slate-400 font-mono text-[11px] mt-1">
                    {SITE_CONFIG.facility.hqAddressZh}
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-start gap-3">
                <Clock className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <div className="text-slate-500 font-semibold">Operational Working Hours:</div>
                  <div className="font-bold text-slate-900 dark:text-white">
                    {SITE_CONFIG.contact.operatingHours}
                  </div>
                  <div className="text-emerald-600 font-medium mt-0.5">
                    {SITE_CONFIG.contact.slaResponseTime}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Direct RFQ Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-sm space-y-6">
              <div>
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                  Instant Dispatch
                </span>
                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mt-1">
                  Request a Formal Landed DDP Quotation
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Fill in your shipment specs below to generate a formatted WhatsApp dispatch or email RFQ.
                </p>
              </div>

              <form className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                      Origin Chinese Port / Hub:
                    </label>
                    <select
                      value={originId}
                      onChange={(e) => setOriginId(e.target.value)}
                      className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2.5 text-xs font-medium text-slate-900 dark:text-white focus:border-blue-600 focus:outline-none"
                    >
                      {ORIGIN_HUBS.map((h) => (
                        <option key={h.id} value={h.id}>
                          {h.name} ({h.seaports[0]?.name || "Port"})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                      Destination Country:
                    </label>
                    <select
                      value={destinationCode}
                      onChange={(e) => setDestinationCode(e.target.value)}
                      className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2.5 text-xs font-medium text-slate-900 dark:text-white focus:border-blue-600 focus:outline-none"
                    >
                      {TARGET_ROUTES.map((r) => (
                        <option key={r.code} value={r.code}>
                          {r.name} ({r.code})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                      Preferred Mode:
                    </label>
                    <select
                      value={serviceType}
                      onChange={(e) => setServiceType(e.target.value)}
                      className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2.5 text-xs font-medium text-slate-900 dark:text-white focus:border-blue-600 focus:outline-none"
                    >
                      <option value="Air DDP Express">Air DDP Express (5-7d)</option>
                      <option value="Air Economy">Air Economy (8-12d)</option>
                      <option value="Matson Sea DDP">Matson Fast Sea (12-16d)</option>
                      <option value="Standard Sea LCL">Standard Sea LCL (22-30d)</option>
                      <option value="Full Container (FCL)">Full Container (FCL)</option>
                      <option value="Rail DDP Express">Rail DDP Express (16-22d)</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                      Gross Weight (KG):
                    </label>
                    <input
                      type="number"
                      value={weightKg}
                      onChange={(e) => setWeightKg(e.target.value)}
                      placeholder="e.g. 250"
                      className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2.5 text-xs text-slate-900 dark:text-white focus:border-blue-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                      Total Volume (CBM):
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={volumeCbm}
                      onChange={(e) => setVolumeCbm(e.target.value)}
                      placeholder="e.g. 1.8"
                      className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2.5 text-xs text-slate-900 dark:text-white focus:border-blue-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                      Your Name / Contact Person:
                    </label>
                    <input
                      type="text"
                      value={shipperName}
                      onChange={(e) => setShipperName(e.target.value)}
                      placeholder="e.g. David Zhang"
                      className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2.5 text-xs text-slate-900 dark:text-white focus:border-blue-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                      Company / Brand Name:
                    </label>
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="e.g. Apex Global Trade"
                      className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2.5 text-xs text-slate-900 dark:text-white focus:border-blue-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                      WhatsApp Number:
                    </label>
                    <input
                      type="text"
                      value={whatsappNumber}
                      onChange={(e) => setWhatsappNumber(e.target.value)}
                      placeholder="e.g. +1 555-0199"
                      className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2.5 text-xs text-slate-900 dark:text-white focus:border-blue-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                      Email Address:
                    </label>
                    <input
                      type="email"
                      value={emailAddress}
                      onChange={(e) => setEmailAddress(e.target.value)}
                      placeholder="e.g. importer@company.com"
                      className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2.5 text-xs text-slate-900 dark:text-white focus:border-blue-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Commodity Details / Amazon Warehouse Code / Notes:
                  </label>
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="e.g. Bluetooth speakers with built-in battery, UN38.3 test summary available. Destination: Amazon ONT8."
                    className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2.5 text-xs text-slate-900 dark:text-white focus:border-blue-600 focus:outline-none"
                  />
                </div>

                {/* Dispatch Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleWhatsAppSend}
                    className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white py-3 font-bold text-xs shadow-md shadow-emerald-600/20 transition-all hover:scale-[1.01]"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>Dispatch to WhatsApp Desk</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleEmailSend}
                    className="flex items-center justify-center gap-2 rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 text-white py-3 font-bold text-xs border border-slate-700 transition-all hover:scale-[1.01]"
                  >
                    <Mail className="h-4 w-4 text-blue-400" />
                    <span>Send Official Email RFQ</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
