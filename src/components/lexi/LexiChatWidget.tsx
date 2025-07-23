import React, { useState, useRef, useEffect } from 'react';
import { useConversation } from '@11labs/react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  MessageSquare, 
  X, 
  Minimize2,
  Maximize2,
  Send,
  Phone,
  PhoneOff
} from 'lucide-react';
import { cn } from '@/lib/utils';
import agentLexiAvatar from '@/assets/agent-lexi-avatar.jpg';

interface Message {
  id: string;
  type: 'user' | 'agent';
  content: string;
  timestamp: Date;
  isVoice?: boolean;
  audioUrl?: string;
}

interface LexiChatWidgetProps {
  agentId?: string;
  className?: string;
  onClose?: () => void;
  isMinimized?: boolean;
  onToggleMinimize?: () => void;
}

const LexiChatWidget: React.FC<LexiChatWidgetProps> = ({
  agentId = 'default-lexi-agent',
  className,
  onClose,
  isMinimized = false,
  onToggleMinimize
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'agent',
      content: "Hello! I'm Agent Lexi, your Nigerian WhatsApp AI assistant. How can I help you today? You can speak to me or type your message.",
      timestamp: new Date(),
    }
  ]);
  const [textInput, setTextInput] = useState('');
  const [volume, setVolume] = useState(0.8);
  const [isConnecting, setIsConnecting] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const conversation = useConversation({
    onConnect: () => {
      console.log('Connected to ElevenLabs');
      setIsConnecting(false);
      addMessage('agent', 'Voice connection established! You can now speak to me directly.');
    },
    onDisconnect: () => {
      console.log('Disconnected from ElevenLabs');
      addMessage('agent', 'Voice connection ended. You can still type messages or reconnect for voice chat.');
    },
    onMessage: (message) => {
      // Handle different message types from ElevenLabs
      addMessage('agent', message.message || 'Message received', true);
    },
    onError: (error) => {
      console.error('ElevenLabs error:', error);
      addMessage('agent', 'Sorry, I encountered an issue with voice processing. Please try again or use text chat.');
    },
    clientTools: {
      bookDemo: (params: { email: string; phone: string }) => {
        addMessage('agent', `Perfect! I've recorded your details: ${params.email} and ${params.phone}. Our team will contact you within 24 hours to schedule your Lexi demo.`);
        return "Demo booking request recorded successfully";
      },
      getPricing: () => {
        addMessage('agent', "Our pricing starts at ₦25,000/month for small businesses with 500 conversations. Would you like me to show you our full pricing plans?");
        return "Pricing information provided";
      },
      switchLanguage: (params: { language: string }) => {
        addMessage('agent', `Switching to ${params.language}. How can I help you?`);
        return `Language switched to ${params.language}`;
      }
    },
    overrides: {
      agent: {
        prompt: {
          prompt: `You are Agent Lexi, a Nigerian AI assistant specializing in WhatsApp automation and voice services. 
          You understand Nigerian English, Pidgin, and local business contexts. 
          Be friendly, professional, and helpful. 
          You can help with:
          - Product demonstrations
          - Pricing information  
          - Technical questions about voice AI
          - Scheduling demos
          - Nigerian business automation needs
          
          Keep responses concise and engaging. Use Nigerian expressions naturally when appropriate.`
        },
        firstMessage: "Hello! I'm Agent Lexi. How can I assist with your business automation needs today?",
        language: "en"
      },
      tts: {
        voiceId: "EXAVITQu4vr4xnSDxMaL" // Sarah voice
      }
    }
  });

  const addMessage = (type: 'user' | 'agent', content: string, isVoice = false) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type,
      content,
      timestamp: new Date(),
      isVoice
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleSendText = () => {
    if (!textInput.trim()) return;
    
    addMessage('user', textInput);
    // For demo purposes, simulate agent response
    setTimeout(() => {
      addMessage('agent', `I understand you said: "${textInput}". How can I help you further with that?`);
    }, 1000);
    
    setTextInput('');
  };

  const handleStartVoiceCall = async () => {
    try {
      setIsConnecting(true);
      
      // Check microphone permission first
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach(track => track.stop()); // Stop the test stream
      
      addMessage('agent', 'Voice chat is currently in demo mode. For full voice functionality, an ElevenLabs API key would be required. You can continue with text chat to experience Agent Lexi!');
      setIsConnecting(false);
      
      // In production, you would:
      // 1. Get a signed URL from your backend with ElevenLabs API key
      // 2. Start the conversation with proper authentication
      // const conversationId = await conversation.startSession({ url: signedUrl });
      
    } catch (error) {
      console.error('Failed to start voice conversation:', error);
      setIsConnecting(false);
      
      if (error.name === 'NotAllowedError') {
        addMessage('agent', 'Microphone access denied. Please enable microphone permissions in your browser settings and try again, or continue with text chat.');
      } else if (error.name === 'NotFoundError') {
        addMessage('agent', 'No microphone found. Please connect a microphone or use text chat instead.');
      } else {
        addMessage('agent', 'Voice chat is currently unavailable. Please use text chat to experience Agent Lexi\'s capabilities!');
      }
    }
  };

  const handleEndVoiceCall = async () => {
    try {
      await conversation.endSession();
      addMessage('agent', 'Voice conversation ended. Feel free to start a new one anytime!');
    } catch (error) {
      console.error('Failed to end voice conversation:', error);
    }
  };

  const handleVolumeChange = async (newVolume: number) => {
    setVolume(newVolume);
    try {
      await conversation.setVolume({ volume: newVolume });
    } catch (error) {
      console.error('Failed to set volume:', error);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (isMinimized) {
    return (
      <Card className="fixed bottom-4 right-4 w-80 h-16 flex items-center justify-between p-4 shadow-lg border-primary/20 bg-background/95 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <img 
            src={agentLexiAvatar} 
            alt="Agent Lexi" 
            className="w-8 h-8 rounded-full object-cover"
          />
          <div>
            <h4 className="font-medium text-sm">Agent Lexi</h4>
            <p className="text-xs text-muted-foreground">
              {conversation.status === 'connected' ? 'Voice Active' : 'Chat Available'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {conversation.status === 'connected' && (
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              Live
            </Badge>
          )}
          <Button size="sm" variant="ghost" onClick={onToggleMinimize}>
            <Maximize2 className="h-4 w-4" />
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className={cn("fixed bottom-4 right-4 w-96 h-[600px] flex flex-col shadow-xl border-primary/20 bg-background/95 backdrop-blur-sm", className)}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-primary/5">
        <div className="flex items-center gap-3">
          <img 
            src={agentLexiAvatar} 
            alt="Agent Lexi" 
            className="w-10 h-10 rounded-full object-cover border-2 border-primary/20"
          />
          <div>
            <h3 className="font-semibold">Agent Lexi</h3>
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              {conversation.status === 'connected' && (
                <>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  Voice Active
                </>
              )}
              {conversation.status === 'disconnected' && (
                <>
                  <div className="w-2 h-2 bg-gray-400 rounded-full" />
                  Chat Available
                </>
              )}
              {isConnecting && (
                <>
                  <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
                  Connecting...
                </>
              )}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {conversation.status === 'connected' && conversation.isSpeaking && (
            <Badge variant="secondary" className="bg-green-100 text-green-800 animate-pulse">
              Speaking
            </Badge>
          )}
          <Button size="sm" variant="ghost" onClick={onToggleMinimize}>
            <Minimize2 className="h-4 w-4" />
          </Button>
          {onClose && (
            <Button size="sm" variant="ghost" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Voice Controls */}
      <div className="p-3 border-b bg-muted/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {conversation.status === 'disconnected' ? (
              <Button 
                size="sm" 
                onClick={handleStartVoiceCall}
                disabled={isConnecting}
                className="bg-green-600 hover:bg-green-700"
              >
                <Phone className="h-4 w-4 mr-2" />
                {isConnecting ? 'Connecting...' : 'Start Voice Chat'}
              </Button>
            ) : (
              <Button 
                size="sm" 
                variant="destructive"
                onClick={handleEndVoiceCall}
              >
                <PhoneOff className="h-4 w-4 mr-2" />
                End Voice Chat
              </Button>
            )}
          </div>
          
          {conversation.status === 'connected' && (
            <div className="flex items-center gap-2">
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => handleVolumeChange(volume > 0 ? 0 : 0.8)}
              >
                {volume > 0 ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
              </Button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                className="w-16"
              />
            </div>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex",
              message.type === 'user' ? "justify-end" : "justify-start"
            )}
          >
            <div
              className={cn(
                "max-w-[80%] rounded-lg p-3 text-sm",
                message.type === 'user'
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted",
                message.isVoice && "border-l-4 border-green-500"
              )}
            >
              {message.isVoice && (
                <div className="flex items-center gap-2 mb-1">
                  <Mic className="h-3 w-3 text-green-600" />
                  <span className="text-xs text-muted-foreground">Voice message</span>
                </div>
              )}
              <p>{message.content}</p>
              <p className="text-xs opacity-70 mt-1">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Text Input */}
      <div className="p-4 border-t">
        <div className="flex gap-2">
          <input
            type="text"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendText()}
            placeholder="Type your message..."
            className="flex-1 px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <Button size="sm" onClick={handleSendText} disabled={!textInput.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          {conversation.status === 'connected' 
            ? "Voice chat active - speak directly or type messages"
            : "Start voice chat for hands-free conversation"}
        </p>
      </div>
    </Card>
  );
};

export default LexiChatWidget;