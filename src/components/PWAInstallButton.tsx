import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Smartphone, Wifi, WifiOff, CheckCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useOfflineStatus } from '@/hooks/useOfflineStatus';

interface PWAInstallButtonProps {
  className?: string;
  showOfflineIndicator?: boolean;
}

const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({ 
  className, 
  showOfflineIndicator = false 
}) => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallButton, setShowInstallButton] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const isOffline = useOfflineStatus();

  useEffect(() => {
    // Check if app is already installed
    const checkInstallation = () => {
      if (window.matchMedia('(display-mode: standalone)').matches || 
          (window.navigator as any).standalone || 
          document.referrer.includes('android-app://')) {
        setIsInstalled(true);
        setShowInstallButton(false);
      }
    };

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallButton(true);
    };

    const handleAppInstalled = () => {
      setShowInstallButton(false);
      setDeferredPrompt(null);
      setIsInstalled(true);
      toast({
        title: "App Installed Successfully! 🎉",
        description: "Agent Lexi is now available on your home screen and can work offline",
      });
    };

    // Check installation status on mount
    checkInstallation();

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    try {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        toast({
          title: "Installing Agent Lexi... 📱",
          description: "The app will be available on your home screen shortly and work offline",
        });
      } else {
        toast({
          title: "Installation Cancelled",
          description: "You can install Agent Lexi anytime from your browser menu",
        });
      }
    } catch (error) {
      console.error('Installation failed:', error);
      toast({
        title: "Installation Failed",
        description: "Please try installing from your browser menu",
        variant: "destructive"
      });
    }
    
    setDeferredPrompt(null);
    setShowInstallButton(false);
  };

  // Show offline indicator if requested
  if (showOfflineIndicator && !showInstallButton) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        {isOffline ? (
          <>
            <WifiOff className="h-4 w-4 text-orange-500" />
            <span className="text-sm text-orange-500">Offline Mode</span>
          </>
        ) : (
          <>
            <Wifi className="h-4 w-4 text-green-500" />
            <span className="text-sm text-green-500">Online</span>
          </>
        )}
        {isInstalled && (
          <>
            <CheckCircle className="h-4 w-4 text-blue-500" />
            <span className="text-sm text-blue-500">App Installed</span>
          </>
        )}
      </div>
    );
  }

  if (!showInstallButton) return null;

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Button
        onClick={handleInstallClick}
        className="bg-primary hover:bg-primary/90 text-primary-foreground"
        id="pwa-install-button"
      >
        <Download className="h-4 w-4 mr-2" />
        Install App
      </Button>
      
      {showOfflineIndicator && (
        <div className="flex items-center gap-1">
          {isOffline ? (
            <>
              <WifiOff className="h-4 w-4 text-orange-500" />
              <span className="text-xs text-orange-500">Offline</span>
            </>
          ) : (
            <>
              <Wifi className="h-4 w-4 text-green-500" />
              <span className="text-xs text-green-500">Online</span>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default PWAInstallButton;