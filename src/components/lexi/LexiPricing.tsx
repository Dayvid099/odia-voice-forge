import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

const LexiPricing = () => {
  const plans = [
    {
      name: "Starter",
      price: "₦25,000",
      billing: "per month",
      description: "Perfect for small businesses",
      features: [
        "500 conversations/month",
        "Basic voice responses",
        "WhatsApp integration",
        "Email support",
        "Nigerian English + Pidgin"
      ],
      cta: "Start Free Trial",
      popular: false
    },
    {
      name: "Business",
      price: "₦75,000",
      billing: "per month",
      description: "Most popular for growing businesses",
      features: [
        "2,500 conversations/month",
        "Advanced voice cloning",
        "All Nigerian languages",
        "Flutterwave integration",
        "Priority support",
        "Custom training"
      ],
      cta: "Deploy Now",
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      billing: "per month",
      description: "For large organizations",
      features: [
        "Unlimited conversations",
        "Custom voice models",
        "Dedicated infrastructure",
        "24/7 phone support",
        "On-premise deployment",
        "SLA guarantee"
      ],
      cta: "Contact Sales",
      popular: false
    }
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Agent Lexi Pricing</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Transparent pricing designed for Nigerian businesses
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`p-8 relative ${
                plan.popular 
                  ? 'ring-2 ring-emerald-500 shadow-xl scale-105' 
                  : 'hover:shadow-lg transition-shadow'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-emerald-600 text-white px-4 py-1">
                    Most Popular
                  </Badge>
                </div>
              )}

              <div className="space-y-6">
                {/* Header */}
                <div className="text-center space-y-2">
                  <h3 className="text-2xl font-bold">{plan.name}</h3>
                  <p className="text-muted-foreground">{plan.description}</p>
                </div>

                {/* Pricing */}
                <div className="text-center">
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    {plan.price !== "Custom" && (
                      <span className="text-muted-foreground">/{plan.billing.split(' ')[1]}</span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{plan.billing}</p>
                </div>

                {/* Features */}
                <div className="space-y-4">
                  <h4 className="font-semibold">What's included:</h4>
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <Button 
                  className={`w-full py-6 text-lg font-semibold ${
                    plan.popular 
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                  }`}
                >
                  {plan.cta}
                </Button>

                {/* Additional Info */}
                {plan.name === "Starter" && (
                  <div className="text-center text-sm text-muted-foreground">
                    14-day free trial • No credit card required
                  </div>
                )}

                {plan.name === "Business" && (
                  <div className="text-center text-sm text-muted-foreground">
                    7-day free trial • Setup in 24 hours
                  </div>
                )}

                {plan.name === "Enterprise" && (
                  <div className="text-center text-sm text-muted-foreground">
                    Custom onboarding • Dedicated success manager
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <div className="text-center mt-16 space-y-4">
          <p className="text-muted-foreground">
            All plans include Nigerian language support, NDPR compliance, and Lagos-based infrastructure
          </p>
          <div className="flex justify-center gap-6 text-sm text-muted-foreground">
            <span>✓ No setup fees</span>
            <span>✓ Cancel anytime</span>
            <span>✓ Nigerian payment methods</span>
            <span>✓ Local support team</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LexiPricing;