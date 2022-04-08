import { useRouter } from "next/router";
import { gql } from "@apollo/client";
import client from "../../apollo-client";
import PageTitle from "../../components/PageTitle";
import { querySlugs } from "../../helpers/query.helpers";

import DataRow from "../../components/DataRow";

// Default
// ----------------------------------------------------------------------------

export default function Article({ article }) {
  console.log(article);
  return (
    <>
      <PageTitle>{article.title}</PageTitle>
      <section className="divide-y">
        <DataRow title="title" value={article.title} />
        <DataRow title="article" value={article.article} />
        <DataRow title="category">
          <DataRow title="slug" value={article.category[0].slug} />
          <DataRow title="title" value={article.category[0].title} />
        </DataRow>
        <DataRow
          title="featuredImage"
          value={
            article.featuredImage.length ? article.featuredImage[0].url : "n/a"
          }
        />
      </section>
    </>
  );
}

// Paths
// ----------------------------------------------------------------------------

export async function getStaticPaths() {
  const { data } = await client.query({
    query: querySlugs("wiki")
  });

  const paths = data.entries.map(entry => ({
    params: { slug: entry.slug }
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
      query Entry {
        entry(section: "wiki", slug: "${params.slug}") {
          title
          ... on wiki_default_Entry {
            article
            category {
              slug
              title
            }
            featuredImage { url }
          }
        }
      }
    `
  });

  return {
    props: {
      article: data.entry,
      navSection: "Wiki",
      pageTitle: data.entry.title
    }
  };
}
