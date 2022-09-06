import PropTypes from "prop-types";
import cn from "classnames";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import styled from "styled-components";
import Button from "components/Button";
import CoverArt from "components/CoverArt";
import LightBox from "components/LightBox";
import NiceDate from "components/NiceDate";
import { PageTitle } from "components/PageHeader";
import { getCollectionType, getCollectionCoverArtUrl } from "helpers/index";

const ColorEl = styled.div.attrs({
  className: "absolute top-0 left-0 w-full h-full"
})`
  background-color: ${props => props.bgColor};
`;

const BgGradient = ({ bgColor, theme }) => {
  return (
    <div
      className={`absolute top-0 left-0 w-full h-256 flex items-end bg-white opacity-50 ${
        theme === "light" ? "mix-blend-multiply" : "mix-blend-screen"
      }`}
    >
      <ColorEl
        bgColor={bgColor}
        className={
          theme === "light" ? "mix-blend-screen" : "mix-blend-multiply"
        }
      />
      <div
        className={`h-256 w-full bg-repeat-x bg-[url('/images/gradient-fade-sm.webp')]${
          theme === "light" ? " XXXrotate-180" : ""
        }`}
      />
    </div>
  );
};

// Collection Header
// ----------------------------------------------------------------------------

export const CollectionHeader = ({ bgColor, children, collection }) => {
  const { resolvedTheme } = useTheme();
  const { title } = collection;
  const collectionType = getCollectionType(collection, true);

  return (
    <header className="mb-16 mb:mb-48 text-center md:text-left">
      <BgGradient bgColor={bgColor} theme={resolvedTheme} />
      <Button
        className="mb-12 capitalize hidden md:inline-flex"
        href={`/${collectionType}`}
        iconLeft="ChevronLeft"
        size="sm"
        variant="glass"
      >
        {collectionType}
      </Button>
      <div className="flex flex-col lg:flex-row lg:items-end gap-24">
        <LightBox
          trigger={
            <CoverArt
              className="rounded-lg mx-auto md:mx-0 w-256 flex-shrink-0 hover:scale-105 hover:shadow-lg duration-300"
              height={256}
              title={title}
              url={getCollectionCoverArtUrl(collection)}
              width={256}
            />
          }
          triggerClassName="w-fit"
        >
          <CoverArt
            layout="responsive"
            className="rounded-lg mx-auto w-full"
            height={1024}
            title={title}
            url={getCollectionCoverArtUrl(collection)}
            width={1024}
          />
        </LightBox>
        <hgroup className="flex flex-col gap-12">
          <PageTitle>{title}</PageTitle>
          <div className="text-lg">{children}</div>
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
    "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 -mx-8 md:-mx-16": gridView,
    "divide-y": !gridView
  });

  return <ul className={classes}>{children}</ul>;
};

export const CollectionListSkeleton = ({ gridView }) => (
  <CollectionList gridView={gridView}>
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

export const CollectionItem = ({
  children,
  className,
  collection,
  gridView
}) => {
  const { releaseDate, title, uri } = collection;

  const classes = cn(className, {
    "h-full": gridView
  });

  const linkClasses = cn({
    "hover:text-accent rounded-lg p-8 md:p-16 h-full transition group": true,
    block: gridView,
    "flex items-center gap-8": !gridView
  });

  const coverArtClasses = cn({
    "border border-primary-5": true,
    "w-full rounded-lg transition duration-300 origin-center group-hover:-rotate-2 group-hover:shadow-lg": gridView,
    "h-64 w-64 rounded-lg": !gridView
  });

  return (
    <li className={classes}>
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
