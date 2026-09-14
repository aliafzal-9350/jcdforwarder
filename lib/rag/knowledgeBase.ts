/**
 * JCD Forwarder RAG Knowledge Base
 * Authoritative, chunked logistics information index for customer query retrieval.
 */

import { TARGET_ROUTES } from '@/data/routes';
import { ORIGIN_HUBS } from '@/data/origins';
import { SITE_CONFIG } from '@/data/siteConfig';

export interface KnowledgeChunk {
  id: string;
  category: 'company' | 'service' | 'country' | 'origin' | 'incoterm' | 'calculation' | 'compliance' | 'faq';
  title: string;
  keywords: string[];
  content: string;
  suggestedAction?: {
    type: 'quote' | 'whatsapp' | 'tracking' | 'tool';
    label: string;
    payload?: Record<string, string>;
  };
}

// Core Company & Operational Credentials
const COMPANY_CHUNKS: KnowledgeChunk[] = [
  {
    id: 'company-overview',
    category: 'company',
    title: 'JCD Forwarder Corporate Identity & Legal Credentials',
    keywords: ['company', 'who are you', 'license', 'nvocc', 'address', 'location', 'shenzhen', 'alibaba', 'phone', 'whatsapp', 'email', 'contact', 'david', 'reputation'],
    content: `Shenzhen Jiechengda International Freight Forwarding Co., Ltd. (JCD Forwarder) is an official Class-A freight forwarder and licensed NVOCC (Non-Vessel Operating Common Carrier, Ministry of Transport License: GD20240307220907).
• Headquarters: Building C (Entire Building), No. 40 Yuesheng 2nd Rd, South Industrial Area, Xinhe Community, Fuhai Street, Bao'an District, Shenzhen, Guangdong, China (518103).
• 24/7 Dispatch Hotline & WhatsApp: +86 137 2424 6674
• Official Quotation Desk: David@JCDforwarder.com
• Verified Alibaba Store: https://jiechengda.en.alibaba.com/ (Verified Gold Supplier with 4.7/5.0 rating across 48+ audited reviews and 100% on-time dispatch record).
• Track Record: Over 300,000 completed shipments across 44 global destinations, 7 domestic consolidation warehouses, and 10+ years operational history.`,
    suggestedAction: {
      type: 'whatsapp',
      label: 'Chat on WhatsApp with David (+86 137 2424 6674)'
    }
  },
  {
    id: 'free-consolidation-service',
    category: 'service',
    title: 'Free 7-Day Multi-Supplier Warehouse Consolidation in Shenzhen',
    keywords: ['consolidation', 'multi supplier', 'free warehouse', 'storage', 'combine cartons', 'repackaging', 'inspection', 'labeling', 'factory pickup'],
    content: `JCD Forwarder provides 7 days of complimentary warehousing and multi-factory consolidation at our 10,000+ sqm central facility in Bao'an, Shenzhen:
• Importers can order goods from multiple Chinese suppliers (e.g. Shenzhen electronics, Yiwu accessories, Ningbo hardware, Guangzhou apparel) and ship them to our facility.
• Services included: Free receiving, barcode scanning, external carton damage inspection, photo verification, unboxing, repacking into unified master cartons, palletizing (EPAL / GMA standards), and custom export labeling / Amazon FNSKU stickering.
• Benefit: Merging 5 smaller shipments into a single FCL container or consolidated air pallet saves between 30% and 55% in international freight and destination port clearance charges.`,
    suggestedAction: {
      type: 'quote',
      label: 'Get Consolidation Freight Quote'
    }
  }
];

