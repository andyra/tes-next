import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { Transition } from "@headlessui/react";
import { useMediaQuery } from "react-responsive";
import cn from "classnames";
import AudioContext from "../context/AudioContext";
import Button from "./Button";
import Icon from "./Icon";
import MediaQuery, { BREAKPOINTS } from "./MediaQuery";
import Queue from "./Queue";
import Tooltip from "./Tooltip";

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

  const trackInfoClasses = cn({
    "flex gap-8 transition duration-300": true,
    "my-auto md:my-0 md:flex-1": isFullscreen
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
  isFullscreen,
  isLooped,
  isPlaying,
  isRandom,
  playerIsEmpty,
  skipBack,
  skipNext,
  toggleLoop,
  togglePlay,
  toggleRandom
}) => {
  const playerControlClasses = cn({
    "flex flex-col gap-4": true,
    "md:w-1/3": !isFullscreen,
    "w-full transition duration-300": isFullscreen
  });

  const extraButtonClasses = cn({
    "hidden md:flex": !isFullscreen
  });

  const randomClasses = cn({
    [extraButtonClasses]: true,
    "text-accent": isRandom
  });

  const loopClasses = cn({
    [extraButtonClasses]: true,
    "text-accent": isLooped
  });

  const playbackBarClasses = cn({
    "grid gap-8 items-center col-span-2 transition": true,
    "grid-cols-[1fr] grid-rows-[4px] md:grid-cols-[40px,1fr,40px] md:grid-rows-[8px,1fr] absolute left-0 bottom-0 right-0 w-auto md:static": !isFullscreen,
    "w-full order-first": isFullscreen
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
    <div className={playerControlClasses}>
      <div className="flex items-center justify-center gap-8">
        <Button
          circle
          className={randomClasses}
          disabled={playerIsEmpty}
          onClick={toggleRandom}
          variant="ghost"
        >
          <Icon name="shuffle" solid />
        </Button>
        <Button
          circle
          className={extraButtonClasses}
          disabled={playerIsEmpty}
          onClick={skipBack}
          variant="ghost"
        >
          <Icon name="play-skip-back" solid />
        </Button>
        <Button
          active={isPlaying}
          circle
          disabled={playerIsEmpty}
          onClick={togglePlay}
          size="lg"
        >
          <Icon name={isPlaying ? "pause" : "play"} solid />
        </Button>
        <Button
          circle
          className={extraButtonClasses}
          disabled={playerIsEmpty}
          onClick={skipNext}
          variant="ghost"
        >
          <Icon name="play-skip-forward" solid />
        </Button>
        <Button
          circle
          className={loopClasses}
          disabled={playerIsEmpty}
          onClick={toggleLoop}
          variant="ghost"
        >
          <Icon name="infinite" solid />
        </Button>
      </div>
      <div className={playbackBarClasses}>
        <time className={`${elapsedClasses}`}>0:00</time>
        <div className={barClasses}>
          <span className="bg-accent absolute left-0 top-0 bottom-0 right-1/2 rounded-full" />
        </div>
        <time className={durationClasses}>0:00</time>
      </div>
    </div>
  );
};

const ExtraControls = ({
  isFullscreen,
  queueIsOpen,
  playerIsEmpty,
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
        active={queueIsOpen}
        circle
        disabled={playerIsEmpty}
        onClick={() => {
          setIsFullscreen(false);
          setQueueIsOpen(!queueIsOpen);
        }}
        aria-controls="queue"
        aria-expanded={!queueIsOpen}
        aria-label="Show Queue"
      >
        <Icon name="list" solid />
      </Button>
      <Button
        circle
        disabled={playerIsEmpty}
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
  const context = useContext(AudioContext);
  const { nextList, onDeck, isPlaying, prevList, queueList } = context.state;
  const {
    setIsPlaying,
    setNextList,
    setOnDeck,
    setPrevList,
    setQueueList
  } = context;

  const [queueIsOpen, setQueueIsOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLooped, setIsLooped] = useState(false);
  const [isRandom, setIsRandom] = useState(false);

  const playerIsEmpty =
    !onDeck && prevList.length + nextList.length + queueList.length === 0;
  const isDesktop = useMediaQuery(BREAKPOINTS.desktop);
  const isMobile = useMediaQuery(BREAKPOINTS.mobile);

  useEffect(() => {
    if (playerIsEmpty) {
      setIsPlaying(false);
      setQueueIsOpen(false);
      setIsFullscreen(false);
    }
  }, [playerIsEmpty]);

  function togglePlay() {
    setIsPlaying(!isPlaying);
  }

  function addToprevList(item) {
    const newprevList = [...prevList];
    newprevList.push(item);
    setPrevList(newprevList);
  }

  function skipNext() {
    if (onDeck && onDeck.listType === "playlist") {
      addToprevList(onDeck);
    }
    if (queueList.length) {
      const newOnDeck = queueList.shift();
      setOnDeck(newOnDeck);
      setQueueList(queueList);
    } else if (nextList.length) {
      const newOnDeck = nextList.shift();
      setOnDeck(newOnDeck);
      setNextList(nextList);
    } else {
      setOnDeck(null);
      setPrevList([]);
    }
  }

  function skipBack() {
    const newprevList = [...prevList];
    if (newprevList.length) {
      const newOnDeck = newprevList.pop();
      setPrevList(newprevList);
      setOnDeck(newOnDeck);

      const newnextList = [...nextList];
      newnextList.unshift(onDeck);
      setNextList(newnextList);
    } else {
      setOnDeck(null);
      setNextList([]);
    }
  }

  function toggleLoop() {
    setIsLooped(!isLooped);
  }

  function toggleRandom() {
    setIsRandom(!isRandom);
  }

  const playerClasses = cn({
    "flex items-center gap-8 md:col-span-2 md:shadow-none md:mx-0": true,
    "p-8 rounded-lg md:rounded-none border border-primary-10 shadow mx-8 mb-8 relative md:border-t md:mb-0": !isFullscreen,
    "absolute z-50 top-0 left-0 w-full h-full flex-col justify-end bg-ground px-24 py-24 md:p-48 lg:p-96": isFullscreen
  });

  return (
    <>
      <aside className={playerClasses}>
        <OnDeck
          isFullscreen={isFullscreen}
          isMobile={isMobile}
          onDeck={onDeck}
          setIsFullscreen={setIsFullscreen}
        />
        <PlayerControls
          isFullscreen={isFullscreen}
          isLooped={isLooped}
          isPlaying={isPlaying}
          isRandom={isRandom}
          playerIsEmpty={playerIsEmpty}
          skipBack={skipBack}
          skipNext={skipNext}
          toggleLoop={toggleLoop}
          togglePlay={togglePlay}
          toggleRandom={toggleRandom}
        />
        <ExtraControls
          isFullscreen={isFullscreen}
          playerIsEmpty={playerIsEmpty}
          queueIsOpen={queueIsOpen}
          setIsFullscreen={setIsFullscreen}
          setQueueIsOpen={setQueueIsOpen}
        />
      </aside>
      <Queue queueIsOpen={queueIsOpen} setQueueIsOpen={setQueueIsOpen} />
    </>
  );
}
