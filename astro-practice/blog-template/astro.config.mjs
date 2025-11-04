import path from 'path';

import cloudflare from '@astrojs/cloudflare';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import sharpService from 'astro/assets/services/sharp';
import { defineConfig } from 'astro/config';
import 'dotenv/config';

export default defineConfig({
  site: process.env.PUBLIC_SITE_URL || 'http://localhost:4321',
  output: 'server',
  adapter: cloudflare(),
  base: '/',
  integrations: [
    react(),
    sitemap({
      entryLimit: 50000,
    }),
  ],
  image: {
    service: sharpService,
  },
  imageService: 'compile',
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve('./src'),
      },
    },
    build: {
      cssCodeSplit: true,
    },
  },
});
