import Link from "next/link";
import { gql, useQuery } from "@apollo/client";
import Empty from "../../../components/Empty";

export default function SongList() {
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
    return `Query error! ${error.message}`;
  }

  return data.entries ? (
    <ul className="md:columns-2 lg:columns-3">
      {data.entries.map((song, i) => (
        <li key={song.slug}>
          {console.log(song)}
          <Link href={`/songs/${encodeURIComponent(song.slug)}`}>
            <a className="flex break-inside-avoid-column gap-8 hover:bg-default-10 p-8 border-t border-black transition group">
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
}
