import { useState } from "react";
import LexiHeroSection from "@/components/lexi/LexiHeroSection";
import LexiStatsBar from "@/components/lexi/LexiStatsBar";
import LexiConversationDemo from "@/components/lexi/LexiConversationDemo";
import LexiFeaturesGrid from "@/components/lexi/LexiFeaturesGrid";
import LexiUseCases from "@/components/lexi/LexiUseCases";
import LexiPricing from "@/components/lexi/LexiPricing";
import LexiTestimonials from "@/components/lexi/LexiTestimonials";
import LexiTechnicalSpecs from "@/components/lexi/LexiTechnicalSpecs";
import LexiCTASection from "@/components/lexi/LexiCTASection";
import LexiChatWidget from "@/components/lexi/LexiChatWidget";
import Footer from "@/components/Footer";

const AgentLexi = () => {
  const [showChatWidget, setShowChatWidget] = useState(false);
  const [isChatMinimized, setIsChatMinimized] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with split screen layout */}
      <LexiHeroSection onStartDemo={() => setShowChatWidget(true)} />
      
      {/* Stats bar with key metrics */}
      <LexiStatsBar />
      
      {/* Conversational AI Demo section */}
      <LexiConversationDemo />
      
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
      
      {/* Floating Chat Widget */}
      {showChatWidget && (
        <LexiChatWidget
          agentId="lexi-demo-agent"
          isMinimized={isChatMinimized}
          onToggleMinimize={() => setIsChatMinimized(!isChatMinimized)}
          onClose={() => setShowChatWidget(false)}
        />
      )}
    </div>
  );
};

export default AgentLexi;