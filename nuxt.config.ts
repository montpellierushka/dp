// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    'nuxt-icon'
  ],

  colorMode: {
    preference: 'system',
    fallback: 'light',
    classPrefix: '',
    classSuffix: ''
  },

  runtimeConfig: {
    public: {
      apiUrl: 'https://montpellierushka-backend-7c0b.twc1.net'
    },
  },

  nitro: {
    devProxy: {
      '/api': {
        target: 'https://montpellierushka-backend-7c0b.twc1.net',
        changeOrigin: true,
        prependPath: true,
      }
    }
  },

  typescript: {
    strict: true,
    typeCheck: true,
  },

  build: {
    transpile: ['axios', 'leaflet'],
  },

  app: {
    head: {
      title: 'Travel & Food App',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Travel and food application for Telegram' },
      ],
      script: [
        {
          src: 'https://telegram.org/js/telegram-web-app.js',
          async: true,
        },
      ],
    }
  },

  icon: {
    aliases: {
      'heart': 'heroicons:heart',
      'heart-solid': 'heroicons:heart-solid',
      'pencil': 'heroicons:pencil',
      'trash': 'heroicons:trash',
      'map-marker': 'heroicons:map-pin',
      'clock': 'heroicons:clock',
      'plus': 'heroicons:plus',
      'star': 'heroicons:star',
      'star-solid': 'heroicons:star-solid',
      'book-open': 'heroicons:book-open',
      'map': 'heroicons:map',
      'globe': 'heroicons:globe-alt',
      'arrow-right': 'heroicons:arrow-right',
      'arrow-left': 'heroicons:arrow-left',
      'photo': 'heroicons:photo'
    }
  },

  compatibilityDate: '2025-04-03'
})