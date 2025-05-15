import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Recipe } from '@core/models/recipe.model';
import { RecipeService } from '@shared/services/recipe-service.service';
import { trigger, transition, style, animate, keyframes } from '@angular/animations';


@Component({
  selector: 'app-recipe-card',
  standalone: false,
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.css'],
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
export class RecipeCardComponent {
  @Input() recipe!: Recipe;
  @Output() unfavorite = new EventEmitter<Recipe>();

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
  }

  get isFav(): boolean {
    return this.recipeService.isFavorite(this.recipe.id);
  }

  toggleFavorite(event: MouseEvent): void {
    event.stopPropagation();
  
    const isNowFavorite = this.recipeService.toggleFavorite(this.recipe);
  
    if (!isNowFavorite) {
      this.unfavorite.emit(this.recipe);
    }
  }
}