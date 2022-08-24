import Link from "next/link";
import { gql, useQuery } from "@apollo/client";
import client from "../../../apollo-client";
import ClientOnly from "components/ClientOnly";
import Empty from "components/Empty";
import PageHeader from "components/PageHeader";
import ArticleItem from "../components/ArticleItem";
import CategoryItem from "../components/CategoryItem";

// Default
// ----------------------------------------------------------------------------

export default function Category({ articles, category }) {
  const { children, id, parent, slug, title } = category;
  const showFeaturedImages =
    slug === "people" || (parent !== null && parent.slug === "people");

  const backLink = parent
    ? { title: parent.title, href: parent.slug }
    : { title: "Library", href: "/library" };

  return (
    <>
      <PageHeader title={title} center back={backLink} />
      {children.length > 0 && (
        <section className="max-w-screen-lg mx-auto">
          <ul className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {children.map(category => (
              <CategoryItem key={category.slug} slug={category.slug}>
                {category.title}
              </CategoryItem>
            ))}
          </ul>
        </section>
      )}
      <ul className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-x-12 md:gap-x-24">
        {articles.map(article => (
          <ArticleItem
            article={article}
            key={article.slug}
            showFeaturedImages={showFeaturedImages}
          />
        ))}
      </ul>
    </>
  );
}

// Paths
// ----------------------------------------------------------------------------

export async function getStaticPaths() {
  const { data } = await client.query({
    query: gql`
      query Categories {
        categories(group: "library") {
          slug
        }
      }
    `
  });

  const paths = data.categories.map(category => ({
    params: { slug: category.slug }
  }));

  return {
    paths,
    fallback: false
  };
}

// Config
// ----------------------------------------------------------------------------

export async function getStaticProps(context) {
  const { params } = context;
  const { data } = await client.query({
    query: gql`
      query Category {
        category(group: "library", slug: "${params.slug}") {
          id
          children { id, slug, title }
          parent { slug, title }
          slug
          title
        }
        entries(section: "library", relatedToCategories: [{ slug: "${
          params.slug
        }" }]) {
          slug
          title
          uri
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
  });

  return {
    props: {
      articles: data.entries,
      category: data.category,
      pageTitle: data.category.title,
      maxWidth: "max-w-full",
      navSection: "Library"
    }
  };
}
