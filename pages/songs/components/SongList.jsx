import Link from "next/link";
import { gql, useQuery } from "@apollo/client";
import Empty from "../../../components/Empty";

// Queries
// ----------------------------------------------------------------------------

const QUERY_SONGS = gql`
  query Entries {
    entries(section: "songs") {
      slug
      title
      ... on songs_default_Entry {
        songType
      }
    }
  }
`;

// Components
// ----------------------------------------------------------------------------

const SongItem = ({ filters, i, song }) => {
  const { slug, songType, title } = song;
  const visible = filters.songType === "all" || filters.songType === songType;

  return (
    visible && (
      <li key={slug}>
        <Link href={`/songs/${encodeURIComponent(slug)}`}>
          <a className="flex break-inside-avoid-column gap-8 hover:bg-primary-10 p-8 border-t border-primary-25 border-dotted transition group">
            <span className="opacity-25 group-hover:opacity-50 transition">
              {i + 1}
            </span>
            {title}
          </a>
        </Link>
      </li>
    )
  );
};

// Default
// ----------------------------------------------------------------------------

export default function SongList({ filters }) {
  const { data, loading, error } = useQuery(QUERY_SONGS);

  if (loading) {
    return <mark>Loading...</mark>;
  }

  if (error) {
    console.error(error);
    return `Query error! ${error.message}`;
  }

  return data.entries ? (
    <ul className="columns-2 lg:columns-3 xl:columns-4 2xl:columns-5">
      {data.entries.map((song, i) => (
        <SongItem song={song} filters={filters} i={i} key={song.slug} />
      ))}
    </ul>
  ) : (
    <Empty>Ain't no songs</Empty>
  );
}
