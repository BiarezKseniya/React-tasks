import Gallery from './components/gallery/Gallery';
import Header from './components/header/Header';
import './App.css';
import { useEffect } from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';
import { AppProvider } from './components/context/AppState';

const App = () => {
  const [urlParams, setUrlParams] = useSearchParams();

  useEffect(() => {
    if (!urlParams.has('page') && !urlParams.has('front-page')) {
      setUrlParams({ page: '1' });
    }
  }, [urlParams, setUrlParams]);

  return (
    <AppProvider>
      <Header />
      <main>
        <Gallery />
        <Outlet />
      </main>
    </AppProvider>
  );
};

export default App;
