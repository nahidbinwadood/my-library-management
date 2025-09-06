import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Skeleton } from '../ui/skeleton';

export const StatsCardSkeleton = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          <Skeleton className="h-4 w-24" />
        </CardTitle>
        <Skeleton className="h-6 w-6 rounded-full" />
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="text-2xl font-bold ">
          <Skeleton className="h-6 w-16" />
        </div>
        <div className="text-xs text-muted-foreground">
          <Skeleton className="h-3 w-32" />
        </div>
      </CardContent>
    </Card>
  );
};
