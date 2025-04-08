export interface RecipeStep {
    id?: number
    recipe_id?: number
    step_number?: number
    description: string
    image?: string
    created_at?: string
    updated_at?: string
}

export interface Recipe {
    id: number
    title: string
    description: string
    image_url: string
    cooking_time: number
    servings: number
    difficulty: 'easy' | 'medium' | 'hard'
    country: {
        id: number
        name: string
        code: string
        flag: string
        description: string
        created_at: string
        updated_at: string
    }
    tags: Array<{
        id: number
        name: string
        slug: string
        description: string
        created_at: string
        updated_at: string
        pivot: {
            recipe_id: number
            tag_id: number
        }
    }>
    ingredients: Array<{
        name: string
        amount: string
        unit: string
    }>
    steps: RecipeStep[]
    author: {
        id: number
        name: string
        photo_url: string
    }
    created_at: string
    updated_at: string
    is_favorite: boolean
    favorites_count?: number
}

export interface RecipeWithFavorites extends Recipe {
    favorites_count: number
}

export interface Tag {
    id: number
    name: string
    slug: string
    description: string
    created_at: string
    updated_at: string
}

export interface RecipeFormData {
    title: string
    description: string
    country_id: number
    cooking_time: number
    servings: number
    difficulty: 'easy' | 'medium' | 'hard'
    tags: number[]
    ingredients: Array<{
        name: string
        amount: string
        unit: string
    }>
    steps: Array<{
        description: string
        image?: File
    }>
    image?: File
} 