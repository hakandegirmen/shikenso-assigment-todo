import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/todo';

@Component({
  standalone: false,
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.loadTodos();
  }

  loadTodos() {
    this.todoService.getTodos().subscribe({
      next: (todos) => {
        this.todos = todos;
      },
      error: (error) => {
        console.error('Error loading todos:', error);
      },
    });
  }

  onTodoSubmitted(todo: Todo) {
    if (todo.id) {
      // Update existing todo
      this.todoService.updateTodo(todo.id, todo).subscribe({
        next: () => {
          this.loadTodos();
        },
        error: (error) => {
          console.error('Error updating todo:', error);
        },
      });
    } else {
      // Create new todo
      this.todoService.createTodo(todo).subscribe({
        next: () => {
          this.loadTodos();
        },
        error: (error) => {
          console.error('Error creating todo:', error);
        },
      });
    }
  }

  onTodoUpdated(todo: Todo) {
    if (todo.id) {
      this.todoService.updateTodo(todo.id, todo).subscribe({
        next: () => {
          this.loadTodos();
        },
        error: (error) => {
          console.error('Error updating todo:', error);
        },
      });
    }
  }

  onTodoDeleted(id: number) {
    this.todoService.deleteTodo(id).subscribe({
      next: () => {
        this.loadTodos();
      },
      error: (error) => {
        console.error('Error deleting todo:', error);
      },
    });
  }
}
