import BookDetailsActionCardWrapper from '@/components/book-details/book-details-action-cards-wrapper';
import BookDetailsCard from '@/components/book-details/book-details-card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetSingleBookQuery } from '@/store/features/books/book-api';
import type { Book } from '@/types';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { Link, useParams } from 'react-router';

const BookDetails = () => {
  const { id } = useParams<{ id: string }>();
  const {
    data: bookData,
    isLoading,
    isError,
    error,
  } = useGetSingleBookQuery(id);
  const book: Book | null = bookData?.data ?? null;

  // Loading state skeleton
  if (isLoading) {
    return (
      <div className="container mx-auto space-y-6">
        {/* Header Skeleton */}
        <div className="flex items-center gap-4">
          <Skeleton className="h-8 w-24 rounded" />
        </div>

        {/* Title & Author Skeleton */}
        <div className="max-w-5xl mx-auto space-y-4">
          <Skeleton className="h-10 w-3/4 rounded" />
          <Skeleton className="h-6 w-1/2 rounded" />
        </div>

        {/* Grid Skeleton */}
        <div className="grid gap-6 lg:grid-cols-3 max-w-5xl mx-auto">
          <div className="lg:col-span-2 space-y-4">
            {/* Book Card Skeleton */}
            <Skeleton className="h-64 w-full rounded" />
            <Skeleton className="h-40 w-full rounded" />
          </div>

          {/* Sidebar Skeleton */}
          <div className="space-y-4">
            <Skeleton className="h-32 w-full rounded" />
            <Skeleton className="h-48 w-full rounded" />
            <Skeleton className="h-40 w-full rounded" />
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (isError || !book) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
        <BookOpen className="h-16 w-16 text-muted-foreground/50 mb-4" />
        <h2 className="text-2xl font-semibold mb-2">
          {error ? 'Failed to load book' : 'Book Not Found'}
        </h2>
        <p className="text-muted-foreground mb-6">
          {error
            ? 'Something went wrong while fetching the book data.'
            : "The book you're looking for doesn't exist or has been removed."}
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

  // Render the book details when loaded
  return (
    <div className="container mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" asChild>
          <Link to="/">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Link>
        </Button>
      </div>

      <div className="max-w-5xl mx-auto">
        {/* Book title */}
        <div className="pb-6">
          <h1 className="text-3xl font-bold tracking-tight">{book.title}</h1>
          <p className="text-xl text-muted-foreground">by {book.author}</p>
        </div>

        {/* Main Content */}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <BookDetailsCard book={book} />
          </div>

          {/* Sidebar */}
          <BookDetailsActionCardWrapper book={book} />
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
