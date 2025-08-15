import BookForm from '@/components/create-book/book-form';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link, useParams } from 'react-router';

const CreateBook = () => {
  const { id } = useParams();

  return (
    <div className="container mx-auto flex items-start">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" asChild>
          <Link to="/">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Books
          </Link>
        </Button>
      </div>

      <div className="max-w-4xl mx-auto  ">
        <div className="pb-5">
          <h1 className="text-3xl font-bold tracking-tight">
            {id ? 'Edit' : 'Add New'} Book
          </h1>
          <p className="text-muted-foreground">
            {id
              ? 'Edit the book to the library collection'
              : 'Add a new book to the library collection'}
          </p>
        </div>
        {/* Form */}
        <BookForm />
      </div>
    </div>
  );
};

export default CreateBook;
