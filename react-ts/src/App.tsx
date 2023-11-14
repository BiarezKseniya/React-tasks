import Gallery from './components/gallery/Gallery';
import Header from './components/header/Header';
import './App.css';
import { useEffect } from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';
import { AppProvider } from './components/context/AppState';
import { Provider } from 'react-redux';
import { store } from './store/store';

const App = () => {
  const [urlParams, setUrlParams] = useSearchParams();

  useEffect(() => {
    if (!urlParams.has('page') && !urlParams.has('front-page')) {
      setUrlParams({ page: '1' });
    }
  }, [urlParams, setUrlParams]);

  return (
    <AppProvider>
      <Provider store={store}>
        <Header />
        <main>
          <Gallery />
          <Outlet />
        </main>
      </Provider>
    </AppProvider>
  );
};

export default App;
