import Image from "next/image";
import Link from "next/link";
import { gql, useQuery } from "@apollo/client";
import Empty from "../../../components/Empty";

// TODO: Share this code with SongList?

const ArticlesWrapper = ({ children }) => (
  <ul className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-x-12 md:gap-x-24">
    {children}
  </ul>
);

const articleItemClasses =
  "block h-full text-xl px-8 py-16 border-t-2 border-primary-25 border-dotted hover:border-accent hover:text-accent hover:bg-primary-5 transition group";

export const ArticleItemWrapper = ({ children }) => (
  <li className={articleItemClasses}>{children}</li>
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

export const ArticleItem = ({ article, showFeaturedImages }) => {
  const { featuredImage, slug, title } = article;

  return (
    <li>
      <Link href={`/library/${encodeURIComponent(slug)}`}>
        <a
          className={`${articleItemClasses}${
            showFeaturedImages ? " text-center" : ""
          }`}
        >
          {title}
          {showFeaturedImages &&
            (featuredImage && featuredImage.length > 0 ? (
              <figure className="grayscale mix-blend-multiply w-1/2 mt-8 mx-auto">
                <Image
                  alt={title}
                  height={featuredImage[0].height}
                  layout="responsive"
                  src={featuredImage[0].url}
                  width={featuredImage[0].width}
                />
              </figure>
            ) : (
              <div className="text-8xl text-primary-10">?</div>
            ))}
        </a>
      </Link>
    </li>
  );
};

export const ArticleList = ({ id, showFeaturedImages }) => {
  const { data, loading, error } = useQuery(
    gql`
      query Entries {
        entries(section: "library", relatedToCategories: [{ id: "${id}" }]) {
          slug
          title
          ... on library_default_Entry {
            featuredImage {
              height
              url
              width
            }
          }
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
    <ArticlesWrapper>
      {data.entries.map(article => (
        <ArticleItem
          key={article.slug}
          article={article}
          showFeaturedImages={showFeaturedImages}
        />
      ))}
    </ArticlesWrapper>
  ) : (
    <Empty>Ain't no articles</Empty>
  );
};

export default ArticleList;
