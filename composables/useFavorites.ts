import { ref } from 'vue'
import { useApi } from './useApi'
import type { Recipe } from './useRecipes'
import { API_ENDPOINTS } from '~/config/api'

interface ApiResponse {
    status: string;
    message?: string;
    data?: {
        recipes?: Recipe[];
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
            const response = await api.get<ApiResponse>(API_ENDPOINTS.favorites.list)
            if (response?.data?.recipes) {
                favorites.value = response.data.recipes
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
            const response = await api.post<ApiResponse>(API_ENDPOINTS.favorites.add(recipeId))
            if (response?.status === 'success') {
                return true
            }
            return false
        } catch (e) {
            console.error('Error adding to favorites:', e)
            throw e
        }
    }

    const removeFromFavorites = async (recipeId: number) => {
        try {
            const response = await api.del<ApiResponse>(API_ENDPOINTS.favorites.remove(recipeId))
            if (response?.status === 'success') {
                return true
            }
            return false
        } catch (e) {
            console.error('Error removing from favorites:', e)
            throw e
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