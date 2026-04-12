import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE_CONFIG } from '../pbn-config';

export async function GET(context) {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  const sortedPosts = posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
  return rss({
    title: SITE_CONFIG.name, description: SITE_CONFIG.description, site: context.site,
    items: sortedPosts.map((post) => ({ title: post.data.title, description: post.data.description, pubDate: post.data.pubDate, link: `/blog/${post.slug}/`, author: post.data.author, categories: post.data.tags })),
    customData: `<language>${SITE_CONFIG.language}</language>`,
  });
}
