import { createClient } from "@/utils/supabase/server";

export async function GetTasks(email: string) {
  const supabase = createClient();
  const { data: tasks, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('user_email', email);

  if (error) {
    console.error('Error fetching tasks:', error.message);
    return { tasks: [], error: error.message };
  }

  if (!tasks || tasks.length === 0) {
    return { tasks: [], error: 'No tasks found' };
  }

  return { tasks, error: null };
}

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