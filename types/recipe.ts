export interface Ingredient {
  id: number;
  name: string;
  amount: number;
  unit: string;
  notes?: string;
}

export interface RecipeStep {
  id: number;
  step_number: number;
  description: string;
  image?: string;
}

export interface Tag {
  id: number;
  name: string;
  slug: string;
}

export interface Country {
  id: number;
  name: string;
  flag?: string;
}

export interface Recipe {
  id: number;
  title: string;
  description: string;
  cooking_time: number;
  servings: number;
  difficulty: 'easy' | 'medium' | 'hard';
  image?: string;
  country_id: number;
  user_id: number;
  created_at: string;
  updated_at: string;
  country?: Country;
  tags?: Tag[];
  ingredients?: Ingredient[];
  steps?: RecipeStep[];
  user?: {
    id: number;
    name: string;
    email: string;
  };
  favorites_count?: number;
  is_favorite?: boolean;
}

export interface RecipeForm {
  title: string;
  description: string;
  country: string;
  cookingTime: number;
  servings: number;
  ingredients: {
    name: string;
    amount: string;
  }[];
  instructions: string[];
  tags: string[];
} 