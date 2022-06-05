import { useRouter } from "next/router";
import { gql } from "@apollo/client";
import client from "../../apollo-client";
import { CollectionHeader } from "../../components/Collections";
import CoverArt from "../../components/CoverArt";
import NiceDate from "../../components/NiceDate";
import PageHeader, { PageTitle } from "../../components/PageHeader";
import Tracklist from "../../components/Tracklist";
import { EPISODE } from "../../constants";
import { normalizeCollectionTracks, querySlugs } from "../../helpers";

// Default
// ----------------------------------------------------------------------------

export default function Episode({ episode }) {
  const { episodeCoverArt, releaseDate, title } = episode;
  const normalizedTracks = normalizeCollectionTracks(episode);

  return (
    <>
      <CollectionHeader
        title={title}
        coverArt={episodeCoverArt}
        back={{ href: "/episodes", title: "Episodes" }}
      >
        <div>
          <NiceDate date={releaseDate} /> • Duration
        </div>
      </CollectionHeader>
      <Tracklist tracks={normalizedTracks} />
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
          sectionHandle
          title
          uri
          ... on episodes_default_Entry {
            companionAlbum {
              slug
              title
              ... on albums_default_Entry {
                albumCoverArt { url }
              }
            }
            description
            episodeAudio { url }
            episodeCoverArt { url }
            episodeTracklist {
              ... on episodeTracklist_song_BlockType {
                song {
                  slug
                  title
                  uri
                }
                audioFile { url }
              }
              ... on episodeTracklist_segment_BlockType {
                description
                audioFile { url }
              }
            }
            releaseDate
          }
        }
      }
    `
  });

  return {
    props: {
      episode: data.entry,
      navSection: "Episodes",
      PageTitle: data.entry.title
    }
  };
}
