import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-recipe-search',
  standalone: false,
  templateUrl: './recipe-search.component.html',
  styleUrl: './recipe-search.component.css'
})
export class RecipeSearchComponent {
  searchTerm: string = '';

  @Output() search = new EventEmitter<string>();

  onSearchChange(): void {
    this.search.emit(this.searchTerm.trim());
  }
}
