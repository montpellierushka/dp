import { defineStore } from 'pinia'

interface Review {
  id: number
  recipeId: number
  author: string
  rating: number
  comment: string
  date: string
}

export const useReviewsStore = defineStore('reviews', {
  state: () => ({
    reviews: [
      {
        id: 1,
        recipeId: 1,
        author: 'Анна',
        rating: 5,
        comment: 'Отличный рецепт! Паста получилась очень вкусной и нежной.',
        date: '2024-03-15'
      },
      {
        id: 2,
        recipeId: 1,
        author: 'Иван',
        rating: 4,
        comment: 'Хороший рецепт, но можно добавить больше перца.',
        date: '2024-03-16'
      },
      {
        id: 3,
        recipeId: 2,
        author: 'Мария',
        rating: 5,
        comment: 'Классический борщ, как у бабушки!',
        date: '2024-03-17'
      }
    ] as Review[]
  }),

  getters: {
    getReviewsByRecipeId: (state) => (recipeId: number) => {
      return state.reviews.filter(review => review.recipeId === recipeId)
    },

    getAverageRating: (state) => (recipeId: number) => {
      const recipeReviews = state.reviews.filter(review => review.recipeId === recipeId)
      if (recipeReviews.length === 0) return 0
      const sum = recipeReviews.reduce((acc, review) => acc + review.rating, 0)
      return sum / recipeReviews.length
    }
  },

  actions: {
    addReview(review: Omit<Review, 'id' | 'date'>) {
      const newReview: Review = {
        ...review,
        id: Date.now(),
        date: new Date().toISOString().split('T')[0]
      }
      this.reviews.push(newReview)
    },

    deleteReview(id: number) {
      const index = this.reviews.findIndex(review => review.id === id)
      if (index !== -1) {
        this.reviews.splice(index, 1)
      }
    }
  }
}) 