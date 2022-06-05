import { useState } from "react";
import { gql } from "@apollo/client";
import client from "../apollo-client";
import Link from "next/link";
import Badge from "../components/Badge";
import Button from "../components/Button";
import Icon from "../components/Icon";
import Input from "../components/Input";
import PageHeader, { PageTitle } from "../components/PageHeader";
import { getCollectionType, normalizeTrack, shuffle } from "../helpers/";

// Components
// ----------------------------------------------------------------------------

const LABEL_CLASSES =
  "inline-block px-8 text-primary-50 bg-ground absolute z-10 top-0 left-1/2 transform -translate-y-1/2 -translate-x-1/2 text-sm";

const Computor = ({
  bleedCount,
  setBleedCount,
  setSetlistItems,
  setSongCount,
  setStrategyCount,
  songCount,
  songs,
  strategyCount
}) => {
  // Creates an array of tracks to include bleeds/strategies on (i.e. [0, 9, 2])
  function getTrackExtras(songCount, count, lastItem) {
    const maxTracks = lastItem ? songCount : songCount - 1;

    if (songCount && count) {
      const shuffledTrackIndexes = shuffle([...Array(maxTracks).keys()]);
      return shuffledTrackIndexes.splice(0, count);
    }

    return [];
  }

  function handleCompute() {
    const shuffledSongs = shuffle(songs);
    const mySongs = shuffledSongs.splice(0, songCount);
    const bleeds = getTrackExtras(songCount, bleedCount);
    const strategies = getTrackExtras(songCount, strategyCount, true);
    const items = mySongs.map((song, i) => ({
      song: song,
      bleed: bleeds.indexOf(i) >= 0,
      strategy: strategies.indexOf(i) >= 0
    }));

    setSetlistItems(items);
  }

  return (
    <section className="p-16 rounded-lg border-2 border-primary-10 text-center">
      <h1 className="font-funky text-4xl mb-16">Setlist Computor</h1>
      <form className="flex items-center gap-16">
        <Input
          className="flex-1"
          defaultValue={songCount}
          inputClassName="text-center"
          label="Songs"
          labelClassName={LABEL_CLASSES}
          min={0}
          name="songs"
          onChange={e => {
            setSongCount(parseInt(e.target.value));
          }}
          type="number"
        />
        <Input
          className="flex-1"
          defaultValue={bleedCount}
          inputClassName="text-center"
          label="Bleeds"
          labelClassName={LABEL_CLASSES}
          max={songCount}
          min={0}
          name="bleeds"
          onChange={e => {
            setBleedCount(parseInt(e.target.value));
          }}
          type="number"
        />
        <Input
          className="flex-1"
          defaultValue={strategyCount}
          inputClassName="text-center"
          label="Strategies"
          labelClassName={LABEL_CLASSES}
          max={songCount}
          min={0}
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

const SetlistItems = ({ items }) =>
  items.length ? (
    <ol className="list-decimal">
      {items.map((item, i) => (
        <li className="relative" key={i}>
          {console.log(item)}
          <Link href={item.song.uri}>
            <a
              className="flex items-center gap-8 hover:bg-primary-5 py-8 px-16 rounded-lg group"
              noopener
              noreferrer
              target="_blank"
            >
              <div className="flex-1">
                <div className="text-3xl font-medium">{item.song.title}</div>
                {item.strategy && (
                  <div className="opacity-50">"{item.strategy}"</div>
                )}
                {item.bleed && (
                  <span className="h-24 px-8 border border-accent-25 text-accent text-sm rounded-full inline-flex gap-4 items-center justify-center transform translate-y-1/3">
                    <Icon name="ArrowDown" />
                    Bleed
                  </span>
                )}
              </div>
              <div className="flex items-center gap-4">
                {item.song.lyrics && (
                  <Badge className="text-sm text-primary-50 opacity-0 group-hover:opacity-100 transition">
                    Lyrics
                  </Badge>
                )}
                {item.song.notation && (
                  <Badge className="text-sm text-primary-50 opacity-0 group-hover:opacity-100 transition">
                    Notation
                  </Badge>
                )}
              </div>
            </a>
          </Link>
        </li>
      ))}
    </ol>
  ) : null;

// Default
// ----------------------------------------------------------------------------

export default function Setlist({ songs }) {
  const [songCount, setSongCount] = useState(0);
  const [bleedCount, setBleedCount] = useState(0);
  const [strategyCount, setStrategyCount] = useState(0);
  const [setlistItems, setSetlistItems] = useState([]);

  return (
    <>
      <Computor
        bleedCount={bleedCount}
        songs={songs}
        setBleedCount={setBleedCount}
        setSetlistItems={setSetlistItems}
        setSongCount={setSongCount}
        setStrategyCount={setStrategyCount}
        songCount={songCount}
        strategyCount={strategyCount}
      />
      <SetlistItems items={setlistItems} />
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
        entries(section: "songs") {
          title
          uri
          ... on songs_default_Entry {
            lyrics
            notation
            songType
          }
        }
      }
    `
  });

  return {
    props: {
      PageTitle: "Setlist Computor",
      songs: data.entries,
      spacing: true
    }
  };
}
