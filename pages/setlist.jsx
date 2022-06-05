import { useState } from "react";
import Link from "next/link";
import { gql } from "@apollo/client";
import client from "../apollo-client";
import * as Accordion from "@radix-ui/react-accordion";
import cn from "classnames";
import Badge from "../components/Badge";
import Button from "../components/Button";
import Icon from "../components/Icon";
import Input from "../components/Input";
import PageHeader, { PageTitle } from "../components/PageHeader";
import { getCollectionType, normalizeTrack, shuffle } from "../helpers/";

// Functions
// ----------------------------------------------------------------------------

// Creates an array of tracks to include bleeds/strategies on (i.e. [0, 9, 2])
function getExtras(songCount, count, skipLastItem = true) {
  let songIndexes = [...Array(songCount).keys()];
  if (skipLastItem) {
    songIndexes.pop();
  }
  if (songIndexes && count) {
    const shuffledIndexes = shuffle(songIndexes);
    return shuffledIndexes.splice(0, count);
  }

  return [];
}

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
  function handleCompute() {
    const shuffledSongs = shuffle([...songs]);
    const mySongs = shuffledSongs.splice(0, songCount);
    const bleeds = getExtras(songCount, bleedCount);
    const strategies = getExtras(songCount, strategyCount, false);
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
          max={songCount - 1}
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

const SetlistItem = ({ item, i }) => {
  const { bleed, song, strategy } = item;
  const classes = cn({
    "w-full py-12 px-16 rounded-lg hover:bg-primary-5 text-left transition group": true
  });
  return (
    <Accordion.Item className="relative" value={song.title}>
      {bleed && (
        <div className="w-2 border-l-2 border-primary-50 border-dashed absolute top-32 -bottom-32 left-32 rounded-full flex items-center justify-center transform -translate-x-1/2" />
      )}
      <Accordion.Trigger className={classes}>
        <div className="flex items-center gap-16">
          <span className="flex items-center justify-center w-32 h-32 text-lg font-medium text-primary-50 text-center border-2 bg-ground border-primary-50 rounded-full relative">
            {i + 1}
          </span>
          <div className="flex-1 text-5xl">{song.title}</div>
          <div className="flex items-center gap-4">
            {song.lyrics && (
              <Badge className="text-sm text-primary-50 opacity-0 group-hover:opacity-100 transition">
                Lyrics
              </Badge>
            )}
            {song.notation && (
              <Badge className="text-sm text-primary-50 opacity-0 group-hover:opacity-100 transition">
                Notation
              </Badge>
            )}
          </div>
        </div>
        {strategy && <div className="ml-40 opacity-50">"Strategy here"</div>}
      </Accordion.Trigger>
      <Accordion.Content className="ml-48">
        <div className="lg:grid lg:grid-cols-2 gap-16 rounded-lg p-16 border border-primary-10">
          {song.lyrics && (
            <div>
              <h3
                className={`font-semibold text-xl mb-8${
                  song.lyrics ? "" : " text-primary-50"
                }`}
              >
                Lyrics
              </h3>
              <div
                className="font-mono text-sm"
                dangerouslySetInnerHTML={{ __html: song.lyrics }}
              />
            </div>
          )}
          {song.notation && (
            <div>
              <h3
                className={`font-semibold text-xl mb-8${
                  song.notation ? "" : " text-primary-50"
                }`}
              >
                Notation
              </h3>
              <div
                className="font-mono text-sm"
                dangerouslySetInnerHTML={{ __html: song.notation }}
              />
            </div>
          )}
        </div>
      </Accordion.Content>
    </Accordion.Item>
  );
};
const SetlistItems = ({ items }) =>
  items.length ? (
    <Accordion.Root collapsible={true}>
      {items.map((item, i) => (
        <SetlistItem item={item} i={i} key={i} />
      ))}
    </Accordion.Root>
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
