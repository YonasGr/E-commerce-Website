import { Heart, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  rating?: number;
  isNew?: boolean;
}

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onToggleWishlist?: (productId: string) => void;
}

export default function ProductCard({ product, onAddToCart, onToggleWishlist }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleWishlistClick = () => {
    setIsWishlisted(!isWishlisted);
    onToggleWishlist?.(product.id);
  };

  const handleAddToCart = () => {
    onAddToCart?.(product);
  };

  return (
    <Card
      className="group overflow-hidden hover:shadow-lg transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-testid={`card-product-${product.id}`}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-muted">
        {imageError ? (
          <div className="w-full h-full flex items-center justify-center bg-muted">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Image not available</p>
            </div>
          </div>
        ) : (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            data-testid={`img-product-${product.id}`}
            onError={() => setImageError(true)}
          />
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNew && (
            <Badge data-testid={`badge-new-${product.id}`} variant="default">
              New
            </Badge>
          )}
        </div>

        {/* Wishlist Button */}
        <Button
          data-testid={`button-wishlist-${product.id}`}
          variant="secondary"
          size="icon"
          className="absolute top-3 right-3 h-9 w-9"
          onClick={handleWishlistClick}
        >
          <Heart
            className={`h-4 w-4 ${isWishlisted ? "fill-current text-destructive" : ""}`}
          />
        </Button>

        {/* Quick Add to Cart - Visible on hover (desktop) */}
        {isHovered && (
          <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
            <Button
              data-testid={`button-quick-add-${product.id}`}
              className="w-full"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
          </div>
        )}
      </div>

      <CardContent className="p-4">
        <p className="text-sm text-muted-foreground mb-1" data-testid={`text-category-${product.id}`}>
          {product.category}
        </p>
        <h3 className="font-semibold text-lg mb-2 line-clamp-1" data-testid={`text-name-${product.id}`}>
          {product.name}
        </h3>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold" data-testid={`text-price-${product.id}`}>
            ${product.price}
          </span>
          {product.rating && (
            <div className="flex items-center gap-1" data-testid={`rating-${product.id}`}>
              <span className="text-sm">⭐</span>
              <span className="text-sm font-medium">{product.rating}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
