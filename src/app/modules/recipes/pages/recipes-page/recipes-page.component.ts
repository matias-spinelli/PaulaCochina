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
  loading = true;

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.recipeService.getAllRecipes$().subscribe({
      next: recipes => {
        this.allRecipes = recipes;
        this.filteredRecipes = recipes;
      },
      error: (err) => {
        console.error('Error al cargar las recetas:', err);
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  onSearch(term: string): void {
    this.searchTerm = term;
    this.filteredRecipes = this.recipeService.filterRecipes(term, this.allRecipes);
  }

  removeFromFavorites(recipe: Recipe): void {

  }
}
