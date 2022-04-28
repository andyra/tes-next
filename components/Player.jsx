import { useContext, useEffect, useState } from "react";
import AudioContext from "../context/AudioContext";
import Button from "./Button";
import Icon from "./Icon";
import Queue from "./Queue";

// Components
// ----------------------------------------------------------------------------

const OnDeck = ({ onDeck }) => (
  <div
    className={`flex-1 flex items-center gap-8 transition ${
      onDeck ? "" : "opacity-0 pointer-events-none"
    }`}
  >
    <figure className="h-56 w-56 bg-blue-200 rounded flex items-center justify-center text-2xl flex-shrink-0">
      {onDeck ? onDeck.id : ""}
    </figure>
    <div>
      <div className="text-sm font-medium">{onDeck ? onDeck.title : ""}</div>
      <div className="text-xs text-gray-500">
        {onDeck ? onDeck.artist.title : ""}
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
        className={`${isPlaying ? "bg-primary hover:bg-primary-75" : ""}`}
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

const ExtraControls = ({ queueCount, queueIsOpen, setQueueIsOpen }) => (
  <div className="flex-1 flex items-center justify-end gap-8">
    <Button
      circle
      className={`${queueIsOpen ? "bg-base" : ""}`}
      disabled={queueCount < 1}
      onClick={() => {
        setQueueIsOpen(queueIsOpen ? false : true);
      }}
      aria-controls="queue"
      aria-expanded={queueIsOpen ? false : true}
      aria-label="Show Queue"
    >
      <Icon name="list-circle" />
    </Button>
  </div>
);

// Default
// ----------------------------------------------------------------------------

export default function Player() {
  const [queueIsOpen, setQueueIsOpen] = useState(false);
  const context = useContext(AudioContext);
  const { nextFrom, onDeck, playing, prevFrom, queue } = context.state;
  const { setNextFrom, setOnDeck, setPlaying, setPrevFrom, setQueue } = context;
  const queueCount = prevFrom.length + nextFrom.length + queue.length;

  useEffect(() => {
    if (queueCount === 0) {
      setQueueIsOpen(false);
    }
  }, [queueCount]);

  function togglePlay() {
    setPlaying(!playing);
  }

  function isPlaying() {
    return onDeck && playing;
  }

  function next() {
    if (onDeck && onDeck.listType === "tracklist") {
      addToPrevFrom(onDeck);
    }

    if (queue.length) {
      const newOnDeck = queue.shift();
      setOnDeck(newOnDeck);
      setQueue(queue);
    } else if (nextFrom.length) {
      const newOnDeck = nextFrom.shift();
      setOnDeck(newOnDeck);
      setNextFrom(nextFrom);
    } else {
      setOnDeck(null);
      setPrevFrom([]);
    }
  }

  function addToPrevFrom(item) {
    const newPrevFrom = [...prevFrom];
    newPrevFrom.push(item);
    setPrevFrom(newPrevFrom);
  }

  function back() {
    const newPrevFrom = [...prevFrom];

    if (newPrevFrom.length) {
      const newOnDeck = newPrevFrom.pop();
      setPrevFrom(newPrevFrom);
      setOnDeck(newOnDeck);

      const newNextFrom = [...nextFrom];
      newNextFrom.unshift(onDeck);
      setNextFrom(newNextFrom);
    } else {
      setOnDeck(null);
      setNextFrom([]);
    }
  }

  return (
    <>
      <aside className="col-span-2 bg-base rounded-lg flex items-center justify-between p-8 gap-8">
        <OnDeck onDeck={onDeck} />
        <PlayerControls
          back={back}
          isPlaying={isPlaying()}
          next={next}
          onDeck={onDeck}
          togglePlay={togglePlay}
        />
        <ExtraControls
          queueIsOpen={queueIsOpen}
          setQueueIsOpen={setQueueIsOpen}
          queueCount={queueCount}
        />
      </aside>
      <Queue queueIsOpen={queueIsOpen} setQueueIsOpen={setQueueIsOpen} />
    </>
  );
}
