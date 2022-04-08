import Link from "next/link";
import { gql, useQuery } from "@apollo/client";
import ClientOnly from "../../components/ClientOnly";
import Empty from "../../components/Empty";
import MusicTabs from "../../components/MusicTabs";

// Components
// ----------------------------------------------------------------------------

const SongList = () => {
  const { data, loading, error } = useQuery(
    gql`
      query Entries {
        entries(section: "songs") {
          slug
          title
        }
      }
    `
  );

  if (loading) {
    return <mark>Loading...</mark>;
  }

  if (error) {
    console.error(error);
    return null;
  }

  return data.entries ? (
    <ul className="md:columns-2 lg:columns-3">
      {data.entries.map((song, i) => (
        <li key={song.slug}>
          {console.log(song)}
          <Link href={`/songs/${encodeURIComponent(song.slug)}`}>
            <a className="flex break-inside-avoid-column gap-8 hover:bg-hover p-8 border-t border-black transition group">
              <span className="opacity-25 group-hover:opacity-50 transition">
                {i + 1}
              </span>
              {song.title}
            </a>
          </Link>
        </li>
      ))}
    </ul>
  ) : (
    <Empty>Ain't no songs</Empty>
  );
};

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
