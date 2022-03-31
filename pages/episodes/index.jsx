import { useQuery } from "@apollo/client";
import ClientOnly from "../../components/ClientOnly";
import Empty from "../../components/Empty";
import { EPISODES } from "../../queries";

export async function getStaticProps() {
  return {
    props: {
      pageTitle: "Episodes",
    },
  };
}

const EpisodeList = () => {
  const { data, loading, error } = useQuery(EPISODES);

  if (loading) {
    return <mark>Loading...</mark>;
  }

  if (error) {
    console.error(error);
    return null;
  }

  return data.entries ? (
    <ul>
      {data.entries.map((episode) => (
        <li className="flex items-center gap-8" key={episode.title}>
          {episode.title}
        </li>
      ))}
    </ul>
  ) : (
    <Empty>Ain't no episodes</Empty>
  );
};

export default function EpisodesPage() {
  return (
    <>
      <h1 className="text-6xl font-bold tracking-tighter">Episodes</h1>
      <ClientOnly>
        <EpisodeList />
      </ClientOnly>
    </>
  );
}
