import { ref } from 'vue'
import { useAuth } from './useAuth'

export interface Achievement {
  id: number
  title: string
  description: string
  icon: string
  progress: number
  total: number
  unlocked: boolean
  unlockedAt?: string
}

export const useAchievements = () => {
  const { user } = useAuth()
  const achievements = ref<Achievement[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const loadAchievements = async () => {
    if (!user.value) return

    loading.value = true
    error.value = null

    try {
      const response = await fetch('/api/achievements', {
        headers: {
          'Authorization': `Bearer ${user.value.token}`
        }
      })

      if (!response.ok) {
        throw new Error('Failed to load achievements')
      }

      const data = await response.json()
      achievements.value = data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Произошла ошибка при загрузке достижений'
      console.error('Error loading achievements:', err)
    } finally {
      loading.value = false
    }
  }

  const unlockAchievement = async (achievementId: number) => {
    if (!user.value) return

    loading.value = true
    error.value = null

    try {
      const response = await fetch(`/api/achievements/${achievementId}/unlock`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${user.value.token}`
        }
      })

      if (!response.ok) {
        throw new Error('Failed to unlock achievement')
      }

      // Обновляем статус достижения в локальном списке
      const updatedAchievement = await response.json()
      const index = achievements.value.findIndex(a => a.id === achievementId)
      if (index !== -1) {
        achievements.value[index] = updatedAchievement
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Произошла ошибка при разблокировке достижения'
      console.error('Error unlocking achievement:', err)
    } finally {
      loading.value = false
    }
  }

  return {
    achievements,
    loading,
    error,
    loadAchievements,
    unlockAchievement
  }
} 