import Link from "next/link";
import { useRouter } from "next/router";
import cn from "classnames";
import Icon from "./Icon";
import { Menu } from "./Menu";

// Components
// ----------------------------------------------------------------------------

export const NavLink = ({
  className,
  count,
  hide,
  icon,
  navSection,
  title,
  url
}) => {
  const router = useRouter();
  const active = router.asPath == url || navSection === title;
  const linkClasses = cn({
    "flex items-center relative": true,
    "flex-1 flex-col justify-center": navSection !== "playlists",
    "md:flex-row md:justify-start md:h-32 md:gap-8 md:px-12 md:-ml-12 md:py-16 md:rounded-lg md:hover:bg-secondary-10": true,
    "text-accent": active,
    "h-48 gap-16 border-t border-primary-10 md:border-none":
      navSection === "playlists",
    "md:hidden": hide === "desktop",
    "hidden md:flex": hide === "mobile",
    [className]: className
  });

  const titleClasses = cn({
    "text-xs opacity-50 md:text-base md:opacity-100":
      navSection !== "playlists",
    "text-lg md:text-base": navSection === "playlists"
  });

  return (
    <Link href={url}>
      <a className={linkClasses}>
        {icon && (
          <span className="w-16 flex items-center justify-center text-xl md:text-base md:hidden">
            <Icon name={icon} solid />
          </span>
        )}
        <span className={titleClasses}>{title}</span>
      </a>
    </Link>
  );
};

const NavLinkPopover = ({ href, title }) => (
  <Link href={href}>
    <a className="flex p-8 rounded-lg hover:bg-primary-5">{title}</a>
  </Link>
);

// Default
// ----------------------------------------------------------------------------

export default function Navigation({ navSection }) {
  const navClasses = cn({
    "row-start-3 flex items-stretch": true,
    "bg-ground rounded-lg md:row-span-1 md:flex-col md:gap-24 md:pl-24 md:pr-12 md:overflow-y-auto md:text-secondary": true
  });

  return (
    <>
      <nav className={navClasses}>
        <Link href="/">
          <a className="font-serif font-medium text-3xl my-24 leading-tighter hidden md:block">
            This
            <br />
            Evening's
            <br />
            Show
            <br />
          </a>
        </Link>
        <div className="grid grid-cols-5 w-full md:block">
          <NavLink title="Home" url="/" icon="home" hide="desktop" />
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
            title="Wiki"
            url="/wiki"
            icon="book"
            navSection={navSection}
          />
          <Menu
            side="top"
            trigger={
              <button className="w-full h-full flex flex-col items-center justify-center md:hidden">
                <Icon name="ellipsis-horizontal" solid />
                <span className="text-xs opacity-50">More</span>
              </button>
            }
          >
            <NavLinkPopover title="Videos" href="videos" />
            <NavLinkPopover title="Setlist Computor" href="setlist" />
            <NavLinkPopover title="Contact" href="contact" />
          </Menu>
          <NavLink
            className="hidden"
            title="Videos"
            url="/videos"
            icon="videocam"
            navSection={navSection}
          />
          <NavLink
            className="hidden"
            title="Setlist Computor"
            url="/setlist"
            icon="musical-note"
            navSection={navSection}
          />
          <NavLink
            title="Contact"
            url="/contact"
            icon="information"
            hide="mobile"
          />
        </div>
      </nav>
    </>
  );
}
