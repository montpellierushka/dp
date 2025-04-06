<template>
    <div class="bg-base-200 py-8">
        <div class="container mx-auto px-4">
            <div class="flex justify-between items-center">
                <h1 class="text-3xl font-bold">{{ title }}</h1>
                <div class="flex gap-4">
                    <slot name="actions"></slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps({
    title: {
        type: String,
        required: true
    }
})
</script> 