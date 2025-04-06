<template>
  <div class="min-h-screen bg-gray-100">
    <Navbar />
    <main class="max-w-3xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="px-4 py-6 sm:px-0">
        <div class="bg-white rounded-lg shadow-md p-6">
          <h1 class="text-3xl font-bold text-gray-900 mb-6">Редактировать рецепт</h1>
          
          <form @submit.prevent="submitForm" class="space-y-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Изображение</label>
              <div class="flex items-center gap-4">
                <img
                  v-if="form.image"
                  :src="form.image"
                  class="w-32 h-32 object-cover rounded-lg"
                />
                <input
                  type="file"
                  accept="image/*"
                  class="file-input file-input-bordered w-full"
                  @change="handleImageUpload"
                />
              </div>
            </div>

            <div>
              <label for="title" class="block text-sm font-medium text-gray-700 mb-2">Название</label>
              <input
                id="title"
                v-model="form.title"
                type="text"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
            </div>

            <div>
              <label for="description" class="block text-sm font-medium text-gray-700 mb-2">Описание</label>
              <textarea
                id="description"
                v-model="form.description"
                rows="3"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
            </div>

            <div>
              <label for="country" class="block text-sm font-medium text-gray-700 mb-2">Страна</label>
              <select
                id="country"
                v-model="form.country_id"
                class="select select-bordered"
                required
              >
                <option value="">Выберите страну</option>
                <option
                  v-for="country in countries"
                  :key="country.id"
                  :value="country.id"
                >
                  {{ country.name }}
                </option>
              </select>
            </div>

            <div>
              <label for="cookingTime" class="block text-sm font-medium text-gray-700 mb-2">Время приготовления (минуты)</label>
              <input
                id="cookingTime"
                v-model.number="form.cooking_time"
                type="number"
                min="1"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
            </div>

            <div>
              <label for="ingredients" class="block text-sm font-medium text-gray-700 mb-2">Ингредиенты</label>
              <div class="space-y-2">
                <div 
                  v-for="(ingredient, index) in form.ingredients" 
                  :key="index"
                  class="flex items-center space-x-2"
                >
                  <input
                    v-model="ingredient.name"
                    type="text"
                    required
                    class="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  >
                  <input
                    v-model="ingredient.amount"
                    type="text"
                    required
                    class="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  >
                  <input
                    v-model="ingredient.unit"
                    type="text"
                    required
                    class="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  >
                  <button
                    type="button"
                    @click="removeIngredient(index)"
                    class="p-2 text-red-500 hover:text-red-600"
                  >
                    <Icon name="trash" class="w-5 h-5" />
                  </button>
                </div>
                <button
                  type="button"
                  @click="addIngredient"
                  class="text-blue-500 hover:text-blue-600 text-sm font-medium"
                >
                  + Добавить ингредиент
                </button>
              </div>
            </div>

            <div>
              <label for="steps" class="block text-sm font-medium text-gray-700 mb-2">Шаги приготовления</label>
              <div class="space-y-2">
                <div 
                  v-for="(step, index) in form.steps" 
                  :key="index"
                  class="flex items-start space-x-2"
                >
                  <span class="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center mt-2">
                    {{ index + 1 }}
                  </span>
                  <textarea
                    :value="step.description"
                    @input="(e: Event) => {
                      const target = e.target as HTMLTextAreaElement;
                      form.steps[index].description = target.value;
                    }"
                    rows="2"
                    required
                    class="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  ></textarea>
                  <button
                    type="button"
                    @click="removeStep(index)"
                    class="p-2 text-red-500 hover:text-red-600 mt-2"
                  >
                    <Icon name="trash" class="w-5 h-5" />
                  </button>
                </div>
                <button
                  type="button"
                  @click="addStep"
                  class="text-blue-500 hover:text-blue-600 text-sm font-medium"
                >
                  + Добавить шаг
                </button>
              </div>
            </div>

            <div>
              <label for="tags" class="block text-sm font-medium text-gray-700 mb-2">Теги</label>
              <div class="space-y-2">
                <div 
                  v-for="(tag, index) in tags" 
                  :key="index"
                  class="flex items-center space-x-2"
                >
                  <input
                    type="checkbox"
                    :value="tag.id"
                    v-model="form.tags"
                    class="checkbox checkbox-primary"
                  >
                  <span class="label-text">{{ tag.name }}</span>
                </div>
              </div>
            </div>

            <div class="flex justify-end space-x-4">
              <NuxtLink
                :to="`/recipes/${route.params.id}`"
                class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Отмена
              </NuxtLink>
              <button
                type="submit"
                class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Сохранить изменения
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useRecipesStore } from '~/stores/recipes'
import { useRouter, useRoute } from 'vue-router'
import { $api } from '~/services/api'
import type { Recipe } from '~/types/recipe'

