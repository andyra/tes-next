import cn from "classnames";
import Button from "../Button";
import Icon from "../Icon";

// Default
// ----------------------------------------------------------------------------

export default function ExtraControls({
  isFullscreen,
  queueIsOpen,
  playerIsEmpty,
  setIsFullscreen,
  setQueueIsOpen
}) {
  const containerClasses = cn({
    "flex items-center gap-8": true,
    "hidden md:flex flex-1 justify-end": !isFullscreen,
    "justify-between w-full": isFullscreen
  });

  return (
    <div className={containerClasses}>
      <Button
        active={queueIsOpen}
        circle
        disabled={playerIsEmpty}
        onClick={() => {
          setIsFullscreen(false);
          setQueueIsOpen(!queueIsOpen);
        }}
        aria-controls="queue"
        aria-expanded={!queueIsOpen}
        aria-label="Show Queue"
      >
        <Icon name="list" solid />
      </Button>
      <Button
        circle
        disabled={playerIsEmpty}
        onClick={() => {
          setQueueIsOpen(false);
          setIsFullscreen(!isFullscreen);
        }}
        aria-controls="full-screen"
        aria-expanded={!isFullscreen}
        aria-label="Full Screen"
      >
        <Icon name={isFullscreen ? "chevron-down" : "chevron-up"} solid />
      </Button>
    </div>
  );
}
