import type { IBorrowSummary } from '@/types';

export function getAllBorrowStats(allBorrowedBooks: IBorrowSummary[]) {
  if (!allBorrowedBooks || allBorrowedBooks.length === 0) {
    return {
      booksBorrowed: 0,
      totalCopies: 0,
      averagePerBook: 0,
      mostPopular: null,
    };
  }

  const booksBorrowed = allBorrowedBooks.length;

  const totalCopies = allBorrowedBooks.reduce(
    (acc, item) => acc + item.totalQuantity,
    0
  );

  const averagePerBook = Math.ceil(totalCopies / booksBorrowed);

  const mostPopular = allBorrowedBooks.reduce((max, item) =>
    item.totalQuantity > max.totalQuantity ? item : max
  );

  return {
    booksBorrowed, // unique titles borrowed
    totalCopies, // total borrowed copies
    averagePerBook, // avg per book
    mostPopular: {
      title: mostPopular.book.title,
      totalQuantity: mostPopular.totalQuantity,
    },
  };
}
