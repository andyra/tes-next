import { useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import Button from "../../components/Button";
import ClientOnly from "../../components/ClientOnly";
import PageTitle from "../../components/PageTitle";

// Components
// ----------------------------------------------------------------------------

// https://www.apollographql.com/docs/react/v2/data/mutations/
// https://hasura.io/learn/graphql/nextjs-fullstack-serverless/mutations-variables/2-query-variables/
// https://www.apollographql.com/docs/react/data/mutations/

// TODO
// - Pass in authorId once we can figure that out
// - Return success message

const NEW_PLAYLIST = gql`
  mutation newPlaylist($title: String) {
    save_playlists_default_Entry(title: $title, authorId: 1) {
      title
    }
  }
`;

const NewPlaylist = () => {
  let input;
  const [newPlaylist, { data, loading, error }] = useMutation(NEW_PLAYLIST, {
    onCompleted(data) {
      console.log("COMPLETED!");
      console.log(data);
    }
  });
  const [title, setTitle] = useState("");

  if (loading) {
    return <mark>Loading...</mark>;
  }

  if (error) {
    console.error(error);
    return `Mutation error! ${error.message}`;
  }

  function handleSubmit(e) {
    e.preventDefault();
    newPlaylist({
      variables: {
        title: title
      }
    });
  }

  return (
    <form
      className="border p-24 rounded space-y-24"
      onSubmit={e => handleSubmit(e)}
    >
      <input
        id="title"
        className="border rounded block w-full p-8"
        type="text"
        name="title"
        onChange={e => setTitle(e.target.value)}
        ref={n => (input = n)}
        value={title}
        placeholder="Playlist Title"
      />
      <Button type="submit">Create Playlist</Button>
    </form>
  );
};

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
