import { useEffect, useRef } from "react";
import Link from "next/link";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import toast from "react-hot-toast";
import cn from "classnames";
import { usePlayerContext } from "../context/PlayerContext";
import Button, { getButtonClasses } from "../components/Button";
import CoverArt from "../components/CoverArt";
import Icon from "../components/Icon";
import Tooltip from "../components/Tooltip";
import { formatTime } from "../helpers";

// UGH. Can't seem to get the duration. I can SEE the duration in the log
// inside audioRef.current, but I can't output it separately.
const TrackDuration = ({ audioFile }) => {
  // const audioRef = useRef(typeof Audio !== "undefined" && new Audio());
  // const { duration } = audioRef.current;

  // useEffect(() => {
  //   audioRef.current = new Audio(audioFile);
  //   console.log(audioRef);
  //   console.log(audioRef.current.duration);
  // }, [duration]);

  return (
    <time className="text-sm text-primary-50 mr-8 hidden md:block">0:00</time>
  );
};

const TrackTitle = ({ highlightTrack, showCollectionInfo, track }) => (
  <div
    className={`text-xl md:text-2xl flex items-center gap-8 ${
      highlightTrack ? "text-accent" : ""
    }`}
  >
    {showCollectionInfo ? (
      <>
        <CoverArt
          className="w-48 h-48 flex-shrink-0 rounded"
          height={48}
          title={track.collection.title}
          url={track.collection.coverArt}
          width={48}
        />
        <div>
          <div>{track.title}</div>
          <div className="text-sm">{track.collection.title}</div>
        </div>
      </>
    ) : (
      track.title
    )}
  </div>
);

const TrackMenuItem = ({ href, icon, large, title, ...props }) => {
  const classes = cn({
    "flex items-center px-8 hover:bg-primary-5 transition": true,
    "flex-col justify-center gap-4 h-72": large,
    "gap-12 h-40 rounded-lg w-full": !large,
  });

  return (
    <DropdownMenu.Item className="flex-1 hover:outline-0">
      {href ? (
        <Link href={href}>
          <a className={classes} {...props}>
            <Icon name={icon} />
            {title}
          </a>
        </Link>
      ) : (
        <button className={classes} {...props}>
          <Icon name={icon} />
          {title}
        </button>
      )}
    </DropdownMenu.Item>
  );
};

