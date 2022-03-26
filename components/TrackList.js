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

  function selectItem(item, i) {
    const selectedTrackIsCurrent = context.state.onDeck && context.state.onDeck.track.id === item.track.id && listType != "queue";

    if (selectedTrackIsCurrent) {
      togglePlay()
    } else {
      context.setOnDeck(item);
      context.setPlaying(true);
      updateList(item, i);
    }
  }

  // Shorten or add to queue listTypes
  function updateList(selectedItem, i) {
    const itemsBefore = [...items].splice(0, i);
    const itemsAfter = [...items].splice(i + 1);

    if (listType === "queue") {
      context.setQueue(itemsAfter);
    } else {
      if (listType === "tracklist") {
        context.setPrevFrom(itemsBefore);
        context.setNextFrom(itemsAfter);
      }

      if (listType === "nextFrom") {
        const newPrevFrom = [...context.state.prevFrom];
        newPrevFrom.push(context.state.onDeck);
        newPrevFrom.push(...itemsBefore);
        context.setPrevFrom(newPrevFrom);

        const newNextFrom = [...context.state.nextFrom];
        newNextFrom.splice(0, i + 1);
        context.setNextFrom(newNextFrom);
      }
    }
  }

  function highlightTrack(item) {
    return context.state.onDeck && context.state.onDeck.track.id === item.track.id
        && listType === "tracklist"
        && context.state.onDeck.listType != "queue";
  }

  function addToQueue(item) {
    item.listType = "queue";
    const queue = [...context.state.queue];
    context.setQueue(queue.concat(item));
  }

  function removeFromQueue(item, i) {
    let newQueue = [...context.state.queue];
    newQueue.splice(i, 1);
    context.setQueue(newQueue);
  }

  const PlayPauseButton = ({item, position, i}) => {
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
          circle
          onClick={() => {selectItem(item, i)}}
        >
          {highlightTrack(item) ? context.state.playing ? "⏸" : "▶️" : "▶️"}
        </Button>
      </div>
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
            <PlayPauseButton item={item} position={item.position} i={i} />
            <div className={`flex items-center gap-8 ${highlightTrack(item) ? "text-cyan-500" : ""}`}>
              {item.track.title}
              <span className="opacity-50">({item.listType} • {item.position})</span>
            </div>
          </div>
          {listType === "tracklist" &&
            <Button onClick={() => {addToQueue(item)}}>
              Add
            </Button>
          }
          {listType === "queue" &&
            <button onClick={() => {removeFromQueue(item, i)}}>
              Remove
            </button>
          }
        </li>
      )}
    </ul>
  )
}
