import Image from "next/image";
import Link from "next/link";
import { gql } from "@apollo/client";
import client from "../../apollo-client";
import ClientOnly from "components/ClientOnly";
import Empty from "components/Empty";
import PageHeader from "components/PageHeader";
import CategoryItem from "./components/CategoryItem";
import ArticleItem from "./components/ArticleItem";
import { shuffle } from "helpers/utils";

// Default
// ----------------------------------------------------------------------------

export default function Library({ categories, people }) {
  const randomArticles = shuffle([...people]).slice(0, 3);

  return (
    <>
      <PageHeader title="Library" center />
      <section className="space-y-16">
        <p className="text-2xl lg:text-3xl lg:text-center">
          The Grand Library of all things Akabius. Learn about, for instance:
        </p>
        <ClientOnly>
          <ul className="grid grid-cols-3 gap-16">
            {randomArticles.map(article => (
              <ArticleItem
                article={article}
                showFeaturedImages={true}
                key={article.slug}
              />
            ))}
          </ul>
        </ClientOnly>
      </section>
      <ul className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {categories.map(category => (
          <CategoryItem key={category.slug} slug={category.slug}>
            {category.title}
          </CategoryItem>
        ))}
      </ul>
    </>
  );
}

// Config
// ----------------------------------------------------------------------------

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      query Entries {
        entries(section: "library", relatedToCategories: [{ slug: "people" }]) {
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
        categories(group: "library", level: 1) {
          slug
          title
        }
      }
    `
  });

  return {
    props: {
      categories: data.categories,
      pageTitle: "Library",
      people: data.entries
    }
  };
}
