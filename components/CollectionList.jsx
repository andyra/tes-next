import Image from "next/image";
import Link from "next/link";
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
        <div className="w-full aspect-square rounded-lg mb-16 bg-primary animate-shimmer" />
        <div className="h-24 w-full rounded bg-primary animate-shimmer" />
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
        {coverArt.length ? (
          <Image
            alt={`${title} cover art`}
            src={coverArt[0].url}
            width={256}
            height={256}
          />
        ) : (
          <div className="w-full aspect-square bg-primary-10 flex items-center justify-center text-primary-50">
            n/a
          </div>
        )}
        <div className="text-lg font-medium leading-snug mt-8">{title}</div>
        {releaseDate && <NiceDate date={releaseDate} className="opacity-50" />}
        {children}
      </a>
    </Link>
  </li>
);
