import { Injectable, signal } from '@angular/core';
import { Transaction } from './transaction.model';

@Injectable({ providedIn: 'root' })
export class TransactionStore {
  private transactions = signal<Transaction[]>([]);

  private filter = signal<string | null>(null);
  private filteredTransactions = signal<Transaction[]>([]);

  // Signal para expor transações
  get transactions$() {
    return this.transactions.asReadonly();
  }

  // Signal para expor transações filtradas
  get filteredTransactions$() {
    return this.filteredTransactions.asReadonly();
  }

  // Criar transação
  addTransaction(transaction: Transaction) {
    console.log('add', transaction);
    this.transactions.update((currentTransactions) => [
      ...currentTransactions,
      transaction,
    ]);
  }

  // Atualizar transação
  updateTransaction(updatedTransaction: Transaction) {
    console.log('update', updatedTransaction);
    this.transactions.update((currentTransactions) => {
      return currentTransactions.map((transaction) =>
        transaction.id === updatedTransaction.id
          ? updatedTransaction
          : transaction
      );
    });
  }

  // Deletar transação
  deleteTransaction(id: number) {
    console.log('delete', id);
    this.transactions.update((currentTransactions) =>
      currentTransactions.filter((transaction) => transaction.id !== id)
    );
  }

  // Filtrar transações
  filterTransactions(title: string) {
    this.filteredTransactions.update(() =>
      this.transactions$().filter((transaction) =>
        transaction.title.toLowerCase().includes(title.toLowerCase())
      )
    );
  }
}
