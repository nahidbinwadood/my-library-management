import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Skeleton } from '../ui/skeleton';

export const BorrowSummaryTableSkeleton = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Skeleton className="h-5 w-40" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Skeleton className="h-6 w-96 rounded" />
        </div>
        <div className="border rounded-md">
          {/* Simulate 5 rows */}
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="flex items-center justify-between gap-4 border-b py-3 px-4"
            >
              <Skeleton className="h-4 w-48" /> {/* Book Title */}
              <Skeleton className="h-4 w-24" /> {/* ISBN */}
              <Skeleton className="h-6 w-16 rounded-md" /> {/* Badge */}
            </div>
          ))}
        </div>

        {/* buttons */}
        <div className="mt-4 w-full flex gap-3 items-center justify-end">
          <Skeleton className="h-8 w-20 rounded" />
          <Skeleton className="h-8 w-20 rounded" />
        </div>
      </CardContent>
    </Card>
  );
};
