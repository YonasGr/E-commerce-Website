import CategoryCard from "../CategoryCard";
import sunglasses from "@assets/stock_images/modern_sunglasses_pr_e1ce36cc.jpg";

export default function CategoryCardExample() {
  return (
    <div className="p-8 max-w-md">
      <CategoryCard name="Sunglasses" image={sunglasses} productCount={24} />
    </div>
  );
}
