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
    // Input validation and sanitization
    const contentType = req.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('Content-Type must be application/json');
    }

    const body = await req.text();
    if (body.length > 5000) { // 5KB limit
      throw new Error('Request body too large');
    }

    const { 
      name, 
      email, 
      company, 
      phone, 
      preferred_date, 
      preferred_time, 
      message, 
      userId 
    }: DemoRequest = JSON.parse(body);

    if (!name || !email) {
      throw new Error('Name and email are required');
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error('Invalid email format');
    }

    // Sanitize inputs
    const sanitizedName = name.trim().slice(0, 100);
    const sanitizedEmail = email.trim().toLowerCase().slice(0, 255);
    const sanitizedCompany = company?.trim().slice(0, 100);
    const sanitizedPhone = phone?.trim().slice(0, 20);
    const sanitizedMessage = message?.trim().slice(0, 1000);

    if (!sanitizedName || !sanitizedEmail) {
      throw new Error('Required fields cannot be empty after sanitization');
    }

    // Insert demo booking
    const { data, error } = await supabase
      .from('demo_bookings')
      .insert({
        user_id: userId || null,
        name: sanitizedName,
        email: sanitizedEmail,
        company: sanitizedCompany,
        phone: sanitizedPhone,
        preferred_date: preferred_date || null,
        preferred_time: preferred_time || null,
        message: sanitizedMessage,
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