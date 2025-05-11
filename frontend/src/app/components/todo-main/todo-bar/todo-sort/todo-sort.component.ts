// src/app/components/todo-main/todo-bar/todo-sort/todo-sort.component.ts
import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo-sort',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo-sort.component.html',
})
export class TodoSortComponent {
  @Output() sortChange = new EventEmitter<'asc' | 'desc' | 'none'>();
  currentSort: 'asc' | 'desc' | 'none' = 'none';

  toggleSort() {
    const sorts: ('asc' | 'desc' | 'none')[] = ['none', 'asc', 'desc'];
    const currentIndex = sorts.indexOf(this.currentSort);
    this.currentSort = sorts[(currentIndex + 1) % 3];
    this.sortChange.emit(this.currentSort);
  }
}
