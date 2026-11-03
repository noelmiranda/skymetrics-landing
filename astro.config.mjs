// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import svelte from '@astrojs/svelte';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  site: 'https://skymetrics.cloud',

  // Landing pages are static (default). /app/* pages opt into SSR
  // with `export const prerender = false`.
  adapter: vercel(),

  integrations: [svelte()],

  vite: {
    plugins: [tailwindcss()],
  },
});
