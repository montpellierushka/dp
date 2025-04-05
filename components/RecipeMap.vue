<template>
  <div class="h-full w-full relative">
    <div ref="mapContainer" class="h-full w-full"></div>
    
    <!-- Панель управления -->
    <div class="absolute top-4 right-4 flex flex-col gap-4">
      <!-- Поиск -->
      <div class="bg-white rounded-lg border border-gray-200 p-2 sm:p-4 shadow-lg z-[1000] w-48 sm:w-64">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Поиск рецептов..."
          class="w-full px-2 sm:px-3 py-1 sm:py-2 border border-gray-300 rounded-md text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
          @input="handleSearch"
        />
      </div>

      <!-- Фильтры -->
      <div class="bg-white rounded-lg border border-gray-200 p-2 sm:p-4 shadow-lg z-[1000] w-48 sm:w-64">
        <div class="flex items-center justify-between mb-2">
          <h3 class="text-xs sm:text-sm font-medium text-gray-900">Фильтры</h3>
          <button 
            @click="resetFilters"
            class="text-xs text-gray-500 hover:text-gray-700"
          >
            Сбросить
          </button>
        </div>

        <!-- Аккордеон фильтров -->
        <div class="space-y-2">
          <!-- Страна -->
          <div class="border-b border-gray-100 pb-2">
            <button 
              @click="toggleFilter('country')"
              class="w-full flex items-center justify-between text-xs sm:text-sm text-gray-700"
            >
              <span>Страна</span>
              <Icon 
                :name="expandedFilters.country ? 'chevron-up' : 'chevron-down'" 
                class="w-3 h-3 sm:w-4 sm:h-4"
              />
            </button>
            <div v-if="expandedFilters.country" class="mt-2">
              <select 
                v-model="selectedCountry" 
                class="w-full px-2 py-1 border border-gray-300 rounded-md text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
                @change="updateMarkers"
              >
                <option value="">Все страны</option>
                <option v-for="country in uniqueCountries" :key="country" :value="country">
                  {{ country }}
                </option>
              </select>
            </div>
          </div>

          <!-- Теги -->
          <div class="border-b border-gray-100 pb-2">
            <button 
              @click="toggleFilter('tags')"
              class="w-full flex items-center justify-between text-xs sm:text-sm text-gray-700"
            >
              <span>Теги</span>
              <Icon 
                :name="expandedFilters.tags ? 'chevron-up' : 'chevron-down'" 
                class="w-3 h-3 sm:w-4 sm:h-4"
              />
            </button>
            <div v-if="expandedFilters.tags" class="mt-2">
              <select 
                v-model="selectedTags" 
                multiple
                class="w-full px-2 py-1 border border-gray-300 rounded-md text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-gray-200 h-16 sm:h-24"
                @change="updateMarkers"
              >
                <option v-for="tag in uniqueTags" :key="tag" :value="tag">
                  {{ tag }}
                </option>
              </select>
              <div class="mt-1 flex flex-wrap gap-1">
                <span 
                  v-for="tag in selectedTags" 
                  :key="tag"
                  class="px-1.5 sm:px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full flex items-center"
                >
                  {{ tag }}
                  <button 
                    @click="removeTag(tag)"
                    class="ml-1 text-gray-400 hover:text-gray-600"
                  >
                    ×
                  </button>
                </span>
              </div>
            </div>
          </div>

          <!-- Время -->
          <div class="border-b border-gray-100 pb-2">
            <button 
              @click="toggleFilter('time')"
              class="w-full flex items-center justify-between text-xs sm:text-sm text-gray-700"
            >
              <span>Время приготовления</span>
              <Icon 
                :name="expandedFilters.time ? 'chevron-up' : 'chevron-down'" 
                class="w-3 h-3 sm:w-4 sm:h-4"
              />
            </button>
            <div v-if="expandedFilters.time" class="mt-2">
              <div class="flex items-center gap-1 sm:gap-2">
                <input
                  v-model="cookingTime.min"
                  type="number"
                  min="0"
                  class="w-12 sm:w-16 px-1 sm:px-2 py-1 border border-gray-300 rounded-md text-xs sm:text-sm"
                  placeholder="От"
                >
                <span class="text-gray-500">-</span>
                <input
                  v-model="cookingTime.max"
                  type="number"
                  min="0"
                  class="w-12 sm:w-16 px-1 sm:px-2 py-1 border border-gray-300 rounded-md text-xs sm:text-sm"
                  placeholder="До"
                >
                <span class="text-gray-500 text-xs sm:text-sm">мин</span>
              </div>
            </div>
          </div>

          <!-- Стиль карты -->
          <div>
            <button 
              @click="toggleFilter('style')"
              class="w-full flex items-center justify-between text-xs sm:text-sm text-gray-700"
            >
              <span>Стиль карты</span>
              <Icon 
                :name="expandedFilters.style ? 'chevron-up' : 'chevron-down'" 
                class="w-3 h-3 sm:w-4 sm:h-4"
              />
            </button>
            <div v-if="expandedFilters.style" class="mt-2">
              <select 
                v-model="selectedMapStyle" 
                class="w-full px-2 py-1 border border-gray-300 rounded-md text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
                @change="changeMapStyle"
              >
                <option value="default">Стандартная карта</option>
                <option value="satellite">Спутник</option>
                <option value="dark">Темная тема</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Измерение расстояний -->
        <button
          @click="toggleMeasure"
          class="w-full mt-2 px-2 sm:px-3 py-1 sm:py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors text-xs sm:text-sm"
          :class="{ 'bg-gray-800 text-white': isMeasuring }"
        >
          {{ isMeasuring ? 'Отменить измерение' : 'Измерить расстояние' }}
        </button>
      </div>
    </div>

    <!-- Легенда -->
    <div class="absolute bottom-4 left-4 bg-white rounded-lg border border-gray-200 p-2 sm:p-4 shadow-lg z-[1000] max-h-[40vh] sm:max-h-[50vh] overflow-y-auto w-40 sm:w-48">
      <h3 class="text-xs sm:text-sm font-medium text-gray-900 mb-2">Рецепты по странам</h3>
      <div class="space-y-1 sm:space-y-2">
        <div v-for="(count, country) in recipesByCountry" :key="country" 
             class="flex items-center justify-between text-xs sm:text-sm">
          <div class="flex items-center">
            <div class="w-2 h-2 sm:w-3 sm:h-3 rounded-full mr-1 sm:mr-2" :style="{ backgroundColor: getCountryColor(country) }"></div>
            <span>{{ country }}</span>
          </div>
          <span class="text-gray-500">{{ count }}</span>
        </div>
      </div>
    </div>

    <!-- Индикатор загрузки -->
    <div v-if="isLoading" class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[2000]">
      <div class="bg-white p-3 sm:p-4 rounded-lg shadow-lg">
        <div class="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-gray-900 mx-auto"></div>
        <p class="mt-2 text-xs sm:text-sm text-gray-700">Загрузка карты...</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
