import { useContext } from "react";
import AppContext from "../components/AppContext";

export default function Tracklist({tracks}) {
  const value = useContext(AppContext);

  function togglePlay() {
    value.state.playing ? value.setPlaying(false) : value.setPlaying(true)
  }

  function handleTrackSelect(track) {
    if (value.state.currentTrack.id === track.id) {
      togglePlay()
    } else {
      value.setCurrentTrack(track);
      value.setPlaying(true);
    }
  }

  const TrackSelectButton = ({track}) => {
    const isPlaying = value.state.currentTrack.id === track.id && value.state.playing;

    return (
      <button onClick={() => {handleTrackSelect(track)}} className={`border rounded-full flex items-center justify-center h-32 px-12 ${isPlaying ? "bg-green-200" : ""}`}>
        {value.state.currentTrack.id === track.id ? (
          value.state.playing ? "Pause" : "Play"
        ) : (
          "Play"
        )}
      </button>
    )
  }

  return (
    <ul className="border-t">
      {tracks.map((track, i) =>
        <li className="border-b py-8 flex justify-between" key={i}>
          <div className="flex items-center gap-8">
            <TrackSelectButton track={track} />
            {track.title}
          </div>
          <button className="border rounded-full flex items-center justify-center h-32 px-12">
            Add
          </button>
        </li>
      )}
    </ul>
  )
}
