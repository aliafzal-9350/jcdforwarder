/**
 * Authoritative Logistics FAQ Knowledge Base
 * Source: JCD Forwarder Master Blueprint Section 6 & Operational Encyclopedia
 */

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  categoryId:
    | 'amazon-fba'
    | 'customs-compliance'
    | 'incoterms'
    | 'safety-claims'
    | 'warehousing-3pl'
    | 'pricing-surcharges';
  tags: string[];
  featured?: boolean;
}

export interface FAQCategory {
  id:
    | 'amazon-fba'
    | 'customs-compliance'
    | 'incoterms'
    | 'safety-claims'
    | 'warehousing-3pl'
    | 'pricing-surcharges';
  title: string;
  description: string;
  iconName: string;
}

export const FAQ_CATEGORIES: FAQCategory[] = [
  {
    id: 'amazon-fba',
    title: 'Amazon FBA First-Leg & E-Commerce',
    description: 'CARP appointments, pallet specs, carton labeling, dock safety, and DDP fulfillment center delivery.',
    iconName: 'PackageCheck',
  },
  {
    id: 'customs-compliance',
    title: 'Customs Clearance & Compliance',
    description: 'Valuation rules, US ISF 10+2, lithium battery UN38.3/MSDS protocols, and Chinese export drawback.',
    iconName: 'ShieldAlert',
  },
  {
    id: 'incoterms',
    title: 'International Trade Terms (Incoterms 2020)',
    description: 'Clear breakdown of EXW, FOB, CIF, DDU, and DDP risk transfers and commercial responsibilities.',
    iconName: 'FileCheck',
  },
  {
    id: 'safety-claims',
    title: 'Cargo Safety, Inspection & Claims',
    description: 'AQL warehouse quality control, marine insurance protection, and CIF cargo damage claims procedures.',
    iconName: 'FileShield',
  },
  {
    id: 'warehousing-3pl',
    title: 'Overseas Warehousing & Value-Added Services',
    description: 'Container devanning, palletizing, FNSKU re-labeling, and stranded Amazon inventory extraction.',
    iconName: 'Warehouse',
  },
  {
    id: 'pricing-surcharges',
    title: 'Pricing, Density & Surcharges',
    description: 'Ocean surcharges, MBL vs HBL differences, US port density ratios, and volumetric weight divisors.',
    iconName: 'Calculator',
  },
];

