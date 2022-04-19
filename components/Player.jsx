import { useContext, useState } from "react";
import AudioContext from "../context/AudioContext";
import Button from "./Button";
import Icon from "./Icon";
import Queue from "./Queue";

// TODO
// • Use destructuring at high levels to reduce repetition
// • Close the panel if queueCount === 0

// Components
// ----------------------------------------------------------------------------

const OnDeck = ({ onDeck }) => (
  <div
    className={`flex-1 flex items-center gap-8 transition ${
      onDeck ? "" : "opacity-0 pointer-events-none"
    }`}
  >
    <figure className="h-56 w-56 bg-blue-200 rounded flex items-center justify-center text-2xl flex-shrink-0">
      {onDeck ? onDeck.track.id : ""}
    </figure>
    <div>
      <div className="text-sm font-medium">
        {onDeck ? onDeck.track.title : ""}
      </div>
      <div className="text-xs text-gray-500">
        {onDeck ? onDeck.track.artist : ""}
      </div>
    </div>
  </div>
);

const PlayerControls = ({ back, isPlaying, onDeck, next, togglePlay }) => (
  <div className="w-320 flex flex-col gap-4">
    <div className="flex items-center justify-center gap-8">
      <Button circle onClick={back} disabled={!onDeck}>
        <Icon name="play-skip-back" solid />
      </Button>
      <Button
        circle
        disabled={!onDeck}
        onClick={togglePlay}
        className={`${isPlaying ? "bg-accent hover:bg-accent" : ""}`}
      >
        <Icon name={isPlaying ? "pause" : "play"} solid />
      </Button>
      <Button circle onClick={next} disabled={!onDeck}>
        <Icon name="play-skip-forward" solid />
      </Button>
    </div>
    <div className="flex items-center gap-8">
      <time className="w-48 text-xs text-gray-500 text-right">0:00</time>
      <div className="flex-1 h-4 bg-gray-400 rounded-full" />
      <time className="w-48 text-xs text-gray-500">0:00</time>
    </div>
  </div>
);

const ExtraControls = ({ queueCount, queueOpen, setQueueOpen }) => (
  <div className="flex-1 flex items-center justify-end gap-8">
    <Button
      circle
      className={`${queueOpen ? "bg-accent" : ""}`}
      disabled={queueCount < 1}
      onClick={() => {
        setQueueOpen(queueOpen ? false : true);
      }}
      aria-controls="queue"
      aria-expanded={queueOpen ? false : true}
      aria-label="Show Queue"
    >
      <Icon name="list-circle" />
    </Button>
  </div>
);

// Default
// ----------------------------------------------------------------------------

export default function Player() {
  const [queueOpen, setQueueOpen] = useState(false);
  const context = useContext(AudioContext);
  const queueCount =
    context.state.prevFrom.length +
    context.state.nextFrom.length +
    context.state.queue.length;

  function togglePlay() {
    context.state.playing
      ? context.setPlaying(false)
      : context.setPlaying(true);
  }

  function isPlaying() {
    return context.state.onDeck && context.state.playing;
  }

  function next() {
    const { onDeck, nextFrom, prevFrom, queue } = context.state;
    // const queue = [...context.state.queue];
    // const nextFrom = [...context.state.nextFrom];
    // const prevFrom = [...context.state.prevFrom];

    if (onDeck && onDeck.listType === "tracklist") {
      addToPrevFrom(onDeck);
    }

    if (queue.length) {
      const newOnDeck = queue.shift();
      context.setOnDeck(newOnDeck);
      context.setQueue(queue);
    } else if (nextFrom.length) {
      const newOnDeck = nextFrom.shift();
      context.setOnDeck(newOnDeck);
      context.setNextFrom(nextFrom);
    } else {
      context.setOnDeck(null);
      context.setPrevFrom([]);
    }
  }

  function addToPrevFrom(item) {
    const prevFrom = [...context.state.prevFrom];
    prevFrom.push(item);
    context.setPrevFrom(prevFrom);
  }

  function back() {
    const newPrevFrom = [...context.state.prevFrom];

    if (newPrevFrom.length) {
      const newOnDeck = newPrevFrom.pop();
      context.setPrevFrom(newPrevFrom);
      context.setOnDeck(newOnDeck);

      const newNextFrom = [...context.state.nextFrom];
      newNextFrom.unshift(context.state.onDeck);
      context.setNextFrom(newNextFrom);
    } else {
      context.setOnDeck(null);
      context.setNextFrom([]);
    }
  }

  return (
    <>
      <aside className="col-span-2 bg-primary rounded-lg flex items-center justify-between p-8 gap-8">
        <OnDeck onDeck={context.state.onDeck} />
        <PlayerControls
          back={back}
          isPlaying={isPlaying()}
          next={next}
          onDeck={context.state.onDeck}
          togglePlay={togglePlay}
        />
        <ExtraControls
          queueOpen={queueOpen}
          setQueueOpen={setQueueOpen}
          queueCount={queueCount}
        />
      </aside>
      <Queue open={queueOpen} />
    </>
  );
}
