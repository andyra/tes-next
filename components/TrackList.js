import { useContext } from "react";
import cn from "classnames";
import Button from "../components/Button";
import AppContext from "../components/AppContext";

export default function Tracklist({
  listType = "tracklist",
  items
}) {
  const context = useContext(AppContext);

  function togglePlay() {
    context.state.playing ? context.setPlaying(false) : context.setPlaying(true);
  }

  function selectItem(item) {
    // TODO here we have the correct position
    const selectedTrackIsCurrent = context.state.onDeck && context.state.onDeck.track.id === item.track.id && listType != "queue";

    if (selectedTrackIsCurrent) {
      togglePlay()
    } else {
      context.setOnDeck(item);
      context.setPlaying(true);
      updateList(item.position);
    }
  }

  // Shorten or add to queue listTypes
  function updateList(position) {
    // TODO here we have the correct position
    // in this context, `tracks` contains the items in whatever listType you're choosing
    // const newTracks = [...tracks];
    const newItems = [...items];
    newItems.splice(0, position);
    console.log(newItems);

    listType === "queue" ? context.setQueue(newItems) : context.setNextFrom(newItems);
  }

  function addToQueue(item) {
    const queue = [...context.state.queue];
    context.setQueue(queue.concat(item));
  }

  function highlightTrack(item) {
    return context.state.onDeck && context.state.onDeck.track.id === item.track.id
        && listType === "tracklist"
        && context.state.onDeck.listType != "queue";
  }

  const PlayPauseButton = ({item, position}) => {
    const active = highlightTrack(item) && context.state.playing;
    const buttonClasses = cn({
      "absolute top-0 left-0": true,
      "bg-green-200": active,
      "opacity-0 group-hover:opacity-100": !active,
    });

    return (
      <div className="flex items-center justify-center relative h-32 w-32">
        <span className="text-gray-500 group-hover:opacity-0">{position}</span>
        <Button
          className={buttonClasses}
          onClick={() => {selectItem(item)}}
        >
          {highlightTrack(item) ? context.state.playing ? "⏸" : "▶️" : "▶️"}
        </Button>
      </div>
    )
  }

  const AddToQueueButton = ({item}) => {
    return (
      <button
        className="border rounded-full flex items-center justify-center h-32 px-12 opacity-0 group-hover:opacity-100 transition duration-100"
        onClick={() => {addToQueue(item)}}
      >
        Add
      </button>
    )
  }

  const RemoveFromQueueButton = ({item, i}) => {
    function removeFromQueue(item, i) {
      let newQueue = [...context.state.queue];
      newQueue.splice(i, 1);
      context.setQueue(newQueue);
    }

    return (
      <button
        className="border px-12 h-32 flex items-center rounded-full opacity-0 group-hover:opacity-100 transition duration-100"
        onClick={() => {removeFromQueue(item, i)}}
      >
        Remove
      </button>
    )
  }

  const liClasses = cn({
    "flex justify-between p-8 -mx-8 rounded-lg cursor-default transition group": true,
    "hover:bg-gray-50 focus:bg-gray-100 dark:hover:bg-white/10 dark:focus:bg-white/20": true
  });

  return (
    <ul>
      {items.map((item, i) =>
        <li className={liClasses} tabIndex={0} key={i}>
          <div className="flex items-center gap-8">
            <PlayPauseButton item={item} position={item.position} />
            <div className={`flex items-center gap-8 ${highlightTrack(item) ? "text-cyan-500" : ""}`}>
              {item.track.title}
              <span className="opacity-50">({item.listType} • {item.position})</span>
            </div>
          </div>
          {listType === "tracklist" && <AddToQueueButton item={item} /> }
          {listType === "queue" && <RemoveFromQueueButton item={item} i={i} /> }
        </li>
      )}
    </ul>
  )
}
