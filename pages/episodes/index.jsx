import Link from "next/link";
import { useQuery } from "@apollo/client";
import ClientOnly from "../../components/ClientOnly";
import Empty from "../../components/Empty";
import PageTitle from "../../components/PageTitle";
import { EPISODES } from "../../queries";

// Components
// ----------------------------------------------------------------------------

const EpisodeList = () => {
  const { data, loading, error } = useQuery(EPISODES);

  if (loading) {
    return <mark>Loading...</mark>;
  }

  if (error) {
    console.error(error);
    return null;
  }

  console.log(data.entries);

  return data.entries ? (
    <ul>
      {data.entries.map(episode => (
        <li className="flex items-center gap-8" key={episode.slug}>
          <Link href={`episodes/${episode.slug}`}>
            <a>{episode.title}</a>
          </Link>
        </li>
      ))}
    </ul>
  ) : (
    <Empty>Ain't no episodes</Empty>
  );
};

// Default
// ----------------------------------------------------------------------------

export default function Episodes() {
  return (
    <>
      <PageTitle>Episodes</PageTitle>
      <ClientOnly>
        <EpisodeList />
      </ClientOnly>
    </>
  );
}

// Config
// ----------------------------------------------------------------------------

export async function getStaticProps() {
  return {
    props: {
      pageTitle: "Episodes"
    }
  };
}
