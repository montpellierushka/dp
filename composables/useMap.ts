import { ref, computed } from 'vue'
import type { Country, Continent, UserProgress, MapStats } from '~/types/map'
import { useApi } from './useApi'

export const useMap = () => {
  const { get, loading, error } = useApi()
  const countries = ref<Country[]>([])
  const continents = ref<Continent[]>([])
  const userProgress = ref<UserProgress | null>(null)
  const mapStats = ref<MapStats | null>(null)
  const selectedCountry = ref<Country | null>(null)

  const loadMapData = async () => {
    try {
      const [countriesData, continentsData, progressData, statsData] = await Promise.all([
        get<Country[]>('/map/countries'),
        get<Continent[]>('/map/continents'),
        get<UserProgress>('/map/progress'),
        get<MapStats>('/map/stats')
      ])

      countries.value = countriesData
      continents.value = continentsData
      userProgress.value = progressData
      mapStats.value = statsData
    } catch (e) {
      console.error('Error loading map data:', e)
    }
  }

  const getCountryCompletionStatus = (countryId: string) => {
    if (!userProgress.value) return false
    return userProgress.value.completedCountries.includes(countryId)
  }

  const getContinentCompletionStatus = (continentId: string) => {
    if (!userProgress.value) return false
    return userProgress.value.completedContinents.includes(continentId)
  }

  const getContinentProgress = (continentId: string) => {
    const continent = continents.value.find(c => c.id === continentId)
    if (!continent) return 0

    const completedCountries = continent.countries.filter(country => 
      userProgress.value?.completedCountries.includes(country.id)
    )

    return (completedCountries.length / continent.countries.length) * 100
  }

  const selectCountry = (country: Country) => {
    selectedCountry.value = country
  }

  return {
    countries,
    continents,
    userProgress,
    mapStats,
    selectedCountry,
    loading,
    error,
    loadMapData,
    getCountryCompletionStatus,
    getContinentCompletionStatus,
    getContinentProgress,
    selectCountry
  }
} 