import { ShoppingCart, Search, Menu, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "./ThemeProvider";
import { useState } from "react";
import { Link } from "wouter";

interface HeaderProps {
  cartItemCount?: number;
  onCartClick?: () => void;
  onSearchClick?: () => void;
}

export default function Header({ cartItemCount = 0, onCartClick, onSearchClick }: HeaderProps) {
  const { theme, setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Mobile Menu Button */}
          <Button
            data-testid="button-mobile-menu"
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>

          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold tracking-tight" data-testid="text-logo">
              Yona
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 flex-1 justify-center">
            <Link
              href="/shop"
              className="text-sm font-medium hover-elevate px-3 py-2 rounded-md transition-colors"
              data-testid="link-shop"
            >
              Shop
            </Link>
            <Link
              href="/collections"
              className="text-sm font-medium hover-elevate px-3 py-2 rounded-md transition-colors"
              data-testid="link-collections"
            >
              Collections
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium hover-elevate px-3 py-2 rounded-md transition-colors"
              data-testid="link-about"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium hover-elevate px-3 py-2 rounded-md transition-colors"
              data-testid="link-contact"
            >
              Contact
            </Link>
          </nav>

          {/* Search Bar - Desktop */}
          <div className="hidden lg:flex items-center flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-9"
                data-testid="input-search"
                onClick={onSearchClick}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Mobile Search */}
            <Button
              data-testid="button-search-mobile"
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={onSearchClick}
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Theme Toggle */}
            <Button
              data-testid="button-theme-toggle"
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              {theme === "light" ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </Button>

            {/* Cart */}
            <Button
              data-testid="button-cart"
              variant="ghost"
              size="icon"
              className="relative"
              onClick={onCartClick}
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <Badge
                  data-testid="badge-cart-count"
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                  variant="default"
                >
                  {cartItemCount}
                </Badge>
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t" data-testid="nav-mobile-menu">
            <div className="flex flex-col gap-2">
              <Link
                href="/shop"
                className="text-sm font-medium hover-elevate px-3 py-2 rounded-md"
                data-testid="link-shop-mobile"
              >
                Shop
              </Link>
              <Link
                href="/collections"
                className="text-sm font-medium hover-elevate px-3 py-2 rounded-md"
                data-testid="link-collections-mobile"
              >
                Collections
              </Link>
              <Link
                href="/about"
                className="text-sm font-medium hover-elevate px-3 py-2 rounded-md"
                data-testid="link-about-mobile"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-sm font-medium hover-elevate px-3 py-2 rounded-md"
                data-testid="link-contact-mobile"
              >
                Contact
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}