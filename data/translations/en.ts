/**
 * English Translation Dictionary
 * Site-wide bilingual localization dictionary for JCD Forwarder
 */

export const en = {
  // Global & Brand
  brand: {
    name: "JCD Forwarder",
    fullName: "Shenzhen Jiechengda International Freight Forwarding Co., Ltd.",
    shortDesc: "China DDP Freight Forwarding & Global Logistics",
  },

  // Language Switcher
  lang: {
    label: "Language",
    en: "English",
    zh: "简体中文",
    enCode: "EN",
    zhCode: "中文",
  },

  // Top Announcement & Trust Bar
  header: {
    nvoccBadge: "Verified NVOCC License: GD20240307220907",
    nvoccLabel: "NVOCC License:",
    alibabaSupplier: "Alibaba Verified Gold Supplier",
    alibabaRating: "4.7/5.0",
    hotline: "Hotline",
    whatsappDispatch: "24/7 WhatsApp Dispatch",
  },

  // Navigation Links & Dropdowns
  nav: {
    home: "Home",
    services: "Services",
    tools: "Tools",
    routes: "Country Routes",
    origins: "Origin Hubs",
    aboutUs: "About Us",
    contact: "Contact",
    instantQuote: "Instant Quote",
    quote: "Quote",
    getQuote: "Get Instant Quote",
    exploreAllTools: "Explore All Tools →",
    viewAllRoutes: "View All 44 Routes →",
    viewAllHubs: "Explore All 7 Origin Hubs →",
    mainService: "Main Service",
    countryGuide: "Country Guide",
    cityGuide: "City Guide",
    freightAdvisory: "Freight Advisory Desk",
    freightAdvisoryDesc: "Direct advice on DDP shipping, HS customs & routing.",
    contactExperts: "Contact our experts →",
    hqCenter: "HQ Center",
    dispatchHours: "{hours}h dispatch",
    hoursDispatch: "h dispatch",
  },

  // Services Catalog
  services: {
    air: "Air freight",
    airDesc: "Fast and reliable air cargo shipping worldwide.",
    rail: "Rail freight",
    railDesc: "China-Europe railway express routes.",
    sea: "Sea freight",
    seaDesc: "Cost-effective FCL and LCL ocean shipping.",
    trucking: "Trucking freight",
    truckingDesc: "Cross-border inland haulage and cartage.",
    ddp: "DDP freight",
    ddpDesc: "Door-to-door with all duties & tax paid.",
    express: "Express Courier",
    expressDesc: "DHL, FedEx, UPS priority global dispatch.",
    reliable: "Reliable & Secure",
    reliableDesc: "100% insured cargo.",
    onTime: "On-time Delivery",
    onTimeDesc: "Punctual milestone updates.",
    support247: "24/7 Support",
    support247Desc: "Direct WeChat & WhatsApp.",
  },

  // Hero Section
  hero: {
    nvoccBadge: "Verified NVOCC License: GD20240307220907",
    alibabaBadge: "Alibaba 4.7/5 (48 Verified Reviews)",
    titlePart1: "China DDP Freight",
    titlePart2: "Forwarding & Global Logistics",
    description:
      "The authoritative Chinese freight forwarder delivering end-to-end Air DDP, Ocean FCL/LCL, China-Europe Rail Express, and Amazon FBA first-leg freight from 7 Chinese sourcing hubs to 44 global destinations.",
    launchQuote: "Launch Instant Quote Wizard",
    whatsappDispatch: "WhatsApp 24/7 Dispatch",
    completedShipments: "Completed Shipments",
    importersServed: "Importers Served",
    alibabaRating: "Alibaba Rating",
    slaResponseTime: "SLA Response Time",
    hours: "Hours",
  },

  // Live Freight Dispatch Desk (Bottom Ticker)
  ticker: {
    liveDesk: "LIVE FREIGHT DISPATCH DESK",
    trackingUpdates: "Real-time Tracking & Updates",
    airFreight: "Air Freight",
    airTag: "Fast & Reliable",
    oceanFreight: "Ocean Freight",
    oceanTag: "Cost Effective",
    railExpress: "Rail Express",
    railTag: "China–Europe",
    fbaFirstLeg: "FBA First Leg",
    fbaTag: "Amazon Ready",
    trackShipment: "Track Your Shipment",
  },

  // Footer
  footer: {
    topTitle: "Ready to Ship from China? Get Your All-In DDP Quote",
    topSubtitle:
      "Direct carrier contracts, transparent all-inclusive landed costing, FNSKU Amazon prep, and guaranteed customs release.",
    operationsDesk: "24/7 Operations Desk • Average Response ≤ 2 Hours",
    launchWizard: "Launch Quote Wizard",
    whatsappDispatch: "WhatsApp Dispatch",
    companyDesc:
      "Shenzhen Jiechengda International Freight Forwarding Co., Ltd. (深圳市捷成达国际货运代理有限公司) is a premier Chinese freight forwarding enterprise holding verified NVOCC license GD20240307220907, providing seamless door-to-door DDP logistics, Amazon FBA prep, ocean FCL/LCL consolidation, and air charters.",
    nvoccLicense: "NVOCC License:",
    alibabaVerified: "Alibaba Verified:",
    ratingReviews: "4.7 / 5.0 Rating (48 Verified Reviews)",
    trackRecord: "Track Record:",
    shipmentsWorldwide: "300,000+ Completed Shipments Worldwide",
    corporateChannels: "Official Corporate Channels",
    freightServices: "Freight Services",
    calculationSuite: "Calculation Suite",
    originHubs: "7 Chinese Origin Hubs",
    topRoutes: "Top Country Routes",
    hqOffice: "Shenzhen HQ Office",
    warehouseBase: "Shenzhen Warehouse Base:",
    warehouseDesc:
      "500 m² bonded consolidation center in Bao'an Xinhe with free 7-day storage, FNSKU labeling, and EPAL palletizing.",
    allRightsReserved: "All Rights Reserved.",
    licenseFiling: "NVOCC License Filing:",
    registeredIn: "Registered in Shenzhen, Guangdong, China.",
    customsCompliance: "Customs Compliance",
    alibabaStore: "Alibaba Store",
  },
} as const;

type DeepStringRecord<T> = {
  [K in keyof T]: T[K] extends string
    ? string
    : T[K] extends object
    ? DeepStringRecord<T[K]>
    : never;
};

export type TranslationDictionary = DeepStringRecord<typeof en>;
