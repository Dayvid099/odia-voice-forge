
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Star } from "lucide-react";

const LexiTestimonials = () => {
  const testimonials = [
    {
      name: "Adebayo Ogundimu",
      position: "CEO",
      company: "PayStack Nigeria",
      location: "Lagos",
      quote: "Agent Lexi handles our customer support in perfect Nigerian English and Pidgin. Our response time went from hours to seconds. This is the future of customer service in Nigeria.",
      rating: 5,
      videoThumbnail: "testimonial_paystack.jpg",
      avatar: "AO"
    },
    {
      name: "Dr. Funmi Adebayo",
      position: "Dean of Students",
      company: "University of Lagos",
      location: "Lagos",
      quote: "Students can now get instant help in their preferred language. Lexi understands our unique educational context and provides accurate information 24/7.",
      rating: 5,
      videoThumbnail: "testimonial_unilag.jpg",
      avatar: "FA"
    },
    {
      name: "Emeka Nwosu",
      position: "Operations Manager",
      company: "Konga E-commerce",
      location: "Lagos",
      quote: "Our customer satisfaction jumped to 98% after deploying Agent Lexi. The multilingual support has been a game-changer for our diverse customer base.",
      rating: 5,
      videoThumbnail: "testimonial_konga.jpg",
      avatar: "EN"
    }
  ];

  return (
    <section className="py-24 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">What Nigerian Business Leaders Say</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Trusted by leading companies across Nigeria
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-8 hover:shadow-lg transition-all duration-300">
              <div className="space-y-6">
                {/* Rating */}
                <div className="flex gap-1">
                  {Array.from({ length: testimonial.rating }, (_, i) => (
                    <Star key={i} className="h-5 w-5 fill-amber text-amber" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-lg leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>

                {/* Profile */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-teal-light rounded-full flex items-center justify-center">
                    <span className="font-semibold text-teal-dark">
                      {testimonial.avatar}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.position}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.company} • {testimonial.location}
                    </div>
                  </div>
                </div>

                {/* Video Play Button */}
                <Button 
                  variant="outline" 
                  className="w-full flex items-center justify-center gap-2 hover:bg-teal-light hover:border-teal"
                >
                  <Play className="h-4 w-4" />
                  Watch Video Testimonial
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Stats Bar */}
        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-teal">500+</div>
            <div className="text-sm text-muted-foreground">Nigerian Businesses</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-teal">98%</div>
            <div className="text-sm text-muted-foreground">Satisfaction Rate</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-teal">1M+</div>
            <div className="text-sm text-muted-foreground">Conversations Handled</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-teal">24hrs</div>
            <div className="text-sm text-muted-foreground">Average Setup Time</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LexiTestimonials;
