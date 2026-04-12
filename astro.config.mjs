import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://avastforwindows.co',
  output: 'static',
  trailingSlash: 'ignore',
  integrations: [
    tailwind({
      configFile: './tailwind.config.mjs',
      applyBaseStyles: false,
    }),
  ],
  image: {
    service: { entrypoint: 'astro/assets/services/sharp' },
    domains: ['picsum.photos'],
    remotePatterns: [{ protocol: 'https', hostname: 'picsum.photos' }],
  },
  build: { format: 'directory' },
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
  vite: { build: { cssCodeSplit: true, minify: 'terser' } },
});
