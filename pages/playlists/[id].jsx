import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { gql, useMutation } from "@apollo/client";
import client from "../../apollo-client";
import toast from "react-hot-toast";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Modal from "../../components/Modal";
import PageTitle from "../../components/PageTitle";
import { PLAYLISTS_QUERY } from "../../constants";

import DataRow from "../../components/DataRow";

// TODO When renaming, we somehow need to refetch the query or invalidate the
// query cache. Right now the default component's state starts off with the
// query title, is updated correctly when the mutation finishes, but when
// navigating around and returning, the page still uses the cached version

// Components
// ----------------------------------------------------------------------------

const RenamePlaylistButton = ({ title, id, setTitle }) => {
  let input;
  const [modalIsOpen, setModalIsOpen] = useState(false);

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
        setTitle(data.save_playlists_default_Entry.title);
        loading = false;
        closeModal();
        toast.success("Renamed playlist");
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
          <Input
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
  const [title, setTitle] = useState(playlist.title);

  // When playlist.title changes, update the state
  useEffect(() => {
    setTitle(playlist.title);
  }, [playlist.title]);

  return (
    <>
      <PageTitle
        actions={
          <>
            <RenamePlaylistButton
              id={playlist.id}
              title={title}
              setTitle={setTitle}
            />
            <DeletePlaylistButton id={playlist.id} />
          </>
        }
      >
        {title}
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
    query: gql`
      query Entries {
        entries(section: "playlists") {
          id
        }
      }
    `
  });

  const paths = data.entries.map(entry => ({
    params: { id: entry.id }
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
        entry(section: "playlists", id: "${params.id}") {
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
