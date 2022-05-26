import { useRouter } from "next/router";
import { gql } from "@apollo/client";
import client from "../../apollo-client";
import PageTitle from "../../components/PageTitle";
import { querySlugs } from "../../helpers/query.helpers";

// Default
// ----------------------------------------------------------------------------

export default function Article({ articleItem }) {
  const { article, category, featuredImage, title } = article;
  return (
    <>
      <PageTitle>{title}</PageTitle>
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
      articleItem: data.entry,
      navSection: "Wiki",
      pageTitle: data.entry.title
    }
  };
}
