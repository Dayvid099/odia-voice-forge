
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mic, MessageSquare, Phone, Zap } from "lucide-react";

interface LexiHeroSectionProps {
  onStartDemo?: () => void;
}

const LexiHeroSection: React.FC<LexiHeroSectionProps> = ({ onStartDemo }) => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-background to-teal-light/10 flex items-center">
      <div className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-teal-light text-teal-dark text-sm font-medium">
                🇳🇬 Made in Nigeria
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-teal to-amber bg-clip-text text-transparent leading-tight">
                Meet Agent Lexi
              </h1>
              <h2 className="text-2xl lg:text-3xl text-foreground/80 font-semibold">
                Nigeria's Most Advanced WhatsApp Voice Assistant
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Deploy intelligent voice and chat automation that understands Nigerian English, Pidgin, and handles 2,500+ conversations daily with 98% customer satisfaction.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-teal to-teal-dark hover:from-teal-dark hover:to-teal text-white font-semibold px-8 py-6 text-lg shadow-glow"
                onClick={onStartDemo}
              >
                <MessageSquare className="mr-2 h-5 w-5" />
                Try Lexi Live Demo
              </Button>
              <Button variant="outline" size="lg" className="border-teal-light hover:bg-teal-light hover:text-teal-dark px-8 py-6 text-lg">
                <Mic className="mr-2 h-5 w-5" />
                Listen to Voice Samples
              </Button>
            </div>
          </div>

          {/* Right Visual - Interactive Chat Preview */}
          <div className="relative">
            <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-0 overflow-hidden">
              {/* Chat Header */}
              <div className="bg-gradient-to-r from-teal to-teal-dark text-white p-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Zap className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold">Agent Lexi</h3>
                  <p className="text-teal-light text-sm">🟢 Online • Responds in 3 seconds</p>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="p-4 space-y-4 h-96 overflow-y-auto">
                {/* User Message */}
                <div className="flex justify-end">
                  <div className="bg-teal-light text-teal-dark rounded-lg px-4 py-2 max-w-xs">
                    Hello, I want to buy data. How much for 5GB?
                  </div>
                </div>

                {/* Lexi Response */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-teal-light rounded-full flex items-center justify-center">
                    <Zap className="h-4 w-4 text-teal-dark" />
                  </div>
                  <div className="bg-gray-100 rounded-lg px-4 py-2 max-w-xs">
                    <p className="text-gray-900">Hello! Welcome to your business. Our 5GB data plan costs ₦2,500 and is valid for 30 days. Would you like me to help you purchase this plan?</p>
                    <div className="mt-2 flex items-center gap-2">
                      <Button size="sm" variant="outline" className="text-xs">
                        <Phone className="h-3 w-3 mr-1" />
                        Voice
                      </Button>
                      <span className="text-xs text-gray-500">🇳🇬 Nigerian English</span>
                    </div>
                  </div>
                </div>

                {/* User Message in Pidgin */}
                <div className="flex justify-end">
                  <div className="bg-teal-light text-teal-dark rounded-lg px-4 py-2 max-w-xs">
                    Abeg, my network no dey work. Wetin I go do?
                  </div>
                </div>

                {/* Lexi Pidgin Response */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-teal-light rounded-full flex items-center justify-center">
                    <Zap className="h-4 w-4 text-teal-dark" />
                  </div>
                  <div className="bg-gray-100 rounded-lg px-4 py-2 max-w-xs">
                    <p className="text-gray-900">Sorry oh! Make I help you fix am. First, off your phone, wait 30 seconds, then on am back. If e still no work, make I check your account balance for you.</p>
                    <div className="mt-2 flex items-center gap-2">
                      <Button size="sm" variant="outline" className="text-xs">
                        <Phone className="h-3 w-3 mr-1" />
                        Voice
                      </Button>
                      <span className="text-xs text-gray-500">🇳🇬 Nigerian Pidgin</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Chat Input */}
              <div className="border-t p-4">
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-gray-100 rounded-lg px-4 py-2 text-gray-500">
                    Type your message...
                  </div>
                  <Button size="sm" className="bg-teal hover:bg-teal-dark">
                    <Mic className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-amber rounded-full animate-pulse"></div>
            <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-teal rounded-full animate-bounce"></div>
            <div className="absolute top-1/2 -left-8 w-4 h-4 bg-amber-light rounded-full animate-ping"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LexiHeroSection;
