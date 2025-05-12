import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TodoService } from '../../services/todo.service';
import { FilterCriteria } from './todo-bar/todo-filter/todo-filter.component';
import { Todo } from '../../models/todo';
import { CommonModule } from '@angular/common';
import { TodoBarComponent } from './todo-bar/todo-bar.component';
import { TodoListComponent } from './todo-list/todo-list.component';

@Component({
  selector: 'app-todo-main',
  templateUrl: './todo-main.component.html',
  standalone: true,
  imports: [CommonModule, TodoBarComponent, TodoListComponent],
})
export class TodoMainComponent implements OnInit {
  todos$ = new BehaviorSubject<Todo[]>([]);
  filteredTodos$ = new BehaviorSubject<Todo[]>([]);
  currentCriteria: FilterCriteria = {
    searchTerm: '',
    filter: 'all',
    sortDirection: 'none',
  };

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.loadTodos();
  }

  loadTodos() {
    this.todoService.getTodos().subscribe((todos) => {
      this.todos$.next(todos);
      this.applyFilters();
    });
  }

  onTodoAdded(todo: Todo) {
    this.todoService.createTodo(todo).subscribe(() => {
      this.loadTodos();
    });
  }
  onTodoUpdated(todo: Todo) {
    if (todo.id) {
      this.todoService.updateTodo(todo.id, todo).subscribe(() => {
        this.loadTodos();
      });
    }
  }

  onTodoDeleted(id: number) {
    this.todoService.deleteTodo(id).subscribe(() => {
      this.loadTodos();
    });
  }

  onCriteriaChanged(criteria: FilterCriteria) {
    this.currentCriteria = criteria;
    this.applyFilters();
  }

  private applyFilters() {
    let filtered = this.todos$.value
      // Apply search filter
      .filter(
        (todo) =>
          !this.currentCriteria.searchTerm ||
          todo.title
            .toLowerCase()
            .includes(this.currentCriteria.searchTerm.toLowerCase())
      )
      // Apply status filter
      .filter((todo) => {
        switch (this.currentCriteria.filter) {
          case 'active':
            return !todo.completed;
          case 'completed':
            return todo.completed;
          default:
            return true;
        }
      });

    // Apply sorting
    if (this.currentCriteria.sortDirection !== 'none') {
      // Sort by due date if sort direction is specified
      filtered = [...filtered].sort((a, b) => {
        if (!a.due_date) return 1;
        if (!b.due_date) return -1;
        const dateA = new Date(a.due_date);
        const dateB = new Date(b.due_date);
        return this.currentCriteria.sortDirection === 'asc'
          ? dateA.getTime() - dateB.getTime()
          : dateB.getTime() - dateA.getTime();
      });
    } else {
      // When no sort direction is specified, sort by completion status (active first)
      filtered = [...filtered].sort((a, b) => {
        if (a.completed === b.completed) return 0;
        return a.completed ? 1 : -1; // Active (not completed) items come first
      });
    }

    this.filteredTodos$.next(filtered);
  }
}
