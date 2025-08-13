import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTable } from '@/components/ui/data-table';
import type { IBorrowSummary } from '@/types';

import type { ColumnDef } from '@tanstack/react-table';
import {
  ArrowUpDown,
  BookOpen,
  FileText,
  Hash,
  Plus,
  TrendingUp,
} from 'lucide-react';
import { Link } from 'react-router';

// Mock data for demonstration
const mockBorrowSummary: IBorrowSummary[] = [
  {
    bookTitle: 'The Great Gatsby',
    isbn: '978-0-7432-7356-5',
    totalQuantityBorrowed: 12,
  },
  {
    bookTitle: 'To Kill a Mockingbird',
    isbn: '978-0-06-112008-4',
    totalQuantityBorrowed: 8,
  },
  {
    bookTitle: 'Clean Code',
    isbn: '978-0-13-235088-4',
    totalQuantityBorrowed: 15,
  },
  {
    bookTitle: 'The Psychology of Money',
    isbn: '978-0-85285-767-5',
    totalQuantityBorrowed: 6,
  },
  {
    bookTitle: 'Dune',
    isbn: '978-0-441-17271-9',
    totalQuantityBorrowed: 4,
  },
];

const borrowSummaryColumns: ColumnDef<IBorrowSummary>[] = [
  {
    accessorKey: 'bookTitle',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        className="h-auto p-0 font-semibold"
      >
        Book Title
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue('bookTitle')}</div>
    ),
  },
  {
    accessorKey: 'isbn',
    header: 'ISBN',
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Hash className="h-3 w-3 text-muted-foreground" />
        <span className="font-mono text-sm">{row.getValue('isbn')}</span>
      </div>
    ),
  },
  {
    accessorKey: 'totalQuantityBorrowed',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        className="h-auto p-0 font-semibold"
      >
        Total Borrowed
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const quantity = row.getValue('totalQuantityBorrowed') as number;
      return (
        <div className="flex items-center gap-2">
          <Badge
            variant={
              quantity > 10 ? 'default' : quantity > 5 ? 'secondary' : 'outline'
            }
          >
            {quantity} {quantity === 1 ? 'copy' : 'copies'}
          </Badge>
        </div>
      );
    },
  },
];

const BorrowSummary = () => {
  // Calculate statistics
  const totalBorrowedBooks = mockBorrowSummary.length;
  const totalBorrowedCopies = mockBorrowSummary.reduce(
    (sum, item) => sum + item.totalQuantityBorrowed,
    0
  );
  const averageBorrowsPerBook = Math.round(
    totalBorrowedCopies / totalBorrowedBooks
  );
  const mostBorrowedBook = mockBorrowSummary.reduce(
    (max, item) =>
      item.totalQuantityBorrowed > max.totalQuantityBorrowed ? item : max,
    mockBorrowSummary[0]
  );
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Borrow Summary</h1>
          <p className="text-muted-foreground">
            Overview of all borrowed books and their statistics
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild variant="outline">
            <Link to="/">
              <BookOpen className="mr-2 h-4 w-4" />
              Browse Books
            </Link>
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Books Borrowed
            </CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalBorrowedBooks}</div>
            <p className="text-xs text-muted-foreground">
              Unique titles borrowed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Copies</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalBorrowedCopies}</div>
            <p className="text-xs text-muted-foreground">
              Total borrowed copies
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Average per Book
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageBorrowsPerBook}</div>
            <p className="text-xs text-muted-foreground">Copies per book</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Most Popular</CardTitle>
            <Badge variant="default" className="text-xs">
              {mostBorrowedBook.totalQuantityBorrowed}
            </Badge>
          </CardHeader>
          <CardContent>
            <div
              className="text-lg font-bold line-clamp-1"
              title={mostBorrowedBook.bookTitle}
            >
              {mostBorrowedBook.bookTitle}
            </div>
            <p className="text-xs text-muted-foreground">Most borrowed book</p>
          </CardContent>
        </Card>
      </div>

      {/* Summary Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Borrow Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          {mockBorrowSummary.length > 0 ? (
            <DataTable
              columns={borrowSummaryColumns}
              data={mockBorrowSummary}
              searchKey="bookTitle"
              searchPlaceholder="Search books by title..."
            />
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <BookOpen className="h-12 w-12 text-muted-foreground/50 mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                No Borrowing Records
              </h3>
              <p className="text-muted-foreground mb-6">
                No books have been borrowed yet. Start by browsing the available
                books.
              </p>
              <Button asChild>
                <Link to="/books">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Browse Books
                </Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      {mockBorrowSummary.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <Button asChild>
                <Link to="/books">
                  <Plus className="mr-2 h-4 w-4" />
                  Borrow More Books
                </Link>
              </Button>
              <Button variant="outline" onClick={() => window.print()}>
                <FileText className="mr-2 h-4 w-4" />
                Export Report
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BorrowSummary;
