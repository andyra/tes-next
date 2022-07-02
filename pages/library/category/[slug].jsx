import Link from "next/link";
import { gql, useQuery } from "@apollo/client";
import client from "../../../apollo-client";
import ClientOnly from "@/components/ClientOnly";
import Empty from "@/components/Empty";
import PageHeader from "@/components/PageHeader";
import ArticleList from "../components/ArticleList";
import CategoryList from "../components/CategoryList";

// Default
// ----------------------------------------------------------------------------

export default function Category({ category }) {
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
          <CategoryList parentId={id} />
        </section>
      )}
      <ArticleList id={id} showFeaturedImages={showFeaturedImages} />
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
          children { id }
          parent { slug, title }
          slug
          title
        }
      }
    `
  });

  return {
    props: {
      category: data.category,
      PageTitle: data.category.title,
      maxWidth: "max-w-full",
      navSection: "Library",
      spacing: true
    }
  };
}
