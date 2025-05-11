import { Component, EventEmitter, Output } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Todo } from '../../../models/todo';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TodoFilterComponent } from './todo-filter/todo-filter.component';
import { TodoSearchComponent } from './todo-search/todo-search.component';
import { TodoSortComponent } from './todo-sort/todo-sort.component';
import { TodoItemComponent } from '../todo-list/todo-item/todo-item.component';

export interface FilterCriteria {
  searchTerm: string;
  filter: 'all' | 'active' | 'completed';
  sortDirection: 'asc' | 'desc' | 'none';
}

@Component({
  selector: 'app-todo-bar',
  templateUrl: './todo-bar.component.html',
  styleUrls: ['./todo-bar.component.scss'],
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
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    TodoFilterComponent,
    TodoSearchComponent,
    TodoSortComponent,
    TodoItemComponent,
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

  onFilterChange(filter: 'all' | 'active' | 'completed') {
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
    this.isFormExpanded = false; // Auto-collapse after submission
  }
}
