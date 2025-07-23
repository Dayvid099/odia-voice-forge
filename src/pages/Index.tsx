import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import LexiCapabilities from "@/components/LexiCapabilities";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import LexiChatWidget from "@/components/lexi/LexiChatWidget";
import DemoBooking from "@/components/DemoBooking";

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
      
      {/* Demo booking section */}
      <DemoBooking />
      
      {/* Contact form with Nigerian business focus */}
      <ContactSection />
      
      {/* Footer with Nigerian pride */}
      <Footer />
      
      {/* Chat widget */}
      <LexiChatWidget />
    </div>
  );
};

export default Index;
