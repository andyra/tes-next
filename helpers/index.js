import { gql } from "@apollo/client";
import Moment from "moment";

// General
// ----------------------------------------------------------------------------

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

// Get Info
// ----------------------------------------------------------------------------

export function getArtistInfo(collection, prop) {
  return collection.artist && collection.artist.length
    ? collection.artist[0][prop]
    : null;
}

export function getCollectionCoverArtUrl(collection) {
  const collectionType = getCollectionType(collection);
  return collection[`${collectionType}CoverArt`] &&
    collection[`${collectionType}CoverArt`].length
    ? collection[`${collectionType}CoverArt`][0].url
    : null;
}

// Turns the Craft sectionHandle into something more usable
// ex: "albums_default_Entry" → "album"
export function getCollectionType(collection, plural = false) {
  const sectionHandle = collection.__typename.replace("_default_Entry", "");
  const singular = sectionHandle.slice(0, -1);
  return plural ? sectionHandle : singular;
}

export function getEpisodeAudioFileUrl(episode) {
  const { episodeAudio } = episode;
  return episodeAudio && episodeAudio.length ? episodeAudio[0].url : null;
}

export function getSongInfo(track, field) {
  const { song } = track;
  return song && song.length && song[0][field] ? song[0][field] : null;
}

export function getTrackAudioFileUrl(track) {
  return track.audioFile && track.audioFile.length
    ? track.audioFile[0].url
    : null;
}

export function getTrackSlug(track) {
  return track.song && track.song.length ? track.song[0].slug : null;
}

export function getTrackTitle(track) {
  const { song, description } = track;
  return song && song.length
    ? song[0].title
    : description && description.length
    ? description
    : null;
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

export function getTrackUri(track) {
  return track.song && track.song.length ? track.song[0].uri : null;
}

// Normalize Craft Entries
// Gets data in a regular format for use in Player, Tracklists, etc.
// ----------------------------------------------------------------------------

// Pass in an episode object and get back a playable track

export function normalizeFullEpisode(episode) {
  const audioFileUrl = getEpisodeAudioFileUrl(episode);
  if (audioFileUrl) {
    return {
      addedBy: null,
      artist: {
        slug: null,
        title: null
      },
      audioFile: audioFileUrl,
      collection: {
        sectionHandle: episode.sectionHandle,
        slug: episode.slug,
        title: episode.title,
        uri: episode.uri,
        coverArt: getCollectionCoverArtUrl(episode)
      },
      dateAdded: null,
      id: `${episode.sectionHandle}-${episode.slug}`,
      lyrics: null,
      notation: null,
      position: null,
      slug: episode.slug,
      title: episode.title,
      uri: episode.uri
    };
  }
  console.error("Episode doesn't have an audio file for the full episode");
  return null;
}

// Pass in a track from a collection's tracklist and get back an object that
// can be represented anywhere on the site.
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
    lyrics: getSongInfo(track, "lyrics"),
    notation: getSongInfo(track, "notation"),
    position: i,
    slug: getTrackSlug(track),
    title: getTrackTitle(track),
    uri: getTrackUri(track)
  };
}

// Pass in a tracklist from a collection and get back an array of normalized
// tracks. Pass in `playableOnly` if you only want tracks with audio
export function normalizeTracklist({ collection, playableOnly } = {}) {
  const collectionType = getCollectionType(collection);
  const normalizedTracks = [];
  let i = 1;

  for (let track of collection[`${collectionType}Tracklist`]) {
    normalizedTracks.push(normalizeTrack(collection, track, i));
    i++;
  }

  if (playableOnly) {
    return normalizedTracks.filter(function(track) {
      return track.audioFile;
    });
  }

  return normalizedTracks;
}

export function normalizeCollections({ collections, playableOnly } = {}) {
  let normalizedTracks = [];

  for (let collection of collections) {
    const tracks = normalizeTracklist({
      collection: collection,
      playableOnly: playableOnly
    });
    for (let track of tracks) {
      normalizedTracks.push(track);
    }
  }

  return normalizedTracks;
}
