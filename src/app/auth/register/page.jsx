"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function RegisterPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          role: role, // student | teacher
        },
      },
    });

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }

    alert("Registered successfully! Please login.");
    router.push("/auth/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-300 px-6">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl p-14">
        <h1 className="text-4xl font-extrabold text-center mb-8 text-indigo-900">
          Create Account
        </h1>

        <div className="space-y-8">
          <input
            className="w-full border border-indigo-300 p-5 rounded-xl text-lg font-semibold placeholder-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-400 focus:border-indigo-600 transition"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />

          <input
            className="w-full border border-indigo-300 p-5 rounded-xl text-lg font-semibold placeholder-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-400 focus:border-indigo-600 transition"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="w-full border border-indigo-300 p-5 rounded-xl text-lg font-semibold placeholder-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-400 focus:border-indigo-600 transition"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <select
            className="w-full border border-indigo-300 p-5 rounded-xl text-lg font-semibold placeholder-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-400 focus:border-indigo-600 transition"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
          </select>

          <button
            onClick={handleRegister}
            disabled={loading}
            className="w-full bg-indigo-700 hover:bg-indigo-800 active:scale-95 text-white py-5 rounded-xl font-bold shadow-lg transition-transform"
          >
            {loading ? "Creating account..." : "Register"}
          </button>
        </div>
      </div>
    </div>
  );
}

