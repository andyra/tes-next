import { useContext } from "react";
import toast from "react-hot-toast";
import cn from "classnames";
import AudioContext from "../context/AudioContext";
import Button from "../components/Button";
import Icon from "../components/Icon";

// Default
// ----------------------------------------------------------------------------

export default function Tracklist({ tracks }) {
  const context = useContext(AudioContext);
  const { nextFrom, onDeck, playing, prevFrom, queue } = context.state;
  const { setNextFrom, setOnDeck, setPlaying, setPrevFrom, setQueue } = context;

  function togglePlay() {
    setPlaying(!playing);
  }

  function selectTrack(track, i) {
    if (selectedTrackIsOnDeck(track)) {
      togglePlay();
    } else {
      setOnDeck(track);
      setPlaying(true);
      updateList(track, i);
    }
  }

  // Shorten or add to queue listTypes
  function updateList(selectedTrack, i) {
    const tracksBefore = [...tracks].splice(0, i);
    const tracksAfter = [...tracks].splice(i + 1);

    if (selectedTrack.listType === "queue") {
      setQueue(tracksAfter);
    } else {
      if (selectedTrack.listType === "playlist") {
        setPrevFrom(tracksBefore);
        setNextFrom(tracksAfter);
      }

      if (selectedTrack.listType === "nextFrom") {
        const newPrevFrom = [...PrevFrom];
        const newNextFrom = [...nextFrom];
        newPrevFrom.push(onDeck);
        newPrevFrom.push(...tracksBefore);
        newNextFrom.splice(0, i + 1);
        setPrevFrom(newPrevFrom);
        setNextFrom(newNextFrom);
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
    const newQueue = [...queue];
    const newTrack = Object.assign({}, track);
    newTrack.listType = "queue";
    setQueue(newQueue.concat(newTrack));
    toast.success("Added to queue");
  }

  function removeFromQueue(track, i) {
    let newQueue = [...queue];
    newQueue.splice(i, 1);
    setQueue(newQueue);
  }

  const PlayPauseButton = ({ track, i }) => {
    const active = highlightTrack(track) && playing;
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
                highlightTrack(track) ? (playing ? "pause" : "play") : "play"
              }
              solid
            />
          </Button>
        )}
      </div>
    );
  };

  const liClasses = cn({
    "flex gap-8 p-8 -mx-8 rounded-lg cursor-default transition group": true,
    "hover:bg-primary-10 focus:bg-primary-25": true
  });

  return (
    <ul>
      {tracks.map((track, i) => (
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
      ))}
    </ul>
  );
}
