<template>
    <div class="bg-base-200">
        <div class="container mx-auto px-4 py-6">
            <div class="flex justify-between items-center">
                <div>
                    <h1 class="text-3xl font-bold">{{ title }}</h1>
                    <p v-if="description" class="text-gray-500 mt-2">{{ description }}</p>
                </div>
                <div class="flex gap-4">
                    <slot name="actions"></slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    title: string
    description?: string
}>()
</script> 