import PropTypes from "prop-types";
import { useEffect, useRef } from "react";
import Link from "next/link";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import toast from "react-hot-toast";
import cn from "classnames";
import { usePlayerContext } from "../context/PlayerContext";
import Button, { getButtonClasses } from "../components/Button";
import CoverArt from "../components/CoverArt";
import Icon from "../components/Icon";
import { Menu, MenuItem } from "../components/Menu";
import Tooltip from "../components/Tooltip";
import PlayPauseButton from "../components/PlayPauseButton";
import { getCollectionType, formatTime } from "../helpers";

// Overflow Menu
// ----------------------------------------------------------------------------

const TrackMenu = ({ addToQueue, track, queueable, removeFromQueue, i }) => {
  const { audioFile, collection, title, uri } = track;
  console.log(collection);
  const overflowMenuClasses = cn(
    getButtonClasses({
      variant: "ghost",
      circle: true
    }),
    "opacity-0 group-hover:opacity-100"
  );

  const contentClasses = cn(
    "w-256 bg-ground border-2 border-primary-10 rounded-lg",
    "radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down"
  );

  return (
    <Menu
      trigger={<Icon name="Overflow" />}
      triggerClassName={overflowMenuClasses}
    >
      {uri && (
        <MenuItem href={`/${uri}`} icon="Moon">
          Go to Song
        </MenuItem>
      )}
      <MenuItem
        href={`/${collection.uri}`}
        icon={collection.type === "episode" ? "Mic" : "Music"}
      >
        Go to <span className="capitalize">{collection.type}</span>
      </MenuItem>
      {queueable ? (
        <MenuItem
          icon="Plus"
          onClick={() => {
            addToQueue(track);
          }}
        >
          Add to Queue
        </MenuItem>
      ) : (
        <MenuItem
          icon="X"
          onClick={() => {
            removeFromQueue(track, i);
          }}
        >
          Remove from Queue
        </MenuItem>
      )}
      {audioFile && (
        <MenuItem
          download={title}
          href={audioFile}
          icon="Download"
          noopener
          noreferrer
          target="_blank"
        >
          Download
        </MenuItem>
      )}
    </Menu>
  );
};

TrackMenu.propTypes = {
  addToQueue: PropTypes.func,
  i: PropTypes.number.isRequired,
  queueable: PropTypes.bool,
  removeFromQueue: PropTypes.func,
  track: PropTypes.object.isRequired
};

// Tracklist
// ----------------------------------------------------------------------------

// UGH. Can't seem to get the duration. I can SEE the duration in the log
// inside audioRef.current, but I can't output it separately.
const TrackDuration = ({ audioFile }) => {
  // const audioRef = useRef(typeof Audio !== "undefined" && new Audio());
  // const { duration } = audioRef.current;

  // useEffect(() => {
  //   audioRef.current = new Audio(audioFile);
  // }, [duration]);

  return (
    <time className="text-sm text-primary-50 mr-8 hidden md:block">0:00</time>
  );
};

const TrackTitle = ({ trackIsSelected, showCollectionInfo, track }) => {
  const classes = cn({
    "text-xl md:text-2xl flex items-center gap-8 md:gap-16": true,
    "text-accent": trackIsSelected
  });

  return (
    <div className={classes}>
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
};

export const Tracklist = ({ queueable = true, showCollectionInfo, tracks }) => {
  const {
    currentTrack,
    isPlaying,
    queueList,
    setQueueList
  } = usePlayerContext();

  function trackIsSelected(track) {
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

  const TrackIndexButton = ({ track, i }) => {
    const active = trackIsSelected(currentTrack, track) && isPlaying;
    const buttonClasses = cn({
      "absolute top-0 left-0": true,
      "opacity-0 group-hover:opacity-100": !active
    });

    return (
      <div className="flex items-center justify-center relative h-40 w-40 flex-shrink-0">
        <span
          className={`text-primary-50 ${track.audioFile &&
            "group-hover:opacity-0"}`}
        >
          {track.position}
        </span>
        {track.audioFile && (
          <PlayPauseButton
            track={track}
            className={buttonClasses}
            tracklist={tracks}
            variant="ghost"
          />
        )}
      </div>
    );
  };

  const TrackItem = ({ track, i }) => {
    const liClasses = cn({
      "flex gap-8 px-8 -mx-8 h-64 rounded-lg hover:bg-primary-5 focus:bg-primary-10 cursor-default transition group": true,
      "text-secondary": track.audioFile,
      "text-secondary-50": !track.audioFile
    });

    return (
      <li className={liClasses} tabIndex={0} key={i}>
        <div className="flex-1 flex items-center gap-8">
          <TrackIndexButton track={track} i={i} />
          <TrackTitle
            trackIsSelected={trackIsSelected(track)}
            showCollectionInfo={showCollectionInfo}
            track={track}
          />
        </div>
        <div id="actions" className="flex items-center gap-2">
          {track.audioFile ? (
            <TrackDuration audioFile={track.audioFile} />
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
    <ul>
      {tracks.map((track, i) => (
        <TrackItem track={track} i={i} key={track.id} />
      ))}
    </ul>
  );
};

Tracklist.propTypes = {
  queueable: PropTypes.bool,
  showCollectionInfo: PropTypes.bool,
  tracks: PropTypes.array.isRequired
};

export default Tracklist;
