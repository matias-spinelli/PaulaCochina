import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
export class RecipeNewComponent implements OnInit {
  recipe: Recipe = {
    _id: '0', 
    name: '',
    description: '',
    imagePath: '',
    ingredients: []
  };

  //units = UNITS;
  recipeForm: FormGroup = new FormGroup({});

  constructor(
    private recipeService: RecipeService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.recipeForm = new FormGroup({
      name: new FormControl(this.recipe.name, [
        Validators.required,
      ]),
      description: new FormControl(this.recipe.description, [
        Validators.required,
        Validators.minLength(3),
      ]),
      imagePath: new FormControl(this.recipe.imagePath),
    })
  }

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

  get name() {
    return this.recipeForm.get('name')!;
  }
  
  get description() {
    return this.recipeForm.get('description')!;
  }
  
  getNameError(): string {
    if (this.name.hasError('required')) {
      return 'El título es obligatorio';
    }
    return '';
  }
  
  getDescriptionError(): string {
    if (this.description.hasError('required')) {
      return 'La descripción es obligatoria';
    }
    if (this.description.hasError('minlength')) {
      return 'Debe tener al menos 3 caracteres';
    }
    return '';
  }
}
