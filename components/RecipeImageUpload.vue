<template>
  <div class="space-y-4">
    <div v-if="previewUrl || initialImage" class="relative">
      <img 
        :src="previewUrl || initialImage" 
        alt="Предпросмотр"
        class="w-full h-64 object-cover rounded-lg"
      >
      <button
        @click="removeImage"
        class="absolute top-2 right-2 p-2 bg-white/80 hover:bg-white rounded-full transition-colors"
      >
        <Icon name="trash" class="w-5 h-5 text-red-500" />
      </button>
    </div>

    <div 
      v-else
      class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-500 transition-colors"
      @click="triggerFileInput"
    >
      <Icon name="plus" class="w-12 h-12 text-gray-400 mx-auto mb-4" />
      <p class="text-gray-500">Нажмите для загрузки изображения</p>
      <p class="text-sm text-gray-400 mt-2">Поддерживаются форматы JPG и PNG, до 5MB</p>
    </div>

    <input
      ref="fileInput"
      type="file"
      accept="image/jpeg,image/png"
      class="hidden"
      @change="handleFileChange"
    >

    <div v-if="uploadProgress > 0 && uploadProgress < 100" class="w-full bg-gray-200 rounded-full h-2.5">
      <div 
        class="bg-blue-500 h-2.5 rounded-full transition-all duration-300"
        :style="{ width: `${uploadProgress}%` }"
      ></div>
    </div>

    <div v-if="error" class="text-red-500 text-sm">
      {{ error }}
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  initialImage?: string
}>()

const emit = defineEmits<{
  (e: 'image-uploaded', url: string): void
}>()

const fileInput = ref<HTMLInputElement | null>(null)
const previewUrl = ref<string>('')
const uploadProgress = ref(0)
const error = ref('')

const triggerFileInput = () => {
  fileInput.value?.click()
}

const handleFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  
  if (!file) {
    return
  }

  // Проверяем, что file.type существует и является строкой
  if (!file.type || typeof file.type !== 'string') {
    error.value = 'Не удалось определить тип файла'
    return
  }

  // Проверяем формат файла
  const allowedTypes = ['image/jpeg', 'image/png']
  if (!allowedTypes.includes(file.type)) {
    error.value = 'Поддерживаются только форматы JPG и PNG'
    return
  }

  // Проверяем размер файла
  if (file.size > 5 * 1024 * 1024) {
    error.value = 'Размер файла не должен превышать 5MB'
    return
  }

  // Создаем превью изображения
  const reader = new FileReader()
  reader.onload = (e) => {
    previewUrl.value = e.target?.result as string
  }
  reader.readAsDataURL(file)

  // Имитируем загрузку
  uploadProgress.value = 0
  error.value = null

  const interval = setInterval(() => {
    uploadProgress.value += 10
    if (uploadProgress.value >= 100) {
      clearInterval(interval)
      setTimeout(() => {
        emit('image-uploaded', URL.createObjectURL(file))
      }, 500)
    }
  }, 200)
}

const removeImage = () => {
  previewUrl.value = ''
  if (fileInput.value) {
    fileInput.value.value = ''
  }
  emit('image-uploaded', '')
}
</script> 