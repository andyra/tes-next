import Link from "next/link";
import { gql, useQuery } from "@apollo/client";
import cn from "classnames";
import Empty from "@/components/Empty";
import QueryError from "@/components/QueryError";

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
  const ulClasses = cn({
    "sm:columns-2 lg:columns-3 xl:columns-4 2xl:columns-5": gridView
  });

  const SongListSkeleton = ({ gridView }) => {
    const liClasses = cn({
      "flex items-baseline break-inside-avoid-column gap-8 border-t border-primary-25 border-dotted": true,
      "py-16": gridView,
      "py-4": !gridView
    });

    return (
      <ul className={ulClasses}>
        {[...Array(48)].map((e, i) => (
          <li className={liClasses} key={i}>
            <div className="h-20 w-20 rounded-lg bg-primary animate-loading" />
            <div className="h-28 w-full rounded bg-primary animate-loading" />
          </li>
        ))}
      </ul>
    );
  };

  if (loading) {
    return <SongListSkeleton gridView={gridView} />;
  }

  if (error) {
    console.error(error);
    return <QueryError error={error.message} />;
  }

  return data.entries ? (
    <ul className={ulClasses}>
      {data.entries.map((song, i) => (
        <SongItem song={song} i={i} key={song.slug} gridView={gridView} />
      ))}
    </ul>
  ) : (
    <Empty>Ain't no songs</Empty>
  );
};

export default SongList;
