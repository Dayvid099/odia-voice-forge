import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Quote, ChevronLeft, ChevronRight, Users, MessageSquare, Clock, TrendingUp } from "lucide-react";

const TestimonialsSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      company: "Fashion Forward Lagos",
      testimonial: "Agent Lexi transformed our customer service. Handles 80% of our WhatsApp inquiries perfectly in both English and Pidgin. Our response time went from hours to seconds.",
      author: "Adunni Okafor",
      title: "CEO",
      industry: "Fashion & Retail"
    },
    {
      company: "Tasty Bites Restaurant",
      testimonial: "Agent Lexi's order automation through WhatsApp increased our sales by 150%. The AI understands Nigerian food names and local preferences perfectly. Best investment we've made.",
      author: "Emeka Nwosu",
      title: "Owner",
      industry: "Food & Hospitality"
    },
    {
      company: "Flutterwave",
      testimonial: "Agent Lexi's voice recognition in Nigerian Pidgin is incredible. Handles payment inquiries flawlessly across all major Nigerian languages with impressive accuracy.",
      author: "Chimamanda Okafor",
      title: "Product Manager",
      industry: "Fintech"
    }
  ];

  const stats = [
    {
      number: "500+",
      label: "Businesses Served",
      icon: Users,
      color: "text-primary"
    },
    {
      number: "100,000+",
      label: "Conversations",
      icon: MessageSquare,
      color: "text-gold"
    },
    {
      number: "24hr",
      label: "Setup Time",
      icon: Clock,
      color: "text-primary"
    },
    {
      number: "99.9%",
      label: "Uptime",
      icon: TrendingUp,
      color: "text-gold"
    }
  ];

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="section-padding bg-background">
      <div className="container-odia">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6 font-space-grotesk">
            Trusted by 
            <span className="nigerian-gradient bg-clip-text text-transparent"> Nigerian Business Leaders</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            See how businesses across Nigeria are transforming their operations with Agent Lexi
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/10 to-transparent flex items-center justify-center group-hover:from-primary/20 transition-colors">
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
              <div className={`text-3xl md:text-4xl font-bold ${stat.color} mb-2`}>
                {stat.number}
              </div>
              <div className="text-muted-foreground font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <Card className="border-primary/10 bg-gradient-to-br from-primary/5 to-transparent">
            <CardContent className="p-8 md:p-12">
              {/* Quote Icon */}
              <Quote className="w-12 h-12 text-primary/30 mb-6" />
              
              {/* Testimonial Content */}
              <blockquote className="text-lg md:text-xl text-foreground mb-8 leading-relaxed font-medium">
                "{testimonials[currentTestimonial].testimonial}"
              </blockquote>

              {/* Author Info */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-foreground text-lg">
                    {testimonials[currentTestimonial].author}
                  </div>
                  <div className="text-primary font-medium">
                    {testimonials[currentTestimonial].title}
                  </div>
                  <div className="text-muted-foreground">
                    {testimonials[currentTestimonial].company} • {testimonials[currentTestimonial].industry}
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={prevTestimonial}
                    className="w-10 h-10 rounded-full border border-primary/30 flex items-center justify-center hover:border-primary hover:bg-primary/10 transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5 text-primary" />
                  </button>
                  <button
                    onClick={nextTestimonial}
                    className="w-10 h-10 rounded-full border border-primary/30 flex items-center justify-center hover:border-primary hover:bg-primary/10 transition-colors"
                  >
                    <ChevronRight className="w-5 h-5 text-primary" />
                  </button>
                </div>
              </div>

              {/* Testimonial Indicators */}
              <div className="flex justify-center gap-2 mt-8">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentTestimonial 
                        ? 'bg-primary' 
                        : 'bg-primary/30 hover:bg-primary/50'
                    }`}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Nigerian Pride */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 border border-primary/30 rounded-full text-primary font-medium">
            <span className="text-2xl">🇳🇬</span>
            Proudly Nigerian-Owned & Operated
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;