import { useQuery, gql } from "@apollo/client";
import Empty from "./Empty";

const QUERY = gql`
  query Entries {
    entries(section: "albums") {
      id
      status
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
          id
          status
          title
          slug
          uri
          filename
          kind
          size
        }
        tracklist {
          ... on tracklist_BlockType {
            song {
              id
            }
            audioFile {
              id
              status
              title
              slug
              uri
              filename
              kind
              size
            }
          }
        }
      }
    }
  }
`;

export default function Albums() {
  const { data, loading, error } = useQuery(QUERY);

  if (loading) {
    return <mark>Loading...</mark>;
  }

  if (error) {
    console.error(error);
    return null;
  }

  const albums = data.entries;

  return albums ? (
    <ul>
      {albums.map((album) => (
        <li className="flex items-center gap-8" key={album.title}>
          {album.title}
        </li>
      ))}
    </ul>
  ) : (
    <Empty>Ain't no albums</Empty>
  );
}
