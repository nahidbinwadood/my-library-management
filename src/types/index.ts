import type { JSX } from 'react';

export interface Book {
  _id: string;
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
  book: {
    title: string;
    isbn: string;
  };
  totalQuantity: number;
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
  icon: JSX.Element;
  stats?: number | string;
  description: string;
}

export interface IGenresOption {
  label: string;
  value: string;
}

export interface QueryState {
  sortBy: string;
  sort: 'asc' | 'desc';
  filter: string;
  page: number;
  limit: number;
  search?: string;
}

export interface StatsInput {
  totalBooks: number;
  availableBooks: number;
  totalCopies: number;
  borrowedCopies: number;
  genresCount: number;
}
