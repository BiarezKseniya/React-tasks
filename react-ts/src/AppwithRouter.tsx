import App from './App';
import './index.css';
import ErrorBoundary from './components/error-boundary/ErrorBoundary';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import ModalOutlet from './components/modal-outlet/ModalOutlet';
import NotFound from './components/not-found/NotFound';

export const appRoutes = (
  <>
    <Route
      path="/"
      element={
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      }
    >
      <Route path="modal" element={<ModalOutlet />}></Route>
    </Route>
    <Route path="*" element={<NotFound />}></Route>
  </>
);

const router = createBrowserRouter(createRoutesFromElements(appRoutes));

export const AppWithRouter = () => {
  return <RouterProvider router={router} />;
};
