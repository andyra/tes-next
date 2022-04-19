import Image from "next/image";
import Link from "next/link";
import { gql, useQuery } from "@apollo/client";
import Empty from "../../../components/Empty";
import NiceDate from "../../../components/NiceDate";

const GET_ALBUMS = gql`
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
`;

export default function AlbumList() {
  const { data, loading, error } = useQuery(GET_ALBUMS);

  if (loading) {
    return <mark>Loading...</mark>;
  }

  if (error) {
    console.error(error);
    return `Query error! ${error.message}`;
  }

  return data.entries ? (
    <ul className="grid grid-cols-3 -mx-8">
      {data.entries.map(album => (
        <li key={album.slug}>
          <Link href={`/albums/${encodeURIComponent(album.slug)}`}>
            <a className="block hover:bg-default-10 rounded p-8 transition">
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
}
