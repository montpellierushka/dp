<template>
    <div class="min-h-screen flex items-center justify-center bg-base-200">
        <div class="card bg-base-100 shadow-xl w-full max-w-md">
            <div class="card-body">
                <h2 class="card-title text-center">Авторизация</h2>
                <p class="text-center mb-4">
                    Для использования приложения необходимо авторизоваться через Telegram
                </p>

                <div v-if="loading" class="text-center py-8">
                    <div class="loading loading-spinner loading-lg"></div>
                </div>

                <div v-else-if="error" class="alert alert-error">
                    {{ error }}
                </div>

                <div v-else class="flex flex-col items-center gap-4">
                    <button
                        class="btn btn-primary w-full"
                        @click="login"
                    >
                        <Icon name="mdi:telegram" size="24" />
                        Войти через Telegram
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuth } from '~/composables/useAuth'
import { useRouter } from 'vue-router'

const { login: authLogin } = useAuth()
const router = useRouter()

const loading = ref(false)
const error = ref('')

const login = async () => {
    try {
        loading.value = true
        error.value = ''

        await authLogin()
        router.push('/')
    } catch (e) {
        error.value = e.response?.data?.message || 'Произошла ошибка при авторизации'
        console.error('Error logging in:', e)
    } finally {
        loading.value = false
    }
}
</script> 