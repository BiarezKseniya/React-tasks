import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import ControlledForm from './components/forms/controlled-form/ControlledForm';
import UncontrolledForm from './components/forms/uncontrolled-form/UncontrolledForm';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';

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
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
