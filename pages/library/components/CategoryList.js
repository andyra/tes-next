import Link from "next/link";
import { gql, useQuery } from "@apollo/client";

export default function CategoryList({ level = 1, parentId }) {
  const PARENT_QUERY = gql`
    query Categories {
      categories(group: "wiki", level: 1) {
        slug
        title
      }
    }
  `;

  const CHILD_QUERY = gql`
    query Categories {
      categories(group: "wiki", level: 2, descendantOf: ${parentId}) {
        slug
        title
      }
    }
  `;

  const { data, loading, error } = useQuery(
    parentId ? CHILD_QUERY : PARENT_QUERY
  );

  if (loading) {
    return <mark>Loading...</mark>;
  }

  if (error) {
    console.error(error);
    return `Query error! ${error.message}`;
  }

  return data.categories ? (
    <ul className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      {data.categories.map(category => (
        <li key={category.slug}>
          <Link href={`/library/category/${encodeURIComponent(category.slug)}`}>
            <a className="text-2xl text-secondary block p-24 border border-secondary-10 hover:border-accent hover:text-accent">
              {category.title}
            </a>
          </Link>
        </li>
      ))}
    </ul>
  ) : (
    <Empty>Ain't no wiki categories</Empty>
  );
}
