import Layout from '@/components/layout/Layout';
import { apiSlice, getRunningQueriesThunk } from '@/store/slices/apiSlice';
import wrapper from '@/store/store';

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    debugger;
    const state = store.getState();
    const pageLimit = state.page.pageLimit;
    const pageFromUrl = Number(context.query.currentPage);
    const currentPage = pageFromUrl || state.page.currentPage;
    const offset = (currentPage - 1) * pageLimit;

    store.dispatch(
      apiSlice.endpoints.fetchPokemonList.initiate({
        offset,
        limit: pageLimit,
      })
    );

    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    return {
      props: {
        initialPage: pageFromUrl,
      },
    };
  }
);

const GalleryPage = ({ initialPage }: { initialPage: number }) => {
  return <Layout initialPage={initialPage} />;
};

export default GalleryPage;
