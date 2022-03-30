import Queue from "../components/Queue";
import Tracklist from "../components/Tracklist";

const ITEMS = [
  {
    track: {
      id: 1,
      title: "Gabriel's Friendship Gang",
      url: "https://example.com/1",
      album: 1,
      artist: "Artist Name",
    },
    position: 1,
    listType: "tracklist",
  },
  {
    track: {
      id: 2,
      title: "Matt Slime",
      url: "https://example.com/2",
      album: 2,
      artist: "Artist Name",
    },
    position: 2,
    listType: "tracklist",
  },
  {
    track: {
      id: 3,
      title: "Capestrano",
      url: "https://example.com/3",
      album: 3,
      artist: "Artist Name",
    },
    position: 3,
    listType: "tracklist",
  },
  {
    track: {
      id: 4,
      title: "Napoleon",
      url: "https://example.com/4",
      album: 4,
      artist: "Artist Name",
    },
    position: 4,
    listType: "tracklist",
  },
  {
    track: {
      id: 5,
      title: "Linda I Miss You",
      url: "https://example.com/5",
      album: 5,
      artist: "Artist Name",
    },
    position: 5,
    listType: "tracklist",
  },
  {
    track: {
      id: 1,
      title: "Gabriel's Friendship Gang",
      url: "https://example.com/1",
      album: 1,
      artist: "Artist Name",
    },
    position: 1,
    listType: "tracklist",
  },
  {
    track: {
      id: 2,
      title: "Matt Slime",
      url: "https://example.com/2",
      album: 2,
      artist: "Artist Name",
    },
    position: 2,
    listType: "tracklist",
  },
  {
    track: {
      id: 3,
      title: "Capestrano",
      url: "https://example.com/3",
      album: 3,
      artist: "Artist Name",
    },
    position: 3,
    listType: "tracklist",
  },
  {
    track: {
      id: 1,
      title: "Gabriel's Friendship Gang",
      url: "https://example.com/1",
      album: 1,
      artist: "Artist Name",
    },
    position: 1,
    listType: "tracklist",
  },
  {
    track: {
      id: 2,
      title: "Matt Slime",
      url: "https://example.com/2",
      album: 2,
      artist: "Artist Name",
    },
    position: 2,
    listType: "tracklist",
  },
  {
    track: {
      id: 3,
      title: "Capestrano",
      url: "https://example.com/3",
      album: 3,
      artist: "Artist Name",
    },
    position: 3,
    listType: "tracklist",
  },
];

export default function Home() {
  return (
    <>
      <Tracklist items={ITEMS} />
      <Queue modal={false} />
    </>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  };
}
