import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren:() => import("@modules/recipes/recipes.module").then(m => m.RecipesModule)
  },
  { 
    path: 'ingredientes',
    loadChildren:() => import("@modules/ingredients/ingredients.module").then(m => m.IngredientsModule)
  },
  { 
    path: 'favoritos', 
    loadChildren:() => import("@modules/favorites/favorites.module").then(m => m.FavoritesModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
