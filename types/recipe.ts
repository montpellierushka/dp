export interface Ingredient {
  name: string;
  amount: string;
}

export interface Recipe {
  id: number;
  title: string;
  description: string;
  image_url?: string;
  country: string;
  cookingTime: number;
  servings: number;
  ingredients: Ingredient[];
  instructions: string[];
  tags: string[];
  is_liked?: boolean;
  is_favorite?: boolean;
  rating?: number;
  reviews?: Review[];
  imageUrl?: string;
}

export interface RecipeForm {
  title: string;
  description: string;
  country: string;
  cookingTime: number;
  servings: number;
  ingredients: Ingredient[];
  instructions: string[];
  tags: string[];
} 