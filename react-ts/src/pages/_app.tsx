import '@/styles/globals.css';
import '@/styles/Skeleton.css';
import '@/styles/DetailedCard.css';
import '@/styles/SmallCard.css';
import type { AppProps } from 'next/app';
import wrapper from '@/store/store';
import ErrorBoundary from '@/components/error-boundary/ErrorBoundary';

export function App({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary>
      <Component {...pageProps} />
    </ErrorBoundary>
  );
}

export default wrapper.withRedux(App);
