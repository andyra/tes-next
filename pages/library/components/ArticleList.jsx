import React from "react";
import Image from "next/legacy/image";
import Link from "next/link";
import cn from "classnames";
import DotMatrix from "./DotMatrix";
import Info from "./Info";
import Tape from "./Tape";
import { articleHref, categoryHref } from "helpers";

const ArticleCard = ({ article, rotate, showFeaturedImage }) => {
  const { featuredImage, title, slug } = article;

  return (
    <li>
      <Link
        href={articleHref(slug)}
        className="block h-full p-16 space-y-12 text-lg text-secondary text-center group"
      >
        <figure className={cn("library-image border border-secondary", rotate)}>
          <Tape />
          {featuredImage?.length ? (
            <Image
              alt={title}
              height={featuredImage[0].height}
              layout="responsive"
              src={featuredImage[0].url}
              width={featuredImage[0].width}
            />
          ) : (
            <div className="flex items-center justify-center bg-ground font-mono uppercase text-xl text-secondary-25 aspect-square">
              n/a
            </div>
          )}
        </figure>
        <div className="underline underline-offset-4 decoration-wavy decoration-transparent group-hover:decoration-secondary transition">
          {title}
        </div>
      </Link>
    </li>
  );
};

const ArticleRow = ({ article, category }) => {
  const { categories, slug, title, uri } = article;
  const otherCategories = categories.filter((cat) => {
    return cat.slug !== category?.slug;
  });

  return (
    <li className="flex items-center gap-8 border-b border-dotted border-secondary">
      <Link
        href={articleHref(slug)}
        className="flex-1 py-12 text-secondary underline underline-offset-4 decoration-wavy decoration-transparent hover:decoration-secondary transition"
      >
        {title}
      </Link>
      {!!otherCategories && (
        <div>
          {otherCategories.map((cat) => (
            <React.Fragment key={cat.slug}>
              <Link
                href={categoryHref(cat.slug)}
                className="tracking-wider text-xs font-base uppercase underline underline-offset-4 decoration-transparent hover:decoration-secondary transition"
              >
                {cat.title}
              </Link>{" "}
            </React.Fragment>
          ))}
        </div>
      )}
    </li>
  );
};

const ArticleList = ({
  articles,
  category,
  className = "grid grid-cols-3 md:grid-cols-4",
  showFeaturedImage,
}) => {
  return showFeaturedImage ? (
    <ul className={className}>
      {!!articles &&
        articles.map((article, i) => (
          <ArticleCard
            article={article}
            key={article.slug}
            rotate={
              i % 5 === 0
                ? "-rotate-2"
                : i % 3 === 0
                ? "rotate-[1deg]"
                : i % 2 === 0
                ? "-rotate-[1deg]"
                : ""
            }
          />
        ))}
    </ul>
  ) : (
    <DotMatrix className="max-w-screen-lg mx-auto">
      <header className="flex border-y border-secondary mb-48">
        <Info label="Index_of" className="flex-1">
          <h2 className="text-2xl">{category?.title}</h2>
        </Info>
        <Info label="REF_ID#" className="border-l border-secondary">
          {category?.id}
        </Info>
      </header>
      <ul className="border-t border-dotted border-secondary text-lg">
        {!!articles &&
          articles.map((article, i) => (
            <ArticleRow
              article={article}
              category={category}
              key={article.slug}
            />
          ))}
      </ul>
    </DotMatrix>
  );
};

export default ArticleList;
