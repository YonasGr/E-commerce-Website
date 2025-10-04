import { Button } from "@/components/ui/button";
import heroImage from "@assets/stock_images/modern_fashion_lifes_462e2441.jpg";
import { useLocation } from "wouter";

export default function Hero() {
  const [, setLocation] = useLocation();
  return (
    <section className="relative w-full h-[85vh] min-h-[500px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Yona Collection"
          className="w-full h-full object-cover"
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
      </div>

      {/* Content */}
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
        <div className="max-w-2xl">
          <h1
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
            data-testid="text-hero-title"
          >
            Timeless Style,
            <br />
            Modern Life
          </h1>
          <p
            className="text-xl md:text-2xl text-white/90 mb-8 max-w-xl"
            data-testid="text-hero-subtitle"
          >
            Discover our curated collection of premium accessories designed for the modern individual.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              data-testid="button-shop-now"
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 border border-primary-border text-base px-8"
              onClick={() => setLocation("/shop")}
            >
              Shop Now
            </Button>
            <Button
              data-testid="button-view-collection"
              size="lg"
              variant="outline"
              className="text-base px-8 bg-background/10 backdrop-blur-md border-white/20 text-white hover:bg-background/20"
              onClick={() => setLocation("/collections")}
            >
              View Collection
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
