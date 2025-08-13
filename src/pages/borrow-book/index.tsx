import BorrowForm from '@/components/borrow-book/borrow-form';
import { Button } from '@/components/ui/button';
import type { Book, BorrowBookData } from '@/types';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
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
      'A classic American novel set in the summer of 1922, exploring themes of wealth, love, and the American Dream.',
    copies: 5,
    available: true,
  },
  {
    id: '2',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    genre: 'Fiction',
    isbn: '978-0-06-112008-4',
    description:
      'A gripping tale of racial injustice and loss of innocence in the American South.',
    copies: 3,
    available: true,
  },
];

const BorrowBook = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Find the book by ID
  const book = mockBooks.find((b) => b.id === bookId);

  const handleSubmit = async (data: BorrowBookData) => {
    if (!book) return;

    setIsLoading(true);

    try {
      // TODO: Replace with actual API call
      console.log('Borrowing book:', {
        bookId: book.id,
        bookTitle: book.title,
        ...data,
      });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast.success('Book borrowed successfully!');

      navigate('/borrow-summary');
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Failed to create book');
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (!book) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
        <BookOpen className="h-16 w-16 text-muted-foreground/50 mb-4" />
        <h2 className="text-2xl font-semibold mb-2">Book Not Found</h2>
        <p className="text-muted-foreground mb-6">
          The book you're trying to borrow doesn't exist or has been removed.
        </p>
        <Button asChild>
          <Link to="/books">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Books
          </Link>
        </Button>
      </div>
    );
  }

  if (!book.available || book.copies === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
        <BookOpen className="h-16 w-16 text-muted-foreground/50 mb-4" />
        <h2 className="text-2xl font-semibold mb-2">Book Unavailable</h2>
        <p className="text-muted-foreground mb-6">
          "{book.title}" is currently not available for borrowing.
        </p>
        <div className="flex gap-4">
          <Button asChild variant="outline">
            <Link to={`/books/${book.id}`}>View Details</Link>
          </Button>
          <Button asChild>
            <Link to="/books">Browse Other Books</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" asChild>
          <Link to={`/books/${book.id}`}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Details
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Borrow Book</h1>
          <p className="text-muted-foreground">
            Complete the form below to borrow this book
          </p>
        </div>
      </div>

      {/* Borrow Form */}
      <BorrowForm book={book} onSubmit={handleSubmit} isLoading={isLoading} />
    </div>
  );
};

export default BorrowBook;
