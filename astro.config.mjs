// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://norwegian-singles.app',
  // Astro 7 defaults to 'jsx', which strips whitespace between inline
  // elements and runs words together; keep the Astro 6 behavior.
  compressHTML: true,
  integrations: [
    react(),
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en-US',
          es: 'es-ES',
          ko: 'ko-KR',
          de: 'de-DE',
          fr: 'fr-FR',
          it: 'it-IT',
          'pt-BR': 'pt-BR',
        },
      },
    }),
  ],
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es', 'ko', 'de', 'fr', 'it', 'pt-BR'],
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false,
    },
  },
});
