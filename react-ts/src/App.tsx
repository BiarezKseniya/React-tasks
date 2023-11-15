import Gallery from './components/gallery/Gallery';
import Header from './components/header/Header';
import './App.css';
import { useEffect } from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';
import { AppProvider } from './components/context/AppState';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { GalleryPage } from './util/enums';

const App = () => {
  const [urlParams, setUrlParams] = useSearchParams();

  useEffect(() => {
    if (Array.from(urlParams).length === 0) {
      setUrlParams({ page: GalleryPage.defaultPage.toString() });
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
