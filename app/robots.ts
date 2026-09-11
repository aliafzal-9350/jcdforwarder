import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://jcdforwarder.com';

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
