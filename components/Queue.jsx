import { useContext } from "react";
import { Transition } from "@headlessui/react";
import cn from "classnames";
import AudioContext from "../context/AudioContext";
import Button from "../components/Button";
import Tracklist from "../components/Tracklist";

// Components
// ----------------------------------------------------------------------------

const Section = ({ actions, children, title }) => (
  <section>
    <header className="flex items-center justify-between">
      <h2 className="text-primary-50 font-medium mb-8">{title}</h2>
      {actions && actions}
    </header>
    {children}
  </section>
);

const QueueList = ({ actions, tracks, title }) => {
  return tracks.length ? (
    <Section title={title} actions={actions}>
      <Tracklist tracks={tracks} />
    </Section>
  ) : (
    ""
  );
};

const CurrentTrack = ({ currentTrack }) => {
  return currentTrack ? (
    <Section title="On Deck">
      <div className="text-default">{currentTrack.title}</div>
    </Section>
  ) : (
    ""
  );
};

// Default
// ----------------------------------------------------------------------------

export default function Queue({ queueIsOpen, setQueueIsOpen }) {
  const context = useContext(AudioContext);
  const { currentTrack, nextList, queueList } = context.state;

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
      >
        Clear Queue
      </Button>
    );
  };

  return (
    <Transition
      show={queueIsOpen}
      className="absolute z-50 top-0 right-0 bottom-[88px] left-0 flex items-stretch justify-end p-4"
      id="queue"
      tabIndex="-1"
      role="region"
    >
      <Transition.Child
        className="relative w-full bg-ground"
        enter="transition ease-in-out duration-200 transform"
        enterFrom="opacity-0 translate-y-24"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in-out duration-200 transform"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-24"
      >
        <div className="w-full max-w-screen-md mx-auto space-y-24 mt-48">
          <h2 className="text-secondary font-bold text-3xl">Queue</h2>
          <CurrentTrack currentTrack={currentTrack} />
          <QueueList
            title="Queue"
            tracks={queueList}
            actions={<ClearQueueButton />}
          />
          <QueueList title="Next From [collection name]" tracks={nextList} />
        </div>
      </Transition.Child>
    </Transition>
  );
}
