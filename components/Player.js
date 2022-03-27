import { useContext, useState } from "react";
import AppContext from "./AppContext";
import Button from "./Button";
import Queue from "./Queue";

const OnDeck = ({onDeck}) => (
  <div className={`flex items-center gap-8 w-1/4 transition ${onDeck ? "" : "opacity-0 pointer-events-none"}`}>
    <figure className="h-48 w-48 bg-blue-200 rounded flex items-center justify-center text-2xl">
      {onDeck ? onDeck.track.id : ""}
    </figure>
    <div>
      <div className="text-sm font-medium">{onDeck ? onDeck.track.title : ""}</div>
      <div className="text-xs text-gray-500">{onDeck ? onDeck.track.artist : ""}</div>
    </div>
  </div>
);

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
    const prevFrom = [...context.state.prevFrom];

    if (context.state.onDeck && context.state.onDeck.listType === "tracklist") {
      addToPrevFrom(context.state.onDeck);
    }

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
      context.setPrevFrom([]);
    }
  }

  function addToPrevFrom(item) {
    const prevFrom = [...context.state.prevFrom];
    prevFrom.push(item);
    context.setPrevFrom(prevFrom);
  }

  function back() {
    const newPrevFrom = [...context.state.prevFrom];

    if (newPrevFrom.length) {
      const newOnDeck = newPrevFrom.pop();
      context.setPrevFrom(newPrevFrom);
      context.setOnDeck(newOnDeck);

      const newNextFrom = [...context.state.nextFrom];
      newNextFrom.unshift(context.state.onDeck);
      context.setNextFrom(newNextFrom);
    } else {
      context.setOnDeck(null);
      context.setNextFrom([]);
    }
  }

  const PlayerControls = () => (
    <div className="flex-1 flex items-center justify-center gap-8">
      <Button circle onClick={() => {back()}}>
        ⏪
      </Button>
      <Button circle size="lg" onClick={togglePlay} className={`${isPlaying() ? "bg-green-200 hover:bg-green-300" : ""}`}>
        {isPlaying() ? "⏸" : "▶️"}
      </Button>
      <Button circle onClick={() => {next()}}>
        ⏩
      </Button>
    </div>
  );

  const ExtraControls = () => (
    <div className="flex items-center justify-end gap-8 w-1/4">
      <Button
        className={`${queueOpen ? "bg-green-200" : ""}`}
        onClick={() => {setQueueOpen(queueOpen ? false : true)}}
        aria-controls="queue"
        aria-expanded={queueOpen ? false : true}
        aria-label="Show Queue"
      >
        Queue
      </Button>
    </div>
  );

  return (
    <>
      <aside className="bg-white dark:bg-gray-800 p-8 rounded-lg flex items-center justify-between">
        <OnDeck onDeck={context.state.onDeck} />
        <PlayerControls />
        <ExtraControls />
      </aside>
      <Queue open={queueOpen} />
    </>
  )
}
