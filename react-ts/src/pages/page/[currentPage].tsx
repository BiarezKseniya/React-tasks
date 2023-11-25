import Gallery from '@/components/gallery/Gallery';
import Header from '@/components/header/Header';
import wrapper from '@/store/store';
import { PageProps } from '@/util/interfaces';
import { loadPokemonList } from '@/util/loadHelper';

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const load = await loadPokemonList(context, store);

    return {
      props: {
        pageLimit: load.pageLimit,
        searchValue: load.searchValue,
        initialPage: load.currentPage,
        data: load.data || {},
      },
    };
  }
);

const GalleryPage = ({
  // initialPage,
  data,
  pageLimit,
  searchValue,
}: PageProps) => {
  // useEffect(() => {
  //   if (initialPage) {
  //     store.dispatch(setCurrentPage(initialPage));
  //   }
  // }, [initialPage]);
  return (
    <>
      <Header searchValue={searchValue} />
      <main>
        <Gallery data={data} pageLimit={pageLimit} />
      </main>
    </>
  );
};

export default GalleryPage;
