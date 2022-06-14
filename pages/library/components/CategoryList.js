import Link from "next/link";
import { gql, useQuery } from "@apollo/client";

// Components
// ----------------------------------------------------------------------------

const CategoryItem = ({ children, slug }) => {
  return (
    <li>
      <Link href={`/library/category/${encodeURIComponent(slug)}`}>
        <a className="text-xl md:text-2xl text-secondary block p-12 md:p-20 h-full border border-secondary-10 hover:border-accent hover:text-accent">
          {children}
        </a>
      </Link>
    </li>
  );
};

export const CategoryList = ({ level = 1, parentId }) => {
  const PARENT_QUERY = gql`
    query Categories {
      categories(group: "library", level: 1) {
        slug
        title
      }
    }
  `;

  const CHILD_QUERY = gql`
    query Categories {
      categories(group: "library", level: 2, descendantOf: ${parentId}) {
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
        <CategoryItem key={category.slug} slug={category.slug}>
          {category.title}
        </CategoryItem>
      ))}
    </ul>
  ) : (
    <Empty>Ain't no categories</Empty>
  );
};

export default CategoryList;
