import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, Plus, User, Search } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="p-2 bg-gradient-primary rounded-lg group-hover:shadow-md transition-all">
              <BookOpen className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">CampusShare</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-6">
            <Link to="/products" className="text-foreground hover:text-primary transition-colors font-medium">
              Browse Resources
            </Link>
            <Link to="/products" className="text-foreground hover:text-primary transition-colors font-medium">
              Categories
            </Link>
            <Link to="/products" className="text-foreground hover:text-primary transition-colors font-medium">
              How It Works
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="hidden md:inline-flex">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link to="/products">
                <User className="h-4 w-4" />
                Sign In
              </Link>
            </Button>
            <Button variant="hero" size="sm" asChild className="hidden sm:inline-flex">
              <Link to="/add-product">
                <Plus className="h-4 w-4" />
                List Resource
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
