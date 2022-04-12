import { gql, useLazyQuery } from "@apollo/client";
import ClientOnly from "../../components/ClientOnly";
import PageTitle from "../../components/PageTitle";

const GET_ALBUMS = gql`
  query Entries {
    entries(section: "albums") {
      slug
      title
      ... on albums_default_Entry {
        releaseDate
        artist {
          id
          title
        }
        albumType
        albumCoverArt {
          url
        }
      }
    }
  }
`;

const DelayedAlbums = () => {
  const [getAlbums, { loading, data }] = useLazyQuery(GET_ALBUMS);

  if (loading) return <p>Loading ...</p>;

  if (data && data.entries) {
    console.log(data.entries);
  }

  return (
    <div>
      <button onClick={() => getAlbums()}>
        Click me to print all entries!
      </button>
      {data &&
        data.entries &&
        data.entries.map((album, i) => <div key={i}>{album.title}</div>)}
    </div>
  );
};

export default function ClientSide() {
  return (
    <>
      <PageTitle>GraphQL Query onClick</PageTitle>
      <DelayedAlbums />
    </>
  );
}
