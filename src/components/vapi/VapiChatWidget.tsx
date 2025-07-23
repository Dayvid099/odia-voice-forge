import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { 
  Phone, 
  PhoneOff, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX,
  Settings,
  Minimize2,
  X,
  MessageCircle,
  Bot
} from "lucide-react";
// @ts-ignore
import Vapi from "@vapi-ai/web";

interface Message {
  type: 'user' | 'agent' | 'system';
  content: string;
  timestamp: Date;
  isPhone?: boolean;
}

interface VapiChatWidgetProps {
  agentId?: string;
  isMinimized?: boolean;
  onToggleMinimize: () => void;
  onClose: () => void;
  className?: string;
}

const VapiChatWidget = ({
  agentId = "vapi-lexi-agent",
  isMinimized = false,
  onToggleMinimize,
  onClose,
  className = ""
}: VapiChatWidgetProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isCallActive, setIsCallActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [isConnecting, setIsConnecting] = useState(false);
  const [vapiApiKey, setVapiApiKey] = useState("");
  const [showSettings, setShowSettings] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [callStatus, setCallStatus] = useState<'idle' | 'calling' | 'connected' | 'ended'>('idle');
  
  const { toast } = useToast();
  const vapiRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize Vapi
  useEffect(() => {
    const savedApiKey = localStorage.getItem('vapi_api_key');
    if (savedApiKey) {
      setVapiApiKey(savedApiKey);
      initializeVapi(savedApiKey);
    }
  }, []);

  const initializeVapi = (apiKey: string) => {
    try {
      vapiRef.current = new Vapi(apiKey);
      
      vapiRef.current.on('call-start', () => {
        setIsCallActive(true);
        setCallStatus('connected');
        addMessage('system', 'Call started successfully');
      });

      vapiRef.current.on('call-end', () => {
        setIsCallActive(false);
        setCallStatus('ended');
        addMessage('system', 'Call ended');
      });

      vapiRef.current.on('speech-start', () => {
        addMessage('system', 'User started speaking...');
      });

      vapiRef.current.on('speech-end', () => {
        addMessage('system', 'User stopped speaking');
      });

      vapiRef.current.on('message', (message: any) => {
        if (message.type === 'transcript' && message.transcriptType === 'final') {
          addMessage('user', message.transcript);
        }
        if (message.type === 'function-call') {
          handleFunctionCall(message);
        }
      });

      vapiRef.current.on('error', (error: any) => {
        console.error('Vapi error:', error);
        toast({
          title: "Call Error",
          description: error.message || "An error occurred during the call",
          variant: "destructive",
        });
        setIsCallActive(false);
        setCallStatus('ended');
      });

    } catch (error) {
      console.error('Failed to initialize Vapi:', error);
      toast({
        title: "Initialization Error",
        description: "Failed to initialize Vapi AI. Please check your API key.",
        variant: "destructive",
      });
    }
  };

  const addMessage = (type: 'user' | 'agent' | 'system', content: string, isPhone = false) => {
    setMessages(prev => [...prev, {
      type,
      content,
      timestamp: new Date(),
      isPhone
    }]);
  };

  const handleFunctionCall = (message: any) => {
    const { functionCall } = message;
    
    switch (functionCall.name) {
      case 'bookDemo':
        addMessage('agent', 'I can help you book a demo. Let me connect you with our sales team.');
        toast({
          title: "Demo Booking",
          description: "Initiating demo booking process...",
        });
        break;
      
      case 'getPricing':
        addMessage('agent', 'Our pricing starts at ₦50,000/month for the basic plan. Would you like detailed pricing information?');
        break;
        
      default:
        console.log('Unknown function call:', functionCall);
    }
  };

  const handleStartCall = async () => {
    if (!vapiApiKey) {
      toast({
        title: "API Key Required",
        description: "Please set your Vapi AI API key in settings",
        variant: "destructive",
      });
      setShowSettings(true);
      return;
    }

    try {
      setIsConnecting(true);
      setCallStatus('calling');
      
      const assistant = {
        name: "Agent Lexi",
        model: {
          provider: "openai",
          model: "gpt-4",
          messages: [
            {
              role: "system",
              content: `You are Agent Lexi, a conversational AI assistant specialized in Nigerian business contexts. 
                       You help businesses with customer service, sales support, and general inquiries.
                       Be friendly, professional, and culturally aware of Nigerian business practices.
                       You can book demos, provide pricing information, and answer questions about our AI services.`
            }
          ]
        },
        voice: {
          provider: "11labs",
          voiceId: "9BWtsMINqrJLrRacOk9x", // Aria voice
        },
        firstMessage: "Hello! I'm Agent Lexi, your AI business assistant. How can I help you today?",
        functions: [
          {
            name: "bookDemo",
            description: "Book a demo session with our sales team",
            parameters: {
              type: "object",
              properties: {
                name: { type: "string" },
                email: { type: "string" },
                company: { type: "string" }
              },
              required: ["name", "email"]
            }
          },
          {
            name: "getPricing",
            description: "Get pricing information for our services",
            parameters: {
              type: "object",
              properties: {
                plan: { type: "string", enum: ["basic", "professional", "enterprise"] }
              }
            }
          }
        ]
      };

      await vapiRef.current.start(assistant);
      addMessage('agent', 'Hello! I\'m Agent Lexi, your AI business assistant. How can I help you today?');
      
    } catch (error) {
      console.error('Failed to start call:', error);
      toast({
        title: "Call Failed",
        description: "Failed to start the call. Please try again.",
        variant: "destructive",
      });
      setCallStatus('ended');
    } finally {
      setIsConnecting(false);
    }
  };

  const handleEndCall = async () => {
    try {
      if (vapiRef.current && isCallActive) {
        await vapiRef.current.stop();
      }
      setIsCallActive(false);
      setCallStatus('ended');
      addMessage('system', 'Call ended by user');
    } catch (error) {
      console.error('Failed to end call:', error);
    }
  };

  const handlePhoneCall = async () => {
    if (!phoneNumber) {
      toast({
        title: "Phone Number Required",
        description: "Please enter a phone number to call",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsConnecting(true);
      setCallStatus('calling');
      
      const assistant = {
        name: "Agent Lexi",
        model: {
          provider: "openai",
          model: "gpt-4",
          messages: [
            {
              role: "system",
              content: "You are Agent Lexi making an outbound call to a potential customer in Nigeria."
            }
          ]
        },
        voice: {
          provider: "11labs",
          voiceId: "9BWtsMINqrJLrRacOk9x",
        },
        firstMessage: "Hello! This is Agent Lexi calling from your AI business solutions provider. Is this a good time to talk?",
      };

      await vapiRef.current.start(assistant, { phoneNumber });
      addMessage('system', `Calling ${phoneNumber}...`, true);
      
    } catch (error) {
      console.error('Failed to make phone call:', error);
      toast({
        title: "Call Failed",
        description: "Failed to make phone call. Please try again.",
        variant: "destructive",
      });
      setCallStatus('ended');
    } finally {
      setIsConnecting(false);
    }
  };

  const handleSaveApiKey = () => {
    if (vapiApiKey) {
      localStorage.setItem('vapi_api_key', vapiApiKey);
      initializeVapi(vapiApiKey);
      setShowSettings(false);
      toast({
        title: "API Key Saved",
        description: "Vapi AI API key has been saved successfully",
      });
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (vapiRef.current) {
      vapiRef.current.setMuted(!isMuted);
    }
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    if (vapiRef.current) {
      vapiRef.current.setVolume(newVolume);
    }
  };

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (isMinimized) {
    return (
      <Card className={`fixed bottom-4 right-4 w-16 h-16 flex items-center justify-center cursor-pointer hover:scale-105 transition-transform ${className}`}>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onToggleMinimize}
          className="w-full h-full rounded-full"
        >
          <div className="relative">
            <Bot className="h-6 w-6" />
            {isCallActive && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            )}
          </div>
        </Button>
      </Card>
    );
  }

  return (
    <Card className={`fixed bottom-4 right-4 w-96 h-[600px] flex flex-col shadow-2xl ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center space-x-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/lovable-uploads/4446d053-3b86-4f07-b8eb-e2e22a37cea0.png" alt="Agent Lexi" />
            <AvatarFallback>AL</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold text-sm">Agent Lexi</h3>
            <div className="flex items-center space-x-2">
              <Badge 
                variant={isCallActive ? "default" : callStatus === 'calling' ? "secondary" : "outline"}
                className="text-xs"
              >
                {isCallActive ? "Live Call" : callStatus === 'calling' ? "Calling..." : callStatus === 'connected' ? "Connected" : "Offline"}
              </Badge>
              {isCallActive && (
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-xs text-muted-foreground">Voice Active</span>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-1">
          <Dialog open={showSettings} onOpenChange={setShowSettings}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Settings className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Vapi AI Settings</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="api-key">Vapi AI API Key</Label>
                  <Input
                    id="api-key"
                    type="password"
                    value={vapiApiKey}
                    onChange={(e) => setVapiApiKey(e.target.value)}
                    placeholder="Enter your Vapi AI API key"
                  />
                </div>
                <Button onClick={handleSaveApiKey} className="w-full">
                  Save API Key
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          
          <Button variant="ghost" size="icon" onClick={onToggleMinimize} className="h-8 w-8">
            <Minimize2 className="h-4 w-4" />
          </Button>
          
          <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Voice Controls */}
      <div className="p-4 border-b bg-muted/50">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium">Voice Controls</span>
          <div className="flex items-center space-x-2">
            <Button
              variant={isMuted ? "destructive" : "outline"}
              size="sm"
              onClick={toggleMute}
              disabled={!isCallActive}
            >
              {isMuted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            </Button>
            
            <Button
              variant={volume === 0 ? "destructive" : "outline"}
              size="sm"
              onClick={() => handleVolumeChange(volume === 0 ? 0.8 : 0)}
            >
              {volume === 0 ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </Button>
          </div>
        </div>
        
        <div className="flex space-x-2">
          {!isCallActive ? (
            <Button 
              onClick={handleStartCall} 
              disabled={isConnecting}
              className="flex-1"
              variant="default"
            >
              <Phone className="h-4 w-4 mr-2" />
              {isConnecting ? "Connecting..." : "Start Voice Call"}
            </Button>
          ) : (
            <Button 
              onClick={handleEndCall}
              variant="destructive"
              className="flex-1"
            >
              <PhoneOff className="h-4 w-4 mr-2" />
              End Call
            </Button>
          )}
        </div>

        {/* Phone Number Input */}
        <div className="mt-3 space-y-2">
          <div className="flex space-x-2">
            <Input
              placeholder="Enter phone number (+234...)"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="flex-1"
            />
            <Button 
              onClick={handlePhoneCall}
              disabled={isConnecting || isCallActive}
              variant="outline"
              size="sm"
            >
              <Phone className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.type === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : message.type === 'agent'
                    ? 'bg-muted'
                    : 'bg-muted/50 text-muted-foreground text-sm'
                }`}
              >
                <div className="flex items-start space-x-2">
                  {message.isPhone && <Phone className="h-3 w-3 mt-1 flex-shrink-0" />}
                  <p className="text-sm">{message.content}</p>
                </div>
                <p className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Status */}
      <div className="p-4 border-t">
        <div className="text-center">
          <p className="text-xs text-muted-foreground">
            {isCallActive 
              ? "Voice call is active - speak naturally" 
              : "Click 'Start Voice Call' to begin talking with Agent Lexi"
            }
          </p>
        </div>
      </div>
    </Card>
  );
};

export default VapiChatWidget;