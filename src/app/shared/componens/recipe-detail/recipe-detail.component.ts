import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '@core/models/recipe.model';
import { RecipeService } from '@shared/services/recipe-service.service';
import { trigger, transition, style, animate, keyframes } from '@angular/animations';
//import { UNITS } from '@shared/constants';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteRecipeDialogComponent } from '../confirm-delete-recipe-dialog/confirm-delete-recipe-dialog.component';

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
  //units = UNITS;
  loading = true;

  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = String(this.route.snapshot.paramMap.get('id'));
  
    this.recipeService.getRecipeById$(id).subscribe({
      next: (recipe) => {
        if (recipe) {
          this.recipe = recipe;
          this.editableRecipe = structuredClone(this.recipe);
          this.originalRecipe = structuredClone(this.recipe);
          this.isFav = this.recipeService.isFavorite(id);
        } else {
          console.warn('Receta no encontrada');
        }
      },
      error: (err) => {
        console.error('Error al cargar la receta:', err);
      },
      complete: () => {
        this.loading = false;
      }
    });
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
    if (this.recipe?._id) {
      this.recipeService.updateRecipe(this.recipe._id, this.editableRecipe).subscribe({
        next: (updated) => {
          this.recipe = updated;
          this.snackBar.open('Receta actualizada con éxito', 'Cerrar', { duration: 3000 });
          this.editMode = false;
        },
        error: () => {
          this.snackBar.open('Error al actualizar receta', 'Cerrar', { duration: 3000 });
        }
      });
    }
  }

  onDelete(): void {
    const dialogRef = this.dialog.open(ConfirmDeleteRecipeDialogComponent);
    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed && this.recipe?._id) {
        this.recipeService.deleteRecipe(this.recipe._id).subscribe({
          next: () => {
            this.snackBar.open('Receta eliminada', 'Cerrar', { duration: 3000 });
            this.router.navigate(['/']);
          },
          error: () => {
            this.snackBar.open('Error al eliminar receta', 'Cerrar', { duration: 3000 });
          }
        });
      }
    });
  }
  
  cancelEdit(): void {
    this.editableRecipe = structuredClone(this.originalRecipe);
    this.editMode = false;
  }

  addIngredient(): void {
    this.editableRecipe.ingredients.push({ name: '', amount: 0 });
    //this.editableRecipe.ingredients.push({ name: '', quantity: 0, unit: 'unidad' });
  }

  removeIngredient(index: number): void {
    this.editableRecipe.ingredients.splice(index, 1);
  }
}