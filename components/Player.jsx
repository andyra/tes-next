import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { useMediaQuery } from "react-responsive";
import cn from "classnames";
import AudioContext from "../context/AudioContext";
import Button from "./Button";
import Icon from "./Icon";
import MediaQuery, { BREAKPOINTS } from "./MediaQuery";
import Queue from "./Queue";

// Components
// ----------------------------------------------------------------------------

const OnDeck = ({ isFullscreen, isMobile, onDeck, setIsFullscreen }) => {
  const onDeckClasses = cn({
    "flex relative": true,
    "items-center gap-8 w-full md:w-1/3": !isFullscreen,
    "flex-1 flex-col justify-end md:justify-start md:flex-row md:items-end w-full gap-16 md:gap-48 md:mb-48": isFullscreen
  });

  const coverArtClasses = cn({
    "aspect-square bg-primary-10 rounded flex items-center justify-center text-2xl flex-shrink-0 overflow-hidden": true,
    "w-40 h-40 md:w-64 md:h-64": !isFullscreen,
    "w-full max-w-screen-xs mx-auto h-auto mt-auto md:my-0 md:w-256 md:h-256": isFullscreen
  });

  const actionClasses = cn({
    "flex items-center gap-2 pl-16 transition duration-300": true,
    "opacity-0": !onDeck
  });

  const trackInfoClasses = cn({
    "flex gap-8 transition duration-300": true,
    "my-auto md:my-0 md:flex-1": isFullscreen,
    "opacity-0": !onDeck
  });

  const titleClasses = cn({
    "text-sm font-medium": !isFullscreen,
    "text-3xl md:text-5xl lg:text-7xl font-bold md:mb-16": isFullscreen
  });

  const artistClasses = cn({
    "text-xs text-primary-50": !isFullscreen,
    "text-xl md:text-3xl font-medium": isFullscreen
  });

  return (
    <div className={onDeckClasses}>
      <figure id="cover-art" className={coverArtClasses}>
        {onDeck && (
          <Image
            alt={`${onDeck.collection.title} cover art`}
            src={onDeck.collection.coverArtUrl}
            width={isFullscreen ? 256 : isMobile ? 40 : 64}
            height={isFullscreen ? 256 : isMobile ? 40 : 64}
          />
        )}
      </figure>
      <div className={trackInfoClasses}>
        <div className="flex-1">
          <div className={titleClasses}>{onDeck ? onDeck.title : ""}</div>
          <div className={artistClasses}>
            {onDeck ? onDeck.artist.title : ""}
          </div>
        </div>
        {(isFullscreen || !isMobile) && (
          <div id="actions" className={actionClasses}>
            <Button circle ghost>
              <Icon name="heart" />
            </Button>
            <Button circle ghost>
              <Icon name="ellipsis-horizontal" solid />
            </Button>
          </div>
        )}
      </div>
      {isMobile && onDeck && !isFullscreen && (
        <button
          className="absolute -top-8 right-0 -bottom-16 -left-8"
          onClick={() => {
            setIsFullscreen(true);
          }}
        />
      )}
    </div>
  );
};

const PlayerControls = ({
  back,
  isFullscreen,
  isPlaying,
  next,
  onDeck,
  togglePlay
}) => {
  const PlayerControlClasses = cn({
    "flex flex-col gap-4": true,
    "md:w-1/3": !isFullscreen,
    "w-full transition duration-300": isFullscreen
  });

  const skipClasses = cn({
    "hidden md:flex": !isFullscreen
  });

  return (
    <div className={PlayerControlClasses}>
      <div className="flex items-center justify-center gap-8">
        <Button
          circle
          onClick={back}
          disabled={!onDeck}
          className={skipClasses}
        >
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
        <Button
          circle
          onClick={next}
          disabled={!onDeck}
          className={skipClasses}
        >
          <Icon name="play-skip-forward" solid />
        </Button>
      </div>
      {!isFullscreen && (
        <PlaybackBar isFullscreen={isFullscreen} onDeck={onDeck} />
      )}
    </div>
  );
};

