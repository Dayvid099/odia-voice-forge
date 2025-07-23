import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare, Languages, ShoppingCart, Headphones, Clock, Globe, ArrowRight } from "lucide-react";

const LexiCapabilities = () => {
  const [activeCapability, setActiveCapability] = useState(0);

  const capabilities = [
    {
      name: "WhatsApp Automation",
      icon: MessageSquare,
      description: "24/7 WhatsApp customer support handling orders, inquiries, and payments across Nigeria.",
      features: ["Order Processing", "Payment Integration", "Customer Support", "Lead Generation"],
      stats: {
        response_time: "< 3 seconds",
        availability: "24/7",
        languages: "4+"
      },
      color: "from-primary to-primary-glow"
    },
    {
      name: "Voice Communication",
      icon: Headphones,
      description: "Natural voice conversations in English and Nigerian languages with advanced speech recognition.",
      features: ["Voice Recognition", "Natural Speech", "Accent Adaptation", "Call Handling"],
      stats: {
        accuracy: "98%",
        voice_quality: "HD",
        latency: "< 500ms"
      },
      color: "from-blue-500 to-blue-600"
    },
    {
      name: "Multi-Language Support",
      icon: Languages,
      description: "Fluent communication in English, Nigerian Pidgin, Yoruba, and Hausa for broader reach.",
      features: ["English", "Nigerian Pidgin", "Yoruba", "Hausa"],
      stats: {
        languages: "4",
        accuracy: "99%",
        cultural_context: "Native"
      },
      color: "from-green-500 to-green-600"
    },
    {
      name: "E-commerce Integration",
      icon: ShoppingCart,
      description: "Complete e-commerce automation from product browsing to payment processing and delivery tracking.",
      features: ["Product Catalog", "Order Management", "Payment Processing", "Delivery Tracking"],
      stats: {
        conversion_rate: "+45%",
        cart_abandonment: "-60%",
        customer_satisfaction: "98%"
      },
      color: "from-purple-500 to-purple-600"
    }
  ];

  return (
    <section className="section-padding bg-muted/30">
      <div className="container-odia">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6 font-space-grotesk">
            Agent Lexi's
            <span className="nigerian-gradient bg-clip-text text-transparent"> Capabilities</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Your Complete WhatsApp AI Assistant for Nigerian Business
          </p>
        </div>

        {/* Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {capabilities.map((capability, index) => (
            <Card 
              key={index}
              className={`group cursor-pointer transition-all duration-500 hover:scale-105 border-2 ${
                activeCapability === index 
                  ? 'border-primary shadow-xl glow-primary' 
                  : 'border-transparent hover:border-primary/50'
              }`}
              onClick={() => setActiveCapability(index)}
            >
              <CardContent className="p-6 text-center">
                {/* Capability Icon */}
                <div className={`w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br ${capability.color} flex items-center justify-center`}>
                  {(() => {
                    const IconComponent = capability.icon;
                    return <IconComponent className="w-10 h-10 text-white" />;
                  })()}
                </div>

                {/* Capability Name */}
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {capability.name}
                </h3>

                {/* Quick Stats */}
                <div className="space-y-2 text-sm">
                  {Object.entries(capability.stats).map(([key, value], i) => (
                    <div key={i} className="flex justify-between">
                      <span className="text-muted-foreground capitalize">
                        {key.replace(/(_)/g, ' ')}:
                      </span>
                      <span className="font-semibold text-primary">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Active Capability Details */}
        <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Capability Info */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${capabilities[activeCapability].color} flex items-center justify-center`}>
                    {(() => {
                      const IconComponent = capabilities[activeCapability].icon;
                      return <IconComponent className="w-6 h-6 text-white" />;
                    })()}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">
                      {capabilities[activeCapability].name}
                    </h3>
                    <p className="text-primary font-medium">
                      Agent Lexi Specialized Feature
                    </p>
                  </div>
                </div>
                
                <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                  {capabilities[activeCapability].description}
                </p>

                {/* Features List */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {capabilities[activeCapability].features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Detailed Stats */}
                <div className="grid grid-cols-3 gap-4">
                  {Object.entries(capabilities[activeCapability].stats).map(([key, value], i) => (
                    <div key={i} className="text-center">
                      <div className="text-2xl font-bold text-primary mb-1">
                        {value}
                      </div>
                      <div className="text-sm text-muted-foreground capitalize">
                        {key.replace('_', ' ')}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Capability Visual */}
              <div className="relative">
                <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/10 to-transparent p-8 flex items-center justify-center">
                  <div className={`w-32 h-32 rounded-full bg-gradient-to-br ${capabilities[activeCapability].color} flex items-center justify-center animate-float`}>
                    {(() => {
                      const IconComponent = capabilities[activeCapability].icon;
                      return <IconComponent className="w-16 h-16 text-white" />;
                    })()}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button className="btn-gradient text-lg group">
            Try Agent Lexi Now
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default LexiCapabilities;