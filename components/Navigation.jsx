import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { gql, useMutation, useQuery } from "@apollo/client";
import toast from "react-hot-toast";
import cn from "classnames";
import Button from "./Button";
import Empty from "./Empty";
import Icon from "./Icon";
import Modal from "./Modal";
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

const NavLink = ({ className, count, icon, navSection, title, url }) => {
  const router = useRouter();
  const active = router.asPath == url || navSection === title;
  const linkClasses = cn({
    "flex items-center gap-8 h-32 px-12 -mx-12 py-16 rounded-lg hover:bg-hover": true,
    "text-accent": active,
    [className]: className
  });

  return (
    <Link href={url}>
      <a className={linkClasses}>
        {icon && (
          <span className="w-16 flex items-center justify-center">
            <Icon name={icon} />
          </span>
        )}
        <span className="flex-1">{title}</span>
      </a>
    </Link>
  );
};

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

const NewPlaylistButton = () => {
  let [modalIsOpen, setModalIsOpen] = useState(false);

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  return (
    <>
      <Button circle onClick={openModal}>
        <Icon name="add" />
      </Button>
      <Modal closeModal={closeModal} isOpen={modalIsOpen} title="New Playlist">
        <NewPlaylistForm closeModal={closeModal} />
      </Modal>
    </>
  );
};

const ListPlaylists = () => {
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
          url={`/playlists/favorites`}
          title="Favorites"
        />
      ))}
      {playlists.map(playlist => (
        <NavLink
          count={99}
          icon="musical-notes"
          key={playlist.title}
          url={`/playlists/${encodeURIComponent(playlist.slug)}`}
          title={playlist.title}
        />
      ))}
    </ul>
  ) : (
    <Empty>Ain't no Favorites</Empty>
  );
};

// Default
// ----------------------------------------------------------------------------

export default function Navigation({ navSection }) {
  return (
    <nav className="row-span-1 flex flex-col gap-24 bg-primary rounded-lg p-16 overflow-y-auto">
      <ul>
        <NavLink title="T.E.S." url="/" className="mb-24" />
        <li>
          <NavLink
            title="Episodes"
            url="/episodes"
            icon="mic"
            navSection={navSection}
          />
        </li>
        <li>
          <NavLink
            title="Music"
            url="/albums"
            icon="musical-notes"
            navSection={navSection}
          />
        </li>
        <li>
          <NavLink
            title="Wiki"
            url="/wiki"
            icon="book"
            navSection={navSection}
          />
        </li>
        <li>
          <NavLink
            title="Videos"
            url="/videos"
            icon="videocam"
            navSection={navSection}
          />
        </li>
        <li>
          <NavLink
            title="Setlist Computor"
            url="/setlist"
            icon="musical-note"
            navSection={navSection}
          />
        </li>
        <li>
          <NavLink title="About" url="/about" icon="information" />
        </li>
      </ul>
      <ul>
        <li className="text-gray-500 text-sm flex items-center justify-between">
          Playlists
          <NewPlaylistButton />
        </li>
        <ListPlaylists />
      </ul>
    </nav>
  );
}
