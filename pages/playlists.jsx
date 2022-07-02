import PageHeader from "@/components/PageHeader";
import { ListPlaylists, NewPlaylistButton } from "@/components/Playlists";

// Default
// ----------------------------------------------------------------------------

export default function Playlists() {
  return (
    <>
      <PageHeader title="Playlists" actions={<NewPlaylistButton fullSize />} />
      <ListPlaylists />
    </>
  );
}

// Config
// ----------------------------------------------------------------------------

export async function getStaticProps() {
  return {
    props: {
      maxWidth: "max-w-screen-md",
      PageTitle: "Playlists"
    }
  };
}
