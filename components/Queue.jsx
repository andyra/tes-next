import cn from "classnames";
import { usePlayerContext } from "context/PlayerContext";
import Button from "components/Button";
import CoverArt from "components/CoverArt";
import Tracklist from "components/Tracklist";
import TrackDropdown from "components/TrackDropdown";

const Section = ({ actions, children, className, title }) => (
  <section className={className}>
    <header className="flex items-center justify-between py-8 sticky -top-24 bg-ground z-1">
      <h3 className="font-medium text-xl text-primary">{title}</h3>
      {actions && actions}
    </header>
    {children}
  </section>
);

const QueueList = ({
  actions,
  queueable,
  showCollectionInfo,
  tracks,
  title
}) => {
  return tracks.length ? (
    <Section title={title} actions={actions}>
      <Tracklist
        tracks={tracks}
        queueable={queueable}
        showCollectionInfo={showCollectionInfo}
        TrackDropdownZIndex="z-dialog-dropdown"
      />
    </Section>
  ) : (
    ""
  );
};

const CurrentTrack = ({ currentTrack }) => {
  return currentTrack ? (
    <Section title="On Deck" className="-mt-8">
      <div className="flex items-center gap-8 md:gap-16 bg-primary-5 p-8 md:px-16 -mx-8 md:-mx-16 rounded-lg group">
        <CoverArt
          className="h-88 w-88 rounded-lg"
          height={88}
          width={88}
          url={currentTrack.collection.coverArt}
          title={currentTrack.title}
        />
        <div className="flex-1">
          <div className="text-2xl text-default">{currentTrack.title}</div>
          <div className="text-sm">{currentTrack.collection.title}</div>
        </div>
        <TrackDropdown track={currentTrack} queueable={false} inDialog />
      </div>
    </Section>
  ) : (
    ""
  );
};

export const Queue = () => {
  const { currentTrack, nextList, queueList } = usePlayerContext();

  const ClearQueueButton = () => {
    function handleClear() {
      context.setQueueList([]);
    }

    return (
      <Button
        className={queueList.length ? "" : "hidden"}
        onClick={() => {
          handleClear();
        }}
        size="sm"
      >
        Clear Queue
      </Button>
    );
  };

  return (
    <>
      <CurrentTrack currentTrack={currentTrack} />
      <QueueList
        title="Queue"
        tracks={queueList}
        actions={<ClearQueueButton />}
        queueable={false}
        showCollectionInfo
      />
      <QueueList showCollectionInfo title="Next Up" tracks={nextList} />
    </>
  );
};

export default Queue;
