import { Component } from '@angular/core';
import { TodoMainComponent } from './components/todo-main/todo-main.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [TodoMainComponent],
})
export class AppComponent {
  title = 'Todo App';
}
