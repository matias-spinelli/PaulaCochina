import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-card-new',
  standalone: false,
  templateUrl: './recipe-card-new.component.html',
  styleUrl: './recipe-card-new.component.css'
})
export class RecipeCardNewComponent {

  constructor(private router: Router) {}

  goToCreate(): void {
    this.router.navigate(['/recipe-new'], { queryParams: { mode: 'create' } });
  }
}
