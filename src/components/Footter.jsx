import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-24">
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-8">

        {/* Brand */}
        <div>
          <h3 className=" text-white mb-2 text-3xl">
            Smart Attendance System
          </h3>
          <p className="text-sm text-gray-400 text-3xl">
            QR + Time-based attendance system designed to eliminate proxy
            attendance and manual roll calls.
          </p>
        </div>

        {/* Links */}
        <div>
  <h4 className="text-white font-semibold mb-3 text-3xl">Quick Links</h4>

  <ul className="space-y-2 text-2xl">
    <li>
      <Link
        href="/auth/login"
        className="hover:underline"
      >
        Login
      </Link>
    </li>

    <li>
      <Link
        href="/auth/register"
        className="hover:underline"
      >
        Register
      </Link>
    </li>
  </ul>
</div>


        {/* Tech */}
        <div>
          <h4 className="text-white font-semibold mb-3 text-3xl">Built With</h4>
          <ul className="space-y-6 text-2xl">
            <li>⚛️ React + Next.js</li>
            <li>🎨 Tailwind CSS</li>
            <li>🛡 Supabase Auth</li>
            <li>📷 QR + Time Logic</li>
          </ul>
        </div>

      </div>

      <div className="border-t border-gray-800 py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Smart Attendance System · Final Year Project
      </div>
    </footer>
  );
}
