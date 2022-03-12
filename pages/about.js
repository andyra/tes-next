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
      <Tracklist tracks={TRACKS} />
    </>
  )
}
