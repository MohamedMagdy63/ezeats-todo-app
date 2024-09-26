import { createClient } from "@/app/utils/supabase/server";
import { NextApiRequest, NextApiResponse } from 'next';

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
export async function DeleteTask(id: number) {
  const supabase = createClient();
  const { error } = await supabase
    .from('tasks')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting task:', error.message);
    return { success: false, error: error.message };
  }

  return { success: true, error: null };
}

