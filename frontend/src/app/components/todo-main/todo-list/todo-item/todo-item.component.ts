// src/app/components/todo-main/todo-list/todo-item/todo-item.component.ts
import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  ElementRef,
  HostListener,
} from '@angular/core';
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
  heroCalendar,
} from '@ng-icons/heroicons/outline';
import {
  ButtonComponent,
  CheckboxComponent,
} from '../../../../shared/components';
import { DateService } from '../../../../services/date.service';

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
    provideIcons({
      heroPencilSquare,
      heroTrash,
      heroXMark,
      heroCheck,
      heroCalendar,
    }),
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

  @ViewChild('dateInput') dateInput!: ElementRef<HTMLInputElement>;

  constructor(private fb: FormBuilder, private dateService: DateService) {
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
    if (this.mode === 'create' || this.mode === 'edit') {
      // Mark all fields as touched to trigger validation messages
      Object.keys(this.todoForm.controls).forEach((key) => {
        const control = this.todoForm.get(key);
        control?.markAsTouched();
      });
    }

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

  get formattedDueDate(): string {
    // In edit mode, use the form value
    if (this.mode === 'edit' || this.mode === 'create') {
      const formDate = this.todoForm.get('due_date')?.value;
      return this.dateService.formatForDisplay(
        formDate ? new Date(formDate) : null
      );
    }
    // In display mode, use the todo value
    return this.dateService.formatForDisplay(
      this.todo?.due_date ? new Date(this.todo.due_date) : null
    );
  }

  showDatePicker() {
    this.dateInput.nativeElement.showPicker();
  }

  onCheckboxChange(checked: boolean) {
    if (this.mode === 'edit') {
      // In edit mode, update the form and mark it dirty
      this.todoForm.patchValue({ completed: checked });
      this.todoForm.markAsDirty();
    } else {
      // In display mode, update immediately
      this.onStatusChange(checked);
    }
  }

  cancelDelete(event: Event): void {
    event.stopPropagation();
    this.isDeleteConfirming = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    // Only proceed if we're in delete confirming state
    if (!this.isDeleteConfirming) return;

    // Get the click target as an HTML element
    const target = event.target as HTMLElement;

    // Check if the click was outside our delete confirmation buttons
    const isDeleteButton = target.closest('[data-delete-action]');
    if (!isDeleteButton) {
      this.isDeleteConfirming = false;
    }
  }
}
