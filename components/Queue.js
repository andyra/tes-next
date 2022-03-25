import { useContext } from "react";
import cn from "classnames";
import AppContext from "../components/AppContext";
import Tracklist from "../components/Tracklist";

export default function Queue({
  modal = true,
  open
}) {
  const context = useContext(AppContext);

  const ClearQueueButton = () => {
    const visible = context.state.queue.length;

    return (
      <button
        className={`flex items-center px-12 border rounded${visible ? "" : " hidden"}`}
        onClick={() => {context.setQueue([])}}
      >
        Clear Queue
      </button>
    )
  }

  const NowPlaying = () => (
    <section>
      <h2 className="font-medium mb-8 text-gray-900 dark:text-stone-300">OnDeck</h2>
      <div className="flex items-center gap-8 text-cyan-500">
        {context.state.onDeck.track.title}
        <span className="opacity-50">({context.state.onDeck.listType} • {context.state.onDeck.position})</span>
      </div>
    </section>
  );

  const QueueList = () => (
    <section>
      <header className="flex items-center justify-between">
        <h2 className="font-medium mb-8 text-gray-900 dark:text-stone-300">Queue</h2>
        <ClearQueueButton />
      </header>
      <Tracklist items={context.state.queue} listType="queue" />
    </section>
  );

  const NextFrom = () => (
    <section>
      <h2 className="font-medium mb-8 text-gray-900 dark:text-stone-300">NextFrom</h2>
      <Tracklist items={context.state.nextFrom} listType="nextFrom" />
    </section>
  );

  const History = () => {
    const liClasses = cn({
      "flex justify-between p-8 -mx-8 rounded-lg cursor-default transition group": true,
      "hover:bg-gray-50 focus:bg-gray-100 dark:hover:bg-white/10 dark:focus:bg-white/20": true
    });

    return (
      <section>
        <h2 className="font-medium mb-8 text-gray-900 dark:text-stone-300">History</h2>
        <ul>
          {context.state.history.map((item, i) =>
            <li className={liClasses} key={i}>
              <div className="flex items-center gap-8">
                {item.track.title}
                <span className="opacity-50">({item.listType} • {item.position})</span>
              </div>
            </li>
          )}
        </ul>
      </section>
    )
  }

  const queueClasses = cn({
    "absolute z-50 top-0 left-0 right-0 bottom-64 space-y-24 bg-gray-200 p-24": true,
    "hidden": !open,
  });

  return (
    modal ? (
      <div className={queueClasses} id="queue" tabIndex="-1" role="region">
        {context.state.history.length ? <History /> : ""}
        {context.state.onDeck ? <NowPlaying /> : ""}
        {context.state.queue.length ? <QueueList /> : ""}
        {context.state.nextFrom.length ? <NextFrom /> : ""}
      </div>
    ) : (
      <div className="p-24 border space-y-24">
        {context.state.history.length ? <History /> : ""}
        {context.state.onDeck ? <NowPlaying /> : ""}
        {context.state.queue.length ? <QueueList /> : ""}
        {context.state.nextFrom.length ? <NextFrom /> : ""}
      </div>
    )
  );
}
