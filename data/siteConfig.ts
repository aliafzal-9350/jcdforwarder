/**
 * JCD Forwarder Master Site & Corporate Configuration
 * Source: JCD Forwarder Master Blueprint Section 1 & AGENTS.md
 */

export interface CompanyCredentials {
  legalNameEn: string;
  legalNameZh: string;
  tradingBrands: string[];
  nvoccLicenseNumber: string;
  licensingBody: string;
  establishedDate: string;
  nvoccFilingDate: string;
  legalRepresentative: string;
  yearsInBusiness: string;
  industryExperience: string;
}

export interface FacilityInfo {
  hqAddressEn: string;
  hqAddressZh: string;
  city: string;
  district: string;
  province: string;
  postalCode: string;
  warehouseAreaSqM: number;
  warehouseServices: string[];
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface ContactInfo {
  phone: string;
  phoneDisplay: string;
  whatsappNumber: string;
  whatsappUrl: string;
  email: string;
  operatingHours: string;
  languages: string[];
  slaResponseTime: string;
}

export interface SocialLinks {
  instagram: string;
  facebook: string;
  linkedin: string;
  whatsapp: string;
  tiktok: string;
  alibabaTrustPass: string;
}

export interface TrackRecord {
  completedShipments: string;
  importersServed: string;
  annualHandlingUnits: string;
  alibabaRating: number;
  alibabaReviewCount: number;
  onTimeDispatchRate: string;
}

export interface SiteConfig {
  name: string;
  shortName: string;
  url: string;
  ogImage: string;
  description: string;
  credentials: CompanyCredentials;
  facility: FacilityInfo;
  contact: ContactInfo;
  socials: SocialLinks;
  metrics: TrackRecord;
}

export const SITE_CONFIG: SiteConfig = {
  name: 'JCD Forwarder | Shenzhen Jiechengda International Freight Forwarding Co., Ltd.',
  shortName: 'JCD Forwarder',
  url: 'https://jcdforwarder.com',
  ogImage: 'https://jcdforwarder.com/images/og-default.jpg',
  description:
    'Authoritative Chinese freight forwarder providing end-to-end DDP shipping, Amazon FBA first-leg delivery, air charters, ocean FCL/LCL consolidation, and rail express from 7 Chinese sourcing hubs to 44 global countries.',

  credentials: {
    legalNameEn: 'Shenzhen Jiechengda International Freight Forwarding Co., Ltd.',
    legalNameZh: '深圳市捷成达国际货运代理有限公司',
    tradingBrands: ['JCD Forwarder', 'JCD International DDP Freight Forwarding', 'JCD Logistics'],
    nvoccLicenseNumber: 'GD20240307220907',
    licensingBody: 'Guangdong Provincial Department of Transportation / Shenzhen Municipal Transportation Bureau',
    establishedDate: 'April 07, 2015',
    nvoccFilingDate: 'March 07, 2024',
    legalRepresentative: 'Zhong Yusheng (钟玉生)',
    yearsInBusiness: '10+ Years',
    industryExperience: '15+ Years',
  },

  facility: {
    hqAddressEn:
      "Building C (Entire Building), No. 40 Yuesheng 2nd Road, South Industrial Area, Xinhe Community, Fuhai Street, Bao'an District, Shenzhen, China",
    hqAddressZh: '中国广东省深圳市宝安区福海街道新和社区南部工业区跃胜二路40号C栋整栋',
    city: 'Shenzhen',
    district: "Bao'an District",
    province: 'Guangdong',
    postalCode: '518103',
    warehouseAreaSqM: 500,
    warehouseServices: [
      'Pre-shipment quality inspection & AQL sampling',
      'Free 7-day LCL consolidation storage',
      'Carton re-boxing & FNSKU barcode labeling',
      'Amazon FBA GMA / EPAL palletizing & 4-way stretch wrapping',
      'Export customs declaration & tax drawback filing',
    ],
    coordinates: {
      lat: 22.6823,
      lng: 113.8219,
    },
  },

  contact: {
    phone: '+8613724246674',
    phoneDisplay: '+86 137 2424 6674',
    whatsappNumber: '+8613724246674',
    whatsappUrl: 'https://api.whatsapp.com/send/?phone=%2B8613724246674',
    email: 'David@JCDforwarder.com',
    operatingHours: '24/7 Dedicated Logistics Support',
    languages: ['English', 'Chinese (Mandarin & Cantonese)'],
    slaResponseTime: '≤ 2-Hour Average Response Time',
  },

  socials: {
    instagram: 'https://www.instagram.com/JCDforwarder',
    facebook: 'https://www.facebook.com/JCDForwarder',
    linkedin: 'https://www.linkedin.com/company/jcdforwarder/',
    whatsapp: 'https://api.whatsapp.com/send/?phone=%2B8613724246674',
    tiktok: 'https://www.tiktok.com/@alibaba.com_buyercentral',
    alibabaTrustPass: 'https://jiechengda.en.alibaba.com/',
  },

  metrics: {
    completedShipments: '300,000+',
    importersServed: '100,000+',
    annualHandlingUnits: '900,000',
    alibabaRating: 4.7,
    alibabaReviewCount: 48,
    onTimeDispatchRate: '100.0%',
  },
};

/**
 * Generate a pre-filled WhatsApp direct chat link with a custom message
 */
export function getWhatsAppUrl(message?: string): string {
  if (!message) return SITE_CONFIG.contact.whatsappUrl;
  return `https://wa.me/8613724246674?text=${encodeURIComponent(message)}`;
}

/**
 * Generate a pre-filled email mailto link
 */
export function getMailtoUrl(subject?: string, body?: string): string {
  const params = new URLSearchParams();
  if (subject) params.set('subject', subject);
  if (body) params.set('body', body);
  const query = params.toString();
  return `mailto:${SITE_CONFIG.contact.email}${query ? `?${query}` : ''}`;
}
