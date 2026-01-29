import Navbar from '@/components/Navbar.jsx';
import Footer from '@/components/Footter.jsx';


export default function StudentLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}