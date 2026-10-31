// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  // Your site URL - update this to your actual domain
  site: 'https://tutreino.com',
  // URLs have no trailing slash (matches canonicals); vercel.json redirects /page/ → /page
  trailingSlash: 'never',
  integrations: [sitemap({
    // 404 is excluded automatically; /docs is internal API reference (noindex)
    filter: (page) => !new URL(page).pathname.startsWith('/docs'),
  })],
  vite: {
    plugins: [tailwindcss()],
  },
  // Add font preloading and caching
  build: {
    inlineStylesheets: 'auto'
  }
});