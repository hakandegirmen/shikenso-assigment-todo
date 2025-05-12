import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'icon';
export type ButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
})
export class ButtonComponent {
  @Input() variant: ButtonVariant = 'primary';
  @Input() size: ButtonSize = 'md';
  @Input() type: 'button' | 'submit' = 'button';
  @Input() disabled = false;
  @Input() fullWidth = false;
  @Output() clicked = new EventEmitter<MouseEvent>();

  get classes(): string {
    const iconClasses = this.variant === 'icon' ? 'p-1.5 !rounded-md' : '';
    return `
      ${this.baseClasses}
      ${iconClasses}
      ${this.variant === 'icon' ? '' : this.variantClasses[this.variant]}
      ${this.variant === 'icon' ? '' : this.sizeClasses[this.size]}
      ${this.fullWidth ? 'w-full' : ''}
    `.trim();
  }

  private baseClasses =
    'cursor-pointer transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center rounded-md';

  private variantClasses: Record<ButtonVariant, string> = {
    primary: 'text-white bg-blue-600 hover:bg-blue-700',
    secondary: 'text-gray-700 bg-white hover:bg-gray-50 border border-gray-300',
    danger: 'text-white bg-red-600 hover:bg-red-700',
    icon: '',
  };

  private sizeClasses: Record<ButtonSize, string> = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };
}
