import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

export type SortDirection = 'asc' | 'desc' | 'none';

@Component({
  selector: 'app-todo-sort',
  templateUrl: './todo-sort.component.html',
  styleUrls: ['./todo-sort.component.scss'],
  imports: [CommonModule, MatButtonToggleModule],
})
export class TodoSortComponent {
  @Output() sortChange = new EventEmitter<SortDirection>();

  onSortChange(direction: SortDirection) {
    this.sortChange.emit(direction);
  }
}
