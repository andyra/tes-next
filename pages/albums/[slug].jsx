import Image from "next/image";
import { useRouter } from "next/router";
import { gql } from "@apollo/client";
import client from "../../apollo-client";
import { CollectionHeader } from "../../components/Collections";
import NiceDate from "../../components/NiceDate";
import PageHeader, { H1 } from "../../components/PageHeader";
import Tracklist from "../../components/Tracklist";
import { querySlugs } from "../../helpers";

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
        title: album.artist.length ? album.artist[0].title : null,
      },
      audioFile: track.audioFile.length ? track.audioFile[0].url : null,
      collection: {
        coverArt: album.albumCoverArt,
        slug: album.slug,
        title: album.title,
        uri: album.uri,
        sectionHandle: {album.sectionHandle},
      },
      dateAdded: null,
      id: `album-${album.id}-${i}`,
      position: i,
      slug: track.song && track.song.length ? track.song[0].slug : null,
      title:
        track.song && track.song.length
          ? track.song[0].title
          : track.description && track.description.length
          ? track.description
          : null,
      uri: track.song && track.song.length ? track.song[0].uri : null,
    });
    i++;
  }
  return newTracks;
}

// Default
// ----------------------------------------------------------------------------

export default function Album({ album }) {
  const { albumCoverArt, albumTracklist, artist, releaseDate, title, uri } =
    album;

  return (
    <>
      <CollectionHeader
        title={title}
        coverArt={albumCoverArt}
        back={{ href: "/albums", title: "Albums" }}
      >
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
    query: querySlugs("albums"),
  });

  const paths = data.entries.map((entry) => ({
    params: { slug: entry.slug },
  }));

  return {
    paths,
    fallback: false,
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
          sectionHandle
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
            }
          }
        }
      }
    `,
  });

  return {
    props: {
      album: data.entry,
      navSection: "Music",
      PageTitle: data.entry.title,
    },
  };
}
