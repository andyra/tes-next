import { useContext } from "react";
import AppContext from "../components/AppContext";
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
  const value = useContext(AppContext);

  return (
    <>
      <Tracklist tracks={TRACKS} />
      <section className="mt-24 border p-24">
        <h2 className="font-medium mb-16">Queue</h2>
        <ul className="list-decimal ml-24">
          {value.state.queue.map((track, i) =>
            <li key={i}>
              {track.title}
            </li>
          )}
        </ul>
      </section>
    </>
  )
}
