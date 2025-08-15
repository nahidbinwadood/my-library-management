import type { Book } from '@/types';
import { BookmarkIcon, Calendar, Copy, Hash, User } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Separator } from '../ui/separator';

const BookDetailsCard = ({ book }: { book: Book }) => {
  const copyISBN = () => {
    navigator.clipboard.writeText(book.isbn);
  };
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-2xl mb-2">{book.title}</CardTitle>
            <div className="flex items-center gap-4 text-muted-foreground">
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                <span>{book.author}</span>
              </div>
              <div className="flex items-center gap-1">
                <BookmarkIcon className="h-4 w-4" />
                <Badge variant="secondary">{book.genre}</Badge>
              </div>
            </div>
          </div>
          <Badge
            variant={
              book.available && book.copies > 0 ? 'default' : 'destructive'
            }
            className="text-sm px-3 py-1"
          >
            {book.available && book.copies > 0 ? 'Available' : 'Unavailable'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Description</h3>
            <p className="text-muted-foreground leading-relaxed">
              {book.description}
            </p>
          </div>

          <Separator />

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">Total Copies:</span>
              <span className="ml-2 text-lg font-bold">{book.copies}</span>
            </div>
            <div>
              <span className="font-medium">Available:</span>
              <span className="ml-2 text-lg font-bold text-green-600">
                {book.copies} {/* In real app, calculate available copies */}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Hash className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">ISBN:</span>
            <span className="font-mono text-sm bg-muted px-2 py-1 rounded">
              {book.isbn}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={copyISBN}
              className="h-8 px-2"
            >
              <Copy className="h-3 w-3" />
            </Button>
          </div>

          {book.createdAt && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>
                Added on {new Date(book.createdAt).toLocaleDateString()}
              </span>
              {book.updatedAt && book.updatedAt !== book.createdAt && (
                <span>
                  • Updated {new Date(book.updatedAt).toLocaleDateString()}
                </span>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default BookDetailsCard;
