import { useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import toast from "react-hot-toast";
import Button from "./Button";
import Empty from "./Empty";
import Icon from "./Icon";
import Modal from "./Modal";
import { NavLink } from "./Navigation";
import { PLAYLISTS_QUERY } from "../constants";

// TODO
// Only show playlists if you're logged in
// Filter playlists by author === self or public

// Queries & Mutations
// ----------------------------------------------------------------------------

const NEW_PLAYLIST_MUTATION = gql`
  mutation newPlaylist($title: String) {
    save_playlists_default_Entry(title: $title, authorId: 1) {
      title
    }
  }
`;

// Components
// ----------------------------------------------------------------------------

const NewPlaylistForm = ({ closeModal }) => {
  let input;
  const [title, setTitle] = useState("");

  const [newPlaylist, { data, loading, error }] = useMutation(
    NEW_PLAYLIST_MUTATION,
    {
      refetchQueries: [{ query: PLAYLISTS_QUERY }],
      onCompleted(data) {
        toast.success("Created playlist");
        loading = false;
        closeModal();
      }
    }
  );

  function handleSubmit(e) {
    e.preventDefault();
    newPlaylist({
      variables: {
        title: title
      }
    });
  }

  return (
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
      <Button type="submit">{loading ? "Creating…" : "Create Playlist"}</Button>
    </form>
  );
};

export const NewPlaylistButton = ({ fullSize }) => {
  let [modalIsOpen, setModalIsOpen] = useState(false);

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  return (
    <>
      <Button circle={!fullSize} onClick={openModal}>
        <Icon name="add" />
        {fullSize && "New"}
      </Button>
      <Modal closeModal={closeModal} isOpen={modalIsOpen} title="New Playlist">
        <NewPlaylistForm closeModal={closeModal} />
      </Modal>
    </>
  );
};

export const ListPlaylists = () => {
  const { data, loading, error } = useQuery(PLAYLISTS_QUERY);

  if (loading) {
    return <mark>Loading...</mark>;
  }

  if (error) {
    console.error(error);
    return `Query error! ${error.message}`;
  }

  const favorites = data.entries.filter(playlist => {
    return playlist.__typename === "playlists_favorites_Entry";
  });

  const playlists = data.entries.filter(playlist => {
    return playlist.__typename === "playlists_default_Entry";
  });

  return data.entries.length ? (
    <ul>
      {favorites.map(playlist => (
        <NavLink
          count={99}
          icon="heart"
          key={playlist.title}
          navSection="playlists"
          title="Favorites"
          url={`/playlists/favorites`}
        />
      ))}
      {playlists.map(playlist => (
        <NavLink
          count={99}
          icon="musical-notes"
          key={playlist.title}
          navSection="playlists"
          title={playlist.title}
          url={`/playlists/${encodeURIComponent(playlist.id)}`}
        />
      ))}
    </ul>
  ) : (
    <Empty>Ain't no Favorites</Empty>
  );
};
