import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { gql } from "@apollo/client";
import client from "../../apollo-client";
import PageHeader from "components/PageHeader";
import { querySlugs } from "helpers/index";

// Functions
// ----------------------------------------------------------------------------

// Craft sends back internal links with absolute URLs; here we're making them
// relative to root
function replaceInternalLinks(content) {
  let content1 = content.replace("https://tes-craft.test", "");
  let content2 = content1.replace("https://content.tes.fm", "");
  return content2.replace("https://tes.fm", "");
}

// Default
// ----------------------------------------------------------------------------

export default function Article({ article }) {
  const { categories, featuredImage, postContent, title } = article;

  return (
    <>
      {postContent && (
        <>
          <PageHeader
            back={{ href: "/library", title: "Library" }}
            title={title}
            h1ClassName="font-semibold text-4xl md:text-6xl tracking-tight"
          />
          <article className="flex flex-col lg:flex-row lg:flex-wrap items-start gap-32 lg:gap-64">
            <section className="md:flex-1 text-lg lg:text-xl library-article">
              {postContent.map((item, index) => (
                <Fragment key={index}>
                  {item.text && (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: replaceInternalLinks(item.text)
                      }}
                    />
                  )}
                  {item.image && item.image[0].url && (
                    <figure>
                      <Image
                        alt={item.caption}
                        height={item.image[0].height}
                        layout="responsive"
                        src={item.image[0].url}
                        width={item.image[0].width}
                      />
                      {item.caption && (
                        <figcaption
                          className="font-mono text-xs text-primary-75"
                          dangerouslySetInnerHTML={{ __html: item.caption }}
                        />
                      )}
                    </figure>
                  )}
                </Fragment>
              ))}
            </section>
            <aside className="w-full lg:w-320 order-2 space-y-24">
              {featuredImage && featuredImage.length > 0 && (
                <figure className="border-2 rounded-lg overflow-hidden">
                  <Image
                    alt={title}
                    height={featuredImage[0].height}
                    layout="responsive"
                    src={featuredImage[0].url}
                    width={featuredImage[0].width}
                  />
                </figure>
              )}
              {categories && categories.length > 0 && (
                <dl className="space-y-8">
                  <dt className="font-mono uppercase tracking-wider text-xs text-primary-50 whitespace-nowrap">
                    File under
                  </dt>
                  <dd className="flex flex-wrap gap-8 -ml-8">
                    {categories.map(category => (
                      <Link
                        href={`/library/category/${category.slug}`}
                        key={category.slug}
                      >
                        <a className="rounded-full px-8 bg-primary-5 hover:bg-primary-10">
                          {category.title}
                        </a>
                      </Link>
                    ))}
                  </dd>
                </dl>
              )}
            </aside>
            <footer className="w-full text-xs text-primary-50 pt-24 border-t-2 order-last">
              All information represented here is persuant to Librari Civic
              Information Code, scts. §12.b, §12.c, appendicies 1991/J–F, and
              any other locations heretofore ignored or invalidated by the
              Information Act of 1991, and is NOT subject to approval or
              dismissal by Council member Johnson or representative staff
              (including but not limited to interns, contractors, or other
              unpaid employee-like persons).
            </footer>
          </article>
        </>
      )}
    </>
  );
}

// Paths
// ----------------------------------------------------------------------------

export async function getStaticPaths() {
  const { data } = await client.query({
    query: querySlugs("library")
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
        entry(section: "library", slug: "${params.slug}") {
          title
          ... on library_default_Entry {
            categories {
              slug
              title
              uri
            }
            featuredImage {
              height
              url
              width
            }
            postContent {
              ... on postContent_text_BlockType {
                text
              }
              ... on postContent_image_BlockType {
                caption
                image {
                  height
                  url
                  width
                }
              }
            }
          }
        }
      }
    `
  });

  return {
    props: {
      article: data.entry,
      metaTitle: data.entry.title,
      navSection: "Library"
    }
  };
}
