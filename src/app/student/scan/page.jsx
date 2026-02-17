"use client";

import { useState } from "react";
import QRScanner from "@/components/QRScanner";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function ScanPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleScan = async (token) => {
    if (!token) return;

    setLoading(true);
    setError("");
    setSuccess(false);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setError("Please login again");
      setLoading(false);
      return;
    }

    // ✅ CHANGED PART STARTS HERE
    const { data: sessions, error: sessionError } = await supabase
      .from("sessions")
      .select("id")
      .eq("qr_token", token)
      .eq("is_active", true);

    if (sessionError) {
      setError("Server error. Try again.");
      setLoading(false);
      return;
    }

    if (!sessions || sessions.length === 0) {
      setError("Invalid or expired QR code.");
      setLoading(false);
      return;
    }

    const session = sessions[0];
    // ✅ CHANGED PART ENDS HERE

    const { error: attendanceError } = await supabase
      .from("attendance")
      .insert({
        session_id: session.id,
        student_id: user.id,
      });

    if (attendanceError) {
      setError("Attendance already marked.");
    } else {
      setSuccess(true);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 flex flex-col items-center p-6">
      <div className="w-full max-w-lg mb-6 flex justify-start">
        <button
          onClick={() => router.push("/student/dashboard")}
          className="bg-white text-indigo-700 font-semibold px-5 py-2 rounded-full shadow-md hover:bg-indigo-50 transition"
        >
          ← Back to Dashboard
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-10 flex flex-col items-center text-center">
        <h1 className="text-4xl font-extrabold mb-8 text-gray-900 select-none">
          📸 Scan Attendance
        </h1>

        {!success ? (
          <>
            <div className="w-full max-w-md rounded-lg overflow-hidden shadow-lg border-4 border-indigo-400">
              <QRScanner onScan={handleScan} />
            </div>

            {loading && (
              <p className="mt-6 text-indigo-700 font-semibold animate-pulse">
                ⏳ Marking attendance...
              </p>
            )}

            {error && (
              <p className="mt-6 text-red-600 font-semibold tracking-wide">
                ❌ {error}
              </p>
            )}
          </>
        ) : (
          <>
            <p className="text-3xl text-green-600 font-extrabold mb-8 select-none">
              ✅ Attendance marked successfully!
            </p>
            <button
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-semibold shadow-lg transition-transform active:scale-95"
              onClick={() => {
                setSuccess(false);
                setError("");
              }}
            >
              Scan Again
            </button>
          </>
        )}
      </div>
    </div>
  );
}
