import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from '../../../models/todo';
import { FilterCriteria } from '../todo-bar/todo-bar.component';
import { CommonModule } from '@angular/common';
import { TodoItemComponent } from './todo-item/todo-item.component';
import { NoTodosComponent } from './no-todos/no-todos.component';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  imports: [CommonModule, TodoItemComponent, NoTodosComponent],
})
export class TodoListComponent {
  @Input() todos: Todo[] = [];
  @Input() currentCriteria?: FilterCriteria;
  @Output() todoUpdated = new EventEmitter<Todo>();
  @Output() todoDeleted = new EventEmitter<number>();

  onTodoUpdated(todo: Todo) {
    this.todoUpdated.emit(todo);
  }

  onTodoDeleted(id: number) {
    this.todoDeleted.emit(id);
  }

  getNoTodosMessage(): string {
    if (!this.currentCriteria) {
      return 'No todos yet';
    }

    if (this.currentCriteria.searchTerm) {
      return `No todos match "${this.currentCriteria.searchTerm}"`;
    }

    switch (this.currentCriteria.filter) {
      case 'active':
        return 'No active todos';
      case 'completed':
        return 'No completed todos';
      default:
        return 'No todos yet';
    }
  }

  getNoTodosIcon(): string {
    if (this.currentCriteria?.searchTerm) {
      return 'search_off';
    }
    return 'assignment';
  }

  shouldShowAddHint(): boolean {
    return (
      !this.currentCriteria?.searchTerm &&
      this.currentCriteria?.filter === 'all'
    );
  }
}
