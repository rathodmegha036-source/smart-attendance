import { supabase } from '@/lib/supabaseClient';
import { generateQRToken } from '@/lib/qr';
import { NextResponse } from 'next/server';

export async function GET() {
  const { data: session } = await supabase
    .from('sessions')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  if (!session) {
    return NextResponse.json({ error: 'No active session' }, { status: 404 });
  }

  const token = generateQRToken(session.id);

  await supabase
    .from('sessions')
    .update({ qr_token: token })
    .eq('id', session.id);

  return NextResponse.json({ token });
}