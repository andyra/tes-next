import { useContext } from "react";
import Link from "next/link";
import { gql } from "@apollo/client";
import client from "../apollo-client";
import styled from "styled-components";
import AnimatedLetter from "../components/AnimatedLetter";
import Button from "../components/Button";
import PlayPauseButton from "../components/PlayPauseButton";
import Icon from "../components/Icon";
import { CollectionItem } from "../components/Collections";
import { generateFeed } from "../helpers/feed";
import {
  getCollectionType,
  normalizeCollections,
  normalizeFullEpisode,
  normalizeTracklist
} from "../helpers";
import { shuffle } from "../helpers/utils";
const fs = require("fs");

// Queries
// ----------------------------------------------------------------------------

const QUERY_LATEST_COLLECTIONS = gql`
  query Entries {
    albums: entries(section: "albums", orderBy: "postDate DESC") {
      slug
      title
      uri
      ... on albums_default_Entry {
        artist {
          slug
          title
        }
        albumCoverArt {
          url
        }
        albumTracklist {
          ... on albumTracklist_song_BlockType {
            song {
              slug
              title
              uri
            }
            audioFile {
              url
            }
          }
          ... on albumTracklist_segment_BlockType {
            description
            audioFile {
              url
            }
          }
        }
        albumType
        releaseDate
      }
    }
    episodes: entries(
      section: "episodes"
      limit: 1
      orderBy: "dateCreated DESC"
    ) {
      slug
      title
      uri
      ... on episodes_default_Entry {
        description
        episodeAudio {
          url
        }
        episodeCoverArt {
          url
        }
        releaseDate
      }
    }
  }
`;

// Play Sections
// ----------------------------------------------------------------------------

const PlayerSection = ({ children, playPauseButton, title }) => {
  return (
    <div className="flex items-center justify-center gap-16 text-xl xs:text-2xl sm:text-3xl p-24 xs:py-32 md:py-48 rounded-xl border-2">
      {playPauseButton}
      <div>
        {title}
        {children}
      </div>
    </div>
  );
};

// Page
// ----------------------------------------------------------------------------

export default function Home({ albums, episodes }) {
  const latestEpisode = episodes.length ? episodes[0] : null;
  const latestAlbums = albums.slice(0, 3);
  const normalizedFullEpisode = normalizeFullEpisode(latestEpisode);
  const shuffledPlayableTracks = shuffle(
    normalizeCollections({
      collections: albums,
      playableOnly: true
    })
  );

  return (
    <>
      <header className="text-center space-y-16">
        <h1>
          <AnimatedLetter src="/vhs-02.webp">TES</AnimatedLetter>
        </h1>

        <p className="font-mono text-sm text-center max-w-screen-sm mx-auto">
          <strong className="font-bold underline">T</strong>his{" "}
          <strong className="font-bold underline">E</strong>vening's{" "}
          <strong className="font-bold underline">S</strong>how is a radio
          broadcast transmitting from an abandoned monorail station outside
          Adobe Skyscraper. Tune in as your hosts guide you through a cavalcade
          of bizarre characters, historic factoids, surreal comedy, improvised
          news, interviews, and original music.
        </p>
      </header>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-24">
        <PlayerSection
          playPauseButton={
            <PlayPauseButton
              className="hover:text-accent"
              size="lg"
              track={normalizedFullEpisode}
            />
          }
          title="Play Latest Episode"
        />
        <PlayerSection
          playPauseButton={
            <PlayPauseButton
              className="hover:text-accent"
              size="lg"
              track={shuffledPlayableTracks[0]}
              tracklist={shuffledPlayableTracks}
            />
          }
          title="Listen to the Radio"
        />
      </section>

      <section>
        <h2 className="text-2xl text-center mb-16">Latest Releases</h2>
        <ul className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 -mx-8 relative">
          {latestAlbums.map(album => (
            <CollectionItem collection={album} key={album.slug} gridView />
          ))}
          <li className="p-8">
            <Link href="/albums">
              <a className="flex items-center justify-center gap-8 aspect-square border-2 hover:border-accent hover:text-accent rounded-lg transition group">
                View All
                <Icon
                  name="ArrowRight"
                  className="transition-transform duration-300 group-hover:transform group-hover:translate-x-4"
                />
              </a>
            </Link>
          </li>
        </ul>
      </section>
    </>
  );
}

// Config
// ----------------------------------------------------------------------------

export async function getStaticProps(context) {
  const { params } = context;
  const { data } = await client.query({
    query: QUERY_LATEST_COLLECTIONS
  });

  const feed = await generateFeed(data.episodes);
  fs.writeFileSync("./public/feed.xml", feed);

  return {
    props: {
      albums: data.albums,
      episodes: data.episodes,
      spacing: true
    }
  };
}