// Core 6 Shipping Services
const SERVICE_CHUNKS: KnowledgeChunk[] = [
  {
    id: 'service-air-freight',
    category: 'service',
    title: 'Air Freight & Pure Battery Express Lines',
    keywords: ['air freight', 'plane', 'flight', 'urgent', 'battery', 'pure battery', 'power bank', 'un38.3', 'fast', 'transit time', 'air cargo'],
    content: `Air Cargo Transportation via JCD Forwarder:
• Transit Timeline: 3–7 business days airport-to-airport; 6–10 days door-to-door with customs clearance.
• Gateway Airports: Shenzhen Bao'an (SZX), Guangzhou Baiyun (CAN), Shanghai Pudong (PVG), Hong Kong (HKG).
• Capacity: Direct Blocked Space Agreements (BSAs) with Cathay Pacific, China Southern, Lufthansa, Qatar Airways, Emirates SkyCargo.
• Pure Battery & Dangerous Goods (DG): Licensed handling for pure lithium batteries (UN3480 / UN3481), power banks, and electric mobility devices via our specialized Hong Kong and Shenzhen DG transfer channels with full UN38.3 test report and MSDS audit.
• Chargeable Weight: Higher of Gross Weight (kg) or Volumetric Weight (L x W x H in cm / 6000). Express air uses 1:5000 divisor.`,
    suggestedAction: {
      type: 'quote',
      label: 'Request Air Freight Quote',
      payload: { mode: 'Air Freight' }
    }
  },
  {
    id: 'service-sea-freight',
    category: 'service',
    title: 'Ocean Freight: FCL (Full Container Load) & LCL (Less Than Container Load)',
    keywords: ['sea freight', 'ocean freight', 'fcl', 'lcl', 'container', '20gp', '40gp', '40hq', 'cbm', 'matson', 'cosco', 'maersk', 'shipping line'],
    content: `Ocean Freight Services via JCD Forwarder:
• FCL (Full Container Load): Dedicated 20ft (28–33 CBM, 28,000 kg payload), 40ft Standard (58–67 CBM, 26,500 kg payload), and 40ft High Cube (68–76 CBM, 26,500 kg payload). Direct carrier service contracts with COSCO, Maersk, MSC, ONE, CMA CGM, and Matson CLX Express (11-day Pacific transit to Long Beach).
• LCL (Less Than Container Load): Consolidated CFS shipping for shipments starting from 1 CBM. Weekly scheduled consolidations from Shenzhen, Ningbo, Shanghai, and Guangzhou.
• Chargeable Rule: FCL per container flat ocean freight; LCL per CBM (Volume) or Revenue Ton (1 CBM = 1,000 kg).
• Ocean Transit Times: US West Coast 11–18 days; US East Coast 25–35 days; Europe (Rotterdam/Hamburg) 26–34 days; Middle East (Jebel Ali) 14–20 days; Australia (Sydney/Melbourne) 12–18 days.`,
    suggestedAction: {
      type: 'quote',
      label: 'Request Sea Freight FCL/LCL Quote',
      payload: { mode: 'Sea Freight' }
    }
  },
  {
    id: 'service-rail-freight',
    category: 'service',
    title: 'China-Europe Rail Express (CR Express)',
    keywords: ['rail freight', 'train', 'china europe rail', 'yixinou', 'cr express', 'duisburg', 'hamburg', 'poland', 'malaszewicze', 'green logistics'],
    content: `China-Europe Railway Freight (CR Express):
• Transit Timeline: 14–22 days terminal-to-terminal between China and European hubs. Approximately twice as fast as ocean freight at 50–60% lower cost than air cargo.
• Key Corridors:
  1. Yixinou (Yiwu–Madrid): Passes through Kazakhstan, Russia, Belarus, Poland (Małaszewicze), Germany (Duisburg/Hamburg), France to Spain.
  2. Chang'an (Xi'an–Duisburg): High-frequency daily block trains.
  3. Chengdu–Łódź Express: Central corridor.
• Rail Equipment: Standard 40ft High Cube containers. GPS tracking and temperature-monitored reefers available.
• Environmental: Produces 75% less CO2 emissions compared to long-haul air freight.`,
    suggestedAction: {
      type: 'quote',
      label: 'Request Rail Freight Quote',
      payload: { mode: 'Rail Freight' }
    }
  },
  {
    id: 'service-ddp-shipping',
    category: 'service',
    title: 'DDP (Delivered Duty Paid) Door-to-Door Shipping',
    keywords: ['ddp', 'delivered duty paid', 'door to door', 'customs clearance', 'duties paid', 'taxes included', 'all in rate', 'amazon fba', 'hassle free'],
    content: `DDP (Delivered Duty Paid) Door-to-Door Logistics:
• Definition: JCD Forwarder handles the complete end-to-end supply chain. The quoted landed price covers China factory pickup, export customs declaration, international linehaul (Air, Sea, Rail, or Truck), destination customs clearance, import tariffs/duties/taxes, and final mile delivery by truck or courier (UPS/FedEx/local drayage) directly to your commercial warehouse, residence, or Amazon FBA center.
• Buyer Experience: Zero customs paperwork for the importer. No need for a foreign importer bond or VAT number in the destination country in most standard DDP programs.
• Landed Cost Guarantee: No surprise demurrage, port storage, or destination terminal handling charges (THC).`,
    suggestedAction: {
      type: 'quote',
      label: 'Get DDP Door-to-Door Quote',
      payload: { mode: 'DDP Shipping' }
    }
  },
  {
    id: 'service-trucking-freight',
    category: 'service',
    title: 'Domestic Cartage, Drayage & Cross-Border TIR Trucking',
    keywords: ['trucking', 'cartage', 'drayage', 'bonded truck', 'tir', 'inland transport', 'factory pickup', 'hong kong trucking'],
    content: `JCD Road Transportation & Cartage Network:
• Domestic China Drayage: Fleet of over 120 contracted GPS-monitored container chassis and curtain-side box trucks connecting factory clusters in Guangdong (Pearl River Delta), Zhejiang (Yiwu, Ningbo, Hangzhou), and Jiangsu to local ports.
• Hong Kong Cross-Border Trucking: Daily bonded shuttles between Shenzhen and HKG Airport for expedited battery cargo and international airline connections.
• China-Europe TIR Road Transport: Direct overland 12–16 day trucking across Central Asia to European destinations under international TIR customs carnet.`,
    suggestedAction: {
      type: 'quote',
      label: 'Request Trucking Logistics Quote',
      payload: { mode: 'Trucking Freight' }
    }
  },
  {
    id: 'service-express-courier',
    category: 'service',
    title: 'Express Courier Service (DHL, FedEx, UPS Wholesale Partner)',
    keywords: ['express', 'courier', 'dhl', 'fedex', 'ups', 'samples', 'urgent', 'documents', 'small parcel', 'door to door express'],
    content: `Tier-1 Wholesale Express Courier Services:
• Partners: Official contracted partner accounts with DHL Express, FedEx International Priority, and UPS Worldwide Saver/Expedited.
• Transit Times: 2–4 business days worldwide.
• Ideal For: Factory prototypes, golden production samples, legal documents, high-value small electronics, and emergency replacement parts under 100 kg.
• Pricing Advantage: JCD wholesale bulk contractual rates offer up to 40–60% savings compared to standard retail walk-in counter rates.`,
    suggestedAction: {
      type: 'quote',
      label: 'Request Express Courier Quote',
      payload: { mode: 'Express Courier' }
    }
  }
];

