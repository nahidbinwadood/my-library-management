import BorrowForm from '@/components/borrow-book/borrow-form';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetSingleBookQuery } from '@/store/features/books/book-api';
import { useBorrowABookMutation } from '@/store/features/borrow/borrow-api';
import type { BorrowBookData } from '@/types';
import { ArrowLeft, BookOpen } from 'lucide-react';
import toast from 'react-hot-toast';
import { Link, useNavigate, useParams } from 'react-router';

const BorrowBook = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const id = bookId;

  const { data, isLoading, isError } = useGetSingleBookQuery(id);
  const [borrowABook, { isLoading: borrowLoading }] = useBorrowABookMutation();
  const bookData = data?.data;
  const navigate = useNavigate();

  const handleSubmit = async (data: BorrowBookData) => {
    try {
      const payloads = {
        book: bookId,
        ...data,
      };
      const res = await borrowABook(payloads).unwrap();

      if (res.success) {
        toast.success('Book borrowed successfully!');
        navigate('/borrow-summary');
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Failed to borrow book');
      }
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto space-y-6 animate-in fade-in duration-300">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Skeleton className="h-8 w-36 rounded-md" />
        </div>

        <div className="max-w-2xl mx-auto space-y-6">
          <div className="space-y-2">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-4 w-60" />
          </div>{' '}
          {/* Book Info Card Skeleton */}
          <div className="border rounded-xl p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-5 rounded-full" />
              <Skeleton className="h-5 w-32" />
            </div>
            <div className="space-y-3">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-32" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-24" />
                </div>
              ))}
            </div>
            <Skeleton className="h-20 w-full" />
          </div>
          {/* Borrow Form Card Skeleton */}
          <div className="border rounded-xl p-6 shadow-sm space-y-6">
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-5 rounded-full" />
              <Skeleton className="h-5 w-28" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>

            <div className="bg-muted/30 p-4 rounded-lg space-y-2">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-36" />
            </div>

            <div className="flex gap-4">
              <Skeleton className="h-10 w-32 rounded-md" />
              <Skeleton className="h-10 w-24 rounded-md" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isError || !bookData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
        <BookOpen className="h-16 w-16 text-muted-foreground/50 mb-4" />
        <h2 className="text-2xl font-semibold mb-2">Book Not Found</h2>
        <p className="text-muted-foreground mb-6">
          The book you're trying to borrow doesn't exist or has been removed.
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

  if (!bookData.available || bookData.copies === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
        <BookOpen className="h-16 w-16 text-muted-foreground/50 mb-4" />
        <h2 className="text-2xl font-semibold mb-2">Book Unavailable</h2>
        <p className="text-muted-foreground mb-6">
          "{bookData.title}" is currently not available for borrowing.
        </p>
        <div className="flex gap-4">
          <Button asChild variant="outline">
            <Link to={`/books/${bookData._id}`}>View Details</Link>
          </Button>
          <Button asChild>
            <Link to="/books">Browse Other Books</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto space-y-6 ">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" asChild>
          <Link to={`/books/${bookData._id}`}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Details
          </Link>
        </Button>
      </div>

      {/* Borrow Form */}
      <BorrowForm
        book={bookData}
        onSubmit={handleSubmit}
        isLoading={borrowLoading}
      />
    </div>
  );
};

export default BorrowBook;
