import z from 'zod';

export const bookSchema = z.object({
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
