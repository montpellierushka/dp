<template>
  <div class="relative w-full h-full">
    <!-- Индикатор загрузки -->
    <div v-if="!map" class="flex items-center justify-center h-full">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-800"></div>
    </div>

    <!-- Карта мира -->
    <div v-else ref="mapContainer" class="w-full h-full"></div>

    <!-- Панель статистики -->
    <div v-if="map" class="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-4 w-64">
      <h3 class="text-lg font-medium mb-4">Ваш прогресс</h3>
      
      <div class="space-y-4">
        <div>
          <div class="flex justify-between text-sm mb-1">
            <span>Страны</span>
            <span>{{ userProgress?.completedCountries.length }}/{{ mapStats?.totalCountries }}</span>
          </div>
          <div class="h-2 bg-gray-200 rounded-full">
            <div 
              class="h-full bg-gray-800 rounded-full transition-all duration-300"
              :style="{ width: `${(userProgress?.completedCountries.length || 0) / (mapStats?.totalCountries || 1) * 100}%` }"
            ></div>
          </div>
        </div>

        <div>
          <div class="flex justify-between text-sm mb-1">
            <span>Рецепты</span>
            <span>{{ userProgress?.totalRecipesCooked }}/{{ mapStats?.totalRecipes }}</span>
          </div>
          <div class="h-2 bg-gray-200 rounded-full">
            <div 
              class="h-full bg-gray-800 rounded-full transition-all duration-300"
              :style="{ width: `${(userProgress?.totalRecipesCooked || 0) / (mapStats?.totalRecipes || 1) * 100}%` }"
            ></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Модальное окно с информацией о стране -->
    <div 
      v-if="selectedCountry"
      class="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg p-4 w-96"
    >
      <div class="flex justify-between items-start mb-4">
        <div>
          <h3 class="text-xl font-medium">{{ selectedCountry.name }}</h3>
          <p class="text-sm text-gray-500">{{ selectedCountry.continent }}</p>
        </div>
        <button 
          @click="selectedCountry = null"
          class="text-gray-400 hover:text-gray-500"
        >
          <Icon name="x" class="w-5 h-5" />
        </button>
      </div>

      <div class="space-y-4">
        <div>
          <div class="flex justify-between text-sm mb-1">
            <span>Рецептов</span>
            <span>{{ selectedCountry.recipesCount }}</span>
          </div>
          <div class="h-2 bg-gray-200 rounded-full">
            <div 
              class="h-full bg-gray-800 rounded-full transition-all duration-300"
              :style="{ width: `${selectedCountry.completionRate}%` }"
            ></div>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <span class="text-sm">Сложность:</span>
          <span 
            class="px-2 py-1 text-xs rounded-full"
            :class="{
              'bg-green-100 text-green-800': selectedCountry.difficulty === 'easy',
              'bg-yellow-100 text-yellow-800': selectedCountry.difficulty === 'medium',
              'bg-red-100 text-red-800': selectedCountry.difficulty === 'hard'
            }"
          >
            {{ 
              selectedCountry.difficulty === 'easy' ? 'Легко' :
              selectedCountry.difficulty === 'medium' ? 'Средне' : 'Сложно'
            }}
          </span>
        </div>

        <div class="flex justify-end">
          <NuxtLink 
            :to="`/recipes?country=${selectedCountry.code}`"
            class="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors text-sm"
          >
            Смотреть рецепты
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import type { Country } from '~/types/map'

const props = defineProps<{
  countries: Country[]
  userProgress: {
    completedCountries: string[]
    totalRecipesCooked: number
  } | null
  mapStats: {
    totalCountries: number
    totalRecipes: number
  } | null
}>()

const mapContainer = ref<HTMLElement | null>(null)
const map = ref<any>(null)
const selectedCountry = ref<Country | null>(null)

const markers = new Map<string, any>()

const initMap = () => {
  try {
    if (!mapContainer.value || typeof window === 'undefined') return

    // Динамически импортируем Leaflet только на клиенте
    const L = require('leaflet')
    require('leaflet/dist/leaflet.css')

    // Создаем карту
    const newMap = L.map(mapContainer.value)
    newMap.setView([20, 0], 2)
    map.value = newMap

    // Создаем и добавляем тайловый слой
    const tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    })
    tileLayer.addTo(newMap)

    // Добавляем маркеры для каждой страны
    props.countries.forEach(country => {
      const marker = L.marker([country.coordinates[0], country.coordinates[1]], {
        title: country.name
      })
      
      marker.bindPopup(country.name)
      marker.on('click', () => {
        selectedCountry.value = country
      })

      if (props.userProgress?.completedCountries.includes(country.id)) {
        marker.setIcon(L.divIcon({
          className: 'completed-marker',
          html: `<div class="w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>`
        }))
      }

      markers.set(country.id, marker)
      marker.addTo(newMap)
    })
  } catch (error) {
    console.error('Error initializing map:', error)
  }
}

onMounted(() => {
  initMap()
})

onUnmounted(() => {
  if (map.value) {
    map.value.remove()
  }
})
</script>

<style>
.completed-marker {
  background: none !important;
  border: none !important;
}
</style> 