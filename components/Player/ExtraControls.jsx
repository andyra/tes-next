import * as Collapsible from "@radix-ui/react-collapsible";
import cn from "classnames";
import Button, { getButtonClasses } from "../Button";
import Icon from "../Icon";
import Queue from "../Queue";
import Tooltip from "../Tooltip";

// Default
// ----------------------------------------------------------------------------

export const ExtraControls = ({ isFullscreen, setIsFullscreen }) => {
  const containerClasses = cn({
    "flex items-center gap-8": true,
    "hidden md:flex flex-1 justify-end": !isFullscreen,
    "justify-between w-full relative mix-blend-overlay": isFullscreen
  });

  const queueOverlayClasses = cn({
    "fixed top-0 left-0 right-0 z-dialog": true,
    "items-stretch justify-center p-4 backdrop-blur-md bg-ground/30": true,
    "hidden radix-state-open:flex radix-state-open:animate-slide-up-fade": true,
    "bottom-88": !isFullscreen,
    "bottom-[144px]": isFullscreen
  });

  return (
    <div className={containerClasses}>
      <Collapsible.Root>
        <Collapsible.Trigger
          className={getButtonClasses({
            variant: "outline",
            size: "sm"
          })}
        >
          Queue
        </Collapsible.Trigger>
        <Collapsible.Content className={queueOverlayClasses}>
          <section className="w-full max-w-screen-md p-24 rounded-lg bg-ground border-2 space-y-24 overflow-y-scroll">
            <Queue />
          </section>
        </Collapsible.Content>
      </Collapsible.Root>
      <Button
        circle
        variant={isFullscreen ? "outline" : "ghost"}
        onClick={() => {
          setIsFullscreen(!isFullscreen);
        }}
        aria-controls="full-screen"
        aria-expanded={!isFullscreen}
        aria-label="Full Screen"
      >
        <Icon name={isFullscreen ? "X" : "ChevronUp"} />
      </Button>
    </div>
  );
};

export default ExtraControls;
