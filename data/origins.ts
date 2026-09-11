/**
 * Chinese Origin Hubs & Local Logistics Capabilities
 * Source: JCD Forwarder Master Blueprint Section 2, Section 7.2 & Operational Credentials
 */

export interface SeaportDetail {
  name: string;
  code: string; // UN/LOCODE, e.g. "CNYTN", "CNSKU"
  type: 'Deep-Water Ocean Container' | 'River Feeder' | 'Express Container Terminal' | 'Bulk & Breakbulk';
  berthDepthM?: number;
  features: string[];
}

export interface AirportDetail {
  name: string;
  code: string; // IATA code, e.g. "SZX", "HKG", "CAN"
  features: string[];
  batteryCargoApproved: boolean;
}

export interface RailTerminalDetail {
  name: string;
  corridor: string; // "West Passage (Alashankou/Khorgos)" | "Central Corridor (Erenhot)" | "Eastern Passage (Manzhouli)"
  destinations: string[];
  transitDaysToEurope: string;
}

export interface LocalPickupCapability {
  radiusKm: number;
  coveredDistrictsAndCities: string[];
  averageDispatchHours: number; // e.g., 2-4 hours
  fleetTypes: string[];
  consolidationServices: string[];
}

export interface OriginHub {
  id: string; // 'shenzhen', 'guangzhou', 'yiwu', 'ningbo', 'shanghai', 'qingdao', 'tianjin'
  slug: string; // 'shipping-from-shenzhen', etc.
  name: string; // "Shenzhen"
  chineseName: string; // "深圳"
  pinyin: string;
  province: string;
  role: string;
  isHeadquarters: boolean;
  facilityAddress?: string;
  warehouseAreaSqM?: number;
  coordinates: {
    lat: number;
    lng: number;
  };
  overview: string;
  seaports: SeaportDetail[];
  airports: AirportDetail[];
  railConnections: RailTerminalDetail[];
  pickup: LocalPickupCapability;
  manufacturingIndustries: string[];
  operationalAdvantages: string[];
  bestTradeLanes: string[];
}

