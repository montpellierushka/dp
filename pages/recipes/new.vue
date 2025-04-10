<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="bg-white rounded-lg shadow-lg p-6 sm:p-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-6">Создание нового рецепта</h1>
        
        <form @submit.prevent="handleSubmit" class="space-y-8">
          <!-- Основная информация -->
          <div class="space-y-6">
            <h2 class="text-xl font-semibold text-gray-800">Основная информация</h2>
            
            <!-- Название -->
            <div>
              <label for="title" class="block text-sm font-medium text-gray-700 mb-1">Название рецепта</label>
              <input
                v-model="form.title"
                type="text"
                id="title"
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                placeholder="Введите название рецепта"
                required
              />
            </div>

            <!-- Описание -->
            <div>
              <label for="description" class="block text-sm font-medium text-gray-700 mb-1">Описание</label>
              <textarea
                v-model="form.description"
                id="description"
                rows="4"
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                placeholder="Опишите ваш рецепт"
                required
              ></textarea>
            </div>

            <!-- Страна и время -->
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <label for="country" class="block text-sm font-medium text-gray-700 mb-1">Страна</label>
                <select
                  v-model="form.country_id"
                  id="country"
                  class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  required
                >
                  <option value="">Выберите страну</option>
                  <option v-for="country in countries" :key="country.id" :value="country.id">
                    {{ country.name }}
                  </option>
                </select>
              </div>
              <div>
                <label for="cooking_time" class="block text-sm font-medium text-gray-700 mb-1">Время приготовления (мин)</label>
                <input
                  v-model.number="form.cooking_time"
                  type="number"
                  id="cooking_time"
                  class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  placeholder="Время в минутах"
                  required
                  min="1"
                />
              </div>
              <div>
                <label for="servings" class="block text-sm font-medium text-gray-700 mb-1">Количество порций</label>
                <input
                  v-model.number="form.servings"
                  type="number"
                  id="servings"
                  class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  placeholder="Количество порций"
                  required
                  min="1"
                />
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label for="difficulty" class="block text-sm font-medium text-gray-700 mb-1">Сложность</label>
                <select
                  v-model="form.difficulty"
                  id="difficulty"
                  class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  required
                >
                  <option value="">Выберите сложность</option>
                  <option value="easy">Легко</option>
                  <option value="medium">Средне</option>
                  <option value="hard">Сложно</option>
                </select>
              </div>
            </div>

            <!-- Теги -->
            <div class="space-y-4">
              <h2 class="text-xl font-semibold text-gray-800">Теги</h2>
              <div class="flex flex-wrap gap-2">
                <span 
                  v-for="tag in tags" 
                  :key="tag.id"
                  class="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full cursor-pointer hover:bg-gray-200"
                  :class="{ 'bg-blue-500 text-white': form.tags.includes(tag.id) }"
                  @click="toggleTag(tag.id)"
                >
                  {{ tag.name }}
                </span>
              </div>
            </div>
          </div>

          <!-- Ингредиенты -->
          <div class="space-y-6">
            <div class="flex justify-between items-center">
              <h2 class="text-xl font-semibold text-gray-800">Ингредиенты</h2>
              <button @click="addIngredient" type="button" class="text-blue-600 hover:text-blue-800 flex items-center gap-1">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
                Добавить ингредиент
              </button>
            </div>

            <div v-for="(ingredient, index) in form.ingredients" :key="index" class="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
              <div>
                <label :for="'ingredient-name-' + index" class="block text-sm font-medium text-gray-700 mb-1">Название</label>
                <input
                  v-model="ingredient.name"
                  :id="'ingredient-name-' + index"
                  type="text"
                  class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  placeholder="Название ингредиента"
                  required
                />
              </div>
              <div>
                <label :for="'ingredient-amount-' + index" class="block text-sm font-medium text-gray-700 mb-1">Количество</label>
                <input
                  v-model="ingredient.amount"
                  :id="'ingredient-amount-' + index"
                  type="text"
                  class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  placeholder="Количество"
                  required
                />
              </div>
              <div class="flex items-end gap-2">
                <div class="flex-1">
                  <label :for="'ingredient-unit-' + index" class="block text-sm font-medium text-gray-700 mb-1">Единица измерения</label>
                  <input
                    v-model="ingredient.unit"
                    :id="'ingredient-unit-' + index"
                    type="text"
                    class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                    placeholder="шт, г, мл"
                    required
                  />
                </div>
                <button @click="removeIngredient(index)" type="button" class="text-red-500 hover:text-red-700 p-2">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <!-- Шаги приготовления -->
          <div class="space-y-6">
            <div class="flex justify-between items-center">
              <h2 class="text-xl font-semibold text-gray-800">Шаги приготовления</h2>
              <button @click="addStep" type="button" class="text-blue-600 hover:text-blue-800 flex items-center gap-1">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
                Добавить шаг
              </button>
            </div>

            <div v-for="(step, index) in form.steps" :key="index" class="space-y-4">
              <div class="flex items-start gap-4">
                <div class="flex-1">
                  <label :for="'step-description-' + index" class="block text-sm font-medium text-gray-700 mb-1">Описание шага {{ index + 1 }}</label>
                  <textarea
                    v-model="step.description"
                    :id="'step-description-' + index"
                    rows="3"
                    class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                    placeholder="Опишите шаг приготовления"
                    required
                  ></textarea>
                </div>
                <button @click="removeStep(index)" type="button" class="text-red-500 hover:text-red-700 p-2">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>

              <div class="flex items-center gap-4">
                <div class="flex-1">
                  <label :for="'step-image-' + index" class="block text-sm font-medium text-gray-700 mb-1">Изображение шага</label>
                  <input
                    :id="'step-image-' + index"
                    type="file"
                    accept="image/*"
                    @change="(e) => handleStepImageChange(e, index)"
                    class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  />
                </div>
                <div v-if="step.image" class="w-20 h-20 relative">
                  <img :src="getImageUrl(step.image)" class="w-full h-full object-cover rounded-md" />
                  <button @click="removeStepImage(index)" class="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Основное изображение -->
          <div class="space-y-4">
            <h2 class="text-xl font-semibold text-gray-800">Основное изображение</h2>
            <div class="flex items-center gap-4">
              <div class="flex-1">
                <label for="main-image" class="block text-sm font-medium text-gray-700 mb-1">Загрузите изображение</label>
                <input
                  id="main-image"
                  type="file"
                  accept="image/*"
                  @change="handleMainImageChange"
                  class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                />
              </div>
              <div v-if="form.image" class="w-32 h-32 relative">
                <img :src="getImageUrl(form.image)" class="w-full h-full object-cover rounded-md" />
                <button @click="removeMainImage" class="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <!-- Кнопки действий -->
          <div class="flex justify-end gap-4 pt-6 border-t border-gray-200">
            <NuxtLink to="/recipes" class="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors duration-200">
              Отмена
            </NuxtLink>
            <button 
              type="submit" 
              class="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2"
              :disabled="isLoading"
            >
              <svg v-if="isLoading" class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ isLoading ? 'Создание...' : 'Создать рецепт' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useRecipes } from '~/composables/useRecipes'
