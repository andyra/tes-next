import PageTitle from "../components/PageTitle";
import { ListPlaylists, NewPlaylistButton } from "../components/Playlists";

// Default
// ----------------------------------------------------------------------------

export default function Playlists() {
  return (
    <>
      <PageTitle actions={<NewPlaylistButton fullSize />}>Playlists</PageTitle>
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
      pageTitle: "Playlists"
    }
  };
}