export const ORIGIN_HUBS: OriginHub[] = [
  {
    id: 'shenzhen',
    slug: 'shipping-from-shenzhen',
    name: 'Shenzhen',
    chineseName: '深圳',
    pinyin: 'Shēnzhèn',
    province: 'Guangdong',
    role: 'Global Corporate HQ, Central Inspection Facility & Battery Air Gateway',
    isHeadquarters: true,
    facilityAddress: "Building C (Entire Building), No. 40 Yuesheng 2nd Road, South Industrial Area, Xinhe Community, Fuhai Street, Bao'an District, Shenzhen, China",
    warehouseAreaSqM: 500,
    coordinates: {
      lat: 22.6823,
      lng: 113.8219,
    },
    overview:
      "As JCD Forwarder's operational headquarters and flagship logistics base, Shenzhen houses our 500+ m² dedicated inspection, devanning, and palletizing warehouse. Positioned minutes from Bao'an International Airport and Hong Kong border crossings, Shenzhen serves as the premier global gateway for high-tech electronics, UN38.3 lithium battery cargo, and express Amazon FBA consolidation.",
    seaports: [
      {
        name: 'Yantian International Container Terminals (YICT)',
        code: 'CNYTN',
        type: 'Deep-Water Ocean Container',
        berthDepthM: 17.4,
        features: [
          'Premier ocean alliance call port for direct US West Coast & European routes',
          'Accommodates 24,000+ TEU mega container vessels',
          'Fast gate-in with direct highway connectivity',
        ],
      },
      {
        name: 'Shekou Container Terminals (SCT)',
        code: 'CNSKU',
        type: 'Deep-Water Ocean Container',
        berthDepthM: 16.0,
        features: [
          'Key gateway for Southeast Asia, Middle East, and Mediterranean lanes',
          'Integrated customs bonded warehouse zone',
        ],
      },
      {
        name: 'Dachan Bay Terminals',
        code: 'CNDCB',
        type: 'Express Container Terminal',
        berthDepthM: 15.5,
        features: [
          'Dedicated Matson & express e-commerce ocean vessel berths',
          'Rapid customs inspection and direct container drayage',
        ],
      },
      {
        name: 'Chiwan Container Terminal',
        code: 'CNCWN',
        type: 'Deep-Water Ocean Container',
        berthDepthM: 15.0,
        features: ['Specialized feeder connections across the Pearl River basin'],
      },
    ],
    airports: [
      {
        name: "Shenzhen Bao'an International Airport",
        code: 'SZX',
        features: [
          'Comprehensive global cargo freighter network',
          'Direct scheduled flights to North America and Europe',
          'Express bonded logistics center adjacent to JCD HQ',
        ],
        batteryCargoApproved: true,
      },
      {
        name: 'Hong Kong International Airport (via Bonded Trucking)',
        code: 'HKG',
        features: [
          'World #1 air cargo hub with unrestricted battery transport capacity',
          'Daily bonded cross-border shuttles through Shenzhen Bay & Huanggang',
          'Full compliance with IATA DGR, UN38.3, and MSDS dangerous goods protocols',
        ],
        batteryCargoApproved: true,
      },
    ],
    railConnections: [
      {
        name: 'Shenzhen Pinghunan Multimodal Rail Terminal',
        corridor: 'West Passage (Alashankou/Khorgos)',
        destinations: ['Malaszewicze (PL)', 'Duisburg (DE)', 'Hamburg (DE)', 'Budapest (HU)'],
        transitDaysToEurope: '16–20 Days Rail Run',
      },
    ],
    pickup: {
      radiusKm: 150,
      coveredDistrictsAndCities: [
        "Shenzhen (Bao'an, Longgang, Nanshan, Futian, Longhua, Pingshan)",
        'Dongguan (Humen, Chang\'an, Dalingshan, Tangxia, Fenggang)',
        'Huizhou (Huiyang, Zhongkai High-Tech Zone)',
        'Zhongshan (Guzhen Lighting, Xiaolan Hardware)',
        'Zhuhai & Foshan (Shunde Appliances)',
      ],
      averageDispatchHours: 2,
      fleetTypes: ['5-Ton Box Trucks', '8-Ton Curtainside Trucks', '40ft Container Chassis', 'Hydraulic Tailgate Vans'],
      consolidationServices: [
        'Free 7-day warehouse storage',
        '100% individual carton piece inspection',
        'FNSKU barcode re-labeling & carton replacement',
        'Amazon standard GMA & EPAL palletizing with 4-way stretch wrap',
      ],
    },
    manufacturingIndustries: [
      'Smartphones, tablets & consumer electronics',
      'Lithium battery power banks & energy storage systems',
      'LED lighting & intelligent display panels',
      'Drones, robotic cleaners & smart IoT hardware',
      'Precision telecommunication equipment',
    ],
    operationalAdvantages: [
      'Direct company-owned 500m² inspection and consolidation facility',
      '4.7/5.0 Alibaba TrustPass rating with 48+ audited reviews',
      'Licensed NVOCC carrier status (GD20240307220907)',
      'Direct cross-border pure battery export channel via Hong Kong (HKG)',
      'Sub-2-hour operational dispatch across the Pearl River Delta',
    ],
    bestTradeLanes: [
      'China to USA Air DDP (7-10 Days Battery / 8-12 Days General)',
      'China to USA Ocean Matson Express (12-14 Days Sea Voyage)',
      'China to Europe Air DDP via Liege (8-12 Days)',
      'China to UK Air DDP via London Heathrow (5-7 Days)',
    ],
  },
  {
    id: 'guangzhou',
    slug: 'shipping-from-guangzhou',
    name: 'Guangzhou',
    chineseName: '广州',
    pinyin: 'Guǎngzhōu',
    province: 'Guangdong',
    role: 'Southern China Manufacturing & Cross-Border E-Commerce Hub',
    isHeadquarters: false,
    coordinates: {
      lat: 23.1291,
      lng: 113.2644,
    },
    overview:
      "Guangzhou is the historic commercial core of southern China and host city of the world-famous Canton Fair. Operating directly out of Port of Nansha and Guangzhou Baiyun International Airport (CAN), JCD offers rapid air charters and full ocean consolidation for fast fashion, consumer goods, and automotive parts manufactured across the Pearl River Delta.",
    seaports: [
      {
        name: 'Port of Nansha Container Terminal',
        code: 'CNNSA',
        type: 'Deep-Water Ocean Container',
        berthDepthM: 16.5,
        features: [
          'Automated mega-terminal with direct highway and rail connections',
          'Fast customs clearance zone for cross-border e-commerce',
          'Direct trunk lines to Europe, Mediterranean, and North America',
        ],
      },
      {
        name: 'Port of Huangpu',
        code: 'CNHUA',
        type: 'River Feeder',
        berthDepthM: 12.5,
        features: ['Ideal for inner-Guangdong river barge consolidation and machinery stuffing'],
      },
    ],
    airports: [
      {
        name: 'Guangzhou Baiyun International Airport',
        code: 'CAN',
        features: [
          "China's premier southern air freighter gateway",
          'Direct widebody cargo flights to London (LHR), Los Angeles (LAX), Frankfurt (FRA)',
          '5–7 Day door-to-door transit timelines for high-priority commercial shipments',
        ],
        batteryCargoApproved: true,
      },
    ],
    railConnections: [
      {
        name: 'Guangzhou Dalang Railway Freight Yard',
        corridor: 'West Passage (Alashankou/Khorgos)',
        destinations: ['Poland (Malaszewicze)', 'Germany (Duisburg)', 'Russia (Moscow)'],
        transitDaysToEurope: '18–22 Days Rail Run',
      },
    ],
    pickup: {
      radiusKm: 120,
      coveredDistrictsAndCities: [
        'Guangzhou (Baiyun, Panyu, Huadu, Huangpu, Zengcheng)',
        'Foshan (Nanhai, Shunde Furniture & Appliances)',
        'Jiangmen & Zhaoqing industrial parks',
      ],
      averageDispatchHours: 3,
      fleetTypes: ['Box Trucks with Tailgate', '20ft/40ft Drayage Trucks'],
      consolidationServices: [
        'Multi-supplier collection across Canton Fair manufacturing belts',
        'Apparel inspection & hanger packaging',
        'Custom carton palletizing',
      ],
    },
    manufacturingIndustries: [
      'Apparel, fast fashion & garment accessories (SHEIN supply belt)',
      'Leather goods, handbags & footwear',
      'Automotive spare parts & tuning accessories',
      'Beauty cosmetics & salon equipment',
      'Commercial lighting & building materials',
    ],
    operationalAdvantages: [
      'Direct freighter flights out of CAN airport reducing transit times by 2-3 days',
      'Cost-efficient Nansha ocean departures for full container loads (FCL)',
      'Deep integration with local fashion and consumer electronics supply chains',
    ],
    bestTradeLanes: [
      'Guangzhou to UK Air DDP via CAN (5-7 Business Days)',
      'Guangzhou to USA Air DDP Direct Freighter (8-10 Days)',
      'Nansha to Europe Ocean DDP (30-35 Days Sea Voyage)',
    ],
  },
  {
    id: 'yiwu',
    slug: 'shipping-from-yiwu',
    name: 'Yiwu',
    chineseName: '义乌',
    pinyin: 'Yìwū',
    province: 'Zhejiang',
    role: 'World Small Commodities Capital & China-Europe Rail Express Departure Hub',
    isHeadquarters: false,
    coordinates: {
      lat: 29.3069,
      lng: 120.0745,
    },
    overview:
      "Recognized by the UN as the world's largest wholesale market for small consumer goods, Yiwu is also the starting point of the historic 'Yixinou' (Yiwu-Madrid) China-Europe Railway Express. JCD provides high-efficiency LCL consolidation, mixed-SKU stuffing, and rail/sea multimodal bridges connecting Yiwu's 75,000+ market booths directly with overseas fulfillment centers.",
    seaports: [
      {
        name: 'Yiwu Inland Port / Ningbo Feeder Port',
        code: 'CNYIW',
        type: 'River Feeder',
        features: [
          'Direct sea-rail intermodal container shuttle to Ningbo-Zhoushan Port (2 hours)',
          'Local customs clearance with direct vessel loading at Ningbo Beilun',
        ],
      },
    ],
    airports: [
      {
        name: 'Yiwu Airport / Hangzhou Xiaoshan International (HGH)',
        code: 'HGH',
        features: [
          'High-volume dedicated e-commerce freighters to Liege (LGG) and Brussels (BRU)',
          'Cost-effective European air DDP solutions for Amazon sellers',
        ],
        batteryCargoApproved: false,
      },
    ],
    railConnections: [
      {
        name: 'Yiwu West Railway Station (Yixinou Express)',
        corridor: 'West Passage (Alashankou/Khorgos)',
        destinations: [
          'Madrid (Spain)',
          'Duisburg (Germany)',
          'Malaszewicze (Poland)',
          'Prague (Czech Republic)',
          'Budapest (Hungary)',
        ],
        transitDaysToEurope: '16–20 Days Rail Run',
      },
    ],
    pickup: {
      radiusKm: 80,
      coveredDistrictsAndCities: [
        'Yiwu International Trade City (Districts 1, 2, 3, 4, 5)',
        'Huangyuan Market & Chouzhou Commercial Zone',
        'Jinhua, Yongkang (Hardware Capital), Dongyang, Pujiang',
      ],
      averageDispatchHours: 2,
      fleetTypes: ['Box Trucks', 'LCL Consolidation Vans', '40HQ Container Trailers'],
      consolidationServices: [
        'Multi-supplier mixed SKU consolidation from hundreds of market booths',
        'Precise carton CBM measurement and barcode tagging',
        'Pallet shrink-wrapping and export documentation filing',
      ],
    },
    manufacturingIndustries: [
      'Small commodities, novelty items & promotional gifts',
      'Toys, games & hobby merchandise',
      'Fashion jewelry, hair accessories & cosmetics tools',
      'Stationery, office supplies & school bags',
      'Hardware tools, locks & kitchen utensils',
    ],
    operationalAdvantages: [
      'Origin of China-Europe Rail Express offering 1/6th air cost and 2x ocean speed',
      'Unmatched LCL consolidation capability for multi-vendor market purchases',
      'Direct customs pre-clearance inside Yiwu Bonded Logistics Center (B-Type)',
    ],
    bestTradeLanes: [
      'Yiwu to Europe Rail DDP (16-20 Days Rail / 45-50 Days Door-to-Door)',
      'Yiwu to USA Ocean LCL Consolidation via Ningbo (25-30 Days Door-to-Door)',
      'Yiwu to UK Rail & Ocean DDP for Amazon FBA',
    ],
  },
  {
    id: 'ningbo',
    slug: 'shipping-from-ningbo',
    name: 'Ningbo',
    chineseName: '宁波',
    pinyin: 'Níngbō',
    province: 'Zhejiang',
    role: 'World Top Cargo Tonnage Seaport & Eastern China Heavy Industrial Export Gateway',
    isHeadquarters: false,
    coordinates: {
      lat: 29.8683,
      lng: 121.5440,
    },
    overview:
      "Ningbo-Zhoushan Port ranks #1 in the world by total cargo throughput for 15 consecutive years. As our premier ocean export gateway in Eastern China, Ningbo provides unparalleled deep-water container capacity, direct liner loops to North America and Europe, and optimal logistics for heavy home appliances, power tools, and industrial plastics.",
    seaports: [
      {
        name: 'Ningbo-Zhoushan Port (Beilun & Chuanshan Terminals)',
        code: 'CNNGB',
        type: 'Deep-Water Ocean Container',
        berthDepthM: 18.2,
        features: [
          'World #1 port by cargo tonnage with 260+ international container routes',
          'Exceptional natural deep water accommodating 24,000+ TEU mega-vessels year-round',
          'Meishan Bonded Port Area specialized for auto parts and smart manufacturing',
        ],
      },
    ],
    airports: [
      {
        name: 'Ningbo Lishe International Airport / Shanghai PVG Transfer',
        code: 'NGB',
        features: [
          'Regional air freight connection with 2-hour bonded truck transfer to Shanghai Pudong (PVG)',
        ],
        batteryCargoApproved: false,
      },
    ],
    railConnections: [
      {
        name: 'Ningbo Beilun Sea-Rail Intermodal Center',
        corridor: 'Central & West Passages',
        destinations: ['Central Asian Republics', 'Eastern Europe', 'Duisburg (DE)'],
        transitDaysToEurope: '18–22 Days Rail Run',
      },
    ],
    pickup: {
      radiusKm: 150,
      coveredDistrictsAndCities: [
        'Ningbo (Beilun, Zhenhai, Yinzhou, Yuyao, Cixi Appliance Base)',
        'Shaoxing (Keqiao Textile City, Shangyu)',
        'Taizhou (Huangyan Plastic Mold Center, Wenling Pumps)',
        'Zhoushan Maritime Free Trade Zone',
      ],
      averageDispatchHours: 3,
      fleetTypes: ['Heavy Container Trailers', '40HQ Chassis Trucks', 'Flatbed Machinery Carriers'],
      consolidationServices: [
        'Factory container drayage & live loading',
        'Export palletizing & heavy machinery securing',
        'Customs export declaration & tax refund documentation',
      ],
    },
    manufacturingIndustries: [
      'Small home appliances (air fryers, blenders, heaters from Cixi)',
      'Plastic injection molds & consumer plasticware',
      'Outdoor power tools, garden equipment & pumps',
      'Textiles, embroidered fabrics & activewear',
      'Plumbing fixtures, sanitary valves & bathroom accessories',
    ],
    operationalAdvantages: [
      'Most competitive ocean container freight rates to US West Coast and Rotterdam',
      'Deepest ocean container berths with zero tide restrictions',
      'Direct rail shuttle connectivity from Yiwu and interior manufacturing belts',
    ],
    bestTradeLanes: [
      'Ningbo to USA Ocean DDP (25-30 Days Door-to-Door)',
      'Ningbo to Europe Ocean DDP via Antwerp / Rotterdam (28-32 Days Sea Voyage)',
      'Ningbo to UK Ocean DDP via Felixstowe (24-28 Days Sea Voyage)',
    ],
  },
  {
    id: 'shanghai',
    slug: 'shipping-from-shanghai',
    name: 'Shanghai',
    chineseName: '上海',
    pinyin: 'Shànghǎi',
    province: 'Shanghai Municipality',
    role: 'Yangtze River Delta Commercial Engine & World #1 Container Port',
    isHeadquarters: false,
    coordinates: {
      lat: 31.2304,
      lng: 121.4737,
    },
    overview:
      "Shanghai stands as the world's busiest container port and China's premier international air cargo hub. Anchored by the automated Yangshan Deep-Water Port and Pudong International Airport (PVG), JCD provides comprehensive multimodal consolidation for high-tech precision instruments, medical equipment, and automotive electronics from across the Yangtze River Delta.",
    seaports: [
      {
        name: 'Yangshan Deep-Water Port (SGH / YAS)',
        code: 'CNSGH',
        type: 'Deep-Water Ocean Container',
        berthDepthM: 17.5,
        features: [
          'World largest automated container terminal connected via 32.5km Donghai Bridge',
          'Premier departure point for trans-Pacific and trans-Atlantic container alliance loops',
          'Handles 25+ million TEUs annually with 24/7 automated crane operations',
        ],
      },
      {
        name: 'Waigaoqiao Free Trade Port Area',
        code: 'CNWGQ',
        type: 'River Feeder',
        berthDepthM: 14.2,
        features: [
          'Main river-mouth terminal for Yangtze River domestic barge feeder networks',
          'Extensive bonded warehouse parks and customs distribution centers',
        ],
      },
    ],
    airports: [
      {
        name: 'Shanghai Pudong International Airport',
        code: 'PVG',
        features: [
          "China's #1 air cargo gateway handling over 3.5 million tons annually",
          'Direct dedicated freighter flights to all major logistics gateways (LAX, ORD, JFK, FRA, AMS, LHR)',
          'Specialized cool-chain and temperature-controlled pharma logistics hubs',
        ],
        batteryCargoApproved: true,
      },
      {
        name: 'Shanghai Hongqiao International Airport',
        code: 'SHA',
        features: ['Fast domestic logistics and high-speed rail cargo transfers'],
        batteryCargoApproved: false,
      },
    ],
    railConnections: [
      {
        name: 'Shanghai Minhang Railway Freight Terminal',
        corridor: 'West Passage (Alashankou/Khorgos)',
        destinations: ['Almaty (Kazakhstan)', 'Malaszewicze (Poland)', 'Hamburg (Germany)'],
        transitDaysToEurope: '18–22 Days Rail Run',
      },
    ],
    pickup: {
      radiusKm: 150,
      coveredDistrictsAndCities: [
        'Shanghai (Pudong, Jiading, Songjiang, Minhang, Baoshan)',
        'Suzhou (SIP, Kunshan Electronics Park, Taicang, Changshu)',
        'Wuxi, Changzhou, Nantong, Jiaxing, Huzhou',
      ],
      averageDispatchHours: 3,
      fleetTypes: ['Box Trucks', 'Air-Ride Suspension Trucks', '40HQ Container Drayage Trucks'],
      consolidationServices: [
        'Cleanroom palletizing for precision electronics & optics',
        'Bonded consolidation inside Waigaoqiao & Yangshan Free Trade Zones',
        'Customs ATA Carnet & high-value equipment declaration',
      ],
    },
    manufacturingIndustries: [
      'Semiconductors, integrated circuits & precision machinery',
      'Medical equipment, surgical tools & diagnostics devices',
      'EV automotive parts, batteries & powertrain sensors',
      'Solar inverters, optical components & industrial automation',
      'Chemical reagents & high-end consumer luxury goods',
    ],
    operationalAdvantages: [
      'Unmatched air freighter frequency connecting every continent directly out of PVG',
      'Deep ocean alliance schedule integrity with direct berthing priority',
      'Seamless connectivity to the entire Yangtze River Delta industrial heartland',
    ],
    bestTradeLanes: [
      'Shanghai to USA Air DDP via PVG-LAX/ORD (8-10 Days Door-to-Door)',
      'Shanghai to Europe Air DDP via PVG-FRA/AMS (7-11 Days Door-to-Door)',
      'Yangshan to USA West Coast Ocean Fast Boat (13-16 Days Sea Voyage)',
    ],
  },
  {
    id: 'qingdao',
    slug: 'shipping-from-qingdao',
    name: 'Qingdao',
    chineseName: '青岛',
    pinyin: 'Qīngdǎo',
    province: 'Shandong',
    role: 'Northern China Maritime Capital & Yellow River Basin Logistics Gateway',
    isHeadquarters: false,
    coordinates: {
      lat: 36.0671,
      lng: 120.3826,
    },
    overview:
      "Qingdao is the premier maritime shipping hub in Northern China and the primary gateway for the industrial powerhouse of Shandong province. With deep-water facilities at Qianwan Terminal and our innovative Weihai-South Korea maritime-air transfer bridge, JCD provides fast ocean departures and specialized air channels for tires, chemicals, solar panels, and battery cargo.",
    seaports: [
      {
        name: 'Port of Qingdao (Qianwan Container Terminal & Dongjiakou)',
        code: 'CNTAO',
        type: 'Deep-Water Ocean Container',
        berthDepthM: 18.0,
        features: [
          "Asia's first fully automated container terminal with record-breaking crane productivity",
          'Deep-water berths capable of handling the largest container ships and bulk ore carriers',
          'Direct trans-Pacific ocean loops with fastest transit times to US West Coast (14-16 days)',
        ],
      },
    ],
    airports: [
      {
        name: 'Qingdao Jiaodong International Airport',
        code: 'TAO',
        features: [
          'Modern 4F international airport with dedicated freighters to East Asia, Europe, and America',
          'Specialized reefer and live seafood cold-chain customs facilities',
        ],
        batteryCargoApproved: false,
      },
      {
        name: 'Weihai-Incheon Sea-Air Maritime Bridge (Korea Transfer)',
        code: 'ICN',
        features: [
          'High-speed Ro-Ro ferry crossing from nearby Weihai to Incheon Port (South Korea)',
          'Direct air cargo connection at Incheon Airport (ICN) to UK (LHR) and US (LAX)',
          'Authorized high-speed battery & electronic freight channel (8-10 days door-to-door)',
        ],
        batteryCargoApproved: true,
      },
    ],
    railConnections: [
      {
        name: 'Qingdao Multimodal Container Logistics Center (SCO Demonstration Zone)',
        corridor: 'Central & Eastern Passages',
        destinations: ['Central Asia', 'Moscow (Russia)', 'Minsk (Belarus)', 'Hamburg (Germany)'],
        transitDaysToEurope: '16–20 Days Rail Run',
      },
    ],
    pickup: {
      radiusKm: 200,
      coveredDistrictsAndCities: [
        'Qingdao (Jiaonan, Huangdao, Jimo, Pingdu)',
        'Weifang (Machinery), Zibo (Ceramics & Chemicals), Dongying',
        'Yantai & Weihai (Electronics, Marine Equipment, Battery Products)',
        'Linyi (Wholesale Logistics Center) & Jinan Industrial Belt',
      ],
      averageDispatchHours: 4,
      fleetTypes: ['Heavy Container Drayage Trucks', 'Reefer Trucks', 'Flatbed Equipment Trailers'],
      consolidationServices: [
        'Heavy industrial cargo lashing and wooden crate fumigation',
        'Reefer container plug-in and temperature logging',
        'Specialized chemical export documentation and MSDS compliance review',
      ],
    },
    manufacturingIndustries: [
      'Automotive tires, rubber tracks & conveyor belts',
      'Ceramic tiles, sanitary porcelain & stone slabs',
      'Wood furniture, mattresses & home decor',
      'Solar PV modules & solar mounting racks',
      'Chemicals, fertilizers, plastics & food machinery',
    ],
    operationalAdvantages: [
      'Proprietary Weihai-Incheon sea-air transfer bridge for safe, fast battery exports',
      'Unmatched ocean freight handling capacity for heavy weight industrial containers',
      'Direct rail connections to Central Asia and Eastern Europe through the SCO Demonstration Area',
    ],
    bestTradeLanes: [
      'Qingdao to USA Ocean DDP via Long Beach / Oakland (25-30 Days Door-to-Door)',
      'Weihai-Incheon to UK Air DDP for Battery Cargo (8-10 Days Door-to-Door)',
      'Qingdao to Europe Ocean DDP via Rotterdam (28-33 Days Sea Voyage)',
    ],
  },
  {
    id: 'tianjin',
    slug: 'shipping-from-tianjin',
    name: 'Tianjin',
    chineseName: '天津',
    pinyin: 'Tiānjīn',
    province: 'Tianjin Municipality',
    role: 'Bohai Rim International Shipping Hub & Northern China Industrial Gateway',
    isHeadquarters: false,
    coordinates: {
      lat: 39.0842,
      lng: 117.2009,
    },
    overview:
      "Port of Tianjin is the largest comprehensive maritime port in Northern China and the primary sea gateway for Beijing and the surrounding Bohai Rim megalopolis. Operating as the departure point for the China-Europe Central Rail Corridor via Erenhot, Tianjin excels in heavy equipment, steel exports, solar panels, and intermodal transport.",
    seaports: [
      {
        name: 'Port of Tianjin (Pacific International & Xingang)',
        code: 'CNTSN',
        type: 'Deep-Water Ocean Container',
        berthDepthM: 16.5,
        features: [
          'Largest artificial deep-water harbor in the world serving 180+ countries',
          'Zero-carbon automated container terminal powered by green energy',
          'Specialized berths for heavy machinery, steel products, and Out-of-Gauge (OOG) flat-racks',
        ],
      },
    ],
    airports: [
      {
        name: 'Tianjin Binhai International Airport',
        code: 'TSN',
        features: [
          'Designated air cargo hub of Northern China with extensive freighter ramp capacity',
          'Fast feeder connections to Beijing Capital (PEK) and Beijing Daxing (PKX) cargo zones',
        ],
        batteryCargoApproved: false,
      },
    ],
    railConnections: [
      {
        name: 'Tianjin Port Sea-Rail Intermodal Transport Center',
        corridor: 'Corridor 2: The Central Corridor (via Erenhot)',
        destinations: ['Ulaanbaatar (Mongolia)', 'Moscow (Russia)', 'Minsk (Belarus)', 'Duisburg (DE)'],
        transitDaysToEurope: '16–20 Days Rail Run',
      },
    ],
    pickup: {
      radiusKm: 200,
      coveredDistrictsAndCities: [
        'Tianjin (Binhai New Area, Wuqing, Beichen, Jizhou)',
        'Beijing (Daxing, Yizhuang High-Tech Park, Shunyi)',
        'Hebei Province (Baoding Solar Belt, Tangshan Steel, Shijiazhuang, Cangzhou Pipes)',
      ],
      averageDispatchHours: 4,
      fleetTypes: ['Heavy Lowboy Trailers', 'OOG Flatbed Trucks', '40HQ Container Carriers'],
      consolidationServices: [
        'Out-of-Gauge (OOG) flat-rack & open-top container lashing and seaworthy securing',
        'Steel coil cradle lashing and heavy cargo weight distribution calculation',
        'Consolidated export customs clearance for Beijing-Tianjin-Hebei manufacturing zones',
      ],
    },
    manufacturingIndustries: [
      'Steel pipes, structural beams & metal wire meshes',
      'Heavy industrial machinery, cranes & agricultural equipment',
      'Solar panels, silicon wafers & renewable energy structures',
      'Bicycles, electric scooters & lithium e-bikes',
      'Automotive parts, glass & precision casting components',
    ],
    operationalAdvantages: [
      'Premier departure port for heavy weight, oversized, and project breakbulk cargo',
      'Direct Central Rail Corridor to Europe and Russia through Erenhot border port',
      'Deep integration with the Beijing-Tianjin-Hebei coordinated industrial development zone',
    ],
    bestTradeLanes: [
      'Tianjin to Europe Rail DDP via Erenhot (18-22 Days Rail / 45-50 Days Door-to-Door)',
      'Tianjin to USA Ocean DDP for Heavy Cargo & Metals (28-33 Days Door-to-Door)',
      'Tianjin to Middle East & Southeast Asia Ocean FCL',
    ],
  },
];

/**
 * Get origin hub by unique ID (e.g. 'shenzhen', 'guangzhou')
 */
export function getOriginById(id: string): OriginHub | undefined {
  const normalized = id.toLowerCase().trim();
  return ORIGIN_HUBS.find((h) => h.id.toLowerCase() === normalized);
}

/**
 * Get origin hub by URL slug (e.g. 'shipping-from-shenzhen')
 */
export function getOriginBySlug(slug: string): OriginHub | undefined {
  const normalized = slug.toLowerCase().trim();
  return ORIGIN_HUBS.find((h) => h.slug.toLowerCase() === normalized);
}

/**
 * Get all available origin slugs for static generation
 */
export function getAllOriginSlugs(): string[] {
  return ORIGIN_HUBS.map((h) => h.slug);
}