import 'leaflet.markercluster'

const props = defineProps({
  recipes: {
    type: Array,
    required: true
  }
})

const mapContainer = ref(null)
const selectedCountry = ref('')
const searchQuery = ref('')
const selectedMapStyle = ref(localStorage.getItem('mapStyle') || 'default')
const cookingTime = ref({ min: null, max: null })
const selectedTags = ref([])
const isMeasuring = ref(false)
const isLoading = ref(false)
const expandedFilters = ref({
  country: false,
  tags: false,
  time: false,
  style: false
})
let map = null
let markers = []
let markerCluster = null
let currentTileLayer = null
let measureControl = null

// Стили карты
const mapStyles = {
  default: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  satellite: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
  dark: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png'
}

// Цвета для стран
const countryColors = {
  'Италия': '#FF6B6B',
  'Япония': '#4ECDC4',
  'Франция': '#45B7D1',
  'Таиланд': '#96CEB4',
  'Испания': '#FFEEAD',
  'Греция': '#D4A5A5',
  'Индия': '#FFB347',
  'Мексика': '#47B8E0',
  'Китай': '#FF9999',
  'Россия': '#9B59B6'
}

// Координаты стран
const countryCoordinates = {
  'Италия': [41.9028, 12.4964],
  'Япония': [35.6762, 139.6503],
  'Франция': [48.8566, 2.3522],
  'Таиланд': [13.7563, 100.5018],
  'Испания': [40.4168, -3.7038],
  'Греция': [37.9838, 23.7275],
  'Индия': [28.6139, 77.2090],
  'Мексика': [19.4326, -99.1332],
  'Китай': [39.9042, 116.4074],
  'Россия': [55.7558, 37.6173]
}

