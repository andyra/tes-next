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
    const selectedTrackIsCurrent = context.state.currentTrack && context.state.currentTrack.track.id === track.id;

    if (selectedTrackIsCurrent) {
      togglePlay()
    } else {
      context.setCurrentTrack({
        track: track,
        listType: listType,
      });
      context.setPlaying(true);
      updateNextFrom(i);
    }
  }

  function updateNextFrom(i) {
    const newNextFrom = [...tracks];
    newNextFrom.splice(0, i+1);
    context.setNextFrom(newNextFrom);
  }

  function addToQueue(track) {
    const queue = [...context.state.queue];
    context.setQueue(queue.concat(track));
  }

  const PlayPauseButton = ({i, track}) => {
    const isCurrentTrack = context.state.currentTrack && context.state.currentTrack.track.id === track.id;
    const active = isCurrentTrack && context.state.playing && listType === "tracklist" && listType === context.state.currentTrack.listType;
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
          {context.state.currentTrack && context.state.currentTrack.track.id === track.id ? (
            context.state.playing ? "⏸" : "▶️"
          ) : (
            "▶️"
          )}
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
        className="border px-12 h-32 flex items-center rounded-full"
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
            <span className={context.state.currentTrack && context.state.currentTrack.track.id === track.id && listType === "tracklist" ? "text-cyan-500" : ""}>
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
