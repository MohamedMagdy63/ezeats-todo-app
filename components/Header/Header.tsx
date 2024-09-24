import { logOut } from "@/app/login/actions";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

export default async function Header() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  return (
    <header className="bg-transparent border-b fixed top-0 left-0 right-0 z-50 p-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo or App Name */}
        <Link href="/tasks" className="text-xl font-semibold text-white">
          Ez-eats TodoApp
        </Link>

        {/* User Info and Auth Actions */}
        <div className="flex items-center space-x-4">
          {user !== null ? (
            <form action={logOut} className="flex items-center space-x-4">
              <p className="text-gray-100">Welcome, {user.email}</p>
              <button
                type="submit"
                className="py-2 px-4 bg-red-800 text-white font-medium rounded-md hover:bg-red-900 transition duration-200"
              >
                Sign Out
              </button>
            </form>
          ) : (
            <Link
              href="/login"
              className="py-2 px-4 bg-gray-200 text-white font-medium rounded-md hover:bg-gray-300 transition duration-200"
            >
              Log In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
