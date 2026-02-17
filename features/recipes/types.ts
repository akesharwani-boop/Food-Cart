export interface Recipe {
  id: number;
  name: string;
  image: string;
  cuisine: string;
  rating: number;
  reviewCount: number;
  prepTimeMinutes: number;
  ingredients: string[];
  instructions: string;
}