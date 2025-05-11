import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/todo';
import { FilterType } from '../todo-filter/todo-filter.component';
import { SortDirection } from '../todo-sort/todo-sort.component';

@Component({
  standalone: false,
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];
  filteredTodos: Todo[] = [];
  currentFilter: FilterType = 'all';
  searchTerm: string = '';
  filterCounts = {
    all: 0,
    active: 0,
    completed: 0,
  };
  currentSort: SortDirection = 'none';

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.loadTodos();
  }

  loadTodos() {
    this.todoService.getTodos().subscribe({
      next: (todos) => {
        this.todos = todos;
        this.updateCounts();
        this.applyFilters();
      },
      error: (error) => {
        console.error('Error loading todos:', error);
      },
    });
  }

  onSearch(term: string) {
    this.searchTerm = term.toLowerCase().trim();
    this.applyFilters();
  }

  onFilterChange(filter: FilterType) {
    this.currentFilter = filter;
    this.applyFilters();
  }

  private applyFilters() {
    this.filteredTodos = this.filterAndSortTodos(this.todos);
  }

  private filterAndSortTodos(todos: Todo[]): Todo[] {
    let filteredTodos = todos
      .filter(
        (todo) =>
          !this.searchTerm ||
          todo.title.toLowerCase().includes(this.searchTerm.toLowerCase())
      )
      .filter((todo) => {
        switch (this.currentFilter) {
          case 'active':
            return !todo.completed;
          case 'completed':
            return todo.completed;
          default:
            return true;
        }
      });

    // Apply sorting
    if (this.currentSort !== 'none') {
      filteredTodos.sort((a, b) => {
        if (!a.due_date) return 1;
        if (!b.due_date) return -1;
        const dateA = new Date(a.due_date);
        const dateB = new Date(b.due_date);
        return this.currentSort === 'asc'
          ? dateA.getTime() - dateB.getTime()
          : dateB.getTime() - dateA.getTime();
      });
    }

    return filteredTodos;
  }

  private updateCounts() {
    this.filterCounts = {
      all: this.todos.length,
      active: this.todos.filter((todo) => !todo.completed).length,
      completed: this.todos.filter((todo) => todo.completed).length,
    };
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

  onSortChange(direction: SortDirection) {
    this.currentSort = direction;
    this.applyFilters();
  }
}
