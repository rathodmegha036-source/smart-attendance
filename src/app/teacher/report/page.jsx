"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function ReportPage() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchReport();
  }, []);

  const fetchReport = async () => {
    setLoading(true);

    // ✅ Get logged-in teacher
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setRecords([]);
      setLoading(false);
      return;
    }

    // ✅ Get sessions created by this teacher
    const { data: teacherSessions, error: sessionError } = await supabase
      .from("sessions")
      .select("id")
      .eq("teacher_id", user.id);

    if (sessionError || !teacherSessions || teacherSessions.length === 0) {
      setRecords([]);
      setLoading(false);
      return;
    }

    const sessionIds = teacherSessions.map((s) => s.id);

    // ✅ Get attendance only for teacher’s sessions
    const { data, error } = await supabase
      .from("attendance")
      .select(`
        id,
        scanned_at,
        status,
        student:profiles!attendance_student_id_fkey (
          full_name
        ),
        sessions (
          subject
        )
      `)
      .in("session_id", sessionIds)
      .order("scanned_at", { ascending: false });

    if (error) {
      console.error("Report error:", error);
      setRecords([]);
    } else {
      setRecords(data || []);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-10">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <div className="mb-6 flex justify-start">
          <button
            onClick={() => router.push("/teacher/dashboard")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg shadow-md transition"
          >
            ← Back to Teacher Dashboard
          </button>
        </div>

        <h1 className="text-3xl font-bold mb-6 text-center">
          Attendance Report
        </h1>

        {loading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 text-left text-sm uppercase tracking-wide text-gray-600">
                  <th className="p-4">Student</th>
                  <th className="p-4">Subject</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Time</th>
                </tr>
              </thead>

              <tbody>
                {records.length === 0 && (
                  <tr>
                    <td colSpan="4" className="p-6 text-center text-gray-500">
                      No attendance records found
                    </td>
                  </tr>
                )}

                {records.map((r) => (
                  <tr
                    key={r.id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="p-4 font-medium">
                      {r.student?.full_name || "Unknown"}
                    </td>

                    <td className="p-4">{r.sessions?.subject || "N/A"}</td>

                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          r.status === "present"
                            ? "bg-green-100 text-green-700"
                            : r.status === "late"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {r.status}
                      </span>
                    </td>

                    <td className="p-4 text-gray-600 text-sm">
                      {new Date(r.scanned_at).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

