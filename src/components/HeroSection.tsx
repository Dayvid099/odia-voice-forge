import { Button } from "@/components/ui/button";
import { Play, Mic, ArrowRight, Sparkles, Users, Clock } from "lucide-react";
import heroImage from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  const scrollToDemo = () => {
    document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' });
  };

  const openVideoModal = () => {
    // Will implement video modal later
    alert('Video demo coming soon!');
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Hero Background */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 hero-gradient opacity-90" />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 z-10">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-primary/30 rounded-full particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${4 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Voice Waveform Animation */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-10 flex space-x-2">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="w-1 bg-primary voice-wave rounded-full"
            style={{
              animationDelay: `${i * 0.1}s`
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-20 container-odia text-center">
        <div className="animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full text-primary text-sm font-medium mb-8 glass-effect">
            <Sparkles className="w-4 h-4" />
            Nigeria's First Voice AI Infrastructure
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 font-space-grotesk">
            Nigeria's First
            <span className="block nigerian-gradient bg-clip-text text-transparent">
              Voice AI Infrastructure
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-4xl mx-auto leading-relaxed">
            Deploy intelligent agents for WhatsApp automation, voice processing, and business intelligence
            <span className="text-gold font-semibold"> in 24 hours</span>
          </p>

          {/* Value Props */}
          <div className="flex flex-wrap justify-center gap-6 mb-12 text-white/70">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              <span>500+ Nigerian Businesses Empowered</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              <span>99.9% Uptime SLA</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-gold" />
              <span>Built in Lagos, Trusted Nationwide</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              onClick={scrollToDemo}
              className="btn-gradient text-lg glow-primary group"
              size="lg"
            >
              Book Free Demo
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button 
              onClick={openVideoModal}
              variant="outline"
              className="btn-outline text-lg border-white/30 text-white hover:bg-white/10"
              size="lg"
            >
              <Play className="mr-2 w-5 h-5" />
              Watch 2-Min Overview
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;