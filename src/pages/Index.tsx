import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import AgentsShowcase from "@/components/AgentsShowcase";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section with animated background */}
      <HeroSection />
      
      {/* Features highlighting Nigerian business needs */}
      <FeaturesSection />
      
      {/* AI Agents showcase with interactive cards */}
      <AgentsShowcase />
      
      {/* Social proof and testimonials */}
      <TestimonialsSection />
      
      {/* Contact form with Nigerian business focus */}
      <ContactSection />
      
      {/* Footer with Nigerian pride */}
      <Footer />
    </div>
  );
};

export default Index;
