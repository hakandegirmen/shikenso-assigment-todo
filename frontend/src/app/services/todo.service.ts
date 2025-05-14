import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo';
import { DateService } from './date.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private apiUrl = `${environment.apiUrl}/todos/`;

  constructor(private http: HttpClient, private dateService: DateService) {}

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.apiUrl);
  }

  getTodo(id: number): Observable<Todo> {
    return this.http.get<Todo>(`${this.apiUrl}/${id}`);
  }

  createTodo(todo: Todo): Observable<Todo> {
    const todoToSend = {
      ...todo,
      due_date: this.dateService.toApiString(todo.due_date as Date),
    };
    return this.http.post<Todo>(this.apiUrl, todoToSend);
  }

  updateTodo(id: number, todo: Todo): Observable<Todo> {
    console.log('Updating todo:', todo);
    const todoToSend = {
      ...todo,
      due_date: this.dateService.toApiString(todo.due_date as Date),
    };
    return this.http.put<Todo>(`${this.apiUrl}${id}`, todoToSend);
  }

  deleteTodo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}`);
  }
}
