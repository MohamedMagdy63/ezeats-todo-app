import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { task_name, description, task_priority, user_email } = await req.json();

  if (!task_name || !user_email) {
    return NextResponse.json({ success: false, error: 'Task name and user email are required' }, { status: 400 });
  }

  const supabase = createClient();

  const { error } = await supabase
    .from('tasks')
    .insert([
      {
        task_name,
        description,
        task_priority,
        user_email,
      },
    ]);

  if (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
