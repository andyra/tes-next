import Link from "next/link";
import { gql, useQuery } from "@apollo/client";
import cn from "classnames";
import Empty from "../../../components/Empty";

// Queries
// ----------------------------------------------------------------------------

const QUERY_SONGS = gql`
  query Entries {
    entries(section: "songs", orderBy: "title ASC") {
      slug
      title
    }
  }
`;

// Components
// ----------------------------------------------------------------------------

const SongItem = ({ i, gridView, song }) => {
  const { slug, title } = song;

  const classes = cn({
    "flex items-baseline break-inside-avoid-column gap-8 border-t border-primary-25 border-dotted hover:text-accent transition group": true,
    "text-xl py-16 hover:border-accent": gridView,
    "py-4": !gridView
  });

  return (
    <li key={slug}>
      <Link href={`/songs/${encodeURIComponent(slug)}`}>
        <a className={classes}>
          <span className="font-mono text-xs opacity-25">{i + 1}</span>
          {title}
        </a>
      </Link>
    </li>
  );
};

export const SongList = ({ gridView }) => {
  const { data, loading, error } = useQuery(QUERY_SONGS);
  const classes = cn({
    "sm:columns-2 lg:columns-3 xl:columns-4 2xl:columns-5": gridView
  });

  if (loading) {
    return <mark>Loading...</mark>;
  }

  if (error) {
    console.error(error);
    return `Query error! ${error.message}`;
  }

  return data.entries ? (
    <ul className={classes}>
      {data.entries.map((song, i) => (
        <SongItem song={song} i={i} key={song.slug} gridView={gridView} />
      ))}
    </ul>
  ) : (
    <Empty>Ain't no songs</Empty>
  );
};

export default SongList;
