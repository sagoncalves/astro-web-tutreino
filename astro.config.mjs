// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  // Your site URL - update this to your actual domain
  site: 'https://www.massocios.com',
  integrations: [sitemap({
    filter: (page) =>
      page !== 'https://www.massocios.com/validate/' &&
      page !== 'https://www.massocios.com/404/',
  })],
  vite: {
    plugins: [tailwindcss()],
  },
  // Add font preloading and caching
  build: {
    inlineStylesheets: 'auto'
  }
});