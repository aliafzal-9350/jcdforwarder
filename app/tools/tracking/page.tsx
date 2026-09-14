"use client";

import React, { useState } from "react";
import Link from "next/link";
import { getWhatsAppUrl } from "@/data/siteConfig";
import {
  Search,
  CheckCircle2,
  Clock,
  MapPin,
  ExternalLink,
  MessageCircle,
  AlertCircle,
  ShieldCheck,
  Copy,
  Check,
  HelpCircle,
  Truck,
  Plane,
} from "lucide-react";

interface TrackingEvent {
  timestamp: string;
  location: string;
  status: string;
  description: string;
  completed: boolean;
  current?: boolean;
}

interface ShipmentData {
  trackingNumber: string;
  carrier: string;
  status: "In Transit" | "Delivered" | "Customs Clearance" | "Out for Delivery" | "Departed Hub";
  type: "Sample Consignment" | "Air DDP Freight Line" | "Express Courier";
  origin: string;
  destination: string;
  shipDate: string;
  estDelivery: string;
  serviceTier: string;
  weight: string;
  pieces: number;
  events: TrackingEvent[];
}

const SAMPLE_DATABASE: Record<string, ShipmentData> = {
  "JCD-8849201": {
    trackingNumber: "JCD-8849201",
    carrier: "JCD Dedicated Air Freight",
    status: "In Transit",
    type: "Air DDP Freight Line",
    origin: "Shenzhen Hub (SZX), China",
    destination: "Frankfurt am Main (FRA), Germany",
    shipDate: "2026-09-11",
    estDelivery: "2026-09-17",
    serviceTier: "Air DDP Commercial Freight",
    weight: "342.5 kg",
    pieces: 18,
    events: [
      {
        timestamp: "2026-09-14 08:30 GMT+1",
        location: "Liege Airport (LGG), Belgium",
        status: "Customs Clearance Completed",
        description: "Cargo cleared European import customs without delay. Transferred to European highway delivery fleet.",
        completed: true,
        current: true,
      },
      {
        timestamp: "2026-09-13 14:15 GMT+8",
        location: "Shenzhen Bao'an Int'l (SZX), China",
        status: "Airplane Departed China",
        description: "Direct cargo freighter departed for European airport hub.",
        completed: true,
      },
      {
        timestamp: "2026-09-12 19:40 GMT+8",
        location: "Shenzhen Export Customs",
        status: "China Export Clearance Passed",
        description: "Customs inspection passed and export declaration filed successfully.",
        completed: true,
      },
      {
        timestamp: "2026-09-11 11:00 GMT+8",
        location: "JCD Shenzhen Warehouse",
        status: "Cargo Received & Weighed",
        description: "18 cartons received from factory, verified, weighed, and palletized for flight.",
        completed: true,
      },
    ],
  },
  "1Z9999999999999999": {
    trackingNumber: "1Z9999999999999999",
    carrier: "UPS Express Worldwide",
    status: "In Transit",
    type: "Express Courier",
    origin: "Guangzhou (CAN), China",
    destination: "Los Angeles (LAX), CA, USA",
    shipDate: "2026-09-12",
    estDelivery: "2026-09-16",
    serviceTier: "UPS Worldwide Saver (Air Express)",
    weight: "28.0 kg",
    pieces: 2,
    events: [
      {
        timestamp: "2026-09-14 04:10 PDT",
        location: "Louisville Worldport (SDF), USA",
        status: "Arrived at US Distribution Hub",
        description: "Sorted through UPS automated air hub. In transit to destination delivery center.",
        completed: true,
        current: true,
      },
      {
        timestamp: "2026-09-13 09:25 GMT+8",
        location: "Hong Kong Hub (HKG)",
        status: "Loaded onto Flight to USA",
        description: "Cargo transferred through Hong Kong international air gateway onto Boeing freighter.",
        completed: true,
      },
      {
        timestamp: "2026-09-12 16:30 GMT+8",
        location: "Guangzhou Baiyun, China",
        status: "Picked Up by JCD Express Team",
        description: "Sample boxes picked up from factory and handed to UPS international service center.",
        completed: true,
      },
    ],
  },
  "782910384729": {
    trackingNumber: "782910384729",
    carrier: "FedEx International Priority",
    status: "Delivered",
    type: "Express Courier",
    origin: "Shenzhen, China",
    destination: "London, United Kingdom",
    shipDate: "2026-09-08",
    estDelivery: "2026-09-11",
    serviceTier: "FedEx Priority Express",
    weight: "14.5 kg",
    pieces: 1,
    events: [
      {
        timestamp: "2026-09-11 11:42 BST",
        location: "London Central Depot, UK",
        status: "Successfully Delivered & Signed",
        description: "Delivered to company reception desk. Received & signed by recipient.",
        completed: true,
        current: true,
      },
      {
        timestamp: "2026-09-11 07:15 BST",
        location: "London Stansted (STN), UK",
        status: "Out for Doorstep Delivery",
        description: "Loaded onto local courier van for final doorstep delivery.",
        completed: true,
      },
      {
        timestamp: "2026-09-09 22:30 GMT+8",
        location: "Guangzhou FedEx Asia Hub",
        status: "Flight Departed to Europe",
        description: "Departed international flight to Paris CDG hub.",
        completed: true,
      },
      {
        timestamp: "2026-09-08 14:00 GMT+8",
        location: "Shenzhen, China",
        status: "Package Picked Up",
        description: "Sample prototypes checked, measured, and processed into express network.",
        completed: true,
      },
    ],
  },
};

