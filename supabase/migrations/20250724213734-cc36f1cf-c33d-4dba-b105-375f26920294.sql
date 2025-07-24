-- Fix Critical Role Escalation Vulnerability
-- Update profiles table policy to prevent role changes by regular users
DROP POLICY IF EXISTS "Users can update their own profile except role" ON public.profiles;

-- Create new policy that completely prevents role changes by regular users
CREATE POLICY "Users can update their own profile except role" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = user_id)
WITH CHECK (
  auth.uid() = user_id AND 
  role = (SELECT role FROM public.profiles WHERE user_id = auth.uid())
);

-- Create admin-only role management function
CREATE OR REPLACE FUNCTION public.admin_update_user_role(target_user_id uuid, new_role text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  -- Check if current user is admin
  IF NOT public.is_admin() THEN
    RAISE EXCEPTION 'Access denied: Admin privileges required';
  END IF;
  
  -- Validate role
  IF new_role NOT IN ('user', 'admin') THEN
    RAISE EXCEPTION 'Invalid role: %', new_role;
  END IF;
  
  -- Update role
  UPDATE public.profiles 
  SET role = new_role, updated_at = now()
  WHERE user_id = target_user_id;
  
  -- Log the action
  INSERT INTO public.audit_logs (user_id, action, table_name, record_id, new_values)
  VALUES (
    auth.uid(),
    'UPDATE_ROLE',
    'profiles',
    target_user_id,
    jsonb_build_object('role', new_role, 'changed_by', auth.uid())
  );
END;
$$;

-- Add constraint to prevent invalid roles
ALTER TABLE public.profiles 
ADD CONSTRAINT valid_role_check 
CHECK (role IN ('user', 'admin'));

-- Create audit trigger for profile changes
CREATE OR REPLACE FUNCTION public.audit_profile_changes()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  -- Only log if role changed
  IF OLD.role IS DISTINCT FROM NEW.role THEN
    INSERT INTO public.audit_logs (user_id, action, table_name, record_id, old_values, new_values)
    VALUES (
      auth.uid(),
      'ROLE_CHANGE_ATTEMPT',
      'profiles',
      NEW.user_id,
      jsonb_build_object('old_role', OLD.role),
      jsonb_build_object('new_role', NEW.role)
    );
  END IF;
  
  RETURN NEW;
END;
$$;

-- Create trigger for profile auditing
DROP TRIGGER IF EXISTS audit_profile_changes_trigger ON public.profiles;
CREATE TRIGGER audit_profile_changes_trigger
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.audit_profile_changes();

-- Add data retention policy for chat sessions (90 days)
CREATE OR REPLACE FUNCTION public.cleanup_old_chat_sessions()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  DELETE FROM public.chat_sessions 
  WHERE created_at < NOW() - INTERVAL '90 days';
END;
$$;