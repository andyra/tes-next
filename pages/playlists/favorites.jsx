import { useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import Button from "../../components/Button";
import ClientOnly from "../../components/ClientOnly";
import PageTitle from "../../components/PageTitle";

// Components
// ----------------------------------------------------------------------------

const NEW_PLAYLIST = gql`
  mutation newPlaylist($title: String) {
    save_playlists_default_Entry(title: $title, authorId: 1) {
      title
    }
  }
`;

// https://www.apollographql.com/docs/react/v2/data/mutations/
// https://hasura.io/learn/graphql/nextjs-fullstack-serverless/mutations-variables/2-query-variables/

const NewPlaylist = () => {
  const [newPlaylist] = useMutation(NEW_PLAYLIST);
  let input;

  const [titleInput, setTitleInput] = useState("");

  return (
    <form
      className="border p-24 rounded space-y-24"
      onSubmit={e => {
        e.preventDefault();
        newPlaylist({ variables: { title: titleInput } });
        // input.value = "";
      }}
    >
      <input
        className="border rounded block w-full p-8"
        type="text"
        name="title"
        onChange={e => setTitleInput(e.target.value)}
        ref={n => (input = n)}
        value={titleInput}
        placeholder="Playlist Title"
      />
      <Button type="submit">Create Playlist</Button>
    </form>
  );
};

// Requires author ID

// const NewPlaylistForm = () => {
//   const [newPlaylist, { loading, data }] = useLazyQuery(NEW_PLAYLIST);

//   if (loading) {
//     return <mark>Loading...</mark>;
//   }

//   if (error) {
//     console.error(error);
//     return null;
//   }

//   if (data) {
//     console.log("I guess it worked?");
//     console.log(data);
//   }

//   return (
//     <form className="p-24 border rounded space-y-16">
//       <label for="title">Playlist Title</label>
//       <input
//         className="border rounded block w-full p-8"
//         type="text"
//         name="title"
//       />
//       <Button onClick={() => newPlaylist()}>Create Playlist</Button>
//     </form>
//   );
// };

// Default
// ----------------------------------------------------------------------------

export default function Favorites() {
  return (
    <>
      <PageTitle>Favorites</PageTitle>
      <ClientOnly>
        <NewPlaylist />
      </ClientOnly>
    </>
  );
}

// Config
// ----------------------------------------------------------------------------

export async function getStaticProps() {
  return {
    props: {
      pageTitle: "Favorites"
    }
  };
}
