import { Button } from "@/components/ui/button";
import { MessageSquare, Smartphone, CreditCard, Zap } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: MessageSquare,
      title: "Nigerian Voice Recognition",
      description: "Understands Pidgin, Yoruba, Igbo, Hausa & 200+ dialects",
      delay: "delay-0"
    },
    {
      icon: Smartphone,
      title: "WhatsApp Automation",
      description: "Native workflows, CRM, follow-ups, payment triggers",
      delay: "delay-100"
    },
    {
      icon: CreditCard,
      title: "Flutterwave Integration",
      description: "Accept Naira, automate subscriptions, invoice clients",
      delay: "delay-200"
    },
    {
      icon: Zap,
      title: "Lagos Edge Servers",
      description: "Ultra-low latency for Nigerian users",
      delay: "delay-300"
    }
  ];

  return (
    <section className="section-padding bg-background">
      <div className="container-odia">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6 font-space-grotesk">
            Built for the 
            <span className="nigerian-gradient bg-clip-text text-transparent"> Nigerian Business Reality</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Every feature designed specifically for the unique challenges and opportunities of Nigerian businesses
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {features.map((feature, index) => (
            <div 
              key={index}
              className={`group card-gradient p-8 rounded-2xl border border-border hover:border-primary/50 transition-all duration-500 hover:scale-105 hover:shadow-xl ${feature.delay} animate-slide-up`}
            >
              {/* Icon */}
              <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-8 h-8 text-primary" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-foreground mb-4 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>

              {/* Hover Effect Border */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-primary opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button className="btn-primary text-lg">
            Try It Live Now
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;