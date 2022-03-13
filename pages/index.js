import Queue from "../components/Queue";
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
      <Tracklist tracks={TRACKS} />
      <Queue />
    </>
  )
}

export async function getServerSideProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  }
}
