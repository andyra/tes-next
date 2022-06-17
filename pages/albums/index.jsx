import { useState } from "react";
import { gql } from "@apollo/client";
import client from "../../apollo-client";
import cn from "classnames";
import AlbumList from "./components/AlbumList";
import ClientOnly from "../../components/ClientOnly";
import Filters, { getDefaultFilters } from "../../components/Filters";
import MusicTabs from "../../components/MusicTabs";
import { getArtistInfo } from "../../helpers/";
import { camelCaseToWords } from "../../helpers/utils";

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

  return (
    <>
      <header className="relative mb-64">
        <MusicTabs pageName="Albums" />
        <Filters
          className="absolute top-1/2 right-0 -translate-y-1/2"
          filterGroups={albumFilters}
          filters={filters}
          setFilters={setFilters}
        />
      </header>
      <ClientOnly>
        <AlbumList filters={filters} />
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
