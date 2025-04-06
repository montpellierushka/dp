<template>
  <div class="space-y-4">
    <div class="flex items-center justify-between">
      <label class="block text-sm font-medium text-gray-700">
        Изображения рецепта
      </label>
      <span class="text-xs text-gray-500">
        {{ images.length }}/5
      </span>
    </div>

    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      <!-- Загруженные изображения -->
      <div
        v-for="(image, index) in images"
        :key="index"
        class="relative group"
      >
        <img
          :src="image"
          class="w-full h-32 sm:h-40 object-cover rounded-lg"
          :alt="`Изображение рецепта ${index + 1}`"
        >
        <button
          @click="removeImage(index)"
          class="absolute top-2 right-2 p-1 bg-white/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <svg class="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <!-- Кнопка загрузки -->
      <div
        v-if="images.length < 5"
        class="relative"
      >
        <input
          ref="fileInput"
          type="file"
          accept="image/*"
          class="hidden"
          @change="handleFileUpload"
          multiple
        >
        <button
          @click="fileInput?.click()"
          class="w-full h-32 sm:h-40 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          <svg class="w-8 h-8 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
          </svg>
          <span class="text-sm text-gray-500">Добавить фото</span>
        </button>
      </div>
    </div>

    <!-- Сообщение об ошибке -->
    <p v-if="error" class="text-sm text-red-600">
      {{ error }}
    </p>

    <!-- Подсказка -->
    <p class="text-xs text-gray-500">
      Загрузите до 5 фотографий рецепта. Поддерживаемые форматы: JPG, PNG. Максимальный размер файла: 5MB.
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useApi } from '~/composables/useApi'

interface Props {
  modelValue?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: undefined
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const { post } = useApi()
const fileInput = ref<HTMLInputElement | null>(null)
const error = ref('')
const images = ref<string[]>(props.modelValue ? [props.modelValue] : [])

const handleFileUpload = async (event: Event) => {
  const input = event.target as HTMLInputElement
  const files = input.files
  error.value = ''

  if (!files || files.length === 0) {
    return
  }

  if (files.length + images.value.length > 5) {
    error.value = 'Можно загрузить не более 5 изображений'
    return
  }

  for (const file of files) {
    if (file.size > 5 * 1024 * 1024) {
      error.value = 'Размер файла не должен превышать 5MB'
      return
    }

    if (!['image/jpeg', 'image/png'].includes(file.type)) {
      error.value = 'Поддерживаются только форматы JPG и PNG'
      return
    }

    try {
      const formData = new FormData()
      formData.append('image', file)
      
      const response = await post<{ url: string }>('/upload', {
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      
      const newImageUrl = response.url
      images.value.push(newImageUrl)
      emit('update:modelValue', images.value.join(','))
    } catch (e) {
      console.error('Ошибка при загрузке изображения:', e)
      error.value = 'Произошла ошибка при загрузке изображения'
    }
  }
}

const removeImage = (index: number) => {
  images.value.splice(index, 1)
  emit('update:modelValue', images.value.join(','))
}
</script> 