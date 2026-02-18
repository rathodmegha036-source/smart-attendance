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
      router.replace("/login");
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

  // ✅ Proper Logout Function
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (!error) {
      router.replace("/login"); // redirect to login
      router.refresh();         // clear session state
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
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-10 relative">
        
        {/* ✅ Logout Button */}
        <button
          onClick={handleLogout}
          className="absolute top-6 right-6 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition"
        >
          Logout
        </button>

        <h1 className="text-4xl font-extrabold mb-4 text-center text-gray-900">
          Welcome, {profile?.full_name || "Student"} 👋
        </h1>

        <p className="text-center text-gray-700 text-lg mb-10">
          You are logged in as a student
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <a
            href="/student/scan"
            className="block bg-blue-600 text-white p-8 rounded-xl text-center font-semibold text-xl hover:bg-blue-700 transition-shadow shadow-md"
          >
            📷 Scan Attendance
          </a>

          <a
            href="/student/history"
            className="block bg-green-600 text-white p-8 rounded-xl text-center font-semibold text-xl hover:bg-green-700 transition-shadow shadow-md"
          >
            📊 Attendance History
          </a>
        </div>
      </div>
    </div>
  );
}
