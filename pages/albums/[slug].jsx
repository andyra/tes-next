import { gql } from "@apollo/client";
import client from "helpers/apollo-client";
import { CollectionHeader } from "components/Collections";
import Loader from "components/Loader";
import NiceDate from "components/NiceDate";
import Tracklist from "components/Tracklist";
import { normalizeTracklist } from "helpers/index";
import { DEFAULT_EPISODE_IMAGE } from "../../constants";

// Page
// ----------------------------------------------------------------------------

export default function Album({ album, durations, coverPalette }) {
  if (!album) return <Loader />;
  const { albumTracklist, albumType, artist, releaseDate } = album;
  const normalizedTracks = normalizeTracklist({
    collection: album,
  });

  return (
    <>
      <CollectionHeader collection={album} coverPalette={coverPalette}>
        {albumType !== "bargainBin" && (
          <>
            {artist[0].title} • <NiceDate date={releaseDate} format="year" /> •{" "}
          </>
        )}
        {albumTracklist.length} Tracks
      </CollectionHeader>
      <Tracklist tracks={normalizedTracks} />
    </>
  );
}

// Paths
// -----------------------------------------------------------------------------

export async function getStaticPaths() {
  const { data } = await client.query({
    query: gql`
      query Entries {
        entries(section: "albums") {
          slug
        }
      }
    `,
  });

  const paths = data?.entries.map((entry) => ({
    params: { slug: entry.slug },
  }));

  return {
    paths,
    fallback: true,
  };
}

// Config
// ----------------------------------------------------------------------------

export async function getStaticProps(context) {
  const { params } = context;
  const { data } = await client.query({
    query: gql`
      query Entry {
        entry(section: "albums", slug: "${params.slug}") {
          id
          slug
          title
          uri
          ... on albums_default_Entry {
            albumCoverArt { url }
            albumType
            artist {
              slug
              title
            }
            releaseDate
            albumTracklist {
              ... on albumTracklist_song_BlockType {
                song {
                  slug
                  title
                  uri
                }
                audioFile { url }
              }
              ... on albumTracklist_segment_BlockType {
                description
                audioFile { url }
              }
              ... on albumTracklist_coverSong_BlockType {
                songTitle
                audioFile { url }
              }
            }
          }
        }
      }
    `,
  });

  // Return 404 if the entry has been deleted
  if (!data.entry) {
    return {
      notFound: true,
    };
  }

  // Extract colors from coverArt
  var Vibrant = require("node-vibrant");
  const coverArtSrc =
    data.entry.albumType === "bargainBin"
      ? DEFAULT_EPISODE_IMAGE
      : data.entry.albumCoverArt[0].url;
  const coverPalette = await Vibrant.from(coverArtSrc)
    .getPalette()
    .then(function (palette) {
      return palette;
    });

  return {
    props: {
      album: data.entry,
      coverPalette: JSON.stringify(coverPalette),
      metaTitle: data.entry.title,
      navSection: "Music",
    },
  };
}
