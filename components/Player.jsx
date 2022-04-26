import { useContext, useEffect, useState } from "react";
import cn from "classnames";
import AudioContext from "../context/AudioContext";
import Button from "./Button";
import Icon from "./Icon";
import Queue from "./Queue";

// Components
// ----------------------------------------------------------------------------

const OnDeck = ({ fullScreen, onDeck }) => {
  const onDeckClasses = cn({
    "flex items-center transition": true,
    "flex-1 gap-8": !fullScreen,
    "gap-48 mb-48": fullScreen,
    "opacity-0 pointer-events-none": !onDeck && !fullScreen
  });

  const coverArtClasses = cn({
    "bg-blue-200 rounded flex items-center justify-center text-2xl flex-shrink-0": true,
    "h-56 w-56": !fullScreen,
    "h-256 w-256": fullScreen
  });

  const titleClasses = cn({
    "text-sm font-medium": !fullScreen,
    "text-7xl font-bold mb-16": fullScreen
  });

  const artistClasses = cn({
    "text-xs text-primary-50": !fullScreen,
    "text-3xl font-medium": fullScreen
  });

  return (
    <div className={onDeckClasses}>
      <figure className={coverArtClasses}>
        {onDeck ? onDeck.track.id : ""}
      </figure>
      <div>
        <div className={titleClasses}>{onDeck ? onDeck.track.title : ""}</div>
        <div className={artistClasses}>{onDeck ? onDeck.track.artist : ""}</div>
      </div>
      <Button circle ghost className="ml-16">
        <Icon name="heart" />
      </Button>
    </div>
  );
};

const PlayerControls = ({
  back,
  fullScreen,
  isPlaying,
  onDeck,
  next,
  togglePlay
}) => {
  const PlayerControlClasses = cn({
    "w-full flex flex-col gap-4": true,
    "max-w-screen-sm": !fullScreen,
    "py-96 opacity-0 hover:opacity-100 transition duration-300": fullScreen
  });

  return (
    <div className={PlayerControlClasses}>
      <div className="flex items-center justify-center gap-8">
        <Button circle onClick={back} disabled={!onDeck}>
          <Icon name="play-skip-back" solid />
        </Button>
        <Button
          circle
          size="lg"
          disabled={!onDeck}
          onClick={togglePlay}
          className={`${isPlaying ? "bg-accent hover:bg-accent-75" : ""}`}
        >
          <Icon name={isPlaying ? "pause" : "play"} solid />
        </Button>
        <Button circle onClick={next} disabled={!onDeck}>
          <Icon name="play-skip-forward" solid />
        </Button>
      </div>
      <div className="flex items-center gap-8">
        <time className="w-48 font-mono text-xs text-primary-50 text-right">
          0:00
        </time>
        <div className="flex-1 h-4 bg-primary-25 rounded-full" />
        <time className="w-48 font-mono text-xs text-primary-50">0:00</time>
      </div>
    </div>
  );
};

const ExtraControls = ({
  queueCount,
  queueIsOpen,
  setQueueIsOpen,
  fullScreen,
  setFullScreen
}) => {
  const containerClasses = cn({
    "flex-1 flex items-center justify-end gap-8": true,
    "absolute top-96 right-96": fullScreen
  });

  const queueButtonClasses = cn({
    "bg-accent": queueIsOpen,
    hidden: fullScreen
  });

  return (
    <div className={containerClasses}>
      <Button
        circle
        onClick={() => {
          setQueueIsOpen(false);
          setFullScreen(!fullScreen);
        }}
        aria-controls="full-screen"
        aria-expanded={!fullScreen}
        aria-label="Full Screen"
      >
        <Icon name={fullScreen ? "close" : "chevron-up"} solid />
      </Button>
      <Button
        circle
        className={queueButtonClasses}
        disabled={queueCount < 1}
        onClick={() => {
          setFullScreen(false);
          setQueueIsOpen(!queueIsOpen);
        }}
        aria-controls="queue"
        aria-expanded={!queueIsOpen}
        aria-label="Show Queue"
      >
        Q
      </Button>
    </div>
  );
};

// Default
// ----------------------------------------------------------------------------

export default function Player() {
  const [queueIsOpen, setQueueIsOpen] = useState(false);
  const [fullScreen, setFullScreen] = useState(false);
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

  const playerClasses = cn({
    "col-span-2 flex items-center justify-between p-8 gap-8 border-t border-primary-10": !fullScreen,
    "absolute z-50 top-0 left-0 w-full h-full bg-base pt-96 px-96": fullScreen,
    "flex flex-col justify-end": fullScreen
  });

  return (
    <>
      <aside className={playerClasses}>
        <OnDeck onDeck={onDeck} fullScreen={fullScreen} />
        <PlayerControls
          back={back}
          fullScreen={fullScreen}
          isPlaying={isPlaying()}
          next={next}
          onDeck={onDeck}
          togglePlay={togglePlay}
        />
        <ExtraControls
          fullScreen={fullScreen}
          queueCount={queueCount}
          queueIsOpen={queueIsOpen}
          setFullScreen={setFullScreen}
          setQueueIsOpen={setQueueIsOpen}
        />
      </aside>
      <Queue queueIsOpen={queueIsOpen} setQueueIsOpen={setQueueIsOpen} />
    </>
  );
}
