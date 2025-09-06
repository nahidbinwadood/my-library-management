import Footer from '@/shared/footer';
import Navbar from '@/shared/navbar';
import { Outlet, ScrollRestoration } from 'react-router';

const MainLayout = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-muted/20 ">
        <ScrollRestoration />
        <Navbar />
        <main className="flex-1 container max-w-screen-2xl mx-auto py-8 min-h-[calc(100vh-311px)] px-4 md:px-8 2xl:px-0">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default MainLayout;
