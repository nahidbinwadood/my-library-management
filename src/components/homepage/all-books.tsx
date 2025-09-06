import type { QueryState } from '@/pages/homepage/page';
import type { Book } from '@/types';
import { BookOpen, Plus } from 'lucide-react';
import { Fragment, useState, type Dispatch, type SetStateAction } from 'react';
import { Link } from 'react-router';
import DeleteAlert from '../common/delete-alert';
import { Button } from '../ui/button';
import { DataTable, type PaginationInfo } from '../ui/data-table';
import BookCard from './book-card';
import BookColumns from './book-column';

interface IAllBooksDisplay {
  data: Book[];
  viewMode: 'table' | 'grid';
  isLoading: boolean;
  setQuery: Dispatch<SetStateAction<QueryState>>;
  query: QueryState;
  pagination: PaginationInfo;
}

const AllBooks = ({
  data,
  viewMode,
  isLoading,
  pagination,
  setQuery,
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
          data={data}
          isLoading={isLoading}
          pagination={pagination} // from backend
          onPageChange={(page) => setQuery((prev) => ({ ...prev, page }))}
        />
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data?.map((book: Book) => (
            <BookCard
              onDeleteRequest={handleDeleteRequest}
              key={book._id}
              book={book}
            />
          ))}
          {data?.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
              <BookOpen className="h-12 w-12 text-muted-foreground/50 mb-4" />
              <h3 className="text-lg font-semibold mb-2">No books found</h3>
              <p className="text-muted-foreground mb-4">
                There are no books in the library yet.
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
