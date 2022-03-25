import { useContext, useState } from "react";
import AppContext from "./AppContext";
import Queue from "./Queue";

// TODO: add to history not just when hitting next, but for each SelectTrack

export default function Player () {
  const [queueOpen, setQueueOpen] = useState(false);
  const context = useContext(AppContext);

  function togglePlay() {
    context.state.playing ? context.setPlaying(false) : context.setPlaying(true)
  }

  function isPlaying() {
    return context.state.onDeck && context.state.playing;
  }

  function next() {
    const queue = [...context.state.queue];
    const nextFrom = [...context.state.nextFrom];
    const history = [...context.state.history];
    let listType;

    if (queue.length) {
      const newOnDeck = queue.shift();
      context.setOnDeck(newOnDeck);
      context.setQueue(queue);
    } else if (nextFrom.length) {
      const newOnDeck = nextFrom.shift();
      context.setOnDeck(newOnDeck);
      context.setNextFrom(nextFrom);
    } else {
      context.setOnDeck(null);
      console.log("Nothing to skip forward to");
    }

    if (context.state.onDeck) {
      addToHistory(context.state.onDeck);
    }
  }

  function addToHistory(item) {
    const history = [...context.state.history];
    history.push(item);
    context.setHistory(history);
  }

  function back() {
    const history = [...context.state.history];

    if (history.length) {
      const item = history.pop();
      context.setHistory(history);
      context.setOnDeck(item);

      if (item.listType === "tracklist") {
        const nextFrom = [...context.state.nextFrom];
        nextFrom.unshift(context.state.onDeck.track);
        context.setNextFrom(nextFrom);
      }
    } else if (true) {
      // you may not have anything in history, but there are still tracklist items
    } else {
      console.log("Nothing to skip back to");
    }
  }

  const OnDeck = () => {
    return (
      <div className="flex items-center gap-8 w-1/4">
        <figure className="h-48 w-48 bg-blue-200 rounded flex items-center justify-center text-2xl">
          {context.state.onDeck ? context.state.onDeck.track.id : ""}
        </figure>
        <div>
          <div className="text-sm font-medium">{context.state.onDeck ? context.state.onDeck.track.title : "Nada"}</div>
          <div className="text-xs text-gray-500">Artist</div>
        </div>
      </div>
    )
  }

  const PlayerControls = () => {
    return (
      <div className="flex-1 flex items-center justify-center gap-8">
        <button
          className="h-32 w-32 flex items-center justify-center border rounded-full"
          onClick={() => {back()}}
        >
          ⏪
        </button>
        <button onClick={togglePlay} className={`h-48 w-48 text-xl flex items-center justify-center border rounded-full ${isPlaying() ? "bg-green-200" : ""}`}>
          {isPlaying() ? "⏸" : "▶️"}
        </button>
        <button
          className="h-32 w-32 flex items-center justify-center border rounded-full"
          onClick={() => {next()}}
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
        <OnDeck />
        <PlayerControls />
        <ExtraControls />
      </aside>
      <Queue open={queueOpen} />
    </>
  )
}
