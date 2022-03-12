import Tracklist from "../components/Tracklist";

const TRACKS = [
  {
    id: 1,
    title: "Gabriel's Friendship Gang",
    url: "https://example.com/1",
    album: 1
  },
  {
    id: 2,
    title: "Matt Slime",
    url: "https://example.com/2",
    album: 2
  },
  {
    id: 3,
    title: "Capestrano",
    url: "https://example.com/3",
    album: 3
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
