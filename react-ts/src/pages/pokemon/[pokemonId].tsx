import ModalOutlet from '@/components/modal-outlet/ModalOutlet';
import wrapper from '@/store/store';
import { apiSlice, getRunningQueriesThunk } from '@/store/slices/apiSlice';
import Gallery from '@/components/gallery/Gallery';
import Header from '@/components/header/Header';
import { loadPokemonList } from '@/util/loadHelper';
import { ModalPageProps, PageProps } from '@/util/interfaces';

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const pokemonId = context.query.pokemonId;
    const loadModal = await store.dispatch(
      apiSlice.endpoints.fetchPokemonDetails.initiate(pokemonId)
    );

    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    const loadGallery = await loadPokemonList(context, store);

    return {
      props: {
        currentPage: loadGallery.currentPage,
        pageLimit: loadGallery.pageLimit,
        searchValue: loadGallery.searchValue,
        data: loadGallery.data || null,
        error: loadGallery.error || null,
        modalData: loadModal.data || null,
        modalError: loadModal.error || null,
      },
    };
  }
);

const PokemonPage = ({
  currentPage,
  data,
  error,
  searchValue,
  pageLimit,
  modalData,
  modalError,
}: ModalPageProps & PageProps) => {
  return (
    <>
      <Header searchValue={searchValue} />
      <main>
        <Gallery
          data={data}
          error={error}
          pageLimit={pageLimit}
          currentPage={currentPage}
        />
        <ModalOutlet
          modalData={modalData}
          modalError={modalError}
          currentPage={currentPage}
        />
      </main>
    </>
  );
};

export default PokemonPage;
