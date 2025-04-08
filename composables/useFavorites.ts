import { ref } from 'vue'
import { useApi } from './useApi'
import type { Recipe } from '~/types/api'
import { API_ENDPOINTS } from '~/config/api'

interface ApiResponse {
    status: string;
    data: {
        recipes: Recipe[];
        routes: any[];
    };
}

export const useFavorites = () => {
    const api = useApi()
    const favorites = ref<Recipe[]>([])
    const loading = ref(false)
    const error = ref<string | null>(null)

    const loadFavorites = async () => {
        try {
            loading.value = true
            error.value = null
            const response = await api.get<ApiResponse>(API_ENDPOINTS.favorites.list)
            
            if (response.data && response.data.recipes) {
                favorites.value = response.data.recipes
            } else {
                console.error('Неожиданная структура ответа:', response)
                favorites.value = []
            }
        } catch (e: any) {
            error.value = e.message || 'Ошибка при загрузке избранного'
            console.error('Error loading favorites:', e)
        } finally {
            loading.value = false
        }
    }

    const addToFavorites = async (recipeId: number) => {
        try {
            loading.value = true
            error.value = null
            await api.post(API_ENDPOINTS.favorites.add(recipeId))
            await loadFavorites() // Перезагружаем список после добавления
        } catch (e: any) {
            error.value = e.message || 'Ошибка при добавлении в избранное'
            console.error('Error adding to favorites:', e)
            throw e
        } finally {
            loading.value = false
        }
    }

    const removeFromFavorites = async (recipeId: number) => {
        try {
            loading.value = true
            error.value = null
            await api.del(API_ENDPOINTS.favorites.remove(recipeId))
            favorites.value = favorites.value.filter(r => r.id !== recipeId) // Обновляем локальный список
        } catch (e: any) {
            error.value = e.message || 'Ошибка при удалении из избранного'
            console.error('Error removing from favorites:', e)
            throw e
        } finally {
            loading.value = false
        }
    }

    const toggleFavorite = async (recipeId: number) => {
        try {
            const recipe = favorites.value.find(r => r.id === recipeId)
            if (recipe) {
                await removeFromFavorites(recipeId)
            } else {
                await addToFavorites(recipeId)
            }
        } catch (e: any) {
            error.value = e.message || 'Ошибка при изменении избранного'
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