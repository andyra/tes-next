import Link from "next/link";
import { useQuery } from "@apollo/client";
import cn from "classnames";
import ClientOnly from "./ClientOnly";
import Button from "./Button";
import Empty from "./Empty";
import Icon from "./Icon";
import { PLAYLISTS } from "../queries";

// Components
// ----------------------------------------------------------------------------

const NavLink = ({ className, count, icon, title, url }) => {
  const linkClasses = cn({
    "flex items-center gap-8 h-32 px-12 -mx-12 py-16 rounded-lg hover:bg-gray-50 dark:hover:bg-white/5": true,
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
    return null;
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
          title={playlist.title}
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

export default function Navigation() {
  return (
    <nav className="row-span-1 flex flex-col gap-24 bg-white dark:bg-gray-800 rounded-lg p-16">
      <ul>
        <NavLink title="T.E.S." url="/" className="mb-24" />
        <li>
          <NavLink title="Episodes" url="/episodes" icon="mic" />
        </li>
        <li>
          <NavLink title="Music" url="/albums" icon="musical-notes" />
        </li>
        <li>
          <NavLink title="Wiki" url="/wiki" icon="book" />
        </li>
        <li>
          <NavLink title="Videos" url="/videos" icon="videocam" />
        </li>
        <li>
          <NavLink title="About" url="/about" icon="information" />
        </li>
      </ul>
      <ul>
        <li className="text-gray-500 text-sm flex items-center justify-between">
          Playlists
          <Button circle>
            <Icon name="add" />
          </Button>
        </li>
        <PlaylistList />
      </ul>
    </nav>
  );
}
