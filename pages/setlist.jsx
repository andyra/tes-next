import { gql } from "@apollo/client";
import client from "../apollo-client";
import Button from "../components/Button";
import Icon from "../components/Icon";
import Input from "../components/Input";
import PageHeader, { PageTitle } from "../components/PageHeader";
import {
  getArtistInfo,
  getCollectionCoverArtUrl,
  getCollectionType,
  getTrackAudioFileUrl,
  getTrackSlug,
  getTrackTitle,
  getTrackType
} from "../helpers/";

// Functions
// ----------------------------------------------------------------------------

function isSongHasAudio(track) {
  return track.song && track.song.length && track.audioFile.length;
}

function normalizeSetlistTracks(collections) {
  const newTracks = [];
  let i = 1;

  for (let collection of collections) {
    const collectionType = getCollectionType(collection);
    const tracklist = collection[`${collectionType}Tracklist`];

    for (let track of tracklist) {
      if (isSongHasAudio(track)) {
        newTracks.push({
          addedBy: null,
          artist: {
            slug: getArtistInfo(collection, "slug"),
            title: getArtistInfo(collection, "title")
          },
          audioFile: getTrackAudioFileUrl(track),
          collection: {
            sectionHandle: collection.sectionHandle,
            slug: collection.slug,
            title: collection.title,
            uri: collection.uri,
            coverArt: getCollectionCoverArtUrl(collection)
          },
          dateAdded: null,
          id: `${collection.sectionHandle}-${collection.slug}-${i}`,
          position: i,
          slug: getTrackSlug(track),
          title: getTrackTitle(track)
        });
        i++;
      }
    }
  }
  return newTracks;
}

// Components
// ----------------------------------------------------------------------------

const Computor = () => {
  const LABEL_CLASSES =
    "inline-block px-8 text-primary-50 bg-ground absolute z-10 top-0 left-1/2 transform -translate-y-1/2 -translate-x-1/2 text-sm";

  return (
    <section className="p-16 rounded-lg border-2 border-primary-10 text-center">
      <h1 className="font-funky text-4xl mb-16">Setlist Computor</h1>
      <form className="flex items-center gap-16">
        <Input
          label="Songs"
          labelClassName={LABEL_CLASSES}
          inputClassName="text-center"
          name="songs"
          type="number"
          defaultValue={10}
        />
        <Input
          label="Bleeds"
          labelClassName={LABEL_CLASSES}
          inputClassName="text-center"
          name="bleeds"
          type="number"
          defaultValue={10}
        />
        <Input
          label="Strategies"
          labelClassName={LABEL_CLASSES}
          inputClassName="text-center"
          name="strategies"
          type="number"
          defaultValue={10}
        />
        <Button type="submit">Compute</Button>
      </form>
    </section>
  );
};

const SetlistItem = ({ title, bleed, strategy }) => (
  <li className="relative py-8">
    <div className="text-3xl font-medium">{title}</div>
    {strategy && <div className="opacity-50">{strategy}</div>}
    {bleed && (
      <span className="h-24 px-8 border border-accent-25 text-accent text-sm rounded-full inline-flex gap-4 items-center justify-center transform translate-y-1/3">
        <Icon name="ArrowDown" />
        Bleed
      </span>
    )}
  </li>
);

const SetlistItems = () => {
  return (
    <ol className="list-decimal">
      <SetlistItem title="Penguins, Anonymous" />
      <SetlistItem title="Fermerly Inc" bleed />
      <SetlistItem title="Fermerly Inc" />
      <SetlistItem title="Fermerly Inc" />
      <SetlistItem
        title="Walnuts are no good"
        bleed
        strategy="Play like you've never played before"
      />
      <SetlistItem
        title="Family Business"
        strategy="Play like you've never played before"
      />
    </ol>
  );
};

// Default
// ----------------------------------------------------------------------------

export default function Setlist({ collections }) {
  const normalizedSetlistTracks = normalizeSetlistTracks(collections);
  console.log(normalizedSetlistTracks);

  return (
    <>
      <Computor />
      <SetlistItems />
    </>
  );
}

// Config
// ----------------------------------------------------------------------------

export async function getStaticProps(context) {
  const { params } = context;
  const { data } = await client.query({
    query: gql`
      query Entry {
        collections: entries(section: ["albums", "episodes"]) {
          sectionHandle
          slug
          title
          uri
          ... on albums_default_Entry {
            albumCoverArt {
              url
            }
            albumTracklist {
              ... on albumTracklist_song_BlockType {
                song {
                  slug
                  title
                }
                audioFile {
                  url
                }
              }
            }
            artist {
              slug
              title
            }
            releaseDate
          }
          ... on episodes_default_Entry {
            episodeCoverArt {
              url
            }
            releaseDate
            episodeTracklist {
              ... on episodeTracklist_song_BlockType {
                song {
                  slug
                  title
                }
                audioFile {
                  url
                }
              }
            }
          }
        }
      }
    `
  });

  return {
    props: {
      PageTitle: "Setlist Computor",
      collections: data.collections,
      spacing: true
    }
  };
}
