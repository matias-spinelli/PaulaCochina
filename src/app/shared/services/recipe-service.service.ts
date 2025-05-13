import { Injectable } from '@angular/core';
import { Recipe } from '@core/models/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipes: Recipe[] = [
    {
      id: '1',
      title: 'Pizza Margarita',
      description: 'Una deliciosa pizza italiana con queso mozzarella y albahaca.',
      imageUrl: 'https://imag.bonviveur.com/pizza-margarita.jpg'
    },
    {
      id: '2',
      title: 'Ensalada César',
      description: 'Lechuga crujiente con aderezo especial y crutones.',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPXmPhvQatOavq0B4uVInIwvTjyv-NRmcBBA&s'
    },
    {
      id: '3',
      title: 'Tacos Mexicanos',
      description: 'Tortillas rellenas de carne, cebolla y cilantro.',
      imageUrl: 'https://www.pequerecetas.com/wp-content/uploads/2020/10/tacos-mexicanos.jpg'
    },
    {
      id: '4',
      title: 'Pastel de Chocolate',
      description: 'Un pastel suave con cobertura de chocolate negro.',
      imageUrl: 'https://resizer.glanacion.com/resizer/v2/torta-de-chocolate-5G4LZ5WTM5H4RHWT257DEGRZQU.jpg?auth=a69092357dfe5b42c4142471e922c292fe15dbf2541c260bf07656c09ea998b7&width=1280&height=854&quality=70&smart=true'
    }
  ];

  getAllRecipes(): Recipe[] {
    return this.recipes;
  }

  getRecipeById(id: string): Recipe | undefined {
    return this.recipes.find(recipe => recipe.id === id);
  }
}