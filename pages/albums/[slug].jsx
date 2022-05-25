import Image from "next/image";
import { useRouter } from "next/router";
import { gql } from "@apollo/client";
import client from "../../apollo-client";
import { CollectionHeader } from "../../components/Collections";
import NiceDate from "../../components/NiceDate";
import PageTitle, { H1 } from "../../components/PageTitle";
import Tracklist from "../../components/Tracklist";
import { querySlugs } from "../../helpers/query.helpers";

// Functions
// ----------------------------------------------------------------------------

function normalizeAlbumTracks(album) {
  const newTracks = [];
  let i = 1;

  for (let track of album.albumTracklist) {
    newTracks.push({
      addedBy: null,
      artist: {
        slug: album.artist.length ? album.artist[0].slug : null,
        title: album.artist.length ? album.artist[0].title : null
      },
      audioFile: track.audioFile.length ? track.audioFile[0].url : null,
      collection: {
        coverArtUrl: album.albumCoverArt.length
          ? album.albumCoverArt[0].url
          : null,
        slug: album.slug,
        title: album.title,
        entryType: "album"
      },
      dateAdded: null,
      listType: "playlist",
      id: `album-${album.id}-${i}`,
      position: i,
      slug: track.song && track.song.length ? track.song[0].slug : null,
      title:
        track.song && track.song.length
          ? track.song[0].title
          : track.description && track.description.length
          ? track.description
          : null
    });
    i++;
  }
  return newTracks;
}

// Default
// ----------------------------------------------------------------------------

export default function Album({ album }) {
  const { albumCoverArt, albumTracklist, artist, releaseDate, title } = album;

  return (
    <>
      <CollectionHeader title={title} coverArt={albumCoverArt}>
        <div>
          {artist[0].title} • <NiceDate date={releaseDate} format="year" /> •{" "}
          {albumTracklist.length} Tracks • Duration
        </div>
      </CollectionHeader>
      <Tracklist tracks={normalizeAlbumTracks(album)} />
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
                }
                audioFile { url }
              }
              ... on albumTracklist_segment_BlockType {
                description
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
