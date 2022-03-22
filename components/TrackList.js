import { useContext } from "react";
import cn from "classnames";
import AppContext from "../components/AppContext";

export default function Tracklist({tracks}) {
  const context = useContext(AppContext);

  function selectTrack(track, i) {
    if (context.state.currentTrack.id === track.id) {
      context.state.playing ? context.setPlaying(false) : context.setPlaying(true);
    } else {
      context.setCurrentTrack(track);
      context.setPlaying(true);
      updateNextFrom(i);
    }
  }

  function updateNextFrom(i) {
    const newNextFrom = [...tracks];
    newNextFrom.splice(0, i);
    context.setNextFrom(newNextFrom);
  }

  function addToQueue(track) {
    const queue = [...context.state.queue];
    context.setQueue(queue.concat(track));
  }

  const PlayPauseButton = ({track, i}) => {
    const isPlaying = context.state.currentTrack.id === track.id && context.state.playing;
    const buttonClasses = cn({
      "absolute top-0 left-0 transition duration-100": true,
      "border rounded-full flex items-center justify-center h-32 w-32": true,
      "bg-green-200": isPlaying,
      "opacity-0 group-hover:opacity-100": !isPlaying,
    });

    return (
      <div className="flex items-center justify-center relative h-32 w-32">
        <span className="text-gray-500 group-hover:opacity-0">{i+1}</span>
        <button
          onClick={() => {selectTrack(track, i)}}
          className={buttonClasses}
        >
          {context.state.currentTrack.id === track.id ? (
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

  return (
    <ul className="border-t">
      {tracks.map((track, i) =>
        <li className="border-b py-8 flex justify-between group" key={i}>
          <div className="flex items-center gap-8">
            <PlayPauseButton track={track} i={i} />
            <span className={context.state.currentTrack.id === track.id ? "text-cyan-500" : ""}>
              {track.title}
            </span>
          </div>
          <AddToQueueButton track={track} />
        </li>
      )}
    </ul>
  )
}
