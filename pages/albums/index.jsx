import { useState } from "react";
import { gql } from "@apollo/client";
import client from "../../apollo-client";
import cn from "classnames";
import Button from "components/Button";
import ClientOnly from "components/ClientOnly";
import GridListToggle from "components/GridListToggle";
import Filters, { getDefaultFilters } from "components/Filters";
import MusicTabs from "components/MusicTabs";
import AlbumList from "./components/AlbumList";
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

// Default
// ----------------------------------------------------------------------------

export default function Albums({ filterGroups }) {
  const albumFilters = normalizeAlbumFilters(filterGroups);
  const [filters, setFilters] = useState(getDefaultFilters(albumFilters));
  const [gridView, setGridView] = useState(true);

  return (
    <>
      <header className="relative mb-64">
        <MusicTabs pageName="Albums" />
      </header>
      <div className="flex items-center gap-8 justify-end mb-24">
        <Filters
          filterGroups={albumFilters}
          filters={filters}
          setFilters={setFilters}
        />
        <GridListToggle gridView={gridView} setGridView={setGridView} />
      </div>
      <ClientOnly>
        <AlbumList filters={filters} gridView={gridView} />
      </ClientOnly>
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
          ... on albums_default_Entry {
            artist {
              slug
              title
            }
            albumType
          }
        }
      }
    `
  });

  return {
    props: {
      filterGroups: data.entries,
      maxWidth: "max-w-full",
      PageTitle: "Albums"
    }
  };
}
