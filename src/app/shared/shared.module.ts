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
import { FormsModule } from '@angular/forms';
import { RecipeNewComponent } from './componens/recipe-new/recipe-new.component';
import { RecipeCardNewComponent } from './componens/recipe-card-new/recipe-card-new.component';
import { RecipeSearchComponent } from './componens/recipe-search/recipe-search.component';

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
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
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
    HeartAnimateDirective
  ]
})
export class SharedModule { }
