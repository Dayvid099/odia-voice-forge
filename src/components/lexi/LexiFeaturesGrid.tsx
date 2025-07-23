
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mic, MessageSquare, CreditCard, Clock, Brain, Shield, Play } from "lucide-react";

const LexiFeaturesGrid = () => {
  const features = [
    {
      icon: Mic,
      title: "Natural Nigerian Voices",
      description: "Authentic Lagos, Abuja, and Port Harcourt accents. Understands Pidgin, Yoruba, Igbo, and Hausa naturally.",
      languages: ["English (Nigerian)", "Nigerian Pidgin", "Yoruba", "Igbo", "Hausa"],
      hasAudio: true
    },
    {
      icon: MessageSquare,
      title: "Native WhatsApp Integration",
      description: "Seamlessly handles media, voice notes, status updates, and group conversations without disruption.",
      features: ["Voice note responses", "Image recognition", "Document processing", "Group management"]
    },
    {
      icon: CreditCard,
      title: "Flutterwave Payment Processing",
      description: "Accept payments in Naira, automate invoicing, and handle subscription renewals directly in chat.",
      paymentMethods: ["Bank Transfer", "Card Payment", "USSD", "Mobile Money"]
    },
    {
      icon: Clock,
      title: "24/7 Nigerian Time Zone",
      description: "Always available during Lagos business hours. Understands Nigerian holidays and working patterns.",
      timezone: "WAT (UTC+1) optimized"
    },
    {
      icon: Brain,
      title: "Business Context Awareness",
      description: "Trained on Nigerian business scenarios: banking, telecom, retail, education, and government services.",
      industries: ["Banking", "Telecom", "Retail", "Education", "Government"]
    },
    {
      icon: Shield,
      title: "NDPR Compliant Security",
      description: "Full compliance with Nigerian Data Protection Regulation. Your customer data stays secure and local.",
      certifications: ["NDPR Compliant", "ISO 27001", "SOC 2 Type II"]
    }
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Nigerian-Built Voice Intelligence</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Every feature designed for Nigerian businesses and customers
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card key={index} className="p-8 hover:shadow-lg transition-all duration-300 group">
                <div className="space-y-6">
                  {/* Icon and Title */}
                  <div className="space-y-4">
                    <div className="w-12 h-12 bg-teal-light rounded-lg flex items-center justify-center group-hover:bg-teal-light/80 transition-colors">
                      <IconComponent className="h-6 w-6 text-teal-dark" />
                    </div>
                    <h3 className="text-xl font-semibold">{feature.title}</h3>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Feature-specific content */}
                  <div className="space-y-4">
                    {feature.languages && (
                      <div>
                        <h4 className="font-medium text-sm text-gray-700 mb-2">Supported Languages:</h4>
                        <div className="space-y-1">
                          {feature.languages.map((lang, i) => (
                            <div key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-teal rounded-full"></div>
                              {lang}
                            </div>
                          ))}
                        </div>
                        {feature.hasAudio && (
                          <Button variant="outline" size="sm" className="mt-3">
                            <Play className="h-3 w-3 mr-2" />
                            Demo Audio
                          </Button>
                        )}
                      </div>
                    )}

                    {feature.features && (
                      <div>
                        <h4 className="font-medium text-sm text-gray-700 mb-2">Key Features:</h4>
                        <div className="space-y-1">
                          {feature.features.map((feat, i) => (
                            <div key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-teal rounded-full"></div>
                              {feat}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {feature.paymentMethods && (
                      <div>
                        <h4 className="font-medium text-sm text-gray-700 mb-2">Payment Methods:</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {feature.paymentMethods.map((method, i) => (
                            <div key={i} className="text-xs bg-teal-light text-teal-dark px-2 py-1 rounded">
                              {method}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {feature.timezone && (
                      <div className="bg-blue-50 text-blue-700 px-3 py-2 rounded-lg text-sm font-medium">
                        {feature.timezone}
                      </div>
                    )}

                    {feature.industries && (
                      <div>
                        <h4 className="font-medium text-sm text-gray-700 mb-2">Industries:</h4>
                        <div className="flex flex-wrap gap-2">
                          {feature.industries.map((industry, i) => (
                            <span key={i} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                              {industry}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {feature.certifications && (
                      <div>
                        <h4 className="font-medium text-sm text-gray-700 mb-2">Security & Compliance:</h4>
                        <div className="space-y-1">
                          {feature.certifications.map((cert, i) => (
                            <div key={i} className="text-sm text-green-700 flex items-center gap-2">
                              <Shield className="h-3 w-3" />
                              {cert}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default LexiFeaturesGrid;
