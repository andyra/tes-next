import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useMediaQuery } from "react-responsive";
import cn from "classnames";
// import YoutubeBackground from "react-youtube-background";
import { usePlayerContext } from "../../context/PlayerContext";
import CurrentTrack from "./CurrentTrack";
import ExtraControls from "./ExtraControls";
import Visualization from "./Visualization";
import MediaQuery, { BREAKPOINTS } from "../MediaQuery";
import PlayerControls from "./PlayerControls";

// TODO: articles
// https://codesandbox.io/s/5wwj02qy7k?file=/src/index.js
// https://codesandbox.io/s/xj4897445q?file=/src/components/Player/Audio.js
// https://dev.to/nicomartin/how-to-create-a-progressive-audio-player-with-react-hooks-31l1
// http://goldfirestudios.com/proj/howlerjs/sound.ogg

// autoplay: false
// controls: false
// loop: false
// preload: metadata
// src: you know
// timeupdate: set state currentTime
// seeking: set state isPlaying to false
// seeked: set state isPlaying to true
// ratechange: set state rate

export const Player = () => {
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
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLooped, setIsLooped] = useState(false);
  const [isRandom, setIsRandom] = useState(false);
  const [elapsed, setElapsed] = useState(0);

  // Refs
  // https://letsbuildui.dev/articles/building-an-audio-player-with-react-hooks
  const audioRef = useRef(typeof Audio !== "undefined" && new Audio());
  const intervalRef = useRef();
  const isReady = useRef(false);
  const { duration } = audioRef.current;

  // Config
  const playerIsEmpty =
    !currentTrack && prevList.length + nextList.length + queueList.length === 0;
  const isDesktop = useMediaQuery(BREAKPOINTS.desktop);
  const isMobile = useMediaQuery(BREAKPOINTS.mobile);
  const playerClasses = cn({
    "flex items-center gap-8 bg-ground rounded-lg md:col-span-2 md:mx-0": true,
    "p-8 rounded-lg": !isFullscreen,
    "absolute z-50 top-0 left-0 w-full h-full flex-col justify-end px-24 py-24 md:p-48 lg:p-96": isFullscreen,
    hidden: playerIsEmpty
  });

  // Hooks
  // ---------------------------------------------------------------------------

  // Toggle playing
  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
      startTimer();
    } else {
      clearInterval(intervalRef.current);
      audioRef.current.pause();
    }
  }, [isPlaying]);

  // Pause and clean up on unmount
  useEffect(() => {
    return () => {
      audioRef.current.pause();
      clearInterval(intervalRef.current);
    };
  }, []);

  // Handle setup when changing tracks
  useEffect(() => {
    audioRef.current.pause();
    if (currentTrack) {
      audioRef.current = new Audio(currentTrack.audioFile);
      setElapsed(audioRef.current.currentTime);
    }

    if (isReady.current) {
      audioRef.current.play();
      setIsPlaying(true);
      startTimer();
    } else {
      // Set the isReady ref as true for the next pass
      isReady.current = true;
    }
  }, [currentTrack]);

  // Turn off the stereo if nothing is playing
  useEffect(() => {
    if (playerIsEmpty) {
      setIsPlaying(false);
      setIsFullscreen(false);
    }
  }, [playerIsEmpty]);

  // Functions
  // ---------------------------------------------------------------------------

  function togglePlay() {
    setIsPlaying(!isPlaying);
  }

  function addToPrevList(item) {
    const newPrevList = [...prevList];
    newPrevList.push(item);
    setPrevList(newPrevList);
  }

  function skipNext() {
    if (currentTrack && !currentTrack.addedViaQueue) {
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
    const newPrevList = [...prevList];
    if (newPrevList.length) {
      const newCurrentTrack = newPrevList.pop();
      setPrevList(newPrevList);
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

  function startTimer() {
    // Clear any timers already running
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        skipNext();
      } else {
        setElapsed(audioRef.current.currentTime);
      }
    }, [1000]);
  }

  function handleScrub(value) {
    // Clear any timers already running
    clearInterval(intervalRef.current);
    audioRef.current.currentTime = value[0];
    setElapsed(audioRef.current.currentTime);
  }

  function handleScrubEnd() {
    if (!isPlaying) {
      setIsPlaying(true);
    }
    startTimer();
  }

  // Render
  // ---------------------------------------------------------------------------

  return (
    <>
      <aside className={playerClasses}>
        {isFullscreen && <Visualization visible={isFullscreen} />}
        <CurrentTrack
          isFullscreen={isFullscreen}
          isMobile={isMobile}
          currentTrack={currentTrack}
          setIsFullscreen={setIsFullscreen}
        />
        <PlayerControls
          elapsed={elapsed}
          duration={duration}
          isFullscreen={isFullscreen}
          isLooped={isLooped}
          isPlaying={isPlaying}
          isRandom={isRandom}
          handleScrub={handleScrub}
          handleScrubEnd={handleScrubEnd}
          skipBack={skipBack}
          skipNext={skipNext}
          toggleLoop={toggleLoop}
          togglePlay={togglePlay}
          toggleRandom={toggleRandom}
        />
        <ExtraControls
          isFullscreen={isFullscreen}
          setIsFullscreen={setIsFullscreen}
        />
      </aside>
    </>
  );
};

export default Player;
