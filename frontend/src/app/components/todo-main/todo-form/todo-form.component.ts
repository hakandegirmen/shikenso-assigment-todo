import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Todo } from '../../../models/todo';

@Component({
  standalone: false,
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss'],
})
export class TodoFormComponent {
  @Output() todoSubmitted = new EventEmitter<Todo>();

  todoForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.todoForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
      due_date: [null],
      completed: [false],
    });
  }

  onSubmit() {
    if (this.todoForm.valid) {
      this.todoSubmitted.emit(this.todoForm.value);
      this.todoForm.reset({
        title: '',
        description: '',
        due_date: null,
        completed: false,
      });
    }
  }

  onCancel() {
    this.todoForm.reset({
      title: '',
      description: '',
      due_date: null,
      completed: false,
    });
  }
}
