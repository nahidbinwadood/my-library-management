import { Skeleton } from '../ui/skeleton';

export const FormSkeleton = () => {
  return (
    <div className="space-y-6 border rounded-lg shadow-lg p-6">
      {/* Header */}
      <div className="space-y-2">
        <Skeleton className="h-6 w-1/3" /> {/* Title */}
        <Skeleton className="h-4 w-2/3" /> {/* Subtitle */}
      </div>

      {/* First row: Title + Author */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Skeleton className="h-4 w-1/4" /> {/* Label */}
          <Skeleton className="h-10 w-full" /> {/* Input */}
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>

      {/* Second row: Genre + ISBN */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-24 w-full" />
      </div>

      {/* Number of Copies */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-10 w-full" />
      </div>

      {/* Available switch */}
      <div className="flex items-center justify-between border p-4 rounded-lg bg-muted/50">
        <div className="space-y-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-3 w-40" />
        </div>
        <Skeleton className="h-6 w-12 rounded-full" /> {/* Toggle */}
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Skeleton className="h-10 w-full sm:w-32" />
        <Skeleton className="h-10 w-full sm:w-20" />
      </div>
    </div>
  );
};
