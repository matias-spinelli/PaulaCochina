import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { RecipesListComponent } from './components/recipes-list/recipes-list.component';
import { RecipeCardComponent } from './components/recipe-card/recipe-card.component';
import { RecipeDetailComponent } from './components/recipe-detail/recipe-detail.component';
import { RouterModule } from '@angular/router';
import { FormatIngredientPipe } from './pipe/format-ingredient.pipe';
import { UnitLabelPipe } from './pipe/unit-label.pipe';
import { HeartAnimateDirective } from './directives/heart-animate.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecipeNewComponent } from './components/recipe-new/recipe-new.component';
import { RecipeCardNewComponent } from './components/recipe-card-new/recipe-card-new.component';
import { RecipeSearchComponent } from './components/recipe-search/recipe-search.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ConfirmDeleteRecipeDialogComponent } from './components/confirm-delete-recipe-dialog/confirm-delete-recipe-dialog.component';
import { ImgBrokenDirective } from './directives/img-broken.directive';

@NgModule({
  declarations: [
    TopBarComponent,
    RecipesListComponent,
    RecipeCardComponent,
    RecipeDetailComponent,
    RecipeCardNewComponent,
    RecipeNewComponent,
    RecipeSearchComponent,
    UnitLabelPipe,
    FormatIngredientPipe,
    HeartAnimateDirective,
    ImgBrokenDirective,
    LoadingSpinnerComponent,
    ConfirmDialogComponent,
    ConfirmDeleteRecipeDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule
  ],
  exports: [
    TopBarComponent,
    RecipesListComponent,
    RecipeCardComponent,
    RecipeCardNewComponent,
    RecipeNewComponent,
    RecipeSearchComponent,
    UnitLabelPipe,
    FormatIngredientPipe,
    HeartAnimateDirective,
    ImgBrokenDirective,
    LoadingSpinnerComponent
  ]
})
export class SharedModule { }
