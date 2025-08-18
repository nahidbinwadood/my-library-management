import { useDeleteBookMutation } from '@/store/features/books/book-api';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { Loader2 } from 'lucide-react';
import type { Dispatch, SetStateAction } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog';
import { Button } from '../ui/button';

interface IDeleteAlert {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  id: string | undefined;
  title: string;
}

const DeleteAlert = ({ open, setOpen, id, title }: IDeleteAlert) => {
  const navigate = useNavigate();
  const [deleteBook, { isLoading }] = useDeleteBookMutation();

  const handleDelete = async () => {
    try {
      const response = await deleteBook(id).unwrap();
      if (response.success) {
        toast.success('Book deleted successfully!');
        navigate('/');
        setOpen(false);
      }
    } catch (error) {
      // Narrow error type
      const err = error as FetchBaseQueryError;

      if ('data' in err && typeof err.data === 'object' && err.data !== null) {
        const serverData = err.data as { message?: string };
        toast.error(serverData.message ?? 'Failed to delete book');
        setOpen(false);
      } else {
        toast.error('Failed to delete book');
        setOpen(false);
      }
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>{title}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>

          <Button
            onClick={handleDelete}
            disabled={isLoading}
            className="bg-destructive text-white hover:bg-destructive/90 flex-1 sm:flex-initial cursor-pointer w-32"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              <>Delete Book</>
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteAlert;
