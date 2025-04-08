import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { API_ENDPOINTS } from '~/config/api'

export interface User {
    id: number
    name: string
    email: string
    telegram_id: string
    photo_url: string
}

export const useAuth = () => {
  const user = ref<User | null>(null)
  const token = ref<string | null>(null)
  const error = ref<string | null>(null)
  const loading = ref(false)

    const loadUser = async () => {
        try {
            const response = await $fetch<User>(API_ENDPOINTS.auth.user)
            user.value = response
        } catch (e) {
            console.error('Error loading user:', e)
        }
    }


    return {
        user,
        loading,
        error,
        loadUser,
    }
} 