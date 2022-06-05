import Image from "next/image";
import Link from "next/link";
import Button from "./Button";
import CoverArt from "./CoverArt";
import NiceDate from "./NiceDate";
import { PageTitle } from "./PageHeader";
import { getCollectionType, getCollectionCoverArtUrl } from "../helpers";

export const CollectionHeader = ({ children, collection }) => {
  const { title } = collection;
  const collectionType = getCollectionType(collection, true);

  return (
    <header className="mb-16 mb:mb-48">
      <Button
        href={`/${collectionType}`}
        variant="ghost"
        iconLeft="ChevronLeft"
        className="-ml-16 mb-12"
      >
        {collectionType}
      </Button>
      <div className="flex flex-col lg:flex-row lg:items-end gap-24">
        <CoverArt
          className="rounded-lg mx-auto md:mx-0 w-256"
          height={256}
          title={title}
          url={getCollectionCoverArtUrl(collection)}
          width={256}
        />
        <hgroup className="flex flex-col gap-12">
          <PageTitle>{title}</PageTitle>
          {children}
        </hgroup>
      </div>
    </header>
  );
};

export const CollectionList = ({ children }) => (
  <ul className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 -mx-8 relative">
    {children}
  </ul>
);

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

export const CollectionItem = ({ children, collection }) => {
  const { releaseDate, title, uri } = collection;

  return (
    <li className="h-full">
      <Link href={uri}>
        <a className="block hover:bg-accent hover:text-ground rounded p-8 h-full transition">
          <CoverArt
            height={256}
            title={title}
            url={getCollectionCoverArtUrl(collection)}
            width={256}
          />
          <div className="text-lg font-medium leading-snug mt-8">{title}</div>
          {releaseDate && (
            <NiceDate date={releaseDate} className="opacity-50" />
          )}
          {children}
        </a>
      </Link>
    </li>
  );
};
