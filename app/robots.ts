import type { MetadataRoute } from 'next';
import { SITE_CONFIG } from '@/data/siteConfig';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = SITE_CONFIG.url;

  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/routes/*',
          '/origins/*',
          '/services/*',
          '/tools/*',
          '/about-us',
          '/contact',
        ],
        disallow: [
          '/api/*',
          '/_next/*',
          '/admin/*',
          '/*.json$',
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
