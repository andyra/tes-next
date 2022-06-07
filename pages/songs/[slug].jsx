import { useRouter } from "next/router";
import { gql } from "@apollo/client";
import client from "../../apollo-client";
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
  return track.song && track.song[0].slug === slug;
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

const ContentSection = ({ title, className, content }) => (
  <section className={className}>
    <h2
      className={`font-medium text-3xl mb-16${
        content ? "" : " text-primary-50"
      }`}
    >
      {title}
    </h2>
    {content ? (
      <div
        className="font-mono"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    ) : (
      <p className="text-lg text-primary-50">Nothing found in the archives.</p>
    )}
  </section>
);

// Default
// ----------------------------------------------------------------------------

export default function Song({ collections, song }) {
  const { lyrics, notation, slug, songType, title } = song;
  const relatedCollections = getRelatedCollections(slug, collections);
  const normalizedTracks = normalizeSongTracks(slug, relatedCollections);

  return (
    <>
      <PageHeader
        back={{ href: "/songs", title: "Songs" }}
        subtitle="A song called"
        title={title}
      >
        {songType === "cover" && (
          <div className="inline-block px-8 bg-primary-5 rounded-full font-sans font-medium text-sm uppercase tracking-wide mt-24 mx-auto">
            Cover Song
          </div>
        )}
      </PageHeader>

      <section>
        <h2 className="text-xl mb-12">
          Appears on {normalizedTracks.length} collections…
        </h2>
        <Tracklist tracks={normalizedTracks} showCollectionInfo />
      </section>

      {songType === "original" && (
        <>
          <hr className="border border-primary-10" />
          <ContentSection title="Lyrics" content={lyrics} />
          <ContentSection title="Notation" content={notation} />
        </>
      )}
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
            lyrics
            notation
            songType
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
