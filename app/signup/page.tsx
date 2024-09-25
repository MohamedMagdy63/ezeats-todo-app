import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Image from 'next/image'
import checklist from '@/assets/images/3d-checklist.png'
import Link from 'next/link'
import { signUp } from './actions'

export default async function SignupPage() {
  const supabase = await createClient()

  // Check if the user is already logged in
  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    return redirect('/login')
  }

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="flex flex-col md:flex-row items-center bg-white shadow-2xl rounded-xl overflow-hidden max-w-4xl w-full">
        {/* Image Section */}
        <div className="w-full md:w-1/2 p-4 md:p-10 flex justify-center">
          <Image 
            src={checklist} 
            alt='Check list Main image' 
            className="transform hover:scale-105 transition duration-500 max-w-full h-auto"
          />
        </div>

        {/* Form Section */}
        <div className="w-full md:w-1/2 p-6 md:p-12 bg-gradient-to-r from-gray-50 via-gray-100 to-gray-200">
          <form action={signUp} className="flex flex-col space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Ez-eats TodoApp Task</h2>
            <label htmlFor="email" className="text-sm font-medium text-gray-700">Your E-mail</label>
            <input 
              id="email" 
              name="email" 
              type="email" 
              className="p-4 border border-gray-300 text-black rounded-lg focus:ring-4 focus:ring-indigo-300 outline-none transition-shadow duration-300 w-full"
              placeholder="you@example.com"
              required 
            />
            <label htmlFor="userName" className="text-sm font-medium text-gray-700">Username</label>
            <input 
              id="userName" 
              name="userName" 
              type="text" 
              className="p-4 border border-gray-300 text-black rounded-lg focus:ring-4 focus:ring-indigo-300 outline-none transition-shadow duration-300 w-full"
              placeholder="Enter your username"
              required 
            />
            <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
            <input 
              id="password" 
              name="password" 
              type="password" 
              className="p-4 border border-gray-300 text-black rounded-lg focus:ring-4 focus:ring-indigo-300 outline-none transition-shadow duration-300 w-full"
              placeholder="••••••••"
              required 
            />
            {/* Sign-up Button */}
            <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
              <button 
                type="submit" 
                className="flex-1 py-4 text-lg font-semibold text-white bg-green-500 hover:bg-green-600 rounded-lg shadow-md transition-transform duration-300 transform hover:scale-105 focus:ring-4 focus:ring-green-400"
              >
                Sign up
              </button>
            </div>
          </form>
          <div className="text-blue-500 font-bold pt-3 underline">
            <p>
              <Link href='/login'>
                Back to Login page
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
