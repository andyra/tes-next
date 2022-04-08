import ClientOnly from "../../components/ClientOnly";
import MusicTabs from "../../components/MusicTabs";
import AlbumList from "./components/AlbumList";

// Default
// ----------------------------------------------------------------------------

export default function AlbumsPage() {
  return (
    <>
      <MusicTabs page="Albums" />
      <ClientOnly>
        <AlbumList />
      </ClientOnly>
    </>
  );
}

// Config
// ----------------------------------------------------------------------------

export async function getStaticProps() {
  return {
    props: {
      pageTitle: "Albums"
    }
  };
}
