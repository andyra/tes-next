import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { gql } from "@apollo/client";
import cn from "classnames";
import client from "../../apollo-client";
import LightBox from "components/LightBox";
import CategoryNav from "./components/CategoryNav";
import DotMatrix from "./components/DotMatrix";
import Info from "./components/Info";
import Tape from "./components/Tape";
import { querySlugs } from "helpers/index";

// Functions
// ----------------------------------------------------------------------------

// Craft sends back internal links with absolute URLs; here we're making them
// relative to root
function replaceInternalLinks(content) {
  let content1 = content.replace(/https:\/\/tes-craft.test/g, "");
  let content2 = content1.replace(/https:\/\/content.tes.fm/g, "");
  return content2.replace(/https:\/\/tes.fm/g, "");
}

// Components
// ----------------------------------------------------------------------------

const Header = ({ categories, id, title }) => {
  return (
    <header className="border-y border-secondary text-sm mb-48">
      <div className="flex gap-12">
        <Info label="File Under" className="flex-1">
          {categories?.length
            ? categories.map(category => (
                <Link
                  href={`/library/category/${category.slug}`}
                  key={category.slug}
                >
                  <a className="underline hover:text-accent">
                    {category.title}{" "}
                  </a>
                </Link>
              ))
            : "n/a"}
        </Info>
      </div>
      <div className="flex border-t border-secondary">
        <Info label="UTF_TITLE" className="flex-1">
          <h1 className="text-2xl">{title}</h1>
        </Info>
        <Info
          label="Filing №"
          className="border-l border-secondary"
          aria-hidden
        >
          {id}
        </Info>
        <Info
          label="Lookup-ID"
          className="border-l border-secondary"
          aria-hidden
        >
          {id}
        </Info>
      </div>
    </header>
  );
};

// Default
// ----------------------------------------------------------------------------

export default function Article({ allCategories, article }) {
  const { categories, featuredImage, id, postContent, title } = article;
  const isEmpty = postContent.length === 1 && postContent[0].text === null;

  return (
    <>
      <DotMatrix className="library-article" asChild>
        <article>
          <Header categories={categories} id={id} title={title} />
          {isEmpty ? (
            <div className="bg-secondary-5 text-secondary-50 italic p-24 text-center">
              Article redacted for further investigation
            </div>
          ) : (
            <section className="text-lg">
              {featuredImage && featuredImage.length > 0 && (
                <LightBox
                  triggerClassName="float-right ml-16 mb-16 w-1/3 border border-secondary rotate-2 relative shadow-md hover:shadow-xl transition duration-300"
                  trigger={
                    <figure>
                      <Tape />
                      <Image
                        alt={title}
                        height={featuredImage[0].height}
                        layout="responsive"
                        src={featuredImage[0].url}
                        width={featuredImage[0].width}
                      />
                    </figure>
                  }
                >
                  <figure className="bg-white p-[4vmin]">
                    <Image
                      alt={title}
                      height={featuredImage[0].height}
                      layout="responsive"
                      src={featuredImage[0].url}
                      width={featuredImage[0].width}
                    />
                  </figure>
                </LightBox>
              )}
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
                    <figure className="border border-secondary relative">
                      <Tape />
                      <Image
                        alt={item.caption}
                        height={item.image[0].height}
                        layout="responsive"
                        src={item.image[0].url}
                        width={item.image[0].width}
                      />
                      {item.caption && (
                        <figcaption
                          className="font-serif text-xs text-secondary-75"
                          dangerouslySetInnerHTML={{ __html: item.caption }}
                        />
                      )}
                    </figure>
                  )}
                </Fragment>
              ))}
            </section>
          )}
          <footer className="w-full text-xs pt-24 border-t border-secondary uppercase tracking-wider order-last mt-[12vmax]">
            All information represented here is persuant to Librari Civic
            Information Code, scts. §12.b, §12.c, appendicies 1991/J–F, and any
            other locations heretofore ignored or invalidated by the Information
            Act of 1991, and is NOT subject to approval or dismissal by Council
            member Johnson or representative staff (including but not limited to
            interns, contractors, or other unpaid employee-like persons).
          </footer>
        </article>
      </DotMatrix>
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
        allCategories: categories(group: "library", level: 1) {
          slug
          title
        }
        entry(section: "library", slug: "${params.slug}") {
          id
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
      allCategories: data.allCategories,
      article: data.entry,
      spacing: false,
      metaTitle: data.entry.title,
      navSection: "Library"
    }
  };
}
