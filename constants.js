import { gql } from "@apollo/client";

export const PHONE = "(325) 701-9997";
export const EMAIL = "tes.thiseveningsshow@gmail.com";
export const ADDRESS = {
  street: "905 N Mockingbird Lane",
  city: "Abilene",
  state: "TX",
  zip: "79601"
};

// Playlists
// ----------------------------------------------------------------------------

export const PLAYLISTS_QUERY = gql`
  query Entries {
    entries(section: "playlists") {
      id
      slug
      title
      typeId
    }
  }
`;

export const PLAYLIST_SLUGS = gql`
  query Entries {
    entries(section: "playlists") {
      slug
    }
  }
`;

// Favorites
// ----------------------------------------------------------------------------

export const FAVORITES = gql`
  query Entries {
    entries(section: "playlists", type: "favorites") {
      id
      slug
      title
    }
  }
`;

export const FAVORITE_SLUGS = gql`
  query Entries {
    entries(section: "favorites") {
      slug
    }
  }
`;

// Songs
// ----------------------------------------------------------------------------

export const SONG_SLUGS = gql`
  query Entries {
    entries(section: "songs") {
      slug
    }
  }
`;

// Videos
// ----------------------------------------------------------------------------

export const VIDEOS = gql`
  query Entries {
    entries(section: "videos") {
      id
      slug
      title
    }
  }
`;

export const VIDEO_SLUGS = gql`
  query Entries {
    entries(section: "videos") {
      slug
    }
  }
`;
