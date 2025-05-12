// src/app/components/todo-main/todo-bar/todo-filter/todo-filter.component.ts
import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  heroListBullet,
  heroClock,
  heroCheck,
} from '@ng-icons/heroicons/outline';
import { SortDirection } from '../todo-sort/todo-sort.component';

export type FilterType = 'all' | 'active' | 'completed';

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
  @Output() filterChange = new EventEmitter<'all' | 'active' | 'completed'>();
  currentFilter: 'all' | 'active' | 'completed' = 'all';

  filters: ('all' | 'active' | 'completed')[] = ['all', 'active', 'completed'];

  getIconName(filter: 'all' | 'active' | 'completed'): string {
    const icons = {
      all: 'heroListBullet',
      active: 'heroClock',
      completed: 'heroCheck',
    };
    return icons[filter];
  }

  setFilter(filter: 'all' | 'active' | 'completed'): void {
    this.currentFilter = filter;
    this.filterChange.emit(filter);
  }
}
