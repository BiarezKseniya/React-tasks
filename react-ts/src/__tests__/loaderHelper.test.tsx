import { GetServerSidePropsContext } from 'next';
import { loadPokemonList } from '@/util/loadHelper';
import { store } from '@/store/store';
import { waitFor } from '@testing-library/react';
import { PokemonPageData } from '@/util/interfaces';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

interface GalleryPageProps {
  searchValue: string;
  currentPage: number;
  pageLimit: number;
  data: PokemonPageData | undefined;
  error: FetchBaseQueryError | SerializedError | undefined;
}

describe('loadPokemonList', () => {
  it('loads pokemon list with default parameters', async () => {
    const context = {
      query: { currentPage: 1 },
    } as unknown as GetServerSidePropsContext;

    let result: GalleryPageProps;
    await waitFor(async () => {
      result = await loadPokemonList(context, store);

      expect(result.searchValue).toEqual('');
      expect(result.currentPage).toEqual(1);
      expect(result.pageLimit).toEqual(10);
      expect(result.data?.pokemonData.length).toEqual(10);
      expect(result.error).toBeUndefined();
    });
  });
});
