import { useContext } from "react";
import toast from "react-hot-toast";
import cn from "classnames";
import AudioContext from "../context/AudioContext";
import Button from "../components/Button";
import Icon from "../components/Icon";
import Tooltip from "../components/Tooltip";

// Default
// ----------------------------------------------------------------------------

export default function Tracklist({ tracks }) {
  const context = useContext(AudioContext);
  const { isPlaying, nextList, onDeck, prevList, queueList } = context.state;
  const {
    setNextList,
    setOnDeck,
    setIsPlaying,
    setPrevList,
    setQueueList
  } = context;

  function togglePlay() {
    setIsPlaying(!isPlaying);
  }

  function selectTrack(track, i) {
    if (selectedTrackIsOnDeck(track)) {
      togglePlay();
    } else {
      setOnDeck(track);
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

    if (selectedTrack.listType === "queue") {
      setQueueList(tracksAfter);
    } else {
      if (selectedTrack.listType === "playlist") {
        setPrevList(tracksBefore);
        setNextList(tracksAfter);
      }

      if (selectedTrack.listType === "nextList") {
        const newprevList = [...prevList];
        const newnextList = [...nextList];
        newprevList.push(onDeck);
        newprevList.push(...tracksBefore);
        newnextList.splice(0, i + 1);
        setPrevList(newprevList);
        setNextList(newnextList);
      }
    }
  }

  function highlightTrack(track) {
    return (
      onDeck &&
      onDeck.id === track.id &&
      track.listType === "playlist" &&
      onDeck.listType != "queue"
    );
  }

  function selectedTrackIsOnDeck(track) {
    return onDeck && onDeck.id === track.id && track.listType != "queue";
  }

  function addToQueue(track) {
    const newQueueList = [...queueList];
    const newTrack = Object.assign({}, track);
    newTrack.listType = "queue";
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
      <div className="flex items-center justify-center relative h-32 w-32">
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
                highlightTrack(track) ? (isPlaying ? "pause" : "play") : "play"
              }
              solid
            />
          </Button>
        )}
      </div>
    );
  };

  const TrackItem = ({ track, i }) => {
    const liClasses = cn({
      "flex gap-8 p-8 -mx-8 rounded-lg cursor-default transition group": true,
      "hover:bg-primary-5 focus:bg-primary-10": track.audioFile
    });

    return (
      <li className={liClasses} tabIndex={0} key={i}>
        <div className="flex-1 flex items-center gap-8">
          <PlayPauseButton track={track} i={i} />
          <div
            className={`text-xl flex items-center gap-8 ${
              highlightTrack(track) ? "text-accent" : ""
            }`}
          >
            {track.title}
          </div>
        </div>
        <div id="actions" className="flex items-center gap-2">
          {track.audioFile && (
            <>
              {track.listType === "playlist" && (
                <Button
                  circle
                  className="opacity-0 group-hover:opacity-100"
                  variant="ghost"
                  onClick={() => {
                    addToQueue(track);
                  }}
                >
                  <Icon name="add" solid />
                </Button>
              )}
              {track.listType === "queue" && (
                <Button
                  circle
                  className="opacity-0 group-hover:opacity-100"
                  variant="ghost"
                  onClick={() => {
                    removeFromQueue(track, i);
                  }}
                >
                  <Icon name="close" solid />
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
}
