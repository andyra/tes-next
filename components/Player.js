import { useContext, useState } from "react";
import AppContext from "./AppContext";
import Queue from "./Queue";

export default function Player () {
  const [queueOpen, setQueueOpen] = useState(false);
  const value = useContext(AppContext);

  function togglePlay() {
    value.state.playing ? value.setPlaying(false) : value.setPlaying(true)
  }

  function skipNext() {
    const newQueue = [...value.state.queue];
    const newNextFrom = [...value.state.nextFrom];
    if (newQueue.length) {
      const newCurrentTrack = newQueue.shift();
      value.setCurrentTrack(newCurrentTrack);
      value.setQueue(newQueue);
    } else if (newNextFrom.length) {
      const newCurrentTrack = newNextFrom.shift();
      value.setCurrentTrack(newCurrentTrack);
      value.setNextFrom(newNextFrom);
    } else {
      console.log("Nothing to skip to");
    }
  }

  const CurrentlyPlaying = () => {
    return (
      <div className="flex items-center gap-8 w-1/4">
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
      <div className="flex-1 flex items-center justify-center gap-8">
        <button className="h-32 w-32 flex items-center justify-center border rounded-full">
          ⏪
        </button>
        <button onClick={togglePlay} className={`h-48 w-48 text-xl flex items-center justify-center border rounded-full ${value.state.playing ? "bg-green-200" : ""}`}>
          {value.state.playing ? "⏸" : "▶️"}
        </button>
        <button
          className="h-32 w-32 flex items-center justify-center border rounded-full"
          onClick={() => {skipNext()}}
        >
          ⏩
        </button>
      </div>
    )
  }

  const ExtraControls = () => {
    return (
      <div className="flex items-center justify-end gap-8 w-1/4">
        <button
          className={`flex items-center px-12 h-32 border rounded-full${queueOpen ? " bg-green-200" : ""}`}
          onClick={() => {setQueueOpen(queueOpen ? false : true)}}
          aria-controls="queue"
          aria-expanded={queueOpen ? false : true}
          aria-label="Show Queue"
        >
          Queue
        </button>
      </div>
    )
  }

  return (
    <>
      <aside className="border-t p-8 flex items-center justify-between bg-white">
        <CurrentlyPlaying />
        <PlayerControls />
        <ExtraControls />
      </aside>
      <Queue open={queueOpen} />
    </>
  )
}
