import Image from "next/image";
import Link from "next/link";
import { gql, useQuery } from "@apollo/client";
import {
  CollectionItem,
  CollectionList,
  CollectionListSkeleton
} from "../../../components/Collections";
import Empty from "../../../components/Empty";
import NiceDate from "../../../components/NiceDate";

// Queries
// ----------------------------------------------------------------------------

const QUERY_ALBUMS = gql`
  query Entries {
    entries(section: "albums") {
      slug
      title
      ... on albums_default_Entry {
        releaseDate
        artist {
          slug
          title
        }
        albumType
        albumCoverArt {
          url
        }
      }
    }
  }
`;

// Components
// ----------------------------------------------------------------------------

export const AlbumItem = ({ album, filters }) => {
  const { albumType, artist, slug, title, albumCoverArt, releaseDate } = album;
  const artistMatches =
    filters.artist === "all" || filters.artist === artist[0].slug;
  const albumTypeMatches =
    filters.albumType === "all" || filters.albumType === albumType;
  const visible = artistMatches && albumTypeMatches;

  return (
    visible && (
      <CollectionItem
        coverArt={albumCoverArt}
        key={slug}
        releaseDate={releaseDate}
        slug={slug}
        title={title}
        type="albums"
      />
    )
  );
};

// Default
// ----------------------------------------------------------------------------

export default function AlbumList({ filters }) {
  const { data, loading, error } = useQuery(QUERY_ALBUMS);

  if (loading) {
    return <CollectionListSkeleton />;
  }

  if (error) {
    console.error(error);
    return `Query error! ${error.message}`;
  }

  return data.entries ? (
    <CollectionList>
      {data.entries.map(album => (
        <AlbumItem album={album} key={album.slug} filters={filters} />
      ))}
    </CollectionList>
  ) : (
    <Empty>Ain't no albums</Empty>
  );
}
