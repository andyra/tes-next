import { gql } from "@apollo/client";

export const EPISODES = gql`
  query Entries {
    entries(section: "episodes") {
      id
      slug
      title
      ... on episodes_default_Entry {
        releaseDate
        episodeCoverArt {
          filename
        }
      }
    }
  }
`;

export const ALBUMS = gql`
  query Entries {
    entries(section: "albums") {
      id
      slug
      title
      ... on albums_default_Entry {
        releaseDate
        artist {
          id
          title
          slug
        }
        albumType
        albumCoverArt {
          filename
        }
      }
    }
  }
`;

export const SONGS = gql`
  query Entries {
    entries(section: "songs") {
      id
      slug
      title
    }
  }
`;

export const WIKIS = gql`
  query Entries {
    entries(section: "wiki") {
      id
      slug
      title
    }
  }
`;
