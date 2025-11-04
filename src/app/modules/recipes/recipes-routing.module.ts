import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipesPageComponent } from './pages/recipes-page/recipes-page.component';
import { RecipeDetailComponent } from '@shared/components/recipe-detail/recipe-detail.component';
import { RecipeNewComponent } from '@shared/components/recipe-new/recipe-new.component';

const routes: Routes = [
  {
    path: "",
    component: RecipesPageComponent
  },
  { 
    path: 'recipe/:id', 
    component: RecipeDetailComponent
  },
  { 
    path: 'recipe-new', 
    component: RecipeNewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipesRoutingModule { }
