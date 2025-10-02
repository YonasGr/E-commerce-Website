import { Truck, RotateCcw, Shield } from "lucide-react";

export default function BenefitsSection() {
  const benefits = [
    {
      icon: Truck,
      title: "Free Shipping",
      description: "On orders over $100",
    },
    {
      icon: RotateCcw,
      title: "Easy Returns",
      description: "30-day return policy",
    },
    {
      icon: Shield,
      title: "Quality Guarantee",
      description: "Premium craftsmanship",
    },
  ];

  return (
    <section className="py-16 bg-muted/30" data-testid="section-benefits">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6"
              data-testid={`benefit-${index}`}
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <benefit.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2" data-testid={`text-benefit-title-${index}`}>
                {benefit.title}
              </h3>
              <p className="text-muted-foreground" data-testid={`text-benefit-description-${index}`}>
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
