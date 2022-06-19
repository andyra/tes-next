import Link from "next/link";
import { gql, useQuery } from "@apollo/client";
import ClientOnly from "../../components/ClientOnly";
import Empty from "../../components/Empty";
import PageHeader from "../../components/PageHeader";

// Queries
// ----------------------------------------------------------------------------

const VIDEOS_QUERY = gql`
  query Entries {
    entries(section: "videos") {
      id
      slug
      title
    }
  }
`;

// Components
// ----------------------------------------------------------------------------

const SongList = () => {
  const { data, loading, error } = useQuery(VIDEOS_QUERY);

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

export default function Videos() {
  return (
    <>
      <PageHeader title="Videos" />
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
      PageTitle: "Videos"
    }
  };
}