const PlaybackBar = ({ isFullscreen, onDeck }) => {
  const containerClasses = cn({
    "grid gap-8 items-center col-span-2 transition": true,
    "opacity-0 md:opacity-100": !onDeck,
    "grid-cols-[1fr] grid-rows-[4px] md:grid-cols-[40px,1fr,40px] md:grid-rows-[8px,1fr] absolute left-0 bottom-0 right-0 w-auto md:static": !isFullscreen,
    "w-full": isFullscreen
  });

  const timeClasses = cn({
    "min-w-40 text-xs text-primary-50": true,
    "hidden md:block row-span-2": !isFullscreen
  });

  const elapsedClasses = cn({
    [timeClasses]: true,
    "text-right": !isFullscreen,
    "col-start-1 row-start-2": isFullscreen
  });

  const durationClasses = cn({
    [timeClasses]: true,
    "col-start-3 row-start-2 text-right": isFullscreen
  });

  const barClasses = cn({
    "flex-1 h-4 bg-primary-25 rounded-full relative": true,
    "md:col-span-1 md:row-span-2": !isFullscreen,
    "col-start-1 col-span-3": isFullscreen
  });

  return (
    <div className={containerClasses}>
      <time className={`${elapsedClasses}`}>0:00</time>
      <div className={barClasses}>
        <span className="bg-accent absolute left-0 top-0 bottom-0 right-1/2 rounded-full" />
      </div>
      <time className={durationClasses}>0:00</time>
    </div>
  );
};

const ExtraControls = ({
  isFullscreen,
  onDeck,
  queueCount,
  queueIsOpen,
  setIsFullscreen,
  setQueueIsOpen
}) => {
  const containerClasses = cn({
    "flex items-center gap-8": true,
    "hidden md:flex flex-1 justify-end": !isFullscreen,
    "justify-between w-full": isFullscreen
  });

  return (
    <div className={containerClasses}>
      <Button
        circle
        className={queueIsOpen ? "bg-accent" : ""}
        disabled={!onDeck && queueCount === 0}
        onClick={() => {
          setIsFullscreen(false);
          setQueueIsOpen(!queueIsOpen);
        }}
        aria-controls="queue"
        aria-expanded={!queueIsOpen}
        aria-label="Show Queue"
      >
        <Icon name={queueIsOpen ? "close" : "list"} solid />
      </Button>
      <Button
        circle
        disabled={!onDeck && queueCount === 0}
        onClick={() => {
          setQueueIsOpen(false);
          setIsFullscreen(!isFullscreen);
        }}
        aria-controls="full-screen"
        aria-expanded={!isFullscreen}
        aria-label="Full Screen"
      >
        <Icon name={isFullscreen ? "chevron-down" : "chevron-up"} solid />
      </Button>
    </div>
  );
};

// Default
// ----------------------------------------------------------------------------

export default function Player() {
  const [queueIsOpen, setQueueIsOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const context = useContext(AudioContext);
  const { nextFrom, onDeck, playing, prevFrom, queue } = context.state;
  const { setNextFrom, setOnDeck, setPlaying, setPrevFrom, setQueue } = context;
  const queueCount = prevFrom.length + nextFrom.length + queue.length;
  const isDesktop = useMediaQuery(BREAKPOINTS.desktop);
  const isMobile = useMediaQuery(BREAKPOINTS.mobile);

  useEffect(() => {
    if (!onDeck && queueCount === 0) {
      setQueueIsOpen(false);
      // setIsFullscreen(false);
    }
  }, [onDeck, queueCount]);

  function togglePlay() {
    setPlaying(!playing);
  }

  function isPlaying() {
    return onDeck && playing;
  }

  function next() {
    if (onDeck && onDeck.listType === "playlist") {
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
    "flex items-center gap-8 px-8 md:col-span-2 md:shadow-none md:mx-0": true,
    "rounded-lg border border-primary-10 shadow mx-8 mb-8 relative md:border-t md:mb-0": !isFullscreen,
    "absolute z-50 top-0 left-0 w-full h-full flex-col justify-end bg-ground p-24 md:p-48 lg:p-96": isFullscreen
  });

  return (
    <>
      <aside className={playerClasses}>
        <OnDeck
          onDeck={onDeck}
          isFullscreen={isFullscreen}
          isMobile={isMobile}
          setIsFullscreen={setIsFullscreen}
        />
        {isFullscreen && (
          <PlaybackBar isFullscreen={isFullscreen} onDeck={onDeck} />
        )}
        <PlayerControls
          back={back}
          isFullscreen={isFullscreen}
          isPlaying={isPlaying()}
          next={next}
          onDeck={onDeck}
          togglePlay={togglePlay}
        />
        <ExtraControls
          isFullscreen={isFullscreen}
          onDeck={onDeck}
          queueCount={queueCount}
          queueIsOpen={queueIsOpen}
          setIsFullscreen={setIsFullscreen}
          setQueueIsOpen={setQueueIsOpen}
        />
      </aside>
      <Queue queueIsOpen={queueIsOpen} setQueueIsOpen={setQueueIsOpen} />
    </>
  );
}
