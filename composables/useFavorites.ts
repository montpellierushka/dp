import { ref } from 'vue'
import type { Recipe } from './useRecipes'

interface ApiResponse<T> {
    data: T
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
            
            const response = await $api.get<ApiResponse<Recipe[]>>('/api/favorites')
            if (response?.data?.data) {
                favorites.value = response.data.data
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
        } catch (e: any) {
            console.error('Error adding to favorites:', e)
            // Если рецепт уже в избранном, считаем это успешным результатом
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
            
            await $api.delete(`/api/favorites/recipes/${recipeId}`)
            
            // Обновляем список избранного
            await loadFavorites()
            return true
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

    const toggleFavorite = async (recipeId: number) => {
        try {
            if (isFavorite(recipeId)) {
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
        toggleFavorite,
        isFavorite
    }
} 