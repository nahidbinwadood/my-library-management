import { BookOpen } from 'lucide-react';

const HomepageError = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
      <BookOpen className="h-12 w-12 text-muted-foreground/50 mb-4" />
      <h2 className="text-2xl font-semibold mb-2">Failed to load books</h2>
      <p className="text-muted-foreground mb-6">
        Something went wrong while fetching the library books.
      </p>
    </div>
  );
};

export default HomepageError;
