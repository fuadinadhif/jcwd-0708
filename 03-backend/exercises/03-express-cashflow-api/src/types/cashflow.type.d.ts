export interface Cashflow {
  id: string;
  title: string;
  nominal: number;
  type: string;
  category: string;
  date: string;
}

export interface CashflowQuery {
  startDate?: string;
  endDate?: string;
  category?: string;
  page?: string;
  limit?: string;
}
