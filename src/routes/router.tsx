import MainLayout from '@/layouts/main-layout';
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
        path: '/create-book',
        Component: CreateBook,
      },
      {
        path: '/borrow-summary',
        Component: BorrowSummary,
      },
    ],
  },
]);

export default router;
