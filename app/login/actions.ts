'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'
import { Provider } from '@supabase/supabase-js'
import { getURL } from '@/utils/helpers'

export async function gitHubLogin(formData: FormData) {
  const supabase = createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect('/login?message=Invalid Authentication Credentials')
  }

  revalidatePath('/', 'layout')
  redirect('/tasks')
}

export async function signup(formData: FormData) {
  const supabase = createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    redirect('/login?message=Invalid Signup Credentials')
  }

  revalidatePath('/', 'layout')
  redirect('/login')
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