"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function StudentDashboard() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      router.replace("/auth/login");
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

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      router.replace("/auth/login");
      router.refresh();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg font-medium">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-10">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-10">
        <h1 className="text-4xl font-extrabold mb-4 text-center text-gray-900">
          Welcome, {profile?.full_name || "Student"} 👋
        </h1>

        <p className="text-center text-gray-700 text-lg mb-10">
          You are logged in as a student
        </p>

        {/* Card Style Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <a
            href="/student/scan"
            className="bg-blue-600 hover:bg-blue-700 text-white p-8 rounded-xl text-center font-semibold text-xl transition shadow-md"
          >
            📷
            <div className="mt-2">Scan Attendance</div>
          </a>

          <a
            href="/student/history"
            className="bg-green-600 hover:bg-green-700 text-white p-8 rounded-xl text-center font-semibold text-xl transition shadow-md"
          >
            📊
            <div className="mt-2">Attendance History</div>
          </a>

          <button
            onClick={handleLogout}
            className="bg-gray-700 hover:bg-gray-800 text-white p-8 rounded-xl text-center font-semibold text-xl transition shadow-md"
          >
            🚪
            <div className="mt-2">Logout</div>
          </button>
        </div>
      </div>
    </div>
  );
}
