import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-no-todos',
  templateUrl: './no-todos.component.html',
  styleUrls: ['./no-todos.component.scss'],
  imports: [CommonModule, MatIconModule],
})
export class NoTodosComponent {
  @Input() message: string = 'No todos found';
  @Input() icon: string = 'assignment'; // Default Material icon
  @Input() showAddHint: boolean = true; // Whether to show the "Add a new todo" hint
}
