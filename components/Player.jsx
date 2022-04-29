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
    "flex items-center transition relative": true,
    "flex-1 gap-8": !isFullScreen,
    "gap-48 mb-48": isFullScreen
  });

  const coverArtClasses = cn({
    "bg-primary-10 rounded flex items-center justify-center text-2xl flex-shrink-0 overflow-hidden": true,
    "h-40 w-40 md:h-64 md:w-64": !isFullScreen,
    "h-256 w-256": isFullScreen
  });

  const titleClasses = cn({
    "text-sm font-medium": !isFullScreen,
    "text-7xl font-bold mb-16": isFullScreen
  });

  const artistClasses = cn({
    "text-xs text-primary-50": !isFullScreen,
    "text-3xl font-medium": isFullScreen
  });

  return (
    <div className={onDeckClasses}>
      <figure className={coverArtClasses}>
        {onDeck && (
          <Image
            alt={`${onDeck.collection.title} cover art`}
            src={onDeck.collection.coverArtUrl}
            width={isFullScreen ? 256 : isMobile ? 40 : 64}
            height={isFullScreen ? 256 : isMobile ? 40 : 64}
          />
        )}
      </figure>
      <div>
        <div className={titleClasses}>{onDeck ? onDeck.title : ""}</div>
        <div className={artistClasses}>{onDeck ? onDeck.artist.title : ""}</div>
      </div>
      {!isMobile ||
        (isFullScreen && (
          <Button circle ghost className="ml-16">
            <Icon name="heart" />
          </Button>
        ))}
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
    "flex flex-col gap-4": true,
    "w-full": !isMobile,
    "max-w-screen-sm": !isFullScreen,
    "py-96 opacity-0 hover:opacity-100 transition duration-300": isFullScreen
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
      {!isMobile && <Progress />}
    </div>
  );
};

const Progress = ({ isFullScreen, isMobile, onDeck }) => {
  const containerClasses = cn({
    "flex items-center gap-8 col-span-2 transition": true,
    "-mx-8 w-auto md:-mx-0": true,
    "opacity-0 md:opacity-100": !onDeck
  });

  const timeClasses = cn({
    "w-48 font-mono text-xs text-primary-50": true,
    hidden: isMobile && !isFullScreen
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
    "flex-1 flex items-center justify-end gap-8": true,
    "absolute top-96 right-96": isFullScreen,
    "hidden md:flex": !isFullScreen
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
        Q
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
    "grid grid-cols-[1fr,48px] grid-rows-[1fr,8px]": true,
    "md:flex md:items-center md:justify-between": true,
    "col-span-2 p-8 gap-4 md:gap-8 border mx-4 mb-4 rounded-lg border-primary-10 md:border-t md:m-0 md:rounded-none": !isFullScreen,
    "flex flex-col justify-end absolute z-50 top-0 left-0 w-full h-full bg-ground pt-96 px-96": isFullScreen
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
        {isMobile && (
          <Progress
            isFullScreen={isFullScreen}
            isMobile={isMobile}
            onDeck={onDeck}
          />
        )}
      </aside>
      <Queue queueIsOpen={queueIsOpen} setQueueIsOpen={setQueueIsOpen} />
    </>
  );
}
