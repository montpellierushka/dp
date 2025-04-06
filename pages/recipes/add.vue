<template>
  <PageContainer>
    <template #header>
      <PageTitle
        title="Добавить рецепт"
        description="Поделитесь своим любимым рецептом с сообществом"
      />
    </template>

    <form @submit.prevent="createRecipe" class="space-y-6">
      <!-- Основная информация -->
      <div class="bg-white rounded-lg border border-gray-200 p-4">
        <h2 class="text-xl font-medium text-gray-900 mb-4">Основная информация</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Название рецепта</label>
            <input
              v-model="recipe.title"
              type="text"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Страна</label>
            <select
              v-model="recipe.country"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
            >
              <option value="">Выберите страну</option>
              <option v-for="country in countries" :key="country" :value="country">
                {{ country }}
              </option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Время приготовления (мин)</label>
            <input
              v-model="recipe.cookingTime"
              type="number"
              min="1"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Количество порций</label>
            <input
              v-model="recipe.servings"
              type="number"
              min="1"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
          </div>
        </div>
        <div class="mt-4">
          <label class="block text-sm font-medium text-gray-700 mb-1">Описание</label>
          <textarea
            v-model="recipe.description"
            rows="3"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
          ></textarea>
        </div>
      </div>

      <!-- Ингредиенты -->
      <div class="bg-white rounded-lg border border-gray-200 p-4">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-xl font-medium text-gray-900">Ингредиенты</h2>
          <button 
            type="button"
            @click="addIngredient"
            class="text-gray-400 hover:text-gray-500"
          >
            <Icon name="plus" class="w-5 h-5" />
          </button>
        </div>
        <div class="space-y-4">
          <div 
            v-for="(ingredient, index) in recipe.ingredients" 
            :key="index"
            class="flex items-center gap-4"
          >
            <input
              v-model="ingredient.name"
              type="text"
              placeholder="Название ингредиента"
              required
              class="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
            <input
              v-model="ingredient.amount"
              type="text"
              placeholder="Количество"
              required
              class="w-32 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
            <button 
              type="button"
              @click="removeIngredient(index)"
              class="text-red-500 hover:text-red-600"
            >
              <Icon name="trash" class="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <!-- Инструкции -->
      <div class="bg-white rounded-lg border border-gray-200 p-4">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-xl font-medium text-gray-900">Инструкции</h2>
          <button 
            type="button"
            @click="addInstruction"
            class="text-gray-400 hover:text-gray-500"
          >
            <Icon name="plus" class="w-5 h-5" />
          </button>
        </div>
        <div class="space-y-4">
          <div 
            v-for="(instruction, index) in recipe.instructions" 
            :key="index"
            class="flex items-start gap-4"
          >
            <span class="flex-shrink-0 w-8 h-8 bg-gray-800 text-white rounded-full flex items-center justify-center mt-2">
              {{ index + 1 }}
            </span>
            <textarea
              v-model="recipe.instructions[index]"
              rows="2"
              required
              class="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
            ></textarea>
            <button 
              type="button"
              @click="removeInstruction(index)"
              class="text-red-500 hover:text-red-600 mt-2"
            >
              <Icon name="trash" class="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <!-- Теги -->
      <div class="bg-white rounded-lg border border-gray-200 p-4">
        <h2 class="text-xl font-medium text-gray-900 mb-4">Теги</h2>
        <div class="flex flex-wrap gap-2">
          <span 
            v-for="tag in availableTags" 
            :key="tag"
            class="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full cursor-pointer hover:bg-gray-200"
            :class="{ 'bg-gray-800 text-white': recipe.tags.includes(tag) }"
            @click="toggleTag(tag)"
          >
            {{ tag }}
          </span>
        </div>
      </div>

      <!-- Кнопки -->
      <div class="flex justify-end space-x-4">
        <NuxtLink 
          to="/recipes"
          class="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors text-sm"
        >
          Отмена
        </NuxtLink>
        <button
          type="submit"
          class="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors text-sm"
        >
          Создать рецепт
        </button>
      </div>
    </form>
  </PageContainer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useNuxtApp } from '#app'
import { useRouter } from 'vue-router'
import PageContainer from '~/components/PageContainer.vue'
import PageTitle from '~/components/PageTitle.vue'
import type { RecipeForm, Ingredient } from '~/types/recipe'

const { $api } = useNuxtApp()
const router = useRouter()

// Тестовые данные
const countries = ['Италия', 'Франция', 'Испания', 'Япония', 'Таиланд', 'Греция', 'Индия', 'Мексика', 'Китай', 'Россия']
const availableTags = ['Завтрак', 'Обед', 'Ужин', 'Десерт', 'Вегетарианское', 'Острое', 'Сладкое', 'Соленое']

// Новый рецепт
const recipe = ref<RecipeForm>({
  title: '',
  description: '',
  country: '',
  cookingTime: 30,
  servings: 1,
  ingredients: [{ name: '', amount: '' }],
  instructions: [''],
  tags: []
})

const addIngredient = () => {
  recipe.value.ingredients.push({ name: '', amount: '' })
}

const removeIngredient = (index: number) => {
  recipe.value.ingredients.splice(index, 1)
}

const addInstruction = () => {
  recipe.value.instructions.push('')
}

const removeInstruction = (index: number) => {
  recipe.value.instructions.splice(index, 1)
}

const toggleTag = (tag: string) => {
  const index = recipe.value.tags.indexOf(tag)
  if (index === -1) {
    recipe.value.tags.push(tag)
  } else {
    recipe.value.tags.splice(index, 1)
  }
}

const createRecipe = async () => {
  try {
    await $api.post('/recipes', recipe.value)
    router.push('/recipes')
  } catch (error) {
    console.error('Ошибка при создании рецепта:', error)
  }
}
</script> 