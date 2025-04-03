<template>
  <div class="mt-8">
    <h2 class="text-xl font-semibold mb-4">Отзывы</h2>
    
    <!-- Средний рейтинг -->
    <div class="flex items-center mb-6">
      <RecipeRating 
        :rating="averageRating" 
        :count="reviews.length"
        :show-count="true"
        :interactive="false"
      />
    </div>
    
    <!-- Форма добавления отзыва -->
    <div class="bg-gray-50 rounded-lg p-6 mb-8">
      <h3 class="text-lg font-medium mb-4">{{ editingReview ? 'Редактировать отзыв' : 'Оставить отзыв' }}</h3>
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Ваше имя</label>
          <input
            v-model="form.author"
            type="text"
            required
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Оценка</label>
          <RecipeRating 
            v-model:rating="form.rating"
            :interactive="true"
            :show-count="false"
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Комментарий</label>
          <textarea
            v-model="form.comment"
            required
            rows="3"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>
        
        <div class="flex gap-4">
          <button
            type="submit"
            class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            {{ editingReview ? 'Сохранить изменения' : 'Отправить отзыв' }}
          </button>
          <button
            v-if="editingReview"
            type="button"
            @click="cancelEditing"
            class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200"
          >
            Отмена
          </button>
        </div>
      </form>
    </div>
    
    <!-- Список отзывов -->
    <div v-if="reviews.length > 0" class="space-y-6">
      <div 
        v-for="review in sortedReviews" 
        :key="review.id"
        class="bg-white rounded-lg shadow-sm p-6"
      >
        <div class="flex justify-between items-start mb-2">
          <div>
            <h4 class="font-medium text-gray-900">{{ review.author }}</h4>
            <div class="flex items-center text-sm text-gray-500">
              <RecipeRating 
                :rating="review.rating" 
                :show-count="false"
                :interactive="false"
              />
              <span class="ml-2">{{ formatDate(review.date) }}</span>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <button
              @click="toggleLike(review.id)"
              class="flex items-center gap-1 text-gray-500 hover:text-red-500 transition-colors duration-200"
              :class="{ 'text-red-500': review.isLiked }"
            >
              <Icon :name="review.isLiked ? 'heart-solid' : 'heart'" class="w-5 h-5" />
              <span class="text-sm">{{ review.likes }}</span>
            </button>
            <button
              v-if="canEditReview(review)"
              @click="startEditing(review)"
              class="text-gray-400 hover:text-blue-500 transition-colors duration-200"
            >
              <Icon name="pencil" class="w-5 h-5" />
            </button>
            <button
              v-if="canDeleteReview(review)"
              @click="deleteReview(review.id)"
              class="text-gray-400 hover:text-red-500 transition-colors duration-200"
            >
              <Icon name="trash" class="w-5 h-5" />
            </button>
          </div>
        </div>
        <p class="text-gray-600">{{ review.comment }}</p>
      </div>
    </div>

    <!-- Сообщение, если отзывов нет -->
    <div v-else class="bg-white rounded-lg shadow-sm p-6 text-center">
      <p class="text-gray-500">Пока нет отзывов. Будьте первым, кто оставит отзыв!</p>
    </div>
  </div>
</template>

<script setup>
import { useRecipesStore } from '~/stores/recipes'

const props = defineProps({
  recipeId: {
    type: Number,
    required: true
  }
})

const recipesStore = useRecipesStore()

// Состояние редактирования
const editingReview = ref(null)

// Форма для нового отзыва
const form = ref({
  author: '',
  rating: 0,
  comment: ''
})

// Получаем отзывы для текущего рецепта
const reviews = computed(() => {
  const recipe = recipesStore.getRecipeById(props.recipeId)
  return recipe?.reviews || []
})

// Сортируем отзывы по дате (новые сверху)
const sortedReviews = computed(() => {
  return [...reviews.value].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  )
})

// Вычисляем средний рейтинг
const averageRating = computed(() => {
  if (!reviews.value.length) return 0
  const sum = reviews.value.reduce((acc, review) => acc + review.rating, 0)
  return sum / reviews.value.length
})

// Форматируем дату
const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// Проверяем, может ли пользователь редактировать отзыв
const canEditReview = (review) => {
  // В реальном приложении здесь должна быть проверка на владельца отзыва
  return true
}

// Проверяем, может ли пользователь удалить отзыв
const canDeleteReview = (review) => {
  // В реальном приложении здесь должна быть проверка на владельца отзыва
  return true
}

// Начинаем редактирование отзыва
const startEditing = (review) => {
  editingReview.value = review
  form.value = {
    author: review.author,
    rating: review.rating,
    comment: review.comment
  }
}

// Отменяем редактирование
const cancelEditing = () => {
  editingReview.value = null
  form.value = {
    author: '',
    rating: 0,
    comment: ''
  }
}

// Обработка отправки формы
const handleSubmit = () => {
  if (editingReview.value) {
    // Обновляем существующий отзыв
    recipesStore.updateReview(props.recipeId, editingReview.value.id, {
      author: form.value.author,
      rating: form.value.rating,
      comment: form.value.comment
    })
    cancelEditing()
  } else {
    // Добавляем новый отзыв
    recipesStore.addReview(props.recipeId, {
      author: form.value.author,
      rating: form.value.rating,
      comment: form.value.comment
    })
    
    // Очищаем форму
    form.value = {
      author: '',
      rating: 0,
      comment: ''
    }
  }
}

// Удаление отзыва
const deleteReview = (reviewId) => {
  if (confirm('Вы уверены, что хотите удалить этот отзыв?')) {
    recipesStore.deleteReview(props.recipeId, reviewId)
  }
}

// Переключение лайка
const toggleLike = (reviewId) => {
  recipesStore.toggleLike(props.recipeId, reviewId)
}
</script> 