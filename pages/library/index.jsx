import Image from "next/image";
import Link from "next/link";
import { gql } from "@apollo/client";
import client from "../../apollo-client";
import ClientOnly from "@/components/ClientOnly";
import Empty from "@/components/Empty";
import PageHeader from "@/components/PageHeader";
import { shuffle } from "@/helpers/utils";
import CategoryList from "./components/CategoryList";
import { ArticleItem } from "./components/ArticleList";

// Default
// ----------------------------------------------------------------------------

export default function Library({ people }) {
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
      <CategoryList />
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
      }
    `
  });

  return {
    props: {
      PageTitle: "Library",
      people: data.entries,
      spacing: true
    }
  };
}
