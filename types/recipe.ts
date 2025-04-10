export interface Ingredient {
  name: string;
  amount: string;
}

export interface RecipeForm {
  title: string;
  country: string;
  cookingTime: number;
  servings: number;
  description: string;
  ingredients: Ingredient[];
  instructions: string[];
  tags: string[];
}

export interface Recipe extends RecipeForm {
  id: string;
  createdAt: string;
  updatedAt: string;
  authorId: string;
  likes: number;
  views: number;
} 