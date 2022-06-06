import cn from "classnames";
import Button from "../Button";
import Icon from "../Icon";

// Default
// ----------------------------------------------------------------------------

export const ExtraControls = ({
  isFullscreen,
  queueIsOpen,
  playerIsEmpty,
  setIsFullscreen,
  setQueueIsOpen
}) => {
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
        size="sm"
        aria-controls="queue"
        aria-expanded={!queueIsOpen}
        aria-label="Show Queue"
      >
        <Icon name="Queue" />
      </Button>
      <Button
        circle
        disabled={playerIsEmpty}
        onClick={() => {
          setQueueIsOpen(false);
          setIsFullscreen(!isFullscreen);
        }}
        size="sm"
        aria-controls="full-screen"
        aria-expanded={!isFullscreen}
        aria-label="Full Screen"
      >
        <Icon name={isFullscreen ? "ChevronDown" : "ChevronUp"} />
      </Button>
    </div>
  );
};

export default ExtraControls;
