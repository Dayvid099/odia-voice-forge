import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare, GraduationCap, Briefcase, Scale, ArrowRight } from "lucide-react";
import agentsImage from "@/assets/ai-agents.jpg";

const AgentsShowcase = () => {
  const [activeAgent, setActiveAgent] = useState(0);

  const agents = [
    {
      name: "Agent Lexi",
      role: "WhatsApp Support & Sales",
      icon: MessageSquare,
      avatar: agentsImage,
      description: "Your 24/7 WhatsApp specialist handling customer inquiries, product recommendations, and payment processing in multiple Nigerian languages.",
      stats: {
        chats_per_day: "2,500+",
        satisfaction: "98%",
        response_time: "< 3 seconds"
      },
      color: "from-primary to-primary-glow"
    },
    {
      name: "Agent MISS",
      role: "University Automation",
      icon: GraduationCap,
      avatar: agentsImage,
      description: "Streamlines student services, handles admissions, course registration, and academic inquiries across Nigerian universities.",
      stats: {
        students_served: "10,000+",
        accuracy: "99.5%",
        languages: "4"
      },
      color: "from-blue-500 to-blue-600"
    },
    {
      name: "Agent Atlas",
      role: "Concierge & Travel",
      icon: Briefcase,
      avatar: agentsImage,
      description: "Premium concierge services for hotels, travel agencies, and luxury businesses across Nigeria.",
      stats: {
        bookings: "1,200+",
        vip_clients: "500+",
        satisfaction: "99%"
      },
      color: "from-purple-500 to-purple-600"
    },
    {
      name: "Agent Miss Legal",
      role: "Contracts & Compliance",
      icon: Scale,
      avatar: agentsImage,
      description: "Legal document processing, compliance checks, and contract management for Nigerian businesses.",
      stats: {
        documents: "5,000+",
        compliance: "100%",
        time_saved: "80%"
      },
      color: "from-gold to-gold-light"
    }
  ];

  return (
    <section className="section-padding bg-muted/30">
      <div className="container-odia">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6 font-space-grotesk">
            Meet Your 
            <span className="nigerian-gradient bg-clip-text text-transparent"> AI Workforce</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Four Specialized Agents, Trained for Nigeria
          </p>
        </div>

        {/* Agents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {agents.map((agent, index) => (
            <Card 
              key={index}
              className={`group cursor-pointer transition-all duration-500 hover:scale-105 border-2 ${
                activeAgent === index 
                  ? 'border-primary shadow-xl glow-primary' 
                  : 'border-transparent hover:border-primary/50'
              }`}
              onClick={() => setActiveAgent(index)}
            >
              <CardContent className="p-6 text-center">
                {/* Agent Icon */}
                <div className={`w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br ${agent.color} flex items-center justify-center`}>
                  {(() => {
                    const IconComponent = agent.icon;
                    return <IconComponent className="w-10 h-10 text-white" />;
                  })()}
                </div>

                {/* Agent Name */}
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {agent.name}
                </h3>
                
                {/* Agent Role */}
                <p className="text-primary font-medium mb-4">
                  {agent.role}
                </p>

                {/* Quick Stats */}
                <div className="space-y-2 text-sm">
                  {Object.entries(agent.stats).map(([key, value], i) => (
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

        {/* Active Agent Details */}
        <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Agent Info */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${agents[activeAgent].color} flex items-center justify-center`}>
                    {(() => {
                      const IconComponent = agents[activeAgent].icon;
                      return <IconComponent className="w-6 h-6 text-white" />;
                    })()}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">
                      {agents[activeAgent].name}
                    </h3>
                    <p className="text-primary font-medium">
                      {agents[activeAgent].role}
                    </p>
                  </div>
                </div>
                
                <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                  {agents[activeAgent].description}
                </p>

                {/* Detailed Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {Object.entries(agents[activeAgent].stats).map(([key, value], i) => (
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

              {/* Agent Avatar/Visual */}
              <div className="relative">
                <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/10 to-transparent p-8 flex items-center justify-center">
                  <div className={`w-32 h-32 rounded-full bg-gradient-to-br ${agents[activeAgent].color} flex items-center justify-center animate-float`}>
                    {(() => {
                      const IconComponent = agents[activeAgent].icon;
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
            Deploy Your Agent Now
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AgentsShowcase;