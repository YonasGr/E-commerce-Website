import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Header";
import CategoryCard from "@/components/CategoryCard";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import type { Product as ApiProduct, Category } from "@shared/schema";
import { useLocation } from "wouter";

export default function Collections() {
  const [cartOpen, setCartOpen] = useState(false);
  const [, setLocation] = useLocation();

  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  const { data: cartItems = [], refetch: refetchCart } = useQuery<Array<{
    id: string;
    productId: string;
    quantity: number;
    product: ApiProduct;
  }>>({
    queryKey: ["/api/cart"],
  });

  const convertedCartItems = cartItems.map(item => ({
    id: item.id,
    name: item.product.name,
    price: parseFloat(item.product.price),
    quantity: item.quantity,
    image: item.product.image,
  }));

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        cartItemCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onCartClick={() => setCartOpen(true)}
      />

      <main className="flex-1">
        {/* Collections Header */}
        <section className="py-12 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Collections</h1>
            <p className="text-lg text-muted-foreground">
              Browse our curated collections of premium accessories
            </p>
          </div>
        </section>

        {/* Collections Grid */}
        <section className="py-12 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {categories.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((category) => (
                  <CategoryCard
                    key={category.id}
                    name={category.name}
                    image={category.image}
                    productCount={category.productCount ?? undefined}
                    onClick={() => setLocation(`/shop?category=${encodeURIComponent(category.name)}`)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">No collections available</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />

      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={convertedCartItems}
        onRefetch={refetchCart}
      />
    </div>
  );
}
