import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Header";
import ProductCard, { type Product } from "@/components/ProductCard";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import { apiRequest } from "@/lib/queryClient";
import type { Product as ApiProduct } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSearch } from "wouter";

export default function Shop() {
  const search = useSearch();
  const urlParams = new URLSearchParams(search);
  const categoryFromUrl = urlParams.get("category");
  
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryFromUrl || "all");
  const [sortBy, setSortBy] = useState<string>("featured");
  const { toast } = useToast();

  // Update selected category when URL changes
  useEffect(() => {
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl);
    }
  }, [categoryFromUrl]);

  const { data: products = [], isLoading: productsLoading } = useQuery<ApiProduct[]>({
    queryKey: ["/api/products", selectedCategory !== "all" ? { category: selectedCategory } : {}],
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

  // Sort products
  const sortedProducts = [...convertedProducts].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "name") return a.name.localeCompare(b.name);
    return 0; // featured/default
  });

  // Get unique categories
  const categories = ["all", ...Array.from(new Set(products.map(p => p.category)))];

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        cartItemCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onCartClick={() => setCartOpen(true)}
      />

      <main className="flex-1">
        {/* Shop Header */}
        <section className="py-12 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Shop All Products</h1>
            <p className="text-lg text-muted-foreground">
              Discover our complete collection of premium accessories
            </p>
          </div>
        </section>

        {/* Filters and Products */}
        <section className="py-12 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="flex-1">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full sm:w-[200px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat === "all" ? "All Categories" : cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-[200px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="name">Name: A to Z</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Products Grid */}
            {productsLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="h-96 bg-muted animate-pulse rounded-lg" />
                ))}
              </div>
            ) : sortedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {sortedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">No products found</p>
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
