// import Head from 'next/head';
// import Image from 'next/image';
// import { Inter } from 'next/font/google';
// import Header from '@/components/header/Header';
import Gallery from '@/components/gallery/Gallery';
import Layout from '@/components/layout/Layout';

const Home = () => {
  // const [urlParams, setUrlParams] = useSearchParams();

  // useEffect(() => {
  //   if (Array.from(urlParams).length === 0) {
  //     setUrlParams({ page: GalleryPage.defaultPage.toString() });
  //   }
  // }, [urlParams, setUrlParams]);

  return (
    <Layout>
      <Gallery />
    </Layout>
  );
};

export default Home;
