import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://rbstech.uk',
  trailingSlash: 'always',
  integrations: [sitemap()],
});
