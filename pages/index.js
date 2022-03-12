import { useContext } from "react";
import AppContext from "../components/AppContext";

const TRACKS = [
  {
    title: "Gabriel's Friendship Gang",
    url: "https://example.com/1",
    album: 1
  },
  {
    title: "Matt Slime",
    url: "https://example.com/2",
    album: 2
  },
  {
    title: "Capestrano",
    url: "https://example.com/3",
    album: 3
  }
];

export default function Home() {
  const value = useContext(AppContext);

  function togglePlay() {
    value.state.playing ? value.setPlaying(false) : value.setPlaying(true)
  }

  function handleTrackSelect(track) {
    value.state.playing ? value.setPlaying(false) : value.setPlaying(true);
    value.setCurrentTrack(track);
  }

  return (
    <>
      <section className="bg-yellow-100 p-24 rounded mb-24">
        <h2 className="font-medium">Tasks</h2>
        <ul className="list list-decimal pl-24">
          <li>Pass selected song to context</li>
          <li>Only show "Playing" for actively playing song</li>
          <li>Add Items to queue</li>
        </ul>
      </section>

      <ul className="border-t">
        {TRACKS.map((track, i) =>
          <li className="border-b py-8 flex justify-between" key={i}>
            <div className="flex items-center gap-8">
              <button onClick={() => {handleTrackSelect(track)}} className="border rounded-full flex items-center justify-center h-32 px-12">
                {value.state.playing ? "Pause" : "Play"}
              </button>
              {track.title}
            </div>
            <button className="border rounded-full flex items-center justify-center h-32 px-12">
              Add
            </button>
          </li>
        )}
      </ul>
    </>
  )
}
