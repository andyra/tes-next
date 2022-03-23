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
      <h2 className="font-medium mb-8 text-gray-900">NowPlaying</h2>
      <div className="text-cyan-500">{context.state.current.track.title} (from {context.state.current.list})</div>
    </section>
  );

  const QueueList = () => (
    <section>
      <header className="flex items-center justify-between">
        <h2 className="font-medium mb-8 text-gray-900">Queue ({context.state.queue.length})</h2>
        <ClearQueueButton />
      </header>
      <Tracklist tracks={context.state.queue} listType="queue" />
    </section>
  );

  const NextFrom = () => (
    <section>
      <h2 className="font-medium mb-8 text-gray-900">NextFrom ({context.state.nextFrom.length})</h2>
      <Tracklist tracks={context.state.nextFrom} listType="nextFrom" />
    </section>
  );

  const History = () => (
    <section>
      <h2 className="font-medium mb-8 text-gray-900">History ({context.state.history.length})</h2>
      {/*<div className="ml-16">
        <h3 className="text-gray-500">Queue</h3>
        {context.state.history.queue.length ? (
          <ul className="list-decimal">
            {context.state.history.queue.map((track, i) =>
              <li className="py-8 flex items-center justify-between" key={i}>
                <div className="flex-1 flex items-center gap-16">
                  <span className="text-gray-500">{i+1}</span>
                  {track.title}
                </div>
              </li>
            )}
          </ul>
        ) : (
          <div className="text-gray-500 text-sm">Empty</div>
        )}
        <h3 className="text-gray-500 mt-16">NextFrom</h3>
        {context.state.history.nextFrom.length ? (
          <ul className="list-decimal">
            {context.state.history.nextFrom.map((track, i) =>
              <li className="py-8 flex items-center justify-between" key={i}>
                <div className="flex-1 flex items-center gap-16">
                  <span className="text-gray-500">{i+1}</span>
                  {track.title}
                </div>
              </li>
            )}
          </ul>
        ) : (
          <div className="text-gray-500 text-sm">Empty</div>
        )}
      </div>*/}
    </section>
  );

  const queueClasses = cn({
    "absolute z-50 top-0 left-0 right-0 bottom-64 space-y-24 bg-gray-200 p-24": true,
    "hidden": !open,
  });

  return (
    modal ? (
      <div className={queueClasses} id="queue" tabIndex="-1" role="region">
        {context.state.current ? <NowPlaying /> : ""}
        {context.state.queue.length ? <QueueList /> : ""}
        {context.state.nextFrom.length ? <NextFrom /> : ""}
        {context.state.history.length ? <History /> : ""}
      </div>
    ) : (
      <div className="p-24 border space-y-24">
        {context.state.current ? <NowPlaying /> : ""}
        {context.state.queue.length ? <QueueList /> : ""}
        {context.state.nextFrom.length ? <NextFrom /> : ""}
        {context.state.history.length ? <History /> : ""}
      </div>
    )
  );
}
