import { Component, computed, OnInit, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TransactionStore } from '../transaction.store';
import { Transaction } from '../transaction.model';
import { CommonModule } from '@angular/common';
import { TransactionSearchComponent } from './transaction-search/transaction-search.component';
import { TransactionFormComponent } from './transaction-form/transaction-form.component';
import { TransactionListComponent } from './transaction-list/transaction-list.component';

declare var bootstrap: any; // Importando o Bootstrap JS diretamente

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TransactionSearchComponent,
    TransactionFormComponent,
    TransactionListComponent,
  ],
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
})
export class TransactionsComponent {
  selectedTransaction: Transaction | null = null;
  isEditing: boolean = false;

  filteredTransactions$ = computed(() =>
    this.transactionStore.filteredTransactions$()
  );

  constructor(public transactionStore: TransactionStore) {}

  // Abrir modal para criar ou editar transação
  openModal(transaction?: Transaction) {
    this.selectedTransaction = transaction || null;
    this.isEditing = !!transaction;

    const modal = new bootstrap.Modal(
      document.getElementById('transactionModal')
    );
    modal.show();
  }

  // Fechar o modal
  closeModal() {
    const modal = bootstrap.Modal.getInstance(
      document.getElementById('transactionModal')
    );
    modal.hide();
  }

  // Salvar transação (criação ou edição)
  saveTransaction(transaction: Transaction) {
    if (this.isEditing) {
      this.transactionStore.updateTransaction(transaction);
    } else {
      this.transactionStore.addTransaction(transaction);
    }

    const modal = bootstrap.Modal.getInstance(
      document.getElementById('transactionModal')
    );
    modal.hide();
  }

  // Deletar transação
  deleteTransaction(id: number) {
    this.transactionStore.deleteTransaction(id);
  }

  // Filtrar transações pelo título
  filterTransactions(searchTerm: string) {
    this.transactionStore.filterTransactions(searchTerm);
  }
}
