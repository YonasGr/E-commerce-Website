import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import type { Product as ApiProduct } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";
import { Package, Truck, Shield, Heart } from "lucide-react";

export default function About() {
  const [cartOpen, setCartOpen] = useState(false);

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

  const values = [
    {
      icon: Package,
      title: "Quality Products",
      description: "We carefully curate our selection to offer only the finest accessories."
    },
    {
      icon: Truck,
      title: "Fast Shipping",
      description: "Free shipping on orders over $50 with quick delivery times."
    },
    {
      icon: Shield,
      title: "Secure Shopping",
      description: "Your payment information is always protected and secure."
    },
    {
      icon: Heart,
      title: "Customer First",
      description: "We're committed to providing exceptional customer service."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        cartItemCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onCartClick={() => setCartOpen(true)}
      />

      <main className="flex-1">
        {/* About Header */}
        <section className="py-12 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About Yona</h1>
            <p className="text-lg text-muted-foreground">
              Your destination for premium accessories
            </p>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-12 bg-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-muted-foreground mb-4">
                Founded with a passion for quality and style, Yona has become a trusted destination 
                for premium accessories. We believe that the right accessory can transform not just 
                your outfit, but your entire day.
              </p>
              <p className="text-muted-foreground mb-4">
                Our carefully curated collection features handpicked items from around the world, 
                each selected for its quality, craftsmanship, and timeless appeal. From everyday 
                essentials to statement pieces, we offer accessories that help you express your 
                unique style.
              </p>
              <p className="text-muted-foreground">
                At Yona, we're committed to providing not just exceptional products, but an 
                exceptional shopping experience. Our team works tirelessly to ensure that every 
                interaction with us is pleasant, from browsing our collection to unboxing your order.
              </p>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-12 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-8 text-center">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center text-center">
                      <value.icon className="h-12 w-12 mb-4 text-primary" />
                      <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                      <p className="text-muted-foreground">{value.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Mission Statement */}
        <section className="py-12 bg-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-xl text-muted-foreground">
              To empower individuals to express their unique style through carefully curated, 
              high-quality accessories that enhance their daily lives and boost their confidence.
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
