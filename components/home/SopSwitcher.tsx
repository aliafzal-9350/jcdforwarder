"use client";

import { useState } from "react";

type SopKey = "fcl" | "lcl" | "air" | "fba";

const sopData: Record<SopKey, { title: string; subtitle: string; steps: { num: string; name: string; desc: string }[] }> = {
  fcl: {
    title: "12-Step Full Container Load (FCL) Standard Operating Procedure",
    subtitle: "Dedicated 20GP, 40GP & 40HQ container drayage directly from Chinese factories.",
    steps: [
      { num: "01", name: "Carrier Space Booking", desc: "Contracted tier-1 carrier space locked 7 days prior to vessel departure." },
      { num: "02", name: "S/O & Equipment Release", desc: "EIR equipment release generated for empty container pick-up from terminal." },
      { num: "03", name: "Factory Drayage Haulage", desc: "Clean, inspected container dispatched to supplier manufacturing facility." },
      { num: "04", name: "Stuffing & Cargo Lashing", desc: "Cargo loaded under strict weight balance with heavy-duty dunnage air bags." },
      { num: "05", name: "ISO 17712 Bolt Sealing", desc: "Tamper-evident high-security bolt seal locked and recorded on manifest." },
      { num: "06", name: "Port Gate-in & SOLAS VGM", desc: "Verified Gross Mass submitted electronically via terminal weighbridge." },
      { num: "07", name: "China Customs Clearance", desc: "Single-window export declaration filed under JCD licensed broker code." },
      { num: "08", name: "Gantry Vessel Loading", desc: "Container stacked aboard scheduled liner (COSCO, Evergreen, Matson)." },
      { num: "09", name: "Master B/L & Satellite AIS", desc: "MBL issued with 24/7 real-time satellite GPS vessel tracking enabled." },
      { num: "10", name: "Pre-Arrival Customs (ISF)", desc: "Destination import clearance submitted 5 days before vessel docking." },
      { num: "11", name: "Port Discharge & Drayage", desc: "Priority terminal gate-out directly onto tri-axle chassis without demurrage." },
      { num: "12", name: "Final Dock Delivery & POD", desc: "Live-unload or drop-and-pick at buyer warehouse with signed POD." },
    ],
  },
  fba: {
    title: "Amazon FBA First-Leg Compliance & Delivery SOP",
    subtitle: "CARP EDI booking, ISA scheduling, and regional GMA / EPAL palletization.",
    steps: [
      { num: "01", name: "FNSKU & Carton Verification", desc: "Carton weight checked against ≤ 22.7 kg limit; FNSKU barcodes scanned." },
      { num: "02", name: "Shenzhen Warehouse Staging", desc: "Free 7-day consolidation and repacking in 500 m² Xinhe facility." },
      { num: "03", name: "Export Customs & Booking", desc: "Electronic export declaration and airline/vessel space confirmation." },
      { num: "04", name: "Linehaul Freight Transit", desc: "Priority express air flight or Matson ocean vessel to destination." },
      { num: "05", name: "Customs DDP Clearance", desc: "Duty and import tax settled under JCD bonded customs broker account." },
      { num: "06", name: "Deconsolidation & EPAL Prep", desc: "Pallets built to exact US GMA (48x40\") or EU EPAL (1200x800mm) specs." },
      { num: "07", name: "CARP / ISA Appointment", desc: "Delivery time-slot confirmed directly via Amazon Carrier Portal EDI." },
      { num: "08", name: "Fulfillment Center Delivery", desc: "Direct truckload delivery to ONT8, GYR3, LBA4, DTM2 with zero rejection." },
    ],
  },
  air: {
    title: "Air DDP Wheel-to-Wheel Express Flight Lifecycle",
    subtitle: "5–7 business days landed transit via Shenzhen (SZX) and Guangzhou (CAN).",
    steps: [
      { num: "01", name: "Flight Space Allocation", desc: "Fixed block-space agreement (BSA) locks upper-deck freighter pallets." },
      { num: "02", name: "Warehouse Inbound & X-Ray", desc: "Civil aviation security scan, 1:6000 volumetric verification & labeling." },
      { num: "03", name: "Export Customs Release", desc: "Single-window customs filing with immediate electronic export release." },
      { num: "04", name: "Direct Scheduled Flight", desc: "Direct freighter flight to Liege (LGG), London (LHR), or Los Angeles (LAX)." },
      { num: "05", name: "Apron Breakdown (< 6H)", desc: "Priority cargo breakdown on airport apron within 6 hours of touchdown." },
      { num: "06", name: "Fiscal Customs Clearance", desc: "Bonded customs clearance and automated import VAT/duty payment." },
      { num: "07", name: "Last-Mile Courier Handover", desc: "Direct injection into UPS, FedEx, or bonded linehaul delivery fleet." },
    ],
  },
  lcl: {
    title: "15-Step LCL Multi-Vendor Consolidation SOP",
    subtitle: "Consolidate small shipments from multiple Chinese factories into one cost-effective box.",
    steps: [
      { num: "01", name: "Warehouse Inbound Entry", desc: "Goods received at Shenzhen Xinhe warehouse with unique QR barcode tags." },
      { num: "02", name: "Laser Volumetric Scan", desc: "Precise dimensions and weight logged to verify manufacturer packing list." },
      { num: "03", name: "Consolidation Plan (CLP)", desc: "Cartons organized by destination port and customs clearance category." },
      { num: "04", name: "Container Stuffing", desc: "Heavy cartons at bottom, cargo nets and strapping to prevent sea-shift." },
      { num: "05", name: "Unified Export Customs", desc: "Consolidated customs filing under unified export manifest." },
      { num: "06", name: "Destination De-stuffing", desc: "Container opened at bonded CFS warehouse; items sorted per House B/L." },
      { num: "07", name: "Door Delivery Handover", desc: "Individual shipments dispatched to commercial addresses or Amazon FBA." },
    ],
  },
};

const TABS: { id: SopKey; label: string }[] = [
  { id: "fcl", label: "12-Step FCL Container" },
  { id: "fba", label: "Amazon FBA First-Leg" },
  { id: "air", label: "Air DDP Flight SOP" },
  { id: "lcl", label: "LCL Consolidation" },
];

export function SopSwitcher() {
  const [activeSop, setActiveSop] = useState<SopKey>("fcl");
  const panelId = `sop-panel-${activeSop}`;

  return (
    <>
      <div className="inline-flex flex-wrap rounded-xl border border-slate-300 dark:border-slate-700 p-1 bg-white dark:bg-slate-900">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSop(tab.id)}
            role="tab"
            aria-selected={activeSop === tab.id}
            aria-controls={panelId}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
              activeSop === tab.id
                ? "bg-blue-600 text-white shadow-sm"
                : "text-slate-600 dark:text-slate-300 hover:text-slate-900"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div
        id={panelId}
        role="tabpanel"
        className="mt-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-sm"
      >
        <div className="mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">{sopData[activeSop].title}</h3>
          <p className="text-xs text-slate-500 mt-1">{sopData[activeSop].subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {sopData[activeSop].steps.map((step) => (
            <div
              key={step.num}
              className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 text-xs space-y-2 hover:bg-blue-50/40 transition-colors"
            >
              <div className="text-xl font-mono font-black text-blue-600 dark:text-blue-400">{step.num}</div>
              <h4 className="font-bold text-slate-900 dark:text-white">{step.name}</h4>
              <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
