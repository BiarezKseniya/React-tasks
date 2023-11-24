import '@/styles/globals.css';
import '@/styles/Skeleton.css';
import '@/styles/DetailedCard.css';
import '@/styles/SmallCard.css';
import type { AppProps } from 'next/app';
import wrapper from '@/store/store';
import Layout from '@/components/layout/Layout';

export function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default wrapper.withRedux(App);
