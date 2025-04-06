import { ref } from 'vue'
import { useApi } from './useApi'
import type { Recipe } from './useRecipes'

export const useFavorites = () => {
    const api = useApi()
    const favorites = ref<Recipe[]>([])

    const loadFavorites = async () => {
        try {
            const response = await api.get<Recipe[]>('/api/recipes/favorites')
            favorites.value = response
        } catch (e) {
            console.error('Error loading favorites:', e)
            throw e
        }
    }

    const addToFavorites = async (recipeId: number) => {
        try {
            const response = await api.post<Recipe>(`/api/recipes/${recipeId}/favorite`)
            return response
        } catch (e) {
            console.error('Error adding to favorites:', e)
            throw e
        }
    }

    const removeFromFavorites = async (recipeId: number) => {
        try {
            const response = await api.del<Recipe>(`/api/recipes/${recipeId}/favorite`)
            return response
        } catch (e) {
            console.error('Error removing from favorites:', e)
            throw e
        }
    }

    const toggleFavorite = async (recipeId: number) => {
        try {
            const recipe = favorites.value.find((r: Recipe) => r.id === recipeId)
            if (recipe?.is_favorite) {
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
        loadFavorites,
        addToFavorites,
        removeFromFavorites,
        toggleFavorite
    }
} 