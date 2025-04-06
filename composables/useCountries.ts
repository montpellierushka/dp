import { ref } from 'vue'
import { useApi } from './useApi'

interface Country {
    id: number
    name: string
}

export const useCountries = () => {
    const api = useApi()
    const countries = ref<Country[]>([])

    const loadCountries = async () => {
        try {
            const response = await api.get<Country[]>('/api/countries')
            countries.value = response
        } catch (e) {
            console.error('Error loading countries:', e)
            throw e
        }
    }

    const createCountry = async (name: string) => {
        try {
            const response = await api.post<Country>('/api/countries', { name })
            return response
        } catch (e) {
            console.error('Error creating country:', e)
            throw e
        }
    }

    const updateCountry = async (id: number, name: string) => {
        try {
            const response = await api.put<Country>(`/api/countries/${id}`, { name })
            return response
        } catch (e) {
            console.error('Error updating country:', e)
            throw e
        }
    }

    const deleteCountry = async (id: number) => {
        try {
            await api.del(`/api/countries/${id}`)
        } catch (e) {
            console.error('Error deleting country:', e)
            throw e
        }
    }

    return {
        countries,
        loadCountries,
        createCountry,
        updateCountry,
        deleteCountry
    }
}