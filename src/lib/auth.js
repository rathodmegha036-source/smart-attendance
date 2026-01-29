import { supabase } from './supabaseClient';



export async function signUp(email, password, full_name = "", role = "student") {
  const { data: { user }, error } = await supabase.auth.signUp({ email, password });

  if (error) {
    return { user: null, error };
  }

  if (user) {
    const { error: profileError } = await supabase
      .from('profiles')
      .insert({
        id: user.id,
        full_name,
        role,
      });

    if (profileError) {
      console.error('Profile creation error:', profileError.message);
    }
  }

  return { user, error };
}


export async function signIn(email, password) {
  const { user, error } = await supabase.auth.signIn({ email, password });
  return { user, error };
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  return error;
}

export function getUser() {
  return supabase.auth.user();
}