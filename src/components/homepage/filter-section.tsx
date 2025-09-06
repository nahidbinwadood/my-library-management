import { genres } from '@/data';
import type { IGenresOption, QueryState } from '@/types';
import { Grid, List } from 'lucide-react';
import type { Dispatch, SetStateAction } from 'react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Skeleton } from '../ui/skeleton';

interface Props {
  isLoading: boolean;
  handleGenreFilter: (value: string) => void;
  viewMode: 'table' | 'grid';
  setViewMode: Dispatch<SetStateAction<'table' | 'grid'>>;
  allBooksData: [];
  query: QueryState;
}

const HomepageFilter = ({
  isLoading,
  handleGenreFilter,
  query,
  viewMode,
  setViewMode,
  allBooksData,
}: Props) => {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      {isLoading ? (
        // Skeleton while loading
        <>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-12" /> {/* "Genre:" text */}
              <Skeleton className="h-9 w-40 rounded-md" /> {/* Select */}
            </div>
            <Skeleton className="h-6 w-16 rounded-md" /> {/* Badge */}
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-10" /> {/* "View:" text */}
            <div className="flex rounded-md border">
              <Skeleton className="h-9 w-9 rounded-r-none" /> {/* Table btn */}
              <Skeleton className="h-9 w-9 rounded-l-none" /> {/* Grid btn */}
            </div>
          </div>
        </>
      ) : (
        // Actual content after loading
        <>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Genre:</span>
              <Select value={query.filter} onValueChange={handleGenreFilter}>
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
              {allBooksData?.length} book
              {allBooksData?.length > 1 ? 's' : ''}
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
        </>
      )}
    </div>
  );
};

export default HomepageFilter;
