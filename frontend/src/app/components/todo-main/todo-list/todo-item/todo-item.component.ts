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
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  heroPencilSquare,
  heroTrash,
  heroXMark,
  heroCheck,
} from '@ng-icons/heroicons/outline';
import {
  ButtonComponent,
  CheckboxComponent,
} from '../../../../shared/components';

type TodoItemMode = 'create' | 'edit' | 'display';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgIconComponent,
    ButtonComponent,
    CheckboxComponent,
  ],
  templateUrl: './todo-item.component.html',
  providers: [
    provideIcons({ heroPencilSquare, heroTrash, heroXMark, heroCheck }),
  ],
})
export class TodoItemComponent {
  @Input() todo?: Todo;
  @Input() mode: TodoItemMode = 'display';
  @Input() isExpanded = false;
  @Output() todoCreated = new EventEmitter<Todo>();
  @Output() todoUpdated = new EventEmitter<Todo>();
  @Output() todoDeleted = new EventEmitter<number>();
  @Output() expanded = new EventEmitter<boolean>();

  todoForm: FormGroup;
  isDeleteConfirming = false;

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
    this.expanded.emit(!this.isExpanded);
  }

  startEdit() {
    this.mode = 'edit';
    this.expanded.emit(true);
  }

  cancelEdit() {
    if (this.todo) {
      this.todoForm.patchValue(this.todo);
      this.todoForm.markAsPristine();
      this.todoForm.markAsUntouched();
    }
    this.mode = 'display';
    this.expanded.emit(false);
  }

  onStatusChange(checked: boolean) {
    if (this.todo) {
      const updatedTodo: Todo = {
        ...this.todo,
        completed: checked,
      };
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

  onDeleteClick(event: Event) {
    event.stopPropagation();
    if (this.isDeleteConfirming) {
      this.onDelete();
      this.isDeleteConfirming = false;
    } else {
      this.isDeleteConfirming = true;
      // Auto-reset after 3 seconds if not clicked
      setTimeout(() => {
        this.isDeleteConfirming = false;
      }, 3000);
    }
  }
}