import { useAuth } from '~/composables/useAuth'
import { useNotifications } from '~/composables/useNotifications'
import { useCountries } from '~/composables/useCountries'
import { useTags } from '~/composables/useTags'
import type { RecipeFormData } from '~/composables/useRecipes'

const router = useRouter()
const { user } = useAuth()
const { createRecipe } = useRecipes()
const { showSuccess, showError } = useNotifications()
const { countries, loadCountries } = useCountries()
const { tags, loadTags } = useTags()

const isLoading = ref(false)
const newTag = ref('')
const imageUrls = ref<string[]>([])

const form = ref<RecipeFormData>({
  title: '',
  description: '',
  country_id: 0,
  cooking_time: 30,
  servings: 4,
  difficulty: 'medium',
  tags: [],
  ingredients: [],
  steps: [],
  image: undefined
})

onMounted(async () => {
  await Promise.all([loadCountries(), loadTags()])
})

const toggleTag = (tagId: number) => {
  const index = form.value.tags.indexOf(tagId)
  if (index === -1) {
    form.value.tags.push(tagId)
  } else {
    form.value.tags.splice(index, 1)
  }
}

const addIngredient = () => {
  form.value.ingredients.push({
    name: '',
    amount: '',
    unit: ''
  })
}

const removeIngredient = (index: number) => {
  form.value.ingredients.splice(index, 1)
}

const addStep = () => {
  form.value.steps.push({
    description: '',
    image: undefined
  })
}

const removeStep = (index: number) => {
  form.value.steps.splice(index, 1)
}

const getImageUrl = (file: File) => {
  const url = URL.createObjectURL(file)
  imageUrls.value.push(url)
  return url
}

const handleMainImageChange = (e: Event) => {
  const input = e.target as HTMLInputElement
  if (input.files && input.files[0]) {
    form.value.image = input.files[0]
  }
}

const removeMainImage = () => {
  form.value.image = undefined
}

const handleStepImageChange = (e: Event, index: number) => {
  const input = e.target as HTMLInputElement
  if (input.files && input.files[0]) {
    form.value.steps[index].image = input.files[0]
  }
}

const removeStepImage = (index: number) => {
  form.value.steps[index].image = undefined
}

const handleSubmit = async () => {
  try {
    isLoading.value = true

    const formData = new FormData()
    formData.append('title', form.value.title)
    formData.append('description', form.value.description)
    formData.append('country_id', form.value.country_id.toString())
    formData.append('cooking_time', form.value.cooking_time.toString())
    formData.append('servings', form.value.servings.toString())
    formData.append('difficulty', form.value.difficulty)
    formData.append('tags', JSON.stringify(form.value.tags))
    formData.append('ingredients', JSON.stringify(form.value.ingredients))
    formData.append('steps', JSON.stringify(form.value.steps.map(step => ({
      description: step.description
    }))))

    if (form.value.image) {
      formData.append('image', form.value.image)
    }

    form.value.steps.forEach((step, index) => {
      if (step.image) {
        formData.append(`step_images[${index}]`, step.image)
      }
    })

    // Преобразуем FormData в RecipeFormData
    const recipeData: RecipeFormData = {
      title: form.value.title,
      description: form.value.description,
      country_id: form.value.country_id,
      cooking_time: form.value.cooking_time,
      servings: form.value.servings,
      difficulty: form.value.difficulty,
      tags: form.value.tags,
      ingredients: form.value.ingredients,
      steps: form.value.steps,
      image: form.value.image
    }

    await createRecipe(recipeData)
    showSuccess('Рецепт успешно создан')
    router.push('/recipes')
  } catch (error) {
    showError('Произошла ошибка при создании рецепта')
    console.error(error)
  } finally {
    isLoading.value = false
  }
}

onUnmounted(() => {
  imageUrls.value.forEach(url => URL.revokeObjectURL(url))
})
</script>

<style scoped>
input[type="file"] {
  @apply cursor-pointer;
}

input[type="file"]::-webkit-file-upload-button {
  @apply bg-gray-100 text-gray-700 px-4 py-2 rounded-md border border-gray-300 cursor-pointer hover:bg-gray-200 transition-colors duration-200;
}

textarea {
  @apply resize-none;
}

button:disabled {
  @apply opacity-50 cursor-not-allowed;
}
</style> 