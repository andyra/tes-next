import { useRouter } from "next/router";
import Image from "next/image";
import { gql } from "@apollo/client";
import cn from "classnames";
import client from "../../apollo-client";
import LeadSheet from "../../components/LeadSheet";
import PageHeader from "../../components/PageHeader";
import Tracklist from "../../components/Tracklist";
import {
  getArtistInfo,
  getCollectionCoverArtUrl,
  getCollectionType,
  getTrackAudioFileUrl,
  getTrackSlug,
  getTrackTitle,
  getTrackType,
  querySlugs,
  normalizeTrack
} from "../../helpers/";

// Functions
// ----------------------------------------------------------------------------

function matchingTrack(track, slug) {
  return track.song && track.song.length > 0 && track.song[0].slug === slug;
}

function getRelatedCollections(slug, collections) {
  const relatedCollections = collections.filter(function(collection) {
    let filteredTracklist = [];

    // Remove all the tracks that don't match this song
    if (collection.albumTracklist) {
      filteredTracklist = collection.albumTracklist.filter(function(track) {
        return matchingTrack(track, slug);
      });
    }

    if (collection.episodeTracklist) {
      filteredTracklist = collection.episodeTracklist.filter(function(track) {
        return matchingTrack(track, slug);
      });
    }

    return filteredTracklist.length > 0;
  });

  return relatedCollections;
}

function normalizeSongTracks(slug, collections) {
  const newTracks = [];
  let i = 1;

  for (let collection of collections) {
    const collectionType = getCollectionType(collection);
    const tracklist = collection[`${collectionType}Tracklist`];

    for (let track of tracklist) {
      if (matchingTrack(track, slug)) {
        newTracks.push(normalizeTrack(collection, track, i));
        i++;
      }
    }
  }
  return newTracks;
}

// Components
// ----------------------------------------------------------------------------

const ContentSection = ({
  children,
  className,
  emptyMessage,
  enabled,
  title
}) => {
  const headingClasses = cn({
    "font-medium text-3xl mb-16": true,
    "text-primary-50": !enabled
  });

  return (
    <section className={className}>
      <h2 className={headingClasses}>{title}</h2>
      {enabled ? (
        children
      ) : (
        <p className="text-lg text-primary-25">{emptyMessage}</p>
      )}
    </section>
  );
};

// Default
// ----------------------------------------------------------------------------

export default function Song({ collections, song }) {
  const { leadSheet, notation, slug, title } = song;
  const relatedCollections = getRelatedCollections(slug, collections);
  const normalizedTracks = normalizeSongTracks(slug, relatedCollections);
  const hasTracks = normalizedTracks.length > 0;

  return (
    <>
      <PageHeader
        back={{ href: "/songs", title: "Songs" }}
        className="print:hidden"
        subtitle="A song called"
        title={title}
      />

      <ContentSection
        className="print:hidden"
        enabled={hasTracks}
        emptyMessage="Not (yet) on any collections"
        title="Appears On…"
      >
        <Tracklist tracks={normalizedTracks} showCollectionInfo />
      </ContentSection>

      <ContentSection
        enabled={leadSheet}
        emptyMessage="Notation reamins to be written"
        title="Lead Sheet"
      >
        <LeadSheet song={song} />
      </ContentSection>
    </>
  );
}

// Paths
// ----------------------------------------------------------------------------

export async function getStaticPaths() {
  const { data } = await client.query({
    query: querySlugs("songs")
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
        entry(section: "songs", slug: "${params.slug}") {
          title
          slug
          ... on songs_default_Entry {
            leadSheet
            notation {
              height
              url
              width
            }
          }
        }
        collections: entries(section: ["albums", "episodes"]) {
          slug
          title
          uri
          ... on albums_default_Entry {
            albumCoverArt { url }
            releaseDate
            albumTracklist {
              ... on albumTracklist_song_BlockType {
                song {
                  slug
                  title
                }
                audioFile { url }
              }
            }
          }
          ... on episodes_default_Entry {
            episodeCoverArt { url }
            releaseDate
            episodeTracklist {
              ... on episodeTracklist_song_BlockType {
                song {
                  slug
                  title
                }
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
      navSection: "Music",
      PageTitle: data.entry.title,
      song: data.entry,
      collections: data.collections,
      spacing: true
    }
  };
}
