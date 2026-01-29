"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function TeacherDashboard() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      return;
    }

    const { data } = await supabase
      .from("profiles")
      .select("full_name")
      .eq("id", user.id)
      .single();

    setProfile(data);
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
  <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-6">
    <div className="w-full max-w-6xl bg-white rounded-2xl shadow-xl p-12">
      <h1 className="text-3xl font-bold mb-2">
        Welcome, {profile?.full_name || "Teacher"} 👋
      </h1>

      <p className="text-gray-600 mb-10 text-lg">
        You are logged in as a teacher
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <a
          href="/teacher/start-session"
          className="flex flex-col items-center justify-center bg-green-600 text-white p-10 rounded-xl text-xl font-semibold hover:bg-green-700 transition shadow"
        >
          ▶
          <span className="mt-3">Start Session</span>
        </a>

        <a
          href="/teacher/report"
          className="flex flex-col items-center justify-center bg-blue-600 text-white p-10 rounded-xl text-xl font-semibold hover:bg-blue-700 transition shadow"
        >
          📊
          <span className="mt-3">View Reports</span>
        </a>

        <a
          href="/auth/login"
          className="flex flex-col items-center justify-center bg-gray-700 text-white p-10 rounded-xl text-xl font-semibold hover:bg-gray-800 transition shadow"
        >
          🚪
          <span className="mt-3">Logout</span>
        </a>
      </div>
    </div>
  </div>
);

}