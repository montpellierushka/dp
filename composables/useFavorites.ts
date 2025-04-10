import { ref } from 'vue'
import type { Recipe } from './useRecipes'
import { useNuxtApp } from 'nuxt/app'

interface ApiResponse<T> {
    status: string
    data: {
        recipes: {
            data: T[]
            total: number
            per_page: number
            current_page: number
            last_page: number
        }
    }
}

interface ApiSuccessResponse {
    status: 'success'
    data: any
}

export const useFavorites = () => {
    const nuxtApp = useNuxtApp()
    const $api = nuxtApp.$api as {
        get: <T>(url: string) => Promise<{ data: T }>
        post: <T>(url: string, data?: any) => Promise<{ data: T }>
        delete: <T>(url: string) => Promise<{ data: T }>
    }
    const favorites = ref<Recipe[]>([])
    const loading = ref(false)
    const error = ref('')

    const loadFavorites = async () => {
        try {
            loading.value = true
            error.value = ''
            
            const response = await $api.get<ApiResponse<Recipe>>('/api/favorites')
            if (response?.data?.data?.recipes?.data) {
                favorites.value = response.data.data.recipes.data
            }
        } catch (e) {
            console.error('Error loading favorites:', e)
            error.value = 'Ошибка при загрузке избранного'
        } finally {
            loading.value = false
        }
    }

    const addToFavorites = async (recipeId: number) => {
        try {
            loading.value = true
            error.value = ''
            
            const response = await $api.post<ApiSuccessResponse>(`/api/favorites/recipes/${recipeId}`)
            if (response?.data?.status === 'success') {
                await loadFavorites()
                return true
            }
            return false
        } catch (e: any) {
            console.error('Error adding to favorites:', e)
            if (e.response?.status === 400 && e.response?.data?.message?.includes('уже добавлен')) {
                return true
            }
            error.value = e.response?.data?.message || 'Ошибка при добавлении в избранное'
            return false
        } finally {
            loading.value = false
        }
    }

    const removeFromFavorites = async (recipeId: number) => {
        try {
            loading.value = true
            error.value = ''
            
            const response = await $api.delete<ApiSuccessResponse>(`/api/favorites/recipes/${recipeId}`)
            if (response?.data?.status === 'success') {
                await loadFavorites()
                return true
            }
            return false
        } catch (e: any) {
            console.error('Error removing from favorites:', e)
            error.value = e.response?.data?.message || 'Ошибка при удалении из избранного'
            return false
        } finally {
            loading.value = false
        }
    }

    const isFavorite = (recipeId: number) => {
        return favorites.value.some(recipe => recipe.id === recipeId)
    }

    const toggleFavorite = async (recipe: Recipe) => {
        try {
            loading.value = true
            error.value = ''
            
            if (recipe.is_favorite) {
                return await removeFromFavorites(recipe.id)
            } else {
                return await addToFavorites(recipe.id)
            }
        } catch (e: any) {
            console.error('Error toggling favorite:', e)
            error.value = e.response?.data?.message || 'Ошибка при изменении статуса избранного'
            return false
        } finally {
            loading.value = false
        }
    }

    return {
        favorites,
        loading,
        error,
        loadFavorites,
        addToFavorites,
        removeFromFavorites,
        toggleFavorite,
        isFavorite
    }
} 