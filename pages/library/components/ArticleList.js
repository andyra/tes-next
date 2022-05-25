import Link from "next/link";
import { gql, useQuery } from "@apollo/client";

// Queries
// ----------------------------------------------------------------------------

const QUERY_ARTICLES = gql`
  query Entries {
    entries(section: "wiki", relatedToCategories: [{ id: "${id}" }]) {
      slug
      title
    }
  }
`;

// Components
// ----------------------------------------------------------------------------

export const ArticleList = ({ id }) => {
  const { data, loading, error } = useQuery(QUERY_ARTICLES);

  if (loading) {
    return <mark>Loading...</mark>;
  }

  if (error) {
    console.error(error);
    return `Query error! ${error.message}`;
  }

  return data.entries ? (
    <ul>
      {data.entries.map(article => (
        <li className="flex items-center gap-8" key={article.slug}>
          <Link href={`/library/${encodeURIComponent(article.slug)}`}>
            <a>{article.title}</a>
          </Link>
        </li>
      ))}
    </ul>
  ) : (
    <Empty>Ain't no articles</Empty>
  );
};

export default ArticleList;