// Logistics Formulas & Container Specifications
const LOGISTICS_SPECS_CHUNKS: KnowledgeChunk[] = [
  {
    id: 'calc-volumetric-weight',
    category: 'calculation',
    title: 'Volumetric Weight & Chargeable Weight Calculation Rules',
    keywords: ['volumetric weight', 'dimensional weight', 'chargeable weight', 'cbm formula', 'how to calculate weight', '1:6000', '1:5000', 'formula'],
    content: `International Volumetric & Chargeable Weight Formulas:
1. Air Freight Standard (IATA):
   • Volumetric Weight (kg) = (Length cm × Width cm × Height cm) / 6000
   • Or: Volume (CBM) × 167 kg
2. Express Courier (DHL / FedEx / UPS):
   • Volumetric Weight (kg) = (Length cm × Width cm × Height cm) / 5000
   • Or: Volume (CBM) × 200 kg
3. Ocean LCL Freight:
   • Density Ratio: 1 CBM = 1,000 kg (1 Ton)
   • Ocean freight is charged on whichever is greater: Total CBM or Total Weight in metric tons (Revenue Ton).
4. Chargeable Weight Principle:
   • Airlines and carriers charge on the MAX of [Actual Gross Weight] vs [Volumetric Weight].
   • Example: A carton of 60 x 50 x 40 cm weighing 15 kg has volumetric weight of (60×50×40)/6000 = 20 kg. Chargeable weight is 20 kg.`,
    suggestedAction: {
      type: 'tool',
      label: 'Open Volumetric Weight Calculator'
    }
  },
  {
    id: 'container-loading-specs',
    category: 'calculation',
    title: 'Standard Shipping Container Dimensions, CBM & Payload Capacities',
    keywords: ['container size', '20ft', '40ft', '40hq', 'container cbm', 'container dimensions', 'max weight container', 'how many cartons'],
    content: `Standard Ocean Container Specifications:
1. 20ft General Purpose (20GP):
   • Internal Dimensions: 5.89m (L) × 2.35m (W) × 2.39m (H) (19'4" × 7'8" × 7'10")
   • Practical Usable Volume: 28 – 33 CBM (Theoretical: 33.2 CBM)
   • Max Cargo Weight: ~28,000 kg (Subject to destination highway gross vehicle limits)
   • Standard Pallet Capacity: 10 standard pallets (1.2m × 1.0m) or 11 Euro pallets (1.2m × 0.8m)
2. 40ft General Purpose (40GP):
   • Internal Dimensions: 12.03m (L) × 2.35m (W) × 2.39m (H) (39'5" × 7'8" × 7'10")
   • Practical Usable Volume: 58 – 67 CBM (Theoretical: 67.7 CBM)
   • Max Cargo Weight: ~26,500 kg
   • Standard Pallet Capacity: 20–21 standard pallets or 23–24 Euro pallets
3. 40ft High Cube (40HQ / 40HC):
   • Internal Dimensions: 12.03m (L) × 2.35m (W) × 2.69m (H) (39'5" × 7'8" × 8'10")
   • Practical Usable Volume: 68 – 76 CBM (Theoretical: 76.4 CBM)
   • Max Cargo Weight: ~26,500 kg
   • Most cost-effective container for light to medium density volume cargo.`,
    suggestedAction: {
      type: 'tool',
      label: 'Open Container Loading Calculator'
    }
  },
  {
    id: 'incoterms-2020-guide',
    category: 'incoterm',
    title: 'Incoterms 2020 Comparison (EXW vs FOB vs CIF vs DDP)',
    keywords: ['incoterms', 'exw', 'fob', 'cif', 'ddp', 'dap', 'who pays shipping', 'customs responsibility', 'risk transfer'],
    content: `Key Incoterms 2020 Explained for China Sourcing:
• EXW (Ex Works): Buyer assumes 100% responsibility and cost from the factory floor in China, including domestic pickup, export customs, freight, and insurance.
• FOB (Free On Board): Chinese supplier pays for domestic trucking, port fees, and export customs clearance up to the ship's rail. Buyer takes over ocean/air linehaul, destination clearance, and final delivery. (Recommended when you want control over international freight).
• CIF (Cost, Insurance & Freight): Supplier pays ocean freight and basic maritime insurance to destination port. Buyer handles destination port fees (THC), customs clearance, duties, and inland delivery. (Warning: Suppliers often use low CIF rates with exorbitant hidden destination kickback fees).
• DAP (Delivered At Place): Seller/forwarder transports goods to buyer's door, but buyer is responsible for import customs clearance, duties, and local taxes.
• DDP (Delivered Duty Paid): The most comprehensive term. JCD Forwarder handles factory pickup, export customs, ocean/air linehaul, destination customs clearance, payment of all import tariffs/duties, and final delivery to buyer's door or Amazon FBA warehouse.`,
    suggestedAction: {
      type: 'tool',
      label: 'Compare All 11 Incoterms 2020'
    }
  }
];

