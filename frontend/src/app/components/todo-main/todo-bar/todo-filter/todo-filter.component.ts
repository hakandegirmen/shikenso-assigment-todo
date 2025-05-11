// src/app/components/todo-main/todo-bar/todo-filter/todo-filter.component.ts
import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  heroListBullet,
  heroClock,
  heroCheck,
} from '@ng-icons/heroicons/outline';

export type FilterType = 'all' | 'active' | 'completed';
export type SortDirection = 'asc' | 'desc' | 'none';

export interface FilterCriteria {
  searchTerm: string;
  filter: FilterType;
  sortDirection: SortDirection;
}

@Component({
  selector: 'app-todo-filter',
  standalone: true,
  imports: [CommonModule, NgIconComponent],
  templateUrl: './todo-filter.component.html',
  providers: [provideIcons({ heroListBullet, heroClock, heroCheck })],
})
export class TodoFilterComponent {
  @Output() filterChange = new EventEmitter<FilterType>();
  currentFilter: FilterType = 'all';

  setFilter(filter: FilterType) {
    this.currentFilter = filter;
    this.filterChange.emit(filter);
  }
}
