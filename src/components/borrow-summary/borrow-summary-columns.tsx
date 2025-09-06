import type { IBorrowSummary } from '@/types';
import type { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

export const borrowSummaryColumns: ColumnDef<IBorrowSummary>[] = [
  {
    id: 'title',
    accessorFn: (row) => row.book.title,
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
      <div className="font-medium">{row.original.book.title}</div>
    ),
  },
  {
    accessorKey: 'isbn',
    accessorFn: (row) => row.book.isbn,
    header: 'ISBN',
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <span className="  text-sm">{row.original.book.isbn}</span>
      </div>
    ),
  },
  {
    accessorKey: 'totalQuantity',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        className="h-auto p-0 font-semibold"
      >
        Total Quantity Borrowed
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const quantity = row.original.totalQuantity;
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
