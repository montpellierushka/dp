export interface Country {
  id: string;
  name: string;
  code: string;
  continent: string;
  recipesCount: number;
  difficulty: 'easy' | 'medium' | 'hard';
  completionRate: number;
  coordinates: [number, number];
}

export interface Continent {
  id: string;
  name: string;
  countries: Country[];
  completionRate: number;
}

export interface UserProgress {
  completedCountries: string[];
  completedContinents: string[];
  totalRecipesCooked: number;
  achievements: string[];
}

export interface MapStats {
  totalCountries: number;
  totalRecipes: number;
  totalUsers: number;
  averageCompletionRate: number;
} 