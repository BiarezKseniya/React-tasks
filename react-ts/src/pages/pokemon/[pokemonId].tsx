import ModalOutlet from '@/components/modal-outlet/ModalOutlet';
import wrapper from '@/store/store';
import { apiSlice, getRunningQueriesThunk } from '@/store/slices/apiSlice';
import Gallery from '@/components/gallery/Gallery';
import Header from '@/components/header/Header';
import { loadPokemonList } from '@/util/loadHelper';
import { PageProps } from '@/util/interfaces';

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const pokemonId = context.query.pokemonId;
    store.dispatch(apiSlice.endpoints.fetchPokemonDetails.initiate(pokemonId));

    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    const load = await loadPokemonList(context, store);

    return {
      props: {
        pageLimit: load.pageLimit,
        searchValue: load.searchValue,
        data: load.data || null,
        error: load.error || null,
      },
    };
  }
);

const PokemonPage = ({ data, error, searchValue, pageLimit }: PageProps) => {
  return (
    <>
      <Header searchValue={searchValue} />
      <main>
        <Gallery data={data} error={error} pageLimit={pageLimit} />
        <ModalOutlet />
      </main>
    </>
  );
};

export default PokemonPage;
