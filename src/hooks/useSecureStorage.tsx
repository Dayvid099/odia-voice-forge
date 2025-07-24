import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface SecureStorage {
  setApiKey: (service: string, key: string) => Promise<void>;
  getApiKey: (service: string) => Promise<string | null>;
  removeApiKey: (service: string) => Promise<void>;
  clearAll: () => Promise<void>;
}

// Simple client-side encryption for API keys
const encrypt = (text: string, key: string): string => {
  // Simple XOR encryption (for demo - use proper encryption in production)
  const encrypted = text.split('').map((char, i) => 
    String.fromCharCode(char.charCodeAt(0) ^ key.charCodeAt(i % key.length))
  ).join('');
  return btoa(encrypted);
};

const decrypt = (encrypted: string, key: string): string => {
  try {
    const text = atob(encrypted);
    return text.split('').map((char, i) => 
      String.fromCharCode(char.charCodeAt(0) ^ key.charCodeAt(i % key.length))
    ).join('');
  } catch {
    return '';
  }
};

export const useSecureStorage = (): SecureStorage => {
  const [encryptionKey, setEncryptionKey] = useState<string>('');

  useEffect(() => {
    // Generate a user-specific encryption key based on session
    const generateKey = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user?.id) {
        // Use user ID as part of encryption key
        setEncryptionKey(session.user.id.slice(0, 16));
      } else {
        // Fallback for non-authenticated users
        setEncryptionKey('fallback-key-123');
      }
    };
    generateKey();
  }, []);

  const setApiKey = async (service: string, key: string): Promise<void> => {
    if (!encryptionKey) return;
    
    try {
      const encrypted = encrypt(key, encryptionKey);
      localStorage.setItem(`secure_${service}`, encrypted);
    } catch (error) {
      console.error('Failed to store API key securely:', error);
    }
  };

  const getApiKey = async (service: string): Promise<string | null> => {
    if (!encryptionKey) return null;
    
    try {
      const encrypted = localStorage.getItem(`secure_${service}`);
      if (!encrypted) return null;
      
      return decrypt(encrypted, encryptionKey);
    } catch (error) {
      console.error('Failed to retrieve API key:', error);
      return null;
    }
  };

  const removeApiKey = async (service: string): Promise<void> => {
    localStorage.removeItem(`secure_${service}`);
  };

  const clearAll = async (): Promise<void> => {
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith('secure_')) {
        localStorage.removeItem(key);
      }
    });
  };

  return {
    setApiKey,
    getApiKey,
    removeApiKey,
    clearAll
  };
};