import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Recipe } from '@core/models/recipe.model';
//import { UNITS } from '@shared/constants';
import { RecipeService } from '@shared/services/recipe-service.service';

@Component({
  selector: 'app-recipe-new',
  standalone: false,
  templateUrl: './recipe-new.component.html',
  styleUrl: './recipe-new.component.css'
})
export class RecipeNewComponent {
  recipe: Recipe = {
    _id: '0', 
    name: '',
    description: '',
    imagePath: '',
    ingredients: []
  };

  //units = UNITS;

  constructor(
    private recipeService: RecipeService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  addIngredient(): void {
    this.recipe.ingredients.push({ name: '', amount: 0 });
    //this.recipe.ingredients.push({ name: '', quantity: 0, unit: 'unidad' });
  }

  removeIngredient(index: number): void {
    this.recipe.ingredients.splice(index, 1);
  }

  save(): void {
    this.recipeService.addRecipe(this.recipe).subscribe({
      next: (created) => {
        this.snackBar.open('Receta creada con éxito', 'Cerrar', { duration: 3000 });
        //this.router.navigate(['/recipes', created.id]);
        this.router.navigate(['/']);
      },
      error: () => {
        this.snackBar.open('Error al crear receta', 'Cerrar', { duration: 3000 });
      }
    });
  }
}
