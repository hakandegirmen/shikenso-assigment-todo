// src/app/components/todo-search/todo-search.component.ts
import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-todo-search',
  templateUrl: './todo-search.component.html',
  styleUrls: ['./todo-search.component.scss'],
})
export class TodoSearchComponent {
  @Output() searchChange = new EventEmitter<string>();
  @Input() searchTerm: string = '';

  onSearch(term: string) {
    this.searchTerm = term;
    this.searchChange.emit(term);
  }

  clearSearch() {
    this.onSearch('');
  }
}
