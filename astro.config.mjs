// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  i18n: {
      defaultLocale: 'es',
      locales: ['es', 'en'],
      routing: {
          prefixDefaultLocale: false,
      },
	},

  vite: {
      plugins: [tailwindcss()]
	},

  integrations: [react()],

  redirects: {
    '/ronaldbarber': 'https://ronaldbarber.shop', 
    '/ronaldbarbergithub': 'https://github.com/haderrenteria13/ronald-barber',
    '/whatsappbot': 'https://github.com/haderrenteria13/whatsapp-bot',
    '/linkedin': 'https://www.linkedin.com/in/haderrenteria',
    '/github': 'https://github.com/haderrenteria13',
  },
});