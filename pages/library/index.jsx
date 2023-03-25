import Image from "next/image";
import Link from "next/link";
import { gql } from "@apollo/client";
import client from "../../apollo-client";
import ClientOnly from "components/ClientOnly";
import PageHeader from "components/PageHeader";
import ArticleList from "./components/ArticleList";
import CategoryNav from "./components/CategoryNav";
import { shuffle } from "helpers/utils";

// Default
// ----------------------------------------------------------------------------

export default function Library({ categories, people }) {
  const randomArticles = shuffle([...people]).slice(0, 3);

  return (
    <>
      <PageHeader title="Library" center />
      <p className="text-2xl lg:text-3xl text-center text-secondary">
        The Grand Library of all things Akabius. Learn about, for instance:
      </p>
      <CategoryNav categories={categories} />
      <section className="font-serif space-y-16">
        <ClientOnly>
          <ArticleList
            articles={randomArticles}
            showFeaturedImage
            className="grid grid-cols-3"
          />
        </ClientOnly>
      </section>
      <section className="border-t text-center pt-64">
        <Link href="/timeline" className="font-funky text-4xl">
          Timeline
        </Link>
      </section>
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
        allCategories: categories(group: "library", level: 1) {
          slug
          title
        }
      }
    `,
  });

  return {
    props: {
      categories: data.allCategories,
      metaTitle: "Library",
      people: data.entries,
    },
  };
}
