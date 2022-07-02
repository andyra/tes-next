import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import ReactHowler from "react-howler";
import toast from "react-hot-toast";
import { useMediaQuery } from "react-responsive";
import cn from "classnames";
import { usePlayerContext } from "context/PlayerContext";
import MediaQuery, { BREAKPOINTS } from "components/MediaQuery";
import CurrentTrack from "./CurrentTrack";
import ExtraControls from "./ExtraControls";
import PlayerControls from "./PlayerControls";
import Visualization from "./Visualization";
import { shuffle } from "helpers/utils";

export const Player = () => {
  const {
    currentTrack,
    isLoading,
    isPlaying,
    nextList,
    prevList,
    queueList,
    setCurrentTrack,
    setIsLoading,
    setIsPlaying,
    setNextList,
    setPrevList,
    setQueueList
  } = usePlayerContext();

  // State
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLooped, setIsLooped] = useState(false);
  const [isRandom, setIsRandom] = useState(false);
  const [duration, setDuration] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [rate, setRate] = useState(1);
  const [isSeeking, setIsSeeking] = useState(false);

  // Refs
  const howlerRef = useRef(null);
  const intervalRef = useRef();

  // Config
  const playerIsEmpty =
    !currentTrack && prevList.length + nextList.length + queueList.length === 0;
  const isMobile = useMediaQuery(BREAKPOINTS.mobile);
  const playerClasses = cn({
    "flex items-center gap-8 bg-ground rounded-lg md:col-span-2 md:mx-0": true,
    "p-8 rounded-lg": !isFullscreen,
    "absolute top-0 left-0 z-player-fullscreen w-full h-full flex-col justify-end px-24 py-24 md:p-48": isFullscreen
  });

  // Hooks
  // ---------------------------------------------------------------------------

  // Handle setup when changing tracks
  useEffect(() => {
    if (currentTrack) {
      if (howlerRef.current.howler._state === "loading") {
        setIsLoading(true);
      }
    }
    setIsPlaying(true);
  }, [currentTrack]);

  // Set elapsed when isPlaying
  useEffect(() => {
    isPlaying ? startElapsedTimer() : clearInterval(intervalRef.current);
  }, [isPlaying]);

  // Turn off the player if there's nothing to play
  useEffect(() => {
    if (playerIsEmpty) {
      setIsPlaying(false);
      setIsFullscreen(false);
    }
  }, [playerIsEmpty]);

  // Pause and clean up on unmount
  useEffect(() => {
    return () => {
      if (howlerRef.current) {
        howlerRef.current.stop();
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Player functions
  // ----------------------------------------------------------------------------

  function togglePlay() {
    setIsPlaying(!isPlaying);
  }

  function handleOnLoad() {
    setIsLoading(false);
    setDuration(howlerRef.current.duration());
  }

  function handleOnEnd() {
    clearInterval(intervalRef.current); // Clear any timers already running
    setIsPlaying(false);

    if (isLooped) {
      // Rewind and start playing
      howlerRef.current.seek(0);
      setElapsed(0);
      setIsPlaying(true);
    } else {
      skipNext();
    }
  }

  function handleOnPlay() {
    setIsLoading(false);
  }

  function handleOnSeek(value) {
    // Clear any timers already running
    clearInterval(intervalRef.current);
    // The Radix Slider value is in an array, so pluck out the first value
    howlerRef.current.seek(value[0]);
    setElapsed(howlerRef.current.seek());
    startElapsedTimer();
  }

  function handleRateChange(newRate) {
    howlerRef.current.rate(newRate);
    setRate(newRate);
  }

  function handleOnLoadError() {
    toast.error("Trouble loading audio file");
    clearInterval(intervalRef.current);
    setIsLoading(false);
    setCurrentTrack(false);
  }

  function handleOnPlayError() {
    toast.error("Trouble playing audio file");
  }

  function startElapsedTimer() {
    clearInterval(intervalRef.current); // Clear any timers already running

    intervalRef.current = setInterval(() => {
      setElapsed(howlerRef.current.seek());
    }, [1000]);
  }

  // List Functions
  // ---------------------------------------------------------------------------

  function addToPrevList(item) {
    const newPrevList = [...prevList];
    newPrevList.push(item);
    setPrevList(newPrevList);
  }

  function skipNext() {
    // Add the current track to prevList
    if (currentTrack && !currentTrack.addedViaQueue) {
      addToPrevList(currentTrack);
    }
    // If there's a Queue, move the first track in it to currentTrack
    if (queueList.length) {
      const newCurrentTrack = queueList.shift();
      setCurrentTrack(newCurrentTrack);
      setQueueList(queueList);
    } else if (nextList.length) {
      // If there's a track in NextList, move it to currentTrack
      // !! Wisdom: nextList includes the current track
      const newCurrentTrack = nextList.shift();
      setCurrentTrack(newCurrentTrack);
      setNextList(nextList);
    } else {
      // If there's nothing to skip to, clear everything
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

    if (isRandom) {
      const orderedNextList = [...nextList].sort((a, b) =>
        a.position > b.position ? 1 : -1
      );
      setNextList(orderedNextList);
    } else {
      const shuffledNextList = shuffle([...nextList]);
      setNextList(shuffledNextList);
    }
  }

  // Render
  // ---------------------------------------------------------------------------

  return (
    <>
      <aside className={playerClasses}>
        {currentTrack && (
          <ReactHowler
            ref={howlerRef}
            // When the sources are swapped we'll pass a new audioSrc prop into
            // ReactHowler which will destroy our currently playing Howler.js and
            // initialize a new Howler.js instance
            src={currentTrack.audioFile}
            playing={isPlaying}
            onLoad={handleOnLoad}
            onEnd={handleOnEnd}
            onPlay={handleOnPlay}
            onSeek={handleOnSeek}
            onLoadError={handleOnLoadError}
            onPlayError={handleOnPlayError}
            rate={rate}
            html5
            preload
          />
        )}
        {isFullscreen && <Visualization visible={isFullscreen} />}
        <CurrentTrack
          isFullscreen={isFullscreen}
          isMobile={isMobile}
          currentTrack={currentTrack}
          setIsFullscreen={setIsFullscreen}
        />
        <PlayerControls
          duration={duration}
          elapsed={elapsed}
          handleOnSeek={handleOnSeek}
          handleRateChange={handleRateChange}
          isFullscreen={isFullscreen}
          isLoading={isLoading}
          isLooped={isLooped}
          isPlaying={isPlaying}
          isRandom={isRandom}
          playerIsEmpty={playerIsEmpty}
          rate={rate}
          skipBack={skipBack}
          skipNext={skipNext}
          toggleLoop={toggleLoop}
          togglePlay={togglePlay}
          toggleRandom={toggleRandom}
        />
        <ExtraControls
          isFullscreen={isFullscreen}
          playerIsEmpty={playerIsEmpty}
          setIsFullscreen={setIsFullscreen}
        />
      </aside>
    </>
  );
};

export default Player;