export const FAQS: FAQItem[] = [
  // --- Category: Amazon FBA ---
  {
    id: 'fba-what-is-first-leg',
    categoryId: 'amazon-fba',
    question: 'What is Amazon FBA first-leg shipping (Head-haul logistics)?',
    answer:
      "Amazon FBA first-leg logistics encompasses the complete supply chain journey from your Chinese manufacturer's factory floor to the designated Amazon fulfillment center (FC) worldwide. This pipeline includes factory pickup, export customs clearance in China, international multimodal transit (Air DDP, Sea DDP, or Rail DDP), destination customs clearance, and final-mile scheduled delivery via Amazon Carrier Central (CARP) appointments or integrated parcel carriers (UPS, FedEx, DPD).",
    tags: ['Amazon FBA', 'First-Leg', 'DDP', 'SOP'],
    featured: true,
  },
  {
    id: 'fba-vs-traditional-freight',
    categoryId: 'amazon-fba',
    question: 'How does Amazon FBA first-leg shipping differ from traditional commercial freight?',
    answer:
      "Unlike traditional B2B consignees, Amazon is merely a fulfillment host and will never act as the Importer of Record (IOR), will not pay duties or VAT, and will outright refuse freight arriving without an Amazon Reference ID or pre-booked dock appointment. JCD provides complete Delivered Duty Paid (DDP) solutions: we act as the customs clearing entity, pay all tariffs upfront, prepare compliant pallets, and book strict CARP delivery windows.",
    tags: ['Amazon FBA', 'IOR', 'DDP', 'Customs'],
    featured: true,
  },
  {
    id: 'fba-dock-safety-rules',
    categoryId: 'amazon-fba',
    question: "What are Amazon's vehicle and driver dock safety requirements during delivery?",
    answer:
      'Amazon fulfillment centers enforce stringent dock safety standards: delivery vehicles must not exceed 4.2m in height and must be equipped with a functional hydraulic tailgate capable of handling pallet jacks. Drivers must wear high-visibility safety vests, steel-toed footwear, and immediately surrender vehicle ignition keys to Amazon dock staff upon backing into the bay until unloading is fully certified.',
    tags: ['Amazon FC', 'Dock Safety', 'CARP', 'Delivery'],
  },
  {
    id: 'fba-multi-po-cartons',
    categoryId: 'amazon-fba',
    question: 'Can shipments with multiple Amazon Purchase Orders (POs) share the same carton?',
    answer:
      'Standard Amazon policy mandates one PO per carton. A maximum of 5 POs is permitted inside a single master carton only if products for each PO are physically bagged, separated with rigid cardboard partitions, and individually labeled with explicit internal PO tags. To prevent warehouse receiving errors and inventory misplacement, JCD strongly advises segregating distinct POs into dedicated master cartons.',
    tags: ['Amazon PO', 'Packaging', 'Compliance'],
  },
  {
    id: 'fba-unscheduled-delivery-consequence',
    categoryId: 'amazon-fba',
    question: 'What happens if an Amazon shipment arrives at the fulfillment center without an appointment?',
    answer:
      'Amazon security will immediately reject any truck lacking a valid CARP Inbound Shipment Appointment (ISA) number and matching Bill of Lading (BOL). Non-scheduled turnaways incur significant return drayage fees and redelivery penalties. JCD automated booking specialists coordinate directly with Amazon Carrier Central to guarantee ISA appointment slots within ±30 minutes of truck arrival.',
    tags: ['CARP', 'ISA', 'Amazon Appointment', 'Penalties'],
    featured: true,
  },
  {
    id: 'fba-carton-weight-limits',
    categoryId: 'amazon-fba',
    question: 'What are the carton weight limits and required warning labels for Amazon shipments?',
    answer:
      "Amazon enforces strict carton rules: (1) Standard carton max weight is 23.0 kg (50 lbs). (2) Cartons between 23.0 kg and 45.0 kg (50-100 lbs) must bear high-visibility 'Team Lift' labels on at least two exterior sides. (3) Cartons exceeding 45.0 kg (100 lbs) require 'Mechanical Lift' (Mech Lift) warning stickers. (4) Cartons containing jewelry or watches must not exceed 18.0 kg (40 lbs). (5) No single side of a cardboard box may exceed 63.5 cm (25 inches) unless containing an oversized single-unit item.",
    tags: ['Carton Limits', 'Team Lift', 'Mech Lift', 'Packaging'],
    featured: true,
  },
  {
    id: 'fba-pallet-specs-regional',
    categoryId: 'amazon-fba',
    question: 'What are the pallet dimension and weight standards for Amazon FBA in the US, UK, and EU?',
    answer:
      'Pallet specifications vary by destination: (1) United States: 1.20m x 1.00m x 1.80m (48" x 40" x 72"), GMA Grade B+ 4-way wooden pallet, max weight 680.4 kg (1,500 lbs), max double-stack height 2.54m (100"). (2) United Kingdom: 1.20m x 1.00m x 1.70m, standard 4-way wooden pallet, max weight 680 kg. (3) European Union: 1.20m x 0.80m x 1.60m Euro Pallet (EPAL standard), max weight 680 kg. All pallets must be shrink-wrapped with clear film, have zero carton overhang exceeding 2.0 cm, and bear verified 4-sided pallet tags.',
    tags: ['Pallet Standards', 'GMA', 'EPAL', 'Amazon FBA'],
  },

  // --- Category: Customs & Compliance ---
  {
    id: 'customs-fba-valuation',
    categoryId: 'customs-compliance',
    question: 'How is customs valuation handled for Amazon FBA goods?',
    answer:
      'Customs authorities require the declared customs value to reflect the actual transaction value supported by legitimate commercial invoices and payment records. For Amazon sellers importing under their own foreign entity, customs uses the wholesale cost of goods (COGS) rather than the retail selling price. JCD assists clients in preparing compliant commercial invoices and packing lists that eliminate under-declaration audit risks while preventing excessive duty assessments.',
    tags: ['Customs Valuation', 'Commercial Invoice', 'Compliance'],
    featured: true,
  },
  {
    id: 'customs-us-isf-10-2',
    categoryId: 'customs-compliance',
    question: 'What is the US 24-Hour ISF (10+2) filing requirement and what happens if missed?',
    answer:
      "The Importer Security Filing (ISF 10+2) is mandated by US Customs and Border Protection (CBP) for ocean container shipments. Ten specific data elements from the importer and two from the carrier must be filed electronically at least 24 hours prior to the vessel loading at the Chinese port of origin. Failure to file or late filing results in a statutory civil penalty of $5,000 USD per violation, mandatory customs hold, and invasive non-intrusive container X-ray exams at the US arrival port.",
    tags: ['ISF 10+2', 'US Customs', 'CBP', 'Ocean Freight'],
    featured: true,
  },
  {
    id: 'customs-lithium-battery-shipping',
    categoryId: 'customs-compliance',
    question: 'Do products with built-in or standalone lithium batteries require special inspection and routing?',
    answer:
      'Yes. Lithium batteries are classified as Class 9 Dangerous Goods under international maritime (IMDG) and aviation (IATA DGR) regulations. All battery shipments must have a valid UN38.3 test summary report, 1.2m drop test certification, and an authentic Material Safety Data Sheet (MSDS). JCD operates dedicated battery transport pipelines: air freight departs via our Hong Kong (HKG) hub or our Weihai-Incheon maritime-air transfer bridge, while ocean shipments are booked on approved carrier hazardous goods slots.',
    tags: ['Lithium Battery', 'UN38.3', 'MSDS', 'Dangerous Goods', 'HKG'],
    featured: true,
  },
  {
    id: 'customs-export-tax-drawback',
    categoryId: 'customs-compliance',
    question: 'Can JCD assist with Chinese export tax refunds (Drawback / 退税)?',
    answer:
      'Yes. When your Chinese supplier issues a Value-Added Tax special invoice (增值税专用发票), JCD handles formal customs declaration under Customs Trade Code 0110 (General Trade). We provide the formal export declaration bill (出口货物报关单) and customs clearance verification sheet required for your factory or domestic trading firm to successfully claim Chinese export VAT tax rebates (typically 9% to 13%).',
    tags: ['Tax Drawback', 'China Export', 'VAT Refund', 'Trade Code 0110'],
  },
  {
    id: 'customs-export-docs-china',
    categoryId: 'customs-compliance',
    question: 'What documents are required for standard customs export declaration in China?',
    answer:
      'Standard Chinese export customs clearance requires: (1) Commercial Invoice (CI) detailing HS code, quantity, unit price, and total value; (2) Detailed Packing List (PL) specifying gross/net weight and carton dimensions; (3) International Sales Contract; (4) Customs Declaration Power of Attorney (报关委托书); and (5) Specific export commodity inspection certificates or licenses if shipping restricted goods, medical supplies, or chemicals.',
    tags: ['China Customs', 'Export Documentation', 'Commercial Invoice', 'Packing List'],
  },

  // --- Category: Incoterms ---
  {
    id: 'incoterms-exw-fob-cif-ddu-ddp',
    categoryId: 'incoterms',
    question: 'What is the core difference between EXW, FOB, CIF, DDU, and DDP under Incoterms 2020?',
    answer:
      'The terms define the exact point where risk and cost transfer from seller to buyer: (1) EXW (Ex Works): Seller only makes goods available at factory floor; buyer bears all freight, customs, and risk. (2) FOB (Free on Board): Seller pays domestic trucking and Chinese export customs onto the vessel; buyer pays ocean freight and destination costs. (3) CIF (Cost, Insurance & Freight): Seller pays ocean freight and marine insurance to destination port; buyer clears destination customs and pays tariffs. (4) DDU (Delivered Duty Unpaid / DAP): Seller delivers to destination door, but buyer must clear customs and pay duties. (5) DDP (Delivered Duty Paid): Seller/Forwarder handles 100% of the chain, including export, international freight, destination customs clearance, duties, taxes, and door delivery.',
    tags: ['Incoterms 2020', 'EXW', 'FOB', 'CIF', 'DDU', 'DDP'],
    featured: true,
  },
  {
    id: 'incoterms-why-ddp-for-ecommerce',
    categoryId: 'incoterms',
    question: 'Why is DDP (Delivered Duty Paid) the undisputed gold standard for cross-border e-commerce sellers?',
    answer:
      "DDP provides an all-inclusive single invoice covering freight, customs duties, port charges, and final-mile delivery. Because Amazon fulfillment centers and Shopify end-customers refuse to pay import taxes or handle clearance paperwork, DDP eliminates clearance friction, prevents cargo abandonment at border ports, and provides sellers with 100% landed cost predictability before launching marketing campaigns.",
    tags: ['DDP', 'E-Commerce', 'Landed Cost', 'Incoterms'],
  },

  // --- Category: Safety & Claims ---
  {
    id: 'safety-warehouse-inspection-services',
    categoryId: 'safety-claims',
    question: 'Does JCD provide cargo quality inspection before goods are dispatched from China?',
    answer:
      'Yes. At our 500+ m² Shenzhen headquarters inspection center, JCD offers comprehensive pre-shipment quality control services: (1) Exterior carton integrity and dimensional verification; (2) Random AQL Level II sampling for functionality, cosmetic flaws, and color accuracy; (3) Barcode readability scanning (FNSKU, UPC, EAN); (4) 100% full-piece functional testing upon request; and (5) High-resolution photo/video reporting sent directly to the importer prior to container loading.',
    tags: ['Quality Inspection', 'AQL', 'Shenzhen Warehouse', 'QC'],
  },
  {
    id: 'safety-cargo-damage-claims-process',
    categoryId: 'safety-claims',
    question: 'How are cargo loss, theft, and damage claims processed?',
    answer:
      'All JCD shipments are eligible for comprehensive all-risk Institute Cargo Clauses (A) marine and transit insurance. In the rare event of damage or loss, claims are settled promptly based on the verified CIF commercial value. The claims procedure requires: (1) Immediate notation of carton condition on the driver Proof of Delivery (POD) receipt; (2) Digital photos of damaged cartons, serial tags, and inner items taken within 48 hours; (3) Commercial invoice and packing list submission. JCD settles documented claims directly with our underwriting partners within 14 business days.',
    tags: ['Cargo Insurance', 'Claims', 'POD', 'CIF'],
    featured: true,
  },

  // --- Category: Overseas Warehousing ---
  {
    id: 'warehousing-overseas-partner-capabilities',
    categoryId: 'warehousing-3pl',
    question: 'What value-added services are provided in JCD overseas partner warehouses in the US, UK, and EU?',
    answer:
      'Through our strategic overseas bonded warehouse network in Los Angeles, Chicago, London, and Antwerp, JCD provides: (1) Ocean container devanning and sorting; (2) Short-term buffer storage and long-term 3PL inventory reserves; (3) Standard palletizing and shrink-wrapping for Amazon FBA; (4) FNSKU barcode replacement and carton relabeling; (5) Multi-channel B2B fulfillment and LTL truckload dispatch.',
    tags: ['Overseas Warehouse', '3PL', 'Devanning', 'FNSKU', 'Storage'],
  },
  {
    id: 'warehousing-stranded-inventory-rescue',
    categoryId: 'warehousing-3pl',
    question: 'How does JCD assist sellers with suspended Amazon seller accounts or stranded inventory?',
    answer:
      'When an Amazon seller account is suspended or listings become stranded, storage fees quickly turn catastrophic. JCD coordinates immediate removal orders: Amazon dispatches the inventory to our local overseas warehouse, where our team inspects the stock, removes old FNSKU tags, applies fresh barcodes for your alternative seller account or Shopify channel, and restuffs the inventory for re-injection into new fulfillment centers.',
    tags: ['Stranded Inventory', 'Account Suspension', 'Relabeling', 'Removal Order'],
  },

  // --- Category: Pricing & Surcharges ---
  {
    id: 'pricing-ocean-surcharge-breakdown',
    categoryId: 'pricing-surcharges',
    question: 'What surcharges are typical in international ocean freight shipping?',
    answer:
      'Ocean freight rates consist of the base sea freight plus standard operational surcharges: (1) Terminal Handling Charges (THC / ORC) assessed by origin and destination ports; (2) Bunker Adjustment Factor (BAF) for marine fuel price fluctuations; (3) Currency Adjustment Factor (CAF) for exchange volatility; (4) International Ship and Port Facility Security (ISPS) fee; (5) Peak Season Surcharge (PSS) during Q4 pre-holiday surges. Under JCD DDP terms, all regular surcharges are bundled into one transparent per-kg or per-CBM all-in rate.',
    tags: ['Ocean Surcharges', 'THC', 'BAF', 'ISPS', 'DDP Rates'],
  },
  {
    id: 'pricing-mbl-vs-hbl',
    categoryId: 'pricing-surcharges',
    question: 'What is the operational difference between a Master Bill of Lading (MBL) and House Bill of Lading (HBL)?',
    answer:
      'A Master Bill of Lading (MBL) is issued directly by the ocean shipping line (e.g. COSCO, Maersk, MSC) to JCD as the licensed NVOCC. The House Bill of Lading (HBL) is issued by JCD Forwarder to the actual cargo owner/importer. The HBL protects commercial supplier confidentiality by preventing your overseas buyer from discovering your direct factory source, while allowing seamless customs clearance and LCL consolidation.',
    tags: ['Bill of Lading', 'MBL', 'HBL', 'NVOCC'],
  },
  {
    id: 'pricing-us-port-density-ratios',
    categoryId: 'pricing-surcharges',
    question: 'What are the density weight-to-volume billing ratios enforced across US West Coast, East Coast, and Inland hubs?',
    answer:
      'In ocean LCL freight, carriers charge based on volume (CBM) or weight, whichever generates higher revenue. In the United States, strict regional density ratios apply: (1) US West Coast Base Ports (Los Angeles / Long Beach / Oakland): Standard ocean ratio of 1 CBM : 1,000 kg. (2) US East Coast Ports (New York / New Jersey / Savannah): Enforced density ratio of 1 CBM : 500 kg. (3) US Inland Rail Terminals (Chicago / Dallas / Atlanta): Enforced intermodal rail ratio of 1 CBM : 363 kg. If 1 CBM weighs more than the threshold, chargeable volume is calculated as Weight (kg) / Threshold.',
    tags: ['Density Ratio', 'US Ports', 'CBM Billing', 'LCL Freight'],
    featured: true,
  },
  {
    id: 'pricing-volumetric-divisors-air-express-ocean',
    categoryId: 'pricing-surcharges',
    question: 'How is chargeable volumetric weight calculated for Air Freight vs Express Courier vs Ocean LCL?',
    answer:
      'Volumetric weight calculates cargo space utilization compared to dead weight: (1) Air Freight Standard: Chargeable Weight (kg) = (Length x Width x Height in cm) / 6,000. (2) Express Courier (DHL/FedEx/UPS): Chargeable Weight (kg) = (Length x Width x Height in cm) / 5,000. (3) Ocean LCL Volume (CBM) = (Length x Width x Height in cm) / 1,000,000. In all modes, carriers bill against the greater of actual gross weight or volumetric weight.',
    tags: ['Chargeable Weight', 'Volumetric Divisor', 'Air Freight 6000', 'Courier 5000'],
    featured: true,
  },
  {
    id: 'pricing-china-europe-rail-corridors',
    categoryId: 'pricing-surcharges',
    question: 'What are the three primary trade corridors of the China-Europe Railway Express?',
    answer:
      'The China-Europe Railway Express operates via three land corridors: (1) The West Passage: Exits China via Alashankou or Khorgos in Xinjiang, crossing Kazakhstan, Russia, Belarus, and Poland (Malaszewicze) to Germany (Duisburg/Hamburg) in 16–20 days rail time. (2) The Central Corridor: Exits China via Erenhot Port in Inner Mongolia, traversing Mongolia to connect with the Trans-Siberian line. (3) The Eastern Passage: Exits through Manzhouli or Suifenhe into the Russian Far East. Rail freight costs approximately 1/6th of air freight and delivers twice as fast as ocean transit.',
    tags: ['Rail Freight', 'China-Europe Railway Express', 'Alashankou', 'Malaszewicze'],
  },
];

/**
 * Get FAQs belonging to a specific category
 */
export function getFaqsByCategory(categoryId: string): FAQItem[] {
  const normalized = categoryId.toLowerCase().trim();
  return FAQS.filter((faq) => faq.categoryId.toLowerCase() === normalized);
}

/**
 * Search FAQs by query across questions, answers, and tags
 */
export function searchFaqs(query: string): FAQItem[] {
  if (!query || query.trim().length === 0) return FAQS;
  const q = query.toLowerCase().trim();
  return FAQS.filter(
    (faq) =>
      faq.question.toLowerCase().includes(q) ||
      faq.answer.toLowerCase().includes(q) ||
      faq.tags.some((tag) => tag.toLowerCase().includes(q))
  );
}

/**
 * Get all available FAQ categories
 */
export function getAllFaqCategories(): FAQCategory[] {
  return FAQ_CATEGORIES;
}

/**
 * Get featured FAQs for homepage or route overview widgets
 */
export function getFeaturedFaqs(): FAQItem[] {
  return FAQS.filter((faq) => faq.featured);
}
