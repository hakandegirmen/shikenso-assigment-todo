import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Todo } from '../../models/todo';
import { DateService } from '../../services/date.service';

@Component({
  selector: 'app-todo-form',
  standalone: false,
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss'],
})
export class TodoFormComponent implements OnInit {
  @Output() todoSubmitted = new EventEmitter<Todo>();
  @Input() todoToEdit: Todo | null = null;

  todoForm: FormGroup;

  constructor(private fb: FormBuilder, private dateService: DateService) {
    this.todoForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(1)]],
      description: [''],
      due_date: [null],
      completed: [false],
    });
  }

  ngOnInit() {
    if (this.todoToEdit) {
      const dueDate = this.todoToEdit.due_date
        ? new Date(this.todoToEdit.due_date)
        : null;

      this.todoForm.patchValue({
        title: this.todoToEdit.title,
        description: this.todoToEdit.description,
        due_date: dueDate,
        completed: this.todoToEdit.completed,
      });
    }
  }

  onSubmit() {
    if (this.todoForm.valid) {
      const formValue = this.todoForm.value;

      const todo: Todo = {
        title: formValue.title,
        description: formValue.description,
        completed: formValue.completed,
        id: this.todoToEdit?.id,
        due_date: formValue.due_date,
      };

      this.todoSubmitted.emit(todo);

      if (!this.todoToEdit) {
        this.todoForm.reset({ completed: false });
      }
    }
  }

  clearForm() {
    this.todoForm.reset({ completed: false });
  }
}
