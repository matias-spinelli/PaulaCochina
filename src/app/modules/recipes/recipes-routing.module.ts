import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipesPageComponent } from './pages/recipes-page/recipes-page.component';
import { RecipeDetailComponent } from '@shared/componens/recipe-detail/recipe-detail.component';

const routes: Routes = [
  {
    path: "",
    component: RecipesPageComponent
  },
  { 
    path: 'recipe/:id', 
    component: RecipeDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipesRoutingModule { }
