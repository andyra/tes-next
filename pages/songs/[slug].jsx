import { useRouter } from "next/router";
import { gql } from "@apollo/client";
import client from "../../apollo-client";
import PageHeader from "../../components/PageHeader";
import Tracklist from "../../components/Tracklist";
import { querySlugs } from "../../helpers";

// Functions
// ----------------------------------------------------------------------------

function matchingTrack(track, slug) {
  return track.song && track.song[0].slug === slug;
}

function getRelatedAlbums(slug, albums) {
  const relatedAlbums = albums.filter(function(album) {
    // Remove all the tracks that don't match this song
    const filteredTracklist = album.albumTracklist.filter(function(track) {
      return matchingTrack(track, slug);
    });

    return filteredTracklist.length > 0;
  });

  return relatedAlbums;
}

function normalizeSongTracks(slug, albums) {
  const newTracks = [];
  let i = 1;

  for (let album of albums) {
    for (let track of album.albumTracklist) {
      if (matchingTrack(track, slug)) {
        newTracks.push({
          addedBy: null,
          artist: {
            slug:
              album.artist && album.artist.length ? album.artist[0].slug : null,
            title:
              album.artist && album.artist.length ? album.artist[0].title : null
          },
          audioFile:
            track.audioFile && track.audioFile.length
              ? track.audioFile[0].url
              : null,
          collection: {
            coverArt: album.albumCoverArt,
            slug: album.slug,
            title: album.title,
            entryType: "album"
          },
          dateAdded: null,
          // listType: "playlist",
          id: `album-${album.id}-${i}`,
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

export default function Song({ albums, episodes, song }) {
  const { lyrics, notation, slug, songType, title } = song;
  const relatedAlbums = getRelatedAlbums(slug, albums);
  const normalizedTracks = normalizeSongTracks(slug, relatedAlbums);

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
        albums: entries(section: "albums") {
          title
          slug
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
        }
        episodes: entries(section: "episodes") {
          title
          slug
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
      albums: data.albums,
      episodes: data.episodes,
      spacing: true
    }
  };
}
