import { useContext, useEffect } from "react";
import cn from "classnames";
import AppContext from "../components/AppContext";
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
    <Section title={title} actions={actions}>
      <Tracklist items={items} />
    </Section>
  ) : (
    ""
  );
};

const NowPlaying = ({ onDeck }) => {
  return onDeck ? (
    <Section title="Now Playing">
      <div className="text-cyan-500">
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

export default function Queue({ open }) {
  const context = useContext(AppContext);

  const ClearQueueButton = () => {
    const visible = context.state.queue.length;

    return (
      <Button
        className={visible ? "" : "hidden"}
        onClick={() => {
          context.setQueue([]);
        }}
      >
        Clear Queue
      </Button>
    );
  };

  useEffect(() => {
    console.log("Open changed");
  }, [open]);

  const queueClasses = cn({
    "absolute z-50 top-0 left-0 right-0 bottom-72": true,
    "flex items-stretch justify-end p-4": true,
    "bg-black/25 backdrop-blur-sm": true,
    hidden: !open
  });

  const sectionClasses = cn({
    "w-full max-w-screen-xs bg-white rounded-lg p-24 space-y-24": true
  });

  return (
    <div className={queueClasses} id="queue" tabIndex="-1" role="region">
      <section className={sectionClasses}>
        <QueueList title="PrevFrom" items={context.state.prevFrom} />
        <NowPlaying onDeck={context.state.onDeck} />
        <QueueList
          title="Queue"
          items={context.state.queue}
          actions={<ClearQueueButton />}
        />
        <QueueList title="Next From" items={context.state.nextFrom} />
      </section>
    </div>
  );
}
