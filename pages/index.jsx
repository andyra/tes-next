import { useContext } from "react";
import Link from "next/link";
import { gql } from "@apollo/client";
import client from "../apollo-client";
import styled from "styled-components";
import AnimatedLetter from "../components/AnimatedLetter";
import Button from "../components/Button";
import CoverArt from "../components/CoverArt";
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
    albums: entries(section: "albums", orderBy: "releaseDate DESC") {
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
          ... on albumTracklist_coverSong_BlockType {
            songTitle
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
      orderBy: "releaseDate DESC"
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

      <section className="flex items-center justify-center gap-16 text-xl xs:text-2xl sm:text-3xl p-24 xs:py-32 md:py-48 rounded-xl border-2">
        <PlayPauseButton
          className="hover:text-accent"
          size="lg"
          track={shuffledPlayableTracks[0]}
          tracklist={shuffledPlayableTracks}
        />
        <div>Listen to the Radio</div>
      </section>

      <section>
        <header className="flex items-center gap-8 justify-between">
          <h2 className="text-2xl text-center mb-16">Latest Releases</h2>
          <Button href="/albums" iconRight="ArrowRight">
            Albums
          </Button>
        </header>
        <ul className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-3 -mx-8 relative">
          {latestAlbums.map(album => (
            <CollectionItem collection={album} key={album.slug} gridView />
          ))}
        </ul>
      </section>

      <section>
        <header className="flex items-center gap-8 justify-between">
          <h2 className="text-2xl text-center mb-16">Latest Episode</h2>
          <Button href="/episodes" iconRight="ArrowRight">
            Episodes
          </Button>
        </header>
        <div className="flex items-center gap-24">
          <CoverArt
            className="h-192 w-192 rounded-lg"
            height={192}
            width={192}
            url={latestEpisode.episodeCoverArt[0].url}
            title={latestEpisode.title}
          />
          <div className="flex-1">
            <h3 className="font-medium text-xl mb-8">{latestEpisode.title}</h3>
            <p className="text-primary-75">{latestEpisode.description}</p>
            <PlayPauseButton
              className="hover:text-accent"
              size="lg"
              track={normalizedFullEpisode}
            />
          </div>
        </div>
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
