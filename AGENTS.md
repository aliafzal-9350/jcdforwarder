# AGENTS.md - JCD Forwarder Next.js Engine Blueprint

## 1. Project Role & Mission
You are building the full-stack production website for JCD Forwarder (Shenzhen Jiechengda International Freight Forwarding Co., Ltd.). The platform is engineered as an authoritative programmatic logistics portal and utility hub featuring interactive 3D calculators, 43 target country route silos, origin hub guides, and multi-channel lead funnels.

---

## 2. Verified Corporate Identity & Trust Assets
- Legal Corporate Entity: Shenzhen Jiechengda International Freight Forwarding Co., Ltd. (深圳市捷成达国际货运代理有限公司)[cite: 3]
- NVOCC Government License: GD20240307220907 (Guangdong Provincial Dept. of Transportation)[cite: 3]
- Registration / Operational Age: Established April 07, 2015 (10+ years verified company existence, 15+ years industry experience)[cite: 3]
- Shenzhen HQ & Inspection Center: Building C (Entire Building), No. 40 Yuesheng 2nd Road, South Industrial Area, Xinhe Community, Fuhai Street, Bao'an District, Shenzhen, China[cite: 3]
- Facility Size: 500+ m² dedicated inspection, consolidation, and palletizing warehouse[cite: 3]
- Verified Track Record: 300,000+ Shipments | 100,000+ Importers Served | 900,000 Annual Handling Units
- Platform Trust Proof: 4.7 / 5.0 Star Rating (48+ verified Alibaba TrustPass reviews), 100.0% On-Time Dispatch Rate, <= 2-Hour response time
- Communication Channels:
  - Phone / WhatsApp Hotline: +86 137 2424 6674
  - Direct Business Email: David@JCDforwarder.com

---

## 3. Project Architecture & Directory Layout
- Framework: Next.js 15+ (App Router)
- Workspace Structure: NO `src/` directory (Root folders: `./app`, `./components`, `./data`, `./lib`, `./hooks`)
- Language: TypeScript with strict mode (No `any`, define explicit interfaces)
- Styling: Tailwind CSS + shadcn/ui components (`@/components/ui`)
- 3D Visualizer: Three.js (`@react-three/fiber`, `@react-three/drei`)
- Route Imports Alias: `@/*` maps to project root `./*`

---

## 4. Key Core Workflows & SOP Specifications
- 12-Step FCL Standard Operating Procedure: SOP Reading -> Booking & Towing -> Customs Clearance -> Ocean Transit -> Overseas Pre-Clearance -> Destination Warehouse Drayage -> Signed Delivery Note (BOL).
- 15-Step LCL Consolidation Procedure: Warehouse Receiving -> CBM/Weight Confirmation -> Stuffing -> Port Clearance -> Ocean Transit -> Devanning -> Sorting -> Local Delivery (UPS/DPD).
- China-Europe Railway Express: West Passage (Alashankou/Khorgos), Central Corridor (Erenhot), Eastern Passage (Manzhouli)[cite: 1].
- Amazon FBA Pallet Standards:
  - USA: 1.2m x 1.0m x 1.8m (GMA Grade B+, max 680.4 kg, max double stack 2.54m)[cite: 2]
  - UK: 1.2m x 1.0m x 1.7m (max 680 kg)[cite: 2]
  - EU: 1.2m x 0.8m x 1.6m (Euro Pallet EPAL, max 680 kg)[cite: 2]
- Carton Guidelines: 23 kg max standard[cite: 2], 23-45 kg requires "Team Lift" label[cite: 2], >45 kg requires "Mech Lift" label[cite: 2], max single dimension 63.5 cm[cite: 2].
- Tariff & Tax Math:
  - Customs Duty = CIF Value x HS Tariff Rate[cite: 2]
  - Import VAT = (CIF Value + Customs Duty) x 20%[cite: 2]
  - Air Freight Divisor = 6000 | Courier Divisor = 5000 | Ocean CBM = L*W*H (cm) / 1,000,000

---

## 5. Implementation Rules
1. Server-First Execution: Maximize Server Components for instant Core Web Vitals and programmatic SEO crawls.
2. Structured Data: Inject JSON-LD Schema (`LogisticsService`, `FAQPage`, `SoftwareApplication`, `BreadcrumbList`) across dynamic route pages.
3. No Placeholders: Use real transit data, verified port pairs, and actual company credentials.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
