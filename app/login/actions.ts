'use server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { Provider } from '@supabase/supabase-js'
import { getURL } from '@/utils/helpers'
export async function Login(formData: FormData) {
  const supabase = createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }
  const { data: userCheck, error: userError } = await supabase
  .from('users')
  .select('email')
  .eq('email', data.email)
  .maybeSingle();
  console.log(userCheck)
  if (userError || !userCheck) {
    console.error('User not found:', userError?.message);
    redirect('/login?message=Invalid Authentication Credentials');
    return;
  }
  try {
    const { error: authError } = await supabase.auth.signInWithPassword(data);
  
    if (authError) {
      console.error('Authentication Error:', authError);
      console.error('Email:', data.email);
      redirect('/login?message=Invalid Authentication Credentials');
      return;
    }
  
    revalidatePath('/', 'layout');
    redirect('/tasks');
  } catch (error) {
    console.error('Unexpected error:', error);
    redirect('/login?message=Something went wrong. Please try again.');
  }  
}

export async function logOut() {
  const supabase = createClient()
  await supabase.auth.signOut()
  redirect('/login')
}
export async function oAuthSignIn(provider : Provider){
  if(!provider){
    return redirect ('/login?mesage=No Provider selected')
  }
  const supabase = createClient()
  const redirectURL = getURL('/auth/callback')
  const {data , error} = await supabase.auth.signInWithOAuth({
    provider,
    options:{
      redirectTo:redirectURL,
    }
  })
  if (error) {
    redirect('/login?mesage=Could not Authenticate the user  ')
  }
  return redirect(data.url)
}