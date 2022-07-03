import * as Dialog from "@radix-ui/react-dialog";
import cn from "classnames";
import { usePlayerContext } from "context/PlayerContext";
import Button from "components/Button";
import CoverArt from "components/CoverArt";
import Icon from "components/Icon";
import Player from "components/Player";
import Tooltip from "components/Tooltip";
import Tracklist from "components/Tracklist";
import TrackMenu from "components/TrackMenu";

// Components
// ----------------------------------------------------------------------------

const QueueSection = ({ actions, children, className, title }) => (
  <section className={className}>
    <header className="flex items-center justify-between py-8 px-24 -mx-24 rounded-xl sticky -top-24 bg-ground-50 backdrop-blur-md z-10">
      <h3 className="font-medium text-xl text-primary">{title}</h3>
      {actions && actions}
    </header>
    {children}
  </section>
);

export const Queue = ({ isFullscreen, playerIsEmpty, setIsFullscreen }) => {
  const {
    currentTrack,
    nextList,
    queueList,
    setQueueList
  } = usePlayerContext();

  const contentClasses = cn({
    "absolute z-dialog-content top-0 left-0 h-full w-full radix-state-open:animate-slide-up-fade": true,
    "md:max-w-screen-sm md:top-4 md:left-1/2 md:-translate-x-1/2 md:h-auto": true,
    "bg-ground overflow-y-scroll p-24 md:rounded-xl": true,
    "md:bottom-88": !isFullscreen,
    "bottom-4": isFullscreen
  });

  const overlayClasses = cn({
    "fixed top-0 right-0 left-0 backdrop-blur-md bg-primary-5 z-dialog": true,
    "bottom-88": !isFullscreen,
    "bottom-0": isFullscreen
  });

  return (
    <Dialog.Root modal={false}>
      <Tooltip content="Queue">
        <Dialog.Trigger asChild>
          <Button circle disabled={playerIsEmpty} variant="outline">
            <Icon name="Queue" />
          </Button>
        </Dialog.Trigger>
      </Tooltip>
      <Dialog.Portal>
        <div id="queue-overlay" className={overlayClasses} />
        <Dialog.Content
          onInteractOutside={e => {
            if (e.target.id !== "queue-overlay") {
              e.preventDefault();
            }
          }}
        >
          <div id="queue-content" className={contentClasses}>
            <Dialog.Close asChild>
              <Button
                circle
                icon="X"
                className="fixed top-12 right-12 z-dialog-content"
              />
            </Dialog.Close>
            {currentTrack && (
              <QueueSection title="On Deck">
                <div className="flex items-center gap-8 md:gap-16 hover:bg-primary-5 p-8 md:px-16 -mx-8 md:-mx-16 rounded-lg group">
                  <CoverArt
                    className="h-88 w-88 rounded-lg"
                    height={88}
                    width={88}
                    url={currentTrack.collection.coverArt}
                    title={currentTrack.title}
                  />
                  <div className="flex-1">
                    <div className="text-2xl text-default">
                      {currentTrack.title}
                    </div>
                    <div className="text-sm">
                      {currentTrack.collection.title}
                    </div>
                  </div>
                  <TrackMenu track={currentTrack} queueable={false} />
                </div>
              </QueueSection>
            )}
            {queueList.length > 0 && (
              <QueueSection
                actions={
                  <Button
                    className={queueList.length ? "" : "hidden"}
                    onClick={() => {
                      setQueueList([]);
                    }}
                    size="sm"
                  >
                    Clear Queue
                  </Button>
                }
                title="Queue"
              >
                <Tracklist
                  tracks={queueList}
                  queueable={false}
                  showCollectionInfo
                />
              </QueueSection>
            )}
            {nextList.length > 0 && (
              <QueueSection title="Next Up" className="mt-24 -mb-16">
                <Tracklist tracks={nextList} showCollectionInfo />
              </QueueSection>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Queue;
