import { fireEvent, render, screen } from '@testing-library/react';
import { store } from '../store/store';
import { Provider } from 'react-redux';
import GalleryPage from '@/pages/page/[currentPage]';
import PokemonCardsData from './mockData/pokemonCardsData.json';
import mockRouter from 'next-router-mock';

test('updates URL query parameter when page changes', () => {
  render(
    <Provider store={store}>
      <GalleryPage
        currentPage={1}
        data={PokemonCardsData}
        pageLimit={10}
        searchValue=""
      />
    </Provider>
  );

  expect(mockRouter).toMatchObject({
    pathname: '/',
    query: {},
  });

  fireEvent.click(screen.getByText('>'));
  expect(mockRouter).toMatchObject({
    pathname: '/page/[currentPage]',
    query: { currentPage: '2' },
  });

  fireEvent.click(screen.getByText('>>'));
  expect(mockRouter).toMatchObject({
    pathname: '/page/[currentPage]',
    query: { currentPage: '102' },
  });
});
