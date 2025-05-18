import { Injectable } from '@angular/core';
import { Recipe } from '@core/models/recipe.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private apiUrl = `${environment.apiUrl}/api/recipes`;
  private favoriteRecipes: Recipe[] = [];
  //private recipes: Recipe[] = []
    /* {
      id: 1,
      title: 'Pizza Margarita',
      description: 'Una deliciosa pizza italiana con queso mozzarella y albahaca.',
      imageUrl: 'https://imag.bonviveur.com/pizza-margarita.jpg',
      ingredients: [
        { name: 'masa de pizza', quantity: 1, unit: 'unidad' },
        { name: 'salsa de tomate', quantity: 150, unit: 'g' },
        { name: 'mozzarella', quantity: 200, unit: 'g' },
        { name: 'albahaca fresca', quantity: 5, unit: 'unidad' }
      ]
    },
    {
      id: 2,
      title: 'Ensalada César',
      description: 'Lechuga crujiente con aderezo especial y crutones.',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPXmPhvQatOavq0B4uVInIwvTjyv-NRmcBBA&s',
      ingredients: [
        { name: 'lechuga romana', quantity: 1, unit: 'unidad' },
        { name: 'crutones', quantity: 50, unit: 'g' },
        { name: 'queso parmesano', quantity: 30, unit: 'g' },
        { name: 'aderezo césar', quantity: 60, unit: 'ml' },
        { name: 'pechuga de pollo (opcional)', quantity: 1, unit: 'unidad' }
      ]
    },
    {
      id: 3,
      title: 'Tacos Mexicanos',
      description: 'Tortillas rellenas de carne, cebolla y cilantro.',
      imageUrl: 'https://www.pequerecetas.com/wp-content/uploads/2020/10/tacos-mexicanos.jpg',
      ingredients: [
        { name: 'tortillas de maíz', quantity: 4, unit: 'unidad' },
        { name: 'carne asada', quantity: 150, unit: 'g' },
        { name: 'cebolla', quantity: 1, unit: 'unidad' },
        { name: 'cilantro', quantity: 10, unit: 'g' },
        { name: 'limón', quantity: 1, unit: 'unidad' },
        { name: 'salsa picante', quantity: 20, unit: 'ml' }
      ]
    },
    {
      id: 4,
      title: 'Pastel de Chocolate',
      description: 'Un pastel suave con cobertura de chocolate negro.',
      imageUrl: 'https://resizer.glanacion.com/resizer/v2/torta-de-chocolate-5G4LZ5WTM5H4RHWT257DEGRZQU.jpg?auth=a69092357dfe5b42c4142471e922c292fe15dbf2541c260bf07656c09ea998b7&width=1280&height=854&quality=70&smart=true',
      ingredients: [
        { name: 'harina', quantity: 200, unit: 'g' },
        { name: 'azúcar', quantity: 150, unit: 'g' },
        { name: 'cacao en polvo', quantity: 50, unit: 'g' },
        { name: 'huevos', quantity: 3, unit: 'unidad' },
        { name: 'leche', quantity: 100, unit: 'ml' },
        { name: 'manteca', quantity: 100, unit: 'g' },
        { name: 'polvo para hornear', quantity: 10, unit: 'g' }
      ]
    }
  ]; */

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {
    this.loadFavorites();
  }

  getAllRecipes$(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${this.apiUrl}/get`);
  }

  getRecipeById$(id: string): Observable<Recipe | undefined> {
    return this.getAllRecipes$().pipe(
      map((recipes) => recipes.find(r => r._id === id))
    );
  }

  addFavorite(recipe: Recipe): void {
    const exists = this.favoriteRecipes.some(r => r._id === recipe._id);
    if (!exists) {
      this.favoriteRecipes.push(recipe);
      this.saveFavorites();
    }
  }
  
  removeFavorite(recipe: Recipe): void {
    const index = this.favoriteRecipes.findIndex(r => r._id === recipe._id);
    if (index !== -1) {
      this.favoriteRecipes.splice(index, 1);
      this.saveFavorites();
    }
  }
  
  toggleFavorite(recipe: Recipe): boolean {
    const exists = this.favoriteRecipes.some(r => r._id === recipe._id);
    if (exists) {
      this.removeFavorite(recipe);
      return false;
    } else {
      this.addFavorite(recipe);
      return true;
    }
  }

  getFavorites(): Recipe[] {
    return [...this.favoriteRecipes];
  }

  private saveFavorites(): void {
    localStorage.setItem('favoriteRecipes', JSON.stringify(this.favoriteRecipes));
  }

  private loadFavorites(): void {
    const stored = localStorage.getItem('favoriteRecipes');
    this.favoriteRecipes = stored ? JSON.parse(stored) : [];
  }

  isFavorite(id: string): boolean {
    return this.getFavorites().some(recipe => recipe._id === id);
  }
  
  addRecipe(recipe: Recipe): Observable<Recipe> {
    return this.http.post<Recipe>((`${this.apiUrl}/add`), recipe);
  }

  updateRecipe(id: string, recipe: Recipe): Observable<Recipe> {
    return this.http.put<Recipe>(`${this.apiUrl}/edit/${id}`, recipe);
  }

  deleteRecipe(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }

  filterRecipes(term: string, recipes: Recipe[]): Recipe[] {
    const lowerTerm = term.toLowerCase().trim();
  
    return recipes.filter(recipe => {
      const titleMatch = recipe.name.toLowerCase().includes(lowerTerm);
      const descriptionMatch = recipe.description.toLowerCase().includes(lowerTerm);
      const ingredientsMatch = recipe.ingredients.some(ing =>
        ing.name.toLowerCase().includes(lowerTerm)
      );
  
      return titleMatch || descriptionMatch || ingredientsMatch;
    });
  }
}