import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function GET(req) {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (!user || authError) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const isStudent = searchParams.get("student") === "true";

  // ✅ STUDENT HISTORY
  if (isStudent) {
    const { data, error } = await supabase
      .from("attendance")
      .select(
        `
        id,
        status,
        scanned_at,
        sessions ( subject )
      `
      )
      .eq("student_id", user.id)
      .order("scanned_at", { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(
      data.map((r) => ({
        id: r.id,
        subject: r.sessions?.subject ?? "N/A",
        status: r.status,
        created_at: r.scanned_at,
      }))
    );
  }

  // ✅ TEACHER REPORT
  const { data, error } = await supabase
    .from("attendance")
    .select(
      `
      id,
      status,
      scanned_at,
      profiles ( full_name ),
      sessions ( subject )
    `
    )
    .order("scanned_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(
    data.map((r) => ({
      id: r.id,
      student: r.profiles?.full_name ?? "Unknown",
      subject: r.sessions?.subject ?? "N/A",
      status: r.status,
      time: r.scanned_at,
    }))
  );
}
