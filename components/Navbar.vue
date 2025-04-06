<template>
    <div class="navbar bg-base-100 shadow-lg">
        <div class="navbar-start">
            <div class="dropdown">
                <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
                    <Icon name="mdi:menu" size="24" />
                </div>
                <ul
                    tabindex="0"
                    class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                >
                    <li>
                        <NuxtLink to="/recipes">Рецепты</NuxtLink>
                    </li>
                    <li>
                        <NuxtLink to="/favorites">Избранное</NuxtLink>
                    </li>
                    <li v-if="user">
                        <NuxtLink to="/profile">Профиль</NuxtLink>
                    </li>
                </ul>
            </div>
            <NuxtLink to="/" class="btn btn-ghost text-xl">
                Рецепты
            </NuxtLink>
        </div>
        <div class="navbar-center hidden lg:flex">
            <ul class="menu menu-horizontal px-1">
                <li>
                    <NuxtLink to="/recipes">Рецепты</NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/favorites">Избранное</NuxtLink>
                </li>
                <li v-if="user">
                    <NuxtLink to="/profile">Профиль</NuxtLink>
                </li>
            </ul>
        </div>
        <div class="navbar-end">
            <template v-if="user">
                <div class="dropdown dropdown-end">
                    <div
                        tabindex="0"
                        role="button"
                        class="btn btn-ghost btn-circle avatar"
                    >
                        <div class="w-10 rounded-full">
                            <img
                                :src="user.photo_url"
                                :alt="user.name"
                            />
                        </div>
                    </div>
                    <ul
                        tabindex="0"
                        class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                    >
                        <li>
                            <NuxtLink to="/profile" class="justify-between">
                                Профиль
                            </NuxtLink>
                        </li>
                        <li>
                            <button @click="logout">Выйти</button>
                        </li>
                    </ul>
                </div>
            </template>
            <template v-else>
                <NuxtLink to="/auth" class="btn btn-primary">
                    Войти
                </NuxtLink>
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useAuth } from '~/composables/useAuth'
import { useRouter } from 'vue-router'

const { user, logout: authLogout } = useAuth()
const router = useRouter()

const logout = async () => {
    try {
        await authLogout()
        router.push('/')
    } catch (e) {
        console.error('Error logging out:', e)
    }
}
</script> 