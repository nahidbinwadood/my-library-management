import StatsCard from '@/components/common/stats-card';
import AllBooks from '@/components/homepage/all-books';
import HomepageError from '@/components/homepage/homepage-error';
import HomepageHeader from '@/components/homepage/homepage-header';
import HomepageSkeleton from '@/components/homepage/homepage-skeleton';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { genres } from '@/data';
import { useGetAllBooksQuery } from '@/store/features/books/book-api';
import type { Book, IGenresOption, IStatCardData } from '@/types';
import { BookOpen, Grid, List, TrendingUp } from 'lucide-react';
import { useMemo, useState } from 'react';

const Homepage = () => {
  const query = {
    sortBy: 'createdAt',
    sort: 'asc',
    limit: 200,
  };

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
    return <HomepageSkeleton />;
  }

  // Error state
  if (isError) {
    return <HomepageError />;
  }

  // Render normal content
  return (
    <div className="space-y-8">
      {/* Header */}
      <HomepageHeader />

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
      <AllBooks
        filteredBooks={filteredBooks}
        viewMode={viewMode}
        genreFilter={genreFilter}
      />
    </div>
  );
};

export default Homepage;
