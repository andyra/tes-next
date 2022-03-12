import Tracklist from "../components/Tracklist";

const TRACKS = [
  {
    id: 4,
    title: "Kingdom of Plaid-Skinned Children",
    url: "https://example.com/4",
    album: 4
  },
  {
    id: 5,
    title: "Moon Base Madame",
    url: "https://example.com/5",
    album: 5
  },
  {
    id: 6,
    title: "Bloody Murder",
    url: "https://example.com/6",
    album: 6
  }
];

export default function Home() {
  return (
    <>
      <section className="bg-yellow-100 p-24 rounded mb-24">
        <h2 className="font-medium">Tasks</h2>
        <ul className="list list-decimal pl-24">
          <li className="line-through">Pass selected song to context</li>
          <li className="line-through">Only show "Playing" for actively playing song</li>
          <li className="">Persist between pages</li>
          <li className="">Add Items to queue</li>
        </ul>
      </section>

      <Tracklist tracks={TRACKS} />
    </>
  )
}
