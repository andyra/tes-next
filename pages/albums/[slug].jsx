import { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { gql } from "@apollo/client";
import client from "../../apollo-client";
import { CollectionHeader } from "components/Collections";
import NiceDate from "components/NiceDate";
import PageHeader from "components/PageHeader";
import Tracklist from "components/Tracklist";
import { normalizeTracklist, querySlugs } from "helpers/index";

// Default
// ----------------------------------------------------------------------------

export default function Album({ album, durations }) {
  const {
    albumCoverArt,
    albumTracklist,
    artist,
    releaseDate,
    title,
    uri
  } = album;
  const normalizedTracks = normalizeTracklist({
    collection: album
  });

  return (
    <>
      <CollectionHeader collection={album}>
        <>
          {artist[0].title} • <NiceDate date={releaseDate} format="year" /> •{" "}
          {albumTracklist.length} Tracks
        </>
      </CollectionHeader>
      <Tracklist tracks={normalizedTracks} />
    </>
  );
}

// Paths
// -----------------------------------------------------------------------------

export async function getStaticPaths() {
  const { data } = await client.query({
    query: querySlugs("albums")
  });

  const paths = data.entries.map(entry => ({
    params: { slug: entry.slug }
  }));

  return {
    paths,
    fallback: false
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
    `
  });

  return {
    props: {
      album: data.entry,
      navSection: "Music",
      pageTitle: data.entry.title
    }
  };
}
