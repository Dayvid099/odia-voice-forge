import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, Pause, Volume2, BarChart3, MessageSquare, Mic } from "lucide-react";

const LexiInteractiveDemo = () => {
  const [activeVoiceDemo, setActiveVoiceDemo] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const voiceScenarios = [
    {
      title: "Customer Inquiry (English)",
      prompt: "Hello, I want to buy data. How much for 5GB?",
      response: "Hello! Welcome to [Business Name]. Our 5GB data plan costs ₦2,500 and is valid for 30 days. Would you like me to help you purchase this plan?",
      language: "🇳🇬 Nigerian English"
    },
    {
      title: "Customer Support (Pidgin)",
      prompt: "Abeg, my network no dey work. Wetin I go do?",
      response: "Sorry oh! Make I help you fix am. First, off your phone, wait 30 seconds, then on am back. If e still no work, make I check your account balance for you.",
      language: "🇳🇬 Nigerian Pidgin"
    },
    {
      title: "Sales Follow-up (Professional)",
      prompt: "I'm interested in your premium package",
      response: "Excellent choice! Our premium package includes unlimited calls, 20GB data, and priority customer support for ₦8,000 monthly. Shall I send you the full details?",
      language: "🇳🇬 Professional English"
    }
  ];

  return (
    <section className="py-24 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Experience Lexi's Voice & Chat Power</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            See how Lexi handles real Nigerian business scenarios
          </p>
        </div>

        <Tabs defaultValue="voice" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-12">
            <TabsTrigger value="voice" className="flex items-center gap-2">
              <Mic className="h-4 w-4" />
              Voice Demo
            </TabsTrigger>
            <TabsTrigger value="chat" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Chat Interface
            </TabsTrigger>
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Business Dashboard
            </TabsTrigger>
          </TabsList>

          <TabsContent value="voice" className="space-y-8">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Voice Demo Controls */}
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold mb-6">Interactive Voice Scenarios</h3>
                {voiceScenarios.map((scenario, index) => (
                  <Card 
                    key={index} 
                    className={`p-6 cursor-pointer transition-all hover:shadow-lg ${
                      activeVoiceDemo === index ? 'ring-2 ring-emerald-500 bg-emerald-50' : ''
                    }`}
                    onClick={() => setActiveVoiceDemo(index)}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-lg">{scenario.title}</h4>
                        <span className="text-sm text-muted-foreground">{scenario.language}</span>
                      </div>
                      <div className="bg-gray-100 rounded-lg p-3">
                        <p className="text-sm text-gray-700 font-medium">Customer:</p>
                        <p className="text-gray-900">"{scenario.prompt}"</p>
                      </div>
                      <div className="bg-emerald-50 rounded-lg p-3">
                        <p className="text-sm text-emerald-700 font-medium">Agent Lexi:</p>
                        <p className="text-emerald-900">"{scenario.response}"</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Audio Player */}
              <div className="lg:sticky lg:top-8">
                <Card className="p-8 text-center">
                  <div className="space-y-6">
                    <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto">
                      <Volume2 className="h-12 w-12 text-white" />
                    </div>
                    
                    <div>
                      <h4 className="text-xl font-semibold mb-2">
                        {voiceScenarios[activeVoiceDemo].title}
                      </h4>
                      <p className="text-muted-foreground">
                        {voiceScenarios[activeVoiceDemo].language}
                      </p>
                    </div>

                    {/* Waveform Visualization */}
                    <div className="flex items-center justify-center gap-1 h-12">
                      {Array.from({ length: 20 }, (_, i) => (
                        <div
                          key={i}
                          className={`bg-emerald-500 rounded-full transition-all duration-300 ${
                            isPlaying ? 'animate-pulse' : ''
                          }`}
                          style={{
                            width: '3px',
                            height: `${Math.random() * 40 + 10}px`,
                            animationDelay: `${i * 100}ms`
                          }}
                        />
                      ))}
                    </div>

                    <Button
                      size="lg"
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white"
                    >
                      {isPlaying ? (
                        <>
                          <Pause className="mr-2 h-5 w-5" />
                          Pause Voice Sample
                        </>
                      ) : (
                        <>
                          <Play className="mr-2 h-5 w-5" />
                          Play Voice Sample
                        </>
                      )}
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="chat" className="space-y-8">
            <Card className="p-8">
              <h3 className="text-2xl font-semibold mb-6 text-center">Live Chat Simulation</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold mb-4">Features</h4>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      Real-time typing indicators
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      Voice message playback
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      Quick reply suggestions
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      Payment integration preview
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      Multi-language switching
                    </li>
                  </ul>
                </div>
                <div className="text-center">
                  <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700">
                    <MessageSquare className="mr-2 h-5 w-5" />
                    Launch Chat Demo
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="dashboard" className="space-y-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="p-6 text-center">
                <BarChart3 className="h-8 w-8 text-emerald-600 mx-auto mb-3" />
                <h4 className="font-semibold">Conversation Volume</h4>
                <p className="text-2xl font-bold text-emerald-600 mt-2">2,547</p>
                <p className="text-sm text-muted-foreground">Today</p>
              </Card>
              <Card className="p-6 text-center">
                <BarChart3 className="h-8 w-8 text-amber-600 mx-auto mb-3" />
                <h4 className="font-semibold">Satisfaction Score</h4>
                <p className="text-2xl font-bold text-amber-600 mt-2">98%</p>
                <p className="text-sm text-muted-foreground">This month</p>
              </Card>
              <Card className="p-6 text-center">
                <BarChart3 className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                <h4 className="font-semibold">Response Time</h4>
                <p className="text-2xl font-bold text-blue-600 mt-2">2.8s</p>
                <p className="text-sm text-muted-foreground">Average</p>
              </Card>
              <Card className="p-6 text-center">
                <BarChart3 className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                <h4 className="font-semibold">Revenue Generated</h4>
                <p className="text-2xl font-bold text-purple-600 mt-2">₦2.4M</p>
                <p className="text-sm text-muted-foreground">This month</p>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default LexiInteractiveDemo;