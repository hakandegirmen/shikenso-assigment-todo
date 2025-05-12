// src/app/components/todo-main/todo-bar/todo-search/todo-search.component.ts
import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-search.component.html',
})
export class TodoSearchComponent {
  @Output() searchChange = new EventEmitter<string>();
  searchTerm = '';

  onSearch(value: string) {
    this.searchTerm = value;
    this.searchChange.emit(value);
  }
}
