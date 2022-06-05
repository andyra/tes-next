import { useState } from "react";
import { gql } from "@apollo/client";
import client from "../apollo-client";
import Button from "../components/Button";
import Icon from "../components/Icon";
import Input from "../components/Input";
import PageHeader, { PageTitle } from "../components/PageHeader";
import { getCollectionType, normalizeTrack, shuffle } from "../helpers/";

// Functions
// ----------------------------------------------------------------------------

function isSongHasAudio(track) {
  return track.song && track.song.length && track.audioFile.length;
}

function normalizeSetlistTracks(collections) {
  const newTracks = [];
  let i = 1;

  for (let collection of collections) {
    const collectionType = getCollectionType(collection);
    const tracklist = collection[`${collectionType}Tracklist`];

    for (let track of tracklist) {
      if (isSongHasAudio(track)) {
        newTracks.push(normalizeTrack(collection, track, i));
        i++;
      }
    }
  }
  return newTracks;
}

// Components
// ----------------------------------------------------------------------------

const LABEL_CLASSES =
  "inline-block px-8 text-primary-50 bg-ground absolute z-10 top-0 left-1/2 transform -translate-y-1/2 -translate-x-1/2 text-sm";

const Computor = ({
  bleedCount,
  collections,
  setBleedCount,
  setSetlistTracks,
  setSongCount,
  setStrategyCount,
  songCount,
  strategyCount
}) => {
  const normalizedTracks = normalizeSetlistTracks(collections);

  function handleCompute() {
    const shuffledTracks = shuffle(normalizedTracks);
    const tracks = shuffledTracks.splice(0, songCount);
    setSetlistTracks(tracks);
  }

  return (
    <section className="p-16 rounded-lg border-2 border-primary-10 text-center">
      <h1 className="font-funky text-4xl mb-16">Setlist Computor</h1>
      <form className="flex items-center gap-16">
        <Input
          defaultValue={songCount}
          inputClassName="text-center"
          label="Songs"
          labelClassName={LABEL_CLASSES}
          name="songs"
          onChange={e => {
            setSongCount(parseInt(e.target.value));
          }}
          type="number"
        />
        <Input
          defaultValue={bleedCount}
          inputClassName="text-center"
          label="Bleeds"
          labelClassName={LABEL_CLASSES}
          max={songCount}
          name="bleeds"
          onChange={e => {
            setBleedCount(parseInt(e.target.value));
          }}
          type="number"
        />
        <Input
          defaultValue={strategyCount}
          inputClassName="text-center"
          label="Strategies"
          labelClassName={LABEL_CLASSES}
          max={songCount}
          name="strategies"
          onChange={e => {
            setStrategyCount(parseInt(e.target.value));
          }}
          type="number"
        />
        <Button
          type="button"
          onClick={() => {
            handleCompute();
          }}
        >
          Compute
        </Button>
      </form>
    </section>
  );
};

const SetlistItem = ({ track, bleed, strategy }) => {
  // get random strategy
  return (
    <li className="relative py-8">
      <div className="text-3xl font-medium">{track.title}</div>
      {strategy && <div className="opacity-50">{strategy}</div>}
      {bleed && (
        <span className="h-24 px-8 border border-accent-25 text-accent text-sm rounded-full inline-flex gap-4 items-center justify-center transform translate-y-1/3">
          <Icon name="ArrowDown" />
          Bleed
        </span>
      )}
    </li>
  );
};

// Creates an array of tracks to include bleeds/strategies on (i.e. [0, 9, 2])
function getDoodads(songCount, count) {
  if (songCount && count) {
    const shuffledTrackIndexes = shuffle([...Array(songCount).keys()]);
    const itemsForTracks = shuffledTrackIndexes.splice(0, count);
    return itemsForTracks;
  }

  return [];
}

const SetlistItems = ({ songCount, bleedCount, strategyCount, tracks }) => {
  const bleedsForTracks = getDoodads(songCount, bleedCount);
  const strategiesForTracks = getDoodads(songCount, strategyCount);

  return (
    <ol className="list-decimal">
      {tracks.map((track, i) => (
        <SetlistItem
          track={track}
          bleed={bleedsForTracks.indexOf(i) >= 0}
          strategy={strategiesForTracks.indexOf(i) >= 0}
          key={i}
        />
      ))}
    </ol>
  );
};

// Default
// ----------------------------------------------------------------------------

export default function Setlist({ collections }) {
  const [songCount, setSongCount] = useState(0);
  const [bleedCount, setBleedCount] = useState(0);
  const [strategyCount, setStrategyCount] = useState(0);
  const [setlistTracks, setSetlistTracks] = useState([]);

  return (
    <>
      <Computor
        bleedCount={bleedCount}
        collections={collections}
        setBleedCount={setBleedCount}
        setSetlistTracks={setSetlistTracks}
        setSongCount={setSongCount}
        setStrategyCount={setStrategyCount}
        songCount={songCount}
        strategyCount={strategyCount}
      />
      <SetlistItems
        bleedCount={bleedCount}
        songCount={songCount}
        strategyCount={strategyCount}
        tracks={setlistTracks}
      />
    </>
  );
}

// Config
// ----------------------------------------------------------------------------

export async function getStaticProps(context) {
  const { params } = context;
  const { data } = await client.query({
    query: gql`
      query Entry {
        collections: entries(section: ["albums", "episodes"]) {
          sectionHandle
          slug
          title
          uri
          ... on albums_default_Entry {
            albumCoverArt {
              url
            }
            albumTracklist {
              ... on albumTracklist_song_BlockType {
                song {
                  slug
                  title
                }
                audioFile {
                  url
                }
              }
            }
            artist {
              slug
              title
            }
            releaseDate
          }
          ... on episodes_default_Entry {
            episodeCoverArt {
              url
            }
            releaseDate
            episodeTracklist {
              ... on episodeTracklist_song_BlockType {
                song {
                  slug
                  title
                }
                audioFile {
                  url
                }
              }
            }
          }
        }
      }
    `
  });

  return {
    props: {
      PageTitle: "Setlist Computor",
      collections: data.collections,
      spacing: true
    }
  };
}
