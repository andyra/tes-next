import { useContext, useState } from "react";
import AppContext from "./AppContext";
import Button from "./Button";
import Icon from "./Icon";
import Queue from "./Queue";

// Components
// ----------------------------------------------------------------------------

const OnDeck = ({ onDeck }) => (
  <div
    className={`flex items-center gap-8 w-1/4 transition ${
      onDeck ? "" : "opacity-0 pointer-events-none"
    }`}
  >
    <figure className="h-48 w-48 bg-blue-200 rounded flex items-center justify-center text-2xl">
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

const PlayerControls = ({ back, isPlaying, next, togglePlay }) => (
  <div className="flex-1 flex items-center justify-center gap-8">
    <Button circle onClick={back}>
      <Icon name="play-skip-back" solid />
    </Button>
    <Button
      circle
      size="lg"
      onClick={togglePlay}
      className={`${isPlaying ? "bg-green-200 hover:bg-green-300" : ""}`}
    >
      <Icon name={isPlaying ? "pause" : "play"} solid />
    </Button>
    <Button circle onClick={next}>
      <Icon name="play-skip-forward" solid />
    </Button>
  </div>
);

const ExtraControls = ({ queueOpen, setQueueOpen }) => (
  <div className="flex items-center justify-end gap-8 w-1/4">
    <Button
      circle
      className={`${queueOpen ? "bg-green-200" : ""}`}
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
  const context = useContext(AppContext);

  function togglePlay() {
    context.state.playing
      ? context.setPlaying(false)
      : context.setPlaying(true);
  }

  function isPlaying() {
    return context.state.onDeck && context.state.playing;
  }

  function next() {
    const queue = [...context.state.queue];
    const nextFrom = [...context.state.nextFrom];
    const prevFrom = [...context.state.prevFrom];

    if (context.state.onDeck && context.state.onDeck.listType === "tracklist") {
      addToPrevFrom(context.state.onDeck);
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
      <aside className="col-span-2 bg-white dark:bg-gray-800 p-8 rounded-lg flex items-center justify-between">
        <OnDeck onDeck={context.state.onDeck} />
        <PlayerControls
          back={back}
          isPlaying={isPlaying()}
          next={next}
          togglePlay={togglePlay}
        />
        <ExtraControls queueOpen={queueOpen} setQueueOpen={setQueueOpen} />
      </aside>
      <Queue open={queueOpen} />
    </>
  );
}
