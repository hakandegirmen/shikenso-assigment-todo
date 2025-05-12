// src/app/components/todo-main/todo-list/todo-list.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Todo } from '../../../models/todo';
import { TodoItemComponent } from './todo-item/todo-item.component';
import { NoTodosComponent } from './no-todos/no-todos.component';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, TodoItemComponent, NoTodosComponent],
  templateUrl: './todo-list.component.html',
})
export class TodoListComponent {
  @Input() todos: Todo[] = [];
  @Output() todoUpdated = new EventEmitter<Todo>();
  @Output() todoDeleted = new EventEmitter<number>();

  expandedTodoId: number | null = null;

  onTodoExpanded(todoId: number | null) {
    this.expandedTodoId = todoId;
  }

  onTodoUpdated(todo: Todo) {
    this.todoUpdated.emit(todo);
  }

  onTodoDeleted(id: number) {
    this.todoDeleted.emit(id);
  }
}
