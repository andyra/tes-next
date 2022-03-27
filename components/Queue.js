import { useContext } from "react";
import cn from "classnames";
import AppContext from "../components/AppContext";
import Button from "../components/Button";
import Tracklist from "../components/Tracklist";

const Section = ({actions, children, title}) => (
  <section>
    <header className="flex items-center justify-between">
      <h2 className="font-medium mb-8 text-gray-900 dark:text-stone-300">
        {title}
      </h2>
      {actions && actions }
    </header>
    {children}
  </section>
);

export default function Queue({
  modal = true,
  open
}) {
  const context = useContext(AppContext);

  const ClearQueueButton = () => {
    const visible = context.state.queue.length;

    return (
      <Button
        className={visible ? "" : "hidden"}
        onClick={() => {context.setQueue([])}}
      >
        Clear Queue
      </Button>
    )
  }

  const NowPlaying = () => (
    <Section title="Now Playing">
      <div className="text-cyan-500">
        {context.state.onDeck.track.title}{" "}
        <span className="opacity-50">({context.state.onDeck.listType} • {context.state.onDeck.position})</span>
      </div>
    </Section>
  );

  const QueueList = () => (
    <Section title="Queue" actions={<ClearQueueButton />}>
      <Tracklist items={context.state.queue} />
    </Section>
  );

  const NextFrom = () => (
    <Section title="Next From">
      <Tracklist items={context.state.nextFrom} />
    </Section>
  );

  const PrevFrom = () => (
    <Section title="Prev From">
      <Tracklist items={context.state.prevFrom} />
    </Section>
  );

  const queueClasses = cn({
    "absolute z-50 top-0 left-0 right-0 bottom-64 space-y-24 bg-gray-200 p-24": true,
    "hidden": !open,
  });

  return (
    modal ? (
      <div className={queueClasses} id="queue" tabIndex="-1" role="region">
        <div className="max-w-screen-sm mx-auto space-y-24">
          {context.state.prevFrom.length ? <PrevFrom /> : ""}
          {context.state.onDeck ? <NowPlaying /> : ""}
          {context.state.queue.length ? <QueueList /> : ""}
          {context.state.nextFrom.length ? <NextFrom /> : ""}
        </div>
      </div>
    ) : (
      <div className="p-24 border space-y-24">
        {context.state.prevFrom.length ? <PrevFrom /> : ""}
        {context.state.onDeck ? <NowPlaying /> : ""}
        {context.state.queue.length ? <QueueList /> : ""}
        {context.state.nextFrom.length ? <NextFrom /> : ""}
      </div>
    )
  );
}
