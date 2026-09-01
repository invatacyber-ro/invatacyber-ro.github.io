import type { MetadataRoute } from 'next';
import { getSite } from '@/lib/content';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const site = getSite();
  return [
    {
      url: site.url,
      changeFrequency: 'weekly',
      priority: 1,
    },
  ];
}
