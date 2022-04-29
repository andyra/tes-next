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

const OnDeck = ({ isFullScreen, isMobile, onDeck, setIsFullScreen }) => {
  const onDeckClasses = cn({
    "flex items-center relative bg-red-200": true,
    "gap-8 w-full md:w-1/3": !isFullScreen,
    "gap-48 mb-48": isFullScreen
  });

  const coverArtClasses = cn({
    "bg-primary-10 rounded flex items-center justify-center text-2xl flex-shrink-0 overflow-hidden": true,
    "h-40 w-40 md:h-64 md:w-64": !isFullScreen,
    "h-256 w-256": isFullScreen
  });

  const actionClasses = cn({
    "flex items-center gap-2 pl-16 transition duration-300": true,
    "opacity-0": !onDeck
  });

  const titleClasses = cn({
    "opacity-0": !onDeck,
    "text-sm font-medium transition duration-300": !isFullScreen,
    "text-7xl font-bold mb-16": isFullScreen
  });

  const artistClasses = cn({
    "opacity-0": !onDeck,
    "text-xs text-primary-50 transition duration-300": !isFullScreen,
    "text-3xl font-medium": isFullScreen
  });

  return (
    <div className={onDeckClasses}>
      <figure id="cover-art" className={coverArtClasses}>
        {onDeck && (
          <Image
            alt={`${onDeck.collection.title} cover art`}
            src={onDeck.collection.coverArtUrl}
            width={isFullScreen ? 256 : isMobile ? 40 : 64}
            height={isFullScreen ? 256 : isMobile ? 40 : 64}
          />
        )}
      </figure>
      <div id="track-info">
        <div className={titleClasses}>{onDeck ? onDeck.title : ""}</div>
        <div className={artistClasses}>{onDeck ? onDeck.artist.title : ""}</div>
      </div>
      {(isFullScreen || !isMobile) && (
        <div id="actions" className={actionClasses}>
          <Button circle ghost>
            <Icon name="heart" />
          </Button>
          <Button circle ghost>
            <Icon name="ellipsis-horizontal" solid />
          </Button>
        </div>
      )}
      {isMobile && !isFullScreen && (
        <button
          className="absolute -top-8 right-0 -bottom-16 -left-8"
          onClick={() => {
            setIsFullScreen(true);
          }}
        />
      )}
    </div>
  );
};

const PlayerControls = ({
  back,
  isFullScreen,
  isMobile,
  isPlaying,
  next,
  onDeck,
  togglePlay
}) => {
  const PlayerControlClasses = cn({
    "flex flex-col gap-4 bg-cyan-200": true,
    "md:w-1/3": !isFullScreen,
    "py-96 transition duration-300": isFullScreen
  });

  return (
    <div className={PlayerControlClasses}>
      <div className="flex items-center justify-center gap-8">
        <Button
          circle
          onClick={back}
          disabled={!onDeck}
          className="hidden md:flex"
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
          className="hidden md:flex"
        >
          <Icon name="play-skip-forward" solid />
        </Button>
      </div>
      <PlaybackBar isFullScreen={isFullScreen} onDeck={onDeck} />
    </div>
  );
};

const PlaybackBar = ({ isFullScreen, onDeck }) => {
  const containerClasses = cn({
    "flex items-center gap-8 col-span-2 transition bg-orange-200": true,
    "absolute left-0 bottom-0 right-0 md:static": true,
    "w-auto": true,
    "opacity-0 md:opacity-100": !onDeck
  });

  const timeClasses = cn({
    "min-w-40 text-xs text-primary-50 bg-purple-200": true,
    "hidden md:block": !isFullScreen
  });

  return (
    <div className={containerClasses}>
      <time className={`${timeClasses} text-right`}>0:00</time>
      <div className="flex-1 h-4 bg-primary-25 rounded-full" />
      <time className={timeClasses}>0:00</time>
    </div>
  );
};

const ExtraControls = ({
  isFullScreen,
  isMobile,
  onDeck,
  queueCount,
  queueIsOpen,
  setIsFullScreen,
  setQueueIsOpen
}) => {
  const containerClasses = cn({
    "flex-1 flex items-center justify-end gap-8 bg-yellow-200": true,
    "absolute top-96 right-96": isFullScreen,
    "hidden md:flex md:w-1/3": !isFullScreen
  });

  const queueButtonClasses = cn({
    "bg-accent": queueIsOpen,
    hidden: isFullScreen
  });

  return (
    <div className={containerClasses}>
      <Button
        circle
        disabled={!onDeck && queueCount === 0}
        onClick={() => {
          setQueueIsOpen(false);
          setIsFullScreen(!isFullScreen);
        }}
        aria-controls="full-screen"
        aria-expanded={!isFullScreen}
        aria-label="Full Screen"
      >
        <Icon name={isFullScreen ? "close" : "chevron-up"} solid />
      </Button>
      <Button
        circle
        className={queueButtonClasses}
        disabled={!onDeck && queueCount === 0}
        onClick={() => {
          setIsFullScreen(false);
          setQueueIsOpen(!queueIsOpen);
        }}
        aria-controls="queue"
        aria-expanded={!queueIsOpen}
        aria-label="Show Queue"
      >
        <Icon name={queueIsOpen ? "close" : "list"} solid />
      </Button>
    </div>
  );
};

// Default
// ----------------------------------------------------------------------------

export default function Player() {
  const [queueIsOpen, setQueueIsOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const context = useContext(AudioContext);
  const { nextFrom, onDeck, playing, prevFrom, queue } = context.state;
  const { setNextFrom, setOnDeck, setPlaying, setPrevFrom, setQueue } = context;
  const queueCount = prevFrom.length + nextFrom.length + queue.length;
  const isDesktop = useMediaQuery(BREAKPOINTS.desktop);
  const isMobile = useMediaQuery(BREAKPOINTS.mobile);

  useEffect(() => {
    if (!onDeck && queueCount === 0) {
      setQueueIsOpen(false);
      setIsFullScreen(false);
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
    "flex items-center gap-8 px-8 relative": true,
    "rounded-lg border shadow mx-8": true,
    "md:col-span-2 md:border-none md:border-t md:shadow-none md:mx-0": true

    // "grid grid-cols-[1fr,48px] grid-rows-[1fr,8px]": true
    // "md:flex md:items-center md:justify-between": true,
    // "col-span-2 p-8 gap-4 md:gap-8 border mx-4 mb-4 rounded-lg border-primary-10 md:border-t md:m-0 md:rounded-none": !isFullScreen,
    // "flex flex-col justify-end absolute z-50 top-0 left-0 w-full h-full bg-ground pt-96 px-96": isFullScreen
  });

  return (
    <>
      <aside className={playerClasses}>
        <OnDeck
          onDeck={onDeck}
          isFullScreen={isFullScreen}
          isMobile={isMobile}
          setIsFullScreen={setIsFullScreen}
        />
        <PlayerControls
          back={back}
          isFullScreen={isFullScreen}
          isMobile={isMobile}
          isPlaying={isPlaying()}
          next={next}
          onDeck={onDeck}
          togglePlay={togglePlay}
        />
        <ExtraControls
          isFullScreen={isFullScreen}
          isMobile={isMobile}
          onDeck={onDeck}
          queueCount={queueCount}
          queueIsOpen={queueIsOpen}
          setIsFullScreen={setIsFullScreen}
          setQueueIsOpen={setQueueIsOpen}
        />
      </aside>
      <Queue queueIsOpen={queueIsOpen} setQueueIsOpen={setQueueIsOpen} />
    </>
  );
}
