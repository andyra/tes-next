import Link from "next/link";
import { useQuery } from "@apollo/client";
import ClientOnly from "../../components/ClientOnly";
import Empty from "../../components/Empty";
import MusicTabs from "../../components/MusicTabs";
import { SONGS } from "../../constants";

export async function getStaticProps() {
  return {
    props: {
      pageTitle: "Songs"
    }
  };
}

const SongList = () => {
  const { data, loading, error } = useQuery(SONGS);

  if (loading) {
    return <mark>Loading...</mark>;
  }

  if (error) {
    console.error(error);
    return null;
  }

  return data.entries ? (
    <ul>
      {data.entries.map(song => (
        <li className="flex items-center gap-8" key={song.slug}>
          <Link href={`songs/${encodeURIComponent(song.slug)}`}>
            <a>{song.title}</a>
          </Link>
        </li>
      ))}
    </ul>
  ) : (
    <Empty>Ain't no songs</Empty>
  );
};

export default function SongsPage() {
  return (
    <>
      <MusicTabs page="Songs" />
      <ClientOnly>
        <SongList />
      </ClientOnly>
    </>
  );
}
