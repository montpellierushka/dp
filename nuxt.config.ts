// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@pinia/nuxt',
    'nuxt-icon'
  ],

  colorMode: {
    preference: 'light',
    fallback: 'light',
    classSuffix: ''
  },

  app: {
    head: {
      title: 'CulinaryPassport',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Ваш гид по кулинарным путешествиям по всему миру' }
      ]
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