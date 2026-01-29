import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <Link href="/" className="text-3xl font-bold text-blue-600">
          SmartAttendance
        </Link>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8 text-2xl font-medium">
          <Link href="#how-it-works" className="text-gray-600 hover:text-blue-600">
            How it Works
          </Link>
          <Link href="#features" className="text-gray-600 hover:text-blue-600">
            Features
          </Link>
          <Link href="/auth/login" className="text-gray-600 hover:text-blue-600">
            Login
          </Link>
          <Link
            href="/auth/register"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Get Started
          </Link>
        </div>

      </div>
    </nav>
  );
}
