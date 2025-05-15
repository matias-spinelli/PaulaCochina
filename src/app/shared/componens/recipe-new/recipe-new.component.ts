import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Recipe } from '@core/models/recipe.model';
import { UNITS } from '@shared/constants';
import { RecipeService } from '@shared/services/recipe-service.service';

@Component({
  selector: 'app-recipe-new',
  standalone: false,
  templateUrl: './recipe-new.component.html',
  styleUrl: './recipe-new.component.css'
})
export class RecipeNewComponent {
  recipe: Recipe = {
    id: 0, // Se asignará correctamente en el servicio más adelante
    title: '',
    description: '',
    imageUrl: '',
    ingredients: []
  };

  units = UNITS;

  constructor(
    private recipeService: RecipeService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  addIngredient(): void {
    this.recipe.ingredients.push({ name: '', quantity: 0, unit: 'unidad' });
  }

  removeIngredient(index: number): void {
    this.recipe.ingredients.splice(index, 1);
  }

  save(): void {
    // Por ahora solo mostrar un mensaje, se implementará el add real luego
    console.log('Receta nueva:', this.recipe);
    this.snackBar.open('Receta creada (modo simulación)', 'Cerrar', { duration: 3000 });
    this.router.navigate(['/']);
  }
}
