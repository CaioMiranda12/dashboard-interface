export interface Transaction {
    id: number;
    title: string;
    amount: number;
    date: string;
    Category: {
      id: number;
      name: string;
      color: string;
    },
    description: string;
    type: 'income' | 'expense'
}