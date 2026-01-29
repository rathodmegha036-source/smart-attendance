"use client";

import { useState } from "react";
import { v4 as uuid } from "uuid";
import { supabase } from "@/lib/supabaseClient";
import QRGenerator from "@/components/QRGenerator";
import { useRouter } from "next/navigation";

export default function StartSession() {
  const [subject, setSubject] = useState("");
  const [qrToken, setQrToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const startSession = async () => {
    if (!subject) {
      alert("Please enter subject name");
      return;
    }

    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const token = uuid();
    const now = new Date();
    const qrExpiry = new Date(now.getTime() + 30 * 1000);
    const sessionEnd = new Date(now.getTime() + 10 * 60 * 1000);

    await supabase.from("sessions").insert({
      teacher_id: user.id,
      subject,
      qr_token: token,
      start_time: now,
      end_time: sessionEnd,
      qr_expires_at: qrExpiry,
      is_active: true,
    });

    setQrToken(token);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-600 flex flex-col items-center justify-center p-8">
      {/* Back to Teacher Dashboard button */}
      <div className="w-full max-w-lg mb-8 flex justify-start">
        <button
          onClick={() => router.push("/teacher/dashboard")}
          className="bg-blue-700 hover:bg-blue-800 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition"
        >
          ← Back to Teacher Dashboard
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow-2xl p-12 w-full max-w-lg text-center">
        <h1 className="text-4xl font-extrabold mb-6 text-indigo-900 flex justify-center items-center gap-3">
          <span>📅</span> Start Attendance Session
        </h1>

        <p className="text-indigo-700 mb-10 text-lg font-medium">
          Generate a QR code for students to mark attendance
        </p>

        <input
          className="w-full border border-indigo-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400 rounded-lg p-5 mb-8 text-lg font-semibold text-indigo-900 placeholder-indigo-400 transition"
          placeholder="Subject Name (e.g. DBMS)"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />

        <button
          onClick={startSession}
          disabled={loading}
          className="w-full bg-indigo-700 hover:bg-indigo-800 active:scale-95 text-white py-4 rounded-lg font-bold shadow-lg transition-transform"
        >
          {loading ? "Starting..." : "Start Session"}
        </button>

        {qrToken && (
          <div className="mt-12">
            <p className="font-semibold text-green-700 text-2xl mb-5">
              Session Started ✅
            </p>

            <QRGenerator value={qrToken} />

            <p className="text-sm text-indigo-600 mt-4">
              Scan this QR within 30 seconds
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
