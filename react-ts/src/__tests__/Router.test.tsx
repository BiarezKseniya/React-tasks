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
