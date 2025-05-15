import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from '@core/models/recipe.model';
import { RecipeService } from '@shared/services/recipe-service.service';
import { trigger, transition, style, animate, keyframes } from '@angular/animations';

@Component({
  selector: 'app-recipe-detail',
  standalone: false,
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
  animations: [
    trigger('pop', [
      transition('* => *', [
        animate(
          '300ms ease-out',
          keyframes([
            style({ transform: 'scale(1)', offset: 0 }),
            style({ transform: 'scale(1.4)', offset: 0.5 }),
            style({ transform: 'scale(1)', offset: 1 }),
          ])
        ),
      ]),
    ]),
  ],
})

export class RecipeDetailComponent implements OnInit {
  recipe!: Recipe;
  isFav = false;
  hasInteracted = false;

  constructor(private route: ActivatedRoute,private recipeService: RecipeService) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      const found = this.recipeService.getRecipeById(id);

      if (!found) {
        // Manejo si no se encuentra (podés redirigir o mostrar algo)
        console.error('Receta no encontrada');
        return;
      }

      this.recipe = found;
      this.isFav = this.recipeService.isFavorite(id);
    }
  }

  toggleFavorite(): void {
    this.recipeService.toggleFavorite(this.recipe);
    this.isFav = !this.isFav;
    this.hasInteracted = true;
  }
}