import type { Book } from '@/types';
import type { ColumnDef } from '@tanstack/react-table';
import {
  ArrowUpDown,
  BookOpen,
  Edit,
  Eye,
  MoreHorizontal,
  Trash2,
} from 'lucide-react';
import { Link } from 'react-router';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

const BookColumns: ColumnDef<Book>[] = [
  {
    accessorKey: 'title',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        className="h-auto p-0 font-semibold"
      >
        Title
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="font-medium">
        <Link
          to={`/books/${row.original._id}`}
          className="hover:text-primary transition-colors"
        >
          {row.getValue('title')}
        </Link>
      </div>
    ),
  },
  {
    accessorKey: 'author',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        className="h-auto p-0 font-semibold"
      >
        Author
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: 'genre',
    header: 'Genre',
    cell: ({ row }) => (
      <Badge variant="secondary" className="text-xs">
        {row.getValue('genre')}
      </Badge>
    ),
  },
  {
    accessorKey: 'isbn',
    header: 'ISBN',
    cell: ({ row }) => (
      <span className="font-mono text-sm text-muted-foreground">
        {row.getValue('isbn')}
      </span>
    ),
  },
  {
    accessorKey: 'copies',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        className="h-auto p-0 font-semibold"
      >
        Copies
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <span className="font-medium">{row.getValue('copies')}</span>
    ),
  },
  {
    accessorKey: 'available',
    header: 'Status',
    cell: ({ row }) => {
      const available = row.getValue('available') as boolean;
      const copies = row.getValue('copies') as number;

      return (
        <Badge
          variant={available && copies > 0 ? 'default' : 'destructive'}
          className="text-xs"
        >
          {available && copies > 0 ? 'Available' : 'Unavailable'}
        </Badge>
      );
    },
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const book: Book = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to={`/books/${book._id}`} className="flex items-center">
                <Eye className="mr-2 h-4 w-4" />
                View Details
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to={`/edit-book/${book._id}`} className="flex items-center">
                <Edit className="mr-2 h-4 w-4" />
                Edit Book
              </Link>
            </DropdownMenuItem>
            {book.available && book.copies > 0 && (
              <DropdownMenuItem asChild>
                <Link to={`/borrow/${book._id}`} className="flex items-center">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Borrow Book
                </Link>
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive flex items-center">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Book
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default BookColumns;
