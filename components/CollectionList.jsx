import Image from "next/image";
import Link from "next/link";
import CoverArt from "./CoverArt";
import NiceDate from "./NiceDate";

export const CollectionList = ({ children }) => (
  <ul className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 -mx-8 relative">
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
  href,
  coverArt,
  releaseDate,
  title
}) => (
  <li>
    <Link href={href}>
      <a className="block hover:bg-primary-10 rounded p-8 transition">
        <CoverArt title={title} src={coverArt} width={256} height={256} />
        <div className="text-lg font-medium leading-snug mt-8">{title}</div>
        {releaseDate && <NiceDate date={releaseDate} className="opacity-50" />}
        {children}
      </a>
    </Link>
  </li>
);
