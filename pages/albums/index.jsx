import Link from "next/link";
import { useQuery } from "@apollo/client";
import ClientOnly from "../../components/ClientOnly";
import Empty from "../../components/Empty";
import MusicTabs from "../../components/MusicTabs";
import { ALBUMS } from "../../constants";

export async function getStaticProps() {
  return {
    props: {
      pageTitle: "Albums"
    }
  };
}

const AlbumList = () => {
  const { data, loading, error } = useQuery(ALBUMS);

  if (loading) {
    return <mark>Loading...</mark>;
  }

  if (error) {
    console.error(error);
    return null;
  }

  return data.entries ? (
    <ul>
      {data.entries.map(album => (
        <li className="flex items-center gap-8" key={album.slug}>
          <Link href={`albums/${encodeURIComponent(album.slug)}`}>
            <a>{album.title}</a>
          </Link>
        </li>
      ))}
    </ul>
  ) : (
    <Empty>Ain't no albums</Empty>
  );
};

export default function AlbumsPage() {
  return (
    <>
      <MusicTabs page="Albums" />
      <ClientOnly>
        <AlbumList />
      </ClientOnly>
    </>
  );
}
