import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { gql, useMutation, useQuery } from "@apollo/client";
import toast from "react-hot-toast";
import cn from "classnames";
import Button from "./Button";
import Empty from "./Empty";
import Icon from "./Icon";
import MediaQuery from "./MediaQuery";
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
    "flex items-center relative": true,
    "flex-1 flex-col justify-center": true,
    "md:flex-row md:justify-start md:h-32 md:gap-8 md:px-12 md:-ml-12 md:py-16 md:rounded-lg md:hover:bg-secondary-10": true,
    "text-accent": active,
    [className]: className
  });

  return (
    <Link href={url}>
      <a className={linkClasses}>
        <MediaQuery desktop>
          {active && (
            <span className="h-4 w-4 rounded-full bg-accent absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1/2" />
          )}
        </MediaQuery>
        {icon && (
          <span className="w-16 flex items-center justify-center text-xl md:text-base">
            <Icon name={icon} solid />
          </span>
        )}
        <span className="text-xs opacity-50 md:text-base md:opacity-100">
          {title}
        </span>
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
          url={`/playlists/${encodeURIComponent(playlist.id)}`}
          title={playlist.title}
        />
      ))}
    </ul>
  ) : (
    <Empty>Ain't no Favorites</Empty>
  );
};

export const MobileNav = ({ navSection }) => (
  <MediaQuery mobile>
    <nav className="row-start-3 flex items-stretch border-t border-primary-10">
      <NavLink title="Home" url="/" icon="home" navSection={navSection} />
      <NavLink
        title="Episodes"
        url="/episodes"
        icon="mic"
        navSection={navSection}
      />
      <NavLink
        title="Music"
        url="/albums"
        icon="musical-notes"
        navSection={navSection}
      />
      <NavLink
        title="Playlists"
        url="/playlists"
        icon="musical-note"
        navSection={navSection}
      />
      <NavLink
        title="More"
        url="/"
        icon="ellipsis-horizontal"
        navSection={navSection}
      />
    </nav>
  </MediaQuery>
);

export const DesktopNav = ({ navSection }) => (
  <MediaQuery desktop>
    <nav className="row-span-1 flex flex-col gap-24 pl-24 pr-12 border-r border-primary-10 overflow-y-auto text-secondary">
      <Link href="/">
        <a className="text-3xl my-24 leading-tight">
          This
          <br />
          Evening's
          <br />
          Show
          <br />
        </a>
      </Link>
      <ul>
        <li>
          <NavLink
            title="Episodes"
            url="/episodes"
            // icon="mic"
            navSection={navSection}
          />
        </li>
        <li>
          <NavLink
            title="Music"
            url="/albums"
            // icon="musical-notes"
            navSection={navSection}
          />
        </li>
        <li>
          <NavLink
            title="Wiki"
            url="/wiki"
            // icon="book"
            navSection={navSection}
          />
        </li>
        <li>
          <NavLink
            title="Videos"
            url="/videos"
            // icon="videocam"
            navSection={navSection}
          />
        </li>
        <li>
          <NavLink
            title="Setlist Computor"
            url="/setlist"
            // icon="musical-note"
            navSection={navSection}
          />
        </li>
        <li>
          <NavLink
            title="About"
            url="/about"
            // icon="information"
          />
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
  </MediaQuery>
);

// Default
// ----------------------------------------------------------------------------

export default function Navigation({ navSection }) {
  return (
    <>
      <DesktopNav navSection={navSection} />
      <MobileNav navSection={navSection} />
    </>
  );
}
