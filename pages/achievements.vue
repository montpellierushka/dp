<template>
  <div class="min-h-screen bg-gradient-to-br from-base-200 via-base-100 to-primary/10">
    <PageHeader
      title="Достижения"
      description="Отслеживайте свой прогресс и получайте награды за кулинарные подвиги!"
    />
    
    <div class="container mx-auto px-4 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div class="lg:col-span-3">
          <AchievementsList />
        </div>
        
        <div class="space-y-6">
          <div class="card bg-white shadow-xl">
            <div class="card-body">
              <h2 class="text-2xl font-bold mb-4">Статистика</h2>
              <div class="space-y-4">
                <div class="flex items-center justify-between">
                  <span class="text-gray-600">Всего достижений</span>
                  <span class="font-bold">{{ achievements.length }}</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-gray-600">Разблокировано</span>
                  <span class="font-bold text-primary">
                    {{ achievements.filter(a => a.unlocked).length }}
                  </span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-gray-600">В процессе</span>
                  <span class="font-bold text-secondary">
                    {{ achievements.filter(a => !a.unlocked).length }}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div class="card bg-white shadow-xl">
            <div class="card-body">
              <h2 class="text-2xl font-bold mb-4">Советы</h2>
              <ul class="space-y-3">
                <li class="flex items-start gap-3">
                  <span class="text-primary">•</span>
                  <span>Готовьте блюда из разных стран, чтобы получить больше достижений</span>
                </li>
                <li class="flex items-start gap-3">
                  <span class="text-primary">•</span>
                  <span>Участвуйте в челленджах для быстрого прогресса</span>
                </li>
                <li class="flex items-start gap-3">
                  <span class="text-primary">•</span>
                  <span>Делитесь своими рецептами с сообществом</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAchievements } from '~/composables/useAchievements'

const { achievements } = useAchievements()
</script>

<style scoped>
.card {
  @apply rounded-xl overflow-hidden transition-all duration-300;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.card {
  animation: fadeIn 0.5s ease-out;
}
</style> 