import { gql } from "@apollo/client";
import Moment from "moment";

export function formatTime(time) {
  const t = Moment.duration(time, "seconds");
  const { hours, minutes, seconds } = t._data;

  const h = hours > 0 ? `${hours}:` : "";
  const m = minutes > 0 ? `${minutes}:` : "0:";
  const s = seconds > 9 ? seconds : `0${seconds}`;

  return `${h}${m}${s}`;
}

export function debounce(callback, wait) {
  let timeoutId = null;
  return (...args) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      callback.apply(null, args);
    }, wait);
  };
}

// A clean way of building a GraphQL query to get a list of slugs for a section
export function querySlugs(section) {
  return gql`
    query Entries {
      entries(section: "${section}") {
        slug
      }
    }
  `;
}

// Turns the Craft sectionHandle into something more usable
// ex: "albums_default_Entry" → "album"
export function getCollectionType(collection, plural = false) {
  const sectionHandle = collection.__typename.replace("_default_Entry", "");
  const singular = sectionHandle.slice(0, -1);
  return plural ? sectionHandle : singular;
}

// Turns the Craft Matrix blocktype into something more usable
// ex: "albumTracklist_song_BlockType" → "song"
export function getTrackType(track) {
  const typeName = track.__typename;
  return typeName.substring(
    typeName.indexOf("_") + 1,
    typeName.lastIndexOf("_")
  );
}

export function getArtistInfo(collection, prop) {
  return collection.artist && collection.artist.length
    ? collection.artist[0][prop]
    : null;
}

export function getTrackAudioFileUrl(track) {
  return track.audioFile && track.audioFile.length
    ? track.audioFile[0].url
    : null;
}

export function getTrackSlug(track) {
  return track.song && track.song.length ? track.song[0].slug : null;
}

export function getTrackLink(track) {
  return track.song && track.song.length ? track.song[0].uri : null;
}

export function getCollectionCoverArtUrl(collection) {
  const collectionType = getCollectionType(collection);
  return collection[`${collectionType}CoverArt`] &&
    collection[`${collectionType}CoverArt`].length
    ? collection[`${collectionType}CoverArt`][0].url
    : null;
}

export function getTrackTitle(track) {
  return track.song && track.song.length
    ? track.song[0].title
    : track.description && track.description.length
    ? track.description
    : null;
}

export function normalizeTrack(collection, track, i) {
  return {
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
  };
}

export function normalizeCollectionTracks(collection, condition = true) {
  const collectionType = getCollectionType(collection);
  const newTracks = [];
  let i = 1;

  for (let track of collection[`${collectionType}Tracklist`]) {
    if (condition) {
      newTracks.push(normalizeTrack(collection, track, i));
      i++;
    }
  }
  return newTracks;
}

// https://bost.ocks.org/mike/shuffle/
export function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex]
    ];
  }

  return array;
}
