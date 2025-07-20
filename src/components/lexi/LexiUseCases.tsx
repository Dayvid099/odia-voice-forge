import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Clock, Users, DollarSign } from "lucide-react";

const LexiUseCases = () => {
  const scenarios = [
    {
      id: "ecommerce",
      tab: "E-commerce Store",
      businessType: "Online Retailer",
      challenge: "Managing 500+ daily customer inquiries about products, delivery, and payments",
      solution: "Lexi handles product recommendations, order tracking, and payment processing in Nigerian languages",
      results: {
        responseTime: { label: "Response Time", before: "2 hours", after: "3 seconds", improvement: "99% faster" },
        satisfaction: { label: "Customer Satisfaction", before: "72%", after: "98%", improvement: "+26%" },
        conversion: { label: "Sales Conversion", before: "12%", after: "17.4%", improvement: "+45%" },
        savings: { label: "Cost Savings", before: "₦5M/month", after: "₦2.5M/month", improvement: "₦2.5M saved" }
      },
      conversation: [
        {
          type: "customer",
          message: "Good morning, I want to buy phone case for iPhone 13",
          time: "09:15"
        },
        {
          type: "lexi",
          message: "Good morning! I have several iPhone 13 cases available. What's your budget and preferred style - clear, leather, or rugged protection?",
          time: "09:15",
          language: "🇳🇬 Nigerian English"
        },
        {
          type: "customer",
          message: "Around ₦5,000. I need something wey go protect the phone well",
          time: "09:16"
        },
        {
          type: "lexi",
          message: "Perfect! I recommend our OtterBox Defender case for ₦4,800. E get military-grade protection and lifetime warranty. Make I send you pictures and customer reviews?",
          time: "09:16",
          language: "🇳🇬 Nigerian Pidgin"
        }
      ]
    },
    {
      id: "banking",
      tab: "Bank Customer Service",
      businessType: "Commercial Bank",
      challenge: "High volume of account inquiries and transaction support across multiple languages",
      solution: "Lexi provides instant account information, transaction history, and banking support",
      results: {
        callReduction: { label: "Call Volume Reduction", before: "1,200 calls/day", after: "264 calls/day", improvement: "78% decrease" },
        satisfaction: { label: "Customer Satisfaction", before: "84%", after: "96%", improvement: "+12%" },
        resolution: { label: "Resolution Time", before: "45 minutes", after: "2 minutes", improvement: "95% faster" },
        languages: { label: "Languages Supported", before: "English only", after: "5 languages", improvement: "500% more" }
      }
    },
    {
      id: "education",
      tab: "Educational Institution",
      businessType: "Private University",
      challenge: "Managing student inquiries about admissions, fees, and course information",
      solution: "Lexi handles admissions queries, fee payments, and academic support in local languages",
      results: {
        satisfaction: { label: "Student Satisfaction", before: "87%", after: "99.5%", improvement: "+12.5%" },
        resolution: { label: "Inquiry Resolution", before: "24 hours", after: "Instant", improvement: "Immediate" },
        efficiency: { label: "Staff Efficiency", before: "60% admin tasks", after: "20% admin tasks", improvement: "40% freed up" },
        enrollment: { label: "Enrollment Increase", before: "500 applications", after: "615 applications", improvement: "+23%" }
      }
    }
  ];

  return (
    <section className="py-24 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">How Nigerian Businesses Use Agent Lexi</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real results from businesses across Nigeria
          </p>
        </div>

        <Tabs defaultValue="ecommerce" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-12">
            {scenarios.map((scenario) => (
              <TabsTrigger key={scenario.id} value={scenario.id} className="text-center">
                {scenario.tab}
              </TabsTrigger>
            ))}
          </TabsList>

          {scenarios.map((scenario) => (
            <TabsContent key={scenario.id} value={scenario.id} className="space-y-8">
              <div className="grid lg:grid-cols-2 gap-12">
                {/* Business Case */}
                <div className="space-y-8">
                  <Card className="p-8">
                    <div className="space-y-6">
                      <div>
                        <Badge variant="outline" className="mb-3">{scenario.businessType}</Badge>
                        <h3 className="text-2xl font-semibold mb-4">The Challenge</h3>
                        <p className="text-muted-foreground leading-relaxed">{scenario.challenge}</p>
                      </div>
                      
                      <div>
                        <h4 className="text-xl font-semibold mb-3">Lexi's Solution</h4>
                        <p className="text-muted-foreground leading-relaxed">{scenario.solution}</p>
                      </div>
                    </div>
                  </Card>

                  {/* Results Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(scenario.results).map(([key, result]) => (
                      <Card key={key} className="p-4 text-center">
                        <div className="space-y-2">
                          <div className="text-sm font-medium text-muted-foreground">{result.label}</div>
                          <div className="space-y-1">
                            <div className="text-xs text-gray-500">Before: {result.before}</div>
                            <div className="text-xs text-gray-500">After: {result.after}</div>
                          </div>
                          <div className="text-lg font-bold text-emerald-600 flex items-center justify-center gap-1">
                            <TrendingUp className="h-4 w-4" />
                            {result.improvement}
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Conversation Demo */}
                {scenario.conversation && (
                  <div className="space-y-6">
                    <Card className="p-6">
                      <h4 className="text-xl font-semibold mb-6">Live Conversation Example</h4>
                      <div className="space-y-4">
                        {scenario.conversation.map((msg, index) => (
                          <div 
                            key={index}
                            className={`flex ${msg.type === 'customer' ? 'justify-end' : 'justify-start'}`}
                          >
                            <div className={`max-w-xs rounded-lg p-3 ${
                              msg.type === 'customer' 
                                ? 'bg-emerald-100 text-emerald-900' 
                                : 'bg-gray-100 text-gray-900'
                            }`}>
                              <p className="text-sm">{msg.message}</p>
                              <div className="flex items-center justify-between mt-2">
                                <span className="text-xs text-gray-500">{msg.time}</span>
                                {msg.language && (
                                  <span className="text-xs text-gray-500">{msg.language}</span>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </Card>

                    {/* Key Benefits */}
                    <Card className="p-6">
                      <h4 className="font-semibold mb-4">Key Benefits for {scenario.businessType}</h4>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <Clock className="h-4 w-4 text-emerald-600" />
                          <span className="text-sm">Instant 24/7 customer support</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Users className="h-4 w-4 text-emerald-600" />
                          <span className="text-sm">Multilingual customer service</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <DollarSign className="h-4 w-4 text-emerald-600" />
                          <span className="text-sm">Reduced operational costs</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <TrendingUp className="h-4 w-4 text-emerald-600" />
                          <span className="text-sm">Improved customer satisfaction</span>
                        </div>
                      </div>
                    </Card>
                  </div>
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default LexiUseCases;