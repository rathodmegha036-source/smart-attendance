import Footer from '@/components/Footter.jsx';
import Navbar from '@/components/Navbar.jsx'

export default function TeacherLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}