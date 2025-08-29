import { baseApi } from '../api/api';

const borrowApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    borrowABook: builder.mutation({
      query: (payloads) => ({
        url: `/borrow`,
        method: 'POST',
        body: payloads,
      }),
      invalidatesTags: ['borrow', 'books'],
    }),
    getAllBorrows: builder.query({
      query: () => ({
        url: '/borrow',
        method: 'GET',
      }),
      providesTags: ['borrow'],
    }),
  }),
});

export const { useBorrowABookMutation, useGetAllBorrowsQuery } = borrowApi;