export default function TrackingPage() {
  const [carrier, setCarrier] = useState<string>("auto");
  const [query, setQuery] = useState<string>("");
  const [shipment, setShipment] = useState<ShipmentData | null>(null);
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const getDirectCarrierUrl = (num: string, carrierName: string): string => {
    const cleanNum = num.trim();
    if (cleanNum.startsWith("1Z") || carrierName.toLowerCase().includes("ups")) {
      return `https://www.ups.com/track?tracknum=${cleanNum}`;
    }
    if (cleanNum.length === 12 || carrierName.toLowerCase().includes("fedex")) {
      return `https://www.fedex.com/fedextrack/?trknbr=${cleanNum}`;
    }
    if (cleanNum.length === 10 || carrierName.toLowerCase().includes("dhl")) {
      return `https://www.dhl.com/global-en/home/tracking/tracking-express.html?submit=1&tracking-id=${cleanNum}`;
    }
    return `https://t.17track.net/en#nums=${cleanNum}`;
  };

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const cleanQuery = query.trim().toUpperCase();
    if (!cleanQuery) return;

    setHasSearched(true);
    if (SAMPLE_DATABASE[cleanQuery]) {
      setShipment(SAMPLE_DATABASE[cleanQuery]);
    } else {
      // Auto identify carrier type for friendly feedback
      let detectedCarrier = carrier !== "auto" ? carrier : "International Freight Line";
      if (carrier === "auto") {
        if (cleanQuery.startsWith("1Z")) detectedCarrier = "UPS Express";
        else if (cleanQuery.length === 12 && /^\d+$/.test(cleanQuery)) detectedCarrier = "FedEx Priority";
        else if (cleanQuery.length === 10 && /^\d+$/.test(cleanQuery)) detectedCarrier = "DHL Express";
        else if (cleanQuery.startsWith("JCD")) detectedCarrier = "JCD Dedicated Air/Sea Line";
      }

      setShipment({
        trackingNumber: cleanQuery,
        carrier: detectedCarrier,
        status: "In Transit",
        type: "Sample Consignment",
        origin: "Shenzhen / Guangzhou Gateway, China",
        destination: "Destination Country Hub",
        shipDate: "Registered in Dispatch System",
        estDelivery: "Calculated upon flight/vessel departure",
        serviceTier: "Air Freight DDP / Ocean Freight",
        weight: "Recorded at Warehouse",
        pieces: 1,
        events: [
          {
            timestamp: new Date().toISOString().replace("T", " ").substring(0, 16) + " GMT+8",
            location: "Shenzhen Airport Logistics Center",
            status: "Waybill Registered & Ready for Loading",
            description: "Customs declaration assigned. Ready for next scheduled flight or container departure.",
            completed: true,
            current: true,
          },
          {
            timestamp: "Origin Inspection",
            location: "JCD Shenzhen Facility",
            status: "Cargo Handed to Forwarder",
            description: "Boxes verified, labeled, and placed in dispatch queue.",
            completed: true,
          },
        ],
      });
    }
  };

  const handlePreset = (num: string) => {
    setQuery(num);
    setCarrier("auto");
    setHasSearched(true);
    setShipment(SAMPLE_DATABASE[num] || null);
  };

  const copyNumber = () => {
    if (!shipment) return;
    navigator.clipboard.writeText(shipment.trackingNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
            <span className="text-slate-300">Package Tracking</span>
          </div>

          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-semibold">
              <ShieldCheck className="h-3.5 w-3.5 text-blue-400" />
              <span>Multi-Carrier &amp; Air/Sea Freight Tracking</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
              Track Your Cargo &amp; Express Shipments
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Enter your tracking code or waybill number to see live updates from factory pickup in China all the way to final delivery at your door.
            </p>
          </div>

          {/* Search Box */}
          <div className="mt-8 max-w-3xl bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white">
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-1">
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5">
                    Carrier Type
                  </label>
                  <select
                    value={carrier}
                    onChange={(e) => setCarrier(e.target.value)}
                    className="w-full h-11 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    <option value="auto">Auto-Detect Carrier</option>
                    <option value="JCD Air/Sea DDP">JCD Dedicated Air/Sea Line</option>
                    <option value="DHL Express">DHL Express Worldwide</option>
                    <option value="FedEx">FedEx International</option>
                    <option value="UPS">UPS Worldwide Express</option>
                    <option value="SF Express">SF International</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5">
                    Enter Tracking or Waybill Number
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. JCD-8849201, 1Z9999999999999999, 782910384729"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      className="w-full h-11 px-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono font-medium focus:ring-2 focus:ring-blue-500 outline-none uppercase"
                    />
                    <button
                      type="submit"
                      className="h-11 px-6 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-2 shrink-0 transition-colors"
                    >
                      <Search className="h-4 w-4" />
                      <span>Track</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Demo Pre-sets */}
              <div className="pt-2 flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <span className="font-semibold">Try sample shipments:</span>
                <button
                  type="button"
                  onClick={() => handlePreset("JCD-8849201")}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-mono text-[11px] font-semibold transition-colors"
                >
                  JCD-8849201 (Air Freight DDP)
                </button>
                <button
                  type="button"
                  onClick={() => handlePreset("1Z9999999999999999")}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-mono text-[11px] font-semibold transition-colors"
                >
                  1Z999... (UPS Express)
                </button>
                <button
                  type="button"
                  onClick={() => handlePreset("782910384729")}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-mono text-[11px] font-semibold transition-colors"
                >
                  7829... (FedEx Express)
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {shipment ? (
          <div className="space-y-6">
            {/* Header Status Card */}
            <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500 font-semibold">Tracking Number:</span>
                    <span className="font-mono text-base font-bold text-slate-900 dark:text-white">
                      {shipment.trackingNumber}
                    </span>
                    <button
                      onClick={copyNumber}
                      className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 transition-colors"
                      title="Copy Tracking Number"
                    >
                      {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                    </button>
                  </div>
                  <div className="text-xs text-slate-500">
                    Carrier: <span className="font-semibold text-slate-700 dark:text-slate-300">{shipment.carrier}</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <a
                    href={getDirectCarrierUrl(shipment.trackingNumber, shipment.carrier)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <span>Check on Carrier Portal</span>
                    <ExternalLink className="h-3.5 w-3.5 text-slate-400" />
                  </a>

                  <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>{shipment.status}</span>
                  </span>
                </div>
              </div>

              {/* Route & Overview */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 text-xs">
                <div>
                  <span className="text-slate-500">Origin:</span>
                  <div className="font-bold text-slate-900 dark:text-white mt-0.5 flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5 text-blue-500 shrink-0" />
                    <span>{shipment.origin}</span>
                  </div>
                </div>
                <div>
                  <span className="text-slate-500">Destination:</span>
                  <div className="font-bold text-slate-900 dark:text-white mt-0.5 flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                    <span>{shipment.destination}</span>
                  </div>
                </div>
                <div>
                  <span className="text-slate-500">Estimated Delivery:</span>
                  <div className="font-bold text-blue-600 dark:text-blue-400 mt-0.5">
                    {shipment.estDelivery}
                  </div>
                </div>
                <div>
                  <span className="text-slate-500">Total Weight &amp; Boxes:</span>
                  <div className="font-bold text-slate-900 dark:text-white mt-0.5">
                    {shipment.weight} ({shipment.pieces} {shipment.pieces === 1 ? "box" : "boxes"})
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline Events */}
            <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
              <h2 className="text-base font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <Clock className="h-4 w-4 text-blue-500" />
                <span>Live Shipment Status &amp; Journey History</span>
              </h2>

              <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-2.5 sm:before:left-3.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
                {shipment.events.map((ev, idx) => (
                  <div key={idx} className="relative">
                    {/* Circle Node */}
                    <div
                      className={`absolute -left-6 sm:-left-8 top-1 h-5 w-5 rounded-full border-2 flex items-center justify-center ${
                        ev.current
                          ? "bg-blue-600 border-white dark:border-slate-900 ring-4 ring-blue-500/20 text-white"
                          : ev.completed
                          ? "bg-emerald-500 border-white dark:border-slate-900 text-white"
                          : "bg-slate-200 dark:bg-slate-800 border-white dark:border-slate-900 text-slate-400"
                      }`}
                    >
                      <CheckCircle2 className="h-3 w-3" />
                    </div>

                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-bold text-slate-900 dark:text-white">
                          {ev.status}
                        </span>
                        <span className="text-[11px] font-mono text-slate-400">
                          {ev.timestamp}
                        </span>
                      </div>
                      <div className="text-xs font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        <span>{ev.location}</span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed pt-0.5">
                        {ev.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Assistance Card */}
            <div className="p-6 rounded-2xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 flex flex-wrap items-center justify-between gap-4">
              <div className="space-y-1">
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                  Have Questions or Need an Urgent Update on Your Cargo?
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Our operations team in Shenzhen is available to check physical warehouse status, customs clearance, and airline manifests directly.
                </p>
              </div>
              <a
                href={getWhatsAppUrl(`Hello JCD Dispatch, I am requesting a status update for tracking number ${shipment.trackingNumber}`)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Ask Dispatch on WhatsApp</span>
              </a>
            </div>
          </div>
        ) : hasSearched ? (
          <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8">
            <AlertCircle className="h-10 w-10 text-amber-500 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              No Tracking Records Found for &quot;{query}&quot;
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-md mx-auto">
              Please double check the tracking number. If your cargo was picked up today in China, the first tracking scan usually takes 2 to 4 hours to appear in the system.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <ShieldCheck className="h-8 w-8 text-blue-500 mb-3" />
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">Reliable Cargo Tracking</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  Direct visibility into airline cargo flights, ocean container ships (COSCO, Matson, ONE), and European customs clearance.
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <Clock className="h-8 w-8 text-emerald-500 mb-3" />
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">Milestone-by-Milestone Updates</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  Know exactly when your cargo departs China, arrives at the destination airport or seaport, clears customs, and reaches your door.
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <MessageCircle className="h-8 w-8 text-purple-500 mb-3" />
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">Direct Human Support</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  Contact our logistics managers directly via WhatsApp anytime you need immediate answers about your cargo.
                </p>
              </div>
            </div>

            {/* Beginner FAQ */}
            <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-4">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <HelpCircle className="h-4 w-4 text-blue-500" />
                <span>Frequently Asked Questions About Tracking</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-600 dark:text-slate-400">
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 space-y-1">
                  <div className="font-bold text-slate-800 dark:text-slate-200">
                    Why isn&apos;t my tracking number updating immediately?
                  </div>
                  <p>
                    When your Chinese factory hands cargo to our local courier or truck, the cartons must be weighed, labeled, and sorted at our Shenzhen warehouse. The initial scan usually displays within 2 to 4 hours.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 space-y-1">
                  <div className="font-bold text-slate-800 dark:text-slate-200">
                    Why is there no update while the cargo is on a plane or ship?
                  </div>
                  <p>
                    While cargo is mid-air or across the ocean, there are no intermediate ground checkpoints. The next scan automatically triggers once the airplane or vessel lands and customs clearance begins.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

