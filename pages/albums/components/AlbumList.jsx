import Image from "next/image";
import Link from "next/link";
import { gql, useQuery } from "@apollo/client";
import {
  CollectionItem,
  CollectionList,
  CollectionListSkeleton
} from "components/Collections";
import Empty from "components/Empty";
import NiceDate from "components/NiceDate";
import QueryError from "components/QueryError";
import { getArtistInfo } from "helpers/index";

// Queries
// ----------------------------------------------------------------------------

const QUERY_ALBUMS = gql`
  query Entries {
    entries(section: "albums", orderBy: "releaseDate DESC") {
      slug
      title
      uri
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

export const AlbumItem = ({ album, filters, gridView }) => {
  const { albumType, artist, slug, title, albumCoverArt, releaseDate } = album;
  const artistSlug = getArtistInfo(album, "slug");

  const artistMatches =
    filters.artist === "all" || filters.artist === artistSlug;
  const albumTypeMatches =
    filters.albumType === "all" || filters.albumType === albumType;
  const visible = artistMatches && albumTypeMatches;

  return visible && <CollectionItem collection={album} gridView={gridView} />;
};

// Default
// ----------------------------------------------------------------------------

const AlbumList = ({ filters, gridView }) => {
  const { data, loading, error } = useQuery(QUERY_ALBUMS);

  if (loading) {
    return <CollectionListSkeleton gridView={gridView} />;
  }

  if (error) {
    console.error(error);
    return <QueryError error={error.message} />;
  }

  return data.entries ? (
    <CollectionList gridView={gridView}>
      {data.entries.map(album => (
        <AlbumItem
          album={album}
          key={album.slug}
          filters={filters}
          gridView={gridView}
        />
      ))}
    </CollectionList>
  ) : (
    <Empty>no albums</Empty>
  );
};

export default AlbumList;
