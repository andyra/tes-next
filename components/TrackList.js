import { useContext } from "react";
import cn from "classnames";
import AppContext from "../components/AppContext";

export default function Tracklist({
  listType = "tracklist",
  tracks
}) {
  const context = useContext(AppContext);

  function togglePlay() {
    context.state.playing ? context.setPlaying(false) : context.setPlaying(true);
  }

  function selectTrack(track, i) {
    const selectedTrackIsCurrent = context.state.currentTrack && context.state.currentTrack.track.id === track.id && context.state.currentTrack.listType === listType;

    if (selectedTrackIsCurrent) {
      togglePlay()
    } else {
      context.setCurrentTrack({
        track: track,
        listType: listType,
      });
      context.setPlaying(true);
      updateList(i);
    }
  }

  function updateList(i) {
    console.log(`Tracks in ${listType}: ${tracks.length}`);
    console.log(`Remove everything in ${listType} before ${i}`);
    const newList = [...tracks];
    newList.splice(0, i+1);
    if (listType === "queue") {
      context.setQueue(newList);
    }
    if (listType === "nextFrom") {
      context.setNextFrom(newList);
    }
  }

  function addToQueue(track) {
    const queue = [...context.state.queue];
    context.setQueue(queue.concat(track));
  }

  function highlightTrack(track) {
    return context.state.currentTrack && context.state.currentTrack.track.id === track.id && listType === "tracklist" && listType === context.state.currentTrack.listType;
  }

  const PlayPauseButton = ({i, track}) => {
    // const highlightTrack = context.state.currentTrack && context.state.currentTrack.track.id === track.id && listType === "tracklist" && listType === context.state.currentTrack.listType;
    const active = highlightTrack(track) && context.state.playing;
    const buttonClasses = cn({
      "absolute top-0 left-0 transition duration-100": true,
      "border rounded-full flex items-center justify-center h-32 w-32": true,
      "bg-green-200": active,
      "opacity-0 group-hover:opacity-100": !active,
    });

    return (
      <div className="flex items-center justify-center relative h-32 w-32">
        <span className="text-gray-500 group-hover:opacity-0">{i+1}</span>
        <button
          onClick={() => {selectTrack(track, i)}}
          className={buttonClasses}
        >
          {highlightTrack(track) ? context.state.playing ? "⏸" : "▶️" : "▶️"}
        </button>
      </div>
    )
  }

  const AddToQueueButton = ({track}) => {
    return (
      <button
        className="border rounded-full flex items-center justify-center h-32 px-12 opacity-0 group-hover:opacity-100 transition duration-100"
        onClick={() => {addToQueue(track)}}
      >
        Add
      </button>
    )
  }

  const RemoveFromQueueButton = ({track, i}) => {
    function removeFromQueue(track, i) {
      let newQueue = [...context.state.queue];
      newQueue.splice(i, 1);
      context.setQueue(newQueue);
    }

    return (
      <button
        className="border px-12 h-32 flex items-center rounded-full opacity-0 group-hover:opacity-100 transition duration-100"
        onClick={() => {removeFromQueue(track, i)}}
      >
        Remove
      </button>
    )
  }

  return (
    <ul className="border-t">
      {tracks.map((track, i) =>
        <li className="border-b py-8 flex justify-between group" key={i}>
          <div className="flex items-center gap-8">
            <PlayPauseButton track={track} i={i} />
            <span className={highlightTrack(track) ? "text-cyan-500" : ""}>
              {track.title} ({listType})
            </span>
          </div>
          {listType === "tracklist" && <AddToQueueButton track={track} /> }
          {listType === "queue" && <RemoveFromQueueButton track={track} i={i} /> }
        </li>
      )}
    </ul>
  )
}
