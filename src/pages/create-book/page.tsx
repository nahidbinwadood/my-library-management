import BookForm from '@/components/create-book/book-form';
import { FormSkeleton } from '@/components/create-book/form-skeleton';
import { Button } from '@/components/ui/button';
import { useGetSingleBookQuery } from '@/store/features/books/book-api';
import { ArrowLeft } from 'lucide-react';
import { Link, useParams } from 'react-router';

const CreateBook = () => {
  const { id } = useParams();

  // Only fetch if we have an id
  const { data: formData, isLoading } = useGetSingleBookQuery(id!, {
    skip: !id,
    refetchOnMountOrArgChange: true,
  });

  return (
    <div className="container mx-auto flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" asChild>
          <Link to="/">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Books
          </Link>
        </Button>
      </div>

      <div className="max-w-4xl mx-auto w-full">
        <div className="pb-5">
          <h1 className="text-3xl font-bold tracking-tight">
            {id ? 'Edit' : 'Add New'} Book
          </h1>
          <p className="text-muted-foreground">
            {id
              ? 'Edit the book in the library collection'
              : 'Add a new book to the library collection'}
          </p>
        </div>

        {/* Loading Skeleton */}
        {isLoading ? (
          <FormSkeleton />
        ) : (
          // Form
          <BookForm initialData={formData?.data ?? null} />
        )}
      </div>
    </div>
  );
};

export default CreateBook;
