import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface DemoRequest {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  preferred_date?: string;
  preferred_time?: string;
  message?: string;
  userId?: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { 
      name, 
      email, 
      company, 
      phone, 
      preferred_date, 
      preferred_time, 
      message, 
      userId 
    }: DemoRequest = await req.json();

    if (!name || !email) {
      throw new Error('Name and email are required');
    }

    // Insert demo booking
    const { data, error } = await supabase
      .from('demo_bookings')
      .insert({
        user_id: userId || null,
        name,
        email,
        company,
        phone,
        preferred_date: preferred_date || null,
        preferred_time: preferred_time || null,
        message,
        status: 'pending',
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    console.log('Demo booking saved:', data);

    return new Response(JSON.stringify({ 
      success: true,
      message: 'Demo booking request received successfully',
      id: data.id 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: any) {
    console.error('Error in book-demo function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});