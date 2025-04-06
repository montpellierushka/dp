import { ref } from 'vue'
import { useApi } from './useApi'
import { API_ENDPOINTS } from '~/config/api'

interface ImageUploadResponse {
    url: string
}

interface ImageConfig {
    maxSize: number
    allowedTypes: string[]
}

export const useImages = () => {
    const api = useApi()
    const loading = ref(false)
    const error = ref('')

    const uploadImage = async (file: File): Promise<string> => {
        loading.value = true
        error.value = ''
        try {
            const formData = new FormData()
            formData.append('image', file)
            const response = await api.post<ImageUploadResponse>(API_ENDPOINTS.images.upload, formData)
            return response.url
        } catch (e) {
            error.value = 'Ошибка при загрузке изображения'
            console.error('Error uploading image:', e)
            throw e
        } finally {
            loading.value = false
        }
    }

    const deleteImage = async (url: string): Promise<void> => {
        loading.value = true
        error.value = ''
        try {
            await api.del(`/api/images/delete?url=${encodeURIComponent(url)}`)
        } catch (e) {
            error.value = 'Ошибка при удалении изображения'
            console.error('Error deleting image:', e)
            throw e
        } finally {
            loading.value = false
        }
    }

    return {
        loading,
        error,
        uploadImage,
        deleteImage
    }
} 