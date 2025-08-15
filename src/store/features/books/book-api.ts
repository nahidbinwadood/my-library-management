import { baseApi } from '../api/api';

const bookApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBooks: builder.query({
      query: () => ({
        url: '/books',
      }),
      providesTags: ['books'],
    }),
  }),
});

export const { useGetAllBooksQuery } = bookApi;
