import { render, screen, waitFor } from '@testing-library/react';
import { appRoutes } from '../AppwithRouter';
import {
  createMemoryRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';

test('Ensure that the 404 page is displayed when navigating to an invalid route', async () => {
  const badRoute = '/some/bad/route';
  const router = createMemoryRouter(createRoutesFromElements(appRoutes), {
    initialEntries: [badRoute],
  });

  render(<RouterProvider router={router} />);

  await waitFor(() => {
    expect(
      screen.getByText(
        /It looks like the page that you are looking for doesn't exist/i
      )
    ).toBeDefined();
  });
});

test('Ensure that modal is displayed when navigating to a valid route', async () => {
  const modalRoute = '/modal?front-page=1&pokemon=1';
  const router = createMemoryRouter(createRoutesFromElements(appRoutes), {
    initialEntries: [modalRoute],
  });

  render(<RouterProvider router={router} />);

  await waitFor(() => {
    expect(screen.getByTestId('modal-outlet')).toBeDefined();
  });
});

test('Ensure that modal is not displayed when navigating to the main page', async () => {
  const mainRoute = '/';
  const router = createMemoryRouter(createRoutesFromElements(appRoutes), {
    initialEntries: [mainRoute],
  });

  render(<RouterProvider router={router} />);

  await waitFor(() => {
    expect(screen.queryByTestId('modal-outlet')).toBeNull();
  });
});