// Уникальные страны
const uniqueCountries = computed(() => {
  return [...new Set(props.recipes.map(recipe => recipe.country))].sort()
})

// Уникальные теги
const uniqueTags = computed(() => {
  const tags = new Set()
  props.recipes.forEach(recipe => {
    recipe.tags.forEach(tag => tags.add(tag))
  })
  return Array.from(tags).sort()
})

// Количество рецептов по странам
const recipesByCountry = computed(() => {
  const counts = {}
  props.recipes.forEach(recipe => {
    counts[recipe.country] = (counts[recipe.country] || 0) + 1
  })
  return counts
})

// Получение цвета для страны
const getCountryColor = (country) => {
  return countryColors[country] || '#666666'
}

// Переключение тега
const toggleTag = (tag) => {
  const index = selectedTags.value.indexOf(tag)
  if (index === -1) {
    selectedTags.value.push(tag)
  } else {
    selectedTags.value.splice(index, 1)
  }
  updateMarkers()
}

// Переключение измерения расстояний
const toggleMeasure = () => {
  isMeasuring.value = !isMeasuring.value
  if (isMeasuring.value) {
    measureControl = new L.Control.Measure({
      position: 'topleft',
      primaryLengthUnit: 'kilometers',
      secondaryLengthUnit: 'miles',
      primaryAreaUnit: 'hectares',
      secondaryAreaUnit: 'acres'
    })
    measureControl.addTo(map)
  } else if (measureControl) {
    measureControl.remove()
    measureControl = null
  }
}

// Инициализация карты
onMounted(() => {
  if (mapContainer.value) {
    isLoading.value = true
    
    // Восстанавливаем позицию карты
    const savedView = JSON.parse(localStorage.getItem('mapView'))
    const initialView = savedView || [20, 0]
    const initialZoom = savedView ? 4 : 2
    
    // Настройки карты
    map = L.map(mapContainer.value, {
      center: initialView,
      zoom: initialZoom,
      minZoom: 2,
      maxZoom: 18,
      zoomControl: true,
      zoomAnimation: true,
      fadeAnimation: true,
      markerZoomAnimation: true,
      maxBounds: [[-90, -180], [90, 180]],
      maxBoundsViscosity: 1.0
    }).setView(initialView, initialZoom)
    
    // Сохраняем позицию при перемещении
    map.on('moveend', () => {
      const center = map.getCenter()
      const zoom = map.getZoom()
      localStorage.setItem('mapView', JSON.stringify([center.lat, center.lng]))
    })
    
    // Добавляем базовый слой
    currentTileLayer = L.tileLayer(mapStyles[selectedMapStyle.value], {
      attribution: '© OpenStreetMap contributors',
      minZoom: 2,
      maxZoom: 18,
      noWrap: true
    }).addTo(map)

    // Инициализация кластеризации
    markerCluster = L.markerClusterGroup({
      maxClusterRadius: 80,
      spiderfyOnMaxZoom: true,
      showCoverageOnHover: false,
      zoomToBoundsOnClick: true,
      disableClusteringAtZoom: 8,
      animate: true,
      animateAddingMarkers: true,
      removeOutsideVisibleBounds: true,
      chunkedLoading: true,
      chunkInterval: 200,
      chunkDelay: 50,
      iconCreateFunction: function(cluster) {
        const childCount = cluster.getChildCount()
        const country = cluster.getAllChildMarkers()[0].options.country
        const color = getCountryColor(country)
        
        return L.divIcon({
          html: `
            <div class="relative group">
              <div class="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-lg transform transition-all duration-300 group-hover:scale-110"
                   style="background-color: ${color}">
                <div class="w-full h-full flex items-center justify-center text-white font-medium">
                  ${childCount}
                </div>
              </div>
              <div class="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white"
                   style="background-color: ${color}">
              </div>
            </div>
          `,
          className: 'custom-cluster',
          iconSize: [48, 48],
          iconAnchor: [24, 24]
        })
      }
    })
    map.addLayer(markerCluster)

    // Добавляем кнопки управления масштабом
    L.control.zoom({
      position: 'bottomright',
      zoomInTitle: 'Увеличить',
      zoomOutTitle: 'Уменьшить'
    }).addTo(map)

    updateMarkers()
    isLoading.value = false
  }
})

