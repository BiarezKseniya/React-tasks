import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import ControlledForm from './components/forms/ControlledForm';
import UncontrolledForm from './components/forms/UncontrolledForm';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'controlled-form',
        element: <ControlledForm />,
      },
      {
        path: 'uncontrolled-form',
        element: <UncontrolledForm />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
