import { Component, EventEmitter, Output } from '@angular/core';

export type SortDirection = 'asc' | 'desc' | 'none';

@Component({
  standalone: false,
  selector: 'app-todo-sort',
  templateUrl: './todo-sort.component.html',
  styleUrls: ['./todo-sort.component.scss'],
})
export class TodoSortComponent {
  @Output() sortChange = new EventEmitter<SortDirection>();

  onSortChange(direction: SortDirection) {
    this.sortChange.emit(direction);
  }
}
