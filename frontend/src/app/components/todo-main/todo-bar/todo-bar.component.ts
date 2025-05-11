// src/app/components/todo-main/todo-bar/todo-bar.component.ts
import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { TodoFilterComponent } from './todo-filter/todo-filter.component';
import { TodoSearchComponent } from './todo-search/todo-search.component';
import { TodoSortComponent } from './todo-sort/todo-sort.component';
import { TodoItemComponent } from '../todo-list/todo-item/todo-item.component';
import { Todo } from '../../../models/todo';
import {
  FilterCriteria,
  FilterType,
  SortDirection,
} from './todo-filter/todo-filter.component';

@Component({
  selector: 'app-todo-bar',
  standalone: true,
  imports: [
    CommonModule,
    TodoFilterComponent,
    TodoSearchComponent,
    TodoSortComponent,
    TodoItemComponent,
  ],
  templateUrl: './todo-bar.component.html',
  animations: [
    trigger('expandCollapse', [
      state(
        'collapsed',
        style({
          height: '0',
          opacity: '0',
          overflow: 'hidden',
        })
      ),
      state(
        'expanded',
        style({
          height: '*',
          opacity: '1',
        })
      ),
      transition('collapsed <=> expanded', [animate('200ms ease-in-out')]),
    ]),
  ],
})
export class TodoBarComponent {
  @Output() criteriaChanged = new EventEmitter<FilterCriteria>();
  @Output() todoAdded = new EventEmitter<Todo>();

  isFormExpanded = false;

  private criteria: FilterCriteria = {
    searchTerm: '',
    filter: 'all',
    sortDirection: 'none',
  };

  onSearchChange(searchTerm: string) {
    this.criteria = { ...this.criteria, searchTerm };
    this.criteriaChanged.emit(this.criteria);
  }

  onFilterChange(filter: FilterType) {
    this.criteria = { ...this.criteria, filter };
    this.criteriaChanged.emit(this.criteria);
  }

  onSortChange(sortDirection: 'asc' | 'desc' | 'none') {
    this.criteria = { ...this.criteria, sortDirection };
    this.criteriaChanged.emit(this.criteria);
  }

  toggleForm() {
    this.isFormExpanded = !this.isFormExpanded;
  }

  onTodoSubmitted(todo: Todo) {
    this.todoAdded.emit(todo);
    this.isFormExpanded = false;
  }
}
