import { useState } from "react";
import CartDrawer from "../CartDrawer";
import { Button } from "@/components/ui/button";
import watch1 from "@assets/stock_images/premium_watch_closeu_4714ba80.jpg";
import sunglasses1 from "@assets/stock_images/modern_sunglasses_pr_e1ce36cc.jpg";

export default function CartDrawerExample() {
  const [isOpen, setIsOpen] = useState(true);

  const mockItems = [
    {
      id: "1",
      name: "Classic Chronograph Watch",
      price: 299,
      quantity: 1,
      image: watch1,
    },
    {
      id: "2",
      name: "Aviator Sunglasses",
      price: 149,
      quantity: 2,
      image: sunglasses1,
    },
  ];

  return (
    <div className="h-screen">
      <Button onClick={() => setIsOpen(true)}>Open Cart</Button>
      <CartDrawer isOpen={isOpen} onClose={() => setIsOpen(false)} items={mockItems} />
    </div>
  );
}
