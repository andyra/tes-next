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
import Tooltip from "../components/Tooltip";
import PlayPauseButton from "../components/PlayPauseButton";
import { getCollectionType, formatTime } from "../helpers";

// Overflow Menu
// ----------------------------------------------------------------------------

const TrackMenuItem = ({ href, icon, large, title, ...props }) => {
  const classes = cn({
    "flex items-center px-8 hover:bg-primary-5 transition": true,
    "flex-col justify-center gap-4 h-72": large,
    "gap-12 h-40 rounded-lg w-full": !large
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

const TrackMenu = ({ addToQueue, track, queueable, removeFromQueue, i }) => {
  const { audioFile, collection, title, uri } = track;
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
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className={overflowMenuClasses}>
        <Icon name="Overflow" />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content className={contentClasses}>
        <DropdownMenu.Group className="p-8">
          {uri && (
            <TrackMenuItem title="Go to Song" href={`/${uri}`} icon="Moon" />
          )}
          <TrackMenuItem
            title={
              <>
                {" "}
                Go to{" "}
                <span className="capitalize">{collection.sectionHandle}</span>
              </>
            }
            href={`/${collection.uri}`}
            icon={collection.sectionHandle === "episodes" ? "Mic" : "Music"}
          />
          {queueable ? (
            <TrackMenuItem
              title="Add to Queue"
              onClick={() => {
                addToQueue(track);
              }}
              icon="Plus"
              type="button"
            />
          ) : (
            <TrackMenuItem
              title="Remove from Queue"
              onClick={() => {
                removeFromQueue(track, i);
              }}
              icon="X"
              type="button"
            />
          )}
          {audioFile && (
            <TrackMenuItem
              title="Download"
              href={audioFile}
              icon="Download"
              download={title}
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
      <div className="flex items-center justify-center relative h-32 w-32 flex-shrink-0">
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
            <span className="text-sm text-primary-25 opacity-0 group-hover:opacity-100 transition">
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
