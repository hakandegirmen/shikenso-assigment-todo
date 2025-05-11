// src/app/components/todo-main/todo-list/todo-item/todo-item.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { Todo } from '../../../../models/todo';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
  ],
})
export class TodoItemComponent {
  @Input() todo?: Todo;
  @Input() mode: 'display' | 'edit' | 'create' = 'display';
  @Output() todoUpdated = new EventEmitter<Todo>();
  @Output() todoCreated = new EventEmitter<Todo>();
  @Output() todoDeleted = new EventEmitter<number>();

  isExpanded = false;
  todoForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.todoForm = this.createForm();
  }

  ngOnInit() {
    if (this.todo && (this.mode === 'edit' || this.mode === 'display')) {
      this.todoForm.patchValue(this.todo);
    }

    if (this.mode === 'create') {
      this.isExpanded = true; // Always expanded in create mode
    }
  }

  private createForm(): FormGroup {
    return this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
      due_date: [null],
      completed: [false],
    });
  }

  toggleExpand() {
    if (this.mode === 'display') {
      this.isExpanded = !this.isExpanded;
    }
  }

  onSubmit() {
    if (this.todoForm.valid) {
      if (this.mode === 'create') {
        this.todoCreated.emit(this.todoForm.value);
      } else if (this.mode === 'edit' && this.todo) {
        this.todoUpdated.emit({
          ...this.todoForm.value,
          id: this.todo.id,
        });
      }
    }
  }

  startEdit() {
    this.mode = 'edit';
    this.isExpanded = true;
  }

  cancelEdit() {
    if (this.todo) {
      this.mode = 'display';
      this.todoForm.patchValue(this.todo);
    }
  }

  onStatusChange(event: any) {
    if (this.todo) {
      const updatedTodo: Todo = {
        ...this.todo,
        completed: event.checked,
      };
      this.todoUpdated.emit(updatedTodo);
    }
  }
}
