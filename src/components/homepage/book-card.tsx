import type { Book } from '@/types';
import { BookOpen, Edit, Eye, MoreVertical, Trash2 } from 'lucide-react';
import { Link } from 'react-router';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

interface BookCardProps {
  book: Book;
  onDeleteRequest: (book: Book) => void;
}

const BookCard = ({ book, onDeleteRequest }: BookCardProps) => {
  return (
    <Card className="group hover:shadow-md transition-all duration-200 hover:-translate-y-1">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg leading-tight mb-1 group-hover:text-primary transition-colors">
              <Link to={`/books/${book._id}`} className="hover:underline">
                {book.title}
              </Link>
            </CardTitle>
            <p className="text-sm text-muted-foreground mb-2">{book.author}</p>
            <Badge variant="secondary" className="text-xs">
              {book.genre}
            </Badge>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem asChild>
                <Link to={`/books/${book._id}`} className="flex items-center">
                  <Eye className="mr-2 h-4 w-4" />
                  View
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  to={`/edit-book/${book._id}`}
                  className="flex items-center"
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Link>
              </DropdownMenuItem>
              {book.available && book.copies > 0 && (
                <DropdownMenuItem asChild>
                  <Link
                    to={`/borrow/${book._id}`}
                    className="flex items-center"
                  >
                    <BookOpen className="mr-2 h-4 w-4" />
                    Borrow
                  </Link>
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => onDeleteRequest(book)}
                className="text-destructive"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground line-clamp-2">
            {book.description}
          </p>

          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              ISBN: <span className="font-mono">{book.isbn}</span>
            </span>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Copies:</span>
              <span className="font-medium">{book.copies}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Badge
              variant={
                book.available && book.copies > 0 ? 'default' : 'destructive'
              }
              className="text-xs"
            >
              {book.available && book.copies > 0 ? 'Available' : 'Unavailable'}
            </Badge>

            <div className="flex gap-2">
              <Button asChild size="sm" variant="outline">
                <Link to={`/books/${book._id}`}>
                  <Eye className="h-4 w-4 mr-1" />
                  View
                </Link>
              </Button>

              {book.available && book.copies > 0 && (
                <Button asChild size="sm">
                  <Link to={`/borrow/${book._id}`}>
                    <BookOpen className="h-4 w-4 mr-1" />
                    Borrow
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookCard;
