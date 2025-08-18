import { Plus } from 'lucide-react';
import { Link } from 'react-router';
import { Button } from '../ui/button';

const HomepageHeader = () => {
  return (
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
  );
};

export default HomepageHeader;
