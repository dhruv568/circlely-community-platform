import { MetadataRoute } from 'next';
import { db } from '@/lib/db';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

  const communities = await db.community.findMany({ select: { slug: true, updatedAt: true } });
  const events = await db.event.findMany({ select: { id: true, updatedAt: true } });

  const communityUrls = communities.map((c) => ({
    url: `${baseUrl}/communities/${c.slug}`,
    lastModified: c.updatedAt,
  }));

  const eventUrls = events.map((e) => ({
    url: `${baseUrl}/events/${e.id}`,
    lastModified: e.updatedAt,
  }));

  const staticPages = [
    '',
    '/about',
    '/communities',
    '/activities',
    '/events',
    '/how-it-works',
    '/safety',
    '/faq',
    '/contact',
    '/privacy',
    '/terms',
    '/community-guidelines',
    '/login',
    '/register',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));

  return [...staticPages, ...communityUrls, ...eventUrls];
}
