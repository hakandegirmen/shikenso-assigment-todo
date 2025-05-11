import { Component, EventEmitter, Output, Input } from '@angular/core';

export type FilterType = 'all' | 'active' | 'completed';

@Component({
  selector: 'app-todo-filter',
  standalone: false,
  templateUrl: './todo-filter.component.html',
  styleUrl: './todo-filter.component.scss',
})
export class TodoFilterComponent {
  @Output() filterChange = new EventEmitter<FilterType>();
  @Input() counts = {
    all: 0,
    active: 0,
    completed: 0,
  };

  currentFilter: FilterType = 'all';

  filters: { value: FilterType; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'active', label: 'Active' },
    { value: 'completed', label: 'Completed' },
  ];

  setFilter(filter: FilterType): void {
    this.currentFilter = filter;
    this.filterChange.emit(filter);
  }
}
