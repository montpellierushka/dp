import axios from 'axios';
import type { InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

export default defineNuxtPlugin(() => {
    const config = useRuntimeConfig();
    const API_URL = config.public.apiUrl || 'https://montpellierushka-backend-7c0b.twc1.net';

    const api = axios.create({
        baseURL: API_URL,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        timeout: 10000
    });

    // Интерцептор для добавления initData
    api.interceptors.request.use((config) => {
        // Отключаем добавление заголовка X-Telegram-Init-Data
        // if (typeof window !== 'undefined' && window.Telegram?.WebApp?.initData) {
        //     config.headers['X-Telegram-Init-Data'] = window.Telegram.WebApp.initData;
        // }
        return config;
    });

    // Интерцептор для обработки ошибок
    api.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response) {
                console.error('Ошибка API:', {
                    status: error.response.status,
                    data: error.response.data,
                    headers: error.response.headers
                });
            } else if (error.request) {
                console.error('Ошибка сети:', error.request);
            } else {
                console.error('Ошибка:', error.message);
            }
            return Promise.reject(error);
        }
    );

    return {
        provide: {
            api,
            webAppApi: {
                validateInitData: (initData: string) => 
                    api.post('/web-app/validate-init-data', { initData }),

                getUserInfo: () => 
                    api.get('/web-app/user-info'),

                getMessages: (params?: { limit?: number; offset?: number }) => 
                    api.get('/web-app/messages', { params }),
            },
            recipeApi: {
                getRecipes: (params?: { 
                    page?: number; 
                    per_page?: number;
                    country_id?: number;
                    tag_id?: number;
                    search?: string;
                }) => 
                    api.get('/api/recipes', { params }),

                getRecipe: (id: number) => 
                    api.get(`/api/recipes/${id}`),

                createRecipe: (data: FormData) => 
                    api.post('/api/recipes', data, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    }),

                updateRecipe: (id: number, data: FormData) => 
                    api.post(`/api/recipes/${id}`, data, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    }),

                deleteRecipe: (id: number) => 
                    api.delete(`/api/recipes/${id}`),
            },
            routeApi: {
                getRoutes: (params?: { 
                    page?: number; 
                    per_page?: number;
                    country_id?: number;
                    search?: string;
                }) => 
                    api.get('/routes', { params }),

                getRoute: (id: number) => 
                    api.get(`/routes/${id}`),

                createRoute: (data: FormData) => 
                    api.post('/routes', data, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    }),

                updateRoute: (id: number, data: FormData) => 
                    api.post(`/routes/${id}`, data, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    }),

                deleteRoute: (id: number) => 
                    api.delete(`/routes/${id}`),
            },
            countryApi: {
                getCountries: () => 
                    api.get('/countries'),

                getCountry: (id: number) => 
                    api.get(`/countries/${id}`),

                getCountryRecipes: (id: number) => 
                    api.get(`/countries/${id}/recipes`),

                getCountryRoutes: (id: number) => 
                    api.get(`/countries/${id}/routes`),
            },
            tagApi: {
                getTags: () => 
                    api.get('/tags'),

                getTag: (id: number) => 
                    api.get(`/tags/${id}`),

                getTagRecipes: (id: number) => 
                    api.get(`/tags/${id}/recipes`),
            },
            favoriteApi: {
                getFavorites: () => 
                    api.get('/favorites'),

                addRecipe: (id: number) => 
                    api.post(`/favorites/recipes/${id}`),

                removeRecipe: (id: number) => 
                    api.delete(`/favorites/recipes/${id}`),

                addRoute: (id: number) => 
                    api.post(`/favorites/routes/${id}`),

                removeRoute: (id: number) => 
                    api.delete(`/favorites/routes/${id}`),
            },
            likeApi: {
                likeRecipe: (id: number) => 
                    api.post(`/likes/recipes/${id}`),

                likeRoute: (id: number) => 
                    api.post(`/likes/routes/${id}`),
            },
            commentApi: {
                getRecipeComments: (id: number, params?: { page?: number }) => 
                    api.get(`/recipes/${id}/comments`, { params }),

                addRecipeComment: (id: number, text: string) => 
                    api.post(`/recipes/${id}/comments`, { text }),

                getRouteComments: (id: number, params?: { page?: number }) => 
                    api.get(`/routes/${id}/comments`, { params }),

                addRouteComment: (id: number, text: string) => 
                    api.post(`/routes/${id}/comments`, { text }),

                deleteComment: (id: number) => 
                    api.delete(`/comments/${id}`),
            },
            uploadApi: {
                uploadImage: (file: File) => {
                    const formData = new FormData();
                    formData.append('image', file);
                    return api.post('/upload/image', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    });
                },

                deleteFile: (path: string) => 
                    api.delete(`/upload/${path}`),
            },
            statsApi: {
                getStats: () => 
                    api.get('/stats'),

                getCountryStats: () => 
                    api.get('/stats/countries'),

                getRecipeStats: () => 
                    api.get('/stats/recipes'),

                getRouteStats: () => 
                    api.get('/stats/routes'),
            },
        },
    };
});
 