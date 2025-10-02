import { X, Plus, Minus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items?: CartItem[];
}

export default function CartDrawer({ isOpen, onClose, items = [] }: CartDrawerProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>(items);

  const updateQuantity = (id: string, change: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
    console.log(`Removed item ${id} from cart`);
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-50 transition-opacity"
        onClick={onClose}
        data-testid="overlay-cart"
      />

      {/* Drawer */}
      <div
        className="fixed right-0 top-0 h-full w-full max-w-md bg-background shadow-2xl z-50 flex flex-col"
        data-testid="drawer-cart"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold" data-testid="text-cart-title">
            Shopping Cart
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            data-testid="button-close-cart"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <p className="text-lg text-muted-foreground mb-4" data-testid="text-empty-cart">
                Your cart is empty
              </p>
              <Button onClick={onClose} data-testid="button-continue-shopping">
                Continue Shopping
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-4 rounded-lg border hover-elevate"
                  data-testid={`cart-item-${item.id}`}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-md"
                    data-testid={`img-cart-item-${item.id}`}
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1" data-testid={`text-cart-item-name-${item.id}`}>
                      {item.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2" data-testid={`text-cart-item-price-${item.id}`}>
                      ${item.price}
                    </p>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => updateQuantity(item.id, -1)}
                        data-testid={`button-decrease-${item.id}`}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <Badge variant="secondary" data-testid={`badge-quantity-${item.id}`}>
                        {item.quantity}
                      </Badge>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => updateQuantity(item.id, 1)}
                        data-testid={`button-increase-${item.id}`}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeItem(item.id)}
                    data-testid={`button-remove-${item.id}`}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="border-t p-6 space-y-4">
            <div className="flex justify-between text-lg font-semibold">
              <span data-testid="text-subtotal-label">Subtotal</span>
              <span data-testid="text-subtotal-amount">${subtotal.toFixed(2)}</span>
            </div>
            <Button
              className="w-full"
              size="lg"
              onClick={() => console.log("Proceeding to checkout")}
              data-testid="button-checkout"
            >
              Checkout
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
