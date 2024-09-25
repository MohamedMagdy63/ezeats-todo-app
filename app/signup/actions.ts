
'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export async function signUp(formData: FormData) {
  const supabase = createClient()
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    user_name: formData.get('userName') as string,
  }
  const { data: existingUser, error: selectError } = await supabase
    .from('users')
    .select('email')
    .eq('email', data.email)
    .maybeSingle();

    if (selectError) {
      console.error('Error fetching user:', selectError.message);
    }
    const user_name = data.user_name
    const email = data.email
    const password = data.password
    
    // If the email doesn't exist, insert it
    if (!existingUser) {
      const { error: insertError } = await supabase
        .from('users')
        .insert([{ email, password,user_name }]);
  
      if (insertError) {
        console.error('Error saving email:', insertError.message);
      } else {
        console.log('Email and username saved successfully');
      }
    } else {
      console.log('Email already exists in the database');
    }
    if (selectError) {
      redirect('/signup?message=Invalid Authentication Credentials')
    }
  revalidatePath('/', 'layout')
  redirect('/login')
}
