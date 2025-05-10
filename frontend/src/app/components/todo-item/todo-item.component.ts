import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from '../../models/todo';
import { DateService } from '../../services/date.service';

@Component({
  standalone: false,
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent {
  @Input() todo!: Todo;
  @Output() todoUpdated = new EventEmitter<Todo>();
  @Output() todoDeleted = new EventEmitter<number>();

  isExpanded = false;

  constructor(public dateService: DateService) {}

  toggleExpand(): void {
    this.isExpanded = !this.isExpanded;
  }

  onStatusChange(completed: boolean): void {
    const updatedTodo = { ...this.todo, completed };
    this.todoUpdated.emit(updatedTodo);
  }

  onDelete(): void {
    this.todoDeleted.emit(this.todo.id);
  }
}
