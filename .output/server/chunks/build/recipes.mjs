import { defineStore } from 'pinia';

const useRecipesStore = defineStore("recipes", {
  state: () => ({
    recipes: [
      {
        id: 1,
        title: "Паста Карбонара",
        description: "Классическая итальянская паста с яйцами, сыром пармезан, гуанчиале и черным перцем.",
        country: "Италия",
        cookingTime: 20,
        ingredients: [
          "400г спагетти",
          "200г гуанчиале",
          "4 яичных желтка",
          "100г пармезана",
          "Свежемолотый черный перец",
          "Соль"
        ],
        steps: [
          "Нарежьте гуанчиале небольшими кубиками",
          "Обжарьте гуанчиале на среднем огне до хрустящей корочки",
          "Отварите спагетти в подсоленной воде до состояния аль денте",
          "Смешайте яичные желтка с тертым пармезаном и черным перцем",
          "Слейте воду со спагетти, сохранив немного воды",
          "Смешайте спагетти с соусом, добавив немного воды от пасты",
          "Подавайте сразу же, посыпав дополнительным пармезаном и перцем"
        ],
        tags: ["Итальянская кухня", "Паста", "Быстрое приготовление"],
        rating: 4.5,
        imageUrl: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
        reviews: [
          {
            id: 1,
            recipeId: 1,
            author: "Анна",
            rating: 5,
            comment: "Отличный рецепт! Паста получилась просто восхитительной.",
            date: "2024-03-15",
            likes: 12,
            isLiked: false
          },
          {
            id: 2,
            recipeId: 1,
            author: "Михаил",
            rating: 4,
            comment: "Вкусно, но гуанчиале было сложно найти.",
            date: "2024-03-20",
            likes: 5,
            isLiked: false
          }
        ]
      },
      {
        id: 2,
        title: "Борщ",
        description: "Традиционный украинский суп из свеклы, капусты и мяса.",
        country: "Украина",
        cookingTime: 120,
        ingredients: [
          "500г говядины",
          "2 свеклы",
          "300г капусты",
          "2 картофелины",
          "1 морковь",
          "1 луковица",
          "2 ст.л. томатной пасты",
          "Соль, перец, лавровый лист"
        ],
        steps: [
          "Отварите мясо до готовности",
          "Нарежьте овощи соломкой",
          "Обжарьте лук и морковь",
          "Добавьте томатную пасту и свеклу",
          "Добавьте нарезанную капусту и картофель",
          "Варите до готовности овощей",
          "Подавайте со сметаной и зеленью"
        ],
        tags: ["Украинская кухня", "Суп", "Традиционное блюдо"],
        rating: 4.8,
        imageUrl: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
        reviews: [
          {
            id: 3,
            recipeId: 2,
            author: "Ольга",
            rating: 5,
            comment: "Лучший борщ, который я когда-либо готовила!",
            date: "2024-03-10",
            likes: 8,
            isLiked: false
          }
        ]
      },
      {
        id: 3,
        title: "Пад Тай",
        description: "Тайская жареная лапша с курицей, креветками и арахисом.",
        country: "Таиланд",
        cookingTime: 30,
        ingredients: [
          "200г рисовой лапши",
          "200г куриного филе",
          "100г креветок",
          "2 яйца",
          "100г ростков фасоли",
          "2 ст.л. рыбного соуса",
          "2 ст.л. тамариндовой пасты",
          "Арахис, лайм, чили"
        ],
        steps: [
          "Замочите рисовую лапшу в теплой воде",
          "Нарежьте курицу и обжарьте",
          "Добавьте креветки и яйца",
          "Добавьте лапшу и соусы",
          "Добавьте ростки фасоли",
          "Подавайте с дольками лайма и арахисом"
        ],
        tags: ["Тайская кухня", "Азиатская кухня", "Острое"],
        rating: 4.2,
        imageUrl: "https://images.unsplash.com/photo-1541014741257-de529411b96a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
        reviews: []
      }
    ]
  }),
  getters: {
    getRecipeById: (state) => (id) => {
      return state.recipes.find((recipe) => recipe.id === id);
    },
    getRecipesByCountry: (state) => (country) => {
      return state.recipes.filter((recipe) => recipe.country === country);
    },
    getRecipesByTag: (state) => (tag) => {
      return state.recipes.filter((recipe) => recipe.tags.includes(tag));
    },
    getAverageRating: (state) => (recipeId) => {
      var _a;
      const recipe = state.recipes.find((r) => r.id === recipeId);
      if (!((_a = recipe == null ? void 0 : recipe.reviews) == null ? void 0 : _a.length)) return 0;
      const sum = recipe.reviews.reduce((acc, review) => acc + review.rating, 0);
      return sum / recipe.reviews.length;
    }
  },
  actions: {
    addRecipe(recipe) {
      this.recipes.push(recipe);
    },
    updateRecipe(recipeId, updatedRecipe) {
      const index = this.recipes.findIndex((r) => r.id === recipeId);
      if (index !== -1) {
        this.recipes[index] = { ...this.recipes[index], ...updatedRecipe };
      }
    },
    deleteRecipe(recipeId) {
      this.recipes = this.recipes.filter((recipe) => recipe.id !== recipeId);
    },
    addReview(recipeId, review) {
      const recipe = this.recipes.find((r) => r.id === recipeId);
      if (recipe) {
        const newReview = {
          id: Date.now(),
          recipeId,
          ...review,
          date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
          likes: 0,
          isLiked: false
        };
        if (!recipe.reviews) {
          recipe.reviews = [];
        }
        recipe.reviews.push(newReview);
        recipe.rating = this.getAverageRating(recipeId);
      }
    },
    updateReview(recipeId, reviewId, updatedReview) {
      const recipe = this.recipes.find((r) => r.id === recipeId);
      if (recipe == null ? void 0 : recipe.reviews) {
        const reviewIndex = recipe.reviews.findIndex((r) => r.id === reviewId);
        if (reviewIndex !== -1) {
          recipe.reviews[reviewIndex] = {
            ...recipe.reviews[reviewIndex],
            ...updatedReview
          };
        }
      }
    },
    deleteReview(recipeId, reviewId) {
      const recipe = this.recipes.find((r) => r.id === recipeId);
      if (recipe == null ? void 0 : recipe.reviews) {
        recipe.reviews = recipe.reviews.filter((r) => r.id !== reviewId);
        recipe.rating = this.getAverageRating(recipeId);
      }
    },
    toggleLike(recipeId, reviewId) {
      const recipe = this.recipes.find((r) => r.id === recipeId);
      if (recipe == null ? void 0 : recipe.reviews) {
        const review = recipe.reviews.find((r) => r.id === reviewId);
        if (review) {
          review.isLiked = !review.isLiked;
          review.likes += review.isLiked ? 1 : -1;
        }
      }
    }
  }
});

export { useRecipesStore as u };
//# sourceMappingURL=recipes.mjs.map
