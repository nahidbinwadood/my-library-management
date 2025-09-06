import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { BookOpen, FileText, Library, Plus } from 'lucide-react';
import { Link, useLocation } from 'react-router';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: '/', label: 'All Books', icon: BookOpen },
    { path: '/create-book', label: 'Create Book', icon: Plus },
    { path: '/borrow-summary', label: 'Borrow Summary', icon: FileText },
  ];
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl mx-auto items-center justify-between px-4 md:px-8 2xl:px-0">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
        >
          <Library className="h-6 w-6 text-primary" />
          <span className="hidden sm:inline-block font-bold text-lg bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            LibraryMS
          </span>
        </Link>

        {/* Navigation Items */}
        <NavigationMenu>
          <NavigationMenuList className="gap-1">
            {navItems.map(({ path, label, icon: Icon }) => (
              <NavigationMenuItem key={path}>
                <Button
                  asChild
                  variant={isActive(path) ? 'default' : 'ghost'}
                  size="sm"
                  className="h-9 px-3 font-medium"
                >
                  <Link to={path} className="flex items-center gap-2">
                    <Icon className="h-4 w-4" />
                    <span className="hidden sm:inline-block">{label}</span>
                  </Link>
                </Button>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  );
};

export default Navbar;
