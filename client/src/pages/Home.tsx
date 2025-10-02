import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProductCard, { type Product } from "@/components/ProductCard";
import CategoryCard from "@/components/CategoryCard";
import BenefitsSection from "@/components/BenefitsSection";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";

// Import images
import watch1 from "@assets/stock_images/premium_watch_closeu_4714ba80.jpg";
import watch2 from "@assets/stock_images/premium_watch_closeu_04060ace.jpg";
import watch3 from "@assets/stock_images/premium_watch_closeu_fc0cb07d.jpg";
import watch4 from "@assets/stock_images/premium_watch_closeu_ef285bc2.jpg";
import accessory1 from "@assets/stock_images/minimalist_accessori_6ac54b01.jpg";
import accessory2 from "@assets/stock_images/minimalist_accessori_bb498747.jpg";
import accessory3 from "@assets/stock_images/minimalist_accessori_52360f41.jpg";
import accessory4 from "@assets/stock_images/minimalist_accessori_75db2cec.jpg";
import sunglasses1 from "@assets/stock_images/modern_sunglasses_pr_e1ce36cc.jpg";
import sunglasses2 from "@assets/stock_images/modern_sunglasses_pr_7da6e494.jpg";
import sunglasses3 from "@assets/stock_images/modern_sunglasses_pr_44b7d134.jpg";

//todo: remove mock functionality
const mockProducts: Product[] = [
  {
    id: "1",
    name: "Classic Chronograph Watch",
    price: 299,
    image: watch1,
    category: "Watches",
    rating: 4.8,
    isNew: true,
  },
  {
    id: "2",
    name: "Minimalist Leather Watch",
    price: 249,
    image: watch2,
    category: "Watches",
    rating: 4.9,
  },
  {
    id: "3",
    name: "Sport Chronograph",
    price: 349,
    image: watch3,
    category: "Watches",
    rating: 4.7,
    isNew: true,
  },
  {
    id: "4",
    name: "Elegant Dress Watch",
    price: 399,
    image: watch4,
    category: "Watches",
    rating: 4.9,
  },
  {
    id: "5",
    name: "Aviator Sunglasses",
    price: 149,
    image: sunglasses1,
    category: "Sunglasses",
    rating: 4.6,
  },
  {
    id: "6",
    name: "Classic Wayfarers",
    price: 129,
    image: sunglasses2,
    category: "Sunglasses",
    rating: 4.7,
  },
  {
    id: "7",
    name: "Modern Round Frames",
    price: 159,
    image: sunglasses3,
    category: "Sunglasses",
    rating: 4.5,
    isNew: true,
  },
  {
    id: "8",
    name: "Leather Wallet",
    price: 89,
    image: accessory1,
    category: "Accessories",
    rating: 4.8,
  },
];

export default function Home() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }>>([]);

  const handleAddToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setCartOpen(true);
  };

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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {mockProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
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
              <CategoryCard name="Watches" image={watch1} productCount={42} />
              <CategoryCard name="Sunglasses" image={sunglasses1} productCount={28} />
              <CategoryCard name="Accessories" image={accessory2} productCount={36} />
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
        items={cartItems}
      />
    </div>
  );
}
