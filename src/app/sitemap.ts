import { MetadataRoute } from 'next';
import { db } from '@/lib/db';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.techbe.online';

  // Fetch all published posts for the blog
  let blogUrls: MetadataRoute.Sitemap = [];
  try {
    const posts = await db.post.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
    });

    blogUrls = posts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.updatedAt,
      changeFrequency: 'weekly',
      priority: 0.8,
    }));
  } catch (error) {
    console.error('Failed to fetch posts for sitemap:', error);
  }

  // Fetch all published case studies for work portfolio
  let workUrls: MetadataRoute.Sitemap = [];
  try {
    const caseStudies = await db.caseStudy.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
    });

    workUrls = caseStudies.map((study) => ({
      url: `${baseUrl}/work/${study.slug}`,
      lastModified: study.updatedAt,
      changeFrequency: 'monthly',
      priority: 0.9,
    }));
  } catch (error) {
    console.error('Failed to fetch case studies for sitemap:', error);
  }

  const staticUrls: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/work`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/start`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.8,
    },
  ];

  return [...staticUrls, ...blogUrls, ...workUrls];
}
