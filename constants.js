import { gql } from "@apollo/client";

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

export const PLAYLISTS = gql`
  query Entries {
    entries(section: "playlists") {
      id
      slug
      title
      typeId
    }
  }
`;

export const FAVORITES = gql`
  query Entries {
    entries(section: "playlists", type: "favorites") {
      id
      slug
      title
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

export const VIDEOS = gql`
  query Entries {
    entries(section: "videos") {
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

export const ITEMS_TEST = [
  {
    track: {
      id: 1,
      title: "Gabriel's Friendship Gang",
      url: "https://example.com/1",
      album: 1,
      artist: "Artist Name"
    },
    position: 1,
    listType: "tracklist"
  },
  {
    track: {
      id: 2,
      title: "Matt Slime",
      url: "https://example.com/2",
      album: 2,
      artist: "Artist Name"
    },
    position: 2,
    listType: "tracklist"
  },
  {
    track: {
      id: 3,
      title: "Capestrano",
      url: "https://example.com/3",
      album: 3,
      artist: "Artist Name"
    },
    position: 3,
    listType: "tracklist"
  },
  {
    track: {
      id: 4,
      title: "Napoleon",
      url: "https://example.com/4",
      album: 4,
      artist: "Artist Name"
    },
    position: 4,
    listType: "tracklist"
  },
  {
    track: {
      id: 5,
      title: "Linda I Miss You",
      url: "https://example.com/5",
      album: 5,
      artist: "Artist Name"
    },
    position: 5,
    listType: "tracklist"
  },
  {
    track: {
      id: 1,
      title: "Gabriel's Friendship Gang",
      url: "https://example.com/1",
      album: 1,
      artist: "Artist Name"
    },
    position: 6,
    listType: "tracklist"
  },
  {
    track: {
      id: 2,
      title: "Matt Slime",
      url: "https://example.com/2",
      album: 2,
      artist: "Artist Name"
    },
    position: 7,
    listType: "tracklist"
  },
  {
    track: {
      id: 3,
      title: "Capestrano",
      url: "https://example.com/3",
      album: 3,
      artist: "Artist Name"
    },
    position: 8,
    listType: "tracklist"
  },
  {
    track: {
      id: 1,
      title: "Gabriel's Friendship Gang",
      url: "https://example.com/1",
      album: 1,
      artist: "Artist Name"
    },
    position: 9,
    listType: "tracklist"
  },
  {
    track: {
      id: 2,
      title: "Matt Slime",
      url: "https://example.com/2",
      album: 2,
      artist: "Artist Name"
    },
    position: 10,
    listType: "tracklist"
  },
  {
    track: {
      id: 3,
      title: "Capestrano",
      url: "https://example.com/3",
      album: 3,
      artist: "Artist Name"
    },
    position: 11,
    listType: "tracklist"
  }
];
