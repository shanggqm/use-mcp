import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { StarField } from '../backgrounds/StarField';

export default function Layout() {
  return (
    <div className="relative min-h-screen flex flex-col bg-void-950">
      {/* Global star field background */}
      <div className="fixed inset-0 z-0">
        <StarField quantity={60} speed={0.2} />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}
