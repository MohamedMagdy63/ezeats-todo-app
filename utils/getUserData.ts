import { createClient } from './supabase/server'; // Adjust this path as needed

export const getUserData = async () => {
  const supabase = createClient();

  // Get the current session
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error) {
    console.error('Error getting session:', error.message);
    return null;
  }

  // Retrieve the user's email from the session
  const { user } = session || {};

  return user; // This will contain the user's details, including email
};
