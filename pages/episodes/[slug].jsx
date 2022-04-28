import { useRouter } from "next/router";
import { gql } from "@apollo/client";
import client from "../../apollo-client";
import PageTitle from "../../components/PageTitle";
import Tracklist from "../../components/Tracklist";
import { EPISODE } from "../../constants";
import { querySlugs } from "../../helpers/query.helpers";

import DataRow from "../../components/DataRow";

// Functions
// ----------------------------------------------------------------------------

function normalizeEpisodeTracks(episode) {
  const newTracks = [];
  let i = 1;

  for (let track of episode.episodeTracklist) {
    const title = track.song.length ? track.song[0].title : track.segment;
    const slug = track.song.length ? track.song[0].slug : null;
    const audioFile = track.audioFile.length ? track.audioFile[0].url : null;

    newTracks.push({
      addedBy: null,
      artist: {
        slug: "/episodes",
        title: "This Evening's Show"
      },
      audioFile: audioFile,
      collection: {
        coverArtUrl: episode.episodeCoverArt[0].url,
        slug: episode.slug,
        title: episode.title,
        entryType: "episode"
      },
      dateAdded: null,
      listType: "playlist",
      id: `episode-${episode.id}-${i}`,
      position: i,
      slug: slug,
      title: title
    });
    i++;
  }
  return newTracks;
}

// Default
// ----------------------------------------------------------------------------

export default function Episode({ episode }) {
  console.log(episode);
  const { title } = episode;

  return (
    <>
      <PageTitle>{title}</PageTitle>
      <Tracklist tracks={normalizeEpisodeTracks(episode)} />

      {/*<section className="divide-y divide-subtle">
        <DataRow title="title" value={episode.title} />
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
        <DataRow title="description" value={episode.description} />
        <DataRow title="episodeAudio" value={episode.episodeAudio[0].url} />
        <DataRow
          title="episodeCoverArt"
          value={episode.episodeCoverArt[0].url}
        />
        <DataRow title="releaseDate" value={episode.releaseDate} />
        <DataRow title="minutes" value={<mark>TODO</mark>} />
      </section>*/}
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
              ... on episodeTracklist_BlockType {
                audioFile { url }
                segment
                song {
                  slug
                  title
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
      navSection: "Episodes",
      pageTitle: data.entry.title
    }
  };
}
