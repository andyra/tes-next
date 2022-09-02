import Link from "next/link";
import { gql, useQuery } from "@apollo/client";
import client from "../../../apollo-client";
import PageHeader from "components/PageHeader";
import ArticleList from "../components/ArticleList";
import CategoryNav from "../components/CategoryNav";

// Default
// ----------------------------------------------------------------------------

export default function Category({ articles, category, allCategories }) {
  const { children: subCategories, id, parent, slug, title } = category;
  const showFeaturedImage =
    slug === "people" || (parent !== null && parent.slug === "people");

  return (
    <>
      <PageHeader title="Library" center />
      <CategoryNav
        categories={subCategories.length ? subCategories : allCategories}
        className="max-w-screen-lg mx-auto"
        isSubCategory={subCategories.length > 0}
      />
      <ArticleList
        articles={articles}
        category={category}
        showFeaturedImage={showFeaturedImage}
      />
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
        allCategories: categories(group: "library", level: 1) {
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
            categories {
              slug
              title
            }
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
      allCategories: data.allCategories,
      metaTitle: data.category.title,
      navSection: "Library"
    }
  };
}
