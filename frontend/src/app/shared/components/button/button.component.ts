import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'icon';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type IconSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
})
export class ButtonComponent {
  @Input() variant: ButtonVariant = 'primary';
  @Input() size: ButtonSize = 'md';
  @Input() iconSize: IconSize = 'md';
  @Input() type: 'button' | 'submit' = 'button';
  @Input() disabled = false;
  @Input() fullWidth = false;
  @Output() clicked = new EventEmitter<MouseEvent>();

  get classes(): string {
    return `
      ${this.baseClasses}
      ${this.variantClasses[this.variant]}
      ${
        this.variant === 'icon'
          ? this.iconSizeClasses[this.iconSize]
          : this.sizeClasses[this.size]
      }
      ${this.fullWidth ? 'w-full' : ''}
    `;
  }

  private baseClasses =
    'cursor-pointer transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center';

  private variantClasses: Record<ButtonVariant, string> = {
    primary: 'text-white bg-blue-600 hover:bg-blue-700 rounded-md',
    secondary:
      'text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 rounded-md',
    danger: 'text-white bg-red-600 hover:bg-red-700 rounded-md',
    icon: 'text-gray-600 hover:text-blue-600 rounded-md hover:bg-gray-100',
  };

  private sizeClasses: Record<ButtonSize, string> = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  private iconSizeClasses: Record<IconSize, string> = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
  };
}
