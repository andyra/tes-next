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

// Gradient Mask
// ----------------------------------------------------------------------------

function rgbColor(color) {
  return `rgb(${color.rgb[0]}, ${color.rgb[1]}, ${color.rgb[2]})`;
}

const GradientEl = styled.div`
  background: linear-gradient(
    to bottom,
    ${props => props.colorA},
    ${props => props.colorB}
  );
`;

const GradientMask = ({ coverPalette, theme }) => {
  const isLight = theme === "light";
  const {
    Vibrant,
    Muted,
    LightVibrant,
    LightMuted,
    DarkVibrant,
    DarkMuted
  } = JSON.parse(coverPalette);

  const vibrant = rgbColor(Vibrant);
  const vibrantLight = rgbColor(LightVibrant);
  const vibrantDark = rgbColor(DarkVibrant);
  const muted = rgbColor(Muted);
  const mutedLight = rgbColor(LightMuted);
  const mutedDark = rgbColor(DarkMuted);

  const classes = cn(
    "absolute -top-64 bottom-0 -left-full -right-full opacity-50 pointer-events-none",
    isLight ? "mix-blend-darken" : "mix-blend-screen"
  );

  const innerClasses = cn(
    "absolute bottom-0 left-0 w-full h-256 bg-repeat-x bg-center bg-[url('/images/gradient-fade-b.webp')]",
    isLight ? "invert" : ""
  );

  return (
    <GradientEl colorA={vibrant} colorB={mutedDark} className={classes}>
      <div className={innerClasses} />
    </GradientEl>
  );
};

// Collection Header
// ----------------------------------------------------------------------------

export const CollectionHeader = ({ coverPalette, children, collection }) => {
  const { resolvedTheme } = useTheme();
  const { title } = collection;
  const collectionType = getCollectionType(collection, true);

  return (
    <header className="mb-16 mb:mb-48 pb-24 text-center md:text-left relative overflow-visible">
      <GradientMask coverPalette={coverPalette} theme={resolvedTheme} />
      <Button
        className="mb-12 capitalize relative hidden md:inline-flex"
        href={`/${collectionType}`}
        iconLeft="ChevronLeft"
        size="sm"
        variant="glass"
      >
        {collectionType}
      </Button>
      <div className="flex flex-col lg:flex-row lg:items-end gap-24 relative">
        <LightBox
          trigger={
            <CoverArt
              className="rounded-lg w-256 flex-shrink-0 hover:scale-105 hover:shadow-lg duration-300"
              height={256}
              title={title}
              url={getCollectionCoverArtUrl(collection)}
              width={256}
            />
          }
          triggerClassName="w-fit mx-auto md:mx-0"
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
    "divide-y max-w-screen-lg mx-auto": !gridView
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

  const classes = cn(gridView ? "h-full" : "-mx-8", className);

  const linkClasses = cn(
    "hover:text-accent rounded-lg h-full transition group",
    gridView ? "block p-8 md:p-16" : "flex items-center gap-8 py-8 md:py-12"
  );

  const coverArtClasses = cn("border border-primary-5 flex-shrink-0", {
    "w-full rounded-lg transition duration-300": gridView,
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
            <div className="text-lg font-medium leading-snug mt-8 underline underline-offset-4 decoration-wavy decoration-transparent group-hover:decoration-accent transition">
              {title}
            </div>
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
