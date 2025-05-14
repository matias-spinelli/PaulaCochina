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
  ingredients: Ingredient[] = [];

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    const allRecipes = this.recipeService.getAllRecipes();
    const allIngredients = allRecipes.flatMap(recipe => recipe.ingredients);
    this.ingredients = Array.from(new Set(allIngredients)); // eliminar duplicados
  }
}