import { Fragment } from "react";
import Link from "next/link";
import { gql } from "@apollo/client";
import client from "../../apollo-client";
import ClientOnly from "../../components/ClientOnly";
import Empty from "../../components/Empty";
import PageHeader from "../../components/PageHeader";
import CategoryList from "./components/CategoryList";
import { shuffle } from "../../helpers";

// Default
// ----------------------------------------------------------------------------

export default function Library({ articles }) {
  const randomArticles = shuffle(articles.slice(0, 3));

  return (
    <>
      <PageHeader title="Library" center />
      <p className="text-3xl lg:text-4xl lg:text-center">
        The Grand Library of all things Akabius. Learn about, for instance,{" "}
        {randomArticles.map((article, i) => (
          <Fragment key={article.slug}>
            <Link href={`/library/${encodeURIComponent(article.slug)}`}>
              <a className="underline">{article.title}</a>
            </Link>
            {i + 2 < randomArticles.length
              ? ", "
              : i + 1 < randomArticles.length
              ? " or "
              : ""}
          </Fragment>
        ))}
      </p>
      <ClientOnly>
        <CategoryList />
      </ClientOnly>
    </>
  );
}

// Config
// ----------------------------------------------------------------------------

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      query Entries {
        entries(section: "library") {
          slug
          title
        }
      }
    `
  });

  return {
    props: {
      PageTitle: "Library",
      articles: data.entries,
      spacing: true
    }
  };
}
