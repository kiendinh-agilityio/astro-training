import { defineConfig } from "astro/config";
import tailwind from '@astrojs/tailwind';
import vercel from "@astrojs/vercel/serverless";
import compress from 'astro-compress';

// https://astro.build/config
export default defineConfig({
  // ...
  integrations: [
    tailwind(),
    compress({
			css: true,
			html: true,
			js: true,
			img: true,
			svg: false,
		}),
  ],
  output: "server",
  adapter: vercel()
});