// China Origin Hubs
const ORIGIN_CHUNKS: KnowledgeChunk[] = ORIGIN_HUBS.map((hub) => {
  const primaryAirport = hub.airports?.[0];
  const primarySeaport = hub.seaports?.[0];
  return {
    id: `origin-${hub.id}`,
    category: 'origin' as const,
    title: `China Sourcing Origin: ${hub.name} (${hub.chineseName}) Freight Hub`,
    keywords: [
      hub.name.toLowerCase(),
      hub.chineseName,
      'factory pickup',
      'warehouse',
      'port',
      primaryAirport ? primaryAirport.code.toLowerCase() : '',
      primarySeaport ? primarySeaport.code.toLowerCase() : '',
      'origin',
      'supplier'
    ].filter(Boolean),
    content: `Export Operations from ${hub.name} (${hub.chineseName}), ${hub.province}:
• Specialization & Product Focus: ${(hub.manufacturingIndustries || []).join(', ')}.
• Major Terminals: Seaport ${primarySeaport ? `${primarySeaport.name} (${primarySeaport.code})` : 'Regional Port'} | Airport ${primaryAirport ? `${primaryAirport.name} (${primaryAirport.code})` : 'Regional Airport'}.
• Local Consolidation Facility: ${hub.facilityAddress || 'JCD Warehouse Network'}.
• Factory Pickup Coverage: ${(hub.pickup?.coveredDistrictsAndCities || []).join(', ')}.
• JCD Operations: Daily supplier pickups, barcode scanning, pallet consolidation, and direct export customs declarations.`,
    suggestedAction: {
      type: 'quote',
      label: `Request Freight Quote from ${hub.name}`,
      payload: { origin: hub.name }
    }
  };
});

