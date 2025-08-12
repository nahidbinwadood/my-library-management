import { BookOpen, Github, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full border-t border-border/40 bg-background/50 backdrop-blur-sm">
      <div className="container max-w-screen-2xl py-8 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="flex flex-col space-y-3">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-5 w-5 text-primary" />
              <span className="font-semibold text-lg">LibraryMS</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              A modern library management system built with React, TypeScript,
              and ShadCN UI.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col space-y-3">
            <h4 className="font-semibold text-sm">Quick Links</h4>
            <div className="flex flex-col space-y-2 text-sm text-muted-foreground">
              <a
                href="/books"
                className="hover:text-foreground transition-colors"
              >
                All Books
              </a>
              <a
                href="/create-book"
                className="hover:text-foreground transition-colors"
              >
                Add Book
              </a>
              <a
                href="/borrow-summary"
                className="hover:text-foreground transition-colors"
              >
                Borrow Summary
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col space-y-3">
            <h4 className="font-semibold text-sm">Connect</h4>
            <div className="flex items-center space-x-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-6 border-t border-border/40 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © 2025 LibraryMS. Built with React & TypeScript.
          </p>
          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
            <span>Made with</span>
            <Heart className="h-3 w-3 text-red-500 fill-current" />
            <span>for book lovers</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
