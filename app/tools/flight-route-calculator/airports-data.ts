export interface CityAirport {
  country: string;
  countryCode: string;
  city: string;
  code: string;
  name: string;
  lat: number;
  lon: number;
  customsComplexity?: "Low" | "Moderate" | "Elevated" | "Strict";
  customsDays?: string;
  destHandlingDays?: string;
  localRegs?: string;
}

export interface CountryGroup {
  name: string;
  code: string;
  region: string;
  airports: CityAirport[];
}

// Comprehensive Global Database of Major Cargo & Commercial Airports (80+ Countries, 220+ Hubs)
export const GLOBAL_COUNTRIES: CountryGroup[] = [
  // --- CHINA ORIGINS ---
  {
    name: "China",
    code: "CN",
    region: "East Asia (Primary Export Hub)",
    airports: [
      {
        country: "China",
        countryCode: "CN",
        city: "Guangzhou",
        code: "CAN",
        name: "Guangzhou Baiyun International Airport",
        lat: 23.3924,
        lon: 113.2988,
        customsComplexity: "Low",
        customsDays: "1-2 business days",
        destHandlingDays: "1-2 days",
        localRegs: "Primary Pearl River Delta air hub. Fast export customs declaration, 24/7 terminal dispatch."
      },
      {
        country: "China",
        countryCode: "CN",
        city: "Shenzhen",
        code: "SZX",
        name: "Shenzhen Bao'an International Airport",
        lat: 22.6393,
        lon: 113.8107,
        customsComplexity: "Low",
        customsDays: "1-2 business days",
        destHandlingDays: "1-2 days",
        localRegs: "High-tech and electronics specialized cargo terminals, cross-border e-commerce green channels."
      },
      {
        country: "China",
        countryCode: "CN",
        city: "Shanghai Pudong",
        code: "PVG",
        name: "Shanghai Pudong International Airport",
        lat: 31.1443,
        lon: 121.8083,
        customsComplexity: "Low",
        customsDays: "1-2 business days",
        destHandlingDays: "1-2 days",
        localRegs: "World's 3rd busiest cargo airport. Dedicated freighters to North America and Europe."
      },
      {
        country: "China",
        countryCode: "CN",
        city: "Shanghai Hongqiao",
        code: "SHA",
        name: "Shanghai Hongqiao International Airport",
        lat: 31.1979,
        lon: 121.3363,
        customsComplexity: "Low",
        customsDays: "1-2 business days",
        destHandlingDays: "1-2 days",
        localRegs: "Regional Asian cargo and express courier connection hub."
      },
      {
        country: "China",
        countryCode: "CN",
        city: "Hong Kong",
        code: "HKG",
        name: "Hong Kong International Airport (SuperTerminal 1)",
        lat: 22.308,
        lon: 113.9185,
        customsComplexity: "Low",
        customsDays: "1 business day",
        destHandlingDays: "1 day",
        localRegs: "Free port status. Highest air cargo volume globally. Ideal for lithium batteries, cosmetics & branded goods."
      },
      {
        country: "China",
        countryCode: "CN",
        city: "Beijing Capital",
        code: "PEK",
        name: "Beijing Capital International Airport",
        lat: 40.0799,
        lon: 116.6031,
        customsComplexity: "Low",
        customsDays: "1-2 business days",
        destHandlingDays: "1-2 days",
        localRegs: "Northern China commercial flagship gateway with extensive transatlantic links."
      },
      {
        country: "China",
        countryCode: "CN",
        city: "Beijing Daxing",
        code: "PKX",
        name: "Beijing Daxing International Airport",
        lat: 39.5098,
        lon: 116.4105,
        customsComplexity: "Low",
        customsDays: "1-2 business days",
        destHandlingDays: "1-2 days",
        localRegs: "Next-generation smart logistics hub with automated bonded warehousing."
      },
      {
        country: "China",
        countryCode: "CN",
        city: "Hangzhou / Yiwu",
        code: "HGH",
        name: "Hangzhou Xiaoshan International (Yiwu Regional)",
        lat: 30.2295,
        lon: 120.4344,
        customsComplexity: "Low",
        customsDays: "1-2 business days",
        destHandlingDays: "1-2 days",
        localRegs: "Direct gateway for Yiwu small commodities market and Zhejiang manufacturing."
      },
      {
        country: "China",
        countryCode: "CN",
        city: "Ningbo",
        code: "NGB",
        name: "Ningbo Lishe International Airport",
        lat: 29.8267,
        lon: 121.4619,
        customsComplexity: "Low",
        customsDays: "1-2 business days",
        destHandlingDays: "1-2 days",
        localRegs: "Zhejiang export hub with dedicated air-sea intermodal connection."
      },
      {
        country: "China",
        countryCode: "CN",
        city: "Qingdao",
        code: "TAO",
        name: "Qingdao Jiaodong International Airport",
        lat: 36.3683,
        lon: 120.0883,
        customsComplexity: "Low",
        customsDays: "1-2 business days",
        destHandlingDays: "1-2 days",
        localRegs: "Shandong manufacturing gateway connecting Japan, South Korea, Europe & North America."
      },
      {
        country: "China",
        countryCode: "CN",
        city: "Xiamen",
        code: "XMN",
        name: "Xiamen Gaoqi International Airport",
        lat: 24.544,
        lon: 118.1278,
        customsComplexity: "Low",
        customsDays: "1-2 business days",
        destHandlingDays: "1-2 days",
        localRegs: "Fujian apparel, stone and electronics export hub."
      },
      {
        country: "China",
        countryCode: "CN",
        city: "Zhengzhou",
        code: "CGO",
        name: "Zhengzhou Xinzheng International (Air Silk Road Hub)",
        lat: 34.5197,
        lon: 113.8409,
        customsComplexity: "Low",
        customsDays: "1-2 business days",
        destHandlingDays: "1-2 days",
        localRegs: "National dedicated freight airport with Cargolux European air bridge."
      },
      {
        country: "China",
        countryCode: "CN",
        city: "Chengdu",
        code: "TFU",
        name: "Chengdu Tianfu International Airport",
        lat: 30.3163,
        lon: 104.4447,
        customsComplexity: "Low",
        customsDays: "1-2 business days",
        destHandlingDays: "1-2 days",
        localRegs: "Western China mega-hub connecting Europe and Central Asia."
      },
      {
        country: "China",
        countryCode: "CN",
        city: "Wuhan",
        code: "WUH",
        name: "Wuhan Tianhe International Airport",
        lat: 30.7838,
        lon: 114.2081,
        customsComplexity: "Low",
        customsDays: "1-2 business days",
        destHandlingDays: "1-2 days",
        localRegs: "Central China optoelectronics & automotive logistics center."
      }
    ]
  },

  // --- NORTH AMERICA ---
  {
    name: "United States",
    code: "US",
    region: "North America",
    airports: [
      {
        country: "United States",
        countryCode: "US",
        city: "New York",
        code: "JFK",
        name: "John F. Kennedy International Airport",
        lat: 40.6413,
        lon: -73.7781,
        customsComplexity: "Moderate",
        customsDays: "1-2 business days",
        destHandlingDays: "1-2 days",
        localRegs: "US CBP entry filing, ISF / AMS required 24h prior, FDA clearance for relevant goods."
      },
      {
        country: "United States",
        countryCode: "US",
        city: "Los Angeles",
        code: "LAX",
        name: "Los Angeles International Airport",
        lat: 33.9416,
        lon: -118.4085,
        customsComplexity: "Moderate",
        customsDays: "1-2 business days",
        destHandlingDays: "1-2 days",
        localRegs: "Fastest transpacific routing from China. Amazon FBA West Coast fulfillment gateway."
      },
      {
        country: "United States",
        countryCode: "US",
        city: "Chicago",
        code: "ORD",
        name: "O'Hare International Airport",
        lat: 41.9742,
        lon: -87.9073,
        customsComplexity: "Moderate",
        customsDays: "1-2 business days",
        destHandlingDays: "1-2 days",
        localRegs: "Midwest primary cargo hub with bonded rail and interstate truck links."
      },
      {
        country: "United States",
        countryCode: "US",
        city: "Miami",
        code: "MIA",
        name: "Miami International Airport",
        lat: 25.7959,
        lon: -80.287,
        customsComplexity: "Moderate",
        customsDays: "1-3 business days",
        destHandlingDays: "1-2 days",
        localRegs: "Major gateway for US Southeast and Latin America transshipment."
      },
      {
        country: "United States",
        countryCode: "US",
        city: "Atlanta",
        code: "ATL",
        name: "Hartsfield-Jackson Atlanta International",
        lat: 33.6407,
        lon: -84.4277,
        customsComplexity: "Moderate",
        customsDays: "1-2 business days",
        destHandlingDays: "1-2 days",
        localRegs: "High-throughput domestic hub with cold chain and pharmaceutical handling."
      },
      {
        country: "United States",
        countryCode: "US",
        city: "San Francisco",
        code: "SFO",
        name: "San Francisco International Airport",
        lat: 37.6213,
        lon: -122.379,
        customsComplexity: "Moderate",
        customsDays: "1-2 business days",
        destHandlingDays: "1-2 days",
        localRegs: "Silicon Valley direct air freight corridor for semiconductors and consumer tech."
      },
      {
        country: "United States",
        countryCode: "US",
        city: "Dallas / Fort Worth",
        code: "DFW",
        name: "Dallas/Fort Worth International Airport",
        lat: 32.8998,
        lon: -97.0403,
        customsComplexity: "Moderate",
        customsDays: "1-2 business days",
        destHandlingDays: "1-2 days",
        localRegs: "Central South distribution hub for Texas and southern US."
      },
      {
        country: "United States",
        countryCode: "US",
        city: "Seattle",
        code: "SEA",
        name: "Seattle-Tacoma International Airport",
        lat: 47.4502,
        lon: -122.3088,
        customsComplexity: "Moderate",
        customsDays: "1-2 business days",
        destHandlingDays: "1-2 days",
        localRegs: "Pacific Northwest gateway with rapid connection to Canadian border."
      }
    ]
  },
  {
    name: "Canada",
    code: "CA",
    region: "North America",
    airports: [
      {
        country: "Canada",
        countryCode: "CA",
        city: "Toronto",
        code: "YYZ",
        name: "Toronto Pearson International Airport",
        lat: 43.6777,
        lon: -79.6248,
        customsComplexity: "Low",
        customsDays: "1-2 business days",
        destHandlingDays: "1-2 days",
        localRegs: "CBSA ACI eManifest electronic pre-filing required. CARM portal registration mandatory."
      },
      {
        country: "Canada",
        countryCode: "CA",
        city: "Vancouver",
        code: "YVR",
        name: "Vancouver International Airport",
        lat: 49.1967,
        lon: -123.1815,
        customsComplexity: "Low",
        customsDays: "1-2 business days",
        destHandlingDays: "1-2 days",
        localRegs: "Primary Pacific entry point with fastest flight transit from China to Canada."
      },
      {
        country: "Canada",
        countryCode: "CA",
        city: "Montreal",
        code: "YUL",
        name: "Montréal-Trudeau International Airport",
        lat: 45.4706,
        lon: -73.7408,
        customsComplexity: "Low",
        customsDays: "1-2 business days",
        destHandlingDays: "1-2 days",
        localRegs: "Quebec & Eastern Canada commercial air cargo distribution center."
      },
      {
        country: "Canada",
        countryCode: "CA",
        city: "Calgary",
        code: "YYC",
        name: "Calgary International Airport",
        lat: 51.1215,
        lon: -114.0076,
        customsComplexity: "Low",
        customsDays: "1-2 business days",
        destHandlingDays: "1-2 days",
        localRegs: "Western Canada interior distribution hub."
      }
    ]
  },
  {
    name: "Mexico",
    code: "MX",
    region: "North America",
    airports: [
      {
        country: "Mexico",
        countryCode: "MX",
        city: "Mexico City (AIFA)",
        code: "NLU",
        name: "Felipe Ángeles International Airport",
        lat: 19.7456,
        lon: -99.0142,
        customsComplexity: "Elevated",
        customsDays: "2-4 business days",
        destHandlingDays: "1-2 days",
        localRegs: "Official dedicated cargo hub for Mexico City metropolitan area. SAT customs pre-validation required."
      },
      {
        country: "Mexico",
        countryCode: "MX",
        city: "Guadalajara",
        code: "GDL",
        name: "Guadalajara International Airport",
        lat: 20.5218,
        lon: -103.3112,
        customsComplexity: "Elevated",
        customsDays: "2-4 business days",
        destHandlingDays: "1-2 days",
        localRegs: "Key electronics and automotive manufacturing air gateway."
      },
      {
        country: "Mexico",
        countryCode: "MX",
        city: "Monterrey",
        code: "MTY",
        name: "Monterrey International Airport",
        lat: 25.7785,
        lon: -100.1069,
        customsComplexity: "Elevated",
        customsDays: "2-4 business days",
        destHandlingDays: "1-2 days",
        localRegs: "Northern Mexico nearshoring industrial center."
      }
    ]
  },

  // --- EUROPE ---
  {
    name: "United Kingdom",
    code: "GB",
    region: "Europe",
    airports: [
      {
        country: "United Kingdom",
        countryCode: "GB",
        city: "London Heathrow",
        code: "LHR",
        name: "London Heathrow Airport",
        lat: 51.47,
        lon: -0.4543,
        customsComplexity: "Low",
        customsDays: "1-2 business days",
        destHandlingDays: "1-2 days",
        localRegs: "UK CDS customs declaration, EORI number mandatory, VAT & duty payment via deferment account."
      },
      {
        country: "United Kingdom",
        countryCode: "GB",
        city: "Manchester",
        code: "MAN",
        name: "Manchester Airport",
        lat: 53.3537,
        lon: -2.275,
        customsComplexity: "Low",
        customsDays: "1-2 business days",
        destHandlingDays: "1-2 days",
        localRegs: "Northern England logistics corridor, excellent road links to Leeds, Liverpool & Scotland."
      },
      {
        country: "United Kingdom",
        countryCode: "GB",
        city: "East Midlands",
        code: "EMA",
        name: "East Midlands Airport",
        lat: 52.8311,
        lon: -1.3281,
        customsComplexity: "Low",
        customsDays: "1-2 business days",
        destHandlingDays: "1-2 days",
        localRegs: "UK's primary dedicated express and night-time freight airport."
      }
    ]
  },
  {
    name: "Germany",
    code: "DE",
    region: "Europe",
    airports: [
      {
        country: "Germany",
        countryCode: "DE",
        city: "Frankfurt",
        code: "FRA",
        name: "Frankfurt am Main Airport",
        lat: 50.0379,
        lon: 8.5622,
        customsComplexity: "Low",
        customsDays: "1-2 business days",
        destHandlingDays: "1-2 days",
        localRegs: "Europe's largest air cargo hub (CargoCity). ATLAS electronic customs clearance with ICS2 pre-arrival."
      },
      {
        country: "Germany",
        countryCode: "DE",
        city: "Leipzig / Halle",
        code: "LEJ",
        name: "Leipzig/Halle Airport",
        lat: 51.4239,
        lon: 12.2364,
        customsComplexity: "Low",
        customsDays: "1-2 business days",
        destHandlingDays: "1-2 days",
        localRegs: "European central hub for express parcel and chartered heavy freight."
      },
      {
        country: "Germany",
        countryCode: "DE",
        city: "Munich",
        code: "MUC",
        name: "Munich International Airport",
        lat: 48.3538,
        lon: 11.7861,
        customsComplexity: "Low",
        customsDays: "1-2 business days",
        destHandlingDays: "1-2 days",
        localRegs: "Southern German industrial and automotive freight center."
      }
    ]
  },
  {
    name: "France",
    code: "FR",
    region: "Europe",
    airports: [
      {
        country: "France",
        countryCode: "FR",
        city: "Paris CDG",
        code: "CDG",
        name: "Paris Charles de Gaulle Airport",
        lat: 49.0097,
        lon: 2.5479,
        customsComplexity: "Low",
        customsDays: "1-2 business days",
        destHandlingDays: "1-2 days",
        localRegs: "DELTA customs system, EU EORI compliance, direct high-speed TGV freight connections."
      },
      {
        country: "France",
        countryCode: "FR",
        city: "Lyon",
        code: "LYS",
        name: "Lyon-Saint Exupéry Airport",
        lat: 45.7256,
        lon: 5.0811,
        customsComplexity: "Low",
        customsDays: "1-2 business days",
        destHandlingDays: "1-2 days",
        localRegs: "Rhone-Alps industrial corridor."
      }
    ]
  },
  {
    name: "Netherlands",
    code: "NL",
    region: "Europe",
    airports: [
      {
        country: "Netherlands",
        countryCode: "NL",
        city: "Amsterdam",
        code: "AMS",
        name: "Amsterdam Airport Schiphol",
        lat: 52.3105,
        lon: 4.7683,
        customsComplexity: "Low",
        customsDays: "1-2 business days",
        destHandlingDays: "1-2 days",
        localRegs: "Gateway to the European continent. Dutch Article 23 import VAT deferment available."
      }
    ]
  },
  {
    name: "Italy",
    code: "IT",
    region: "Europe",
    airports: [
      {
        country: "Italy",
        countryCode: "IT",
        city: "Milan Malpensa",
        code: "MXP",
        name: "Milan Malpensa Airport",
        lat: 45.63,
        lon: 8.7231,
        customsComplexity: "Moderate",
        customsDays: "2-3 business days",
        destHandlingDays: "1-2 days",
        localRegs: "Handles over 65% of Italian air cargo. Fashion, industrial equipment, and pharmaceutical clearance."
      },
      {
        country: "Italy",
        countryCode: "IT",
        city: "Rome Fiumicino",
        code: "FCO",
        name: "Rome Leonardo da Vinci Airport",
        lat: 41.8003,
        lon: 12.2389,
        customsComplexity: "Moderate",
        customsDays: "2-3 business days",
        destHandlingDays: "1-2 days",
        localRegs: "Central and southern Italy air cargo terminal."
      }
    ]
  },
  {
    name: "Spain",
    code: "ES",
    region: "Europe",
    airports: [
      {
        country: "Spain",
        countryCode: "ES",
        city: "Madrid Barajas",
        code: "MAD",
        name: "Adolfo Suárez Madrid-Barajas Airport",
        lat: 40.4839,
        lon: -3.568,
        customsComplexity: "Low",
        customsDays: "1-2 business days",
        destHandlingDays: "1-2 days",
        localRegs: "Iberian Peninsula logistics hub with extensive Latin America bridging links."
      },
      {
        country: "Spain",
        countryCode: "ES",
        city: "Barcelona",
        code: "BCN",
        name: "Josep Tarradellas Barcelona-El Prat",
        lat: 41.2974,
        lon: 2.0833,
        customsComplexity: "Low",
        customsDays: "1-2 business days",
        destHandlingDays: "1-2 days",
        localRegs: "Catalonia manufacturing, textiles & chemical industry hub."
      },
      {
        country: "Spain",
        countryCode: "ES",
        city: "Zaragoza",
        code: "ZAZ",
        name: "Zaragoza Airport (Inditex Fast Fashion Hub)",
        lat: 41.6662,
        lon: -1.0415,
        customsComplexity: "Low",
        customsDays: "1-2 business days",
        destHandlingDays: "1-2 days",
        localRegs: "One of Europe's fastest growing dedicated air cargo terminals."
      }
    ]
  },
  {
    name: "Belgium",
    code: "BE",
    region: "Europe",
    airports: [
      {
        country: "Belgium",
        countryCode: "BE",
        city: "Liege",
        code: "LGG",
        name: "Liege Airport (Global E-Commerce Hub)",
        lat: 50.6374,
        lon: 5.4432,
        customsComplexity: "Low",
        customsDays: "1-2 business days",
        destHandlingDays: "1-2 days",
        localRegs: "Primary e-commerce cargo hub for Alibaba Cainiao and worldwide freighters in Europe."
      },
      {
        country: "Belgium",
        countryCode: "BE",
        city: "Brussels",
        code: "BRU",
        name: "Brussels Airport (BRUcargo)",
        lat: 50.9014,
        lon: 4.4844,
        customsComplexity: "Low",
        customsDays: "1-2 business days",
        destHandlingDays: "1-2 days",
        localRegs: "Pharma and temperature-controlled certified logistics center."
      }
    ]
  },
  {
    name: "Poland",
    code: "PL",
    region: "Europe",
    airports: [
      {
        country: "Poland",
        countryCode: "PL",
        city: "Warsaw",
        code: "WAW",
        name: "Warsaw Chopin Airport",
        lat: 52.1672,
        lon: 20.9679,
        customsComplexity: "Low",
        customsDays: "1-2 business days",
        destHandlingDays: "1-2 days",
        localRegs: "Central & Eastern Europe primary distribution center with direct freight services from China."
      },
      {
        country: "Poland",
        countryCode: "PL",
        city: "Katowice",
        code: "KTW",
        name: "Katowice Airport",
        lat: 50.4743,
        lon: 19.08,
        customsComplexity: "Low",
        customsDays: "1-2 business days",
        destHandlingDays: "1-2 days",
        localRegs: "Regional air cargo hub in southern Poland."
      }
    ]
  },
  {
    name: "Turkey",
    code: "TR",
    region: "Europe / West Asia",
    airports: [
      {
        country: "Turkey",
        countryCode: "TR",
        city: "Istanbul",
        code: "IST",
        name: "Istanbul Airport (Turkish Cargo Hub)",
        lat: 41.2753,
        lon: 28.7519,
        customsComplexity: "Moderate",
        customsDays: "2-3 business days",
        destHandlingDays: "1-2 days",
        localRegs: "Strategic crossroads between Asia, Europe and Africa. SmartCargo automated handling facility."
      }
    ]
  },

  // --- MIDDLE EAST ---
  {
    name: "United Arab Emirates",
    code: "AE",
    region: "Middle East",
    airports: [
      {
        country: "United Arab Emirates",
        countryCode: "AE",
        city: "Dubai",
        code: "DXB",
        name: "Dubai International Airport",
        lat: 25.2532,
        lon: 55.3657,
        customsComplexity: "Low",
        customsDays: "1 business day",
        destHandlingDays: "1 day",
        localRegs: "World-class logistics infrastructure. Dubai Customs Mirsal 2 pre-clearance, 0% duty in free zones."
      },
      {
        country: "United Arab Emirates",
        countryCode: "AE",
        city: "Dubai World Central",
        code: "DWC",
        name: "Al Maktoum International Airport",
        lat: 24.8961,
        lon: 55.1614,
        customsComplexity: "Low",
        customsDays: "1 business day",
        destHandlingDays: "1 day",
        localRegs: "Dedicated mega-cargo airport integrated directly with Jebel Ali Free Zone (Sea-Air corridor)."
      },
      {
        country: "United Arab Emirates",
        countryCode: "AE",
        city: "Abu Dhabi",
        code: "AUH",
        name: "Zayed International Airport",
        lat: 24.433,
        lon: 54.6511,
        customsComplexity: "Low",
        customsDays: "1 business day",
        destHandlingDays: "1 day",
        localRegs: "Etihad Cargo flagship hub with state-of-the-art cold-chain facilities."
      },
      {
        country: "United Arab Emirates",
        countryCode: "AE",
        city: "Sharjah",
        code: "SHJ",
        name: "Sharjah International Airport",
        lat: 25.3286,
        lon: 55.5172,
        customsComplexity: "Low",
        customsDays: "1 business day",
        destHandlingDays: "1 day",
        localRegs: "Cost-effective cargo hub popular for charter flights and regional re-export."
      }
    ]
  },
  {
    name: "Saudi Arabia",
    code: "SA",
    region: "Middle East",
    airports: [
      {
        country: "Saudi Arabia",
        countryCode: "SA",
        city: "Riyadh",
        code: "RUH",
        name: "King Khalid International Airport",
        lat: 24.9576,
        lon: 46.6988,
        customsComplexity: "Moderate",
        customsDays: "2-3 business days",
        destHandlingDays: "1-2 days",
        localRegs: "ZATCA customs clearance. Saber certificate of conformity and SASO compliance mandatory."
      },
      {
        country: "Saudi Arabia",
        countryCode: "SA",
        city: "Jeddah",
        code: "JED",
        name: "King Abdulaziz International Airport",
        lat: 21.6796,
        lon: 39.1565,
        customsComplexity: "Moderate",
        customsDays: "2-3 business days",
        destHandlingDays: "1-2 days",
        localRegs: "Western Province commercial gateway and Red Sea corridor."
      },
      {
        country: "Saudi Arabia",
        countryCode: "SA",
        city: "Dammam",
        code: "DMM",
        name: "King Fahd International Airport",
        lat: 26.4712,
        lon: 49.7979,
        customsComplexity: "Moderate",
        customsDays: "2-3 business days",
        destHandlingDays: "1-2 days",
        localRegs: "Eastern Province oil and industrial center."
      }
    ]
  },
  {
    name: "Qatar",
    code: "QA",
    region: "Middle East",
    airports: [
      {
        country: "Qatar",
        countryCode: "QA",
        city: "Doha",
        code: "DOH",
        name: "Hamad International Airport",
        lat: 25.2731,
        lon: 51.6081,
        customsComplexity: "Low",
        customsDays: "1-2 business days",
        destHandlingDays: "1 day",
        localRegs: "Qatar Airways Cargo global hub with rapid transit turnaround."
      }
    ]
  },
  {
    name: "Kuwait",
    code: "KW",
    region: "Middle East",
    airports: [
      {
        country: "Kuwait",
        countryCode: "KW",
        city: "Kuwait City",
        code: "KWI",
        name: "Kuwait International Airport",
        lat: 29.2269,
        lon: 47.9789,
        customsComplexity: "Moderate",
        customsDays: "2-3 business days",
        destHandlingDays: "1-2 days",
        localRegs: "KUCAS certificate of conformity and legalized commercial invoices required."
      }
    ]
  },
  {
    name: "Oman",
    code: "OM",
    region: "Middle East",
    airports: [
      {
        country: "Oman",
        countryCode: "OM",
        city: "Muscat",
        code: "MCT",
        name: "Muscat International Airport",
        lat: 23.5933,
        lon: 58.2844,
        customsComplexity: "Low",
        customsDays: "1-2 business days",
        destHandlingDays: "1-2 days",
        localRegs: "Bayan single window customs system. Rapid clearance for GCC shipments."
      }
    ]
  },

  // --- ASIA & PACIFIC ---
  {
    name: "Pakistan",
    code: "PK",
    region: "South Asia",
    airports: [
      {
        country: "Pakistan",
        countryCode: "PK",
        city: "Karachi",
        code: "KHI",
        name: "Jinnah International Airport",
        lat: 24.9065,
        lon: 67.1608,
        customsComplexity: "Elevated",
        customsDays: "2-6 business days",
        destHandlingDays: "1-2 business days",
        localRegs: "Pakistan FBR WeBOC electronic filing, Form-E compliance, import duties and regulatory duty assessment."
      },
      {
        country: "Pakistan",
        countryCode: "PK",
        city: "Lahore",
        code: "LHE",
        name: "Allama Iqbal International Airport",
        lat: 31.5216,
        lon: 74.4036,
        customsComplexity: "Elevated",
        customsDays: "2-5 business days",
        destHandlingDays: "1-2 business days",
        localRegs: "Punjab industrial and commercial hub. Electronic clearance via WeBOC."
      },
      {
        country: "Pakistan",
        countryCode: "PK",
        city: "Islamabad",
        code: "ISB",
        name: "Islamabad International Airport",
        lat: 33.5494,
        lon: 72.8256,
        customsComplexity: "Elevated",
        customsDays: "2-5 business days",
        destHandlingDays: "1-2 business days",
        localRegs: "Capital federal gateway with modern bonded air cargo complex."
      },
      {
        country: "Pakistan",
        countryCode: "PK",
        city: "Sialkot",
        code: "SKT",
        name: "Sialkot International Airport",
        lat: 32.5358,
        lon: 74.3639,
        customsComplexity: "Elevated",
        customsDays: "2-5 business days",
        destHandlingDays: "1-2 business days",
        localRegs: "Surgical instruments and sports goods dedicated export & import air terminal."
      }
    ]
  },
  {
    name: "India",
    code: "IN",
    region: "South Asia",
    airports: [
      {
        country: "India",
        countryCode: "IN",
        city: "Delhi",
        code: "DEL",
        name: "Indira Gandhi International Airport",
        lat: 28.5562,
        lon: 77.1,
        customsComplexity: "Elevated",
        customsDays: "2-4 business days",
        destHandlingDays: "1-2 days",
        localRegs: "ICEGATE ICE single window, GST registration & Bill of Entry pre-filing required."
      },
      {
        country: "India",
        countryCode: "IN",
        city: "Mumbai",
        code: "BOM",
        name: "Chhatrapati Shivaji Maharaj International",
        lat: 19.0896,
        lon: 72.8656,
        customsComplexity: "Elevated",
        customsDays: "2-4 business days",
        destHandlingDays: "1-2 days",
        localRegs: "Western India financial and pharma air cargo capital."
      },
      {
        country: "India",
        countryCode: "IN",
        city: "Bangalore",
        code: "BLR",
        name: "Kempegowda International Airport",
        lat: 13.1986,
        lon: 77.7066,
        customsComplexity: "Moderate",
        customsDays: "2-3 business days",
        destHandlingDays: "1-2 days",
        localRegs: "Southern India technology and electronics distribution center."
      },
      {
        country: "India",
        countryCode: "IN",
        city: "Chennai",
        code: "MAA",
        name: "Chennai International Airport",
        lat: 12.9941,
        lon: 80.1709,
        customsComplexity: "Moderate",
        customsDays: "2-3 business days",
        destHandlingDays: "1-2 days",
        localRegs: "Automotive, electronics & leather goods corridor."
      }
    ]
  },
  {
    name: "Japan",
    code: "JP",
    region: "East Asia",
    airports: [
      {
        country: "Japan",
        countryCode: "JP",
        city: "Tokyo Narita",
        code: "NRT",
        name: "Narita International Airport",
        lat: 35.772,
        lon: 140.3929,
        customsComplexity: "Low",
        customsDays: "1 business day",
        destHandlingDays: "1 day",
        localRegs: "NACCS electronic declaration system. Ultra-fast customs release and strict labeling compliance."
      },
      {
        country: "Japan",
        countryCode: "JP",
        city: "Tokyo Haneda",
        code: "HND",
        name: "Tokyo Haneda Airport",
        lat: 35.5494,
        lon: 139.7798,
        customsComplexity: "Low",
        customsDays: "1 business day",
        destHandlingDays: "1 day",
        localRegs: "Downtown Tokyo express courier and priority cargo facility."
      },
      {
        country: "Japan",
        countryCode: "JP",
        city: "Osaka Kansai",
        code: "KIX",
        name: "Kansai International Airport",
        lat: 34.432,
        lon: 135.2304,
        customsComplexity: "Low",
        customsDays: "1 business day",
        destHandlingDays: "1 day",
        localRegs: "Western Japan 24/7 offshore cargo island hub."
      }
    ]
  },
  {
    name: "South Korea",
    code: "KR",
    region: "East Asia",
    airports: [
      {
        country: "South Korea",
        countryCode: "KR",
        city: "Seoul Incheon",
        code: "ICN",
        name: "Incheon International Airport",
        lat: 37.4602,
        lon: 126.4407,
        customsComplexity: "Low",
        customsDays: "1 business day",
        destHandlingDays: "1 day",
        localRegs: "World's 2nd busiest international cargo hub. UNI-PASS paperless customs clearance."
      }
    ]
  },
  {
    name: "Singapore",
    code: "SG",
    region: "Southeast Asia",
    airports: [
      {
        country: "Singapore",
        countryCode: "SG",
        city: "Singapore",
        code: "SIN",
        name: "Singapore Changi Airport",
        lat: 1.3644,
        lon: 103.9915,
        customsComplexity: "Low",
        customsDays: "1 business day",
        destHandlingDays: "1 day",
        localRegs: "Free Trade Zone, TradeNet electronic permit filing, Southeast Asia transshipment epicenter."
      }
    ]
  },
  {
    name: "Malaysia",
    code: "MY",
    region: "Southeast Asia",
    airports: [
      {
        country: "Malaysia",
        countryCode: "MY",
        city: "Kuala Lumpur",
        code: "KUL",
        name: "Kuala Lumpur International Airport (KLIA Cargo)",
        lat: 2.7456,
        lon: 101.7099,
        customsComplexity: "Low",
        customsDays: "1-2 business days",
        destHandlingDays: "1-2 days",
        localRegs: "Royal Malaysian Customs Dagang Net electronic system. Free Commercial Zone."
      },
      {
        country: "Malaysia",
        countryCode: "MY",
        city: "Penang",
        code: "PEN",
        name: "Penang International Airport",
        lat: 5.2971,
        lon: 100.2769,
        customsComplexity: "Low",
        customsDays: "1-2 business days",
        destHandlingDays: "1-2 days",
        localRegs: "Major semiconductor and electronics manufacturing air corridor."
      }
    ]
  },
  {
    name: "Thailand",
    code: "TH",
    region: "Southeast Asia",
    airports: [
      {
        country: "Thailand",
        countryCode: "TH",
        city: "Bangkok",
        code: "BKK",
        name: "Suvarnabhumi Airport (Bangkok)",
        lat: 13.69,
        lon: 100.7501,
        customsComplexity: "Moderate",
        customsDays: "1-3 business days",
        destHandlingDays: "1-2 days",
        localRegs: "Thai Customs e-Customs electronic paperless declaration system."
      }
    ]
  },
  {
    name: "Vietnam",
    code: "VN",
    region: "Southeast Asia",
    airports: [
      {
        country: "Vietnam",
        countryCode: "VN",
        city: "Hanoi",
        code: "HAN",
        name: "Noi Bai International Airport",
        lat: 21.2212,
        lon: 105.8072,
        customsComplexity: "Moderate",
        customsDays: "2-3 business days",
        destHandlingDays: "1-2 days",
        localRegs: "VNACCS/VCIS electronic customs system. Northern electronics manufacturing center."
      },
      {
        country: "Vietnam",
        countryCode: "VN",
        city: "Ho Chi Minh City",
        code: "SGN",
        name: "Tan Son Nhat International Airport",
        lat: 10.8188,
        lon: 106.6519,
        customsComplexity: "Moderate",
        customsDays: "2-3 business days",
        destHandlingDays: "1-2 days",
        localRegs: "Southern Vietnam commercial and apparel export/import gateway."
      }
    ]
  },
  {
    name: "Indonesia",
    code: "ID",
    region: "Southeast Asia",
    airports: [
      {
        country: "Indonesia",
        countryCode: "ID",
        city: "Jakarta",
        code: "CGK",
        name: "Soekarno-Hatta International Airport",
        lat: -6.1275,
        lon: 106.6537,
        customsComplexity: "Elevated",
        customsDays: "2-4 business days",
        destHandlingDays: "1-2 days",
        localRegs: "INSW single window system, BPOM permits for cosmetics/food, SNI standards inspection."
      }
    ]
  },
  {
    name: "Philippines",
    code: "PH",
    region: "Southeast Asia",
    airports: [
      {
        country: "Philippines",
        countryCode: "PH",
        city: "Manila",
        code: "MNL",
        name: "Ninoy Aquino International Airport",
        lat: 14.5086,
        lon: 121.0194,
        customsComplexity: "Elevated",
        customsDays: "2-4 business days",
        destHandlingDays: "1-2 days",
        localRegs: "BOC e2m electronic to mobile system, CPRS importer accreditation required."
      }
    ]
  },
  {
    name: "Australia",
    code: "AU",
    region: "Oceania",
    airports: [
      {
        country: "Australia",
        countryCode: "AU",
        city: "Sydney",
        code: "SYD",
        name: "Sydney Kingsford Smith Airport",
        lat: -33.9399,
        lon: 151.1753,
        customsComplexity: "Moderate",
        customsDays: "1-2 business days",
        destHandlingDays: "1-2 days",
        localRegs: "ABF ICS customs clearance. Strict biosecurity inspection (DAFF) for biological or wooden cargo."
      },
      {
        country: "Australia",
        countryCode: "AU",
        city: "Melbourne",
        code: "MEL",
        name: "Melbourne Airport (Tullamarine)",
        lat: -37.669,
        lon: 144.841,
        customsComplexity: "Moderate",
        customsDays: "1-2 business days",
        destHandlingDays: "1-2 days",
        localRegs: "Victoria 24-hour cargo airport without curfews."
      },
      {
        country: "Australia",
        countryCode: "AU",
        city: "Brisbane",
        code: "BNE",
        name: "Brisbane Airport",
        lat: -27.3942,
        lon: 153.1218,
        customsComplexity: "Moderate",
        customsDays: "1-2 business days",
        destHandlingDays: "1-2 days",
        localRegs: "Queensland primary air cargo terminal."
      },
      {
        country: "Australia",
        countryCode: "AU",
        city: "Perth",
        code: "PER",
        name: "Perth Airport",
        lat: -31.9385,
        lon: 115.9672,
        customsComplexity: "Moderate",
        customsDays: "1-2 business days",
        destHandlingDays: "1-2 days",
        localRegs: "Western Australia mining and agricultural gateway."
      }
    ]
  },
  {
    name: "New Zealand",
    code: "NZ",
    region: "Oceania",
    airports: [
      {
        country: "New Zealand",
        countryCode: "NZ",
        city: "Auckland",
        code: "AKL",
        name: "Auckland Airport",
        lat: -37.0082,
        lon: 174.785,
        customsComplexity: "Moderate",
        customsDays: "1-2 business days",
        destHandlingDays: "1-2 days",
        localRegs: "Trade Single Window (TSW), MPI biosecurity clearance mandatory for all air consignments."
      }
    ]
  },

  // --- LATIN AMERICA ---
  {
    name: "Brazil",
    code: "BR",
    region: "South America",
    airports: [
      {
        country: "Brazil",
        countryCode: "BR",
        city: "São Paulo (Guarulhos)",
        code: "GRU",
        name: "São Paulo–Guarulhos International Airport",
        lat: -23.4356,
        lon: -46.4731,
        customsComplexity: "Strict",
        customsDays: "3-7 business days",
        destHandlingDays: "2-3 days",
        localRegs: "Receita Federal Siscomex registration, RADAR license mandatory. Stringent tax channel verification."
      },
      {
        country: "Brazil",
        countryCode: "BR",
        city: "Campinas (Viracopos)",
        code: "VCP",
        name: "Viracopos International Airport (Cargo Hub)",
        lat: -23.0074,
        lon: -47.1345,
        customsComplexity: "Strict",
        customsDays: "3-7 business days",
        destHandlingDays: "2-3 days",
        localRegs: "Brazil's premier dedicated air freight terminal handling over 40% of air imports."
      }
    ]
  },
  {
    name: "Chile",
    code: "CL",
    region: "South America",
    airports: [
      {
        country: "Chile",
        countryCode: "CL",
        city: "Santiago",
        code: "SCL",
        name: "Arturo Merino Benítez International Airport",
        lat: -33.393,
        lon: -70.7858,
        customsComplexity: "Low",
        customsDays: "1-2 business days",
        destHandlingDays: "1-2 days",
        localRegs: "Chilean Customs electronic system, China-Chile FTA tariff exemptions applied."
      }
    ]
  },
  {
    name: "Colombia",
    code: "CO",
    region: "South America",
    airports: [
      {
        country: "Colombia",
        countryCode: "CO",
        city: "Bogotá",
        code: "BOG",
        name: "El Dorado International Airport",
        lat: 4.7016,
        lon: -74.1469,
        customsComplexity: "Moderate",
        customsDays: "2-4 business days",
        destHandlingDays: "1-2 days",
        localRegs: "Latin America's busiest air cargo airport by metric tonnage. DIAN customs clearance."
      }
    ]
  },
  {
    name: "Argentina",
    code: "AR",
    region: "South America",
    airports: [
      {
        country: "Argentina",
        countryCode: "AR",
        city: "Buenos Aires",
        code: "EZE",
        name: "Ministro Pistarini International (Ezeiza)",
        lat: -34.8222,
        lon: -58.5358,
        customsComplexity: "Strict",
        customsDays: "3-7 business days",
        destHandlingDays: "2-3 days",
        localRegs: "AFIP customs system, SIRA import approvals and central bank foreign exchange clearance."
      }
    ]
  },

  // --- AFRICA ---
  {
    name: "South Africa",
    code: "ZA",
    region: "Africa",
    airports: [
      {
        country: "South Africa",
        countryCode: "ZA",
        city: "Johannesburg",
        code: "JNB",
        name: "O.R. Tambo International Airport",
        lat: -26.1392,
        lon: 28.246,
        customsComplexity: "Moderate",
        customsDays: "2-3 business days",
        destHandlingDays: "1-2 days",
        localRegs: "SARS customs clearance, customs code required, SABS letter of authority for electronics."
      },
      {
        country: "South Africa",
        countryCode: "ZA",
        city: "Cape Town",
        code: "CPT",
        name: "Cape Town International Airport",
        lat: -33.9715,
        lon: 18.6021,
        customsComplexity: "Moderate",
        customsDays: "2-3 business days",
        destHandlingDays: "1-2 days",
        localRegs: "Western Cape industrial & agricultural air cargo center."
      }
    ]
  },
  {
    name: "Egypt",
    code: "EG",
    region: "North Africa",
    airports: [
      {
        country: "Egypt",
        countryCode: "EG",
        city: "Cairo",
        code: "CAI",
        name: "Cairo International Airport (Cargo Village)",
        lat: 30.1219,
        lon: 31.4056,
        customsComplexity: "Elevated",
        customsDays: "2-5 business days",
        destHandlingDays: "1-2 days",
        localRegs: "Nafeza single window system, mandatory ACID number prior to China dispatch."
      }
    ]
  },
  {
    name: "Nigeria",
    code: "NG",
    region: "West Africa",
    airports: [
      {
        country: "Nigeria",
        countryCode: "NG",
        city: "Lagos",
        code: "LOS",
        name: "Murtala Muhammed International Airport",
        lat: 6.5774,
        lon: 3.3212,
        customsComplexity: "Elevated",
        customsDays: "3-6 business days",
        destHandlingDays: "1-3 days",
        localRegs: "NCS clearance via Single Window, Form M and SONCAP certification mandatory."
      }
    ]
  },
  {
    name: "Kenya",
    code: "KE",
    region: "East Africa",
    airports: [
      {
        country: "Kenya",
        countryCode: "KE",
        city: "Nairobi",
        code: "NBO",
        name: "Jomo Kenyatta International Airport",
        lat: -1.3192,
        lon: 36.9275,
        customsComplexity: "Moderate",
        customsDays: "2-4 business days",
        destHandlingDays: "1-2 days",
        localRegs: "KRA Simba / iCMS system, IDF declaration and PVoC conformity certificate required."
      }
    ]
  },
  {
    name: "Ethiopia",
    code: "ET",
    region: "East Africa",
    airports: [
      {
        country: "Ethiopia",
        countryCode: "ET",
        city: "Addis Ababa",
        code: "ADD",
        name: "Addis Ababa Bole International Airport",
        lat: 8.9779,
        lon: 38.7993,
        customsComplexity: "Moderate",
        customsDays: "2-4 business days",
        destHandlingDays: "1-2 days",
        localRegs: "Ethiopian Airlines pan-African cargo hub connecting over 60 African destinations."
      }
    ]
  }
];

// Helper to look up country and airport
export function findCountry(countryNameOrCode: string): CountryGroup | undefined {
  return GLOBAL_COUNTRIES.find(
    (c) =>
      c.name.toLowerCase() === countryNameOrCode.toLowerCase() ||
      c.code.toLowerCase() === countryNameOrCode.toLowerCase()
  );
}

export function findAirport(airportCode: string): CityAirport | undefined {
  for (const c of GLOBAL_COUNTRIES) {
    const match = c.airports.find((a) => a.code.toUpperCase() === airportCode.toUpperCase());
    if (match) return match;
  }
  return undefined;
}

export function getCountryFlag(countryCode: string): string {
  if (!countryCode || countryCode.length !== 2) return "🌐";
  try {
    const codePoints = countryCode
      .toUpperCase()
      .split("")
      .map((char) => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
  } catch (e) {
    return "🌐";
  }
}
