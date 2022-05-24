import { useRouter } from "next/router";
import { gql } from "@apollo/client";
import client from "../../apollo-client";
import CoverArt from "../../components/CoverArt";
import NiceDate from "../../components/NiceDate";
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
    newTracks.push({
      addedBy: null,
      artist: {
        slug: "/episodes",
        title: "This Evening's Show"
      },
      audioFile: track.audioFile.length ? track.audioFile[0].url : null,
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

export default function Episode({ episode }) {
  console.log(episode.episodeTracklist);
  const { episodeCoverArt, releaseDate, title } = episode;

  return (
    <>
      <header className="flex flex-col lg:flex-row lg:items-end gap-24 mb-48">
        <CoverArt
          src={episodeCoverArt}
          className="mx-auto md:mx-0 w-256 h-256"
          title={title}
          width={256}
          height={256}
        />
        <hgroup className="flex flex-col gap-12">
          <h1 className="font-serif font-medium text-3xl md:text-6xl">
            {title}
          </h1>
          <div>
            <NiceDate date={releaseDate} format="year" /> • Duration
          </div>
        </hgroup>
      </header>
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
              ... on episodeTracklist_song_BlockType {
                song {
                  slug
                  title
                }
                audioFile { url }
              }
              ... on episodeTracklist_segment_BlockType {
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
      episode: data.entry,
      navSection: "Episodes",
      pageTitle: data.entry.title
    }
  };
}
