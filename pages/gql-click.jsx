import { gql, useLazyQuery } from "@apollo/client";
import ClientOnly from "../components/ClientOnly";
import PageTitle from "../components/PageTitle";

function querySearch(searchTerm) {
  return gql`
    query Entries {
      entries(section: "albums", search: "${searchTerm}") {
        title
      }
    }
  `;
}

const GET_ALBUMS = gql`
  query Entries {
    entries(section: "albums") {
      title
    }
  }
`;

const DelayedAlbums = () => {
  const [getAlbums, { loading, data }] = useLazyQuery(querySearch("golden"));

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
