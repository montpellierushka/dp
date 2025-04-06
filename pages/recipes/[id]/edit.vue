<template>
  <div class="min-h-screen bg-gray-100">
    <Navbar />
    <main class="max-w-3xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="px-4 py-6 sm:px-0">
        <div class="bg-white rounded-lg shadow-md p-6">
          <h1 class="text-3xl font-bold text-gray-900 mb-6">Редактировать рецепт</h1>
          
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Изображение</label>
              <RecipeImageUpload 
                :initial-image="form.imageUrl"
                @image-uploaded="handleImageUploaded" 
              />
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
              <input
                id="country"
                v-model="form.country"
                type="text"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
            </div>

            <div>
              <label for="cookingTime" class="block text-sm font-medium text-gray-700 mb-2">Время приготовления (минуты)</label>
              <input
                id="cookingTime"
                v-model.number="form.cookingTime"
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
                    v-model="form.ingredients[index].name"
                    type="text"
                    required
                    class="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  >
                  <input
                    v-model="form.ingredients[index].amount"
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
                  v-for="(step, index) in form.instructions" 
                  :key="index"
                  class="flex items-start space-x-2"
                >
                  <span class="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center mt-2">
                    {{ index + 1 }}
                  </span>
                  <textarea
                    :value="step"
                    @input="(e: Event) => {
                      const target = e.target as HTMLTextAreaElement;
                      form.instructions[index] = target.value;
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
                  v-for="(tag, index) in form.tags" 
                  :key="index"
                  class="flex items-center space-x-2"
                >
                  <input
                    :value="tag"
                    @input="(e: Event) => {
                      const target = e.target as HTMLInputElement;
                      form.tags[index] = target.value;
                    }"
                    type="text"
                    required
                    class="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  >
                  <button
                    type="button"
                    @click="removeTag(index)"
                    class="p-2 text-red-500 hover:text-red-600"
                  >
                    <Icon name="trash" class="w-5 h-5" />
                  </button>
                </div>
                <button
                  type="button"
                  @click="addTag"
                  class="text-blue-500 hover:text-blue-600 text-sm font-medium"
                >
                  + Добавить тег
                </button>
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
}

interface RecipeForm {
  title: string
  description: string
  country: string
  cookingTime: number
  servings: number
  ingredients: Ingredient[]
  instructions: string[]
  tags: string[]
  imageUrl: string
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
  country: '',
  cookingTime: 30,
  servings: 1,
  ingredients: [],
  instructions: [],
  tags: [],
  imageUrl: ''
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
      country: response.data.data.country,
      cookingTime: response.data.data.cookingTime,
      servings: response.data.data.servings,
      ingredients: response.data.data.ingredients.map(ing => ({
        name: ing.name,
        amount: ing.amount
      })),
      instructions: response.data.data.instructions,
      tags: response.data.data.tags,
      imageUrl: response.data.data.imageUrl || ''
    }
  } catch (error) {
    console.error('Ошибка при загрузке рецепта:', error)
    router.push('/recipes')
  }
})

const newTag = ref('')

// Методы для работы с формой
const addIngredient = () => {
  form.value.ingredients.push({ name: '', amount: '' })
}

const removeIngredient = (index: number) => {
  form.value.ingredients.splice(index, 1)
}

const addStep = () => {
  form.value.instructions.push('')
}

const removeStep = (index: number) => {
  form.value.instructions.splice(index, 1)
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

const handleImageUploaded = (imageUrl: string) => {
  form.value.imageUrl = imageUrl
}

// Обработка отправки формы
const handleSubmit = async () => {
  try {
    const updatedRecipe: RecipeForm = {
      title: form.value.title,
      description: form.value.description,
      country: form.value.country,
      cookingTime: form.value.cookingTime,
      servings: form.value.servings,
      ingredients: form.value.ingredients.filter(ing => ing.name.trim() && ing.amount.trim()),
      instructions: form.value.instructions.filter(Boolean),
      tags: form.value.tags.filter(Boolean),
      imageUrl: form.value.imageUrl
    }

    await $api.put(`/recipes/${route.params.id}`, updatedRecipe)
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