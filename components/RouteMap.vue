<template>
  <div class="h-full w-full relative">
    <div ref="mapContainer" class="h-full w-full"></div>
    
    <!-- Панель управления -->
    <div class="hidden md:block absolute top-4 right-4 bg-white rounded-lg border border-gray-200 p-2 sm:p-4 shadow-lg z-[9999] w-40 sm:w-64">
      <div class="flex items-center justify-between mb-2">
        <h3 class="text-xs sm:text-sm font-medium text-gray-900">Маршрут</h3>
        <button 
          @click="toggleRoute"
          class="text-xs text-gray-500 hover:text-gray-700"
        >
          {{ showRoute ? 'Скрыть' : 'Показать' }}
        </button>
      </div>
      
      <div v-if="showRoute" class="space-y-1 sm:space-y-2">
        <div v-for="(point, index) in routePoints" :key="index" class="flex items-center">
          <div class="w-2 h-2 sm:w-3 sm:h-3 rounded-full mr-1 sm:mr-2" :style="{ backgroundColor: getPointColor(index) }"></div>
          <span class="text-xs sm:text-sm text-gray-700 truncate">{{ point.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { useNuxtApp } from '#app'

const props = defineProps({
  route: {
    type: Object,
    required: true
  }
})

const mapContainer = ref(null)
const showRoute = ref(true)
let map = null
let routeLine = null
let markers = []
let L = null

// Координаты стран
const countryCoordinates = {
  'Италия': [41.9028, 12.4964],
  'Франция': [48.8566, 2.3522],
  'Испания': [40.4168, -3.7038],
  'Япония': [35.6762, 139.6503],
  'Таиланд': [13.7563, 100.5018],
  'Греция': [37.9838, 23.7275],
  'Индия': [28.6139, 77.2090],
  'Мексика': [19.4326, -99.1332],
  'Китай': [39.9042, 116.4074],
  'Россия': [55.7558, 37.6173]
}

// Цвета для точек маршрута
const colors = [
  '#FF6B6B',
  '#4ECDC4',
  '#45B7D1',
  '#96CEB4',
  '#FFEEAD',
  '#D4A5A5',
  '#FFB347',
  '#47B8E0',
  '#FF9999',
  '#9B59B6'
]

// Получение цвета для точки
const getPointColor = (index) => {
  return colors[index % colors.length]
}

// Точки маршрута
const routePoints = computed(() => {
  return props.route.countries.map(country => ({
    name: country,
    coordinates: countryCoordinates[country]
  }))
})

// Инициализация карты
onMounted(async () => {
  if (process.client && mapContainer.value) {
    // Динамически импортируем Leaflet только на клиенте
    L = await import('leaflet')
    await import('leaflet/dist/leaflet.css')

    // Создаем карту
    map = L.map(mapContainer.value, {
      center: [20, 0],
      zoom: 2,
      minZoom: 2,
      maxZoom: 18,
      zoomControl: true,
      zoomAnimation: true,
      fadeAnimation: true,
      markerZoomAnimation: true,
      maxBounds: [[-90, -180], [90, 180]],
      maxBoundsViscosity: 1.0
    })

    // Добавляем базовый слой
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      minZoom: 2,
      maxZoom: 18,
      noWrap: true
    }).addTo(map)

    // Обновляем маршрут
    updateRoute()
  }
})

// Обновление маршрута
const updateRoute = () => {
  if (!map || !L) return

  // Удаляем старые маркеры и линию
  if (routeLine) {
    map.removeLayer(routeLine)
  }
  markers.forEach(marker => map.removeLayer(marker))
  markers = []

  if (!showRoute.value) return

  // Создаем новую линию маршрута
  const points = routePoints.value.map(point => point.coordinates)
  routeLine = L.polyline(points, {
    color: '#4B5563',
    weight: 2,
    opacity: 0.8,
    dashArray: '5, 10'
  }).addTo(map)

  // Добавляем маркеры
  routePoints.value.forEach((point, index) => {
    const customIcon = L.divIcon({
      className: 'custom-marker',
      html: `
        <div class="relative group">
          <div class="w-6 h-6 sm:w-8 sm:h-8 rounded-full overflow-hidden border-2 border-white shadow-lg transform transition-all duration-300 group-hover:scale-110"
               style="background-color: ${getPointColor(index)}">
            <div class="w-full h-full flex items-center justify-center text-white text-xs sm:text-sm font-medium">
              ${index + 1}
            </div>
          </div>
        </div>
      `,
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    })

    const marker = L.marker(point.coordinates, { 
      icon: customIcon,
      riseOnHover: true,
      autoPan: true
    })
      .bindPopup(`
        <div class="w-32 sm:w-48">
          <h3 class="font-medium text-gray-900 mb-1 text-xs sm:text-sm">${point.name}</h3>
          <p class="text-xs sm:text-sm text-gray-600">Точка ${index + 1} маршрута</p>
        </div>
      `, {
        className: 'custom-popup',
        maxWidth: 300,
        minWidth: 150,
        autoPanPadding: [30, 30],
        closeButton: true,
        offset: [0, -15]
      })
      .addTo(map)

    markers.push(marker)
  })

  // Устанавливаем границы для отображения всего маршрута
  if (points.length > 0) {
    map.fitBounds(points, {
      padding: [30, 30]
    })
  }
}

// Переключение отображения маршрута
const toggleRoute = () => {
  showRoute.value = !showRoute.value
  updateRoute()
}

// Наблюдатель за изменением маршрута
watch(() => props.route, () => {
  updateRoute()
}, { deep: true })
</script>

<style>
.custom-marker {
  transition: transform 0.3s ease;
  z-index: 100;
}

.custom-marker:hover {
  transform: scale(1.2);
  z-index: 1000;
}

.leaflet-popup {
  z-index: 1000;
}

.leaflet-popup-content {
  margin: 0;
  padding: 12px;
}

.leaflet-popup-content-wrapper {
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background: white;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.leaflet-popup-tip-container {
  z-index: 1000;
}

.leaflet-popup-close-button {
  right: 8px;
  top: 8px;
  font-size: 16px;
  color: #6B7280;
  transition: color 0.2s ease;
}

.leaflet-popup-close-button:hover {
  color: #374151;
}

.leaflet-popup-scrolled {
  max-height: 200px;
  overflow-y: auto;
  padding-right: 8px;
}

/* Стили для скроллбара в попапе */
.leaflet-popup-scrolled::-webkit-scrollbar {
  width: 6px;
}

.leaflet-popup-scrolled::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.leaflet-popup-scrolled::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

.leaflet-popup-scrolled::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style> 