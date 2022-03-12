import { useContext } from "react";
import AppContext from "../components/AppContext";

const DATA = [
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

  return (
    <>
      <h1>Home</h1>
      <p>
        Playing is {`${value.state.playing}`}
      </p>
      <ul className="border-t">
        {DATA.map((item, i) =>
          <li className="border-b py-8 flex justify-between">
            <div className="flex items-center gap-8">
              <button onClick={togglePlay} className="border rounded-full flex items-center justify-center h-32 px-12">
                {value.state.playing ? "Pause" : "Play"}
              </button>
              {item.title}
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
