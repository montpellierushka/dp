export const API_BASE_URL = process.env.NUXT_PUBLIC_API_URL || 'https://montpellierushka-backend-7c0b.twc1.net'

export const API_ENDPOINTS = {
  recipes: {
    list: '/api/recipes',
    create: '/api/recipes',
    get: (id: number) => `/api/recipes/${id}`,
    update: (id: number) => `/api/recipes/${id}`,
    delete: (id: number) => `/api/recipes/${id}`,
  },
  auth: {
    login: '/api/auth/login',
    register: '/api/auth/register',
    logout: '/api/auth/logout',
    user: '/api/auth/user',
  },
  favorites: {
    list: '/favorites',
    add: (recipeId: number) => `/favorites/recipes/${recipeId}`,
    remove: (recipeId: number) => `/favorites/recipes/${recipeId}`,
  },
  webApp: {
    validateInitData: '/api/web-app/validate-init-data',
    userInfo: '/api/web-app/user-info',
  },
  tags: {
    list: '/api/tags',
    create: '/api/tags',
  },
  countries: {
    list: '/api/countries',
    create: '/api/countries',
    update: (id: number) => `/api/countries/${id}`,
    delete: (id: number) => `/api/countries/${id}`,
  },
  images: {
    upload: '/api/images/upload',
  },
  user: {
    profile: '/api/user/profile',
    recipes: '/api/recipes/my',
  }
} 