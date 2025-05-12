// src/app/components/todo-main/todo-bar/todo-sort/todo-sort.component.ts
import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  heroChevronUp,
  heroChevronDown,
  heroChevronUpDown,
} from '@ng-icons/heroicons/outline';

export type SortDirection = 'asc' | 'desc' | 'none';

@Component({
  selector: 'app-todo-sort',
  standalone: true,
  imports: [CommonModule, NgIconComponent],
  providers: [
    provideIcons({
      heroChevronUp,
      heroChevronDown,
      heroChevronUpDown,
    }),
  ],
  templateUrl: './todo-sort.component.html',
})
export class TodoSortComponent {
  @Output() sortChange = new EventEmitter<SortDirection>();
  currentSort: SortDirection = 'none';

  toggleSort() {
    const sorts: SortDirection[] = ['none', 'asc', 'desc'];
    const currentIndex = sorts.indexOf(this.currentSort);
    this.currentSort = sorts[(currentIndex + 1) % 3];
    this.sortChange.emit(this.currentSort);
  }
}
