import { useState } from "react";
import { useRouter } from "next/router";
import { gql, useMutation } from "@apollo/client";
import client from "../../apollo-client";
import toast from "react-hot-toast";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import PageTitle from "../../components/PageTitle";
import { querySlugs } from "../../helpers/query.helpers";
import { PLAYLISTS_QUERY } from "../../constants";

import DataRow from "../../components/DataRow";

// Components
// ----------------------------------------------------------------------------

// TODO
// Working, but the slug needs to be updated (or turned into an ID)
// Refresh page title

const RenamePlaylistButton = ({ defaultTitle, id }) => {
  let input;
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [title, setTitle] = useState(defaultTitle);

  const RENAME_PLAYLIST_MUTATION = gql`
    mutation renamePlaylist($title: String, $id: ID) {
      save_playlists_default_Entry(title: $title, id: $id) {
        id
        title
      }
    }
  `;

  const [renamePlaylist, { data, loading, error }] = useMutation(
    RENAME_PLAYLIST_MUTATION,
    {
      refetchQueries: [{ query: PLAYLISTS_QUERY }],
      onCompleted(data) {
        toast.success("Renamed playlist");
        loading = false;
        closeModal();
      }
    }
  );

  function handleSubmit(e) {
    e.preventDefault();
    renamePlaylist({
      variables: {
        id: id,
        title: title
      }
    });
  }

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  return (
    <>
      <Button onClick={openModal}>Rename</Button>
      <Modal
        closeModal={closeModal}
        isOpen={modalIsOpen}
        title="Rename Playlist"
      >
        <form className="space-y-24" onSubmit={e => handleSubmit(e)}>
          <label htmlFor="title" className="sr-only">
            Playlist Title
          </label>
          <input
            className="border rounded block w-full p-8"
            id="title"
            name="title"
            onChange={e => setTitle(e.target.value)}
            placeholder="Title"
            ref={n => (input = n)}
            type="text"
            value={title}
          />
          {error && (
            <div className="text-red-500">Mutation error! {error.message}</div>
          )}
          <Button type="submit">{loading ? "Saving…" : "Save"}</Button>
        </form>
      </Modal>
    </>
  );
};

const DeletePlaylistButton = ({ id }) => {
  const router = useRouter();

  const DELETE_PLAYLIST_MUTATION = gql`
    mutation deletePlaylist($id: Int!) {
      deleteEntry(id: $id)
    }
  `;

  const [deletePlaylist, { data, loading, error }] = useMutation(
    DELETE_PLAYLIST_MUTATION,
    {
      refetchQueries: [{ query: PLAYLISTS_QUERY }],
      onCompleted(data) {
        loading = false;
        toast.success("Deleted playlist");
        router.replace("/"); // redirect to home via Next.js
      }
    }
  );

  if (error) {
    toast(`Mutation error! ${error.message}`);
  }

  function handleDelete(id) {
    deletePlaylist({
      variables: {
        id: parseInt(id)
      }
    });
  }

  return (
    <Button
      onClick={() => {
        handleDelete(id);
      }}
    >
      {loading ? "..." : "Delete"}
    </Button>
  );
};

// Default
// ----------------------------------------------------------------------------

export default function Playlist({ playlist }) {
  return (
    <>
      <PageTitle
        actions={
          <>
            <RenamePlaylistButton
              id={playlist.id}
              defaultTitle={playlist.title}
            />
            <DeletePlaylistButton id={playlist.id} />
          </>
        }
      >
        {playlist.title}
      </PageTitle>
      <section className="divide-y divide-subtle">
        <DataRow title="title" value={playlist.title} />
        <DataRow title="private" value={`${playlist.private}`} />
        <DataRow title="author" value={playlist.author.username} />
        <DataRow title="length" value={playlist.playlist.length} />
        {/*<DataRow title="playlist">
          {playlist.playlist[0].addedBy && (
            <DataRow
              title="└ addedBy"
              value={playlist.playlist[0].addedBy[0].username}
            />
          )}
          <DataRow
            title="└ album title"
            value={playlist.playlist[0].album[0].title}
          />
          <DataRow
            title="└ albumCoverArt"
            value={playlist.playlist[0].album[0].albumCoverArt[0].url}
          />
          <DataRow
            title="└ album artist"
            value={playlist.playlist[0].album[0].artist[0].title}
          />
          <DataRow title="└ dateAdded" value={playlist.playlist[0].dateAdded} />
          <DataRow title="└ filePath" value={playlist.playlist[0].filePath} />
          <DataRow title="└ song" value={playlist.playlist[0].song[0].title} />
        </DataRow>*/}
      </section>
    </>
  );
}

// Paths
// -----------------------------------------------------------------------------

export async function getStaticPaths() {
  const { data } = await client.query({
    query: querySlugs("playlists")
  });

  const paths = data.entries.map(entry => ({
    params: { slug: entry.slug }
  }));

  return {
    paths,
    fallback: false
  };
}

// Config
// ----------------------------------------------------------------------------

export async function getStaticProps(context) {
  const { params } = context;
  const { data } = await client.query({
    query: gql`
      query Entry {
        entry(section: "playlists", slug: "${params.slug}") {
          author {
            username
          }
          id
          title
          ... on playlists_default_Entry {
            private
            playlist {
              ... on playlist_BlockType {
                addedBy {
                  username
                }
                album {
                  slug
                  title
                  ... on albums_default_Entry {
                    albumCoverArt { url }
                    artist {
                      slug
                      title
                    }
                  }
                }
                dateAdded
                filePath
                song {
                  slug
                  title
                }
              }
            }
          }
        }
      }
    `
  });

  return {
    props: {
      playlist: data.entry,
      pageTitle: data.entry.title
    }
  };
}
