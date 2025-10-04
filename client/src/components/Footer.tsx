import { Facebook, Instagram, Twitter, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Link } from "wouter";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement newsletter signup API
    setEmail("");
  };

  return (
    <footer className="bg-card border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="font-bold text-lg mb-4" data-testid="text-footer-about-title">
              Yona
            </h3>
            <p className="text-sm text-muted-foreground mb-4" data-testid="text-footer-about-description">
              Premium accessories for the modern lifestyle. Quality craftsmanship meets timeless design.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-semibold mb-4" data-testid="text-footer-shop-title">
              Shop
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/shop?category=Watches" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-watches">
                  Watches
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Sunglasses" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-sunglasses">
                  Sunglasses
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Accessories" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-accessories">
                  Accessories
                </Link>
              </li>
              <li>
                <Link href="/shop" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-new-arrivals">
                  New Arrivals
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4" data-testid="text-footer-support-title">
              Support
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-contact">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-shipping">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-returns">
                  Returns
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-faq">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold mb-4" data-testid="text-footer-newsletter-title">
              Newsletter
            </h4>
            <p className="text-sm text-muted-foreground mb-4" data-testid="text-footer-newsletter-description">
              Subscribe for exclusive offers and updates
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
              <Input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                data-testid="input-newsletter-email"
              />
              <Button type="submit" data-testid="button-newsletter-submit">
                <Mail className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground" data-testid="text-footer-copyright">
            © {new Date().getFullYear()} Yona. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => console.log("Instagram clicked")}
              data-testid="button-social-instagram"
            >
              <Instagram className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => console.log("Facebook clicked")}
              data-testid="button-social-facebook"
            >
              <Facebook className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => console.log("Twitter clicked")}
              data-testid="button-social-twitter"
            >
              <Twitter className="h-5 w-5" />
            </Button>
          </div>

          {/* Payment Icons */}
          <div className="flex gap-2 text-sm text-muted-foreground" data-testid="text-footer-payment">
            <span>💳 Visa</span>
            <span>💳 Mastercard</span>
            <span>💳 PayPal</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
