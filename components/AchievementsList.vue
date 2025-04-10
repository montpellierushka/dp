<!--<template>
  <div class="achievements-container">
    <div v-if="loading" class="loading-container">
      <div class="loading-spinner"></div>
      <p class="loading-text">Загрузка достижений...</p>
    </div>

    <div v-else-if="error" class="error-container">
      <div class="error-icon">⚠️</div>
      <p class="error-text">{{ error }}</p>
    </div>

    <div v-else-if="achievements.length === 0" class="empty-container">
      <div class="empty-icon">🎯</div>
      <p class="empty-text">У вас пока нет достижений</p>
    </div>

    <div v-else class="achievements-grid">
      <div v-for="achievement in achievements" 
           :key="achievement.id" 
           class="achievement-card"
           :class="{ 'unlocked': achievement.unlocked }">
        <div class="achievement-icon">
          <span class="icon-text">{{ achievement.icon }}</span>
        </div>
        <div class="achievement-content">
          <h3 class="achievement-title">{{ achievement.title }}</h3>
          <p class="achievement-description">{{ achievement.description }}</p>
          <div class="achievement-progress">
            <div class="progress-bar">
              <div class="progress-fill" 
                   :style="{ width: `${(achievement.progress / achievement.total) * 100}%` }">
              </div>
            </div>
            <span class="progress-text">{{ achievement.progress }}/{{ achievement.total }}</span>
          </div>
          <div v-if="achievement.unlocked" class="achievement-date">
            Получено: {{ formatDate(achievement.unlockedAt) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAchievements } from '~/composables/useAchievements'

const { achievements, loading, error, loadAchievements } = useAchievements()

const formatDate = (dateString?: string) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

onMounted(async () => {
  await loadAchievements()
})
</script>

<style scoped>
.achievements-container {
  @apply p-4;
}

.loading-container,
.error-container,
.empty-container {
  @apply flex flex-col items-center justify-center py-12;
}

.loading-spinner {
  @apply w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin;
}

.loading-text,
.error-text,
.empty-text {
  @apply mt-4 text-lg text-gray-600;
}

.error-icon,
.empty-icon {
  @apply text-4xl mb-4;
}

.achievements-grid {
  @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6;
}

.achievement-card {
  @apply bg-white rounded-xl shadow-md p-6 transition-all duration-300 
         hover:shadow-lg hover:scale-[1.02] border-2 border-gray-100;
}

.achievement-card.unlocked {
  @apply border-primary/50 bg-gradient-to-br from-white to-primary/5;
}

.achievement-icon {
  @apply w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4;
}

.icon-text {
  @apply text-2xl;
}

.achievement-content {
  @apply space-y-3;
}

.achievement-title {
  @apply text-xl font-bold text-gray-800;
}

.achievement-description {
  @apply text-gray-600 text-sm;
}

.achievement-progress {
  @apply space-y-2;
}

.progress-bar {
  @apply w-full h-2 bg-gray-200 rounded-full overflow-hidden;
}

.progress-fill {
  @apply h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500;
}

.progress-text {
  @apply text-sm text-gray-500;
}

.achievement-date {
  @apply text-sm text-primary font-medium;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.achievement-card {
  animation: fadeIn 0.5s ease-out;
}
</style>-->