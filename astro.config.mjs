// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://yo5uke.github.io',
  base: '/StatLens',
  vite: {
    plugins: [tailwindcss()]
  }
});