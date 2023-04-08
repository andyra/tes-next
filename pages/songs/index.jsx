import { useState } from "react";
import Link from "next/link";
import { gql } from "@apollo/client";
import cn from "classnames";
import client from "../../apollo-client";
import PageTabs from "components/PageTabs";

// Components
// ----------------------------------------------------------------------------

const SongItem = ({ i, gridView, song }) => {
  const { slug, title, uri } = song;

  const classes = cn(
    "flex items-baseline break-inside-avoid-column gap-8 border-t border-primary-25 border-dotted transition group",
    gridView ? "text-xl py-16" : "text-lg py-8"
  );

  return (
    <li key={slug}>
      <Link href={uri} className={classes}>
        <span className="font-mono text-xs text-primary-25">{i + 1}</span>
        <span className="underline underline-offset-8 decoration-wavy decoration-transparent group-hover:text-accent group-hover:decoration-accent transition">
          {title}
        </span>
      </Link>
    </li>
  );
};

// Default
// ----------------------------------------------------------------------------

export default function Songs({ songs }) {
  const [gridView, setGridView] = useState(true);
  const ulClasses = cn(
    gridView
      ? "sm:columns-2 lg:columns-3 xl:columns-4 2xl:columns-5"
      : "max-w-screen-lg mx-auto"
  );

  return (
    <>
      <PageTabs
        items={[
          { title: "Albums", href: "/albums" },
          { title: "Songs", href: "/songs" },
        ]}
      />
      <ul className={ulClasses}>
        {songs.map((song, i) => (
          <SongItem song={song} i={i} key={song.slug} gridView={gridView} />
        ))}
      </ul>
    </>
  );
}

// Config
// ----------------------------------------------------------------------------

export async function getStaticProps() {
  const { data } = await client.query({
    fetchPolicy: "no-cache",
    query: gql`
      query Entries {
        entries(section: "songs", orderBy: "title ASC") {
          slug
          title
          uri
        }
      }
    `,
  });

  return {
    props: {
      maxWidth: "max-w-none",
      metaTitle: "Songs",
      navSection: "Music",
      songs: data.entries,
    },
  };
}
