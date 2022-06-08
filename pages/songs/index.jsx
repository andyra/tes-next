import { useState } from "react";
import { gql } from "@apollo/client";
import client from "../../apollo-client";
import ClientOnly from "../../components/ClientOnly";
import Filters, { getDefaultFilters } from "../../components/Filters";
import MusicTabs from "../../components/MusicTabs";
import SongList from "./components/SongList";

// Functions
// ----------------------------------------------------------------------------

function normalizeSongFilters(filterGroups) {
  let songTypeOptions = [];

  for (let song of filterGroups) {
    if (!songTypeOptions.some(option => option.value === song.songType)) {
      songTypeOptions.push({
        value: song.songType,
        label: song.songType
      });
    }
  }

  return [
    {
      label: "Song Type",
      value: "songType",
      options: songTypeOptions
    }
  ];
}

// Default
// ----------------------------------------------------------------------------

export default function Songs({ filterGroups }) {
  const songFilters = normalizeSongFilters(filterGroups);
  const [filters, setFilters] = useState(getDefaultFilters(songFilters));

  return (
    <>
      <header className="relative mb-32 md:mb-64">
        <MusicTabs pageName="Songs" />
        <Filters
          className="absolute top-1/2 right-0 -translate-y-1/2"
          filterGroups={songFilters}
          filters={filters}
          setFilters={setFilters}
        />
      </header>
      <ClientOnly>
        <SongList filters={filters} />
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
        entries(section: "songs") {
          ... on songs_default_Entry {
            songType
          }
        }
      }
    `
  });

  return {
    props: {
      filterGroups: data.entries,
      maxWidth: "max-w-none",
      navSection: "Music",
      PageTitle: "Songs"
    }
  };
}
