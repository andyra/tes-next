import Link from "next/link";
import { gql, useQuery } from "@apollo/client";
import client from "../../../apollo-client";
import PageHeader from "components/PageHeader";
import ArticleList from "../components/ArticleList";
import CategoryNav from "../components/CategoryNav";

// Default
// ----------------------------------------------------------------------------

export default function Category({
  articles,
  category,
  allCategories,
  parentCategory
}) {
  const { children: subCategories, id, parent, slug, title } = category;
  const isPeopleCategory =
    slug === "people" || (parent !== null && parent.slug === "people");
  const showFeaturedImage = isPeopleCategory;
  const peopleCategories = parentCategory[0].children;

  return (
    <>
      <PageHeader title="Library" center />
      {!parent ? (
        <CategoryNav
          backLink={{ title: "Library", href: "/library" }}
          categories={allCategories}
          className="max-w-screen-lg mx-auto"
          collapsible
        />
      ) : null}
      {subCategories.length ? (
        <CategoryNav
          categories={subCategories}
          className="max-w-screen-lg mx-auto"
        />
      ) : null}
      {isPeopleCategory ? (
        <CategoryNav
          backLink={{ title: "People", href: "/library/category/people" }}
          categories={peopleCategories}
          className="max-w-screen-lg mx-auto"
          collapsible
        />
      ) : null}
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
        parentCategory: categories(group: "library", slug: "people") {
          slug
          title
          children { id, slug, title }
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
      allCategories: data.allCategories,
      articles: data.entries,
      category: data.category,
      metaTitle: data.category.title,
      navSection: "Library",
      parentCategory: data.parentCategory
    }
  };
}
