import cn from "classnames";
import Button from "components/Button";
import { Dialog, DialogContent, DialogTrigger } from "components/Dialog";
import Icon from "components/Icon";
import Queue from "components/Queue";
import Tooltip from "components/Tooltip";
import useKeypress from "hooks/useKeypress";

// Default
// ----------------------------------------------------------------------------

export const ExtraControls = ({
  isFullscreen,
  playerIsEmpty,
  setIsFullscreen
}) => {
  useKeypress("Escape", () => {
    setIsFullscreen(false);
  });

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
      <Dialog>
        <Tooltip content="Open Queue" asChild>
          <DialogTrigger asChild>
            <Button
              circle
              icon="Queue"
              variant={isFullscreen ? "glass" : "outline"}
            />
          </DialogTrigger>
        </Tooltip>
        <DialogContent>{<Queue />}</DialogContent>
      </Dialog>

      <Tooltip content={isFullscreen ? "Stop Cool Mode" : "Start Cool Mode"}>
        <Button
          aria-controls="full-screen"
          aria-expanded={!isFullscreen}
          aria-label="Full Screen"
          circle
          disabled={playerIsEmpty}
          icon={isFullscreen ? "X" : "Eye"}
          onClick={() => {
            setIsFullscreen(!isFullscreen);
          }}
          variant={isFullscreen ? "glass" : "outline"}
        />
      </Tooltip>
    </div>
  );
};

export default ExtraControls;
