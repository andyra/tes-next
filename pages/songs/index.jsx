import ClientOnly from "../../components/ClientOnly";
import MusicTabs from "../../components/MusicTabs";
import SongList from "./components/SongList";

// Default
// ----------------------------------------------------------------------------

export default function SongsPage() {
  return (
    <>
      <MusicTabs page="Songs" />
      <section className="border border-primary-25 p-24">
        Filter by:
        <div>Type (Original/Cover)</div>
      </section>
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
