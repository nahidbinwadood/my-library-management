import { baseApi } from '../api/api';

const bookApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBooks: builder.query({
      query: (params) => ({
        url: '/books',
        params,
        method: 'GET',
      }),
      providesTags: ['books'],
    }),
    getSingleBook: builder.query({
      query: (id) => ({
        url: `/books/${id}`,
        method: 'GET',
      }),
      providesTags: (_, __, id) => [{ type: 'books', id }],
    }),
    createBook: builder.mutation({
      query: (formData) => ({
        url: '/books',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['books'],
    }),
    updateBook: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/books/${id}`,
        method: 'PUT',
        body: formData,
      }),
      invalidatesTags: (_, __, { id }) => [
        'books', // invalidates list
        { type: 'books', id }, // invalidates single book
      ],
    }),
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/books/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['books'],
    }),
  }),
});

export const {
  useGetAllBooksQuery,
  useGetSingleBookQuery,
  useCreateBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
} = bookApi;
