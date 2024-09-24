import { gitHubLogin, signup } from './actions'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function LoginPage() {
  const supabase = await createClient()
    
  const {data :{user}} =await supabase.auth.getUser()

  if(user){
      return redirect('/tasks')
  }

  return (
    <div className='flex justify-center items-center h-screen '>
      <div>
        <form className='flex flex-col w-96 bg-gray-300 text-black p-4'>
          <label htmlFor="email" className='m-2'>Email:</label>
          <input id="email" name="email" type="email"  className='m-2' required />
          <label htmlFor="password" className='m-2'> Password:</label>
          <input id="password" name="password" type="password" className='m-2' required />
          <button formAction={gitHubLogin} className='m-2'>Log in</button>
          <button formAction={signup} className='m-2'>Sign up</button>
        </form>
      </div>
    </div>
  )
}