import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-recipe-card',
  standalone: false,
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.css']
})
export class RecipeCardComponent {
  @Input() title: string = 'Título de receta';
  @Input() description: string = 'Descripción breve de la receta...';
  @Input() imageUrl: string = 'https://via.placeholder.com/300x200';
  @Input() recipeId!: string;

}