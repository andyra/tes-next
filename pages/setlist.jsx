import { useState } from "react";
import { gql } from "@apollo/client";
import client from "helpers/apollo-client";
import * as Accordion from "@radix-ui/react-accordion";
import cn from "classnames";
import Badge from "components/Badge";
import Button from "components/Button";
import Icon from "components/Icon";
import Input from "components/Input";
import LeadSheet from "components/LeadSheet";
import PageHeader from "components/PageHeader";
import Tooltip from "components/Tooltip";
import { shuffle } from "helpers/utils";

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
  "inline-block px-8 font-mono tracking-wider text-sm text-primary-75 uppercase bg-ground absolute z-10 top-0 left-1/2 -translate-y-1/2 -translate-x-1/2";

const Computor = ({
  bleedCount,
  setBleedCount,
  setSetlistItems,
  setSongCount,
  setStrategyCount,
  songCount,
  songs,
  strategies,
  strategyCount,
}) => {
  function handleCompute() {
    const shuffledSongs = shuffle([...songs]).splice(0, songCount);
    const shuffledStrategies = shuffle([...strategies]);
    const bleedsFor = getExtras(songCount, bleedCount);
    const strategiesFor = getExtras(songCount, strategyCount, false);

    const items = shuffledSongs.map((song, i) => ({
      song: song,
      bleed: bleedsFor.indexOf(i) >= 0,
      strategy: strategiesFor.indexOf(i) >= 0 ? shuffledStrategies[i] : null,
    }));
    setSetlistItems(items);
  }

  return (
    <section className="text-center">
      <div className="flex items-center gap-16">
        <Input
          className="flex-1"
          defaultValue={`${songCount}`}
          inputClassName="font-medium text-3xl text-center"
          height="h-64"
          label="Songs"
          labelClassName={LABEL_CLASSES}
          min={0}
          name="songs"
          onChange={(e) => {
            setSongCount(parseInt(e.target.value));
          }}
          type="number"
        />
        <Input
          className="flex-1"
          defaultValue={`${bleedCount}`}
          inputClassName="font-medium text-3xl text-center"
          height="h-64"
          label="Bleeds"
          labelClassName={LABEL_CLASSES}
          max={songCount - 1}
          min={0}
          name="bleeds"
          onChange={(e) => {
            setBleedCount(parseInt(e.target.value));
          }}
          type="number"
        />
        <Input
          className="flex-1"
          defaultValue={`${strategyCount}`}
          inputClassName="font-medium text-3xl text-center"
          height="h-64"
          label="Strategies"
          labelClassName={LABEL_CLASSES}
          max={songCount}
          min={0}
          name="strategies"
          onChange={(e) => {
            setStrategyCount(parseInt(e.target.value));
          }}
          type="number"
        />
      </div>
      <Button
        className="mx-auto mt-24"
        onClick={() => {
          handleCompute();
        }}
        size="lg"
        type="button"
        variant="glass"
      >
        Compute
      </Button>
    </section>
  );
};

const BleedBorder = () => {
  const classes = cn(
    "absolute top-32 -bottom-32 left-32 -translate-x-1/2",
    "w-2 border-l-2 border-primary-50 border-dashed rounded-full"
  );

  return <div className={classes} />;
};

const SetlistItem = ({ item, i }) => {
  const { bleed, song, strategy } = item;
  const hasLeadSheet = song.leadSheet || song.notation.length > 0;
  const classes = cn(
    "w-full py-12 px-16 rounded-lg text-left transition group XXXsticky XXXtop-0 XXXz-10",
    "hover:bg-primary-5"
  );

  return (
    <Accordion.Item asChild disabled={!hasLeadSheet} value={song.title}>
      <li className="relative">
        {bleed && <BleedBorder />}
        <Accordion.Trigger className={classes}>
          <div className="flex items-center gap-16">
            <span className="flex items-center justify-center w-32 h-32 text-lg font-medium text-primary-50 text-center border-2 bg-ground border-primary-50 rounded-full relative">
              {i + 1}
            </span>
            <div className="flex-1 text-4xl">{song.title}</div>
            {hasLeadSheet && (
              <Badge className="text-sm text-primary-50">
                Lead Sheet
                <Icon name="ChevronDown" />
              </Badge>
            )}
            <Tooltip content="Go to song">
              <Button
                circle
                className="opacity-0 group-hover:opacity-100 transition"
                href={song.uri}
                icon="ArrowRight"
                target="_blank"
              />
            </Tooltip>
          </div>
          {strategy && (
            <div className="ml-40 text-xl text-primary-50">
              &ldquo;{strategy}&rdquo;
            </div>
          )}
        </Accordion.Trigger>
        <Accordion.Content className="ml-64">
          {hasLeadSheet && <LeadSheet song={song} />}
        </Accordion.Content>
      </li>
    </Accordion.Item>
  );
};

const SetlistItems = ({ items }) =>
  items.length ? (
    <Accordion.Root asChild collapsible={true}>
      <ul>
        {items.map((item, i) => (
          <SetlistItem item={item} i={i} key={i} />
        ))}
      </ul>
    </Accordion.Root>
  ) : null;

// Default
// ----------------------------------------------------------------------------

export default function Setlist({ songs, setlistStrategies }) {
  const [songCount, setSongCount] = useState(0);
  const [bleedCount, setBleedCount] = useState(0);
  const [strategyCount, setStrategyCount] = useState(0);
  const [setlistItems, setSetlistItems] = useState([]);

  // Split the text block string into an array of strings based on newlines
  const strategies = setlistStrategies.split(/\r?\n/);

  return (
    <>
      <PageHeader title="Setlist Computor" center />
      <Computor
        bleedCount={bleedCount}
        songs={songs}
        setBleedCount={setBleedCount}
        setSetlistItems={setSetlistItems}
        setSongCount={setSongCount}
        setStrategyCount={setStrategyCount}
        songCount={songCount}
        strategies={strategies}
        strategyCount={strategyCount}
      />
      <hr className="border-t-2" />
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
      query Setlist {
        entries(section: "songs") {
          title
          uri
          ... on songs_default_Entry {
            leadSheet
            notation {
              height
              url
              width
            }
          }
        }
        entry(section: "setlistComputor") {
          ... on setlistComputor_setlistComputor_Entry {
            strategies
          }
        }
      }
    `,
  });

  return {
    props: {
      metaTitle: "Setlist Computor",
      songs: data.entries,
      setlistStrategies: data.entry.strategies,
    },
  };
}
