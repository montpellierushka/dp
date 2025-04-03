import { defineStore } from 'pinia'

export const useFavoritesStore = defineStore('favorites', {
  state: () => ({
    favoriteRecipes: [] as number[]
  }),
  
  actions: {
    initializeFromLocalStorage() {
      if (process.client) {
        const stored = localStorage.getItem('favorites')
        if (stored) {
          this.favoriteRecipes = JSON.parse(stored)
        }
      }
    },

    toggleFavorite(recipeId: number) {
      const index = this.favoriteRecipes.indexOf(recipeId)
      if (index === -1) {
        this.favoriteRecipes.push(recipeId)
      } else {
        this.favoriteRecipes.splice(index, 1)
      }
      // Сохраняем в localStorage только на клиенте
      if (process.client) {
        localStorage.setItem('favorites', JSON.stringify(this.favoriteRecipes))
      }
    },
    
    isFavorite(recipeId: number) {
      return this.favoriteRecipes.includes(recipeId)
    }
  },
  
  getters: {
    getFavoriteRecipes: (state) => {
      return state.favoriteRecipes
    }
  }
}) 