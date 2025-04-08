import { ref } from 'vue'
import { useApi } from './useApi'
import type { Recipe } from './useRecipes'
import { API_ENDPOINTS } from '~/config/api'

interface ApiResponse {
    status: string;
    message?: string;
    data?: {
        recipes?: {
            data: Recipe[];
        };
        routes?: any[];
    };
}

export const useFavorites = () => {
    const api = useApi()
    const favorites = ref<Recipe[]>([])
    const loading = ref(false)
    const error = ref('')

    const loadFavorites = async () => {
        try {
            loading.value = true
            error.value = ''
            
            const response = await $fetch<ApiResponse>(API_ENDPOINTS.favorites.list)
            if (response?.data?.recipes?.data) {
                favorites.value = response.data.recipes.data || []
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
            
            await $fetch(API_ENDPOINTS.favorites.add(recipeId), {
                method: 'POST'
            })
            
            // Обновляем список избранного
            await loadFavorites()
            return true
        } catch (e) {
            console.error('Error adding to favorites:', e)
            error.value = 'Ошибка при добавлении в избранное'
            return false
        } finally {
            loading.value = false
        }
    }

    const removeFromFavorites = async (recipeId: number) => {
        try {
            loading.value = true
            error.value = ''
            
            await $fetch(API_ENDPOINTS.favorites.remove(recipeId), {
                method: 'DELETE'
            })
            
            // Обновляем список избранного
            await loadFavorites()
            return true
        } catch (e) {
            console.error('Error removing from favorites:', e)
            error.value = 'Ошибка при удалении из избранного'
            return false
        } finally {
            loading.value = false
        }
    }

    const toggleFavorite = async (recipeId: number) => {
        try {
            const recipe = favorites.value.find(r => r.id === recipeId)
            if (recipe) {
                return await removeFromFavorites(recipeId)
            } else {
                return await addToFavorites(recipeId)
            }
        } catch (e) {
            console.error('Error toggling favorite:', e)
            throw e
        }
    }

    return {
        favorites,
        loading,
        error,
        loadFavorites,
        addToFavorites,
        removeFromFavorites,
        toggleFavorite
    }
} 