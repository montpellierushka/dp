<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-md w-full space-y-8">
            <div>
                <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Вход через Telegram
                </h2>
            </div>
            <div class="mt-8 space-y-6">
                <div v-if="error" class="alert alert-error">
                    <span>{{ error }}</span>
                </div>
                <button
                    @click="login"
                    class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    :disabled="loading"
                >
                    <span v-if="loading" class="absolute left-0 inset-y-0 flex items-center pl-3">
                        <div class="loading loading-spinner loading-sm"></div>
                    </span>
                    Войти через Telegram
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuth } from '~/composables/useAuth'

const { login: authLogin, loading, error } = useAuth()

const login = async () => {
    try {
        await authLogin()
    } catch (e) {
        const err = e as Error
        console.error('Error logging in:', err)
    }
}
</script> 