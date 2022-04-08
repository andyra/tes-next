import { useRouter } from "next/router";
import { gql } from "@apollo/client";
import client from "../../apollo-client";
import PageTitle from "../../components/PageTitle";
import { EPISODE } from "../../constants";
import { querySlugs } from "../../helpers/query.helpers";

import DataRow from "../../components/DataRow";

// Default
// ----------------------------------------------------------------------------

export default function Episode({ episode }) {
  return (
    <>
      <PageTitle>Episode</PageTitle>
      <section className="divide-y">
        <DataRow title="title" value={episode.title} />
        <DataRow title="description" value={episode.description} />
        <DataRow title="releaseDate" value={episode.releaseDate} />
        <DataRow title="episodeAudio" value={episode.episodeAudio[0].url} />
        <DataRow
          title="episodeCoverArt"
          value={episode.episodeCoverArt[0].url}
        />
        <DataRow title="companionAlbum">
          <DataRow
            child
            title="title"
            value={episode.companionAlbum[0].title}
          />
          <DataRow child title="slug" value={episode.companionAlbum[0].slug} />
          <DataRow
            child
            title="albumCoverArt"
            value={episode.companionAlbum[0].albumCoverArt[0].url}
          />
        </DataRow>
      </section>
    </>
  );
}

// Paths
// -----------------------------------------------------------------------------

export async function getStaticPaths() {
  const { data } = await client.query({
    query: querySlugs("episodes")
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
        entry(section: "episodes", slug: "${params.slug}") {
          title
          ... on episodes_default_Entry {
            description
            releaseDate
            episodeAudio { url }
            episodeCoverArt { url }
            companionAlbum {
              slug
              title
              ... on albums_default_Entry {
                albumCoverArt { url }
              }
            }
          }
        }
      }
    `
  });

  return {
    props: {
      episode: data.entry
    }
  };
}
