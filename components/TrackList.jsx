import { useContext } from "react";
import toast from "react-hot-toast";
import cn from "classnames";
import AudioContext from "../context/AudioContext";
import Button from "../components/Button";
import Icon from "../components/Icon";

export default function Tracklist({ items }) {
  const context = useContext(AudioContext);
  const { nextFrom, onDeck, playing, prevFrom, queue } = context.state;
  const { setNextFrom, setOnDeck, setPlaying, setPrevFrom, setQueue } = context;

  function togglePlay() {
    setPlaying(!playing);
  }

  function selectItem(item, i) {
    if (selectedTrackIsOnDeck(item)) {
      togglePlay();
    } else {
      setOnDeck(item);
      setPlaying(true);
      updateList(item, i);
    }
  }

  // Shorten or add to queue listTypes
  function updateList(selectedItem, i) {
    const itemsBefore = [...items].splice(0, i);
    const itemsAfter = [...items].splice(i + 1);

    if (selectedItem.listType === "queue") {
      setQueue(itemsAfter);
    } else {
      if (selectedItem.listType === "tracklist") {
        setPrevFrom(itemsBefore);
        setNextFrom(itemsAfter);
      }

      if (selectedItem.listType === "nextFrom") {
        const newPrevFrom = [...PrevFrom];
        const newNextFrom = [...nextFrom];
        newPrevFrom.push(onDeck);
        newPrevFrom.push(...itemsBefore);
        newNextFrom.splice(0, i + 1);
        setPrevFrom(newPrevFrom);
        setNextFrom(newNextFrom);
      }
    }
  }

  function highlightTrack(item) {
    return (
      onDeck &&
      onDeck.track.id === item.track.id &&
      item.listType === "tracklist" &&
      onDeck.listType != "queue"
    );
  }

  function selectedTrackIsOnDeck(item) {
    return (
      onDeck && onDeck.track.id === item.track.id && item.listType != "queue"
    );
  }

  function addToQueue(item) {
    const newQueue = [...queue];
    const newItem = Object.assign({}, item);
    newItem.listType = "queue";
    setQueue(newQueue.concat(newItem));
    toast.success("Added to queue");
  }

  function removeFromQueue(item, i) {
    let newQueue = [...queue];
    newQueue.splice(i, 1);
    setQueue(newQueue);
  }

  const PlayPauseButton = ({ item, position, i }) => {
    const active = highlightTrack(item) && playing;
    const buttonClasses = cn({
      "absolute top-0 left-0": true,
      "bg-primary": active,
      "opacity-0 group-hover:opacity-100": !active
    });

    return (
      <div className="flex items-center justify-center relative h-32 w-32">
        <span className="text-gray-500 group-hover:opacity-0">{position}</span>
        <Button
          className={buttonClasses}
          circle
          onClick={() => {
            selectItem(item, i);
          }}
        >
          <Icon
            name={highlightTrack(item) ? (playing ? "pause" : "play") : "play"}
            solid
          />
        </Button>
      </div>
    );
  };

  const liClasses = cn({
    "flex justify-between p-8 -mx-8 rounded-lg cursor-default transition group": true,
    "hover:bg-default-10 focus:bg-default-25": true
  });

  return (
    <ul>
      {items.map((item, i) => (
        <li className={liClasses} tabIndex={0} key={i}>
          <div className="flex items-center gap-8">
            <PlayPauseButton item={item} position={item.position} i={i} />
            <div
              className={`flex items-center gap-8 ${
                highlightTrack(item) ? "text-primary" : ""
              }`}
            >
              {item.track.title}
              <span className="opacity-50">
                ({item.listType} • {item.position})
              </span>
            </div>
          </div>
          {item.listType === "tracklist" && (
            <Button
              circle
              className="opacity-0 group-hover:opacity-100"
              onClick={() => {
                addToQueue(item);
              }}
            >
              <Icon name="add" solid />
            </Button>
          )}
          {item.listType === "queue" && (
            <Button
              circle
              className="opacity-0 group-hover:opacity-100"
              onClick={() => {
                removeFromQueue(item, i);
              }}
            >
              <Icon name="close" solid />
            </Button>
          )}
        </li>
      ))}
    </ul>
  );
}
