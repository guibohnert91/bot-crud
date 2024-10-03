import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TransactionsComponent } from './transactions/transactions.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TransactionsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'finance-transactions';

  color: 'Light' | 'Dark' = 'Light';

  toggleTheme() {
    this.color = this.color == 'Light' ? 'Dark' : 'Light';

    const body = document.body as HTMLElement;
    body.setAttribute('data-bs-theme', this.color.toLocaleLowerCase());
  }
}
