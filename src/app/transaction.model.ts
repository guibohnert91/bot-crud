export interface Transaction {
  id: number;
  title: string;
  type: 'income' | 'outcome';
  amount: number;
  date: Date;
}

export const TransactionTypes: string[] = ['income', 'outcome'];
