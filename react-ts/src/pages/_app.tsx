import '@/styles/globals.css';
import '@/styles/Skeleton.css';
import '@/styles/DetailedCard.css';
import '@/styles/SmallCard.css';
import type { AppProps } from 'next/app';
import wrapper from '@/store/store';

export function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default wrapper.withRedux(App);
