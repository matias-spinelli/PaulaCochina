import { Component, OnInit } from '@angular/core';
import { Ingredient } from '@core/models/ingredient.model';
import { RecipeService } from '@shared/services/recipe-service.service';

@Component({
  selector: 'app-shopping-list',
  standalone: false,
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css'
})
export class ShoppingListComponent implements OnInit {
  ingredients: { ingredient: Ingredient; checked: boolean }[] = [];
  private readonly STORAGE_KEY = 'shoppingList';

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    const saved = this.getFromStorage();
    if (saved) {
      this.ingredients = saved;
    } else {
      this.initializeIngredients();
    }
  }

  toggleChecked(index: number): void {
    this.ingredients[index].checked = !this.ingredients[index].checked;
    this.saveToStorage();
  }

  removeChecked(): void {
    const confirmRemove = confirm('¿Seguro querés borrar los ingredientes que ya marcaste?');
    if (confirmRemove) {
      this.ingredients = this.ingredients.filter(item => !item.checked);
      this.saveToStorage();
    }
  }

  resetList(): void {
    const confirmReset = confirm('¿Querés limpiar toda la lista de ingredientes? Esta acción no se puede deshacer.');
    if (confirmReset) {
      this.ingredients.forEach(item => item.checked = false);
      this.saveToStorage();
    }
  }

  restoreOriginal(): void {
    const original = localStorage.getItem('shoppingListOriginal');
    if (original) {
      this.ingredients = JSON.parse(original);
      this.saveToStorage();
    } else {
      // Si no hay lista guardada, regenerar desde las recetas originales
      this.initializeIngredients();
      alert('Lista original restaurada desde las recetas.');
    }
  }

private initializeIngredients(): void {
  const allRecipes = this.recipeService.getAllRecipes();
  const allIngredients: Ingredient[] = allRecipes.flatMap(r => r.ingredients);
  const unique = this.removeDuplicates(allIngredients);

  this.ingredients = unique.map(ing => ({
    ingredient: ing,
    checked: false
  }));

  this.saveToStorage();

  // Solo guardar la lista original si no está en localStorage
  if (!localStorage.getItem('shoppingListOriginal')) {
    try {
      localStorage.setItem('shoppingListOriginal', JSON.stringify(this.ingredients));
    } catch (e) {
      console.warn('No se pudo guardar la lista original:', e);
    }
  }
}

  private removeDuplicates(ingredients: Ingredient[]): Ingredient[] {
    const seen = new Set<string>();
    return ingredients.filter(ing => {
      const key = `${ing.name}-${ing.unit}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  private saveToStorage(): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.ingredients));
    } catch (e) {
      console.warn('No se pudo guardar en localStorage:', e);
    }
  }

  private getFromStorage(): any {
    try {
      const saved = localStorage.getItem(this.STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      console.warn('No se pudo leer de localStorage:', e);
      return null;
    }
  }
}