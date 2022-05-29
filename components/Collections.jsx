import Image from "next/image";
import Link from "next/link";
import CoverArt from "./CoverArt";
import NiceDate from "./NiceDate";
import { H1 } from "./PageTitle";

export const CollectionHeader = ({ coverArt, title, children }) => (
  <header className="flex flex-col lg:flex-row lg:items-end gap-24 mb-16 mb:mb-48">
    <CoverArt
      src={coverArt}
      className="mx-auto md:mx-0 w-256 h-256"
      title={title}
      width={256}
      height={256}
    />
    <hgroup className="flex flex-col gap-12">
      <H1>{title}</H1>
      {children}
    </hgroup>
  </header>
);

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

export const CollectionItem = ({
  children,
  coverArt,
  releaseDate,
  slug,
  title,
  type
}) => (
  <li className="h-full">
    <Link href={`/${type}/${encodeURIComponent(slug)}`}>
      <a className="block hover:bg-accent hover:text-ground rounded p-8 h-full transition">
        <CoverArt title={title} src={coverArt} width={256} height={256} />
        <div className="text-lg font-medium leading-snug mt-8">{title}</div>
        {releaseDate && <NiceDate date={releaseDate} className="opacity-50" />}
        {children}
      </a>
    </Link>
  </li>
);
