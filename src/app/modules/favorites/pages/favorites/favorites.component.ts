import { Component, OnInit } from '@angular/core';
import { Recipe } from '@core/models/recipe.model';
import { RecipeService } from '@shared/services/recipe-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { trigger, transition, style, animate } from '@angular/animations';
import { RecipesListType } from '@shared/componens/recipes-list/recipes-list-type.enum';

@Component({
  selector: 'app-favorites',
  standalone: false,
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-out', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class FavoritesComponent implements OnInit {
  favoriteRecipes: Recipe[] = [];
  listTypes = RecipesListType;
  private recentlyRemoved: { recipe: Recipe; index: number }[] = [];
  removingMap: { [id: number]: boolean } = {};

  constructor(private recipeService: RecipeService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.favoriteRecipes = this.recipeService.getFavorites();
  }

  removeFromFavorites(recipe: Recipe): void {
    const index = this.favoriteRecipes.findIndex(r => r.id === recipe.id);
    if (index === -1) return;

    // 1. Quitar visualmente
    this.favoriteRecipes.splice(index, 1);
    this.recentlyRemoved.push({ recipe, index });

    // 2. Quitar del servicio explícitamente
    this.recipeService.removeFavorite(recipe);

    // 3. Mostrar Snackbar con opción deshacer
    const snackRef = this.snackBar.open('Receta quitada de favoritos', 'Deshacer', { duration: 3000 });

    snackRef.onAction().subscribe(() => {
      const last = this.recentlyRemoved.pop();
      if (!last) return;

      // 4. Restaurar en el servicio explícitamente
      this.recipeService.addFavorite(last.recipe);

      // 5. Restaurar visualmente en la misma posición
      this.favoriteRecipes.splice(last.index, 0, last.recipe);
    });

    // 6. Limpiar el array de removidos si no se deshace
    snackRef.afterDismissed().subscribe(info => {
      if (!info.dismissedByAction) {
        this.recentlyRemoved = this.recentlyRemoved.filter(r => r.recipe.id !== recipe.id);
      }
    });
  }
}
