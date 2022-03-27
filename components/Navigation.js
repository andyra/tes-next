import Link from "next/link";
import cn from "classnames";

const NavLink = ({
  className,
  count,
  icon,
  title,
  url
}) => {
  const linkClasses = cn({
    "flex items-center gap-8 h-32 px-12 -mx-12 py-16 rounded-lg hover:bg-gray-50 dark:hover:bg-white/5": true,
    [className]: className
  });

  return (
    <Link href={url}>
      <a className={linkClasses}>
        {icon && <span className="w-16 flex items-center justify-center">{icon}</span>}
        <span className="flex-1">{title}</span>
      </a>
    </Link>
  )
}

const Navigation = () => (
  <nav className="row-span-1 flex flex-col gap-24 bg-white dark:bg-gray-800 rounded-lg p-16">
    <ul>
      <NavLink title="T.E.S." url="/" className="mb-24" />
      <li><NavLink title="Episodes" url="/episodes" icon="✦"/></li>
      <li><NavLink title="Music" url="/music" icon="✦"/></li>
      <li><NavLink title="Wiki" url="/wiki" icon="✦"/></li>
      <li><NavLink title="About" url="/about" icon="✦"/></li>
    </ul>
    <ul>
      <li><NavLink title="Add Playlist" url="/" icon="+" /></li>
      <li><NavLink title="Favorites" url="/" icon="♥︎" /></li>
      <li><NavLink title="Boat Show 9" url="/" icon="✎" /></li>
      <li><NavLink title="For this weekend" url="/" icon="✎" /></li>
    </ul>
  </nav>
);

export default Navigation;
