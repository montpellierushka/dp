<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Шапка -->
    <div class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h1 class="text-3xl font-bold text-gray-900">Кулинарные путешествия</h1>
        <p class="mt-2 text-gray-600">Откройте для себя мир через его кухню</p>
      </div>
    </div>

    <!-- Основной контент -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Карта маршрутов -->
        <div class="lg:col-span-2">
          <div class="bg-white rounded-lg shadow-sm overflow-hidden">
            <div class="h-[600px]">
              <RouteMap v-if="selectedRoute" :route="selectedRoute" />
              <RecipeMap v-else :recipes="recipes" />
            </div>
          </div>
        </div>

        <!-- Список маршрутов -->
        <div class="space-y-6">
          <!-- Фильтры -->
          <div class="bg-white rounded-lg shadow-sm p-4">
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-lg font-medium text-gray-900">Маршруты</h2>
              <button 
                @click="showAddRouteModal = true"
                class="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors"
              >
                Создать маршрут
              </button>
            </div>

            <!-- Поиск -->
            <div class="mb-4">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Поиск маршрутов..."
                class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
              />
            </div>

            <!-- Список маршрутов -->
            <div class="space-y-4">
              <div 
                v-for="route in filteredRoutes" 
                :key="route.id"
                class="bg-gray-50 rounded-lg p-4 cursor-pointer hover:bg-gray-100 transition-colors"
                @click="selectRoute(route)"
              >
                <div class="flex items-start justify-between">
                  <div>
                    <h3 class="font-medium text-gray-900">{{ route.title }}</h3>
                    <p class="text-sm text-gray-500 mt-1">{{ route.countries.length }} стран</p>
                  </div>
                  <div class="flex items-center space-x-2">
                    <span class="text-sm text-gray-500">{{ route.duration }} дней</span>
                    <button 
                      @click.stop="toggleFavorite(route)"
                      class="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Icon 
                        :name="isFavorite(route.id) ? 'heart' : 'heart-outline'" 
                        class="w-5 h-5"
                      />
                    </button>
                  </div>
                </div>
                <div class="mt-2 flex flex-wrap gap-1">
                  <span 
                    v-for="country in route.countries" 
                    :key="country"
                    class="px-2 py-1 bg-gray-200 text-gray-600 text-xs rounded-full"
                  >
                    {{ country }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Избранные маршруты -->
          <div class="bg-white rounded-lg shadow-sm p-4">
            <h2 class="text-lg font-medium text-gray-900 mb-4">Избранные маршруты</h2>
            <div class="space-y-4">
              <div 
                v-for="route in favoriteRoutes" 
                :key="route.id"
                class="bg-gray-50 rounded-lg p-4 cursor-pointer hover:bg-gray-100 transition-colors"
                @click="selectRoute(route)"
              >
                <div class="flex items-start justify-between">
                  <div>
                    <h3 class="font-medium text-gray-900">{{ route.title }}</h3>
                    <p class="text-sm text-gray-500 mt-1">{{ route.countries.length }} стран</p>
                  </div>
                  <span class="text-sm text-gray-500">{{ route.duration }} дней</span>
                </div>
                <div class="mt-2 flex flex-wrap gap-1">
                  <span 
                    v-for="country in route.countries" 
                    :key="country"
                    class="px-2 py-1 bg-gray-200 text-gray-600 text-xs rounded-full"
                  >
                    {{ country }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Модальное окно создания маршрута -->
    <div v-if="showAddRouteModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[2000]">
      <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4">
        <div class="p-6">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-xl font-medium text-gray-900">Создание маршрута</h2>
            <button 
              @click="showAddRouteModal = false"
              class="text-gray-400 hover:text-gray-500"
            >
              <Icon name="close" class="w-6 h-6" />
            </button>
          </div>

          <form @submit.prevent="createRoute" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Название маршрута</label>
              <input
                v-model="newRoute.title"
                type="text"
                required
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">Описание</label>
              <textarea
                v-model="newRoute.description"
                rows="3"
                required
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
              ></textarea>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">Страны</label>
              <div class="mt-1 flex flex-wrap gap-2">
                <div 
                  v-for="country in availableCountries" 
                  :key="country"
                  class="flex items-center"
                >
                  <input
                    :id="country"
                    v-model="newRoute.countries"
                    type="checkbox"
                    :value="country"
                    class="h-4 w-4 text-gray-600 focus:ring-gray-500 border-gray-300 rounded"
                  />
                  <label :for="country" class="ml-2 text-sm text-gray-700">{{ country }}</label>
                </div>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">Продолжительность (дни)</label>
              <input
                v-model="newRoute.duration"
                type="number"
                min="1"
                required
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
              />
            </div>

            <div class="flex justify-end space-x-3">
              <button
                type="button"
                @click="showAddRouteModal = false"
                class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Отмена
              </button>
              <button
                type="submit"
                class="px-4 py-2 bg-gray-800 text-white rounded-md text-sm font-medium hover:bg-gray-700"
              >
                Создать
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRecipesStore } from '~/stores/recipes'

const recipesStore = useRecipesStore()
const recipes = computed(() => recipesStore.recipes)

// Состояние
const searchQuery = ref('')
const showAddRouteModal = ref(false)
const selectedRoute = ref(null)
const favoriteRoutes = ref([])

// Новый маршрут
const newRoute = ref({
  title: '',
  description: '',
  countries: [],
  duration: 7
})

// Доступные страны
const availableCountries = [
  'Италия',
  'Франция',
  'Испания',
  'Япония',
  'Таиланд',
  'Греция',
  'Индия',
  'Мексика',
  'Китай',
  'Россия'
]

// Маршруты
const routes = ref([
  {
    id: 1,
    title: 'Средиземноморский гастротур',
    description: 'Путешествие по лучшим ресторанам Средиземноморья',
    countries: ['Италия', 'Франция', 'Испания', 'Греция'],
    duration: 14
  },
  {
    id: 2,
    title: 'Азиатский кулинарный тур',
    description: 'Знакомство с кухнями Азии',
    countries: ['Япония', 'Таиланд', 'Китай'],
    duration: 10
  },
  {
    id: 3,
    title: 'Европейский гастротур',
    description: 'Путешествие по европейским столицам',
    countries: ['Франция', 'Италия', 'Испания'],
    duration: 7
  }
])

// Фильтрация маршрутов
const filteredRoutes = computed(() => {
  if (!searchQuery.value) return routes.value
  const query = searchQuery.value.toLowerCase()
  return routes.value.filter(route => 
    route.title.toLowerCase().includes(query) ||
    route.description.toLowerCase().includes(query) ||
    route.countries.some(country => country.toLowerCase().includes(query))
  )
})

// Выбор маршрута
const selectRoute = (route) => {
  selectedRoute.value = route
  // Обновляем карту с выбранным маршрутом
  if (map) {
    map.fitBounds(routePoints.value.map(point => point.coordinates))
  }
}

// Избранное
const isFavorite = (routeId) => {
  return favoriteRoutes.value.some(route => route.id === routeId)
}

const toggleFavorite = (route) => {
  const index = favoriteRoutes.value.findIndex(r => r.id === route.id)
  if (index === -1) {
    favoriteRoutes.value.push(route)
  } else {
    favoriteRoutes.value.splice(index, 1)
  }
}

// Создание маршрута
const createRoute = () => {
  const newId = Math.max(...routes.value.map(r => r.id)) + 1
  routes.value.push({
    id: newId,
    ...newRoute.value
  })
  showAddRouteModal.value = false
  newRoute.value = {
    title: '',
    description: '',
    countries: [],
    duration: 7
  }
}
</script>

<style>
/* Стили для модального окна */
.modal-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2000;
}

.modal-content {
  position: relative;
  z-index: 2001;
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* Стили для карты */
.map-container {
  position: relative;
  z-index: 1;
}

/* Стили для панели управления */
.control-panel {
  position: absolute;
  z-index: 1000;
}
</style> 