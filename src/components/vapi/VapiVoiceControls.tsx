import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { 
  Phone, 
  PhoneOff, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX,
  PhoneCall,
  PhoneIncoming
} from "lucide-react";

interface VapiVoiceControlsProps {
  isCallActive: boolean;
  isMuted: boolean;
  volume: number;
  isConnecting: boolean;
  callStatus: 'idle' | 'calling' | 'connected' | 'ended';
  onStartCall: () => void;
  onEndCall: () => void;
  onToggleMute: () => void;
  onVolumeChange: (volume: number) => void;
  onMakePhoneCall?: (phoneNumber: string) => void;
  className?: string;
}

const VapiVoiceControls = ({
  isCallActive,
  isMuted,
  volume,
  isConnecting,
  callStatus,
  onStartCall,
  onEndCall,
  onToggleMute,
  onVolumeChange,
  onMakePhoneCall,
  className = ""
}: VapiVoiceControlsProps) => {
  const [phoneNumber, setPhoneNumber] = useState("");

  const getCallStatusBadge = () => {
    switch (callStatus) {
      case 'calling':
        return <Badge variant="secondary" className="animate-pulse">Calling...</Badge>;
      case 'connected':
        return <Badge variant="default">Connected</Badge>;
      case 'ended':
        return <Badge variant="outline">Call Ended</Badge>;
      default:
        return <Badge variant="outline">Ready</Badge>;
    }
  };

  const getCallStatusIcon = () => {
    if (isCallActive) {
      return <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />;
    }
    if (callStatus === 'calling') {
      return <PhoneCall className="h-3 w-3 text-yellow-500 animate-pulse" />;
    }
    return null;
  };

  return (
    <Card className={`p-4 space-y-4 ${className}`}>
      {/* Status Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <h3 className="font-semibold text-sm">Voice Controls</h3>
          {getCallStatusIcon()}
        </div>
        {getCallStatusBadge()}
      </div>

      {/* Main Call Controls */}
      <div className="flex space-x-2">
        {!isCallActive ? (
          <Button 
            onClick={onStartCall} 
            disabled={isConnecting}
            className="flex-1"
            variant="default"
          >
            <Phone className="h-4 w-4 mr-2" />
            {isConnecting ? "Connecting..." : "Start Voice Call"}
          </Button>
        ) : (
          <Button 
            onClick={onEndCall}
            variant="destructive"
            className="flex-1"
          >
            <PhoneOff className="h-4 w-4 mr-2" />
            End Call
          </Button>
        )}
      </div>

      {/* Microphone and Volume Controls */}
      {isCallActive && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Button
              variant={isMuted ? "destructive" : "outline"}
              size="sm"
              onClick={onToggleMute}
            >
              {isMuted ? <MicOff className="h-4 w-4 mr-2" /> : <Mic className="h-4 w-4 mr-2" />}
              {isMuted ? "Unmute" : "Mute"}
            </Button>
            
            <Button
              variant={volume === 0 ? "destructive" : "outline"}
              size="sm"
              onClick={() => onVolumeChange(volume === 0 ? 0.8 : 0)}
            >
              {volume === 0 ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </Button>
          </div>

          {/* Volume Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Volume</span>
              <span className="text-sm font-medium">{Math.round(volume * 100)}%</span>
            </div>
            <Slider
              value={[volume]}
              onValueChange={(value) => onVolumeChange(value[0])}
              max={1}
              min={0}
              step={0.1}
              className="w-full"
            />
          </div>
        </div>
      )}

      {/* Phone Call Section */}
      {onMakePhoneCall && (
        <div className="border-t pt-4 space-y-3">
          <div className="flex items-center space-x-2">
            <PhoneIncoming className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Phone Calls</span>
          </div>
          
          <div className="flex space-x-2">
            <input
              type="tel"
              placeholder="Enter phone number (+234...)"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="flex-1 px-3 py-2 text-sm border border-input rounded-md bg-background"
            />
            <Button 
              onClick={() => onMakePhoneCall(phoneNumber)}
              disabled={!phoneNumber || isConnecting || isCallActive}
              variant="outline"
              size="sm"
            >
              <Phone className="h-4 w-4" />
            </Button>
          </div>
          
          <p className="text-xs text-muted-foreground">
            Make outbound calls to Nigerian numbers (+234)
          </p>
        </div>
      )}

      {/* Call Quality Indicator */}
      {isCallActive && (
        <div className="border-t pt-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Call Quality</span>
            <div className="flex space-x-1">
              <div className="w-2 h-4 bg-green-500 rounded-sm"></div>
              <div className="w-2 h-4 bg-green-500 rounded-sm"></div>
              <div className="w-2 h-4 bg-green-500 rounded-sm"></div>
              <div className="w-2 h-4 bg-muted rounded-sm"></div>
              <div className="w-2 h-4 bg-muted rounded-sm"></div>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

export default VapiVoiceControls;