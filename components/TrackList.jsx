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

  const PlayPauseButton = ({ track, position, i }) => {
    const active = highlightTrack(track) && playing;
    const buttonClasses = cn({
      "absolute top-0 left-0": true,
      "bg-primary hover:bg-primary-75": active,
      "opacity-0 group-hover:opacity-100": !active
    });

    return (
      <div className="flex items-center justify-center relative h-32 w-32">
        <span className="text-gray-500 group-hover:opacity-0">{position}</span>
        <Button
          className={buttonClasses}
          circle
          onClick={() => {
            selectTrack(track, i);
          }}
        >
          <Icon
            name={highlightTrack(track) ? (playing ? "pause" : "play") : "play"}
            solid
          />
        </Button>
      </div>
    );
  };

  const liClasses = cn({
    "flex justify-between p-8 -mx-8 rounded-lg cursor-default transition group": true,
    "hover:bg-default-10 focus:bg-default-25": true
  });

  return (
    <ul>
      {tracks.map((track, i) => (
        <li className={liClasses} tabIndex={0} key={i}>
          <div className="flex items-center gap-8">
            <PlayPauseButton track={track} position={track.position} i={i} />
            <div
              className={`flex items-center gap-8 ${
                highlightTrack(track) ? "text-secondary" : ""
              }`}
            >
              <div className="text-xl">{track.title}</div>
              <span className="opacity-50">
                (Position {track.position} • Count {i})
              </span>
            </div>
          </div>
          {track.listType === "playlist" && (
            <Button
              circle
              className="opacity-0 group-hover:opacity-100"
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
              onClick={() => {
                removeFromQueue(track, i);
              }}
            >
              <Icon name="close" solid />
            </Button>
          )}
        </li>
      ))}
    </ul>
  );
}
