import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Transaction } from '../../transaction.model';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-transaction-list',
  standalone: true,
  imports: [DatePipe, CommonModule],
  templateUrl: './transaction-list.component.html',
  styleUrl: './transaction-list.component.scss',
})
export class TransactionListComponent {
  @Input() transactions: Transaction[] = [];
  @Output() edit = new EventEmitter<Transaction>();
  @Output() delete = new EventEmitter<number>();

  onEdit(transaction: Transaction) {
    this.edit.emit(transaction);
  }

  onDelete(id: number) {
    this.delete.emit(id);
  }
}
