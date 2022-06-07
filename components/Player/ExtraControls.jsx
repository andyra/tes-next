import * as Collapsible from "@radix-ui/react-collapsible";
import cn from "classnames";
import Button, { getButtonClasses } from "../Button";
import Icon from "../Icon";
import Queue from "../Queue";
import Tooltip from "../Tooltip";

// Default
// ----------------------------------------------------------------------------

export const ExtraControls = ({
  isFullscreen,
  playerIsEmpty,
  setIsFullscreen,
  setVisualizationEnabled,
  visualizationEnabled
}) => {
  const containerClasses = cn({
    "flex items-center gap-8": true,
    "hidden md:flex flex-1 justify-end": !isFullscreen,
    "justify-between w-full": isFullscreen
  });

  const queueOverlayClasses = cn(
    "fixed top-0 left-0 right-0 bottom-88 z-20",
    "items-stretch justify-center p-4 backdrop-blur-md bg-ground/30",
    "hidden radix-state-open:flex radix-state-open:animate-slide-up-fade"
  );

  return (
    <div className={containerClasses}>
      <Collapsible.Root>
        <Collapsible.Trigger
          className={getButtonClasses({
            circle: true,
            disabled: playerIsEmpty,
            variant: "ghost"
          })}
          disabled={playerIsEmpty}
          onClick={() => {
            setIsFullscreen(false);
          }}
        >
          <Icon name="Queue" />
        </Collapsible.Trigger>
        <Collapsible.Content className={queueOverlayClasses}>
          <section className="w-full max-w-screen-md p-24 rounded-lg bg-ground border-2 border-primary-10 space-y-24">
            <Queue />
          </section>
        </Collapsible.Content>
      </Collapsible.Root>
      <div className="flex items-center gap-4">
        {isFullscreen && (
          <Button
            circle
            onClick={() => {
              setVisualizationEnabled(!visualizationEnabled);
            }}
            size="sm"
          >
            <Icon name={visualizationEnabled ? "EyeOff" : "Eye"} />
          </Button>
        )}
        <Button
          circle
          disabled={playerIsEmpty}
          onClick={() => {
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
    </div>
  );
};

export default ExtraControls;
