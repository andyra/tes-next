import { gql } from "@apollo/client";
import client from "../../apollo-client";
import { CollectionHeader } from "components/Collections";
import CoverArt from "components/CoverArt";
import NiceDate from "components/NiceDate";
import PageHeader, { PageTitle } from "components/PageHeader";
import PlayPauseButton from "components/PlayPauseButton";
import Tracklist from "components/Tracklist";
import { EPISODE } from "../../constants";
import {
  normalizeFullEpisode,
  normalizeTracklist,
  querySlugs
} from "helpers/index";

// Default
// ----------------------------------------------------------------------------

export default function Episode({ episode }) {
  const { description, episodeCoverArt, releaseDate, title } = episode;
  const normalizedTracks = normalizeTracklist({ collection: episode });
  const normalizedFullEpisode = normalizeFullEpisode(episode);

  return (
    <>
      <CollectionHeader collection={episode}>
        <NiceDate date={releaseDate} />
      </CollectionHeader>
      <section className="flex flex-col md:flex-row items-center gap-24 p-24 rounded-lg border-2">
        <div className="text-center">
          <PlayPauseButton
            className="hover:text-accent"
            size="xl"
            track={normalizedFullEpisode}
          />
          <div className="mt-8 text-secondary-50">Listen</div>
        </div>
        <p className="flex-1 text-xl">{description}</p>
      </section>
      <Tracklist tracks={normalizedTracks} showTrackType />
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
          slug
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
              ... on episodeTracklist_coverSong_BlockType {
                songTitle
                audioFile {
                  url
                }
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
      metaTitle: data.entry.title,
      navSection: "Podcast"
    }
  };
}
