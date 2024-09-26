import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/app/utils/supabase/server'; // Adjust this path if necessary

export async function POST(req: NextRequest) {
  const { id } = await req.json();

  if (!id) {
    return NextResponse.json({ success: false, error: 'Task ID is required' }, { status: 400 });
  }

  const supabase = createClient();

  const { error } = await supabase
    .from('tasks')
    .delete()
    .eq('id', id); // Deleting by task ID

  if (error) {
    console.error('Error deleting task:', error.message);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
