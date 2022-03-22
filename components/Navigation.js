import Link from "next/link";

const NavLink = ({
  count,
  icon,
  title,
  url
}) => {

  return (
    <Link href={url}>
      <a className="flex items-center gap-8 h-32 px-12 -mx-12 py-16 rounded-lg hover:bg-gray-50 dark:hover:bg-white/5">
        {icon && <span className="w-16 flex items-center justify-center">{icon}</span>}
        <span className="flex-1">{title}</span>
      </a>
    </Link>
  )
}

const Navigation = () => (
  <nav className="bg-white dark:bg-gray-800 rounded-lg p-16 w-224 flex flex-col gap-24">
    <NavLink title="T.E.S." url="/" />
    <ul>
      <li><NavLink title="Search" url="/" icon="✦"/></li>
      <li><NavLink title="Episodes" url="/" icon="✦"/></li>
      <li><NavLink title="Music" url="/" icon="✦"/></li>
      <li><NavLink title="About" url="/" icon="✦"/></li>
    </ul>
    <ul className="border-t pt-24">
      <li><NavLink title="Add Playlist" url="/" icon="+" /></li>
      <li><NavLink title="Favorites" url="/" icon="♥︎" /></li>
      <li><NavLink title="Boat Show 9" url="/" icon="✎" /></li>
      <li><NavLink title="For this weekend" url="/" icon="✎" /></li>
    </ul>
  </nav>
);

export default Navigation;
