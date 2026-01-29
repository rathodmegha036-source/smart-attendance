import { supabase } from '@/lib/supabaseClient';
import { isQRValid } from '@/lib/qr';
import { getAttendanceStatus } from '@/lib/timeLogic';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const { qrToken } = await req.json();

  if (!isQRValid(qrToken)) {
    return NextResponse.json({ error: 'QR expired' }, { status: 400 });
  }

  const sessionId = qrToken.split('.')[0];

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { data: session } = await supabase
    .from('sessions')
    .select('*')
    .eq('id', sessionId)
    .eq('is_active', true)
    .single();

  if (!session) {
    return NextResponse.json({ error: 'Session not active' }, { status: 400 });
  }

  const status = getAttendanceStatus(session.start_time);

  if (!status) {
    return NextResponse.json({ error: 'Attendance closed' }, { status: 403 });
  }

  const { error } = await supabase.from('attendance').insert({
    session_id: session.id,
    student_id: user.id,
    status
  });

  if (error) {
    return NextResponse.json({ error: 'Already marked' }, { status: 409 });
  }

  return NextResponse.json({ success: true, status });
}