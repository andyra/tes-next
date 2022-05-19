import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Transition } from "@headlessui/react";
import { useMediaQuery } from "react-responsive";
import Moment from "moment";
import cn from "classnames";
import { usePlayerContext } from "../../context/PlayerContext";
import CurrentTrack from "./CurrentTrack";
import ExtraControls from "./ExtraControls";
import MediaQuery, { BREAKPOINTS } from "../MediaQuery";
import PlayerControls from "./PlayerControls";
import Queue from "../Queue";

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

  // Refs
  // https://letsbuildui.dev/articles/building-an-audio-player-with-react-hooks
  // TODO • duration
  // TODO • elapsed
  // TODO • rate
  // TODO • loading?
  const audioSrc = "http://goldfirestudios.com/proj/howlerjs/sound.ogg";
  const audioRef = useRef(typeof Audio !== "undefined" && new Audio(audioSrc));
  const intervalRef = useRef();
  const isReady = useRef(false);
  const { duration } = audioRef.current;
  const [trackProgress, setTrackProgress] = useState(0);

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
    audioRef.current = new Audio(audioSrc);
    setTrackProgress(audioRef.current.currentTime);

    if (isReady.current) {
      audioRef.current.play();
      setIsPlaying(true);
      startTimer();
    } else {
      // Set the isReady ref as true for the next pass
      isReady.current = true;
    }
  }, [currentTrack]);

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

  function startTimer() {
    // Clear any timers already running
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        skipNext();
      } else {
        setTrackProgress(audioRef.current.currentTime);
      }
    }, [1000]);
  }

  function onScrub(value) {
    // Clear any timers already running
    clearInterval(intervalRef.current);
    audioRef.current.currentTime = value;
    setTrackProgress(audioRef.current.currentTime);
  }

  function onScrubEnd() {
    // If not already playing, start
    if (!isPlaying) {
      setIsPlaying(true);
    }
    startTimer();
  }

  const currentPercentage = duration
    ? `${(trackProgress / duration) * 100}%`
    : "0%";
  const trackStyling = `
    -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, #fff), color-stop(${currentPercentage}, #777))
  `;

  function formatDuration(duration) {
    const d = Moment.duration(duration, "seconds");
    const { hours, minutes, seconds } = d._data;
    const h = hours > 0 ? `${hours}:` : "";
    const m = `${minutes > 0 ? minutes : "0"}:`;
    const s = seconds > 9 ? seconds : `0${seconds}`;
    return `${h}${m}${s}`;
  }

  function formatElapsed(current, duration) {
    const c = Moment.duration(current, "seconds");
    const d = Moment.duration(duration, "seconds");
    const { hours, minutes, seconds } = c._data;

    const hoursPlaceholder = d._data.hours > 9 ? "00:" : d._data.hours > 0 ? "0:" : "";
    const minutesPlaceholder = d._data.minutes > 9 ? "00:" : "0:";

    const h = hours > 0 ? `${hours}:` : hoursPlaceholder;
    const m = minutes > 0 : minutesPlaceholder;
    const s = seconds > 9 ? seconds : `0${seconds}`;
    return `${h}${m}${s}`;
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
        <input
          className="h-8 w-320 bg-accent cursor-pointer appearance-none"
          type="range"
          value={trackProgress}
          step="1"
          min="0"
          max={duration ? duration : `${duration}`}
          className="progress"
          onChange={e => onScrub(e.target.value)}
          onMouseUp={onScrubEnd}
          onKeyUp={onScrubEnd}
          style={{ background: trackStyling }}
        />
        <mark>{formatDuration(duration)}</mark>
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
