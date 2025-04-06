import { ref } from 'vue'
import { API_ENDPOINTS } from '~/config/api'

export interface Tag {
    id: number
    name: string
}

interface TagValidation {
    minLength: number
    maxLength: number
    pattern: RegExp
}

export const useTags = () => {
    const api = useApi()
    const tags = ref<Tag[]>([])
    const loading = ref(false)
    const error = ref('')

    const loadTags = async () => {
        try {
            const response = await api.get<Tag[]>(API_ENDPOINTS.tags.list)
            tags.value = response
        } catch (e) {
            console.error('Error loading tags:', e)
            error.value = 'Ошибка при загрузке тегов'
        }
    }

    const createTag = async (name: string) => {
        try {
            const response = await api.post<Tag>(API_ENDPOINTS.tags.create, { name })
            tags.value.push(response)
            return response
        } catch (e) {
            console.error('Error creating tag:', e)
            error.value = 'Ошибка при создании тега'
            throw e
        }
    }

    const updateTag = async (id: number, name: string) => {
        try {
            const response = await api.put<Tag>(`/api/tags/${id}`, { name })
            return response
        } catch (e) {
            console.error('Error updating tag:', e)
            throw e
        }
    }

    const deleteTag = async (id: number) => {
        try {
            await api.del(`/api/tags/${id}`)
        } catch (e) {
            console.error('Error deleting tag:', e)
            throw e
        }
    }

    return {
        tags,
        loading,
        error,
        loadTags,
        createTag,
        updateTag,
        deleteTag
    }
} 