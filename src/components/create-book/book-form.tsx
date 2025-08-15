import { genres } from '@/data';
import {
  useCreateBookMutation,
  useUpdateBookMutation,
} from '@/store/features/books/book-api';
import type { Book, CreateBookData, IGenresOption } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Save } from 'lucide-react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import * as z from 'zod';
import { Button } from '../ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Separator } from '../ui/separator';
import { Switch } from '../ui/switch';
import { Textarea } from '../ui/textarea';

const bookSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title too long'),
  author: z
    .string()
    .min(1, 'Author is required')
    .max(100, 'Author name too long'),
  genre: z.string().min(1, 'Genre is required'),
  isbn: z
    .string()
    .min(10, 'ISBN must be at least 10 characters')
    .max(17, 'ISBN too long'),
  description: z
    .string()
    .min(1, 'Description is required')
    .max(1000, 'Description too long'),
  copies: z
    .number()
    .min(0, 'Copies cannot be negative')
    .max(1000, 'Too many copies'),
  available: z.boolean().optional(),
});

export default function BookForm({ initialData }: { initialData?: Book }) {
  const navigate = useNavigate();
  const form = useForm<CreateBookData>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      title: initialData?.title || '',
      author: initialData?.author || '',
      genre: initialData?.genre || '',
      isbn: initialData?.isbn || '',
      description: initialData?.description || '',
      copies: initialData?.copies || 1,
      available: initialData?.available ?? true,
    },
  });
  const [createBook, { isLoading }] = useCreateBookMutation();
  const [updateBook, { isLoading: updateLoading }] = useUpdateBookMutation();

  const handleSubmit = async (data: CreateBookData) => {
    const formData = {
      ...data,
      available: data.copies > 0 ? data.available ?? true : false,
    };

    try {
      // create book
      if (!initialData) {
        const response = await createBook(formData).unwrap();
        if (response.success) {
          toast.success('Book created successfully!');
          form.reset();
          navigate('/');
        }
      }
      // update book
      else {
        const response = await updateBook({
          id: initialData._id,
          formData,
        }).unwrap();
        if (response.success) {
          toast.success('Book updated successfully!');
          form.reset();
          navigate('/');
        }
      }
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error('Failed to create book');
      }
    }
  };

  return (
    <Card className="w-full mx-auto border shadow-lg">
      <CardHeader className="space-y-1">
        <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
          <Save className="h-5 w-5" />
          {initialData ? 'Edit Book' : 'Add New Book'}
        </CardTitle>
        <CardDescription>
          Fill in the details below to{' '}
          {initialData ? 'update this book' : 'add a new book to the library'}.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            {/* Book Info */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title *</FormLabel>
                      <FormControl>
                        <Input
                          className="focus:ring-2 focus:ring-primary/50"
                          placeholder="Enter book title..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="author"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Author *</FormLabel>
                      <FormControl>
                        <Input
                          className="focus:ring-2 focus:ring-primary/50"
                          placeholder="Enter author name..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="genre"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Genre *</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="focus:ring-2 focus:ring-primary/50 w-full">
                            <SelectValue placeholder="Select genre..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {genres.map((genre: IGenresOption) => (
                            <SelectItem key={genre.value} value={genre.value}>
                              {genre.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="isbn"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ISBN *</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          className="focus:ring-2 focus:ring-primary/50 font-inter"
                          placeholder="Enter ISBN..."
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Separator className="my-6" />

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description *</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter book description..."
                      className="resize-none focus:ring-2 focus:ring-primary/50"
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Separator className="my-6" />

            {/* Availability */}
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="copies"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Copies *</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="0"
                        className="focus:ring-2 focus:ring-primary/50"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value) || 0)
                        }
                      />
                    </FormControl>
                    <FormDescription>
                      Set to 0 to mark as unavailable
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="available"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 bg-muted/50">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Available</FormLabel>
                      <FormDescription>
                        Mark this book as available for borrowing
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={form.watch('copies') === 0}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row md:justify-between gap-4 pt-4">
              <Button
                type="submit"
                disabled={isLoading}
                size="lg"
                className="flex-1 sm:flex-initial cursor-pointer"
              >
                {isLoading || updateLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    {initialData ? 'Update Book' : ' Create Book'}
                  </>
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={() => form.reset()}
                disabled={!!initialData || isLoading}
              >
                Reset
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
