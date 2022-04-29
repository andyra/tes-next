import Image from "next/image";
import Link from "next/link";
import { gql, useQuery } from "@apollo/client";
import Empty from "../../../components/Empty";
import NiceDate from "../../../components/NiceDate";

export default function EpisodeList() {
  const { data, loading, error } = useQuery(
    gql`
      query Entries {
        entries(section: "episodes") {
          slug
          title
          ... on episodes_default_Entry {
            releaseDate
            episodeCoverArt {
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
    return `Query error! ${error.message}`;
  }

  return data.entries ? (
    <ul className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 -mx-8">
      {data.entries.map(episode => (
        <li key={episode.slug}>
          <Link href={`/episodes/${encodeURIComponent(episode.slug)}`}>
            <a className="block hover:bg-primary-10 rounded p-8 transition">
              <Image
                alt={`${episode.title} cover art`}
                src={episode.episodeCoverArt[0].url}
                width={256}
                height={256}
              />
              <div>{episode.title}</div>
              <NiceDate date={episode.releaseDate} className="opacity-50" />
            </a>
          </Link>
        </li>
      ))}
    </ul>
  ) : (
    <Empty>Ain't no episodes</Empty>
  );
}
