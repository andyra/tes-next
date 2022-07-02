import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import toast from "react-hot-toast";
import cn from "classnames";
import { usePlayerContext } from "context/PlayerContext";
import Button from "components/Button";
import CoverArt from "components/CoverArt";
import Icon from "components/Icon";
import Tooltip from "components/Tooltip";
import TrackMenu from "components/TrackMenu";
import PlayPauseButton from "components/PlayPauseButton";
import { getCollectionType, getTrackType } from "helpers/index";
import { formatTime } from "helpers/utils";

const DurationSSR = ({ src }) => {
  const [duration, setDuration] = useState(0);

  if (typeof window === "undefined") {
    const { getAudioDurationInSeconds } = require("get-audio-duration");

    getAudioDurationInSeconds(src).then(d => {
      setDuration(d);
      return d;
    });
  }

  return duration;
};

// Tracklist
// ----------------------------------------------------------------------------

const DurationBrowser = ({ src }) => {
  const [duration, setDuration] = useState(false);
  const audioRef = useRef(typeof Audio !== "undefined" && new Audio());

  useEffect(() => {
    let duationThing = true;
    // I used to have this wrapped in a return
    if (duationThing) {
      audioRef.current = new Audio(src);
      audioRef.current.onloadeddata = () => {
        setDuration(audioRef.current.duration);
      };
    }

    // Cleanup
    return () => {
      duationThing = false;
    };
  }, []);

  return (
    <time
      className={`font-mono text-sm mr-8 hidden md:block ${
        duration ? "text-primary-50" : "text-primary animate-loading"
      }`}
    >
      {duration ? formatTime(duration) : "0:00"}
    </time>
  );
};

export const Tracklist = ({
  queueable = true,
  showCollectionInfo,
  showTrackType,
  tracks
}) => {
  const {
    currentTrack,
    isPlaying,
    isLoading,
    queueList,
    setQueueList
  } = usePlayerContext();

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

  const TrackItem = ({ track, i }) => {
    const trackIsSelected =
      currentTrack &&
      currentTrack.id === track.id &&
      !track.addedViaQueue &&
      !currentTrack.addedViaQueue;

    const liClasses = cn({
      "flex items-center gap-8 px-8 py-4 md:py-12 -mx-8 rounded-lg hover:bg-primary-5 focus:bg-primary-10": true,
      "cursor-default transition relative group": true,
      "text-secondary": track.audioFile,
      "text-secondary-50": !track.audioFile
    });

    const indexClasses = cn({
      "hidden md:flex items-center justify-center relative h-40 w-40 flex-shrink-0 font-mono text-primary-50": true,
      "group-hover:opacity-0": track.audioFile,
      "opacity-0": trackIsSelected
    });

    const playButtonClasses = cn({
      "md:absolute md:top-1/2 md:left-0 md:-translate-y-1/2": true,
      "md:opacity-0 md:group-hover:opacity-100": !trackIsSelected
    });

    const titleClasses = cn({
      "text-xl md:text-2xl flex items-center gap-8 md:gap-16 flex-1": true,
      "text-accent": trackIsSelected
    });

    return (
      <li className={liClasses} tabIndex={0} key={i}>
        <div className="flex-1 flex items-center gap-8 relative">
          <div className={indexClasses}>{track.position}</div>
          {track.audioFile && (
            <PlayPauseButton
              className={playButtonClasses}
              i={i}
              isLoading={isLoading && trackIsSelected}
              track={track}
              tracklist={tracks}
              variant="ghost"
            />
          )}
          <div className={titleClasses}>
            {showCollectionInfo ? (
              <>
                <CoverArt
                  className="w-40 h-40 md:w-48 md:h-48 flex-shrink-0 rounded"
                  height={48}
                  title={track.collection.title}
                  url={track.collection.coverArt}
                  width={48}
                />
                <div>
                  <div className="font-medium">{track.title}</div>
                  <div className="text-sm text-primary-75">
                    {track.collection.title}
                  </div>
                </div>
              </>
            ) : showTrackType ? (
              <div className="flex-1 flex items-center justify-between gap-8">
                <div>{track.title}</div>
                {track.type === "song" && (
                  <div className="text-xs uppercase tracking-wide text-primary-50 px-12 rounded-full flex items-center h-24 bg-primary-5">
                    {track.type}
                  </div>
                )}
              </div>
            ) : (
              track.title
            )}
          </div>
        </div>
        <div id="actions" className="flex items-center gap-2">
          {track.audioFile ? (
            <DurationBrowser src={track.audioFile} />
          ) : (
            <span className="text-sm text-primary-25 opacity-0 group-hover:opacity-100 transition mr-4">
              No audio
            </span>
          )}
          <TrackMenu
            track={track}
            addToQueue={addToQueue}
            removeFromQueue={removeFromQueue}
            queueable={queueable}
            i={i}
          />
        </div>
      </li>
    );
  };

  return (
    <ul className="-mx-8">
      {tracks.map((track, i) => (
        <TrackItem track={track} i={i} key={track.id} />
      ))}
    </ul>
  );
};

Tracklist.propTypes = {
  queueable: PropTypes.bool,
  showCollectionInfo: PropTypes.bool,
  showTrackType: PropTypes.bool,
  tracks: PropTypes.array.isRequired
};

export default Tracklist;
