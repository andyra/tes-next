import { useState } from "react";
import Link from "next/link";
import { gql } from "@apollo/client";
import cn from "classnames";
import client from "../../apollo-client";
import Button from "components/Button";
import GridListToggle from "components/GridListToggle";
import MusicTabs from "components/MusicTabs";

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

// Default
// ----------------------------------------------------------------------------

export default function Songs({ songs }) {
  const [gridView, setGridView] = useState(true);
  const ulClasses = cn({
    "sm:columns-2 lg:columns-3 xl:columns-4 2xl:columns-5": gridView
  });

  return (
    <>
      <MusicTabs pageName="Songs" />
      <div className="flex items-center gap-8 justify-end mb-24">
        <GridListToggle gridView={gridView} setGridView={setGridView} />
      </div>
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
    query: gql`
      query Entries {
        entries(section: "songs", orderBy: "title ASC") {
          slug
          title
        }
      }
    `
  });

  return {
    props: {
      maxWidth: "max-w-none",
      navSection: "Music",
      pageTitle: "Songs",
      songs: data.entries
    }
  };
}
