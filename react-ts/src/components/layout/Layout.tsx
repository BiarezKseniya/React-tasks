import Header from '@/components/header/Header';
import Gallery from '@/components/gallery/Gallery';
import { ReactNode } from 'react';

interface LayoutProps {
  initialPage?: number;
  children?: ReactNode;
}

const Layout = ({ children, initialPage }: LayoutProps) => {
  return (
    <>
      <Header />
      <main>
        <Gallery initialPage={initialPage} />
        {children}
      </main>
    </>
  );
};

export default Layout;
