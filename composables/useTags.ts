import { ref } from 'vue'
import { useApi } from './useApi'

interface Tag {
    id: number
    name: string
}

export const useTags = () => {
    const api = useApi()
    const tags = ref<Tag[]>([])

    const loadTags = async () => {
        try {
            const response = await api.get<Tag[]>('/api/tags')
            tags.value = response
        } catch (e) {
            console.error('Error loading tags:', e)
            throw e
        }
    }

    const createTag = async (name: string) => {
        try {
            const response = await api.post<Tag>('/api/tags', { name })
            return response
        } catch (e) {
            console.error('Error creating tag:', e)
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
        loadTags,
        createTag,
        updateTag,
        deleteTag
    }
} 