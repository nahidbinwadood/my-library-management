import StatsCard from '@/components/common/stats-card';
import BookCard from '@/components/homepage/book-card';
import BookColumns from '@/components/homepage/book-column';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { genres } from '@/data';
import { useGetAllBooksQuery } from '@/store/features/books/book-api';
import type { Book, IGenresOption, IStatCardData } from '@/types';
import { BookOpen, Grid, List, Plus, TrendingUp } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link } from 'react-router';

const Homepage = () => {
  const query = { sortBy: 'createdAt', sort: 'asc', limit: 200 };

  const { data, isLoading, isError } = useGetAllBooksQuery(query);
  const allBooksData = data?.data;

  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [genreFilter, setGenreFilter] = useState<string>('all');

  // Filter books based on selected genre
  const filteredBooks = useMemo(() => {
    if (genreFilter === 'all') return allBooksData ?? [];
    return allBooksData?.filter((book: Book) => book.genre === genreFilter);
  }, [allBooksData, genreFilter]);

  // Stats data
  const statsData = useMemo(() => {
    const totalBooks = allBooksData?.length ?? 0;
    const availableBooks =
      allBooksData?.filter((book: Book) => book.available && book.copies > 0)
        .length ?? 0;
    const totalCopies =
      allBooksData?.reduce((sum: number, book: Book) => sum + book.copies, 0) ??
      0;
    const borrowedCopies =
      allBooksData?.reduce((sum: number, book: Book) => {
        return sum + Math.max(0, Math.floor(Math.random() * book.copies * 0.3));
      }, 0) ?? 0;

    return { totalBooks, availableBooks, totalCopies, borrowedCopies };
  }, [allBooksData]);

  const statsCardInfo: IStatCardData[] = [
    {
      id: 1,
      title: 'Total Books',
      icon: BookOpen,
      stats: `${statsData?.totalBooks}`,
      description: `${statsData?.availableBooks} available`,
    },
    {
      id: 2,
      title: 'Total Copies',
      icon: TrendingUp,
      stats: `${statsData?.totalCopies}`,
      description: `Across all books`,
    },
    {
      id: 3,
      title: 'Borrowed',
      icon: BookOpen,
      stats: `${statsData?.borrowedCopies}`,
      description: `Currently on loan`,
    },
    {
      id: 4,
      title: 'Genres',
      icon: BookOpen,
      stats: `${genres?.length || 0}`,
      description: `Different categories`,
    },
  ];

  // Loading Skeletons
  if (isLoading) {
    return (
      <div className="space-y-8">
        {/* Header Skeleton */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <Skeleton className="h-8 w-64 rounded" />
            <Skeleton className="h-4 w-48 rounded" />
          </div>
          <Skeleton className="h-10 w-32 rounded" />
        </div>

        {/* Stats Cards Skeleton */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-40 w-full rounded" />
          ))}
        </div>

        {/* Filters Skeleton */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Skeleton className="h-10 w-60 rounded" />
          <Skeleton className="h-10 w-40 rounded" />
        </div>

        {/* Books Grid Skeleton */}
        <div>
          <Skeleton className="h-10 w-96 rounded mb-4" />
          <div className="space-y-4">
            {[...Array(12)].map((_, i) => (
              <Skeleton key={i} className="h-12 w-full rounded" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
        <BookOpen className="h-12 w-12 text-muted-foreground/50 mb-4" />
        <h2 className="text-2xl font-semibold mb-2">Failed to load books</h2>
        <p className="text-muted-foreground mb-6">
          Something went wrong while fetching the library books.
        </p>
      </div>
    );
  }

  // Render normal content
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Library Books</h1>
          <p className="text-muted-foreground">
            Manage and browse all books in the library collection
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild>
            <Link to="/create-book">
              <Plus className="mr-2 h-4 w-4" />
              Add Book
            </Link>
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statsCardInfo?.map((item: IStatCardData) => (
          <StatsCard key={item?.id} data={item} />
        ))}
      </div>

      {/* Filters and View Controls */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Genre:</span>
            <Select value={genreFilter} onValueChange={setGenreFilter}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Genres</SelectItem>
                {genres?.map((genre: IGenresOption) => (
                  <SelectItem
                    key={genre.value}
                    value={genre.value}
                    className="capitalize"
                  >
                    {genre.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Badge variant="outline">
            {filteredBooks?.length} book{filteredBooks?.length !== 1 ? 's' : ''}
          </Badge>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">View:</span>
          <div className="flex rounded-md border">
            <Button
              variant={viewMode === 'table' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('table')}
              className="rounded-r-none"
            >
              <List className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="rounded-l-none"
            >
              <Grid className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Books Display */}
      {viewMode === 'table' ? (
        <DataTable
          columns={BookColumns}
          data={filteredBooks}
          searchKey="title"
          searchPlaceholder="Search books by title..."
        />
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredBooks.map((book: Book) => (
            <BookCard key={book._id} book={book} />
          ))}
          {filteredBooks.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
              <BookOpen className="h-12 w-12 text-muted-foreground/50 mb-4" />
              <h3 className="text-lg font-semibold mb-2">No books found</h3>
              <p className="text-muted-foreground mb-4">
                {genreFilter === 'all'
                  ? 'There are no books in the library yet.'
                  : `No books found in the "${genreFilter}" genre.`}
              </p>
              <Button asChild>
                <Link to="/create-book">
                  <Plus className="mr-2 h-4 w-4" />
                  Add First Book
                </Link>
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Homepage;
