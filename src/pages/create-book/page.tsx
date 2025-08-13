import BookForm from '@/components/create-book/book-form';
import { Button } from '@/components/ui/button';
import type { CreateBookData } from '@/types';
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate, useParams } from 'react-router';

const CreateBook = () => {
  const { id } = useParams();
  console.log(id);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (data: CreateBookData) => {
    setIsLoading(true);

    try {
      // TODO: Replace with actual API call
      console.log('Creating book:', data);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success('Book created successfully!');

      navigate('/books');
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error('Failed to create book');
      }
    } finally {
      setIsLoading(false);
    }
  };
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
          <h1 className="text-3xl font-bold tracking-tight">Add New Book</h1>
          <p className="text-muted-foreground">
            Add a new book to the library collection
          </p>
        </div>
        {/* Form */}
        <BookForm
          onSubmit={handleSubmit}
          isLoading={isLoading}
          submitButtonText="Create Book"
        />
      </div>
    </div>
  );
};

export default CreateBook;