// Смена стиля карты
const changeMapStyle = () => {
  isLoading.value = true
  if (currentTileLayer) {
    map.removeLayer(currentTileLayer)
  }
  
  // Сохраняем выбранный стиль
  localStorage.setItem('mapStyle', selectedMapStyle.value)
  
  currentTileLayer = L.tileLayer(mapStyles[selectedMapStyle.value], {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map)
  
  setTimeout(() => {
    isLoading.value = false
  }, 500)
}

// Поиск рецептов
const handleSearch = () => {
  const query = searchQuery.value.toLowerCase()
  const filteredRecipes = props.recipes.filter(recipe => 
    recipe.title.toLowerCase().includes(query) ||
    recipe.description.toLowerCase().includes(query)
  )
  updateMarkers(filteredRecipes)
}

// Фильтрация по времени приготовления
const filterByCookingTime = (recipes) => {
  if (!cookingTime.value.min && !cookingTime.value.max) return recipes
  
  return recipes.filter(recipe => {
    const time = parseInt(recipe.cookingTime)
    if (cookingTime.value.min && time < cookingTime.value.min) return false
    if (cookingTime.value.max && time > cookingTime.value.max) return false
    return true
  })
}

// Фильтрация по тегам
const filterByTags = (recipes) => {
  if (selectedTags.value.length === 0) return recipes
  
  return recipes.filter(recipe => 
    selectedTags.value.every(tag => recipe.tags.includes(tag))
  )
}

// Обновление маркеров
const updateMarkers = (filteredRecipes = null) => {
  markerCluster.clearLayers()
  markers = []

  let recipesToShow = filteredRecipes || props.recipes
  
  // Применяем фильтры
  if (selectedCountry.value) {
    recipesToShow = recipesToShow.filter(recipe => recipe.country === selectedCountry.value)
  }
  
  recipesToShow = filterByCookingTime(recipesToShow)
  recipesToShow = filterByTags(recipesToShow)

  recipesToShow.forEach(recipe => {
    const coordinates = countryCoordinates[recipe.country]
    if (coordinates) {
      const customIcon = L.divIcon({
        className: 'custom-marker',
        html: `
          <div class="relative group">
            <div class="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-lg transform transition-all duration-300 group-hover:scale-110"
                 style="background-color: ${getCountryColor(recipe.country)}">
              <img 
                src="${recipe.imageUrl || '/placeholder.jpg'}" 
                alt="${recipe.title}"
                class="w-full h-full object-cover"
              >
            </div>
            <div class="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white"
                 style="background-color: ${getCountryColor(recipe.country)}">
            </div>
          </div>
        `,
        iconSize: [48, 48],
        iconAnchor: [24, 24]
      })

      const marker = L.marker(coordinates, { icon: customIcon })
        .bindPopup(`
          <div class="w-64">
            <div class="relative h-32 mb-2">
              <img 
                src="${recipe.imageUrl || '/placeholder.jpg'}" 
                alt="${recipe.title}"
                class="w-full h-full object-cover rounded-t-lg"
              >
            </div>
            <div class="p-3">
              <h3 class="font-medium text-gray-900 mb-1">${recipe.title}</h3>
              <p class="text-sm text-gray-600 mb-2 line-clamp-2">${recipe.description}</p>
              <div class="flex items-center justify-between mb-2">
                <div class="flex items-center text-sm text-gray-500">
                  <Icon name="clock" class="w-4 h-4 mr-1" />
                  ${recipe.cookingTime} мин
                </div>
                <div class="flex items-center text-sm text-gray-500">
                  <Icon name="map-marker" class="w-4 h-4 mr-1" />
                  ${recipe.country}
                </div>
              </div>
              <div class="flex flex-wrap gap-1 mb-2">
                ${recipe.tags.map(tag => `
                  <span class="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                    ${tag}
                  </span>
                `).join('')}
              </div>
              <a 
                href="/recipes/${recipe.id}" 
                class="block w-full text-center py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
              >
                Подробнее
              </a>
            </div>
          </div>
        `, {
          maxWidth: 300,
          className: 'custom-popup'
        })
      
      marker.on('mouseover', function() {
        this.openPopup()
      })

      marker.on('mouseout', function() {
        this.closePopup()
      })

      markers.push(marker)
      markerCluster.addLayer(marker)
    }
  })
}

// Наблюдатели
watch(() => props.recipes, () => {
  updateMarkers()
})

watch(cookingTime, () => {
  updateMarkers()
}, { deep: true })

watch(selectedTags, () => {
  updateMarkers()
})

const toggleFilter = (filter) => {
  expandedFilters.value[filter] = !expandedFilters.value[filter]
}

const removeTag = (tag) => {
  const index = selectedTags.value.indexOf(tag)
  if (index !== -1) {
    selectedTags.value.splice(index, 1)
    updateMarkers()
  }
}

const resetFilters = () => {
  selectedCountry.value = ''
  selectedTags.value = []
  cookingTime.value = { min: null, max: null }
  updateMarkers()
}
</script>

<style>
.custom-popup .leaflet-popup-content-wrapper {
  padding: 0;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.custom-popup .leaflet-popup-tip {
  display: none;
}

.custom-marker {
  transition: transform 0.3s ease;
}

.custom-marker:hover {
  transform: scale(1.2);
}

.leaflet-marker-icon {
  transition: transform 0.3s ease;
}

.leaflet-marker-icon:hover {
  transform: scale(1.2);
}

.leaflet-popup-content {
  margin: 0;
}

.leaflet-popup-content-wrapper {
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Анимация загрузки */
@keyframes spin {
  to { transform: rotate(360deg); }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

/* Стили для измерения расстояний */
.leaflet-control-measure {
  background: white;
  padding: 5px;
  border-radius: 4px;
  box-shadow: 0 1px 5px rgba(0,0,0,0.4);
}

.leaflet-control-measure a {
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z"/></svg>');
  background-size: 16px 16px;
  background-position: center;
  background-repeat: no-repeat;
  width: 30px;
  height: 30px;
  display: block;
}

/* Стили для кластеров */
.custom-cluster {
  transition: transform 0.3s ease;
}

.custom-cluster:hover {
  transform: scale(1.2);
}

/* Стили для кнопок масштабирования */
.leaflet-control-zoom {
  border: none !important;
  box-shadow: 0 1px 5px rgba(0,0,0,0.2) !important;
}

.leaflet-control-zoom a {
  background-color: white !important;
  color: #374151 !important;
  border: none !important;
  width: 30px !important;
  height: 30px !important;
  line-height: 30px !important;
  font-size: 16px !important;
  transition: all 0.2s ease !important;
}

.leaflet-control-zoom a:hover {
  background-color: #f3f4f6 !important;
}

.leaflet-control-zoom-in {
  border-radius: 4px 4px 0 0 !important;
}

.leaflet-control-zoom-out {
  border-radius: 0 0 4px 4px !important;
}

/* Анимация маркеров */
.leaflet-marker-icon {
  transition: all 0.3s ease;
}

.leaflet-marker-icon:hover {
  transform: scale(1.2) translate(-20%, -20%);
  z-index: 1000;
}

/* Анимация попапов */
.leaflet-popup {
  transition: all 0.3s ease;
}

.leaflet-popup-content-wrapper {
  transition: all 0.3s ease;
}

.leaflet-popup-content-wrapper:hover {
  transform: scale(1.02);
}
</style> 