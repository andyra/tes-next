import { useContext } from "react";
import Link from "next/link";
import { gql, useQuery } from "@apollo/client";
import client from "../apollo-client";
import styled from "styled-components";
import Button from "components/Button";
import CoverArt from "components/CoverArt";
import PlayPauseButton from "components/PlayPauseButton";
import Icon from "components/Icon";
import LavaLamp from "components/LavaLamp";
import { CollectionItem } from "components/Collections";
import { generateFeed } from "helpers/feed";
import {
  getCollectionType,
  normalizeCollections,
  normalizeFullEpisode,
  normalizeTracklist
} from "../helpers";
import { shuffle } from "helpers/utils";
const fs = require("fs");

// Components
// ----------------------------------------------------------------------------

const ShufflePlayer = () => {
  // Note: Craft should be able to `orderby: "RAND()"``, but it's not working
  const { data, error, loading } = useQuery(
    gql`
      query Entries {
        entries(section: "albums") {
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
      }
    `
  );

  const classes =
    "flex items-center justify-center gap-16 text-xl xs:text-2xl sm:text-3xl";

  if (loading) {
    return (
      <div className={classes}>
        <PlayPauseButton size="lg" isLoading />
        <div>Listen to the Radio</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={classes}>
        <PlayPauseButton size="lg" disabled />
        <div>Listen to the Radio</div>
        {`Error: ${error}`}
      </div>
    );
  }

  // Limiting to 50 songs; adding all the tracks gets sluggish when pulling up the Queue
  const shuffledPlayableTracks = shuffle(
    normalizeCollections({
      collections: data.entries,
      playableOnly: true
    })
  ).splice(0, 50);

  return (
    <div className={classes}>
      <PlayPauseButton
        className="hover:text-accent"
        size="lg"
        track={shuffledPlayableTracks[0]}
        tracklist={shuffledPlayableTracks}
      />
      <div>Listen to the Radio</div>
    </div>
  );
};

// Default
// ----------------------------------------------------------------------------

export default function Home({ latestAlbums, episodes }) {
  const latestEpisode = episodes.length ? episodes[0] : null;
  const normalizedFullEpisode = normalizeFullEpisode(latestEpisode);

  return (
    <>
      <header className="max-w-screen-sm mx-auto space-y-16">
        <div className="overflow-hidden relative text-ground">
          <LavaLamp
            imgSize={512}
            shapeA={5}
            shapeB={1}
            mySpeed={2}
            colorSpeed={0.001}
            className="absolute top-0 left-0 w-full h-full saturate-200"
          />
          <Icon name="TesMask" className="relative z-10 block" size="w-full" />
          <h1 className="sr-only">This Evening&apos;s Show</h1>
        </div>
        <p className="text-base xs:text-xl md:text-2xl text-justify max-w-screen-sm mx-auto">
          <strong className="font-bold underline">T</strong>his{" "}
          <strong className="font-bold underline">E</strong>vening&apos;s{" "}
          <strong className="font-bold underline">S</strong>how is a radio
          broadcast transmitting from an abandoned monorail station outside
          Adobe Skyscraper. Tune in as your hosts guide you through a cavalcade
          of bizarre characters, historic factoids, surreal comedy, improvised
          news, interviews, and original music.
        </p>
      </header>

      <ShufflePlayer />

      <hr className="border-t-2" />

      <section>
        <header className="flex items-center md:items-end gap-8 justify-between">
          <h2 className="font-medium text-2xl text-center">Latest Releases</h2>
          <Button href="/albums" iconRight="ArrowRight">
            Albums
          </Button>
        </header>
        <ul className="grid grid-cols-2 sm:grid-cols-4 -mx-8 md:-mx-16 relative">
          {latestAlbums.map(album => (
            <CollectionItem collection={album} key={album.slug} gridView />
          ))}
        </ul>
      </section>

      <section>
        <header className="flex items-center md:items-end gap-8 justify-between mb-16">
          <h2 className="font-medium text-2xl text-center">Latest Episode</h2>
          <Button href="/episodes" iconRight="ArrowRight">
            Episodes
          </Button>
        </header>
        <div className="flex flex-col sm:flex-row sm:items-center gap-16 sm:gap-24">
          <Link href={latestEpisode.uri}>
            <a className="self-start hover:-rotate-2 hover:shadow-lg transition duration-300">
              <CoverArt
                className="h-192 w-192 rounded-lg"
                height={192}
                width={192}
                url={latestEpisode.episodeCoverArt[0].url}
                title={latestEpisode.title}
              />
            </a>
          </Link>
          <div className="flex-1 space-y-8">
            <header className="flex items-center gap-8">
              <PlayPauseButton
                className="hover:text-accent"
                size="lg"
                track={normalizedFullEpisode}
              />
              <h3 className="font-medium text-xl">{latestEpisode.title}</h3>
            </header>
            <p>{latestEpisode.description}</p>
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
    query: gql`
      query Entries {
        albums: entries(
          section: "albums"
          orderBy: "releaseDate DESC"
          limit: 4
        ) {
          slug
          title
          uri
          ... on albums_default_Entry {
            albumCoverArt {
              url
            }
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
    `
  });

  const feed = await generateFeed(data.episodes);
  fs.writeFileSync("./public/feed.xml", feed);

  return {
    props: {
      latestAlbums: data.albums,
      episodes: data.episodes
    }
  };
}
