import { useContext } from "react";
import cn from "classnames";
import AppContext from "../components/AppContext";

export default function Queue({open}) {
  const value = useContext(AppContext);

  const RemoveFromQueueButton = ({track, i}) => {
    function removeFromQueue(track, i) {
      let newQueue = [...value.state.queue];
      newQueue.splice(i, 1);
      value.setQueue(newQueue);
    }

    return (
      <button
        className="border px-12 h-32 flex items-center rounded-full"
        onClick={() => {removeFromQueue(track, i)}}
      >
        Remove
      </button>
    )
  }

  const ClearQueueButton = () => {
    const visible = value.state.queue.length;

    return (
      <button
        className={`flex items-center px-12 border rounded${visible ? "" : " hidden"}`}
        onClick={() => {value.setQueue([])}}
      >
        Clear Queue
      </button>
    )
  }

  const NowPlaying = () => (
    <div>
      <h2 className="font-medium mb-8">NowPlaying</h2>
      {value.state.currentTrack ? (
        value.state.currentTrack.title
      ) : (
        <div className="text-gray-500">Empty</div>
      )}
    </div>
  );

  const QueueList = () => (
    <div>
      <header className="flex items-center justify-between">
        <h2 className="font-medium mb-8">Queue ({value.state.queue.length})</h2>
        <ClearQueueButton />
      </header>
      {value.state.queue.length ? (
        <ul className="border-t">
          {value.state.queue.map((track, i) =>
            <li className="border-b py-8 flex items-center justify-between" key={i}>
              <div className="flex-1 flex items-center gap-16">
                <span className="text-gray-500">{i+1}</span>
                {track.title}
              </div>
              <RemoveFromQueueButton track={track} i={i} />
            </li>
          )}
        </ul>
      ) : (
        <div className="text-gray-500">Empty</div>
      )}
    </div>
  );

  const NextFrom = () => (
    <div>
      <h2 className="font-medium mb-8">NextFrom ({value.state.nextFrom.length})</h2>
      {value.state.nextFrom.length ? (
        <ul className="border-t">
          {value.state.nextFrom.map((track, i) =>
            <li className="border-b py-8 flex items-center justify-between" key={i}>
              <div className="flex-1 flex items-center gap-16">
                <span className="text-gray-500">{i+1}</span>
                {track.title}
              </div>
            </li>
          )}
        </ul>
      ) : (
        <div className="text-gray-500">Empty</div>
      )}
    </div>
  );

  const queueClasses = cn({
    "absolute z-50 top-0 left-0 right-0 bottom-64 space-y-24 bg-gray-200 p-24": true,
    "hidden": !open,
  });

  return (
    <section
      className={queueClasses}
      id="queue"
      tabIndex="-1"
      role="region"
    >
      <NowPlaying />
      <QueueList />
      <NextFrom />
    </section>
  );
}
