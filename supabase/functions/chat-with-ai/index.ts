import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatRequest {
  message: string;
  sessionId?: string;
  userId?: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Input validation and sanitization
    const contentType = req.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('Content-Type must be application/json');
    }

    const body = await req.text();
    if (body.length > 10000) { // 10KB limit
      throw new Error('Request body too large');
    }

    const { message, sessionId, userId }: ChatRequest = JSON.parse(body);

    if (!message || typeof message !== 'string') {
      throw new Error('Message is required and must be a string');
    }

    if (message.length > 2000) {
      throw new Error('Message too long (max 2000 characters)');
    }

    // Sanitize message content
    const sanitizedMessage = message.trim().replace(/[<>]/g, '');
    
    if (!sanitizedMessage) {
      throw new Error('Message cannot be empty after sanitization');
    }

    // Get or create chat session
    let session;
    if (sessionId && userId) {
      const { data } = await supabase
        .from('chat_sessions')
        .select('*')
        .eq('id', sessionId)
        .eq('user_id', userId)
        .single();
      
      session = data;
    }

    const chatHistory: ChatMessage[] = session?.session_data || [];
    
    // Add user message to history
    chatHistory.push({ role: 'user', content: sanitizedMessage });

    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { 
            role: 'system', 
            content: `You are Lexi, an AI business assistant created by SmartBiz.AI. You help businesses with:
            - Customer service automation
            - Lead generation and qualification
            - Appointment scheduling
            - Sales support
            - Business insights and analytics
            
            Be helpful, professional, and focus on business solutions. Keep responses concise but informative.` 
          },
          ...chatHistory
        ],
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const data = await response.json();
    const assistantMessage = data.choices[0].message.content;

    // Add assistant response to history
    chatHistory.push({ role: 'assistant', content: assistantMessage });

    // Save or update chat session
    if (userId) {
      if (session) {
        await supabase
          .from('chat_sessions')
          .update({ session_data: chatHistory })
          .eq('id', sessionId);
      } else {
        const { data: newSession } = await supabase
          .from('chat_sessions')
          .insert({
            user_id: userId,
            session_data: chatHistory,
          })
          .select()
          .single();
        
        session = newSession;
      }
    }

    return new Response(JSON.stringify({ 
      message: assistantMessage,
      sessionId: session?.id,
      chatHistory 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: any) {
    console.error('Error in chat-with-ai function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});