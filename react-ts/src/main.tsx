import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import ErrorBoundary from './components/error-boundary/ErrorBoundary';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

const router = createBrowserRouter(
  createRoutesFromElements(<Route path="/" element={<App />} />)
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  </React.StrictMode>
);
