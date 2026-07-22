// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  // Your site URL - update this to your actual domain
  site: 'https://www.tutreino.com',
  integrations: [sitemap({
    filter: (page) =>
      page !== 'https://www.tutreino.com/validate/' &&
      page !== 'https://www.tutreino.com/404/' &&
      !page.startsWith('https://www.tutreino.com/docs'),
  })],
  vite: {
    plugins: [tailwindcss()],
  },
  // Add font preloading and caching
  build: {
    inlineStylesheets: 'auto'
  }
});