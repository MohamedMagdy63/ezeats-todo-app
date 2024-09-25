import { createClient } from "@/utils/supabase/server";

export async function getUserData() {
    const supabase = createClient();
    const { data: { user }, error } = await supabase.auth.getUser();
    
    if (error) {
      throw new Error('Error fetching user data');
    }
    if (user) {
      return { 
        email: user.email, 
        user_name: user.user_metadata?.user_name || user.email 
      };
    } else {
      throw new Error('User not logged in');
    }
}
export async function saveUserEmail(email: string, user_name: string) {
    const supabase = createClient();
    // Check if the email already exists in the database
    const { data: existingUser, error: selectError } = await supabase
      .from('users')
      .select('email')
      .eq('email', email)
      .maybeSingle();
  
    if (selectError) {
      console.error('Error fetching user:', selectError.message);
    }
  
    // If the email doesn't exist, insert it
    if (!existingUser) {
      const { error: insertError } = await supabase
        .from('users')
        .insert([{ email, user_name }]);
  
      if (insertError) {
        console.error('Error saving email:', insertError.message);
      } else {
        console.log('Email and username saved successfully');
      }
    } else {
      console.log('Email already exists in the database');
    }
}
  