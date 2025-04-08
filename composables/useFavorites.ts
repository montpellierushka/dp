import { ref } from 'vue'
import { useApi } from './useApi'
import type { Recipe } from './useRecipes'
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
    const error = ref('')

    const loadFavorites = async () => {
        try {
            const response = await api.get<ApiResponse>(API_ENDPOINTS.favorites.list)
            console.log('Ответ от сервера:', response)
            
            if (response.data && response.data.recipes) {
                favorites.value = response.data.recipes
            } else {
                console.error('Неожиданная структура ответа:', response)
                favorites.value = []
            }
        } catch (e) {
            console.error('Error loading favorites:', e)
            error.value = 'Ошибка при загрузке избранного'
        }
    }

    const addToFavorites = async (recipeId: number) => {
        try {
            await api.post(API_ENDPOINTS.favorites.add(recipeId))
            await loadFavorites() // Перезагружаем список после добавления
        } catch (e) {
            console.error('Error adding to favorites:', e)
            throw e
        }
    }

    const removeFromFavorites = async (recipeId: number) => {
        try {
            await api.del(API_ENDPOINTS.favorites.remove(recipeId))
            favorites.value = favorites.value.filter(r => r.id !== recipeId) // Обновляем локальный список
        } catch (e) {
            console.error('Error removing from favorites:', e)
            throw e
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