const TrackMenu = ({ addToQueue, track }) => {
  const overflowMenuClasses = cn(
    getButtonClasses({
      variant: "ghost",
      circle: true,
    }),
    "opacity-0 group-hover:opacity-100"
  );

  const contentClasses = cn(
    "w-256 bg-ground border-2 border-primary-10 rounded-lg",
    "radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down"
  );

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className={overflowMenuClasses}>
        <Icon name="Overflow" />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content className={contentClasses}>
        <DropdownMenu.Group className="p-8">
          {track.uri && (
            <TrackMenuItem
              title="Go to song"
              href={`/${track.uri}`}
              icon="Moon"
            />
          )}
          <TrackMenuItem
            title={`Go to ${track.collection.entryType}`}
            href={`/${track.collection.uri}`}
            icon={track.collection.entryType === "episode" ? "Mic" : "Music"}
          />
          <TrackMenuItem
            title="Add to queue"
            onClick={() => {
              addToQueue(track);
            }}
            icon="Plus"
            type="button"
          />
          {track.audioFile && (
            <TrackMenuItem
              title="Download"
              href={track.audioFile}
              icon="Download"
              download={track.title}
              target="_blank"
              noopener
              noreferrer
            />
          )}
        </DropdownMenu.Group>
        <DropdownMenu.Separator />
        <DropdownMenu.Arrow />
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export const Tracklist = ({ queueable = true, showCollectionInfo, tracks }) => {
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
    setQueueList,
  } = usePlayerContext();

  function togglePlay() {
    setIsPlaying(!isPlaying);
  }

  function selectTrack(track, i) {
    const selectedTrackIsCurrent =
      currentTrack && currentTrack.id === track.id && !track.addedViaQueue;

    if (selectedTrackIsCurrent) {
      togglePlay();
    } else {
      setCurrentTrack(track);
      setIsPlaying(true);
      updateList(track, i);
    }
  }

  // Shorten or add to queue listTypes
  function updateList(selectedTrack, i) {
    // Filter out tracks with no audioFile
    const tracksBefore = [...tracks].splice(0, i).filter((track) => {
      return track.audioFile;
    });
    const tracksAfter = [...tracks].splice(i + 1).filter((track) => {
      return track.audioFile;
    });

    if (selectedTrack.addedViaQueue) {
      setQueueList(tracksAfter);
    } else {
      setPrevList(tracksBefore);
      setNextList(tracksAfter);
    }
  }

  function highlightTrack(track) {
    return (
      currentTrack &&
      currentTrack.id === track.id &&
      !track.addedViaQueue &&
      !currentTrack.addedViaQueue
    );
  }

  function addToQueue(track) {
    const newQueueList = [...queueList];
    const newTrack = Object.assign({}, track);
    newTrack.addedViaQueue = true;
    setQueueList(newQueueList.concat(newTrack));
    toast.success("Added to queue");
  }

  function removeFromQueue(track, i) {
    let newQueueList = [...queueList];
    newQueueList.splice(i, 1);
    setQueueList(newQueueList);
  }

  const PlayPauseButton = ({ track, i }) => {
    const active = highlightTrack(track) && isPlaying;
    const buttonClasses = cn({
      "absolute top-0 left-0": true,
      "opacity-0 group-hover:opacity-100": !active,
    });

    return (
      <div className="flex items-center justify-center relative h-32 w-32 flex-shrink-0">
        <span
          className={`text-primary-50 ${
            track.audioFile && "group-hover:opacity-0"
          }`}
        >
          {track.position}
        </span>
        {track.audioFile && (
          <Button
            active={active}
            className={buttonClasses}
            circle
            variant="ghost"
            onClick={() => {
              selectTrack(track, i);
            }}
          >
            <Icon
              name={
                highlightTrack(track) ? (isPlaying ? "Pause" : "Play") : "Play"
              }
            />
          </Button>
        )}
      </div>
    );
  };

  const TrackItem = ({ track, i }) => {
    const liClasses = cn({
      "flex gap-8 px-8 -mx-8 h-64 rounded-lg cursor-default transition group": true,
      "text-secondary hover:bg-primary-5 focus:bg-primary-10": track.audioFile,
      "text-secondary-50": !track.audioFile,
    });

    return (
      <li className={liClasses} tabIndex={0} key={i}>
        <div className="flex-1 flex items-center gap-8">
          <PlayPauseButton track={track} i={i} />
          <TrackTitle
            highlightTrack={highlightTrack(track)}
            showCollectionInfo={showCollectionInfo}
            track={track}
          />
        </div>
        <div id="actions" className="flex items-center gap-2">
          {track.audioFile && (
            <>
              <TrackDuration audioFile={track.audioFile} />
              <TrackMenu track={track} addToQueue={addToQueue} />
              {queueable ? (
                <Button
                  circle
                  className="opacity-0 group-hover:opacity-100"
                  variant="ghost"
                  onClick={() => {
                    addToQueue(track);
                  }}
                >
                  <Icon name="Plus" />
                </Button>
              ) : (
                <Button
                  circle
                  className="opacity-0 group-hover:opacity-100"
                  variant="ghost"
                  onClick={() => {
                    removeFromQueue(track, i);
                  }}
                >
                  <Icon name="X" />
                </Button>
              )}
            </>
          )}
        </div>
      </li>
    );
  };

  return (
    <ul>
      {tracks.map((track, i) => (
        <TrackItem track={track} i={i} key={track.id} />
      ))}
    </ul>
  );
};

export default Tracklist;
