import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '@core/models/recipe.model';
import { RecipeService } from '@shared/services/recipe-service.service';

@Component({
  selector: 'app-recipes-list',
  standalone: false,
  templateUrl: './recipes-list.component.html',
  styleUrl: './recipes-list.component.css'
})
export class RecipesListComponent implements OnInit {
  @Input() recipes: Recipe[] = [];

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void { }
}