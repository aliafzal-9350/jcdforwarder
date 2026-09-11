import React from 'react';
import type { CountryRoute } from '@/data/routes';
import type { FAQItem } from '@/data/faqs';
import type { OriginHub } from '@/data/origins';

interface JsonLdProps {
  schema: Record<string, unknown> | Array<Record<string, unknown>>;
}

/**
 * Reusable Schema.org JSON-LD injector for Server and Client Components
 */
export function JsonLd({ schema }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}

/**
 * Generate Schema.org LogisticsService schema for a specific country trade lane
 */
export function createLogisticsServiceSchema(route: CountryRoute) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'FreightForwarding',
    name: `DDP Freight Forwarding from China to ${route.name}`,
    description: `Complete door-to-door Delivered Duty Paid (DDP) freight solutions from China to ${route.name}. Air DDP, Sea DDP, Rail DDP, and Express Courier with customs clearance and Amazon FBA delivery.`,
    provider: {
      '@type': 'FreightForwarder',
      name: 'Shenzhen Jiechengda International Freight Forwarding Co., Ltd. (JCD Forwarder)',
      alternateName: 'JCD Forwarder',
      url: 'https://jcdforwarder.com',
      telephone: '+86 137 2424 6674',
      email: 'David@JCDforwarder.com',
      taxID: 'GD20240307220907',
      address: {
        '@type': 'PostalAddress',
        streetAddress: "Building C, No. 40 Yuesheng 2nd Road, Xinhe Community, Fuhai Street, Bao'an District",
        addressLocality: 'Shenzhen',
        addressRegion: 'Guangdong',
        postalCode: '518103',
        addressCountry: 'CN',
      },
      hasCredential: {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'Government License',
        recognizedBy: {
          '@type': 'GovernmentOrganization',
          name: 'Guangdong Provincial Department of Transportation',
        },
        identifier: 'GD20240307220907',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.7',
        reviewCount: '48',
        bestRating: '5.0',
        worstRating: '1.0',
      },
    },
    areaServed: {
      '@type': 'Country',
      name: route.name,
      identifier: route.code,
    },
    serviceOutput: 'Door-to-door cargo delivery with all customs duties and tariffs prepaid.',
    offers: {
      '@type': 'Offer',
      priceCurrency: 'USD',
      price: '0.00',
      priceValidUntil: '2026-12-31',
      description: 'Custom all-in DDP freight quote based on cargo weight, volume, and urgency.',
      url: `https://jcdforwarder.com/routes/${route.slug}`,
    },
  };
}

/**
 * Generate Schema.org FAQPage schema from contextual FAQ items
 */
export function createFaqPageSchema(faqs: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generate Schema.org BreadcrumbList schema
 */
export function createBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Generate Schema.org LocalBusiness / FreightForwarder schema for Chinese origin hubs
 */
export function createLocalBusinessSchema(origin?: OriginHub) {
  const isHQ = !origin || origin.isHeadquarters;
  return {
    '@context': 'https://schema.org',
    '@type': 'FreightForwarder',
    name: isHQ
      ? 'Shenzhen Jiechengda International Freight Forwarding Co., Ltd. (HQ)'
      : `JCD Forwarder - ${origin.name} Logistics Hub`,
    alternateName: isHQ ? 'JCD Forwarder Global HQ' : `JCD Forwarder ${origin.name}`,
    image: 'https://jcdforwarder.com/images/jcd-warehouse-shenzhen.jpg',
    url: origin ? `https://jcdforwarder.com/origins/${origin.slug}` : 'https://jcdforwarder.com',
    telephone: '+86 137 2424 6674',
    email: 'David@JCDforwarder.com',
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: origin?.facilityAddress || "Building C, No. 40 Yuesheng 2nd Road, Xinhe Community, Fuhai Street, Bao'an District",
      addressLocality: origin?.name || 'Shenzhen',
      addressRegion: origin?.province || 'Guangdong',
      addressCountry: 'CN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: origin?.coordinates.lat || 22.6823,
      longitude: origin?.coordinates.lng || 113.8219,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '08:00',
        closes: '22:00',
      },
    ],
    sameAs: [
      'https://jcdforwarder.en.alibaba.com',
      'https://www.linkedin.com/company/jcdforwarder',
    ],
  };
}

/**
 * Generate Schema.org SoftwareApplication list for logistics tools directory
 */
export function createSoftwareApplicationSchema(
  tools: Array<{ name: string; description: string; url: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'JCD Forwarder Interactive Logistics Utilities & Calculators',
    itemListElement: tools.map((tool, index) => ({
      '@type': 'SoftwareApplication',
      position: index + 1,
      name: tool.name,
      description: tool.description,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'All',
      url: tool.url,
      offers: {
        '@type': 'Offer',
        price: '0.00',
        priceCurrency: 'USD',
      },
      provider: {
        '@type': 'Organization',
        name: 'Shenzhen Jiechengda International Freight Forwarding Co., Ltd.',
        url: 'https://jcdforwarder.com',
      },
    })),
  };
}
