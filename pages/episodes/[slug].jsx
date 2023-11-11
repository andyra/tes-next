import { gql } from "@apollo/client";
import client from "helpers/apollo-client";
import { CollectionHeader } from "components/Collections";
import Loader from "components/Loader";
import NiceDate from "components/NiceDate";
import PlayPauseButton from "components/PlayPauseButton";
import Tracklist from "components/Tracklist";
import {
  normalizeFullEpisode,
  normalizeTracklist,
  querySlugs,
} from "helpers/index";

// Page
// ----------------------------------------------------------------------------

export default function Episode({ coverPalette, episode }) {
  if (!episode) return <Loader />;
  const { description, episodeCoverArt, releaseDate } = episode;
  const normalizedTracks = normalizeTracklist({ collection: episode });
  const normalizedFullEpisode = normalizeFullEpisode(episode);

  return (
    <>
      <CollectionHeader collection={episode} coverPalette={coverPalette}>
        <NiceDate date={releaseDate} />
      </CollectionHeader>
      <section className="flex flex-col xs:flex-row items-center gap-16 py-16 border-y-2 xs:gap-24 xs:p-24 xs:rounded-lg xs:border-2">
        <div className="text-center">
          <PlayPauseButton
            className="hover:text-accent"
            size="xl"
            track={normalizedFullEpisode}
          />
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
    query: querySlugs("episodes"),
  });

  const paths = data.entries.map((entry) => ({
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
  const coverArtSrc = data.entry.episodeCoverArt[0].url;
  const coverPalette = await Vibrant.from(coverArtSrc)
    .getPalette()
    .then(function (palette) {
      return palette;
    });

  return {
    props: {
      coverPalette: JSON.stringify(coverPalette),
      episode: data.entry,
      metaTitle: data.entry.title,
      navSection: "Podcast",
    },
  };
}
