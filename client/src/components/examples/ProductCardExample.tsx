import ProductCard from "../ProductCard";
import watch1 from "@assets/stock_images/premium_watch_closeu_4714ba80.jpg";

export default function ProductCardExample() {
  const product = {
    id: "1",
    name: "Classic Chronograph Watch",
    price: 299,
    image: watch1,
    category: "Watches",
    rating: 4.8,
    isNew: true,
  };

  return (
    <div className="p-8 max-w-sm">
      <ProductCard product={product} />
    </div>
  );
}
