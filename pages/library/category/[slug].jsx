import Link from "next/link";
import { gql, useQuery } from "@apollo/client";
import client from "../../../apollo-client";
import ClientOnly from "../../../components/ClientOnly";
import Empty from "../../../components/Empty";
import PageTitle from "../../../components/PageTitle";
import ArticleList from "../components/ArticleList";
import CategoryList from "../components/CategoryList";

// Default
// ----------------------------------------------------------------------------

export default function Category({ category }) {
  const { children, id, title } = category;

  return (
    <>
      <PageTitle>{title}</PageTitle>
      {children.length ? (
        <ClientOnly>
          <CategoryList parentId={id} />
        </ClientOnly>
      ) : (
        ""
      )}
      <ClientOnly>
        <ArticleList id={id} />
      </ClientOnly>
    </>
  );
}

// Paths
// ----------------------------------------------------------------------------

export async function getStaticPaths() {
  const { data } = await client.query({
    query: gql`
      query Categories {
        categories(group: "wiki") {
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
        category(group: "wiki", slug: "${params.slug}") {
          id
          children { id }
          title
        }
      }
    `
  });

  return {
    props: {
      category: data.category,
      pageTitle: data.category.title,
      navSection: "Wiki"
    }
  };
}
