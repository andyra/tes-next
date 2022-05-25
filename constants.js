import { gql } from "@apollo/client";

// Contact
// ----------------------------------------------------------------------------

export const PHONE = "(325) 701-9997";
export const EMAIL = "tes.thiseveningsshow@gmail.com";
export const ADDRESS = {
  street: "905 N Mockingbird Lane",
  city: "Abilene",
  state: "TX",
  zip: "79601"
};

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
