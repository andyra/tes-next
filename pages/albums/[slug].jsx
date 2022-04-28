import { useRouter } from "next/router";
import { gql } from "@apollo/client";
import client from "../../apollo-client";
import CollectionHeader from "../../components/CollectionHeader";
import PageTitle from "../../components/PageTitle";
import Tracklist from "../../components/Tracklist";
import { querySlugs } from "../../helpers/query.helpers";

// Functions
// ----------------------------------------------------------------------------

function normalizeAlbumTracks(album) {
  const newTracks = [];
  let i = 1;

  for (let track of album.tracklist) {
    newTracks.push({
      addedBy: null,
      artist: {
        slug: album.artist[0].slug,
        title: album.artist[0].title
      },
      audioFile: track.audioFile[0].url,
      collection: {
        coverArtUrl: album.albumCoverArt[0].url,
        slug: album.slug,
        title: album.title,
        entryType: "album"
      },
      dateAdded: null,
      listType: "playlist",
      id: `album-${album.id}-${i}`,
      position: i,
      slug: track.song[0].slug,
      title: track.song[0].title
    });
    i++;
  }
  return newTracks;
}

// Default
// ----------------------------------------------------------------------------

export default function Album({ album }) {
  const { title, albumCoverArt, artist, tracklist } = album;

  return (
    <>
      <CollectionHeader title={album.title} />
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
            tracklist {
              ... on tracklist_BlockType {
                audioFile { url }
                song {
                  slug
                  title
                }
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
