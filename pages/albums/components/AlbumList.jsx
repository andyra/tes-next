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

export const AlbumItem = ({ album }) => {
  const { slug, title, albumCoverArt, releaseDate } = album;

  return (
    <li key={slug}>
      <Link href={`/albums/${encodeURIComponent(slug)}`}>
        <a className="block hover:bg-primary-10 rounded p-8 transition">
          <figure className="rounded-lg overflow-hidden mb-16">
            {albumCoverArt.length ? (
              <Image
                alt={`${title} cover art`}
                src={albumCoverArt[0].url}
                width={320}
                height={320}
                layout="responsive"
              />
            ) : (
              <div className="w-full aspect-square bg-primary-10 flex items-center justify-center text-primary-50">
                n/a
              </div>
            )}
          </figure>
          <div className="text-lg font-medium">{title}</div>
          <NiceDate date={releaseDate} className="opacity-50" />
        </a>
      </Link>
    </li>
  );
};

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
    <ul className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 -mx-8">
      {data.entries.map(album => (
        <AlbumItem album={album} key={album.slug} />
      ))}
    </ul>
  ) : (
    <Empty>Ain't no albums</Empty>
  );
}
