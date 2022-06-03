import { useRouter } from "next/router";
import { gql } from "@apollo/client";
import client from "../../apollo-client";
import { CollectionHeader } from "../../components/Collections";
import CoverArt from "../../components/CoverArt";
import NiceDate from "../../components/NiceDate";
import PageHeader, { PageTitle } from "../../components/PageHeader";
import Tracklist from "../../components/Tracklist";
import { EPISODE } from "../../constants";
import { querySlugs } from "../../helpers";

// Functions
// ----------------------------------------------------------------------------

function normalizeEpisodeTracks(episode) {
  const newTracks = [];
  let i = 1;
  for (let track of episode.episodeTracklist) {
    newTracks.push({
      addedBy: null,
      artist: {
        slug: "/episodes",
        title: "This Evening's Show",
      },
      audioFile: track.audioFile.length ? track.audioFile[0].url : null,
      collection: {
        sectionHandle: episode.sectionHandle,
        slug: episode.slug,
        title: episode.title,
        uri: episode.uri,
        coverArt: episode.episodeCoverArt,
      },
      dateAdded: null,
      id: `episode-${episode.id}-${i}`,
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

export default function Episode({ episode }) {
  const { episodeCoverArt, releaseDate, title } = episode;

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
      <Tracklist tracks={normalizeEpisodeTracks(episode)} />
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
    `,
  });

  return {
    props: {
      episode: data.entry,
      navSection: "Episodes",
      PageTitle: data.entry.title,
    },
  };
}
