import LexiHeroSection from "@/components/lexi/LexiHeroSection";
import LexiStatsBar from "@/components/lexi/LexiStatsBar";
import LexiInteractiveDemo from "@/components/lexi/LexiInteractiveDemo";
import LexiFeaturesGrid from "@/components/lexi/LexiFeaturesGrid";
import LexiUseCases from "@/components/lexi/LexiUseCases";
import LexiPricing from "@/components/lexi/LexiPricing";
import LexiTestimonials from "@/components/lexi/LexiTestimonials";
import LexiTechnicalSpecs from "@/components/lexi/LexiTechnicalSpecs";
import LexiCTASection from "@/components/lexi/LexiCTASection";
import Footer from "@/components/Footer";

const AgentLexi = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with split screen layout */}
      <LexiHeroSection />
      
      {/* Stats bar with key metrics */}
      <LexiStatsBar />
      
      {/* Interactive demo section */}
      <LexiInteractiveDemo />
      
      {/* Features grid showcasing Nigerian-specific capabilities */}
      <LexiFeaturesGrid />
      
      {/* Use cases with business scenarios */}
      <LexiUseCases />
      
      {/* Pricing comparison */}
      <LexiPricing />
      
      {/* Video testimonials */}
      <LexiTestimonials />
      
      {/* Technical specifications */}
      <LexiTechnicalSpecs />
      
      {/* Final CTA with form */}
      <LexiCTASection />
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AgentLexi;