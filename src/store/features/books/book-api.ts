import type { Book, IFilterOption } from '@/types';
import { baseApi } from '../api/api';
import { updateGenre } from '../genre/genre-slice';

const bookApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBooks: builder.query({
      query: (params) => ({
        url: '/books',
        params,
        method: 'GET',
      }),
      providesTags: ['books'],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const allBooks: Book[] = data?.data ?? [];

          const uniqueGenres: IFilterOption[] = Array.from(
            new Set(allBooks.map((book) => book.genre))
          )
            .map((genre) => ({
              label: genre.charAt(0) + genre.slice(1).toLowerCase(),
              value: genre,
            }))
            .sort((a, b) => a.label.localeCompare(b.label));

          dispatch(updateGenre(uniqueGenres));
        } catch (error) {
          console.error('Error updating genres in Redux:', error);
        }
      },
    }),
    getSingleBook: builder.query({
      query: (id) => ({
        url: `/books/${id}`,
        method: 'GET',
      }),
    }),
    createBook: builder.mutation({
      query: (formData) => ({
        url: '/books',
        method: 'POST',
        body: formData,
      }),
    }),
  }),
});

export const {
  useGetAllBooksQuery,
  useGetSingleBookQuery,
  useCreateBookMutation,
} = bookApi;
