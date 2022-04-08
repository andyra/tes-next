import ClientOnly from "../../components/ClientOnly";
import MusicTabs from "../../components/MusicTabs";
import SongList from "./components/SongList";

// Default
// ----------------------------------------------------------------------------

export default function SongsPage() {
  return (
    <>
      <MusicTabs page="Songs" />
      <ClientOnly>
        <SongList />
      </ClientOnly>
    </>
  );
}

// Config
// ----------------------------------------------------------------------------

export async function getStaticProps() {
  return {
    props: {
      maxWidth: "max-w-none",
      pageTitle: "Songs"
    }
  };
}
