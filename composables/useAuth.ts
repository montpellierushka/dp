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
    const router = useRouter()
    const user = ref<User | null>(null)
    const loading = ref(false)
    const error = ref('')

    const loadUser = async () => {
        try {
            const response = await $fetch<User>(API_ENDPOINTS.auth.user)
            user.value = response
        } catch (e) {
            console.error('Error loading user:', e)
        }
    }

    const login = async () => {
        loading.value = true
        error.value = ''
        try {
            const response = await $fetch<User>(API_ENDPOINTS.auth.login, {
                method: 'POST',
                body: {
                    initData: window.Telegram.WebApp.initData
                }
            })
            user.value = response
            router.push('/')
        } catch (e) {
            error.value = 'Ошибка при входе'
            console.error('Error logging in:', e)
        } finally {
            loading.value = false
        }
    }

    const logout = async () => {
        try {
            await $fetch(API_ENDPOINTS.auth.logout, {
                method: 'POST',
                credentials: 'include'
            })
            user.value = null
            router.push('/auth')
        } catch (e) {
            console.error('Error logging out:', e)
        }
    }

    return {
        user,
        loading,
        error,
        loadUser,
        login,
        logout
    }
} 