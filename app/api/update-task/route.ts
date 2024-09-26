import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST(req: Request) {
  const supabase = createClient(); // Create the Supabase client

  try {
    const { id, task_name, description, task_priority , is_completed } = await req.json(); // Parse the request body

    // Validate the incoming data
    if (!id || !task_name) {
      return NextResponse.json(
        { success: false, message: 'Task ID and name are required' },
        { status: 400 }
      );
    }

    // Update the task in the database
    const { error } = await supabase
      .from('tasks')
      .update({ 
        task_name, 
        description, 
        task_priority,
        is_completed
      })
      .eq('id', id); // Ensure the ID is used to match the task

    if (error) {
      throw new Error(error.message); // Throw an error if something went wrong
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating task:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update task' },
      { status: 500 }
    );
  }
}
