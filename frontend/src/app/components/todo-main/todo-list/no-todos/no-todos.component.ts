// src/app/components/todo-main/todo-list/no-todos/no-todos.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-no-todos',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="text-center py-12 bg-gray-50 rounded-lg">
      <div class="text-gray-500">
        <!-- Replace Material icon with SVG -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-12 w-12 mx-auto mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
        <h3 class="text-lg font-medium mb-2">{{ message }}</h3>
        <p
          *ngIf="showAddHint"
          class="text-sm flex items-center justify-center gap-2"
        >
          Click the
          <svg
            class="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
              clip-rule="evenodd"
            />
          </svg>
          button above to add a new todo
        </p>
      </div>
    </div>
  `,
})
export class NoTodosComponent {
  @Input() message: string = 'No todos found';
  @Input() showAddHint: boolean = true;
}
