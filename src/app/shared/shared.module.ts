import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopBarComponent } from './componens/top-bar/top-bar.component';
import { RecipesListComponent } from './componens/recipes-list/recipes-list.component';
import { RecipeCardComponent } from './componens/recipe-card/recipe-card.component';
import { RecipeDetailComponent } from './componens/recipe-detail/recipe-detail.component';
import { RouterModule } from '@angular/router';
import { UnitLabelPipe } from './pipes/unit-label.pipe';
import { FormatIngredientPipe } from './pipes/format-ingredient.pipe';



@NgModule({
  declarations: [
    TopBarComponent,
    RecipesListComponent,
    RecipeCardComponent,
    RecipeDetailComponent,
    UnitLabelPipe,
    FormatIngredientPipe
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    TopBarComponent,
    RecipesListComponent,
    UnitLabelPipe,
    FormatIngredientPipe
  ]
})
export class SharedModule { }
