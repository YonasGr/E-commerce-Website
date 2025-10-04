import { Card } from "@/components/ui/card";
import { useState } from "react";

interface CategoryCardProps {
  name: string;
  image: string;
  productCount?: number;
  onClick?: () => void;
}

export default function CategoryCard({ name, image, productCount, onClick }: CategoryCardProps) {
  const [imageError, setImageError] = useState(false);
  return (
    <Card
      className="group overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 hover-elevate"
      onClick={onClick}
      data-testid={`card-category-${name.toLowerCase().replace(/\s+/g, "-")}`}
    >
      <div className="relative aspect-[16/9] overflow-hidden">
        {imageError ? (
          <div className="w-full h-full flex items-center justify-center bg-muted">
            <div className="text-center text-white">
              <p className="text-sm">Category Image</p>
            </div>
          </div>
        ) : (
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            onError={() => setImageError(true)}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
          <h3 className="text-2xl font-bold mb-2" data-testid={`text-category-name-${name.toLowerCase().replace(/\s+/g, "-")}`}>
            {name}
          </h3>
          {productCount && (
            <p className="text-sm text-white/80" data-testid={`text-product-count-${name.toLowerCase().replace(/\s+/g, "-")}`}>
              {productCount} Products
            </p>
          )}
        </div>
      </div>
    </Card>
  );
}
