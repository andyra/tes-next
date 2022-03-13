import { useContext } from "react";
import AppContext from "../components/AppContext";

export default function Queue() {
  const value = useContext(AppContext);

  function removeFromQueue(track, i) {
    let newQueue = [...value.state.queue];
    newQueue.splice(i, 1);
    value.setQueue(newQueue);
  }

  const RemoveFromQueueButton = ({track, i}) => {
    return (
      <button
        className="border px-12 h-32 flex items-center rounded-full"
        onClick={() => {removeFromQueue(track, i)}}
      >
        Remove
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
      <h2 className="font-medium mb-8">Queue ({value.state.queue.length})</h2>
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
      <h2 className="font-medium mb-8">NextFrom</h2>
      {value.state.nextFrom.length ? (
        <ul className="border-t">
          value.state.nextFrom.map((track, i) =>
            <li className="border-b py-8 flex items-center justify-between" key={i}>
              <div className="flex-1 flex items-center gap-16">
                <span className="text-gray-500">{i+1}</span>
                {track.title}
              </div>
            </li>
          )
        </ul>
      ) : (
        <div className="text-gray-500">Empty</div>
      )}
    </div>
  );

  return (
    <section className="mt-24 border bg-gray-50 p-24 rounded space-y-24">
      <NowPlaying />
      <QueueList />
      <NextFrom />
    </section>
  );
}
