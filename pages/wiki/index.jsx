import { useQuery } from "@apollo/client";
import ClientOnly from "../../components/ClientOnly";
import Empty from "../../components/Empty";
import { WIKIS } from "../../queries";

export async function getStaticProps() {
  return {
    props: {
      pageTitle: "Wiki",
    },
  };
}

const WikiList = () => {
  const { data, loading, error } = useQuery(WIKIS);

  if (loading) {
    return <mark>Loading...</mark>;
  }

  if (error) {
    console.error(error);
    return null;
  }

  return data.entries ? (
    <ul>
      {data.entries.map((wiki) => (
        <li className="flex items-center gap-8" key={wiki.title}>
          {wiki.title}
        </li>
      ))}
    </ul>
  ) : (
    <Empty>Ain't no wikis</Empty>
  );
};

export default function WikisPage() {
  return (
    <>
      <h1 className="text-6xl font-bold tracking-tighter">Wiki</h1>
      <ClientOnly>
        <WikiList />
      </ClientOnly>
    </>
  );
}
