import { gql } from "@apollo/client";

// Query just the slugs of a Craft entry
// A clean way of building a GraphQL query to get a list of slugs for a section
// ----------------------------------------------------------------------------

export function querySlugs(section) {
  return gql`
    query Entries {
      entries(section: "${section}") {
        slug
      }
    }
  `;
}

// Get Info
// ----------------------------------------------------------------------------

export function articleHref(slug) {
  return `/library/${encodeURIComponent(slug)}`;
}

export function categoryHref(slug) {
  return `/library/category/${encodeURIComponent(slug)}`;
}

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
  const collectionType = collection.__typename.replace("_default_Entry", "");
  const singular = collectionType.slice(0, -1);
  return plural ? collectionType : singular;
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
  const { song, description, songTitle } = track;
  return song && song.length
    ? song[0].title
    : description && description.length
    ? description
    : songTitle && songTitle.length
    ? songTitle
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
        type: getCollectionType(episode),
        slug: episode.slug,
        title: episode.title,
        uri: `/${episode.uri}`,
        coverArt: getCollectionCoverArtUrl(episode)
      },
      dateAdded: null,
      id: `${getCollectionType(episode)}-${episode.slug}`,
      leadSheet: null,
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
      type: getCollectionType(collection),
      slug: collection.slug,
      title: collection.title,
      uri: `/${collection.uri}`,
      coverArt: getCollectionCoverArtUrl(collection)
    },
    dateAdded: null,
    id: `${getCollectionType(collection)}-${collection.slug}-${i}`,
    leadSheet: getSongInfo(track, "leadSheet"),
    notation: getSongInfo(track, "notation"),
    position: i,
    slug: getTrackSlug(track),
    title: getTrackTitle(track),
    type: getTrackType(track),
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
