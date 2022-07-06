import cn from "classnames";
import Button from "components/Button";
import Icon from "components/Icon";
import Queue from "components/Queue";
import Player from "components/Player";
import Tooltip from "components/Tooltip";

// Default
// ----------------------------------------------------------------------------

export const ExtraControls = ({
  isFullscreen,
  playerIsEmpty,
  setIsFullscreen,
  setQueueList
}) => {
  const containerClasses = cn({
    "flex items-center justify-end gap-8": true,
    "hidden md:flex flex-1": !isFullscreen,
    "w-full md:justify-end mix-blend-overlayXXX": isFullscreen
  });

  const queueOverlayClasses = cn({
    "fixed top-0 left-0 right-0 z-dialog": true,
    "items-stretch justify-center p-4 backdrop-blur-md bg-primary-5": true,
    "hidden radix-state-open:flex radix-state-open:animate-slide-up-fade": true,
    "bottom-88": !isFullscreen,
    "bottom-[144px]": isFullscreen
  });

  return (
    <div className={containerClasses}>
      <Queue
        playerIsEmpty={playerIsEmpty}
        isFullscreen={isFullscreen}
        setIsFullscreen={setIsFullscreen}
      />
      <Tooltip content={isFullscreen ? "Close" : "Enable Cool Mode"}>
        <Button
          className={isFullscreen ? "absolute top-12 right-12" : ""}
          circle
          disabled={playerIsEmpty}
          icon={isFullscreen ? "X" : "Eye"}
          label={isFullscreen ? "Disable Cool Mode" : "Enable Cool Mode"}
          onClick={() => {
            setIsFullscreen(!isFullscreen);
          }}
          variant="outline"
          aria-controls="full-screen"
          aria-expanded={!isFullscreen}
          aria-label="Full Screen"
        />
      </Tooltip>
    </div>
  );
};

export default ExtraControls;
