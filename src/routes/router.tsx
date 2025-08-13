import MainLayout from '@/layouts/main-layout';
import BookDetails from '@/pages/book-details/page';
import BorrowBook from '@/pages/borrow-book';
import BorrowSummary from '@/pages/borrow-summary/page';
import CreateBook from '@/pages/create-book/page';
import Homepage from '@/pages/homepage/page';
import { createBrowserRouter } from 'react-router';

const router = createBrowserRouter([
  {
    path: '/',
    Component: MainLayout,
    children: [
      {
        path: '/',
        Component: Homepage,
      },
      {
        path: '/create-book/:id',
        Component: CreateBook,
      },
      {
        path: '/borrow-summary',
        Component: BorrowSummary,
      },
      {
        path: '/books/:id',
        Component: BookDetails,
      },
      {
        path: '/borrow/:bookId',
        Component: BorrowBook,
      },
    ],
  },
]);

export default router;
