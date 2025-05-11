import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatBadgeModule } from '@angular/material/badge';

@Component({
  selector: 'app-todo-filter',
  templateUrl: './todo-filter.component.html',
  styleUrls: ['./todo-filter.component.scss'],
  imports: [CommonModule, MatButtonToggleModule, MatBadgeModule],
})
export class TodoFilterComponent {
  @Input() currentFilter: 'all' | 'active' | 'completed' = 'all';
  @Output() filterChange = new EventEmitter<'all' | 'active' | 'completed'>();

  onFilterChange(filter: 'all' | 'active' | 'completed') {
    this.currentFilter = filter;
    this.filterChange.emit(filter);
  }
}
