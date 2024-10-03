import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-transaction-search',
  standalone: true,
  imports: [],
  templateUrl: './transaction-search.component.html',
  styleUrl: './transaction-search.component.scss'
})
export class TransactionSearchComponent {
  @Output() search = new EventEmitter<string>();

  onSearch(event: any) {
    this.search.emit(event.target.value);
  }
}
