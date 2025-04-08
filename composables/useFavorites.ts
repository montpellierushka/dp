import { ref } from 'vue'
import type { Recipe } from './useRecipes'

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
    const { $api } = useNuxtApp()
    const favorites = ref<Recipe[]>([])
    const loading = ref(false)
    const error = ref('')

    const loadFavorites = async () => {
        try {
            loading.value = true
            error.value = ''
            
            const response = await $api.get('/api/favorites')
            if (response?.data?.data?.recipes?.data) {
                favorites.value = response.data.data.recipes.data || []
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
            
            await $api.post(`/api/favorites/recipes/${recipeId}`)
            
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
            
            await $api.delete(`/api/favorites/recipes/${recipeId}`)
            
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