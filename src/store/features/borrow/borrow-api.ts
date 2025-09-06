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
      query: (params) => ({
        url: '/borrow',
        method: 'GET',
        params,
      }),
      providesTags: ['borrow'],
    }),
  }),
});

export const { useBorrowABookMutation, useGetAllBorrowsQuery } = borrowApi;
