import { useRouter } from "next/router";
import { gql } from "@apollo/client";
import client from "../../apollo-client";
import CollectionHeader from "../../components/CollectionHeader";
import PageTitle from "../../components/PageTitle";
import { querySlugs } from "../../helpers/query.helpers";

import DataRow from "../../components/DataRow";

// Default
// ----------------------------------------------------------------------------

export default function Album({ album }) {
  console.log(album);
  return (
    <>
      <Header title={album.title} />
      <section className="divide-y divide-subtle">
        <DataRow title="title" value={album.title} />
        <DataRow title="albumCoverArt" value={album.albumCoverArt[0].url} />
        <DataRow title="albumType" value={album.albumType} />
        <DataRow title="artist">
          <DataRow title="title" value={album.artist[0].title} />
          <DataRow title="slug" value={album.artist[0].slug} />
        </DataRow>
        <DataRow title="releaseDate" value={album.releaseDate} />
        <DataRow title="tracklist">
          <DataRow title="song" value={album.tracklist[0].song[0].slug} />
          {album.tracklist[0].audioFile.length && (
            <DataRow
              title="audioFile"
              value={album.tracklist[0].audioFile[0].url}
            />
          )}
        </DataRow>
      </section>
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
