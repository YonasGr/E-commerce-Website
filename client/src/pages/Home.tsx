import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProductCard, { type Product } from "@/components/ProductCard";
import CategoryCard from "@/components/CategoryCard";
import BenefitsSection from "@/components/BenefitsSection";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import { apiRequest } from "@/lib/queryClient";
import type { Product as ApiProduct, Category } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const [cartOpen, setCartOpen] = useState(false);
  const { toast } = useToast();

  const { data: products = [], isLoading: productsLoading } = useQuery<ApiProduct[]>({
    queryKey: ["/api/products"],
  });

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

  const handleAddToCart = async (product: Product) => {
    try {
      await apiRequest("POST", "/api/cart", {
        productId: product.id,
        quantity: 1,
      });
      
      await refetchCart();
      setCartOpen(true);
      
      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add item to cart. Please try again.",
        variant: "destructive",
      });
    }
  };

  const convertedProducts: Product[] = products.map(p => ({
    id: p.id,
    name: p.name,
    price: parseFloat(p.price),
    image: p.image,
    category: p.category,
    rating: p.rating ? parseFloat(p.rating) : undefined,
    isNew: p.isNew ?? false,
  }));

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
        <Hero />

        {/* Featured Products Section */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-featured-title">
                Featured Products
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-featured-subtitle">
                Discover our handpicked selection of premium accessories
              </p>
            </div>

            {productsLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="h-96 bg-muted animate-pulse rounded-lg" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {convertedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-20 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-categories-title">
                Shop by Category
              </h2>
              <p className="text-lg text-muted-foreground" data-testid="text-categories-subtitle">
                Explore our curated collections
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {categories.map((category) => (
                <CategoryCard
                  key={category.id}
                  name={category.name}
                  image={category.image}
                  productCount={category.productCount ?? undefined}
                />
              ))}
            </div>
          </div>
        </section>

        <BenefitsSection />

        {/* Newsletter CTA Section */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-newsletter-cta-title">
              Stay in Style
            </h2>
            <p className="text-lg mb-8 opacity-90" data-testid="text-newsletter-cta-subtitle">
              Subscribe to receive exclusive offers, new arrivals, and style inspiration
            </p>
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
