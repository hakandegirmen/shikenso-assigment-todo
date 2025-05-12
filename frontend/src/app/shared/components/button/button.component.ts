import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'icon';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
})
export class ButtonComponent {
  @Input() variant: ButtonVariant = 'primary';
  @Input() type: 'button' | 'submit' = 'button';
  @Input() disabled = false;
  @Output() clicked = new EventEmitter<MouseEvent>();

  get classes(): string {
    if (this.variant === 'icon') {
      return 'w-8 h-8 flex items-center justify-center rounded-md cursor-pointer';
    }

    return 'px-4 py-2 rounded-md cursor-pointer';
  }
}
