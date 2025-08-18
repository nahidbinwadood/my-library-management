import type { Book } from '@/types';
import { BookOpen, Plus } from 'lucide-react';
import { Fragment, useState } from 'react';
import { Link } from 'react-router';
import DeleteAlert from '../common/delete-alert';
import { Button } from '../ui/button';
import { DataTable } from '../ui/data-table';
import BookCard from './book-card';
import BookColumns from './book-column';

interface IAllBooksDisplay {
  filteredBooks: Book[];
  viewMode: 'table' | 'grid';
  genreFilter: string;
}

const AllBooks = ({
  filteredBooks,
  viewMode,
  genreFilter,
}: IAllBooksDisplay) => {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const handleDeleteRequest = (book: Book) => {
    setSelectedBook(book);
    setOpen(true);
  };
  return (
    <Fragment>
      {viewMode === 'table' ? (
        <DataTable
          columns={BookColumns({ onDeleteRequest: handleDeleteRequest })}
          data={filteredBooks}
          searchKey="title"
          searchPlaceholder="Search books by title..."
        />
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredBooks.map((book: Book) => (
            <BookCard key={book._id} book={book} />
          ))}
          {filteredBooks.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
              <BookOpen className="h-12 w-12 text-muted-foreground/50 mb-4" />
              <h3 className="text-lg font-semibold mb-2">No books found</h3>
              <p className="text-muted-foreground mb-4">
                {genreFilter === 'all'
                  ? 'There are no books in the library yet.'
                  : `No books found in the "${genreFilter}" genre.`}
              </p>
              <Button asChild>
                <Link to="/create-book">
                  <Plus className="mr-2 h-4 w-4" />
                  Add First Book
                </Link>
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Delete Modal */}
      <DeleteAlert
        open={open}
        setOpen={setOpen}
        id={selectedBook?._id}
        title={`This action cannot be undone. This will permanently delete "${selectedBook?.title}" from the library system.`}
      />
    </Fragment>
  );
};

export default AllBooks;
