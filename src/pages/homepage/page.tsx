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
import { useGetAllBooksQuery } from '@/store/features/books/book-api';
import type { Book, IStatCardData } from '@/types';
import { BookOpen, Grid, List, Plus, TrendingUp } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link } from 'react-router';

// Mock data for demonstration
const mockBooks: Book[] = [
  {
    id: '1',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    genre: 'Fiction',
    isbn: '978-0-7432-7356-5',
    description:
      'A classic American novel set in the summer of 1922, exploring themes of wealth, love, and the American Dream.',
    copies: 5,
    available: true,
  },
  {
    id: '2',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    genre: 'Fiction',
    isbn: '978-0-06-112008-4',
    description:
      'A gripping tale of racial injustice and loss of innocence in the American South.',
    copies: 3,
    available: true,
  },
  {
    id: '3',
    title: 'Clean Code',
    author: 'Robert C. Martin',
    genre: 'Technical',
    isbn: '978-0-13-235088-4',
    description:
      'A handbook of agile software craftsmanship for writing clean, maintainable code.',
    copies: 0,
    available: false,
  },
  {
    id: '4',
    title: 'The Psychology of Money',
    author: 'Morgan Housel',
    genre: 'Self-Help',
    isbn: '978-0-85285-767-5',
    description: 'Timeless lessons on wealth, greed, and happiness.',
    copies: 8,
    available: true,
  },
  {
    id: '5',
    title: 'Dune',
    author: 'Frank Herbert',
    genre: 'Science Fiction',
    isbn: '978-0-441-17271-9',
    description:
      'A science fiction masterpiece set on the desert planet Arrakis.',
    copies: 2,
    available: true,
  },
];

const Homepage = () => {
  const { data } = useGetAllBooksQuery({});
  const allBooksData = data?.data;
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [genreFilter, setGenreFilter] = useState<string>('all');

  // Filter books based on selected genre
  const filteredBooks = useMemo(() => {
    if (genreFilter === 'all') return mockBooks;
    return mockBooks.filter((book) => book.genre === genreFilter);
  }, [genreFilter]);

  // Get unique genres for filter
  const genres = useMemo(() => {
    const uniqueGenres = Array.from(
      new Set(mockBooks.map((book) => book.genre))
    );
    return uniqueGenres.sort();
  }, []);

  const statsCardInfo: IStatCardData[] = [
    {
      id: 1,
      title: 'Total Books',
      icon: BookOpen,
      stats: 5,
      description: `${allBooksData?.length} available`,
    },
    {
      id: 2,
      title: 'Total Copies',
      icon: TrendingUp,
      stats: 5,
      description: `Across all books`,
    },
    {
      id: 3,
      title: 'Borrowed',
      icon: BookOpen,
      stats: 2,
      description: `Currently on loanCurrently on loan`,
    },
    {
      id: 4,
      title: 'Genres',
      icon: BookOpen,
      stats: 12,
      description: ` Different categories`,
    },
  ];

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
                {genres.map((genre) => (
                  <SelectItem key={genre} value={genre}>
                    {genre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Badge variant="outline">
            {filteredBooks.length} book{filteredBooks.length !== 1 ? 's' : ''}
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
          {filteredBooks.map((book) => (
            <BookCard key={book.id} book={book} />
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
