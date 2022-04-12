import Link from "next/link";
import { useQuery } from "@apollo/client";
import ClientOnly from "../../components/ClientOnly";
import Empty from "../../components/Empty";
import PageTitle from "../../components/PageTitle";
import { VIDEOS } from "../../constants";

// Components
// ----------------------------------------------------------------------------

const SongList = () => {
  const { data, loading, error } = useQuery(VIDEOS);

  if (loading) {
    return <mark>Loading...</mark>;
  }

  if (error) {
    console.error(error);
    return `Query error! ${error.message}`;
  }

  return data.entries ? (
    <ul>
      {data.entries.map(video => (
        <li className="flex items-center gap-8" key={video.slug}>
          <Link href={`/videos/${encodeURIComponent(video.slug)}`}>
            <a>{video.title}</a>
          </Link>
        </li>
      ))}
    </ul>
  ) : (
    <Empty>Ain't no videos</Empty>
  );
};

// Default
// ----------------------------------------------------------------------------

export default function VideosPage() {
  return (
    <>
      <PageTitle>Videos</PageTitle>
      <ClientOnly>
        <SongList />
      </ClientOnly>
    </>
  );
}

// Config
// ----------------------------------------------------------------------------

export async function getStaticProps() {
  return {
    props: {
      pageTitle: "Videos"
    }
  };
}
