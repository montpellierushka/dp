import { ref } from 'vue'
import { useAuth } from './useAuth'

interface Challenge {
  id: number
  country: {
    name: string
    flag: string
  }
  title: string
  description: string
  completed: number
  total: number
  recipes: number[]
  reward: {
    type: 'achievement' | 'badge'
    id: number
  }
}

export const useChallenges = () => {
  const { user } = useAuth()
  const challenges = ref<Challenge[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const loadChallenges = async () => {
    if (!user.value) return

    loading.value = true
    error.value = null

    try {
      const response = await fetch('/api/challenges', {
        headers: {
          'Authorization': `Bearer ${user.value.token}`
        }
      })

      if (!response.ok) {
        throw new Error('Failed to load challenges')
      }

      const data = await response.json()
      challenges.value = data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Произошла ошибка при загрузке челленджей'
      console.error('Error loading challenges:', err)
    } finally {
      loading.value = false
    }
  }

  const acceptChallenge = async (challengeId: number) => {
    if (!user.value) return

    loading.value = true
    error.value = null

    try {
      const response = await fetch(`/api/challenges/${challengeId}/accept`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${user.value.token}`
        }
      })

      if (!response.ok) {
        throw new Error('Failed to accept challenge')
      }

      // Обновляем статус челленджа в локальном списке
      const updatedChallenge = await response.json()
      const index = challenges.value.findIndex(c => c.id === challengeId)
      if (index !== -1) {
        challenges.value[index] = updatedChallenge
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Произошла ошибка при принятии челленджа'
      console.error('Error accepting challenge:', err)
    } finally {
      loading.value = false
    }
  }

  const completeRecipe = async (challengeId: number, recipeId: number) => {
    if (!user.value) return

    loading.value = true
    error.value = null

    try {
      const response = await fetch(`/api/challenges/${challengeId}/complete-recipe`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${user.value.token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ recipeId })
      })

      if (!response.ok) {
        throw new Error('Failed to complete recipe')
      }

      // Обновляем прогресс челленджа
      const updatedChallenge = await response.json()
      const index = challenges.value.findIndex(c => c.id === challengeId)
      if (index !== -1) {
        challenges.value[index] = updatedChallenge
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Произошла ошибка при завершении рецепта'
      console.error('Error completing recipe:', err)
    } finally {
      loading.value = false
    }
  }

  return {
    challenges,
    loading,
    error,
    loadChallenges,
    acceptChallenge,
    completeRecipe
  }
} 