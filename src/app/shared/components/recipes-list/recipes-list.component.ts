import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Recipe } from '@core/models/recipe.model';
import { trigger, transition, style, animate } from '@angular/animations';
import { RecipesListType } from './recipes-list-type.enum';

@Component({
  selector: 'app-recipes-list',
  standalone: false,
  templateUrl: './recipes-list.component.html',
  styleUrl: './recipes-list.component.css',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-out', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class RecipesListComponent implements OnInit {
  @Input() recipes: Recipe[] = [];
  @Input() showAddCard = false;
  @Input() listType: RecipesListType = RecipesListType.Home;
  @Output() unfavorite = new EventEmitter<Recipe>();

  constructor(private router: Router) {}

  ngOnInit(): void { }

  navigateToDetail(id: string): void {
    this.router.navigate(['/recipe', id]);
  }

  removeFromFavorites(recipe: Recipe) {
    this.unfavorite.emit(recipe);
  }
}