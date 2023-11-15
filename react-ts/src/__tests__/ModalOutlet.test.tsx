import { fireEvent, render, screen } from '@testing-library/react';
import ModalOutlet from '../components/modal-outlet/ModalOutlet';
import { MemoryRouter } from 'react-router-dom';

test('clicking the close button hides the component', () => {
  const pokemonId = 1;

  render(
    <MemoryRouter initialEntries={['/', `/modal?pokemon=${pokemonId}`]}>
      <ModalOutlet />
    </MemoryRouter>
  );

  fireEvent.click(screen.getByRole('button', { name: /close/i }));
  expect(window.location.pathname + window.location.search).toBe('/');
});
