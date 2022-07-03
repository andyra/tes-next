import * as Collapsible from "@radix-ui/react-collapsible";
import cn from "classnames";
import Button from "components/Button";
import Icon from "components/Icon";
import Queue from "components/Queue";
import Queue2 from "components/Queue2";
import Player from "components/Player";
import Tooltip from "components/Tooltip";

// Functions
// ----------------------------------------------------------------------------

function handleInteractOutside(e) {
  e.preventDefault();
  const el = e.target;
  const playerClicked = e.target.closest("#player");
  console.log(playerClicked);

  if (playerClicked) {
    e.preventDefault();
  }
}

// Default
// ----------------------------------------------------------------------------

export const ExtraControls = ({
  isFullscreen,
  playerIsEmpty,
  setIsFullscreen
}) => {
  const containerClasses = cn({
    "flex items-center gap-8": true,
    "hidden md:flex flex-1 justify-end": !isFullscreen,
    "justify-between w-full md:justify-end relative mix-blend-overlayXXX": isFullscreen
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
      <Queue2
        playerIsEmpty={playerIsEmpty}
        isFullscreen={isFullscreen}
        setIsFullscreen={setIsFullscreen}
      />

      <Tooltip content={isFullscreen ? "Close" : "Enable Cool Mode"}>
        <Button
          circle
          disabled={playerIsEmpty}
          variant={isFullscreen ? "glass" : "outline"}
          onClick={() => {
            setIsFullscreen(!isFullscreen);
          }}
          aria-controls="full-screen"
          aria-expanded={!isFullscreen}
          aria-label="Full Screen"
        >
          <Icon name={isFullscreen ? "EyeOff" : "Eye"} />
        </Button>
      </Tooltip>
    </div>
  );
};

export default ExtraControls;
