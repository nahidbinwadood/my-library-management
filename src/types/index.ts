export interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description: string;
  copies: number;
  available: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface BorrowRecord {
  id: string;
  bookId: string;
  bookTitle: string;
  isbn: string;
  quantity: number;
  dueDate: string;
  borrowedAt: string;
}

export interface IBorrowSummary {
  bookTitle: string;
  isbn: string;
  totalQuantityBorrowed: number;
}

export interface CreateBookData {
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description: string;
  copies: number;
  available?: boolean;
}

export interface BorrowBookData {
  quantity: number;
  dueDate: string;
}
export interface IStatCardData {
  id: number;
  title: string;
  icon: React.ElementType;
  stats: number;
  description: string;
}
