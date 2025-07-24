-- Fix function search_path security warnings by setting secure search_path

-- Update get_current_user_role function with secure search_path
CREATE OR REPLACE FUNCTION public.get_current_user_role()
 RETURNS text
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  SELECT role FROM public.profiles WHERE user_id = auth.uid();
$function$;

-- Update is_admin function with secure search_path
CREATE OR REPLACE FUNCTION public.is_admin()
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  SELECT COALESCE(public.get_current_user_role() = 'admin', false);
$function$;