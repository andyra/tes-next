import Link from "next/link";
import { gql, useQuery } from "@apollo/client";
import Empty from "../../../components/Empty";

// TODO: Share this code with SongList?

const ArticlesWrapper = ({ children }) => (
  <ul className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-12 md:gap-24">
    {children}
  </ul>
);

const ArticleItemClasses =
  "block text-xl py-20 border-t-2 border-primary-25 border-dotted hover:border-accent hover:text-accent transition group";

export const ArticleItemWrapper = ({ children }) => (
  <li className={ArticleItemClasses}>{children}</li>
);

const ArticlesSkeleton = () => {
  return (
    <ArticlesWrapper>
      {[...Array(8)].map((e, i) => (
        <ArticleItemWrapper key={i}>
          <div className="w-1/3 mx-auto aspect-square rounded-lg mb-16 bg-primary animate-loading" />
          <div className="w-1/2 mx-auto h-24 rounded bg-primary animate-loading" />
        </ArticleItemWrapper>
      ))}
    </ArticlesWrapper>
  );
};

export const ArticleList = ({ divider, id }) => {
  const { data, loading, error } = useQuery(
    gql`
      query Entries {
        entries(section: "library", relatedToCategories: [{ id: "${id}" }]) {
          slug
          title
        }
      }
    `
  );

  if (loading) {
    return <ArticlesSkeleton />;
  }

  if (error) {
    console.error(error);
    return `Query error! ${error.message}`;
  }

  return data ? (
    <>
      {divider && data.entries.length > 0 && (
        <hr className="border-t-2 border-primary-10" />
      )}
      <ArticlesWrapper>
        {data.entries.map(article => (
          <li key={article.slug}>
            <Link href={`/library/${encodeURIComponent(article.slug)}`}>
              <a className={ArticleItemClasses}>{article.title}</a>
            </Link>
          </li>
        ))}
      </ArticlesWrapper>
    </>
  ) : (
    <Empty>Ain't no articles</Empty>
  );
};

export default ArticleList;
