import { borrowSummaryColumns } from '@/components/borrow-summary/borrow-summary-columns';
import { StatsCardSkeleton } from '@/components/borrow-summary/borrow-summary-stats-card-skeleton';
import StatsCard from '@/components/common/stats-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTable } from '@/components/ui/data-table';
import { useGetAllBorrowsQuery } from '@/store/features/borrow/borrow-api';
import { getAllBorrowStats } from '@/utils';

import { BookOpen, FileText, Plus, TrendingUp } from 'lucide-react';
import { Link } from 'react-router';

const BorrowSummary = () => {
  const { data: allBorrowedBooks, isLoading } = useGetAllBorrowsQuery({});

  const allBorrowedBooksData = allBorrowedBooks?.data || [];
  console.log('allBorrowedBooksData', allBorrowedBooksData);

  const borrowStats = getAllBorrowStats(allBorrowedBooksData);

  // borrow summary stats:
  const borrowSummaryStats = [
    {
      id: 1,
      title: 'Books Borrowed',
      icon: <BookOpen className="h-4 w-4 text-muted-foreground" />,
      stats: borrowStats?.booksBorrowed,
      description: 'Unique titles borrowed',
    },
    {
      id: 2,
      title: 'Total Copies',
      stats: borrowStats?.totalCopies,
      description: 'Total borrowed copies',
      icon: <TrendingUp className="h-4 w-4 text-muted-foreground" />,
    },
    {
      id: 3,
      title: 'Average per Book',
      stats: borrowStats?.averagePerBook,
      description: 'Copies per book',
      icon: <FileText className="h-4 w-4 text-muted-foreground" />,
    },
    {
      id: 4,
      title: 'Most Popular',
      stats: borrowStats?.mostPopular?.title,
      description: 'Most borrowed book',
      icon: (
        <Badge variant="default" className="text-xs">
          {borrowStats?.mostPopular?.totalQuantity}
        </Badge>
      ),
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Borrow Summary</h1>
          <p className="text-muted-foreground">
            Overview of all borrowed books and their statistics
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild variant="outline">
            <Link to="/">
              <BookOpen className="mr-2 h-4 w-4" />
              Browse Books
            </Link>
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {isLoading
          ? [...Array(4)].map((_, i) => <StatsCardSkeleton key={i} />)
          : borrowSummaryStats?.map((item) => (
              <StatsCard key={item?.title} data={item} />
            ))}
      </div>

      {/* Summary Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Borrow Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={borrowSummaryColumns}
            data={allBorrowedBooksData}
            searchKey="title"
            isLoading={isLoading}
            searchPlaceholder="Search books by title..."
          />
        </CardContent>
      </Card>

      {/* Quick Actions */}
      {allBorrowedBooks?.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <Button asChild>
                <Link to="/">
                  <Plus className="mr-2 h-4 w-4" />
                  Borrow More Books
                </Link>
              </Button>
              <Button variant="outline" onClick={() => window.print()}>
                <FileText className="mr-2 h-4 w-4" />
                Export Report
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BorrowSummary;
