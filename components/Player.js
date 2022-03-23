import { useContext, useState } from "react";
import AppContext from "./AppContext";
import Queue from "./Queue";

export default function Player () {
  const [queueOpen, setQueueOpen] = useState(false);
  const context = useContext(AppContext);

  function togglePlay() {
    context.state.playing ? context.setPlaying(false) : context.setPlaying(true)
  }

  function skipNext() {
    const queue = [...context.state.queue];
    const nextFrom = [...context.state.nextFrom];
    let listType;

    if (queue.length) {
      const newCurrentTrack = queue.shift();
      listType = "queue";
      context.setCurrentTrack({track: newCurrentTrack, list: "queue"});
      context.setQueue(queue);
    } else if (nextFrom.length) {
      const newCurrentTrack = nextFrom.shift();
      listType = "nextFrom";
      context.setCurrentTrack({track: newCurrentTrack, list: "tracklist"});
      context.setNextFrom(nextFrom);
    } else {
      context.setCurrentTrack(null);
      console.log("Nothing to skip to");
    }

    // if (context.state.currentTrack) {
    //   addToHistory(context.state.currentTrack);
    // }
  }

  function addToHistory(track, listType) {
    console.log(`Add ${listType} track to History`);
    console.log(track);
    let history = Object.assign({}, context.state.history);
    let queueHistory = [...context.state.history.queue];
    let nextFromHistory = [...context.state.history.nextFrom];
    // console.log(history);
    // console.log(queueHistory);
    // console.log(nextFromHistory);

    if (listType === "queue") {
      queueHistory.concat(track)
    } else {
      nextFromHistory.concat(track)
    }
      nextFromHistory.concat(2, "3")

    console.log(queueHistory);
    console.log(nextFromHistory);
    // context.setHistory(newHistory);
  }

  const CurrentlyPlaying = () => {
    return (
      <div className="flex items-center gap-8 w-1/4">
        <figure className="h-48 w-48 bg-blue-200 rounded flex items-center justify-center text-2xl">
          {context.state.currentTrack ? context.state.currentTrack.track.id : ""}
        </figure>
        <div>
          <div className="text-sm font-medium">{context.state.currentTrack ? context.state.currentTrack.track.title : "Nada"}</div>
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
        <button onClick={togglePlay} className={`h-48 w-48 text-xl flex items-center justify-center border rounded-full ${context.state.playing ? "bg-green-200" : ""}`}>
          {context.state.playing ? "⏸" : "▶️"}
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
      <aside className="bg-white dark:bg-gray-800 p-8 rounded-lg flex items-center justify-between">
        <CurrentlyPlaying />
        <PlayerControls />
        <ExtraControls />
      </aside>
      <Queue open={queueOpen} />
    </>
  )
}
