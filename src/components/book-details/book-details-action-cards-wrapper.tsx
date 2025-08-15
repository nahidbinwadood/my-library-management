import type { Book } from '@/types';
import { BookOpen, Edit, Trash2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
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
} from '../ui/alert-dialog';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

const BookDetailsActionCardWrapper = ({ book }: { book: Book }) => {
  const navigate = useNavigate();

  const handleDelete = () => {
    // TODO: Implement delete functionality
    console.log('Delete book:', book._id);
    navigate('/books');
  };
  return (
    <div className="space-y-6">
      {/* Actions Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {book.available && book.copies > 0 && (
            <Button asChild className="w-full">
              <Link to={`/borrow/${book._id}`}>
                <BookOpen className="mr-2 h-4 w-4" />
                Borrow Book
              </Link>
            </Button>
          )}

          <Button asChild variant="outline" className="w-full">
            <Link to={`/edit-book/${book._id}`}>
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
                  This action cannot be undone. This will permanently delete "
                  {book.title}" from the library system.
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
              <div className="text-muted-foreground">F. Scott Fitzgerald</div>
            </div>
            <div className="text-sm">
              <div className="font-medium">Tender Is the Night</div>
              <div className="text-muted-foreground">F. Scott Fitzgerald</div>
            </div>
            <Button variant="ghost" size="sm" className="w-full mt-2">
              View More
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookDetailsActionCardWrapper;
