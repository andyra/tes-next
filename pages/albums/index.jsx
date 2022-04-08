import Image from "next/image";
import Link from "next/link";
import { gql, useQuery } from "@apollo/client";
import ClientOnly from "../../components/ClientOnly";
import Empty from "../../components/Empty";
import MusicTabs from "../../components/MusicTabs";
import NiceDate from "../../components/NiceDate";

// Components
// ----------------------------------------------------------------------------

const AlbumList = () => {
  const { data, loading, error } = useQuery(
    gql`
      query Entries {
        entries(section: "albums") {
          slug
          title
          ... on albums_default_Entry {
            releaseDate
            artist {
              id
              title
            }
            albumType
            albumCoverArt {
              url
            }
          }
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
    <ul className="grid grid-cols-3 -mx-8">
      {data.entries.map(album => (
        <li key={album.slug}>
          <Link href={`/albums/${encodeURIComponent(album.slug)}`}>
            <a className="block hover:bg-hover rounded p-8 transition">
              {album.albumCoverArt[0].url && (
                <Image
                  alt={`${album.title} cover art`}
                  src={album.albumCoverArt[0].url}
                  width={256}
                  height={256}
                />
              )}
              <div>{album.title}</div>
              <NiceDate date={album.releaseDate} className="opacity-50" />
            </a>
          </Link>
        </li>
      ))}
    </ul>
  ) : (
    <Empty>Ain't no albums</Empty>
  );
};

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
