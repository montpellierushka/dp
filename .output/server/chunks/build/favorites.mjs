import { defineStore } from 'pinia';

const useFavoritesStore = defineStore("favorites", {
  state: () => ({
    favoriteRecipes: []
  }),
  actions: {
    initializeFromLocalStorage() {
    },
    toggleFavorite(recipeId) {
      const index = this.favoriteRecipes.indexOf(recipeId);
      if (index === -1) {
        this.favoriteRecipes.push(recipeId);
      } else {
        this.favoriteRecipes.splice(index, 1);
      }
    },
    isFavorite(recipeId) {
      return this.favoriteRecipes.includes(recipeId);
    }
  },
  getters: {
    getFavoriteRecipes: (state) => {
      return state.favoriteRecipes;
    }
  }
});

export { useFavoritesStore as u };
//# sourceMappingURL=favorites.mjs.map
