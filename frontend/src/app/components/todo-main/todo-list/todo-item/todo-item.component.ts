// src/app/components/todo-main/todo-list/todo-item/todo-item.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Todo } from '../../../../models/todo';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './todo-item.component.html',
})
export class TodoItemComponent {
  @Input() todo?: Todo;
  @Input() mode: 'create' | 'edit' | 'display' = 'display';
  @Output() todoCreated = new EventEmitter<Todo>();
  @Output() todoUpdated = new EventEmitter<Todo>();
  @Output() todoDeleted = new EventEmitter<number>();

  todoForm: FormGroup;
  isExpanded = false;

  constructor(private fb: FormBuilder) {
    this.todoForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      completed: [false],
      due_date: [null],
    });
  }

  ngOnInit() {
    if (this.todo) {
      this.todoForm.patchValue(this.todo);
    }
  }

  toggleExpand() {
    this.isExpanded = !this.isExpanded;
  }

  startEdit() {
    this.mode = 'edit';
    this.isExpanded = true;
  }

  onStatusChange(event: any) {
    if (this.todo) {
      const updatedTodo = { ...this.todo, completed: event.target.checked };
      this.todoUpdated.emit(updatedTodo);
    }
  }

  onSubmit() {
    if (this.todoForm.valid) {
      const formValue = this.todoForm.value;
      if (this.mode === 'create') {
        this.todoCreated.emit(formValue);
      } else if (this.mode === 'edit' && this.todo) {
        this.todoUpdated.emit({ ...this.todo, ...formValue });
      }
    }
  }

  onDelete() {
    if (this.todo?.id) {
      this.todoDeleted.emit(this.todo.id);
    }
  }
}
