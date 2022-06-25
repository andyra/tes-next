import PropTypes from "prop-types";
import cn from "classnames";
import Image from "next/image";
import Link from "next/link";
import Button from "./Button";
import CoverArt from "./CoverArt";
import LightBox from "./LightBox";
import NiceDate from "./NiceDate";
import { PageTitle } from "./PageHeader";
import { getCollectionType, getCollectionCoverArtUrl } from "../helpers";

// Collection Header
// ----------------------------------------------------------------------------

export const CollectionHeader = ({ children, collection }) => {
  const { title } = collection;
  const collectionType = getCollectionType(collection, true);

  return (
    <header className="mb-16 mb:mb-48 text-center md:text-left">
      <Button
        className="-ml-16 mb-12 capitalize hidden md:inline-flex"
        href={`/${collectionType}`}
        iconLeft="ChevronLeft"
        size="sm"
        variant="ghost"
      >
        {collectionType}
      </Button>
      <div className="flex flex-col lg:flex-row lg:items-end gap-24">
        <LightBox
          trigger={
            <CoverArt
              className="rounded-lg mx-auto md:mx-0 w-256"
              height={256}
              title={title}
              url={getCollectionCoverArtUrl(collection)}
              width={256}
            />
          }
        >
          <CoverArt
            className="rounded w-1/2 mx-auto"
            height={512}
            title={title}
            url={getCollectionCoverArtUrl(collection)}
            width={512}
          />
        </LightBox>
        <hgroup className="flex flex-col gap-12">
          <PageTitle>{title}</PageTitle>
          {children}
        </hgroup>
      </div>
    </header>
  );
};

CollectionHeader.propTypes = {
  collection: PropTypes.object.isRequired
};

// Collection List
// ----------------------------------------------------------------------------

export const CollectionList = ({ children, gridView }) => {
  const classes = cn({
    "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 -mx-8 md:-mx-16 relative": gridView,
    "divide-y": !gridView
  });

  return <ul className={classes}>{children}</ul>;
};

export const CollectionListSkeleton = () => (
  <CollectionList>
    {[...Array(8)].map((e, i) => (
      <li className="p-8" key={i}>
        <div className="w-full aspect-square rounded-lg mb-16 bg-primary animate-loading" />
        <div className="h-24 w-full rounded bg-primary animate-loading" />
      </li>
    ))}
    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-ground" />
  </CollectionList>
);

// Collection Item
// ----------------------------------------------------------------------------

export const CollectionItem = ({ children, collection, gridView }) => {
  const { releaseDate, title, uri } = collection;
  const linkClasses = cn({
    "Xhover:ring-2 Xhover:ring-accent hover:text-accent rounded-lg p-8 md:p-16 h-full transition group": true,
    block: gridView,
    "flex items-center gap-8": !gridView
  });

  const coverArtClasses = cn({
    "border border-primary-5": true,
    "w-full rounded-lg transition duration-300 origin-center group-hover:-rotate-2 group-hover:shadow-lg": gridView,
    "h-64 w-64 rounded-lg": !gridView
  });

  return (
    <li className={gridView ? "h-full" : ""}>
      <Link href={uri}>
        <a className={linkClasses}>
          <CoverArt
            className={coverArtClasses}
            height={gridView ? 256 : 96}
            title={title}
            url={getCollectionCoverArtUrl(collection)}
            width={gridView ? 256 : 96}
          />
          <div>
            <div className="text-lg font-medium leading-snug mt-8">{title}</div>
            {releaseDate && (
              <NiceDate date={releaseDate} className="opacity-50" />
            )}
            {children}
          </div>
        </a>
      </Link>
    </li>
  );
};

CollectionItem.propTypes = {
  collection: PropTypes.object.isRequired
};
