import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopBarComponent } from './componens/top-bar/top-bar.component';
import { RecipesListComponent } from './componens/recipes-list/recipes-list.component';
import { RecipeCardComponent } from './componens/recipe-card/recipe-card.component';
import { RecipeDetailComponent } from './componens/recipe-detail/recipe-detail.component';
import { RouterModule } from '@angular/router';
import { FormatIngredientPipe } from './pipe/format-ingredient.pipe';
import { UnitLabelPipe } from './pipe/unit-label.pipe';
import { HeartAnimateDirective } from './directives/heart-animate.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecipeNewComponent } from './componens/recipe-new/recipe-new.component';
import { RecipeCardNewComponent } from './componens/recipe-card-new/recipe-card-new.component';
import { RecipeSearchComponent } from './componens/recipe-search/recipe-search.component';
import { LoadingSpinnerComponent } from './componens/loading-spinner/loading-spinner.component';
import { ConfirmDialogComponent } from './componens/confirm-dialog/confirm-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ConfirmDeleteRecipeDialogComponent } from './componens/confirm-delete-recipe-dialog/confirm-delete-recipe-dialog.component';
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
