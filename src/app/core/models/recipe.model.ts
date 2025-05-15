import { Ingredient } from "./ingredient.model";

export interface Recipe {
    id: number;
    title: string;
    description: string;
    imageUrl: string;  
    ingredients: Ingredient[];
    isFavorite?: boolean;
}