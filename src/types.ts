export interface Habit {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  completed: boolean;
  points: number;
}

export interface Exercise {
  id: number;
  name: string;
  subtitle: string;
  durationSeconds: number;
  formTip: string;
  debloatMechanism: string;
  category: string;
  instructionSteps: string[];
}

export type MealCategory = 'debloat_lunches' | 'quick_dinners' | 'hydrating_snacks';

export interface MealRecipe {
  id: string;
  category: MealCategory;
  title: string;
  timeToMake: string;
  calories: number;
  protein: number;
  keyIngredient: string;
  benefit: string;
  imageUrl: string;
  ingredients: string[];
}

export interface DailyStats {
  waterCurrentMl: number;
  waterGoalMl: number;
  streakDays: number;
  habits: Habit[];
  plannedMealIds: string[];
}
