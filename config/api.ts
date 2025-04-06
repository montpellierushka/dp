export const API_BASE_URL = process.env.NUXT_PUBLIC_API_URL || 'https://montpellierushka-backend-7c0b.twc1.net/api/'

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
    list: '/api/favorites',
    add: (recipeId: number) => `/api/favorites/${recipeId}`,
    remove: (recipeId: number) => `/api/favorites/${recipeId}`,
  },
  webApp: {
    validateInitData: '/api/web-app/validate-init-data',
    userInfo: '/api/web-app/user-info',
  },
} 