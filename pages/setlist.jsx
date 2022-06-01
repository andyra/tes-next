import Button from "../components/Button";
import Icon from "../components/Icon";
import Input from "../components/Input";
import PageHeader, { H1 } from "../components/PageHeader";

// Components
// ----------------------------------------------------------------------------

const Computor = () => {
  const LABEL_CLASSES =
    "inline-block px-8 text-primary-50 bg-ground absolute z-10 top-0 left-1/2 transform -translate-y-1/2 -translate-x-1/2 text-sm";

  return (
    <section className="p-16 rounded-lg border-2 border-primary-10 text-center">
      <H1 className="text-xl font-medium mb-16">Setlist Computor</H1>
      <form className="flex items-center gap-16">
        <Input
          label="Songs"
          labelClassName={LABEL_CLASSES}
          inputClassName="text-center"
          name="songs"
          type="number"
          defaultValue={10}
        />
        <Input
          label="Bleeds"
          labelClassName={LABEL_CLASSES}
          inputClassName="text-center"
          name="bleeds"
          type="number"
          defaultValue={10}
        />
        <Input
          label="Strategies"
          labelClassName={LABEL_CLASSES}
          inputClassName="text-center"
          name="strategies"
          type="number"
          defaultValue={10}
        />
        <Button type="submit">Compute</Button>
      </form>
    </section>
  );
};

const SetlistItem = ({ title, bleed, strategy }) => (
  <li className="relative py-8">
    <div className="text-3xl font-medium">{title}</div>
    {strategy && <div className="opacity-50">{strategy}</div>}
    {bleed && (
      <span className="h-24 px-8 border border-accent-25 text-accent text-sm rounded-full inline-flex gap-4 items-center justify-center transform translate-y-1/3">
        <Icon name="ArrowDown" />
        Bleed
      </span>
    )}
  </li>
);

const Setlist = () => {
  return (
    <ol className="list-decimal mt-48">
      <SetlistItem title="Penguins, Anonymous" />
      <SetlistItem title="Fermerly Inc" bleed />
      <SetlistItem title="Fermerly Inc" />
      <SetlistItem title="Fermerly Inc" />
      <SetlistItem
        title="Walnuts are no good"
        bleed
        strategy="Play like you've never played before"
      />
      <SetlistItem
        title="Family Business"
        strategy="Play like you've never played before"
      />
    </ol>
  );
};

// Default
// ----------------------------------------------------------------------------

export default function Setlist() {
  return (
    <>
      <Computor />
      <Setlist />
    </>
  );
}

// Config
// ----------------------------------------------------------------------------

export async function getStaticProps() {
  return {
    props: {
      PageTitle: "Setlist Computor"
    }
  };
}
