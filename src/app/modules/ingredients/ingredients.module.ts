import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IngredientsRoutingModule } from './ingredients-routing.module';
import { ShoppingListComponent } from './pages/shopping-list/shopping-list.component';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [
    ShoppingListComponent
  ],
  imports: [
    CommonModule,
    IngredientsRoutingModule,
    SharedModule
  ]
})
export class IngredientsModule { }
