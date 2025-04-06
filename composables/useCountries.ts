import { ref } from 'vue'
import { useApi } from './useApi'
import { API_ENDPOINTS } from '~/config/api'

export interface Country {
    id: number
    name: string
}

interface CountryValidation {
    minLength: number
    maxLength: number
    pattern: RegExp
}

export const useCountries = () => {
    const api = useApi()
    const countries = ref<Country[]>([])
    const loading = ref(false)
    const error = ref('')

    const loadCountries = async () => {
        try {
            const response = await api.get<Country[]>(API_ENDPOINTS.countries.list)
            countries.value = response
        } catch (e) {
            console.error('Error loading countries:', e)
            error.value = 'Ошибка при загрузке стран'
        }
    }

    const createCountry = async (name: string) => {
        try {
            const response = await api.post<Country>(API_ENDPOINTS.countries.create, { name })
            countries.value.push(response)
            return response
        } catch (e) {
            console.error('Error creating country:', e)
            error.value = 'Ошибка при создании страны'
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
        loading,
        error,
        loadCountries,
        createCountry,
        updateCountry,
        deleteCountry
    }
}