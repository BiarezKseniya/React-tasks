import Gallery from '@/components/gallery/Gallery';
import Header from '@/components/header/Header';
import wrapper from '@/store/store';
import { PageProps } from '@/util/interfaces';
import { loadPokemonList } from '@/util/loadHelper';
import { setCookieStore } from 'next-persist';

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const load = await loadPokemonList(context, store);

    return {
      props: {
        currentPage: load.currentPage,
        pageLimit: load.pageLimit,
        searchValue: load.searchValue,
        initialPage: load.currentPage,
        data: load.data || null,
        error: load.error || null,
      },
    };
  }
);

const GalleryPage = ({
  data,
  error,
  pageLimit,
  searchValue,
  currentPage,
}: PageProps) => {
  setCookieStore(
    { currentPage: ['currentPage'] },
    { currentPage: currentPage }
  );

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
      </main>
    </>
  );
};

export default GalleryPage;
