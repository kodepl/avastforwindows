import { getCollection } from 'astro:content';
import { SITE_CONFIG } from '../pbn-config';

export const prerender = true;

export async function GET(context) {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  const allTags = new Set();
  posts.forEach(post => { 
    post.data.tags?.forEach(tag => { 
      const normalizedTag = tag.toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-\u00C0-\u017F]/g, '');
      allTags.add(normalizedTag);
    }); 
  });
  
  const today = new Date().toISOString().split('T')[0];
  
  const urls = [
    { loc: `${SITE_CONFIG.url}/`, lastmod: today, changefreq: 'daily', priority: '1.0' },
    { loc: `${SITE_CONFIG.url}/blog/`, lastmod: today, changefreq: 'daily', priority: '0.9' },
    ...posts.map(post => ({
      loc: `${SITE_CONFIG.url}/blog/${post.slug}/`,
      lastmod: (post.data.updatedDate || post.data.pubDate).toISOString().split('T')[0],
      changefreq: 'weekly',
      priority: '0.8'
    })),
    ...Array.from(allTags).sort().map(tag => ({
      loc: `${SITE_CONFIG.url}/tag/${tag}/`,
      lastmod: today,
      changefreq: 'weekly',
      priority: '0.5'
    }))
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new Response(xml, { 
    headers: { 
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=0, must-revalidate'
    } 
  });
}
