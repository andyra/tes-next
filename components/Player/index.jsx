import { useEffect, useState } from "react";
import Image from "next/image";
import { Transition } from "@headlessui/react";
import { useMediaQuery } from "react-responsive";
import cn from "classnames";
import { usePlayerContext } from "../../context/PlayerContext";
import CurrentTrack from "./CurrentTrack";
import ExtraControls from "./ExtraControls";
import MediaQuery, { BREAKPOINTS } from "../MediaQuery";
import PlayerControls from "./PlayerControls";
import Queue from "../Queue";

// Default
// -----------------------------------------------------------------------------

export default function Player() {
  const {
    currentTrack,
    isPlaying,
    nextList,
    prevList,
    queueList,
    setCurrentTrack,
    setIsPlaying,
    setNextList,
    setPrevList,
    setQueueList
  } = usePlayerContext();

  // State
  const [queueIsOpen, setQueueIsOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLooped, setIsLooped] = useState(false);
  const [isRandom, setIsRandom] = useState(false);

  // Config
  const playerIsEmpty =
    !currentTrack && prevList.length + nextList.length + queueList.length === 0;
  const isDesktop = useMediaQuery(BREAKPOINTS.desktop);
  const isMobile = useMediaQuery(BREAKPOINTS.mobile);
  const playerClasses = cn({
    "flex items-center gap-8 md:col-span-2 md:shadow-none md:mx-0": true,
    "p-8 rounded-lg md:rounded-none border border-primary-10 shadow mx-8 mb-8 relative md:border-t md:mb-0": !isFullscreen,
    "absolute z-50 top-0 left-0 w-full h-full flex-col justify-end bg-ground px-24 py-24 md:p-48 lg:p-96": isFullscreen
  });

  // Hooks
  // ---------------------------------------------------------------------------

  useEffect(() => {
    if (playerIsEmpty) {
      setIsPlaying(false);
      setQueueIsOpen(false);
      setIsFullscreen(false);
    }
  }, [playerIsEmpty]);

  // Functions
  // ---------------------------------------------------------------------------

  function togglePlay() {
    setIsPlaying(!isPlaying);
  }

  function addToPrevList(item) {
    const newprevList = [...prevList];
    newprevList.push(item);
    setPrevList(newprevList);
  }

  function skipNext() {
    if (currentTrack && currentTrack.listType === "playlist") {
      addToPrevList(currentTrack);
    }
    if (queueList.length) {
      const newCurrentTrack = queueList.shift();
      setCurrentTrack(newCurrentTrack);
      setQueueList(queueList);
    } else if (nextList.length) {
      const newCurrentTrack = nextList.shift();
      setCurrentTrack(newCurrentTrack);
      setNextList(nextList);
    } else {
      setCurrentTrack(null);
      setPrevList([]);
    }
  }

  function skipBack() {
    const newprevList = [...prevList];
    if (newprevList.length) {
      const newCurrentTrack = newprevList.pop();
      setPrevList(newprevList);
      setCurrentTrack(newCurrentTrack);

      const newnextList = [...nextList];
      newnextList.unshift(currentTrack);
      setNextList(newnextList);
    } else {
      setCurrentTrack(null);
      setNextList([]);
    }
  }

  function toggleLoop() {
    setIsLooped(!isLooped);
  }

  function toggleRandom() {
    setIsRandom(!isRandom);
  }

  // Render
  // ---------------------------------------------------------------------------

  return (
    <>
      <aside className={playerClasses}>
        <CurrentTrack
          isFullscreen={isFullscreen}
          isMobile={isMobile}
          currentTrack={currentTrack}
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
