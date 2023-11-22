import Gallery from '@/components/gallery/Gallery';
import Layout from '@/components/layout/Layout';
import ModalOutlet from '@/components/modal-outlet/ModalOutlet';

const PokemonPage = () => {
  return (
    <Layout>
      <Gallery />
      <ModalOutlet />
    </Layout>
  );
};

export default PokemonPage;
