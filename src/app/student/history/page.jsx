"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function StudentHistoryPage() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetchHistory();
  }, []);

  async function fetchHistory() {
    setLoading(true);
    setError("");

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setError("Please login to view attendance history.");
      setLoading(false);
      return;
    }

    // ✅ FIX: Filter by logged-in student
    const { data, error } = await supabase
      .from("attendance")
      .select(`
        id,
        status,
        scanned_at,
        sessions:session_id (
          subject
        )
      `)
      .eq("student_id", user.id) // 🔥 THIS LINE FIXES IT
      .order("scanned_at", { ascending: false });

    if (error) {
      console.error(error);
      setError("Failed to load attendance history.");
      setRecords([]);
    } else {
      setRecords(data || []);
    }

    setLoading(false);
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="mb-6">
        <button
          onClick={() => router.push("/student/dashboard")}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition"
        >
          ← Back to Dashboard
        </button>
      </div>

      <h1 className="text-3xl font-semibold mb-6 text-center">
        Attendance History
      </h1>

      {loading ? (
        <p className="text-center text-gray-600 text-lg">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-600 text-lg">{error}</p>
      ) : records.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          No attendance records found.
        </p>
      ) : (
        <table className="w-full border rounded-lg shadow-md">
          <thead className="bg-blue-100">
            <tr>
              <th className="p-4 text-left font-medium text-gray-700">
                Subject
              </th>
              <th className="p-4 text-left font-medium text-gray-700">
                Status
              </th>
              <th className="p-4 text-left font-medium text-gray-700">
                Time
              </th>
            </tr>
          </thead>
          <tbody>
            {records.map((r) => (
              <tr key={r.id} className="border-t hover:bg-blue-50 transition">
                <td className="p-4">{r.sessions?.subject}</td>
                <td className="p-4 capitalize">{r.status}</td>
                <td className="p-4">
                  {new Date(r.scanned_at).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
