import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from '@core/models/recipe.model';
import { RecipeService } from '@shared/services/recipe-service.service';
import { trigger, transition, style, animate, keyframes } from '@angular/animations';
import { UNITS } from '@shared/constants';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-recipe-detail',
  standalone: false,
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
  animations: [
    trigger('pop', [
      transition('* => *', [
        animate(
          '300ms ease-out',
          keyframes([
            style({ transform: 'scale(1)', offset: 0 }),
            style({ transform: 'scale(1.4)', offset: 0.5 }),
            style({ transform: 'scale(1)', offset: 1 }),
          ])
        ),
      ]),
    ]),
  ],
})

export class RecipeDetailComponent implements OnInit {
  recipe!: Recipe;
  editableRecipe!: Recipe;
  originalRecipe!: Recipe;
  isFav = false;
  editMode = false;
  units = UNITS;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const found = this.recipeService.getRecipeById(id);

    if (!found) {
      console.error('Receta no encontrada');
      return;
    }

    this.recipe = found;
    this.editableRecipe = structuredClone(this.recipe);
    this.originalRecipe = structuredClone(this.recipe);
    this.isFav = this.recipeService.isFavorite(id);
  }

  toggleFavorite(): void {
    this.recipeService.toggleFavorite(this.recipe);
    this.isFav = !this.isFav;
  }

  toggleEditMode(): void {
    this.editableRecipe = structuredClone(this.recipe);
    this.originalRecipe = structuredClone(this.recipe);
    this.editMode = true;
  }

  save(): void {
    this.recipe = { ...this.editableRecipe };
    this.snackBar.open('Receta actualizada con éxito', 'Cerrar', {
      duration: 3000,
    });
    this.editMode = false;
  }

  cancelEdit(): void {
    this.editableRecipe = structuredClone(this.originalRecipe);
    this.editMode = false;
  }

  addIngredient(): void {
    this.editableRecipe.ingredients.push({ name: '', quantity: 0, unit: 'unidad' });
  }

  removeIngredient(index: number): void {
    this.editableRecipe.ingredients.splice(index, 1);
  }
}