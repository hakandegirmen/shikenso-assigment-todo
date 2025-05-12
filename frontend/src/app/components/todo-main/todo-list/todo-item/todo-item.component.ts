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
      const formattedDate = this.todo.due_date
        ? this.formatDateForInput(new Date(this.todo.due_date))
        : null;

      this.todoForm.patchValue({
        ...this.todo,
        due_date: formattedDate,
      });
    }
  }

  private formatDateForInput(date: Date): string {
    return date.toISOString().split('T')[0];
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
      const formattedDate = this.todo.due_date
        ? this.formatDateForInput(new Date(this.todo.due_date))
        : null;

      this.todoForm.patchValue({
        ...this.todo,
        due_date: formattedDate,
      });
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
      Object.keys(this.todoForm.controls).forEach((key) => {
        const control = this.todoForm.get(key);
        control?.markAsTouched();
      });
    }

    if (this.todoForm.valid) {
      const formValue = this.todoForm.value;

      const submissionData = {
        ...formValue,
        due_date: formValue.due_date
          ? new Date(formValue.due_date).toISOString()
          : null,
      };

      if (this.mode === 'create') {
        this.todoCreated.emit(submissionData);
      } else if (this.mode === 'edit' && this.todo) {
        this.todoUpdated.emit({ ...this.todo, ...submissionData });
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
      setTimeout(() => {
        this.isDeleteConfirming = false;
      }, 3000);
    }
  }

  get formattedDueDate(): string {
    if (this.mode === 'edit' || this.mode === 'create') {
      const formDate = this.todoForm.get('due_date')?.value;
      return this.dateService.formatForDisplay(
        formDate ? new Date(formDate) : null
      );
    }
    return this.dateService.formatForDisplay(
      this.todo?.due_date ? new Date(this.todo.due_date) : null
    );
  }

  showDatePicker() {
    this.dateInput.nativeElement.showPicker();
  }

  onCheckboxChange(checked: boolean) {
    if (this.mode === 'edit') {
      this.todoForm.patchValue({ completed: checked });
      this.todoForm.markAsDirty();
    } else {
      this.onStatusChange(checked);
    }
  }

  cancelDelete(event: Event): void {
    event.stopPropagation();
    this.isDeleteConfirming = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.isDeleteConfirming) return;

    const target = event.target as HTMLElement;

    const isDeleteButton = target.closest('[data-delete-action]');
    if (!isDeleteButton) {
      this.isDeleteConfirming = false;
    }
  }
}
