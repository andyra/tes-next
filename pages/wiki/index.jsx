import Link from "next/link";
import { useQuery } from "@apollo/client";
import ClientOnly from "../../components/ClientOnly";
import Empty from "../../components/Empty";
import PageTitle from "../../components/PageTitle";
import { WIKIS } from "../../queries";

// Components
// ----------------------------------------------------------------------------

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
      {data.entries.map(article => (
        <li className="flex items-center gap-8" key={article.slug}>
          <Link href={`wiki/${article.slug}`}>
            <a>{article.title}</a>
          </Link>
        </li>
      ))}
    </ul>
  ) : (
    <Empty>Ain't no wikis</Empty>
  );
};

// Default
// ----------------------------------------------------------------------------

export default function WikisPage() {
  return (
    <>
      <PageTitle>Wiki</PageTitle>
      <ClientOnly>
        <WikiList />
      </ClientOnly>
    </>
  );
}

// Config
// ----------------------------------------------------------------------------

export async function getStaticProps() {
  return {
    props: {
      pageTitle: "Wiki"
    }
  };
}
