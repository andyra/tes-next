import { useState } from "react";
import Link from "next/link";
import { gql } from "@apollo/client";
import client from "../../apollo-client";
import { CollectionItem, CollectionList } from "components/Collections";
import Filters, { getDefaultFilters } from "components/Filters";
import PageTabs from "components/PageTabs";
import { getArtistInfo } from "helpers/index";
import { camelCaseToWords } from "helpers/utils";

// Functions
// ----------------------------------------------------------------------------

function normalizeAlbumFilters(filterGroups) {
  let [artistOptions, albumTypeOptions] = [[], []];

  for (let album of filterGroups) {
    const artistSlug = getArtistInfo(album, "slug");
    const artistTitle = getArtistInfo(album, "title");

    if (!artistOptions.some((option) => option.value === artistSlug)) {
      if (artistSlug) {
        artistOptions.push({
          value: artistSlug,
          label: artistTitle,
        });
      }
    }
    if (!albumTypeOptions.some((option) => option.value === album.albumType)) {
      if (album.albumType) {
        albumTypeOptions.push({
          value: album.albumType,
          label: camelCaseToWords(album.albumType),
        });
      }
    }
  }

  return [
    {
      label: "Artist",
      value: "artist",
      options: artistOptions,
    },
    {
      label: "Album Type",
      value: "albumType",
      options: albumTypeOptions,
    },
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
      <PageTabs
        items={[
          { title: "Albums", href: "/albums" },
          { title: "Songs", href: "/songs" },
        ]}
      />
      <div className="flex items-center justify-end gap-8 relative z-10">
        <Filters
          filterGroups={albumFilters}
          filters={filters}
          setFilters={setFilters}
        />
        {/*<GridListToggle gridView={gridView} setGridView={setGridView} />*/}
      </div>
      <CollectionList gridView={gridView}>
        {albums.map((album) => (
          <AlbumItem
            album={album}
            key={album.slug}
            filters={filters}
            gridView={gridView}
          />
        ))}
      </CollectionList>
      <Link
        href="/albums/bargain-bin"
        className="block rounded-lg border-2 border-accent-25 p-24 font-funky text-center text-5xl text-accent hover:border-accent transition"
      >
        Enter the Bargain Bin
      </Link>
    </>
  );
}

// Config
// ----------------------------------------------------------------------------

export async function getStaticProps() {
  const { data } = await client.query({
    fetchPolicy: "no-cache",
    query: gql`
      query Entries {
        entries(
          section: "albums"
          search: "albumType:live OR studio OR episodeCompanion"
          orderBy: "releaseDate DESC"
        ) {
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
    `,
  });

  return {
    props: {
      albums: data.entries,
      maxWidth: "max-w-full",
      metaTitle: "Albums",
    },
  };
}
