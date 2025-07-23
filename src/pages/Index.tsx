import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import LexiCapabilities from "@/components/LexiCapabilities";
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
      
      {/* Agent Lexi capabilities showcase */}
      <LexiCapabilities />
      
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
