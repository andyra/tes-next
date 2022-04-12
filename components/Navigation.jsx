import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import cn from "classnames";
import ClientOnly from "./ClientOnly";
import Button from "./Button";
import Empty from "./Empty";
import Icon from "./Icon";
import NewPlaylistButton from "./NewPlaylist";
import { PLAYLISTS } from "../constants";

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

const PlaylistList = () => {
  const { data, loading, error } = useQuery(PLAYLISTS);

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

  // TODO
  // Only show playlists if you're logged in
  // Filter playlists by author === self or public
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
    <nav className="row-span-1 flex flex-col gap-24 bg-primary rounded-lg p-16">
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
          <NavLink title="About" url="/about" icon="information" />
        </li>
      </ul>
      <ul>
        <li className="text-gray-500 text-sm flex items-center justify-between">
          Playlists
          <NewPlaylistButton />
        </li>
        <PlaylistList />
      </ul>
    </nav>
  );
}
