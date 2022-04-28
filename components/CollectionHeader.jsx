export default function CollectionHeader({ meta, title }) {
  return (
    <header className="flex items-end gap-24 mb-48">
      <figure className="bg-accent w-224 h-224 rounded-lg" />
      <hgroup className="flex flex-col gap-12">
        <h1 className="text-6xl font-bold">{title}</h1>
        <div>Artist • Year • Tracks • Length</div>
      </hgroup>
    </header>
  );
}
