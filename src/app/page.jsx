import Navbar from "@/components/Navbar.jsx";
import Footer from "@/components/Footter.jsx";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <Navbar />

      {/* HERO */}
      <section className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-12 items-center">

          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Smart QR-Based Attendance System
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              A secure, time-bound QR attendance system designed to eliminate
              proxy attendance and manual roll calls in classrooms.
            </p>

            <div className="flex gap-4">
              <Link
                href="/auth/register"
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-100 transition"
              >
                Get Started
              </Link>
              <Link
                href="/auth/login"
                className="border border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition"
              >
                Login
              </Link>
            </div>
          </div>

          <div className="bg-white backdrop-blur-md p-6 rounded-xl shadow-lg">
            <ul className="space-y-3 text-violet-800 text-2xl">
              <li>✔ QR refreshes every 30 seconds</li>
              <li>✔ Time-based attendance logic</li>
              <li>✔ Student & Teacher dashboards</li>
              <li>✔ Proxy-proof & secure</li>
            </ul>
          </div>

        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">
          How It Works
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-blue-300 shadow rounded-xl p-6 text-center">
            <h3 className="font-semibold mb-2 text-2xl">
              Teacher Starts Session
            </h3>
            <p className="text-violet-700 text-xl">
              Teacher initiates an attendance session and generates a time-limited QR.
            </p>
          </div>

          <div className="bg-blue-300 shadow rounded-xl p-6 text-center">
            <h3 className="font-semibold text-2xl mb-2">
              Student Scans QR
            </h3>
            <p className="text-violet-700 text-xl">
              Students scan the QR within a limited time window.
            </p>
          </div>

          <div className="bg-blue-300 shadow rounded-xl p-6 text-center">
            <h3 className="font-semibold text-2xl mb-2">
              Attendance Recorded
            </h3>
            <p className="text-violet-700 text-xl">
              Attendance status is automatically marked and stored securely.
            </p>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why This System is Different
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-blue-500 p-6 rounded-xl shadow text-2xl">
              ⏱ Time-based Present / Late logic
            </div>
            <div className="bg-blue-500 p-6 rounded-xl shadow text-2xl">
              🔐 QR valid only for limited seconds
            </div>
            <div className="bg-blue-500 p-6 rounded-xl shadow text-2xl">
              📊 Automatic attendance reports
            </div>
            <div className="bg-blue-500 p-6 rounded-xl shadow text-2xl">
              🚫 Prevents proxy attendance
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
