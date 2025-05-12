// src/app/components/todo-main/todo-list/no-todos/no-todos.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroClipboard, heroPlus } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-no-todos',
  standalone: true,
  imports: [CommonModule, NgIconComponent],
  providers: [
    provideIcons({
      heroClipboard,
      heroPlus,
    }),
  ],
  templateUrl: './no-todos.component.html',
})
export class NoTodosComponent {
  @Input() message: string = 'No todos yet';
  @Input() showAddHint: boolean = true;
}
