import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import type { Book } from '@/types';
import {
  ArrowLeft,
  BookmarkIcon,
  BookOpen,
  Calendar,
  Copy,
  Edit,
  Hash,
  Trash2,
  User,
} from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router';

// Mock data - replace with actual API call
const mockBooks: Book[] = [
  {
    id: '1',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    genre: 'Fiction',
    isbn: '978-0-7432-7356-5',
    description:
      'A classic American novel set in the summer of 1922, exploring themes of wealth, love, and the American Dream. The story follows Jay Gatsby, a mysterious millionaire, and his obsession with the beautiful Daisy Buchanan. Set in the prosperous Long Island of 1922, this masterpiece captures the spirit of the Jazz Age and offers a critique of the American upper class.',
    copies: 5,
    available: true,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-20T14:30:00Z',
  },
  // ... other books
];

const BookDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const book = mockBooks.find((b) => b.id === id);

  if (!book) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
        <BookOpen className="h-16 w-16 text-muted-foreground/50 mb-4" />
        <h2 className="text-2xl font-semibold mb-2">Book Not Found</h2>
        <p className="text-muted-foreground mb-6">
          The book you're looking for doesn't exist or has been removed.
        </p>
        <Button asChild>
          <Link to="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Books
          </Link>
        </Button>
      </div>
    );
  }

  const handleDelete = () => {
    // TODO: Implement delete functionality
    console.log('Delete book:', book.id);
    navigate('/books');
  };

  const copyISBN = () => {
    navigator.clipboard.writeText(book.isbn);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" asChild>
          <Link to="/">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{book.title}</h1>
          <p className="text-xl text-muted-foreground">by {book.author}</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Book Info Card */}
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
                    book.available && book.copies > 0
                      ? 'default'
                      : 'destructive'
                  }
                  className="text-sm px-3 py-1"
                >
                  {book.available && book.copies > 0
                    ? 'Available'
                    : 'Unavailable'}
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
                    <span className="ml-2 text-lg font-bold">
                      {book.copies}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium">Available:</span>
                    <span className="ml-2 text-lg font-bold text-green-600">
                      {book.copies}{' '}
                      {/* In real app, calculate available copies */}
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
                        • Updated{' '}
                        {new Date(book.updatedAt).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Actions Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {book.available && book.copies > 0 && (
                <Button asChild className="w-full">
                  <Link to={`/borrow/${book.id}`}>
                    <BookOpen className="mr-2 h-4 w-4" />
                    Borrow Book
                  </Link>
                </Button>
              )}

              <Button asChild variant="outline" className="w-full">
                <Link to={`/edit-book/${book.id}`}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Book
                </Link>
              </Button>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" className="w-full">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Book
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      "{book.title}" from the library system.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDelete}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      Delete Book
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardContent>
          </Card>

          {/* Quick Stats Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Total Borrowed
                </span>
                <span className="font-medium">12 times</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Currently Borrowed
                </span>
                <span className="font-medium">0 copies</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Popularity Rank
                </span>
                <span className="font-medium">#3</span>
              </div>
            </CardContent>
          </Card>

          {/* Related Books Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Related Books</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="text-sm">
                  <div className="font-medium">This Side of Paradise</div>
                  <div className="text-muted-foreground">
                    F. Scott Fitzgerald
                  </div>
                </div>
                <div className="text-sm">
                  <div className="font-medium">Tender Is the Night</div>
                  <div className="text-muted-foreground">
                    F. Scott Fitzgerald
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="w-full mt-2">
                  View More
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
