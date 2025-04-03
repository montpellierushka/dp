<template>
  <div class="min-h-screen bg-gray-100">
    <Navbar />
    <main class="max-w-3xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="px-4 py-6 sm:px-0">
        <div class="bg-white rounded-lg shadow-md p-6">
          <h1 class="text-3xl font-bold text-gray-900 mb-6">Добавить новый рецепт</h1>
          
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <!-- Основная информация -->
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Название рецепта</label>
                <input
                  v-model="form.title"
                  type="text"
                  required
                  class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Страна</label>
                <input
                  v-model="form.country"
                  type="text"
                  required
                  class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Время приготовления (минуты)</label>
                <input
                  v-model.number="form.cookingTime"
                  type="number"
                  required
                  min="1"
                  class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Описание</label>
                <textarea
                  v-model="form.description"
                  required
                  rows="3"
                  class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>
            </div>
            
            <!-- Ингредиенты -->
            <div>
              <div class="flex justify-between items-center mb-2">
                <label class="block text-sm font-medium text-gray-700">Ингредиенты</label>
                <button
                  type="button"
                  @click="addIngredient"
                  class="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  + Добавить ингредиент
                </button>
              </div>
              <div class="space-y-2">
                <div
                  v-for="(ingredient, index) in form.ingredients"
                  :key="index"
                  class="flex items-center gap-2"
                >
                  <input
                    v-model="form.ingredients[index]"
                    type="text"
                    required
                    class="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                  <button
                    type="button"
                    @click="removeIngredient(index)"
                    class="text-red-600 hover:text-red-800"
                  >
                    <Icon name="trash" class="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
            
            <!-- Шаги приготовления -->
            <div>
              <div class="flex justify-between items-center mb-2">
                <label class="block text-sm font-medium text-gray-700">Шаги приготовления</label>
                <button
                  type="button"
                  @click="addStep"
                  class="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  + Добавить шаг
                </button>
              </div>
              <div class="space-y-2">
                <div
                  v-for="(step, index) in form.steps"
                  :key="index"
                  class="flex items-start gap-2"
                >
                  <span class="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center mt-2">
                    {{ index + 1 }}
                  </span>
                  <textarea
                    v-model="form.steps[index]"
                    required
                    rows="2"
                    class="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  ></textarea>
                  <button
                    type="button"
                    @click="removeStep(index)"
                    class="text-red-600 hover:text-red-800 mt-2"
                  >
                    <Icon name="trash" class="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
            
            <!-- Теги -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Теги</label>
              <div class="flex flex-wrap gap-2">
                <div
                  v-for="(tag, index) in form.tags"
                  :key="index"
                  class="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full"
                >
                  <span>{{ tag }}</span>
                  <button
                    type="button"
                    @click="removeTag(index)"
                    class="text-gray-500 hover:text-gray-700"
                  >
                    <Icon name="x" class="w-4 h-4" />
                  </button>
                </div>
                <input
                  v-model="newTag"
                  type="text"
                  @keydown.enter.prevent="addTag"
                  placeholder="Добавить тег"
                  class="px-3 py-1 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
              </div>
            </div>
            
            <!-- Кнопки -->
            <div class="flex justify-end gap-4">
              <NuxtLink
                to="/recipes"
                class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Отмена
              </NuxtLink>
              <button
                type="submit"
                class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Сохранить рецепт
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { useRecipesStore } from '~/stores/recipes'
import { useRouter } from 'vue-router'

const recipesStore = useRecipesStore()
const router = useRouter()

// Состояние формы
const form = ref({
  title: '',
  description: '',
  country: '',
  cookingTime: 30,
  ingredients: [''],
  steps: [''],
  tags: []
})

const newTag = ref('')

// Методы для работы с формой
const addIngredient = () => {
  form.value.ingredients.push('')
}

const removeIngredient = (index) => {
  form.value.ingredients.splice(index, 1)
}

const addStep = () => {
  form.value.steps.push('')
}

const removeStep = (index) => {
  form.value.steps.splice(index, 1)
}

const addTag = () => {
  if (newTag.value.trim() && !form.value.tags.includes(newTag.value.trim())) {
    form.value.tags.push(newTag.value.trim())
    newTag.value = ''
  }
}

const removeTag = (index) => {
  form.value.tags.splice(index, 1)
}

// Обработка отправки формы
const handleSubmit = () => {
  const newRecipe = {
    id: Date.now(), // Временное решение для генерации ID
    ...form.value
  }
  
  recipesStore.addRecipe(newRecipe)
  router.push('/recipes')
}
</script> 