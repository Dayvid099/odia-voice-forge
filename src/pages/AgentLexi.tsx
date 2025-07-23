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
import VapiChatWidget from "@/components/vapi/VapiChatWidget";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const AgentLexi = () => {
  const [showChatWidget, setShowChatWidget] = useState(false);
  const [isChatMinimized, setIsChatMinimized] = useState(false);
  const [useVapiAI, setUseVapiAI] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with split screen layout */}
      <LexiHeroSection onStartDemo={() => setShowChatWidget(true)} />
      
      {/* AI Mode Toggle */}
      <div className="fixed top-4 right-4 z-50 flex items-center space-x-2">
        <Badge variant="outline" className="bg-background/80 backdrop-blur-sm">
          AI Mode: {useVapiAI ? 'Vapi AI' : 'ElevenLabs'}
        </Badge>
        <Button
          variant={useVapiAI ? "default" : "outline"}
          size="sm"
          onClick={() => setUseVapiAI(!useVapiAI)}
          className="bg-background/80 backdrop-blur-sm"
        >
          Switch to {useVapiAI ? 'ElevenLabs' : 'Vapi AI'}
        </Button>
      </div>
      
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
        <>
          {useVapiAI ? (
            <VapiChatWidget
              agentId="vapi-lexi-agent"
              isMinimized={isChatMinimized}
              onToggleMinimize={() => setIsChatMinimized(!isChatMinimized)}
              onClose={() => setShowChatWidget(false)}
            />
          ) : (
            <LexiChatWidget
              agentId="lexi-demo-agent"
              isMinimized={isChatMinimized}
              onToggleMinimize={() => setIsChatMinimized(!isChatMinimized)}
              onClose={() => setShowChatWidget(false)}
            />
          )}
        </>
      )}
    </div>
  );
};

export default AgentLexi;