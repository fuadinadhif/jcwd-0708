type Type = "income" | "expense";

export interface CashFlow {
  id: string;
  title: string;
  nominal: number;
  type: Type;
  category: string;
  date: number;
}
