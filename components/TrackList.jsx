import { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import cn from "classnames";
import { usePlayerContext } from "../context/PlayerContext";
import Button from "../components/Button";
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
    setQueueList
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
    const tracksBefore = [...tracks].splice(0, i).filter(track => {
      return track.audioFile;
    });
    const tracksAfter = [...tracks].splice(i + 1).filter(track => {
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
      "opacity-0 group-hover:opacity-100": !active
    });

    return (
      <div className="flex items-center justify-center relative h-32 w-32 flex-shrink-0">
        <span
          className={`text-primary-50 ${track.audioFile &&
            "group-hover:opacity-0"}`}
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
      "text-secondary-50": !track.audioFile
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
