import { useContext } from "react";
import AppContext from "./AppContext";

export default function Player () {
  const value = useContext(AppContext);

  function togglePlay() {
    value.state.playing ? value.setPlaying(false) : value.setPlaying(true)
  }

  const CurrentlyPlaying = () => {
    return (
      <div className="flex items-center gap-8">
        <figure className="h-48 w-48 bg-blue-200 rounded flex items-center justify-center text-2xl">
          {value.state.currentTrack.id}
        </figure>
        <div>
          <div className="text-sm font-medium">{value.state.currentTrack.title}</div>
          <div className="text-xs text-gray-500">Artist</div>
        </div>
      </div>
    )
  }

  const PlayerControls = () => {
    return (
      <div>
        <button onClick={togglePlay} className={`border px-12 py-8 ${value.state.playing ? "bg-green-200" : ""}`}>
          {value.state.playing ? "PAUSE" : "PLAY"}
        </button>
      </div>
    )
  }

  const ExtraControls = () => {
    return (
      <div>
        Queue
      </div>
    )
  }

  return (
    <aside className="absolute bottom-0 left-0 w-full border-t p-8 flex items-center justify-between">
      <CurrentlyPlaying />
      <PlayerControls />
      <ExtraControls />
    </aside>
  )
}
