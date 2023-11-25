import { apiSlice, getRunningQueriesThunk } from '@/store/slices/apiSlice';
import { Store } from '@/store/store';
import { GetServerSidePropsContext, NextPageContext } from 'next';
import { getCookieProps } from 'next-persist';
import { GalleryPage } from './enums';

export async function loadPokemonList(
  context: GetServerSidePropsContext,
  store: Store
) {
  let data;
  let searchValue = '';
  let pageLimit = GalleryPage.itemCount;

  const cookie = getCookieProps(context as unknown as NextPageContext);

  if (typeof cookie === 'object' && cookie !== null) {
    const cookieSearch = cookie?.searchValue;
    if (cookieSearch) {
      searchValue = JSON.parse(cookieSearch)?.searchValue;
    }
    const cookiePageLimit = cookie?.pageLimit;
    if (cookiePageLimit) {
      pageLimit = JSON.parse(cookiePageLimit)?.pageLimit;
    }
  }

  const pageFromUrl = Number(context.query.currentPage);
  const currentPage = pageFromUrl || 1;
  const offset = (currentPage - 1) * pageLimit;

  if (searchValue) {
    data = (
      await store.dispatch(
        apiSlice.endpoints.fetchPokemonSearch.initiate(searchValue)
      )
    )?.data;
  } else {
    data = (
      await store.dispatch(
        apiSlice.endpoints.fetchPokemonList.initiate({
          offset,
          limit: pageLimit,
        })
      )
    )?.data;
  }
  await Promise.all(store.dispatch(getRunningQueriesThunk()));

  return {
    searchValue,
    currentPage,
    pageLimit,
    data,
  };
}
