import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-blue-100 flex items-center justify-center">
      <div class="bg-white p-6 rounded-lg shadow-lg">
        <h1 class="text-3xl font-bold text-blue-600">Tailwind Test</h1>
        <p class="mt-2 text-gray-600">
          If you see this styled, Tailwind is working!
        </p>
      </div>
    </div>
  `,
})
export class TestComponent {}
