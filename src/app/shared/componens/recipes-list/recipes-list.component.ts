import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Recipe } from '@core/models/recipe.model';

@Component({
  selector: 'app-recipes-list',
  standalone: false,
  templateUrl: './recipes-list.component.html',
  styleUrl: './recipes-list.component.css'
})
export class RecipesListComponent implements OnInit {
  @Input() recipes: Recipe[] = [];
  @Input() showAddCard = false;

  constructor(private router: Router) {}

  ngOnInit(): void { }

  navigateToDetail(id: number): void {
    this.router.navigate(['/recipe', id]);
  }
}