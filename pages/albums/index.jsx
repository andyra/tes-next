import { useState } from "react";
import { gql } from "@apollo/client";
import client from "../../apollo-client";
import cn from "classnames";
import AlbumList from "./components/AlbumList";
import ClientOnly from "../../components/ClientOnly";
import Icon from "../../components/Icon";
import Filters, { getDefaultFilters } from "../../components/Filters";
import MusicTabs from "../../components/MusicTabs";

// Functions
// ----------------------------------------------------------------------------

function normalizeAlbumFilters(filterGroups) {
  let [artistOptions, albumTypeOptions] = [[], []];

  for (let album of filterGroups) {
    if (!artistOptions.some(option => option.value === album.artist[0].slug)) {
      artistOptions.push({
        value: album.artist[0].slug,
        label: album.artist[0].title
      });
    }

    if (!albumTypeOptions.some(option => option.value === album.albumType)) {
      albumTypeOptions.push({
        value: album.albumType,
        label: album.albumType
      });
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

export default function AlbumsPage({ filterGroups }) {
  const albumFilters = normalizeAlbumFilters(filterGroups);
  const [filters, setFilters] = useState(getDefaultFilters(albumFilters));

  return (
    <>
      <MusicTabs page="Albums" />
      <Filters
        filterGroups={albumFilters}
        filters={filters}
        setFilters={setFilters}
      />
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
      pageTitle: "Albums"
    }
  };
}
