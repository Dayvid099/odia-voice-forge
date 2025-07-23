import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Play, 
  Pause, 
  Volume2, 
  MessageSquare, 
  Mic,
  Globe,
  Zap,
  Users,
  BarChart3
} from 'lucide-react';
import agentLexiAvatar from '@/assets/agent-lexi-avatar.jpg';

const voiceScenarios = [
  {
    id: 'english',
    title: 'Customer Inquiry (English)',
    language: 'Nigerian English',
    customer: "Hello, I want to buy data. How much for 5GB?",
    agent: "Hello! Welcome to our service. Our 5GB data plan costs ₦2,500 and is valid for 30 days. Would you like me to help you purchase this plan?",
    accent: 'Lagos accent',
    duration: '12s'
  },
  {
    id: 'pidgin',
    title: 'Customer Support (Pidgin)',
    language: 'Nigerian Pidgin',
    customer: "Abeg, my network no dey work. Wetin I go do?",
    agent: "Sorry oh! Make I help you fix am. First, off your phone, wait 30 seconds, then on am back. If e still no work, make I check your account balance for you.",
    accent: 'Port Harcourt accent',
    duration: '18s'
  },
  {
    id: 'professional',
    title: 'Sales Follow-up (Professional)',
    language: 'Business English',
    customer: "I'm interested in your premium package details",
    agent: "Excellent choice! Our premium package includes unlimited calls, 20GB data, and priority customer support for ₦8,000 monthly. Shall I send you the complete details and pricing breakdown?",
    accent: 'Abuja accent',
    duration: '15s'
  }
];

const chatFeatures = [
  { icon: MessageSquare, title: 'Real-time responses', desc: 'Instant AI-powered replies' },
  { icon: Mic, title: 'Voice message support', desc: 'Send and receive voice notes' },
  { icon: Globe, title: 'Multi-language', desc: 'English, Pidgin, Yoruba, Igbo' },
  { icon: Zap, title: 'Quick actions', desc: 'Payment, booking, support shortcuts' }
];

const dashboardMetrics = [
  { title: 'Daily Conversations', value: '2,847', change: '+18%', color: 'text-green-600' },
  { title: 'Satisfaction Score', value: '98.2%', change: '+2.1%', color: 'text-blue-600' },
  { title: 'Avg Response Time', value: '2.3s', change: '-15%', color: 'text-purple-600' },
  { title: 'Revenue Generated', value: '₦1.2M', change: '+34%', color: 'text-orange-600' }
];

const LexiConversationDemo: React.FC = () => {
  const [activeVoiceDemo, setActiveVoiceDemo] = useState(voiceScenarios[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayVoice = (scenario: typeof voiceScenarios[0]) => {
    setActiveVoiceDemo(scenario);
    setIsPlaying(!isPlaying);
    
    // Simulate audio playback
    setTimeout(() => {
      setIsPlaying(false);
    }, parseInt(scenario.duration) * 1000);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-background via-primary/5 to-secondary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Experience Lexi's Conversational AI</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            See how Agent Lexi handles real Nigerian business conversations with natural voice and intelligent responses
          </p>
        </div>

        <Tabs defaultValue="voice" className="max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="voice" className="flex items-center gap-2">
              <Mic className="h-4 w-4" />
              Voice Demo
            </TabsTrigger>
            <TabsTrigger value="chat" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Chat Interface
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Business Dashboard
            </TabsTrigger>
          </TabsList>

          <TabsContent value="voice" className="space-y-8">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Voice Scenarios */}
              <Card className="h-fit">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Volume2 className="h-5 w-5 text-primary" />
                    Interactive Voice Scenarios
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {voiceScenarios.map((scenario) => (
                    <div
                      key={scenario.id}
                      className={`p-4 rounded-lg border cursor-pointer transition-all hover:border-primary/50 ${
                        activeVoiceDemo.id === scenario.id ? 'border-primary bg-primary/5' : 'border-border'
                      }`}
                      onClick={() => setActiveVoiceDemo(scenario)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{scenario.title}</h4>
                        <Badge variant="outline">{scenario.language}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        "{scenario.customer}"
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">{scenario.accent}</span>
                        <Button
                          size="sm"
                          variant={activeVoiceDemo.id === scenario.id && isPlaying ? "default" : "outline"}
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePlayVoice(scenario);
                          }}
                        >
                          {activeVoiceDemo.id === scenario.id && isPlaying ? (
                            <Pause className="h-4 w-4" />
                          ) : (
                            <Play className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Active Demo Display */}
              <Card className="h-fit">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <img 
                      src={agentLexiAvatar} 
                      alt="Agent Lexi" 
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    Live Voice Demo
                    {isPlaying && (
                      <Badge className="bg-green-100 text-green-800 animate-pulse">
                        Playing
                      </Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Customer Message */}
                  <div className="flex justify-end">
                    <div className="bg-primary text-primary-foreground rounded-lg p-3 max-w-[80%]">
                      <p className="text-sm">{activeVoiceDemo.customer}</p>
                      <p className="text-xs opacity-80 mt-1">Customer • Voice message</p>
                    </div>
                  </div>

                  {/* Agent Response */}
                  <div className="flex justify-start">
                    <div className="bg-muted rounded-lg p-3 max-w-[80%]">
                      <div className="flex items-center gap-2 mb-2">
                        <img 
                          src={agentLexiAvatar} 
                          alt="Agent Lexi" 
                          className="w-6 h-6 rounded-full object-cover"
                        />
                        <span className="text-sm font-medium">Agent Lexi</span>
                        <Badge variant="secondary" className="text-xs">{activeVoiceDemo.language}</Badge>
                      </div>
                      <p className="text-sm">{activeVoiceDemo.agent}</p>
                      <div className="flex items-center justify-between mt-2">
                        <p className="text-xs text-muted-foreground">
                          {activeVoiceDemo.accent} • {activeVoiceDemo.duration}
                        </p>
                        {isPlaying && (
                          <div className="flex items-center gap-1">
                            <div className="w-1 h-3 bg-green-500 rounded animate-pulse"></div>
                            <div className="w-1 h-2 bg-green-400 rounded animate-pulse" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-1 h-4 bg-green-500 rounded animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                            <div className="w-1 h-2 bg-green-400 rounded animate-pulse" style={{ animationDelay: '0.3s' }}></div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="text-center pt-4">
                    <Button 
                      size="lg" 
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => handlePlayVoice(activeVoiceDemo)}
                    >
                      {isPlaying ? (
                        <>
                          <Pause className="h-5 w-5 mr-2" />
                          Pause Demo
                        </>
                      ) : (
                        <>
                          <Play className="h-5 w-5 mr-2" />
                          Play Voice Demo
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="chat" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Live Chat Interface Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    {chatFeatures.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 rounded-lg border">
                        <feature.icon className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <h4 className="font-medium">{feature.title}</h4>
                          <p className="text-sm text-muted-foreground">{feature.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-center">
                    <Button size="lg" className="w-full max-w-xs">
                      Launch Live Chat Demo
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {dashboardMetrics.map((metric, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">{metric.title}</p>
                        <p className="text-2xl font-bold">{metric.value}</p>
                        <p className={`text-sm ${metric.color}`}>{metric.change}</p>
                      </div>
                      <Users className="h-8 w-8 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Real-time Business Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Monitor your Agent Lexi performance with comprehensive analytics and insights tailored for Nigerian businesses.
                </p>
                <Button>View Full Dashboard</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default LexiConversationDemo;