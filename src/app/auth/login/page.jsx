"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }

    const user = data.user;
    let profile = null;

    // Retry profile fetch (race condition safe)
    for (let i = 0; i < 3; i++) {
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      if (profileData) {
        profile = profileData;
        break;
      }

      if (profileError) {
        console.error("Profile fetch error:", profileError.message);
      }

      await new Promise((r) => setTimeout(r, 500));
    }

    if (!profile) {
      alert("Profile not found. Please contact admin.");
      setLoading(false);
      return;
    }

    router.push(profile.role === "teacher" ? "/teacher/dashboard" : "/student/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-300 px-6">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl p-14">
        <h1 className="text-4xl font-extrabold text-center mb-8 text-indigo-900">
          Smart Attendance Login
        </h1>

        <div className="space-y-8">
          <input
            className="w-full border border-indigo-300 p-5 rounded-xl text-lg font-semibold placeholder-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-400 focus:border-indigo-600 transition"
            placeholder="Email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="w-full border border-indigo-300 p-5 rounded-xl text-lg font-semibold placeholder-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-400 focus:border-indigo-600 transition"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-indigo-700 hover:bg-indigo-800 active:scale-95 text-white py-5 rounded-xl font-bold shadow-lg transition-transform"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>

      
      </div>
    </div>
  );
}

