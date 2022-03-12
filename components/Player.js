import { useContext } from "react";
import AppContext from "./AppContext";

const Player = () => {
  const value = useContext(AppContext);
  const state = value.state;

  function togglePlay() {
    state.playing ? value.setPlaying(false) : value.setPlaying(true)
  }

  const CurrentlyPlaying = () => {
    return (
      <div className="flex items-center gap-8">
        <figure className="h-48 w-48 bg-red-500 rounded" />
        <div>
          <div className="text-sm font-medium">[Song Title]</div>
          <div className="text-xs text-gray-500">Artist</div>
        </div>
      </div>
    )
  }

  const Controls = () => {
    return (
      <div>
        <button onClick={togglePlay} className="border px-12 py-8">
          {state.playing ? "PAUSE" : "PLAY"}
        </button>
        Playing: {`${state.playing}`}
      </div>
    )
  }

  return (
    <aside className="absolute bottom-0 left-0 w-full border-t p-8 flex items-center justify-between">
      <CurrentlyPlaying />
      <Controls />
    </aside>
  )
}

export default Player;
