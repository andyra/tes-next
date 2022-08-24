import Link from "next/link";
import { gql, useQuery } from "@apollo/client";
import Empty from "components/Empty";
import QueryError from "components/QueryError";

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
  const ulClasses =
    "grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5";

  const CategoryListSkeleton = () => (
    <ul className={ulClasses}>
      {[...Array(16)].map((e, i) => (
        <li className="p-12 md:p-20 h-full border border-secondary-10" key={i}>
          <div className="h-32 w-full rounded bg-primary animate-loading" />
        </li>
      ))}
    </ul>
  );

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
    return <CategoryListSkeleton />;
  }

  if (error) {
    console.error(error);
    return <QueryError error={error.message} />;
  }

  return data.categories ? (
    <ul className={ulClasses}>
      {data.categories.map(category => (
        <CategoryItem key={category.slug} slug={category.slug}>
          {category.title}
        </CategoryItem>
      ))}
    </ul>
  ) : (
    <Empty>Ain&apos;t no categories</Empty>
  );
};

export default CategoryList;
