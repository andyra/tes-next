import { gql } from "@apollo/client";

export const PHONE = "(325) 701-9997";
export const EMAIL = "tes.thiseveningsshow@gmail.com";
export const ADDRESS = {
  street: "905 N Mockingbird Lane",
  city: "Abilene",
  state: "TX",
  zip: "79601",
};
export const PODCAST_LINKS = [
  {
    href: "https://tes.fm/feed.xml",
    icon: "Rss",
    title: "RSS",
  },
  {
    href: "https://itunes.apple.com/us/podcast/this-evenings-show/id958245203?mt=2",
    icon: "ApplePodcasts",
    title: "Apple Podcasts",
  },
  {
    href: "https://open.spotify.com/show/3wt4UxiB5KC4KFmAVFYwPA?si=l2GV6QFkTyyEK25_p7kutw",
    icon: "Spotify",
    title: "Spotify",
  },
];
export const DEFAULT_EPISODE_IMAGE =
  "https://tesfm.fra1.digitaloceanspaces.com/episodes/this-evenings-show.jpg";

// Queries
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
