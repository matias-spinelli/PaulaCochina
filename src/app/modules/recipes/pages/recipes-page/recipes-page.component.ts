import { Component, OnInit } from '@angular/core';
import { Recipe } from '@core/models/recipe.model';
import { RecipesListType } from '@shared/componens/recipes-list/recipes-list-type.enum';
import { RecipeService } from '@shared/services/recipe-service.service';

@Component({
  selector: 'app-recipes-page',
  standalone: false,
  templateUrl: './recipes-page.component.html',
  styleUrl: './recipes-page.component.css'
})
export class RecipesPageComponent implements OnInit {
  allRecipes: Recipe[] = [];
  searchTerm = '';
  filteredRecipes: Recipe[] = [];
  listTypes = RecipesListType;

  constructor(private recipeService: RecipeService) {}
  
  ngOnInit(): void {
    this.allRecipes = this.recipeService.getAllRecipes();
    this.filteredRecipes = this.allRecipes;
  }

  onSearch(term: string): void {
    this.searchTerm = term;
    this.filteredRecipes = this.recipeService.filterRecipes(term, this.allRecipes);
  }

  removeFromFavorites(recipe: Recipe): void {

  }
}
