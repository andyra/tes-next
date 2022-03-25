import Queue from "../components/Queue";
import Tracklist from "../components/Tracklist";

const TRACKS = [
  {
    track: {
      id: 4,
      title: "Kingdom of Plaid-Skinned Children",
      url: "https://example.com/4",
      album: 4
    },
    position: 1,
    listType: "tracklist"
  },
  {
    track: {
      id: 5,
      title: "Moon Base Madame",
      url: "https://example.com/5",
      album: 5
    },
    position: 2,
    listType: "tracklist"
  },
  {
    track: {
      id: 6,
      title: "Bloody Murder",
      url: "https://example.com/6",
      album: 6
    },
    position: 3,
    listType: "tracklist"
  }
];

export default function Home() {
  return (
    <>
      <Tracklist items={TRACKS} />
      <Queue modal={false} />
    </>
  )
}
