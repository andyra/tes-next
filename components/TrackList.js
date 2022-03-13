import { useContext } from "react";
import AppContext from "../components/AppContext";

export default function Tracklist({tracks}) {
  const value = useContext(AppContext);

  function playPause(track) {
    if (value.state.currentTrack.id === track.id) {
      value.state.playing ? value.setPlaying(false) : value.setPlaying(true);
    } else {
      value.setCurrentTrack(track);
      value.setPlaying(true);
    }
  }

  function updateNextFrom(track, tracklist) {
    const nextFrom = value.state.nextFrom;
    // TODO: not entire tracklist, but everything _after_ the selected track
    value.setNextFrom(tracklist);
  }

  function addToQueue(track) {
    console.log(track);
    const queue = value.state.queue;
    value.setQueue(queue.concat(track));
  }

  const PlayPauseButton = ({track}) => {
    const isPlaying = value.state.currentTrack.id === track.id && value.state.playing;

    return (
      <button
        onClick={() => {playPause(track)}}
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
            <PlayPauseButton track={track} />
            {track.title}
          </div>
          <AddToQueueButton track={track} />
        </li>
      )}
    </ul>
  )
}
