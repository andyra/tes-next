import { useContext } from "react";
import AppContext from "../components/AppContext";

export default function Tracklist({tracks}) {
  const value = useContext(AppContext);

  function selectTrack(track, i) {
    if (value.state.currentTrack.id === track.id) {
      value.state.playing ? value.setPlaying(false) : value.setPlaying(true);
    } else {
      value.setCurrentTrack(track);
      value.setPlaying(true);
      updateNextFrom(i);
    }
  }

  function updateNextFrom(i) {
    const newNextFrom = [...tracks];
    newNextFrom.splice(0, i);
    value.setNextFrom(newNextFrom);
  }

  function addToQueue(track) {
    const queue = value.state.queue;
    value.setQueue(queue.concat(track));
  }

  const PlayPauseButton = ({track, i}) => {
    const isPlaying = value.state.currentTrack.id === track.id && value.state.playing;
    return (
      <button
        onClick={() => {selectTrack(track, i)}}
        className={`border rounded-full flex items-center justify-center h-32 px-12 ${isPlaying ? "bg-green-200" : ""}`}
        >
        {value.state.currentTrack.id === track.id ? (
          value.state.playing ? "Pause" : "Play"
        ) : (
          "Play"
        )}
      </button>
    )
  }

  const AddToQueueButton = ({track}) => {
    return (
      <button
        className="border rounded-full flex items-center justify-center h-32 px-12"
        onClick={() => {addToQueue(track)}}
      >
        Add
      </button>
    )
  }

  return (
    <ul className="border-t">
      {tracks.map((track, i) =>
        <li className="border-b py-8 flex justify-between" key={i}>
          <div className="flex items-center gap-8">
            <PlayPauseButton track={track} i={i} />
            {track.title}
          </div>
          <AddToQueueButton track={track} />
        </li>
      )}
    </ul>
  )
}
