import { useState } from "react";
import { gql } from "@apollo/client";
import client from "../../apollo-client";
import cn from "classnames";
import Button from "components/Button";
import { CollectionItem, CollectionList } from "components/Collections";
import GridListToggle from "components/GridListToggle";
import Filters, { getDefaultFilters } from "components/Filters";
import MusicTabs from "components/MusicTabs";
import { getArtistInfo } from "helpers/index";
import { camelCaseToWords } from "helpers/utils";

// Functions
// ----------------------------------------------------------------------------

function normalizeAlbumFilters(filterGroups) {
  let [artistOptions, albumTypeOptions] = [[], []];

  for (let album of filterGroups) {
    const artistSlug = getArtistInfo(album, "slug");
    const artistTitle = getArtistInfo(album, "title");

    if (!artistOptions.some(option => option.value === artistSlug)) {
      if (artistSlug) {
        artistOptions.push({
          value: artistSlug,
          label: artistTitle
        });
      }
    }
    if (!albumTypeOptions.some(option => option.value === album.albumType)) {
      if (album.albumType) {
        albumTypeOptions.push({
          value: album.albumType,
          label: camelCaseToWords(album.albumType)
        });
      }
    }
  }

  return [
    {
      label: "Artist",
      value: "artist",
      options: artistOptions
    },
    {
      label: "Album Type",
      value: "albumType",
      options: albumTypeOptions
    }
  ];
}

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

export default function Albums({ albums }) {
  const albumFilters = normalizeAlbumFilters(albums);
  const [filters, setFilters] = useState(getDefaultFilters(albumFilters));
  const [gridView, setGridView] = useState(true);

  return (
    <>
      <header className="relative mb-64">
        <MusicTabs pageName="Albums" />
      </header>
      <div className="flex items-center gap-8 justify-end mb-24 relative z-10">
        <Filters
          filterGroups={albumFilters}
          filters={filters}
          setFilters={setFilters}
        />
        <GridListToggle gridView={gridView} setGridView={setGridView} />
      </div>
      <CollectionList gridView={gridView}>
        {albums.map(album => (
          <AlbumItem
            album={album}
            key={album.slug}
            filters={filters}
            gridView={gridView}
          />
        ))}
      </CollectionList>
    </>
  );
}

// Config
// ----------------------------------------------------------------------------

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      query Entries {
        entries(section: "albums") {
          slug
          title
          uri
          ... on albums_default_Entry {
            releaseDate
            artist {
              slug
              title
            }
            albumCoverArt {
              url
            }
            albumType
          }
        }
      }
    `
  });

  return {
    props: {
      albums: data.entries,
      maxWidth: "max-w-full",
      PageTitle: "Albums"
    }
  };
}