interface Ingredient {
  name: string
  amount: string
  unit: string
}

interface RecipeForm {
  title: string
  description: string
  country_id: string
  cooking_time: number
  servings: number
  ingredients: Ingredient[]
  steps: { description: string; image: File | null }[]
  tags: string[]
  image: File | null
}

const recipesStore = useRecipesStore()
const router = useRouter()
const route = useRoute()

// Загрузка данных рецепта
const recipe = ref<Recipe | null>(null)

// Состояние формы
const form = ref<RecipeForm>({
  title: '',
  description: '',
  country_id: '',
  cooking_time: 30,
  servings: 1,
  ingredients: [],
  steps: [],
  tags: [],
  image: null
})

// Инициализация формы данными рецепта
onMounted(async () => {
  try {
    const response = await $api.get<{ data: Recipe }>(`/recipes/${route.params.id}`)
    recipe.value = response.data.data
    
    // Преобразуем данные рецепта в формат формы
    form.value = {
      title: response.data.data.title,
      description: response.data.data.description,
      country_id: response.data.data.country_id,
      cooking_time: response.data.data.cooking_time,
      servings: response.data.data.servings,
      ingredients: response.data.data.ingredients.map(ing => ({
        name: ing.name,
        amount: ing.amount,
        unit: ing.unit
      })),
      steps: response.data.data.steps.map(step => ({
        description: step.description,
        image: step.image ? new File([step.image], step.image.name) : null
      })),
      tags: response.data.data.tags.map(tag => tag.id),
      image: response.data.data.image ? new File([response.data.data.image], response.data.data.image.name) : null
    }
  } catch (error) {
    console.error('Ошибка при загрузке рецепта:', error)
    router.push('/recipes')
  }
})

const newTag = ref('')

// Методы для работы с формой
const addIngredient = () => {
  form.value.ingredients.push({ name: '', amount: '', unit: '' })
}

const removeIngredient = (index: number) => {
  form.value.ingredients.splice(index, 1)
}

const addStep = () => {
  form.value.steps.push({ description: '', image: null })
}

const removeStep = (index: number) => {
  form.value.steps.splice(index, 1)
}

const addTag = () => {
  if (newTag.value.trim() && !form.value.tags.includes(newTag.value.trim())) {
    form.value.tags.push(newTag.value.trim())
    newTag.value = ''
  }
}

const removeTag = (index: number) => {
  form.value.tags.splice(index, 1)
}

const handleImageUpload = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files[0]) {
    form.value.image = input.files[0]
  }
}

const handleStepImageUpload = (event: Event, index: number) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files[0]) {
    form.value.steps[index].image = input.files[0]
  }
}

// Обработка отправки формы
const submitForm = async () => {
  try {
    const updatedRecipe: RecipeForm = {
      title: form.value.title,
      description: form.value.description,
      country_id: form.value.country_id,
      cooking_time: form.value.cooking_time,
      servings: form.value.servings,
      ingredients: form.value.ingredients.filter(ing => ing.name.trim() && ing.amount.trim()),
      steps: form.value.steps.filter(step => step.description.trim()),
      tags: form.value.tags.filter(Boolean),
      image: form.value.image
    }

    const formData = new FormData()
    formData.append('title', updatedRecipe.title)
    formData.append('description', updatedRecipe.description)
    formData.append('country_id', updatedRecipe.country_id)
    formData.append('cooking_time', updatedRecipe.cooking_time.toString())
    formData.append('servings', updatedRecipe.servings.toString())
    formData.append('ingredients', JSON.stringify(updatedRecipe.ingredients))
    formData.append('steps', JSON.stringify(updatedRecipe.steps))
    formData.append('tags', JSON.stringify(updatedRecipe.tags))

    if (updatedRecipe.image instanceof File) {
      formData.append('image', updatedRecipe.image)
    }

    await $api.put(`/recipes/${route.params.id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    router.push('/recipes')
  } catch (error) {
    console.error('Ошибка при обновлении рецепта:', error)
  }
}

// Обработка удаления рецепта
const handleDelete = () => {
  if (confirm('Вы уверены, что хотите удалить этот рецепт?')) {
    recipesStore.deleteRecipe(Number(route.params.id))
    router.push('/recipes')
  }
}
</script> 