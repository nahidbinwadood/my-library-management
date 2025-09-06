import { StatsCardSkeleton } from '@/components/borrow-summary/borrow-summary-stats-card-skeleton';
import StatsCard from '@/components/common/stats-card';
import AllBooks from '@/components/homepage/all-books';
import HomepageFilter from '@/components/homepage/filter-section';
import HomepageError from '@/components/homepage/homepage-error';
import HomepageHeader from '@/components/homepage/homepage-header';
import { genres } from '@/data';
import { useGetAllBooksQuery } from '@/store/features/books/book-api';
import type { IStatCardData, QueryState } from '@/types';
import { statsCardInfo } from '@/utils';
import { useMemo, useState } from 'react';

const Homepage = () => {
  const [query, setQuery] = useState<QueryState>({
    sortBy: 'createdAt',
    sort: 'asc',
    filter: 'all',
    page: 1,
    limit: 10,
    search: '',
  });
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');

  const { data, isLoading, isError } = useGetAllBooksQuery(query);

  const allBooksData = data?.data;

  // handlers=>
  const handleGenreFilter = (value: string) => {
    setQuery((prev) => ({
      ...prev,
      filter: value,
    }));
  };

  // Stats data
  const statsData = useMemo(
    () => ({
      totalBooks: data?.stats?.totalBooks ?? 0,
      availableBooks: data?.stats?.availableBooks ?? 0,
      totalCopies: data?.stats?.totalCopies ?? 0,
      borrowedCopies: data?.stats?.borrowed ?? 0,
      genresCount: genres?.length || 0,
    }),
    [data?.stats]
  );

  const allStats = statsCardInfo(statsData);

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
        {isLoading
          ? [...Array(4)].map((_, i) => <StatsCardSkeleton key={i} />)
          : allStats?.map((item: IStatCardData) => (
              <StatsCard key={item?.id} data={item} />
            ))}
      </div>

      {/* Filters and View Controls */}
      <HomepageFilter
        handleGenreFilter={handleGenreFilter}
        viewMode={viewMode}
        setViewMode={setViewMode}
        isLoading={isLoading}
        allBooksData={allBooksData ?? []}
        query={query}
      />

      {/* Books Display */}
      <AllBooks
        data={allBooksData ?? []}
        viewMode={viewMode}
        isLoading={isLoading}
        setQuery={setQuery}
        pagination={data?.pagination ?? {}}
        query={query}
      />
    </div>
  );
};

export default Homepage;
