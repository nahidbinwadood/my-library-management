import type { Book, BorrowBookData } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { BookOpen, Calendar, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { DatePicker } from '../common/date-picker';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';

const borrowSchema = z.object({
  quantity: z.number().min(1, 'Quantity must be at least 1'),
  dueDate: z.string().min(1, 'Due date is required'),
});

interface BorrowFormProps {
  book: Book;
  onSubmit: (data: BorrowBookData) => void;
  isLoading?: boolean;
}
const BorrowForm = ({ book, onSubmit, isLoading = false }: BorrowFormProps) => {
  const form = useForm<BorrowBookData>({
    resolver: zodResolver(borrowSchema),
    defaultValues: {
      quantity: 1,
      dueDate: '',
    },
    mode: 'onChange',
  });

  const today = new Date();

  const handleSubmit = (data: BorrowBookData) => {
    onSubmit(data);
  };

  const watchQuantity = form.watch('quantity');
  const isQuantityValid = watchQuantity <= book.copies;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Borrow Book</h1>
        <p className="text-muted-foreground">
          Complete the form below to borrow this book
        </p>
      </div>
      {/* Book Info Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Book Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold">{book.title}</h3>
              <p className="text-muted-foreground">by {book.author}</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Genre:</span>
                <Badge variant="secondary" className="ml-2 text-xs">
                  {book.genre}
                </Badge>
              </div>
              <div>
                <span className="text-muted-foreground">ISBN:</span>
                <span className="ml-2 font-mono">{book.isbn}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Available:</span>
                <span className="ml-2 font-medium">{book.copies} copies</span>
              </div>
              <div>
                <span className="text-muted-foreground">Status:</span>
                <Badge
                  variant={
                    book.available && book.copies > 0
                      ? 'default'
                      : 'destructive'
                  }
                  className="ml-2 text-xs"
                >
                  {book.available && book.copies > 0
                    ? 'Available'
                    : 'Unavailable'}
                </Badge>
              </div>
            </div>

            {book.description && (
              <div>
                <h4 className="font-medium mb-2">Description</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {book.description}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      {/* Borrow Form Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Borrow Book
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quantity *</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="1"
                          min={1}
                          max={book.copies}
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value) || 1)
                          }
                        />
                      </FormControl>
                      <FormDescription>
                        Maximum {book.copies} copies available
                      </FormDescription>
                      {!isQuantityValid && (
                        <FormMessage>
                          Quantity cannot exceed available copies ({book.copies}
                          )
                        </FormMessage>
                      )}
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="dueDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Due Date *</FormLabel>
                      <FormControl>
                        <DatePicker
                          date={field.value ? new Date(field.value) : undefined}
                          onDateChange={(date) =>
                            field.onChange(date ? date.toISOString() : '')
                          }
                          placeholder="Select due date"
                          minDate={today}
                          className="w-full"
                        />
                      </FormControl>
                      <FormDescription>
                        Select the return due date
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Summary */}
              <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                <h4 className="font-medium">Borrow Summary</h4>
                <div className="text-sm space-y-1">
                  <div className="flex justify-between">
                    <span>Book:</span>
                    <span className="font-medium">{book.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Quantity:</span>
                    <span className="font-medium">
                      {watchQuantity || 1}{' '}
                      {watchQuantity === 1 ? 'copy' : 'copies'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Due Date:</span>
                    <span className="font-medium">
                      {form.watch('dueDate')
                        ? new Date(
                            form.getValues('dueDate')
                          ).toLocaleDateString()
                        : 'Not selected'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  type="submit"
                  disabled={
                    isLoading ||
                    !isQuantityValid ||
                    !book.available ||
                    !form.watch('dueDate')
                  }
                  className="flex-1 md:flex-initial"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <BookOpen className="mr-2 h-4 w-4" />
                      Borrow Book
                    </>
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => form.reset()}
                  disabled={isLoading}
                >
                  Reset
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default BorrowForm;