// Country Routes (Top key destinations + generator for all)
const COUNTRY_CHUNKS: KnowledgeChunk[] = TARGET_ROUTES.map((route) => ({
  id: `country-${route.code.toLowerCase()}`,
  category: 'country' as const,
  title: `Shipping from China to ${route.name} (${route.code}): Customs & Transit Guide`,
  keywords: [route.name.toLowerCase(), route.code.toLowerCase(), 'transit time', 'customs', 'duty', 'vat', 'shipping to ' + route.name.toLowerCase(), 'fba', 'ports'],
  content: `Shipping from China to ${route.name} (${route.flag}):
• Region: ${route.region} | Currency: ${route.currency}
• Transit Times:
  - Express Courier: 2–4 business days
  - Standard Air Cargo: 3–7 days (DDP Air: 6–10 days)
  - Ocean Freight: ${route.portPairs?.[0]?.transitDays || '18–35 days'} (Port-to-Port); DDP Sea: 22–38 days door-to-door.
• Customs & Tax Framework:
  - Customs Authority: ${route.customsAuthority}
  - De Minimis Threshold: ${route.deMinimisThreshold}
  - Duty Calculation: ${route.dutyFormula}
  - Standard VAT / GST: ${route.vatGstRate}
• Key Seaports: ${route.mainSeaports.join(', ')}
• Key International Airports: ${route.mainAirports.join(', ')}
• Compliance Highlights: ${route.customsRequirements.slice(0, 3).join('; ')}
• Amazon FBA Fulfillment: Supported with full FNSKU labeling, GMA Grade B+ / EPAL palletization, and CARP / ISA appointment scheduling.`,
  suggestedAction: {
    type: 'quote',
    label: `Get Instant Quote for China to ${route.name}`,
    payload: { destination: route.name }
  }
}));

// Common FAQs
const FAQ_CHUNKS: KnowledgeChunk[] = [
  {
    id: 'faq-quote-requirements',
    category: 'faq',
    title: 'What information is needed to get an exact freight quotation?',
    keywords: ['how to get quote', 'quote requirements', 'information needed', 'rate inquiry', 'price quote', 'cost'],
    content: `To provide a guaranteed, binding freight quotation without hidden fees, please share:
1. Origin: Factory city in China (or pickup supplier address).
2. Destination: City, postal/zip code, and country (or Amazon FBA warehouse code e.g. ONT8, DTM2).
3. Cargo Details: Commodity description, HS code (if known), total gross weight (kg), and package dimensions (L x W x H in cm) with carton count.
4. Incoterm: EXW (factory pickup required) or FOB (supplier delivers to China port).
5. Preferred Transport Mode: Air Express (3–7 days), Sea DDP (20–35 days), Rail (16–22 days), or Ocean FCL container.`,
    suggestedAction: {
      type: 'quote',
      label: 'Launch Instant Quote Wizard'
    }
  },
  {
    id: 'faq-tracking-shipment',
    category: 'faq',
    title: 'How to track a live shipment with JCD Forwarder?',
    keywords: ['tracking', 'track shipment', 'where is my cargo', 'bol', 'waybill', 'container tracking'],
    content: `Tracking Your Shipment:
• Real-Time Courier Tracking: For express air parcels (DHL, FedEx, UPS) and JCD internal linehaul, enter your tracking number on our Courier Tracking tool (/tools/tracking).
• Test Waybills for Demo: You can test the tracking system using 'JCD-8849201', '1Z9999999999999999', or '782910384729'.
• Dedicated Freight Dispatcher: For sea FCL/LCL or air cargo shipments, our dispatch desk provides milestone email alerts and WhatsApp updates upon Vessel Departure, Customs Clearance, Container Discharge, and Out for Delivery.`,
    suggestedAction: {
      type: 'tracking',
      label: 'Open Shipment Tracking Tool'
    }
  },
  {
    id: 'faq-dangerous-goods-batteries',
    category: 'faq',
    title: 'Can JCD Forwarder ship lithium batteries, liquids, or brand products?',
    keywords: ['battery', 'pure battery', 'power bank', 'liquids', 'dg', 'dangerous goods', 'un38.3', 'msds'],
    content: `Dangerous Goods & Sensitive Cargo Capabilities:
• Lithium Batteries: We operate certified pure battery and built-in battery air lines via Hong Kong and Shenzhen DG channels. Requires UN38.3 test report and MSDS (Material Safety Data Sheet).
• Cosmetics & Liquids: Non-hazardous cosmetics, powders, and liquids can be shipped via specialized dedicated DG air freight channels.
• Branded / Trademarked Goods: Requires official trademark owner authorization letter for customs export compliance.`,
    suggestedAction: {
      type: 'whatsapp',
      label: 'Consult DG Battery Specialist on WhatsApp'
    }
  }
];

// Unified Knowledge Base
export const ALL_KNOWLEDGE_CHUNKS: KnowledgeChunk[] = [
  ...COMPANY_CHUNKS,
  ...SERVICE_CHUNKS,
  ...LOGISTICS_SPECS_CHUNKS,
  ...ORIGIN_CHUNKS,
  ...COUNTRY_CHUNKS,
  ...FAQ_CHUNKS
];
