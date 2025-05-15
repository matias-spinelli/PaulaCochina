import { Component, OnInit } from '@angular/core';
import { Recipe } from '@core/models/recipe.model';
import { RecipeService } from '@shared/services/recipe-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { trigger, transition, style, animate } from '@angular/animations';


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

  constructor(private recipeService: RecipeService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.favoriteRecipes = this.recipeService.getFavorites();
  }

  removingMap: { [id: number]: boolean } = {};

  removeFromFavorites(recipe: Recipe): void {
    // 1. Lo quitamos visualmente
    this.favoriteRecipes = this.favoriteRecipes.filter(r => r.id !== recipe.id);
  
    // 2. Mostramos snackbar con opción de deshacer
    const snackBarRef = this.snackBar.open('Receta quitada de favoritos', 'Deshacer', { duration: 3000 });
  
    // 3. Si deshace → lo agregamos otra vez
    snackBarRef.onAction().subscribe(() => {
      this.favoriteRecipes.push(recipe);
      this.recipeService.toggleFavorite(recipe); // Lo vuelve a agregar internamente
    });
  
    // 4. Si NO deshace → ya está fuera del array visual, también fuera del servicio (ya lo hizo en toggleFavorite)
  }
}