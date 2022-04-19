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
      <h2 className="font-medium mb-8 text-gray-900 dark:text-stone-300">
        {title}
      </h2>
      {actions && actions}
    </header>
    {children}
  </section>
);

const QueueList = ({ actions, items, title }) => {
  return items.length ? (
    <>
      <hr />
      <Section title={title} actions={actions}>
        <Tracklist items={items} />
      </Section>
    </>
  ) : (
    ""
  );
};

const NowPlaying = ({ onDeck }) => {
  return onDeck ? (
    <Section title="Now Playing">
      <div className="text-accent">
        {onDeck.track.title}{" "}
        <span className="opacity-50">
          ({onDeck.listType} • {onDeck.position})
        </span>
      </div>
    </Section>
  ) : (
    ""
  );
};

// Default
// ----------------------------------------------------------------------------

export default function Queue({ queueIsOpen, setQueueIsOpen }) {
  const context = useContext(AudioContext);
  const { nextFrom, onDeck, queue } = context.state;

  const ClearQueueButton = () => {
    function handleClear() {
      context.setQueue([]);
    }

    return (
      <Button
        className={queue.length ? "" : "hidden"}
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
      className="absolute z-50 top-0 right-0 bottom-[76px] left-0 flex items-stretch justify-end p-4"
      id="queue"
      tabIndex="-1"
      role="region"
    >
      <Transition.Child
        className="absolute top-0 right-0 bottom-0 left-0 bg-gray-500/10 backdrop-blur-md"
        enter="transition-opacity ease-linear duration-100"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity ease-linear duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      />
      <Transition.Child
        className="relative w-full max-w-screen-xs bg-primary rounded-lg p-24 space-y-24"
        enter="transition ease-in-out duration-300 transform"
        enterFrom="opacity-0 translate-x-1/4"
        enterTo="opacity-100 translate-x-0"
        leave="transition ease-in-out duration-300 transform"
        leaveFrom="opacity-100 translate-x-0"
        leaveTo="opacity-0 translate-x-1/4"
      >
        <NowPlaying onDeck={onDeck} />
        <QueueList title="Queue" items={queue} actions={<ClearQueueButton />} />
        <QueueList title="Next From" items={nextFrom} />
      </Transition.Child>
    </Transition>
  );
}
