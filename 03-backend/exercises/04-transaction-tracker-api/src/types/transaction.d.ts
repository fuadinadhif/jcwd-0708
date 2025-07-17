export interface Transaction {
  id: string;
  title: string;
  nominal: number;
  type: string;
  category: string;
  date: string;
}

export interface TransactionQuery {
  startDate?: string;
  endDate?: string;
  category?: string;
  page?: string;
  limit?: string;
}
