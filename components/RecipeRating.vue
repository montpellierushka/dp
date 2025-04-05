<template>
  <div class="flex items-center">
    <div class="flex">
      <button
        v-for="star in 5"
        :key="star"
        @click="handleRating(star)"
        class="focus:outline-none"
        :disabled="!interactive"
      >
        <Icon
          :name="star <= rating ? 'star-solid' : 'star'"
          class="w-4 h-4 sm:w-5 sm:h-5"
          :class="[
            star <= rating ? 'text-yellow-400' : 'text-gray-300',
            interactive ? 'hover:text-yellow-400' : ''
          ]"
        />
      </button>
    </div>
    <span v-if="showCount" class="ml-1 sm:ml-2 text-xs sm:text-sm text-gray-500">
      ({{ count }})
    </span>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  rating: number
  count?: number
  showCount?: boolean
  interactive?: boolean
}>(), {
  count: 0,
  showCount: false,
  interactive: false
})

const emit = defineEmits<{
  (e: 'update:rating', value: number): void
}>()

const handleRating = (value: number) => {
  if (props.interactive) {
    emit('update:rating', value)
  }
}
</script> 